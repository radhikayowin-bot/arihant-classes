const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const siteDir = path.join(root, '_site');

const site = {
  title: 'Ariihant Classes',
  tagline: 'Your Formula for Success',
  description: 'Ariihant Classes in Rajendra Nagar and Rampur Garden, Bareilly offers coaching for XI, XII, IX, X, IIT-JEE, NEET, Foundation, and Commerce Stream.',
  logo: '/assets/images/logo.svg',
  founder: 'R K Bansal',
  founder_role: 'Director & Maths / Applied Maths Mentor',
  phone: '+91 9411496114',
  alternate_phone: '+91 963901504',
  locations: 'Rajendra Nagar & Rampur Garden, Bareilly'
};

const pages = [
  ['index.html', 'index.html', '/'],
  ['about.md', 'about/index.html', '/about/'],
  ['courses.md', 'courses/index.html', '/courses/'],
  ['gallery.md', 'gallery/index.html', '/gallery/'],
  ['founder.md', 'founder/index.html', '/founder/'],
  ['registration.md', 'registration/index.html', '/registration/'],
  ['enrollment.md', 'enrollment/index.html', '/enrollment/'],
  ['contact.md', 'contact/index.html', '/contact/']
];

function rmDir(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyDir(src, dest) {
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(srcPath, destPath);
    else fs.copyFileSync(srcPath, destPath);
  }
}

function parseFrontMatter(input) {
  if (!input.startsWith('---')) return { attrs: {}, body: input };
  const end = input.indexOf('\n---', 3);
  if (end === -1) return { attrs: {}, body: input };
  const raw = input.slice(3, end).trim();
  const attrs = {};
  raw.split(/\r?\n/).forEach((line) => {
    const index = line.indexOf(':');
    if (index !== -1) attrs[line.slice(0, index).trim()] = line.slice(index + 1).trim().replace(/^['"]|['"]$/g, '');
  });
  return { attrs, body: input.slice(end + 4).trim() };
}

function parseData(file) {
  const lines = fs.readFileSync(path.join(root, '_data', file), 'utf8').split(/\r?\n/);
  const items = [];
  let current = null;
  for (const line of lines) {
    if (!line.trim()) continue;
    if (line.startsWith('- ')) {
      current = {};
      items.push(current);
      const rest = line.slice(2);
      const index = rest.indexOf(':');
      if (index !== -1) current[rest.slice(0, index).trim()] = rest.slice(index + 1).trim();
    } else if (current && line.startsWith('  ')) {
      const trimmed = line.trim();
      const index = trimmed.indexOf(':');
      if (index !== -1) current[trimmed.slice(0, index).trim()] = trimmed.slice(index + 1).trim();
    }
  }
  return items;
}

function relativeUrl(value) {
  return value;
}

function lookup(pathName, context) {
  return pathName.split('.').reduce((value, key) => (value ? value[key] : ''), context) || '';
}

function replaceVars(input, context) {
  return input
    .replace(/{{\s*'([^']+)'\s*\|\s*relative_url\s*}}/g, (_, value) => relativeUrl(value))
    .replace(/{{\s*"([^"]+)"\s*\|\s*relative_url\s*}}/g, (_, value) => relativeUrl(value))
    .replace(/{{\s*([^}|]+)\s*\|\s*relative_url\s*}}/g, (_, key) => relativeUrl(lookup(key.trim(), context)))
    .replace(/{{\s*page\.description\s*\|\s*default:\s*site\.description\s*}}/g, context.page.description || context.site.description)
    .replace(/{{\s*'now'\s*\|\s*date:\s*'%Y'\s*}}/g, String(new Date().getFullYear()))
    .replace(/{%\s*if page\.title\s*%}([\s\S]*?){%\s*endif\s*%}/g, (_, inner) => context.page.title ? replaceVars(inner, context) : '')
    .replace(/{{\s*([^}]+?)\s*}}/g, (_, key) => lookup(key.trim(), context));
}

function renderCourses(template, courses) {
  return template.replace(/{%\s*for course in site\.data\.courses\s*%}([\s\S]*?){%\s*endfor\s*%}/g, (_, block) => {
    return courses.map((course) => replaceVars(block, { site: { ...site, data: { courses } }, page: {}, course })).join('');
  });
}

function renderGallery(template, gallery) {
  template = template.replace(/{%\s*for item in site\.data\.gallery limit: 6\s*%}([\s\S]*?){%\s*endfor\s*%}/g, (_, block) => {
    return gallery.slice(0, 6).map((item) => replaceVars(block, { site: { ...site, data: { gallery } }, page: {}, item })).join('');
  });
  return template.replace(/{%\s*for item in site\.data\.gallery\s*%}([\s\S]*?){%\s*endfor\s*%}/g, (_, block) => {
    return gallery.map((item) => replaceVars(block, { site: { ...site, data: { gallery } }, page: {}, item })).join('');
  });
}

function renderAssignments(template) {
  template = template.replace(/{%\s*assign reasons = "([^"]+)" \| split: "\|"\s*%}\s*{%\s*assign icons = "([^"]+)" \| split: "\|"\s*%}\s*{%\s*for reason in reasons\s*%}([\s\S]*?){%\s*endfor\s*%}/g, (_, reasonsRaw, iconsRaw, block) => {
    const reasons = reasonsRaw.split('|');
    const icons = iconsRaw.split('|');
    return reasons.map((reason, index) => block.replace(/{{\s*reason\s*}}/g, reason).replace(/{{\s*icons\[forloop\.index0\]\s*}}/g, icons[index])).join('');
  });
  return template.replace(/{%\s*assign stats = "([^"]+)" \| split: "\|"\s*%}\s*{%\s*for stat in stats\s*%}[\s\S]*?{%\s*endfor\s*%}/g, (_, statsRaw) => {
    return statsRaw.split('|').map((stat) => {
      const first = stat.split(' ')[0];
      const rest = stat.slice(first.length);
      return `<div class="rounded-3xl bg-white/10 p-6 ring-1 ring-white/15"><p class="font-heading text-4xl font-black">${first}</p><p class="mt-2 text-sm font-semibold text-red-50">${rest}</p></div>`;
    }).join('');
  });
}

rmDir(siteDir);
ensureDir(siteDir);
copyDir(path.join(root, 'assets'), path.join(siteDir, 'assets'));

const courses = parseData('courses.yml');
const gallery = parseData('gallery.yml');
const layout = fs.readFileSync(path.join(root, '_layouts', 'default.html'), 'utf8');
const header = fs.readFileSync(path.join(root, '_includes', 'header.html'), 'utf8');
const footer = fs.readFileSync(path.join(root, '_includes', 'footer.html'), 'utf8');

for (const [src, dest] of pages) {
  const raw = fs.readFileSync(path.join(root, src), 'utf8');
  const { attrs, body } = parseFrontMatter(raw);
  let content = renderAssignments(renderGallery(renderCourses(body, courses), gallery));
  const context = { site: { ...site, data: { courses, gallery } }, page: attrs };
  content = replaceVars(content, context);
  let html = layout.replace('{% include header.html %}', header).replace('{% include footer.html %}', footer).replace('{{ content }}', content);
  html = replaceVars(html, context);
  const outPath = path.join(siteDir, dest);
  ensureDir(path.dirname(outPath));
  fs.writeFileSync(outPath, html);
}

console.log(`Preview site built at ${siteDir}`);
