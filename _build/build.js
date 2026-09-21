const pptxgen = require('pptxgenjs');
const path = require('path');
const IMG = n => path.join(__dirname, 'img', n + '.png');

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE';                 // 13.333 x 7.5
pres.author = 'TestNG presentation';
pres.title = 'TestNG — Test Next Generation';

/* ── palette ─────────────────────────────────────────── */
const INK = '15181D', INK2 = '3C4450', MUTED = '8A93A0', FAINT = 'B6BDC8';
const LINE = 'E6E9EF', CARD = 'F7F8FA', WHITE = 'FFFFFF', DARK = '14171C';
const RED = 'B91C1C', REDBG = 'FEF2F2', REDLN = 'E8A8A8', GREEN = '15803D';
const SEC = [
  { a: '3457D5', lite: '7C97F2', tintbg: 'F1F4FE' },   // I
  { a: '0F766E', lite: '3FA9A0', tintbg: 'EFF8F7' },   // II
  { a: '6D28D9', lite: '9B6BF2', tintbg: 'F6F1FE' },   // III
];
const F = 'Segoe UI', FM = 'Consolas', FS = 'Cambria';
const PAGES = 22;

/* ── animation bookkeeping ───────────────────────────── */
let animSeq = 0, slideNo = 0;
// name = s<slide>_anim<order>.  Unique per slide so Morph never matches an
// animated shape; shapes sharing one name animate together as a group.
const A = () => 's' + String(slideNo).padStart(2, '0') + '_anim' + String(++animSeq).padStart(3, '0');
const newSlide = () => { animSeq = 0; slideNo++; return pres.addSlide(); };

const shadow = () => ({ type: 'outer', color: '101C28', blur: 14, offset: 3, angle: 90, opacity: 0.09 });

/* ── reusable chrome ─────────────────────────────────── */
function chrome(s, secIdx, label, page) {
  const c = SEC[secIdx];
  // stable objectNames → Morph glides this chrome from slide to slide
  s.addShape(pres.ShapeType.ellipse, { x: 0.75, y: 0.48, w: 0.36, h: 0.36,
    fill: { color: c.a }, objectName: 'chromeDot' });
  s.addText('I'.repeat(secIdx + 1), {
    x: 0.75, y: 0.48, w: 0.36, h: 0.36, align: 'center', valign: 'middle',
    fontFace: FS, fontSize: 12, bold: true, color: WHITE, isTextBox: true, margin: 0,
    objectName: 'chromeNum',
  });
  s.addText(label.toUpperCase(), {
    x: 1.22, y: 0.48, w: 6, h: 0.36, valign: 'middle', fontFace: F, fontSize: 10.5,
    bold: true, charSpacing: 2.6, color: c.a, isTextBox: true, margin: 0,
    objectName: 'chromeLabel',
  });
  [0, 1, 2].forEach(i => s.addShape(pres.ShapeType.roundRect, {
    x: 0.75 + i * 0.56, y: 6.82, w: 0.44, h: 0.07, rectRadius: 0.035,
    fill: { color: i === secIdx ? c.a : 'DCDEE3' }, objectName: 'rail' + i,
  }));
  s.addText([{ text: String(page), options: { bold: true, color: INK2 } },
             { text: '  / ' + PAGES, options: { color: FAINT } }], {
    x: 11.2, y: 6.66, w: 1.4, h: 0.4, align: 'right', valign: 'middle',
    fontFace: F, fontSize: 10.5, charSpacing: 1.2, isTextBox: true, margin: 0,
    objectName: 'chromePage',
  });
  return c;
}

function heading(s, parts, y = 1.18) {
  s.addText(parts, {
    x: 0.8, y, w: 11.73, h: 0.9, align: 'center', valign: 'middle',
    fontFace: F, fontSize: 34, bold: true, color: INK, isTextBox: true,
    margin: 0, objectName: A(),
  });
}

function card(s, o) {
  const g = A();
  s.addShape(pres.ShapeType.roundRect, {
    x: o.x, y: o.y, w: o.w, h: o.h, rectRadius: 0.13,
    fill: { color: o.fill || CARD }, line: { color: o.line || LINE, width: 1 },
    shadow: shadow(), objectName: g,
  });
  let ty = o.y + 0.3;
  if (o.icon) {
    s.addText(o.icon, { x: o.x + 0.32, y: ty, w: 0.7, h: 0.45, fontFace: 'Segoe UI Emoji',
      fontSize: 19, isTextBox: true, margin: 0, objectName: g });
    ty += 0.6;
  }
  s.addText(o.t, { x: o.x + 0.32, y: ty, w: o.w - 0.64, h: o.th || 0.45,
    fontFace: F, fontSize: o.ts || 17, bold: true, color: o.tc || INK,
    isTextBox: true, margin: 0, objectName: g });
  if (o.d) s.addText(o.d, { x: o.x + 0.32, y: ty + (o.th || 0.45) - 0.03, w: o.w - 0.64, h: o.dh || 1.0,
    fontFace: F, fontSize: o.ds || 11.5, color: MUTED, lineSpacing: 17,
    isTextBox: true, margin: 0, objectName: g });
}

function caption(s, txt, y = 6.05) {
  s.addText(txt, { x: 0.8, y, w: 11.73, h: 0.4, align: 'center', valign: 'middle',
    fontFace: F, fontSize: 11.5, color: MUTED, isTextBox: true, margin: 0, objectName: A() });
}

/* ════════════════ 1 · TITLE ════════════════ */
{
  const s = newSlide();
  s.background = { color: WHITE };
  s.addImage({ path: IMG('testng'), x: 3.71, y: 2.32, w: 5.91, h: 1.367, objectName: A() });
  s.addText([{ text: 'Test ', options: { color: MUTED } },
             { text: 'Next Generation', options: { color: INK, bold: true } }], {
    x: 0.8, y: 4.0, w: 11.73, h: 0.55, align: 'center', valign: 'middle', fontFace: F,
    fontSize: 22, charSpacing: 0.6, isTextBox: true, margin: 0, objectName: A() });
  const gT = A();
  [0, 1, 2].forEach(i => s.addShape(pres.ShapeType.roundRect, {
    x: 6.1 + i * 0.56, y: 5.0, w: 0.44, h: 0.07, rectRadius: 0.035,
    fill: { color: SEC[i].a }, objectName: gT }));
  s.addText('What · History · Why      Pros · Cons · Highlight      Features · Users · Reference', {
    x: 0.8, y: 5.28, w: 11.73, h: 0.4, align: 'center', fontFace: F, fontSize: 11.5,
    color: FAINT, charSpacing: 0.8, isTextBox: true, margin: 0, objectName: gT });
  s.addNotes('"TestNG. Test Next Generation. A name chosen in 2004 - and over the next fifteen minutes we will show it was not an overstatement."\n\n20 seconds. Do not read an agenda; the three coloured sections do that job.');
}

