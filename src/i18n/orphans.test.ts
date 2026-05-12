import * as fs from 'node:fs';
import * as path from 'node:path';

const PROJECT_ROOT = path.resolve(__dirname, '../..');
const SOURCE_DIRS = ['src', 'app'];
const LOCALE_EN_DIR = path.join(PROJECT_ROOT, 'src/i18n/locales/en');
const NAMESPACES = ['common', 'tabs', 'etiquette', 'elements', 'routes'] as const;

// Keys referenced via template literals or computed values that the static
// regex below cannot match. Add a row when a new dynamic call appears.
const DYNAMIC_KEY_ALLOWLIST: ReadonlyArray<string> = [
  // app/etiquette.tsx — t(`sections.${key}.title`/.body)
  'etiquette:sections.photography.title',
  'etiquette:sections.photography.body',
  'etiquette:sections.footwear.title',
  'etiquette:sections.footwear.body',
  'etiquette:sections.silence.title',
  'etiquette:sections.silence.body',
  'etiquette:sections.sacredObjects.title',
  'etiquette:sections.sacredObjects.body',
  'etiquette:sections.kumari.title',
  'etiquette:sections.kumari.body',
  // app/recognition/[id].tsx — t(`elements.${id}.title`/.oneLine/.context)
  'elements:elements.boudha.title',
  'elements:elements.boudha.oneLine',
  'elements:elements.boudha.context',
  'elements:elements.pashupatinath.title',
  'elements:elements.pashupatinath.oneLine',
  'elements:elements.pashupatinath.context',
  'elements:elements.swayambhu.title',
  'elements:elements.swayambhu.oneLine',
  'elements:elements.swayambhu.context',
  'elements:elements.lionGate.title',
  'elements:elements.lionGate.oneLine',
  'elements:elements.lionGate.context',
  'elements:elements.lotusMotif.title',
  'elements:elements.lotusMotif.oneLine',
  'elements:elements.lotusMotif.context',
  // app/recognition/[id].tsx — t(element.source.labelKey)
  'elements:sources.wikipedia',
  // app/route/[id].tsx — t(`routes.${id}.title|oneLine|description|whenToGo|tips`)
  'routes:routes.patanDawn.title',
  'routes:routes.patanDawn.oneLine',
  'routes:routes.patanDawn.description',
  'routes:routes.patanDawn.whenToGo',
  'routes:routes.patanDawn.tips',
  'routes:routes.boudhaKora.title',
  'routes:routes.boudhaKora.oneLine',
  'routes:routes.boudhaKora.description',
  'routes:routes.boudhaKora.whenToGo',
  'routes:routes.boudhaKora.tips',
  'routes:routes.swayambhuClimb.title',
  'routes:routes.swayambhuClimb.oneLine',
  'routes:routes.swayambhuClimb.description',
  'routes:routes.swayambhuClimb.whenToGo',
  'routes:routes.swayambhuClimb.tips',
];

// Keys deliberately seeded in commit (c) as common-namespace API surface for
// later phases (toasts, retry buttons, generic error UI). Each entry should
// graduate out of this list when a real callsite appears. Empty additions
// here are forbidden — every line must justify its presence.
const RESERVED_ORPHANS: ReadonlyArray<string> = [
  'common:ok',
  'common:cancel',
  'common:retry',
  'common:dismiss',
  'common:loading',
  'common:error.generic',
  'common:error.offline',
  'common:error.tryAgain',
];

type FileRef = {
  // Candidate namespaces this call could resolve to. Always >= 1.
  namespaces: string[];
  key: string;
};

function collectKeyPaths(obj: unknown, prefix = ''): string[] {
  if (typeof obj === 'string') return [prefix];
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) return [];
  const out: string[] = [];
  for (const key of Object.keys(obj)) {
    const next = prefix ? `${prefix}.${key}` : key;
    out.push(...collectKeyPaths((obj as Record<string, unknown>)[key], next));
  }
  return out;
}

function loadDefinedKeys(): Set<string> {
  const set = new Set<string>();
  for (const ns of NAMESPACES) {
    const raw = fs.readFileSync(path.join(LOCALE_EN_DIR, `${ns}.json`), 'utf-8');
    for (const key of collectKeyPaths(JSON.parse(raw))) {
      set.add(`${ns}:${key}`);
    }
  }
  return set;
}

function walkSourceFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkSourceFiles(full));
      continue;
    }
    if (!/\.(tsx?|jsx?)$/.test(entry.name)) continue;
    if (/\.test\.(tsx?|jsx?)$/.test(entry.name)) continue;
    out.push(full);
  }
  return out;
}

function extractTranslators(content: string): Map<string, string[]> {
  // Map of t-function-alias → list of namespaces it could resolve to.
  // Multiple useTranslation() calls in one file (e.g., a HelpButton in one
  // function and a TabsLayout in another) all share the bare-`t` alias —
  // we keep both namespaces so static analysis stays permissive enough not
  // to false-flag scope-correct calls. AST scoping would be more precise.
  const map = new Map<string, string[]>();
  const add = (alias: string, ns: string) => {
    const list = map.get(alias) ?? [];
    if (!list.includes(ns)) list.push(ns);
    map.set(alias, list);
  };
  const plain = /\{\s*t\s*\}\s*=\s*useTranslation\(\s*(?:['"]([^'"]+)['"])?\s*\)/g;
  const aliased = /\{\s*t\s*:\s*(\w+)\s*\}\s*=\s*useTranslation\(\s*(?:['"]([^'"]+)['"])?\s*\)/g;
  let match: RegExpExecArray | null = plain.exec(content);
  while (match !== null) {
    add('t', match[1] ?? 'common');
    match = plain.exec(content);
  }
  match = aliased.exec(content);
  while (match !== null) {
    const [, alias, ns] = match;
    if (alias) add(alias, ns ?? 'common');
    match = aliased.exec(content);
  }
  return map;
}

function extractRefs(content: string, translators: Map<string, string[]>): FileRef[] {
  const refs: FileRef[] = [];
  for (const [name, namespaces] of translators) {
    const re = new RegExp(`\\b${name}\\(\\s*['"\`]([^'"\`]+)['"\`]`, 'g');
    let match: RegExpExecArray | null = re.exec(content);
    while (match !== null) {
      const raw = match[1] ?? '';
      if (!raw.includes('${')) {
        if (raw.includes(':')) {
          const [ns, ...rest] = raw.split(':');
          if (ns) refs.push({ namespaces: [ns], key: rest.join(':') });
        } else {
          refs.push({ namespaces: [...namespaces], key: raw });
        }
      }
      match = re.exec(content);
    }
  }
  return refs;
}

function loadAllRefs(): FileRef[] {
  const all: FileRef[] = [];
  for (const dir of SOURCE_DIRS) {
    for (const file of walkSourceFiles(path.join(PROJECT_ROOT, dir))) {
      const content = fs.readFileSync(file, 'utf-8');
      const translators = extractTranslators(content);
      all.push(...extractRefs(content, translators));
    }
  }
  return all;
}

describe('i18n orphan keys', () => {
  const defined = loadDefinedKeys();
  const refs = loadAllRefs();
  const allowlist = new Set([...DYNAMIC_KEY_ALLOWLIST, ...RESERVED_ORPHANS]);

  it('every defined en key is referenced somewhere in src/ or app/', () => {
    const orphans: string[] = [];
    for (const def of defined) {
      if (allowlist.has(def)) continue;
      const [ns, ...rest] = def.split(':');
      const key = rest.join(':');
      const matched = refs.some((r) => r.key === key && r.namespaces.includes(ns ?? ''));
      if (!matched) orphans.push(def);
    }
    expect(orphans.sort()).toEqual([]);
  });

  it('every reserved-orphan entry actually exists in en/*.json', () => {
    const stale = RESERVED_ORPHANS.filter((k) => !defined.has(k)).sort();
    expect(stale).toEqual([]);
  });

  it('every referenced key resolves to a defined key', () => {
    const undefinedRefs = new Set<string>();
    for (const ref of refs) {
      const candidates = ref.namespaces.map((ns) => `${ns}:${ref.key}`);
      const anyDefined = candidates.some((c) => defined.has(c));
      if (!anyDefined) {
        undefinedRefs.add(`${ref.namespaces.join('|')}:${ref.key}`);
      }
    }
    expect([...undefinedRefs].sort()).toEqual([]);
  });
});
