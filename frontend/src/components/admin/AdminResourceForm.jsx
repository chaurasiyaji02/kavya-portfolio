import { Save, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

function initialValues(resource, record) {
  return resource.fields.reduce(
    (values, field) => ({
      ...values,
      [field.name]:
        record?.[field.name] ?? resource.defaults[field.name] ?? (field.type === 'checkbox' ? false : ''),
    }),
    {},
  );
}

function toPayload(resource, values) {
  return resource.fields.reduce((payload, field) => {
    let value = values[field.name];
    if (field.type === 'list') {
      value = String(value ?? '')
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean);
    } else if (field.type === 'number') {
      value = Number(value);
    } else if (field.type === 'checkbox') {
      value = Boolean(value);
    } else if (typeof value === 'string') {
      value = value.trim();
      if (!field.required && value === '') {
        value = null;
      }
    }
    payload[field.name] = value;
    return payload;
  }, {});
}

function AdminResourceForm({ resource, record, saving, serverErrors, onCancel, onSave }) {
  const [values, setValues] = useState(() => initialValues(resource, record));
  const [clientErrors, setClientErrors] = useState({});

  useEffect(() => {
    setValues(initialValues(resource, record));
    setClientErrors({});
  }, [record, resource]);

  const title = record ? `Edit ${resource.singular}` : `Add ${resource.singular}`;
  const fields = useMemo(
    () => resource.fields.map((field) => ({
      ...field,
      value: field.type === 'list' && Array.isArray(values[field.name])
        ? values[field.name].join('\n')
        : values[field.name],
    })),
    [resource.fields, values],
  );

  const update = (field, value) => {
    setClientErrors((current) => ({ ...current, [field.name]: undefined }));
    setValues((current) => {
      const next = { ...current, [field.name]: value };
      if (field.name === 'currentRole' && value) {
        next.endDate = '';
      }
      return next;
    });
  };

  const submit = (event) => {
    event.preventDefault();
    const errors = {};
    resource.fields.forEach((field) => {
      if (field.type !== 'list') {
        return;
      }
      const entries = String(values[field.name] ?? '')
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean);
      if (field.required && entries.length === 0) {
        errors[field.name] = `${field.label} must include at least one item.`;
      } else if (field.maxItems && entries.length > field.maxItems) {
        errors[field.name] = `${field.label} supports up to ${field.maxItems} items.`;
      }
    });
    if (values.startDate && values.endDate && values.endDate < values.startDate) {
      errors.endDate = 'End date must be on or after the start date.';
    }
    if (Object.keys(errors).length) {
      setClientErrors(errors);
      return;
    }
    onSave(toPayload(resource, values));
  };

  return (
    <form className="glass-panel rounded-lg p-5 lg:sticky lg:top-28" onSubmit={submit}>
      <div className="flex items-center justify-between gap-4 border-b border-slate-900/10 pb-4 dark:border-white/10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-600 dark:text-teal-300">
            Editor
          </p>
          <h2 className="mt-1 text-lg font-semibold text-slate-950 dark:text-white">{title}</h2>
        </div>
        <button
          aria-label="Close editor"
          className="focus-ring grid h-9 w-9 place-items-center rounded-full text-slate-500 hover:bg-slate-950/5 dark:hover:bg-white/10"
          type="button"
          onClick={onCancel}
        >
          <X aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {fields.map((field) => {
          const sharedClassName =
            'focus-ring w-full rounded-lg border border-slate-900/10 bg-white/75 px-3 py-2.5 text-sm font-normal text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-white';
          const fieldError = clientErrors[field.name] ?? serverErrors?.[field.name];
          const disabled = field.name === 'endDate' && values.currentRole;

          if (field.type === 'checkbox') {
            return (
              <label
                className={`flex items-center gap-3 rounded-lg border border-slate-900/10 px-3 py-3 text-sm font-semibold text-slate-800 dark:border-white/10 dark:text-slate-100 ${
                  field.wide ? 'sm:col-span-2' : ''
                }`}
                key={field.name}
              >
                <input
                  checked={Boolean(field.value)}
                  className="h-4 w-4 accent-teal-600"
                  name={field.name}
                  type="checkbox"
                  onChange={(event) => update(field, event.target.checked)}
                />
                {field.label}
              </label>
            );
          }

          return (
            <label
              className={`grid gap-1.5 text-sm font-semibold text-slate-800 dark:text-slate-100 ${
                field.wide ? 'sm:col-span-2' : ''
              }`}
              key={field.name}
            >
              {field.label}
              {field.type === 'textarea' || field.type === 'list' ? (
                <textarea
                  className={`${sharedClassName} min-h-28 resize-y`}
                  disabled={disabled}
                  maxLength={field.maxLength}
                  name={field.name}
                  required={field.required}
                  value={field.value ?? ''}
                  onChange={(event) => update(field, event.target.value)}
                />
              ) : field.type === 'select' ? (
                <select
                  className={sharedClassName}
                  name={field.name}
                  required={field.required}
                  value={field.value ?? ''}
                  onChange={(event) => update(field, event.target.value)}
                >
                  {field.options.map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              ) : (
                <input
                  className={sharedClassName}
                  disabled={disabled}
                  max={field.max}
                  maxLength={field.maxLength}
                  min={field.min}
                  name={field.name}
                  pattern={field.pattern}
                  required={field.required}
                  type={field.type}
                  value={field.value ?? ''}
                  onChange={(event) => update(field, event.target.value)}
                />
              )}
              {field.hint ? (
                <span className="text-xs font-normal leading-5 text-slate-500">{field.hint}</span>
              ) : null}
              {fieldError ? (
                <span className="text-xs font-medium text-rose-600 dark:text-rose-300">{fieldError}</span>
              ) : null}
            </label>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-slate-900/10 pt-5 dark:border-white/10">
        <button
          className="focus-ring rounded-full border border-slate-900/10 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-950/5 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/10"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="focus-ring inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2 text-sm font-semibold text-white disabled:cursor-wait disabled:opacity-60 dark:bg-white dark:text-slate-950"
          disabled={saving}
          type="submit"
        >
          <Save aria-hidden="true" className="h-4 w-4" />
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
}

export default AdminResourceForm;