/* ════════════════ DIVIDERS ════════════════ */
function divider(secIdx, roman, title, notes) {
  const s = newSlide();
  const c = SEC[secIdx];
  s.background = { color: DARK };
  s.addText(roman, { x: 0.8, y: 1.55, w: 11.73, h: 2.4, align: 'center', valign: 'middle',
    fontFace: FS, fontSize: 128, bold: true, color: c.a, charSpacing: 4,
    isTextBox: true, margin: 0, objectName: A() });
  s.addText(title, { x: 0.8, y: 3.95, w: 11.73, h: 1.0, align: 'center', valign: 'middle',
    fontFace: F, fontSize: 40, bold: true, color: WHITE, isTextBox: true, margin: 0, objectName: A() });
  s.addShape(pres.ShapeType.roundRect, { x: 6.27, y: 5.2, w: 0.8, h: 0.07,
    rectRadius: 0.035, fill: { color: c.lite }, objectName: A() });
  [0, 1, 2].forEach(i => s.addShape(pres.ShapeType.roundRect, {
    x: 0.75 + i * 0.56, y: 6.82, w: 0.44, h: 0.07, rectRadius: 0.035,
    fill: { color: i === secIdx ? c.lite : '3A3F47' }, objectName: 'rail' + i }));
  s.addNotes(notes);
  return s;
}

divider(0, 'I', 'What  ·  History  ·  Why',
  '"Part one: what TestNG is, where it came from, and why it had to exist."\n\nSPEAKER 1 owns every blue slide. 10 seconds - move on.');

/* ════════════════ 3 · WHAT ════════════════ */
{
  const s = newSlide(); s.background = { color: WHITE };
  const c = chrome(s, 0, 'What', 3);
  s.addImage({ path: IMG('java'), x: 4.87, y: 1.74, w: 0.95, h: 0.95, objectName: A() });
  s.addText('+', { x: 5.82, y: 1.74, w: 0.55, h: 0.95, align: 'center', valign: 'middle',
    fontFace: F, fontSize: 26, color: 'D3D6DB', isTextBox: true, margin: 0, objectName: A() });
  s.addImage({ path: IMG('testng'), x: 6.37, y: 1.977, w: 2.1, h: 0.486, objectName: A() });
  s.addText([{ text: 'Write  ·  Organise  ·  ', options: { color: INK } },
             { text: 'Orchestrate', options: { color: c.a } }], {
    x: 0.8, y: 3.25, w: 11.73, h: 1.0, align: 'center', valign: 'middle',
    fontFace: F, fontSize: 40, bold: true, isTextBox: true, margin: 0, objectName: A() });
  s.addText('Open-source testing framework for Java.', {
    x: 0.8, y: 4.35, w: 11.73, h: 0.5, align: 'center', fontFace: F, fontSize: 16,
    color: MUTED, isTextBox: true, margin: 0, objectName: A() });
  s.addNotes('"One sentence: TestNG is an open-source testing framework for Java. Every framework does the first two words. Everything that makes TestNG different lives in the third one - orchestrate."\n\nPlant the word "orchestrate"; it is the thread of the whole talk. ~40s.');
}

/* ════════════════ 4 · ARCHITECTURE ════════════════ */
{
  const s = newSlide(); s.background = { color: WHITE };
  const c = chrome(s, 0, 'What · architecture', 4);
  heading(s, [{ text: 'Five modules, ', options: { color: INK } },
              { text: 'one engine', options: { color: c.a } }]);

  const box = (x, y, w, h, t, d, o = {}) => {
    const g = o.g || A();
    s.addShape(pres.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.12,
      fill: { color: o.fill || WHITE }, line: { color: o.line || 'DFE3EA', width: o.lw || 1 },
      shadow: o.noshadow ? undefined : shadow(), objectName: g });
    s.addText(t, { x, y: y + (d ? 0.14 : 0), w, h: d ? 0.36 : h, align: 'center',
      valign: 'middle', fontFace: F, fontSize: o.ts || 13.5, bold: true,
      color: o.tc || INK, isTextBox: true, margin: 0, objectName: g });
    if (d) s.addText(d, { x: x + 0.06, y: y + 0.46, w: w - 0.12, h: 0.3, align: 'center', valign: 'middle',
      fontFace: F, fontSize: 10, color: o.dc || MUTED, isTextBox: true, margin: 0, objectName: g });
    return g;
  };
  const arrow = (x1, y1, x2, y2, g) => s.addShape(pres.ShapeType.line, {
    x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1), h: Math.abs(y2 - y1),
    line: { color: 'C7CDD6', width: 1.25, endArrowType: 'triangle',
      beginArrowType: 'none' }, flipH: x2 < x1, flipV: y2 < y1, objectName: g });

  const gIn = A();
  box(0.75, 2.38, 2.85, 0.82, 'XML Configuration', 'suite · test · class · group · parameter', { g: gIn });
  box(0.75, 3.42, 2.85, 0.82, 'Annotation Processor', '@Test · @BeforeMethod · reflection', { g: gIn });
  box(0.75, 4.46, 2.85, 0.82, 'Data Provider', 'feeds methods from @DataProvider', { g: gIn });
  const gA1 = A();
  arrow(3.65, 2.79, 4.45, 3.35, gA1); arrow(3.65, 3.83, 4.45, 3.83, gA1); arrow(3.65, 4.87, 4.45, 4.32, gA1);

  const gE = A();
  s.addShape(pres.ShapeType.roundRect, { x: 4.55, y: 2.62, w: 3.5, h: 2.42, rectRadius: 0.16,
    fill: { color: c.tintbg }, line: { color: c.a, width: 1.75 }, shadow: shadow(), objectName: gE });
  s.addText('TestNG Engine', { x: 4.55, y: 2.9, w: 3.5, h: 0.5, align: 'center',
    fontFace: F, fontSize: 20, bold: true, color: INK, isTextBox: true, margin: 0, objectName: gE });
  s.addText('execution core\nreads config\ndrives the run', {
    x: 4.55, y: 3.45, w: 3.5, h: 1.3, align: 'center', fontFace: F, fontSize: 12.5,
    color: INK2, lineSpacing: 21, isTextBox: true, margin: 0, objectName: gE });

  const gL = A();
  arrow(8.1, 3.83, 8.8, 3.83, gL);
  s.addShape(pres.ShapeType.roundRect, { x: 8.9, y: 3.22, w: 3.55, h: 1.22, rectRadius: 0.12,
    fill: { color: 'F0FDF4' }, line: { color: '9ED0B0', width: 1 }, shadow: shadow(), objectName: gL });
  s.addText('Listeners & Reporter', { x: 8.9, y: 3.38, w: 3.55, h: 0.42, align: 'center',
    valign: 'middle', fontFace: F, fontSize: 16, bold: true, color: GREEN, isTextBox: true, margin: 0, objectName: gL });
  s.addText('every event  ·  HTML / XML', { x: 8.9, y: 3.82, w: 3.55, h: 0.38, align: 'center',
    valign: 'middle', fontFace: F, fontSize: 12, color: '6E9C7E', isTextBox: true, margin: 0, objectName: gL });

  caption(s, 'Modular: configure and extend any piece. The engine stays.', 5.55);
  s.addNotes('"TestNG is modular - five pieces you configure and extend. XML names the suite, the classes, the groups, the parameters. The annotation processor reads @Test and @BeforeMethod through reflection. Data providers feed those methods. The engine is the core: it reads that config and drives the run. Listeners catch every event; the reporter writes HTML or XML."\n\nTrace the path with your hand. Do not read the boxes. ~55s.');
}

