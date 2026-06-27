import { ArrowDown, ArrowUp, Pencil, Plus, RefreshCw, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import {
  createAdminResource,
  deleteAdminResource,
  getAdminResource,
  updateAdminResource,
} from '../../lib/api.js';
import AdminResourceForm from './AdminResourceForm.jsx';

function editablePayload(resource, item) {
  return resource.fields.reduce((payload, field) => {
    payload[field.name] = item[field.name];
    return payload;
  }, {});
}

function AdminResourcePanel({ resource, notify, refreshPublic }) {
  const [items, setItems] = useState([]);
  const [state, setState] = useState('loading');
  const [error, setError] = useState('');
  const [editor, setEditor] = useState(null);
  const [saving, setSaving] = useState(false);
  const [serverErrors, setServerErrors] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(null);

  const load = useCallback(async () => {
    setState('loading');
    setError('');
    try {
      setItems(await getAdminResource(resource.key));
      setState('ready');
    } catch (requestError) {
      setError(requestError.message);
      setState('error');
    }
  }, [resource.key]);

  useEffect(() => {
    setEditor(null);
    setConfirmDelete(null);
    load();
  }, [load]);

  const saved = async (payload) => {
    setSaving(true);
    setServerErrors({});
    try {
      if (editor?.id) {
        await updateAdminResource(resource.key, editor.id, payload);
      } else {
        await createAdminResource(resource.key, payload);
      }
      notify(`${resource.singular} ${editor?.id ? 'updated' : 'created'} successfully.`);
      setEditor(null);
      await Promise.all([load(), refreshPublic()]);
    } catch (requestError) {
      setServerErrors(requestError.validationErrors);
      notify(requestError.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const removed = async (item) => {
    try {
      await deleteAdminResource(resource.key, item.id);
      notify(`${resource.singular} deleted.`);
      setConfirmDelete(null);
      if (editor?.id === item.id) {
        setEditor(null);
      }
      await Promise.all([load(), refreshPublic()]);
    } catch (requestError) {
      notify(requestError.message, 'error');
    }
  };

  const move = async (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= items.length) {
      return;
    }
    const current = items[index];
    const target = items[targetIndex];
    const currentOrder = current.displayOrder === target.displayOrder ? index : current.displayOrder;
    const targetOrder = current.displayOrder === target.displayOrder ? targetIndex : target.displayOrder;
    try {
      await Promise.all([
        updateAdminResource(resource.key, current.id, {
          ...editablePayload(resource, current),
          displayOrder: targetOrder,
        }),
        updateAdminResource(resource.key, target.id, {
          ...editablePayload(resource, target),
          displayOrder: currentOrder,
        }),
      ]);
      notify(`${resource.label} reordered.`);
      await Promise.all([load(), refreshPublic()]);
    } catch (requestError) {
      notify(requestError.message, 'error');
    }
  };

  return (
    <div className={`grid gap-6 ${editor ? 'xl:grid-cols-[minmax(0,1fr)_minmax(340px,0.72fr)]' : ''}`}>
      <section>
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-900/10 pb-5 dark:border-white/10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-600 dark:text-teal-300">
              Portfolio content
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">{resource.label}</h2>
            <p className="mt-1 text-sm text-slate-500">{items.length} item{items.length === 1 ? '' : 's'}</p>
          </div>
          <div className="flex gap-2">
            <button
              aria-label={`Refresh ${resource.label}`}
              className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-slate-900/10 text-slate-600 hover:bg-slate-950/5 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10"
              type="button"
              onClick={load}
            >
              <RefreshCw aria-hidden="true" className="h-4 w-4" />
            </button>
            <button
              className="focus-ring inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-slate-950"
              type="button"
              onClick={() => {
                setServerErrors({});
                setEditor({});
              }}
            >
              <Plus aria-hidden="true" className="h-4 w-4" />
              Add {resource.singular}
            </button>
          </div>
        </div>

        {state === 'loading' ? (
          <p className="py-12 text-center text-sm text-slate-500">Loading {resource.label.toLowerCase()}...</p>
        ) : null}
        {state === 'error' ? (
          <div className="mt-6 rounded-lg border border-rose-300/50 bg-rose-50/70 p-4 text-sm text-rose-800 dark:border-rose-400/20 dark:bg-rose-950/30 dark:text-rose-200">
            <p>{error}</p>
            <button className="focus-ring mt-3 font-semibold underline" type="button" onClick={load}>Retry</button>
          </div>
        ) : null}
        {state === 'ready' && !items.length ? (
          <div className="mt-6 border-y border-dashed border-slate-900/15 py-12 text-center dark:border-white/15">
            <p className="text-sm text-slate-500">No {resource.label.toLowerCase()} yet.</p>
          </div>
        ) : null}

        <div className="mt-5 grid gap-3">
          {items.map((item, index) => (
            <article
              className={`rounded-lg border p-4 transition ${
                editor?.id === item.id
                  ? 'border-teal-400 bg-teal-500/5'
                  : 'border-slate-900/10 bg-white/45 dark:border-white/10 dark:bg-white/[0.03]'
              }`}
              key={item.id}
            >
              <div className="flex items-start gap-3">
                {item.imageUrl ? (
                  <img alt="" className="h-14 w-20 shrink-0 rounded-md object-cover" src={item.imageUrl} />
                ) : item.photoUrl ? (
                  <img alt="" className="h-14 w-14 shrink-0 rounded-md object-cover" src={item.photoUrl} />
                ) : null}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-slate-950 dark:text-white">
                    {resource.title(item)}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{resource.meta(item)}</p>
                </div>
                <div className="flex shrink-0 flex-wrap justify-end gap-1">
                  {resource.reorderable ? (
                    <>
                      <button
                        aria-label={`Move ${resource.title(item)} up`}
                        className="focus-ring grid h-8 w-8 place-items-center rounded-full text-slate-500 hover:bg-slate-950/5 disabled:opacity-30 dark:hover:bg-white/10"
                        disabled={index === 0}
                        title="Move up"
                        type="button"
                        onClick={() => move(index, -1)}
                      >
                        <ArrowUp aria-hidden="true" className="h-4 w-4" />
                      </button>
                      <button
                        aria-label={`Move ${resource.title(item)} down`}
                        className="focus-ring grid h-8 w-8 place-items-center rounded-full text-slate-500 hover:bg-slate-950/5 disabled:opacity-30 dark:hover:bg-white/10"
                        disabled={index === items.length - 1}
                        title="Move down"
                        type="button"
                        onClick={() => move(index, 1)}
                      >
                        <ArrowDown aria-hidden="true" className="h-4 w-4" />
                      </button>
                    </>
                  ) : null}
                  <button
                    aria-label={`Edit ${resource.title(item)}`}
                    className="focus-ring grid h-8 w-8 place-items-center rounded-full text-slate-500 hover:bg-slate-950/5 dark:hover:bg-white/10"
                    title="Edit"
                    type="button"
                    onClick={() => {
                      setServerErrors({});
                      setEditor(item);
                    }}
                  >
                    <Pencil aria-hidden="true" className="h-4 w-4" />
                  </button>
                  <button
                    aria-label={`Delete ${resource.title(item)}`}
                    className="focus-ring grid h-8 w-8 place-items-center rounded-full text-rose-600 hover:bg-rose-500/10 dark:text-rose-300"
                    title="Delete"
                    type="button"
                    onClick={() => setConfirmDelete(item.id)}
                  >
                    <Trash2 aria-hidden="true" className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {confirmDelete === item.id ? (
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-rose-300/40 pt-3 text-xs text-rose-700 dark:border-rose-400/20 dark:text-rose-200">
                  <span>Delete this {resource.singular.toLowerCase()} permanently?</span>
                  <div className="flex gap-2">
                    <button className="focus-ring rounded-full px-3 py-1.5 font-semibold hover:bg-black/5 dark:hover:bg-white/10" type="button" onClick={() => setConfirmDelete(null)}>Cancel</button>
                    <button className="focus-ring rounded-full bg-rose-600 px-3 py-1.5 font-semibold text-white" type="button" onClick={() => removed(item)}>Delete</button>
                  </div>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      {editor ? (
        <AdminResourceForm
          record={editor.id ? editor : null}
          resource={resource}
          saving={saving}
          serverErrors={serverErrors}
          onCancel={() => setEditor(null)}
          onSave={saved}
        />
      ) : null}
    </div>
  );
}

export default AdminResourcePanel;
