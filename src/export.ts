import { validate, type Config, type Field } from './model';
const esc = (s: string) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
function htmlField(f: Field): string {
  const common = ' name="' + esc(f.name) + '"' + (f.required ? ' required' : '');
  const id = ' id="' + esc(f.id) + '"';
  const validation = (f.type === 'number' ? (f.min ? ' min="' + esc(f.min) + '"' : '') + (f.max ? ' max="' + esc(f.max) + '"' : '') : (f.minLength ? ' minlength="' + f.minLength + '"' : '') + (f.pattern && ['text', 'email'].includes(f.type) ? ' pattern="' + esc(f.pattern) + '"' : ''));
  const label = '<label for="' + esc(f.id) + '">' + esc(f.label) + '</label>';
  if (f.type === 'radio') return '<fieldset><legend>' + esc(f.label) + '</legend>' + f.options.map((o, i) => '<label><input type="radio"' + common + ' value="' + esc(o) + '"> ' + esc(o) + '</label>').join('\n') + '</fieldset>';
  if (f.type === 'checkbox') return '<label><input type="checkbox"' + id + common + ' value="true"> ' + esc(f.label) + '</label>';
  if (f.type === 'select') return label + '<select' + id + common + '><option value="">Pilih…</option>' + f.options.map(o => '<option value="' + esc(o) + '">' + esc(o) + '</option>').join('') + '</select>';
  if (f.type === 'textarea') return label + '<textarea' + id + common + validation + ' placeholder="' + esc(f.placeholder) + '"></textarea>';
  return label + '<input type="' + f.type + '"' + id + common + validation + (f.type === 'number' ? ' step="any"' : '') + ' placeholder="' + esc(f.placeholder) + '">';
}
export function html(config: Config) {
  validate(config);
  return '<!doctype html>\n<html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + esc(config.title) + '</title></head><body>\n<h1>' + esc(config.title) + '</h1>\n<form id="generated-form">\n' + config.fields.map(f => '<div>\n' + htmlField(f) + '\n</div>').join('\n') + '\n<button type="submit">Kirim</button>\n</form><pre id="result" role="status"></pre>\n<script>document.getElementById("generated-form").addEventListener("submit",function(event){event.preventDefault();document.getElementById("result").textContent=JSON.stringify(Object.fromEntries(new FormData(event.currentTarget)),null,2);});</script>\n</body></html>';
}
export function react(config: Config) {
  validate(config);
  const attr = (s: string) => '{' + JSON.stringify(s) + '}';
  const nodes = config.fields.map(f => {
    const common = ' name=' + attr(f.name) + ' required={' + f.required + '}';
    const extras = f.type === 'number' ? (f.min ? ' min=' + attr(f.min) : '') + (f.max ? ' max=' + attr(f.max) : '') + ' step="any"' : (f.minLength ? ' minLength={' + +f.minLength + '}' : '') + (f.pattern && ['text', 'email'].includes(f.type) ? ' pattern=' + attr(f.pattern) : '');
    if (f.type === 'radio') return '<fieldset><legend>' + attr(f.label) + '</legend>' + f.options.map(o => '<label><input type="radio"' + common + ' value=' + attr(o) + ' />' + attr(o) + '</label>').join('') + '</fieldset>';
    if (f.type === 'checkbox') return '<label><input type="checkbox"' + common + ' value="true" />' + attr(f.label) + '</label>';
    let input = '<input type="' + f.type + '"' + common + extras + ' placeholder=' + attr(f.placeholder) + ' />';
    if (f.type === 'textarea') input = '<textarea' + common + extras + ' placeholder=' + attr(f.placeholder) + ' />';
    if (f.type === 'select') input = '<select' + common + ' defaultValue=""><option value="">Pilih…</option>' + f.options.map(o => '<option value=' + attr(o) + '>' + attr(o) + '</option>').join('') + '</select>';
    return '<label>' + attr(f.label) + input + '</label>';
  });
  return 'import { useState, type FormEvent } from "react";\n\nexport default function GeneratedForm() {\n  const [result, setResult] = useState("");\n  function submit(event: FormEvent<HTMLFormElement>) {\n    event.preventDefault();\n    setResult(JSON.stringify(Object.fromEntries(new FormData(event.currentTarget)), null, 2));\n  }\n  return <section><h1>' + attr(config.title) + '</h1><form onSubmit={submit}>\n' + nodes.join('\n') + '\n<button type="submit">Kirim</button>\n</form><pre role="status">{result}</pre></section>;\n}\n';
}