/* ════════════════ 5 · 2004 ════════════════ */
{
  const s = newSlide(); s.background = { color: WHITE };
  chrome(s, 0, 'History', 5);
  s.addImage({ path: IMG('junit'), x: 6.07, y: 1.55, w: 1.2, h: 1.2, objectName: A() });
  s.addText('2004', { x: 0.8, y: 2.95, w: 11.73, h: 1.5, align: 'center', valign: 'middle',
    fontFace: F, fontSize: 88, bold: true, color: INK, isTextBox: true, margin: 0, objectName: A() });
  s.addText([{ text: 'JUnit 3 ruled Java. And it ', options: { color: MUTED } },
             { text: "wasn't enough", options: { color: INK, bold: true } },
             { text: '.', options: { color: MUTED } }], {
    x: 0.8, y: 4.55, w: 11.73, h: 0.5, align: 'center', fontFace: F, fontSize: 17,
    isTextBox: true, margin: 0, objectName: A() });
  s.addNotes('"Back to 2004. JUnit 3 was effectively the only option in Java. It was good at what it was built for. The problem is we had started asking it to do something else."\n\n~30s.');
}

/* ════════════════ 6 · NAME WAS THE API ════════════════ */
{
  const s = newSlide(); s.background = { color: WHITE };
  const c = chrome(s, 0, 'History', 6);
  heading(s, [{ text: 'The method name ', options: { color: INK } },
              { text: 'was', options: { color: c.a } },
              { text: ' the API', options: { color: INK } }], 1.55);
  const g = A();
  s.addShape(pres.ShapeType.roundRect, { x: 2.5, y: 3.0, w: 8.33, h: 2.15, rectRadius: 0.15,
    fill: { color: CARD }, line: { color: LINE, width: 1 }, shadow: shadow(), objectName: g });
  s.addText([
    { text: '// JUnit 3\n', options: { color: 'A7AEBA' } },
    { text: 'public void ', options: { color: '9333EA' } },
    { text: 'test', options: { color: 'B45309', bold: true } },
    { text: 'Login() { … }\n', options: { color: INK2 } },
    { text: '// drop four letters → the test silently disappears', options: { color: 'A7AEBA' } },
  ], { x: 3.0, y: 3.22, w: 7.5, h: 1.7, valign: 'middle', fontFace: FM, fontSize: 19,
       lineSpacing: 34, isTextBox: true, margin: 0, objectName: g });
  s.addNotes('"In JUnit 3 you declared a test by naming the method test-something. A naming convention was the API. Drop four letters and the test does not fail - it disappears. Silently. Nobody finds out."\n\nLand hard on the word "silently" - the worst failure mode in testing. ~45s.');
}

/* ════════════════ 7 · CÉDRIC BEUST ════════════════ */
{
  const s = newSlide(); s.background = { color: WHITE };
  chrome(s, 0, 'History', 7);
  s.addImage({ path: IMG('beust'), x: 5.66, y: 1.5, w: 2.0, h: 2.0, rounding: true, objectName: A() });
  s.addText('Cédric Beust', { x: 0.8, y: 3.75, w: 11.73, h: 0.9, align: 'center', valign: 'middle',
    fontFace: F, fontSize: 40, bold: true, color: INK, isTextBox: true, margin: 0, objectName: A() });
  s.addText([{ text: "Didn't patch JUnit. ", options: { color: MUTED } },
             { text: 'Rewrote it.', options: { color: INK, bold: true } }], {
    x: 0.8, y: 4.72, w: 11.73, h: 0.45, align: 'center', fontFace: F, fontSize: 17,
    isTextBox: true, margin: 0, objectName: A() });
  caption(s, 'Inspired by JUnit & NUnit  ·  built for integration testing', 5.35);
  s.addNotes('"Cedric Beust. He did not send JUnit a patch - he started over, took the best of JUnit and of NUnit from .NET, and designed for something JUnit never targeted: integration testing."\n\nSay out loud, not on the slide: JUnit 4 - the annotation-based one - only arrived in 2006. TestNG was two years ahead. ~45s.');
}

