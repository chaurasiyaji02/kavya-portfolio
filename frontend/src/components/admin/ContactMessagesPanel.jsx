import { Check, Mail, MailOpen, RefreshCw, Trash2 } from 'lucide-react';
import { Fragment, useCallback, useEffect, useState } from 'react';
import {
  deleteAdminResource,
  getAdminContactMessages,
  updateAdminResource,
} from '../../lib/api.js';

function ContactMessagesPanel({ notify }) {
  const [messages, setMessages] = useState([]);
  const [state, setState] = useState('loading');
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const load = useCallback(async () => {
    setState('loading');
    setError('');
    try {
      setMessages(await getAdminContactMessages());
      setState('ready');
    } catch (requestError) {
      setError(requestError.message);
      setState('error');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const toggleRead = async (message) => {
    try {
      await updateAdminResource('contact-messages', message.id, { read: !message.read });
      notify(`Message marked ${message.read ? 'unread' : 'read'}.`);
      await load();
    } catch (requestError) {
      notify(requestError.message, 'error');
    }
  };

  const remove = async (message) => {
    try {
      await deleteAdminResource('contact-messages', message.id);
      notify('Contact message deleted.');
      setConfirmDelete(null);
      if (selected?.id === message.id) {
        setSelected(null);
      }
      await load();
    } catch (requestError) {
      notify(requestError.message, 'error');
    }
  };

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-900/10 pb-5 dark:border-white/10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-600 dark:text-teal-300">Inbox</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">Contact Messages</h2>
          <p className="mt-1 text-sm text-slate-500">{messages.length} message{messages.length === 1 ? '' : 's'}</p>
        </div>
        <button
          aria-label="Refresh contact messages"
          className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-slate-900/10 text-slate-600 hover:bg-slate-950/5 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10"
          type="button"
          onClick={load}
        >
          <RefreshCw aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>

      {state === 'loading' ? <p className="py-12 text-center text-sm text-slate-500">Loading messages...</p> : null}
      {state === 'error' ? (
        <div className="mt-6 rounded-lg border border-rose-300/50 bg-rose-50/70 p-4 text-sm text-rose-800 dark:border-rose-400/20 dark:bg-rose-950/30 dark:text-rose-200">
          <p>{error}</p>
          <button className="focus-ring mt-3 font-semibold underline" type="button" onClick={load}>Retry</button>
        </div>
      ) : null}
      {state === 'ready' && !messages.length ? (
        <div className="mt-6 border-y border-dashed border-slate-900/15 py-12 text-center dark:border-white/15">
          <Mail aria-hidden="true" className="mx-auto h-6 w-6 text-slate-400" />
          <p className="mt-3 text-sm text-slate-500">No contact messages yet.</p>
        </div>
      ) : null}

      {messages.length ? (
        <div className="mt-5 overflow-x-auto rounded-lg border border-slate-900/10 dark:border-white/10">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead className="bg-slate-950/[0.04] text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:bg-white/5">
              <tr>
                <th className="w-16 px-4 py-3" scope="col">Status</th>
                <th className="px-4 py-3" scope="col">Sender</th>
                <th className="px-4 py-3" scope="col">Subject</th>
                <th className="px-4 py-3" scope="col">Received</th>
                <th className="w-24 px-4 py-3 text-right" scope="col">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/10 dark:divide-white/10">
              {messages.map((message) => (
                <Fragment key={message.id}>
                  <tr className={message.read ? 'bg-white/30 dark:bg-white/[0.02]' : 'bg-teal-500/5'}>
                    <td className="px-4 py-3">
                      {message.read ? (
                        <MailOpen aria-label="Read" className="h-5 w-5 text-slate-400" />
                      ) : (
                        <Mail aria-label="Unread" className="h-5 w-5 text-teal-600 dark:text-teal-300" />
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-semibold text-slate-950 dark:text-white">{message.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{message.email}</p>
                    </td>
                    <td className="max-w-xs px-4 py-3">
                      <button
                        className="focus-ring block max-w-full truncate text-sm font-semibold text-slate-800 hover:text-teal-700 dark:text-slate-100 dark:hover:text-teal-300"
                        type="button"
                        onClick={() => setSelected(selected?.id === message.id ? null : message)}
                      >
                        {message.subject}
                      </button>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-500">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <button
                          aria-label={`Mark message ${message.read ? 'unread' : 'read'}`}
                          className="focus-ring grid h-8 w-8 place-items-center rounded-full text-slate-500 hover:bg-slate-950/5 dark:hover:bg-white/10"
                          title={message.read ? 'Mark unread' : 'Mark read'}
                          type="button"
                          onClick={() => toggleRead(message)}
                        >
                          <Check aria-hidden="true" className="h-4 w-4" />
                        </button>
                        <button
                          aria-label={`Delete message from ${message.name}`}
                          className="focus-ring grid h-8 w-8 place-items-center rounded-full text-rose-600 hover:bg-rose-500/10 dark:text-rose-300"
                          title="Delete"
                          type="button"
                          onClick={() => setConfirmDelete(message.id)}
                        >
                          <Trash2 aria-hidden="true" className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {selected?.id === message.id || confirmDelete === message.id ? (
                    <tr>
                      <td className="bg-white/45 px-4 py-4 dark:bg-white/[0.03]" colSpan="5">
                        {selected?.id === message.id ? (
                          <p className="whitespace-pre-wrap text-sm leading-7 text-slate-600 dark:text-slate-300">{message.message}</p>
                        ) : null}
                        {confirmDelete === message.id ? (
                          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-rose-700 dark:text-rose-200">
                            <span>Delete this message permanently?</span>
                            <div className="flex gap-2">
                              <button className="focus-ring rounded-full px-3 py-1.5 font-semibold hover:bg-black/5 dark:hover:bg-white/10" type="button" onClick={() => setConfirmDelete(null)}>Cancel</button>
                              <button className="focus-ring rounded-full bg-rose-600 px-3 py-1.5 font-semibold text-white" type="button" onClick={() => remove(message)}>Delete</button>
                            </div>
                          </div>
                        ) : null}
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}

export default ContactMessagesPanel;
