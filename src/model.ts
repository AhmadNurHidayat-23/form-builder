export const types = ['text', 'email', 'number', 'textarea', 'select', 'radio', 'checkbox'] as const;
export type Kind = typeof types[number];
export interface Field { id: string; name: string; type: Kind; label: string; placeholder: string; required: boolean; options: string[]; min: string; max: string; minLength: string; pattern: string }
export interface Config { version: 1; title: string; fields: Field[] }
export function field(type: Kind, n: number): Field { return { id: crypto.randomUUID(), type, name: 'field_' + n, label: 'Label ' + n, placeholder: '', required: false, options: ['Pilihan A', 'Pilihan B'], min: '', max: '', minLength: '', pattern: '' }; }
export function validate(config: Config) {
  if (!config || config.version !== 1 || typeof config.title !== 'string' || config.title.length > 200 || !Array.isArray(config.fields) || config.fields.length > 100) throw new Error('Format form tidak valid (maksimal 100 field).');
  const names = new Set<string>(), ids = new Set<string>();
  for (const f of config.fields) {
    if (!f || typeof f.id !== 'string' || ids.has(f.id) || typeof f.name !== 'string' || !/^[a-zA-Z][a-zA-Z0-9_]{0,63}$/.test(f.name) || names.has(f.name) || !types.includes(f.type)) throw new Error('Nama field harus unik dan menggunakan huruf, angka, atau underscore.');
    names.add(f.name); ids.add(f.id);
    if (typeof f.label !== 'string' || f.label.length > 200 || typeof f.placeholder !== 'string' || f.placeholder.length > 300 || typeof f.required !== 'boolean' || !Array.isArray(f.options) || f.options.some(o => typeof o !== 'string' || !o || o.length > 200) || f.options.length > 100 || new Set(f.options).size !== f.options.length) throw new Error('Label, placeholder, atau pilihan tidak valid/duplikat.');
    if (['radio', 'select'].includes(f.type) && !f.options.length) throw new Error('Select/radio memerlukan pilihan.');
    if ([f.min, f.max, f.minLength, f.pattern].some(v => typeof v !== 'string') || [f.min, f.max].some(v => v !== '' && !Number.isFinite(+v)) || (f.minLength && (!/^\d+$/.test(f.minLength) || +f.minLength > 10000)) || (f.min !== '' && f.max !== '' && +f.min > +f.max)) throw new Error('Batas validasi tidak valid.');
    if (f.pattern.length > 200) throw new Error('Pola maksimal 200 karakter.');
    if (f.pattern) { try { new RegExp(f.pattern, 'v'); } catch { throw new Error('Pola regex tidak valid untuk validasi HTML.'); } }
  }
  return config;
}
export function parse(text: string): Config { return validate(JSON.parse(text)); }