/* ════════════════ 8 · THREE WALLS ════════════════ */
{
  const s = newSlide(); s.background = { color: WHITE };
  chrome(s, 0, 'Why', 8);
  heading(s, 'Three walls');
  const w = 3.6, gap = 0.44, x0 = (13.333 - (w * 3 + gap * 2)) / 2;
  card(s, { x: x0, y: 2.5, w, h: 2.2, icon: '🚫', t: 'No groups', d: 'Run only the smoke tests? No mechanism.' });
  card(s, { x: x0 + w + gap, y: 2.5, w, h: 2.2, icon: '🔗', t: 'No dependencies', d: 'Login fails, checkout runs anyway — and fails too.' });
  card(s, { x: x0 + (w + gap) * 2, y: 2.5, w, h: 2.2, icon: '📋', t: 'No parameters', d: 'Ten datasets meant ten copy-pasted methods.' });
  caption(s, 'JUnit 3 was built for isolated unit tests. Integration tests are not isolated.', 5.1);
  s.addNotes('"The real walls were these three: you could not group, you could not declare dependencies, you could not pass parameters. JUnit 3 assumed every test was an island. Integration tests do not live on islands. That gap is the entire reason TestNG exists."\n\n~55s. This closes Part I - hand over.');
}

/* ════════════════ 9 · DIVIDER II ════════════════ */
divider(1, 'II', 'Pros  ·  Cons  ·  Highlight',
  '"Part two: what it buys you, what it costs you, and the one thing worth remembering."\n\nSPEAKER 2 owns every teal slide. 10 seconds.');

/* ════════════════ 10 · FOUR THINGS ════════════════ */
{
  const s = newSlide(); s.background = { color: WHITE };
  const c = chrome(s, 1, 'Pros', 10);
  heading(s, 'Four things you get');
  const w = 2.75, gap = 0.36, x0 = (13.333 - (w * 4 + gap * 3)) / 2;
  const d = [['🧭', 'Order', 'Lifecycle · priority · dependsOn'],
             ['🗂️', 'Data', '@DataProvider · @Factory'],
             ['⚡', 'Speed', 'Native parallel execution'],
             ['🎛️', 'Control', 'testng.xml · listeners · CI']];
  d.forEach((k, i) => card(s, { x: x0 + i * (w + gap), y: 2.6, w, h: 2.05,
    icon: k[0], t: k[1], d: k[2], tc: c.a, fill: c.tintbg, line: c.lite, ts: 19 }));
  s.addNotes('"Four things, not twenty features: Order. Data. Speed. Control. One slide each."\n\n~20s, then straight into the four diagrams.');
}

/* ════════════════ 11 · DEPENDENCY ════════════════ */
{
  const s = newSlide(); s.background = { color: WHITE };
  const c = chrome(s, 1, 'Pros · order', 11);
  heading(s, [{ text: 'One real failure, ', options: { color: INK } },
              { text: 'not three', options: { color: c.a } }]);
  const row = (y, label, labelColor, cells, verdict, vColor) => {
    const g = A();
    s.addText(label, { x: 0.9, y: y - 0.34, w: 5, h: 0.3, fontFace: F, fontSize: 10.5,
      bold: true, charSpacing: 1.8, color: labelColor, isTextBox: true, margin: 0, objectName: g });
    cells.forEach((cl, i) => {
      const x = 0.9 + i * 2.62;
      s.addShape(pres.ShapeType.roundRect, { x, y, w: 2.4, h: 0.86, rectRadius: 0.12,
        fill: { color: cl[2] ? REDBG : CARD },
        line: { color: cl[2] ? REDLN : 'D8DCE2', width: 1, dashType: cl[2] ? 'solid' : 'dash' },
        shadow: shadow(), objectName: g });
      s.addText(cl[0], { x, y: y + 0.11, w: 2.4, h: 0.36, align: 'center', valign: 'middle',
        fontFace: F, fontSize: 14, bold: true, color: cl[2] ? INK : MUTED, isTextBox: true, margin: 0, objectName: g });
      s.addText(cl[1], { x, y: y + 0.45, w: 2.4, h: 0.3, align: 'center', valign: 'middle',
        fontFace: F, fontSize: 10.5, bold: true, color: cl[2] ? RED : 'A6ADB8',
        charSpacing: 0.8, isTextBox: true, margin: 0, objectName: g });
    });
    s.addText(verdict, { x: 8.9, y, w: 3.8, h: 0.86, valign: 'middle', fontFace: F,
      fontSize: 15, bold: true, color: vColor, isTextBox: true, margin: 0, objectName: g });
  };
  row(2.6, 'WITHOUT DEPENDENCIES', MUTED,
    [['login', 'FAIL', 1], ['addToCart', 'FAIL', 1], ['checkout', 'FAIL', 1]],
    '3 red reports  ·  1 cause', RED);
  row(4.55, 'dependsOnMethods', c.a,
    [['login', 'FAIL', 1], ['addToCart', 'SKIPPED', 0], ['checkout', 'SKIPPED', 0]],
    '1 red report  ·  1 cause', c.a);
  s.addNotes('"Login breaks. Without dependencies, cart fails, checkout fails - three red reports, and you spend twenty minutes discovering there was one cause. With dependsOnMethods, TestNG knows the graph: the other two are marked SKIPPED. One red report. One cause."\n\nClosing line: "A skip is not a test being ignored - a skip is information." ~50s.');
}

