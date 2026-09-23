const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

const details = { fullName: 'Verification Guest', email: 'guest@example.com', phone: '+212600000000', date: '2027-01-10', people: 3, tour: 'Medina & Souks', message: 'Private walking tour' };
function compile(file, dependencies, globals = {}) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  vm.runInNewContext(code, { exports, require: (name) => {
    if (!(name in dependencies)) throw new Error(`Unexpected dependency ${name}`);
    return dependencies[name];
  }, console, ...globals }, { filename: file });
  return exports;
}
const whatsapp = compile('lib/whatsapp.ts', { './config': { siteConfig: { urls: { whatsappNumber: '212661176369' } } } });
function findForm(node) {
  if (!node || typeof node !== 'object') return null;
  if (node.type === 'form') return node;
  for (const child of [node.props?.children].flat(Infinity)) {
    const result = findForm(child);
    if (result) return result;
  }
  return null;
}

async function check(file, exportName, outcome) {
  const events = [];
  const react = {
    useState: (initial) => [initial?.fullName !== undefined ? details : initial, () => {}],
    useEffect: () => {},
  };
  const jsx = (type, props) => ({ type, props });
  const dependencies = {
    react,
    'react/jsx-runtime': { jsx, jsxs: jsx, Fragment: 'fragment' },
    'lucide-react': {},
    '@/lib/whatsapp': whatsapp,
    '@/lib/tours-data': { toursData: [{ title: 'Medina & Souks' }] },
    '@/lib/analytics-client': { sendAnalyticsEvent: () => {}, trackWhatsAppClick: () => {} },
    '@/components/common/LanguageProvider': { useLanguage: () => ({ t: { reservation: new Proxy({}, { get: () => 'Label' }) } }) },
  };
  const module = compile(file, dependencies, {
    fetch: async (url, init) => {
      assert.equal(url, '/api/reservations');
      assert.deepEqual(JSON.parse(init.body), details);
      events.push('save');
      if (outcome === 'network') throw new Error('Network unavailable');
      return { ok: outcome === 'success', json: async () => ({ success: outcome === 'success', error: 'Validation failed' }) };
    },
    window: { location: { pathname: '/', assign: (url) => { events.push('redirect'); const target = new URL(url); assert.equal(target.origin, 'https://wa.me'); assert.equal(target.pathname, '/212661176369'); for (const value of Object.values(details)) assert.ok(target.searchParams.get('text').includes(String(value))); } } },
  });
  const tree = module[exportName]({});
  const form = findForm(tree);
  assert.ok(form, 'The booking form should be rendered without a success screen');
  await form.props.onSubmit({ preventDefault() {} });
  assert.deepEqual(events, outcome === 'success' ? ['save', 'redirect'] : ['save']);
}
(async () => {
  for (const [file, name] of [['components/reservation/ReservationSection.tsx', 'ReservationSection'], ['components/reservation/ReservationForm.tsx', 'ReservationForm']]) {
    for (const outcome of ['success', 'validation', 'network']) await check(file, name, outcome);
  }
  console.log('PASS both reservation forms: save before direct WhatsApp redirect; no redirect on validation or network failure; all booking details included.');
})().catch((error) => { console.error(error); process.exitCode = 1; });