/* ════════════════ 12 · DATA ════════════════ */
{
  const s = newSlide(); s.background = { color: WHITE };
  const c = chrome(s, 1, 'Pros · data', 12);
  heading(s, [{ text: 'One method, ', options: { color: INK } },
              { text: 'many datasets', options: { color: c.a } }]);
  const g1 = A();
  s.addText('WITHOUT @DATAPROVIDER', { x: 0.9, y: 2.26, w: 7, h: 0.3, fontFace: F, fontSize: 10.5,
    bold: true, charSpacing: 1.8, color: MUTED, isTextBox: true, margin: 0, objectName: g1 });
  ['testLoginChrome', 'testLoginFirefox', 'testLoginSafari'].forEach((t, i) => {
    const x = 0.9 + i * 2.62;
    s.addShape(pres.ShapeType.roundRect, { x, y: 2.62, w: 2.4, h: 0.86, rectRadius: 0.12,
      fill: { color: CARD }, line: { color: 'D8DCE2', width: 1, dashType: 'dash' },
      shadow: shadow(), objectName: g1 });
    s.addText(t, { x, y: 2.73, w: 2.4, h: 0.36, align: 'center', valign: 'middle',
      fontFace: FM, fontSize: 12, bold: true, color: MUTED, isTextBox: true, margin: 0, objectName: g1 });
    s.addText('copy-paste', { x, y: 3.08, w: 2.4, h: 0.3, align: 'center', valign: 'middle',
      fontFace: F, fontSize: 10.5, bold: true, color: 'A6ADB8', charSpacing: 0.8,
      isTextBox: true, margin: 0, objectName: g1 });
  });
  s.addText('3 methods  ·  1 idea', { x: 8.9, y: 2.62, w: 3.8, h: 0.86, valign: 'middle',
    fontFace: F, fontSize: 15, bold: true, color: MUTED, isTextBox: true, margin: 0, objectName: g1 });

  const g2 = A();
  s.addText('@DataProvider', { x: 0.9, y: 3.88, w: 5, h: 0.3, fontFace: F, fontSize: 10.5,
    bold: true, charSpacing: 1.8, color: c.a, isTextBox: true, margin: 0, objectName: g2 });
  s.addShape(pres.ShapeType.roundRect, { x: 0.9, y: 4.24, w: 7.64, h: 1.18, rectRadius: 0.12,
    fill: { color: c.tintbg }, line: { color: c.lite, width: 1 }, shadow: shadow(), objectName: g2 });
  s.addText('testLogin(String browser)', { x: 0.9, y: 4.34, w: 7.64, h: 0.4, align: 'center',
    valign: 'middle', fontFace: FM, fontSize: 16, bold: true, color: INK, isTextBox: true, margin: 0, objectName: g2 });
  ['Chrome', 'Firefox', 'Safari'].forEach((t, i) => {
    const x = 2.05 + i * 1.85;
    s.addShape(pres.ShapeType.roundRect, { x, y: 4.82, w: 1.65, h: 0.42, rectRadius: 0.21,
      fill: { color: WHITE }, line: { color: c.lite, width: 1 }, objectName: g2 });
    s.addText(t, { x, y: 4.82, w: 1.65, h: 0.42, align: 'center', valign: 'middle',
      fontFace: F, fontSize: 12, bold: true, color: c.a, isTextBox: true, margin: 0, objectName: g2 });
  });
  s.addText('1 method  ·  3 datasets', { x: 8.9, y: 4.24, w: 3.8, h: 1.18, valign: 'middle',
    fontFace: F, fontSize: 15, bold: true, color: c.a, isTextBox: true, margin: 0, objectName: g2 });
  caption(s, '@DataProvider parameterizes the method.  @Factory parameterizes the class.', 5.7);
  s.addNotes('"Without a data provider, ten browsers means ten copy-pasted methods. With @DataProvider, one method, many datasets: Chrome, Firefox, Safari - same assertion, three rows. @DataProvider parameterizes the method. @Factory does the same thing one level up: it parameterizes the class."\n\nThis is the wall from slide 8, taken down. ~40s.');
}

/* ════════════════ 13 · PARALLEL ════════════════ */
{
  const s = newSlide(); s.background = { color: WHITE };
  const c = chrome(s, 1, 'Pros · speed', 13);
  heading(s, [{ text: '40 minutes ', options: { color: INK } },
              { text: '→', options: { color: 'C9CDD4' } },
              { text: ' 10', options: { color: c.a } }]);
  const g1 = A();
  s.addText('SEQUENTIAL', { x: 0.9, y: 2.45, w: 4, h: 0.3, fontFace: F, fontSize: 10.5,
    bold: true, charSpacing: 1.8, color: MUTED, isTextBox: true, margin: 0, objectName: g1 });
  ['suite A', 'suite B', 'suite C', 'suite D'].forEach((t, i) => {
    const x = 0.9 + i * 2.5;
    s.addShape(pres.ShapeType.roundRect, { x, y: 2.8, w: 2.32, h: 0.5, rectRadius: 0.09,
      fill: { color: 'E4E7EC' }, objectName: g1 });
    s.addText(t, { x, y: 2.8, w: 2.32, h: 0.5, align: 'center', valign: 'middle',
      fontFace: F, fontSize: 11.5, color: '6B7280', isTextBox: true, margin: 0, objectName: g1 });
  });
  s.addText('40′', { x: 10.95, y: 2.8, w: 1.2, h: 0.5, valign: 'middle', fontFace: F,
    fontSize: 22, bold: true, color: MUTED, isTextBox: true, margin: 0, objectName: g1 });

  const g2 = A();
  s.addText('PARALLEL  ·  thread-count="4"', { x: 0.9, y: 3.95, w: 5, h: 0.3, fontFace: F,
    fontSize: 10.5, bold: true, charSpacing: 1.8, color: c.a, isTextBox: true, margin: 0, objectName: g2 });
  [0, 1, 2, 3].forEach(i => s.addShape(pres.ShapeType.roundRect, {
    x: 0.9, y: 4.32 + i * 0.48, w: 2.32, h: 0.36, rectRadius: 0.07,
    fill: { color: c.a, transparency: i * 13 }, objectName: g2 }));
  s.addText('10′', { x: 3.45, y: 4.72, w: 1.4, h: 0.7, valign: 'middle', fontFace: F,
    fontSize: 30, bold: true, color: c.a, isTextBox: true, margin: 0, objectName: g2 });
  caption(s, 'Granularity:  methods · classes · tests · instances', 6.15);
  s.addNotes('"Parallel execution, in the core - no plugin. Four suites take forty minutes in sequence, ten across four threads. And you pick the granularity: by method, class, test, or instance."\n\nBe honest: only valid when tests share no state - with Selenium that means a ThreadLocal WebDriver. Saying this shows you actually use it. ~45s.');
}

/* ════════════════ 14 · CONTROL ════════════════ */
{
  const s = newSlide(); s.background = { color: WHITE };
  const c = chrome(s, 1, 'Pros · control', 14);
  heading(s, [{ text: "Don't rebuild. ", options: { color: INK } },
              { text: 'Reconfigure.', options: { color: c.a } }]);
  const g1 = A();
  s.addText('TO SKIP A TEST', { x: 0.9, y: 2.26, w: 6, h: 0.3, fontFace: F, fontSize: 10.5,
    bold: true, charSpacing: 1.8, color: MUTED, isTextBox: true, margin: 0, objectName: g1 });
  ['edit Java', 'compile', 'rerun'].forEach((t, i) => {
    const x = 0.9 + i * 2.5;
    s.addShape(pres.ShapeType.roundRect, { x, y: 2.62, w: 2.32, h: 0.7, rectRadius: 0.12,
      fill: { color: 'E4E7EC' }, objectName: g1 });
    s.addText(t, { x, y: 2.62, w: 2.32, h: 0.7, align: 'center', valign: 'middle',
      fontFace: F, fontSize: 15, color: '6B7280', isTextBox: true, margin: 0, objectName: g1 });
  });
  s.addText('touch source', { x: 8.5, y: 2.62, w: 4.0, h: 0.7, valign: 'middle',
    fontFace: F, fontSize: 15, bold: true, color: MUTED, isTextBox: true, margin: 0, objectName: g1 });

  const g2 = A();
  s.addText('testng.xml', { x: 0.9, y: 3.7, w: 5, h: 0.3, fontFace: F, fontSize: 10.5,
    bold: true, charSpacing: 1.8, color: c.a, isTextBox: true, margin: 0, objectName: g2 });
  [['include: smoke', '12 tests'], ['include: regression', '400 tests']].forEach((r, i) => {
    const y = 4.08 + i * 0.72;
    s.addShape(pres.ShapeType.roundRect, { x: 0.9, y, w: 7.4, h: 0.62, rectRadius: 0.12,
      fill: { color: c.tintbg }, line: { color: c.lite, width: 1 }, shadow: shadow(), objectName: g2 });
    s.addText(r[0], { x: 1.15, y, w: 4.4, h: 0.62, valign: 'middle',
      fontFace: FM, fontSize: 15, color: INK, isTextBox: true, margin: 0, objectName: g2 });
    s.addText(r[1], { x: 5.6, y, w: 2.5, h: 0.62, align: 'right', valign: 'middle',
      fontFace: F, fontSize: 16, bold: true, color: c.a, isTextBox: true, margin: 0, objectName: g2 });
  });
  s.addText('same classes', { x: 8.5, y: 4.08, w: 4.0, h: 1.34, valign: 'middle',
    fontFace: F, fontSize: 15, bold: true, color: c.a, isTextBox: true, margin: 0, objectName: g2 });
  caption(s, 'Listeners plug in the same way: screenshot, log, retry — no test edited.', 5.7);
  s.addNotes('"To skip a test the old way, you edit Java, compile, rerun. With testng.xml you pick the run from outside the code: include smoke, twelve tests; include regression, four hundred. Same classes. Different XML. Listeners plug in the same way - screenshot, log, retry - without touching a test method."\n\nThis is the Control card from slide 10, made concrete. ~40s.');
}

/* ════════════════ 15 · CONS ════════════════ */
{
  const s = newSlide(); s.background = { color: WHITE };
  chrome(s, 1, 'Cons', 15);
  heading(s, 'What it costs');
  const w = 5.5, gap = 0.6, x0 = (13.333 - (w * 2 + gap)) / 2;
  card(s, { x: x0, y: 2.55, w, h: 2.62, icon: '🧩', t: 'Complexity',
    d: 'Groups, dependencies, factories, listeners, XML. Powerful combined — and a real learning curve.\n\nMisused dependencies hide the real failure behind a chain of skips.',
    ds: 12.5, dh: 1.9 });
  card(s, { x: x0 + w + gap, y: 2.55, w, h: 2.62, icon: '🪨', t: 'Overkill for unit tests',
    d: "One monolithic dependency vs JUnit 5's modular Platform / Jupiter / Vintage.\n\nIf you only write fast isolated unit tests, the orchestration engine is dead weight — and Spring Boot defaults to JUnit 5.",
    ds: 12.5, dh: 1.9 });
  s.addNotes('"Now the honest part. That power has a price. More mechanisms means more to learn - and dependencies used badly bury the real failure under a chain of skips. And if all you write is isolated unit tests, this whole orchestration engine is dead weight: JUnit 5 is lighter, modular, and the Spring Boot default."\n\nIn front of experts this slide buys credibility for everything before it. Do not rush. ~50s.');
}

/* ════════════════ 16 · TIMELINE ════════════════ */
{
  const s = newSlide(); s.background = { color: WHITE };
  const c = chrome(s, 1, 'Highlight', 16);
  heading(s, [{ text: 'The real win: ', options: { color: INK } },
              { text: 'getting copied', options: { color: c.a } }]);
  const gL = A();
  s.addShape(pres.ShapeType.line, { x: 1.3, y: 4.3, w: 10.75, h: 0.001,
    line: { color: 'DFE3EA', width: 2 }, objectName: gL });
  const nodes = [
    [1.75, '2004', 'TestNG', 'annotations · groups\ndependencies · parallel', true],
    [5.15, '2006', 'JUnit 4', '@Test, @Before', false],
    [8.55, '2017', 'JUnit 5', '@ParameterizedTest · @Tag', false],
    [11.6, '2018', 'JUnit 5.3', 'parallel execution', false],
  ];
  nodes.forEach(n => {
    const g = A(), r = n[4] ? 0.22 : 0.15;
    s.addShape(pres.ShapeType.ellipse, { x: n[0] - r / 2, y: 4.3 - r / 2, w: r, h: r,
      fill: { color: n[4] ? c.a : 'B6BDC8' }, objectName: g });
    s.addText(n[3], { x: n[0] - 1.7, y: n[4] ? 3.28 : 3.55, w: 3.4, h: 0.7, align: 'center',
      valign: 'bottom', fontFace: F, fontSize: 12.5, bold: n[4], color: n[4] ? INK : '6B7280',
      lineSpacing: 17, isTextBox: true, margin: 0, objectName: g });
    s.addText(n[1], { x: n[0] - 1.2, y: 4.58, w: 2.4, h: 0.45, align: 'center',
      fontFace: F, fontSize: n[4] ? 21 : 18, bold: true, color: n[4] ? c.a : INK2,
      isTextBox: true, margin: 0, objectName: g });
    s.addText(n[2], { x: n[0] - 1.2, y: 5.03, w: 2.4, h: 0.35, align: 'center',
      fontFace: F, fontSize: 11.5, color: MUTED, isTextBox: true, margin: 0, objectName: g });
  });
  caption(s, '14 years for the ecosystem to catch up with the 1.0 feature list', 5.75);
  s.addNotes('"This is the slide to remember. You do not measure a framework by market share - you measure it by what competitors had to copy. 2004: TestNG ships annotations, groups, dependencies, parallel. 2006: JUnit 4 adds annotations. 2017: JUnit 5 adds parameterized tests and tags - which are groups. 2018: parallel execution. Fourteen years to catch up with the 1.0 feature list."\n\nPeak of the talk. Slow down; pause after "fourteen years". ~60s. Hand over.');
}

/* ════════════════ 17 · DIVIDER III ════════════════ */
divider(2, 'III', 'Features  ·  Users  ·  Reference',
  '"Part three: what is actually in the box, who uses it, and where to go next."\n\nSPEAKER 3 owns every violet slide. 10 seconds.');

/* ════════════════ 18 · FEATURES ════════════════ */
{
  const s = newSlide(); s.background = { color: WHITE };
  const c = chrome(s, 2, 'Features', 18);
  heading(s, 'Annotation-driven lifecycle');
  const chips = [['@BeforeSuite', 1], ['@BeforeTest', 0], ['@BeforeClass', 0], ['@BeforeMethod', 0],
                 ['@Test', 1], ['@AfterMethod', 0], ['@AfterClass', 0], ['@AfterTest', 0], ['@AfterSuite', 1]];
  const cw = 1.32, cgap = 0.1, total = chips.length * cw + (chips.length - 1) * cgap;
  const cx = (13.333 - total) / 2;
  const gC = A();
  chips.forEach((ch, i) => {
    const x = cx + i * (cw + cgap);
    s.addShape(pres.ShapeType.roundRect, { x, y: 2.42, w: cw, h: 0.52, rectRadius: 0.26,
      fill: { color: ch[1] ? c.a : WHITE }, line: { color: ch[1] ? c.a : LINE, width: 1 },
      objectName: gC });
    s.addText(ch[0], { x, y: 2.42, w: cw, h: 0.52, align: 'center', valign: 'middle',
      fontFace: FM, fontSize: 10, color: ch[1] ? WHITE : INK2, isTextBox: true, margin: 0, objectName: gC });
  });
  const w = 2.75, gap = 0.36, x0 = (13.333 - (w * 4 + gap * 3)) / 2;
  [['Groups', 'smoke · regression'], ['@DataProvider', 'one test, many datasets'],
   ['@Factory', 'many instances, one class'], ['Listeners', 'screenshot · log · retry']]
    .forEach((k, i) => card(s, { x: x0 + i * (w + gap), y: 3.45, w, h: 1.65,
      t: k[0], d: k[1], ts: 16, th: 0.4, dh: 0.6 }));
  caption(s, 'Four lifecycle levels: suite → test → class → method', 5.5);
  s.addNotes('"The lifecycle is annotation-driven, at four levels - suite, test, class, method - so setup and teardown are declarative, not copy-pasted. On top of that: groups, DataProvider for one test across many datasets, Factory for many instances of one class, and listeners that hook every event to screenshot, log, or retry."\n\nSay: "@Factory parameterizes the class; @DataProvider parameterizes the method" - that distinction is the expert-level detail. ~60s.');
}

/* ════════════════ 19 · TESTNG.XML ════════════════ */
{
  const s = newSlide(); s.background = { color: WHITE };
  const c = chrome(s, 2, 'Features · configuration', 19);
  heading(s, [{ text: 'Change the run, ', options: { color: INK } },
              { text: 'not the code', options: { color: c.a } }]);
  const g = A();
  s.addShape(pres.ShapeType.roundRect, { x: 0.9, y: 2.45, w: 6.6, h: 3.05, rectRadius: 0.16,
    fill: { color: WHITE }, line: { color: c.lite, width: 1.6 }, shadow: shadow(), objectName: g });
  s.addText('<suite parallel="methods" thread-count="4">', { x: 1.18, y: 2.62, w: 6.1, h: 0.36,
    fontFace: FM, fontSize: 12.5, bold: true, color: c.a, isTextBox: true, margin: 0, objectName: g });
  s.addShape(pres.ShapeType.roundRect, { x: 1.28, y: 3.05, w: 5.85, h: 2.3, rectRadius: 0.12,
    fill: { color: c.tintbg }, line: { color: 'E7E4F2', width: 1 }, objectName: g });
  s.addText('<test name="Smoke">', { x: 1.55, y: 3.2, w: 5.3, h: 0.32, fontFace: FM,
    fontSize: 11.5, color: INK2, isTextBox: true, margin: 0, objectName: g });
  [['<groups>   include: smoke, critical', 3.6], ['<classes>  LoginTest, CartTest', 4.42]].forEach(r => {
    s.addShape(pres.ShapeType.roundRect, { x: 1.62, y: r[1], w: 5.2, h: 0.68, rectRadius: 0.1,
      fill: { color: WHITE }, line: { color: 'E7E4F2', width: 1 }, objectName: g });
    s.addText(r[0], { x: 1.62, y: r[1], w: 5.2, h: 0.68, valign: 'middle', align: 'center',
      fontFace: FM, fontSize: 11.5, color: '6B7280', isTextBox: true, margin: 0, objectName: g });
  });
  const g2 = A();
  s.addText('Suite → Test → Class', { x: 8.1, y: 2.6, w: 4.4, h: 0.4, fontFace: F,
    fontSize: 18, bold: true, color: INK, isTextBox: true, margin: 0, objectName: g2 });
  const g3 = A();
  s.addText([{ text: 'Every commit  →  smoke only\n', options: { color: GREEN, bold: true } },
             { text: 'Nightly  →  full regression', options: { color: GREEN, bold: true } }], {
    x: 8.1, y: 3.35, w: 4.4, h: 0.9, fontFace: F, fontSize: 15, lineSpacing: 28,
    isTextBox: true, margin: 0, objectName: g3 });
  s.addText('Same codebase.\nDifferent XML file.', { x: 8.1, y: 4.5, w: 4.4, h: 0.8,
    fontFace: F, fontSize: 14, color: MUTED, lineSpacing: 24, isTextBox: true, margin: 0, objectName: g3 });
  s.addNotes('"testng.xml pulls the run strategy out of the Java code. Your per-commit pipeline runs only the smoke group; the nightly pipeline runs full regression. Same codebase, different XML file - no test logic touched, no rebuild."\n\nBridge to CI: runs from Maven, Gradle and the command line, so it drops straight into Jenkins or GitHub Actions. ~50s.');
}

/* ════════════════ 20 · WHO USES IT ════════════════ */
{
  const s = newSlide(); s.background = { color: WHITE };
  const c = chrome(s, 2, 'Who uses it', 20);
  heading(s, [{ text: 'Wherever a suite gets ', options: { color: INK } },
              { text: 'big', options: { color: c.a } }]);
  const w = 3.6, gap = 0.44, x0 = (13.333 - (w * 3 + gap * 2)) / 2;
  [['Automation / QA engineers', 'Selenium & API suites — the dominant home of TestNG'],
   ['Developers', 'Integration & service-level tests'],
   ['DevOps', 'Gating pipelines by group']]
    .forEach((k, i) => card(s, { x: x0 + i * (w + gap), y: 2.35, w, h: 1.85,
      t: k[0], d: k[1], ts: 16, th: 0.72, dh: 0.8 }));
  const logos = ['selenium', 'appium', 'postman', 'maven', 'gradle', 'jenkins',
                 'ghactions', 'gitlab', 'intellij', 'eclipse', 'docker'];
  const lw = 0.62, lgap = 0.44, ltot = logos.length * lw + (logos.length - 1) * lgap;
  const lx = (13.333 - ltot) / 2;
  const gW = A();
  logos.forEach((n, i) => s.addImage({ path: IMG(n), x: lx + i * (lw + lgap), y: 4.85,
    w: lw, h: lw, objectName: gW }));
  caption(s, 'Runs from Maven, Gradle and the command line — so it drops straight into any pipeline', 5.85);
  s.addNotes('"Who reaches for TestNG? Automation and QA engineers first - it is the default in the Selenium world. Developers, for integration and service-level tests. DevOps, to gate pipelines by group. It plugs into Maven, Gradle, Jenkins, GitHub Actions, GitLab, both major IDEs."\n\nDeliberately no customer-logo claims: we have no verifiable source, and an expert audience will ask for one. ~50s.');
}

/* ════════════════ 21 · REFERENCE ════════════════ */
{
  const s = newSlide(); s.background = { color: WHITE };
  const c = chrome(s, 2, 'Reference', 21);
  heading(s, [{ text: 'Still shipping ', options: { color: INK } },
              { text: 'today', options: { color: c.a } }]);
  const H = 0.46, gap = 0.3;
  const badges = [['b_version', 7.191], ['b_commit', 7.509], ['b_stars', 4.195],
                  ['b_contrib', 6.036], ['b_license', 6.409], ['b_java', 4.318]]
                  .map(b => [b[0], +(b[1] * H).toFixed(3)]);
  const rows = [badges.slice(0, 3), badges.slice(3)];
  rows.forEach((r, ri) => {
    const tot = r.reduce((a, b) => a + b[1], 0) + gap * (r.length - 1);
    let x = (13.333 - tot) / 2;
    const g = A();
    r.forEach(b => { s.addImage({ path: IMG(b[0]), x, y: 2.55 + ri * (H + gap), w: b[1], h: H, objectName: g }); x += b[1] + gap; });
  });
  s.addText([{ text: 'testng.org', options: { bold: true, color: INK } },
             { text: '     ·     ', options: { color: FAINT } },
             { text: 'github.com/testng-team/testng', options: { bold: true, color: INK } }], {
    x: 0.8, y: 4.5, w: 11.73, h: 0.5, align: 'center', valign: 'middle', fontFace: F,
    fontSize: 18, isTextBox: true, margin: 0, objectName: A() });
  caption(s, 'Live project figures, captured 21 September 2026', 5.15);
  s.addNotes('"And it is not a museum piece: current release on Maven Central, last commit the day before this deck was built, 218 contributors, Apache 2.0, Java 11 and up."\n\nThese are real figures with a capture date on the slide - if someone asks for a source, it is the shields.io badges on the project repo. Docs at testng.org. ~40s.');
}

/* ════════════════ 22 · CLOSE ════════════════ */
{
  const s = newSlide();
  s.background = { color: DARK };
  s.addText([{ text: 'Not a test runner.', options: { color: WHITE, breakLine: true } },
             { text: 'A test ', options: { color: WHITE } },
             { text: 'orchestrator', options: { color: SEC[2].lite } },
             { text: '.', options: { color: WHITE } }], {
    x: 0.65, y: 2.5, w: 12.03, h: 1.9, align: 'center', valign: 'middle', fontFace: F,
    fontSize: 46, bold: true, lineSpacing: 60, isTextBox: true, margin: 0, objectName: A() });
  s.addText('Thank you.', { x: 0.8, y: 4.85, w: 11.73, h: 0.5, align: 'center',
    fontFace: F, fontSize: 17, color: '8A93A0', isTextBox: true, margin: 0, objectName: A() });
  [0, 1, 2].forEach(i => s.addShape(pres.ShapeType.roundRect, {
    x: 6.1 + i * 0.56, y: 5.85, w: 0.44, h: 0.07, rectRadius: 0.035, fill: { color: SEC[i].lite } }));
  s.addNotes('"Twenty-two years ago someone looked at JUnit 3 and decided not to patch it, but to rewrite it. What came out was not a test runner - it was a test orchestrator. That is why the name Next Generation still holds. Thank you."\n\nTwo-second pause before "Thank you". No Q&A slide. ~25s.');
}

pres.writeFile({ fileName: path.join(__dirname, 'TestNG.pptx') })
  .then(f => console.log('written:', f));
