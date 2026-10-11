const pptxgen = require("pptxgenjs");
const path = require("path");
const SIZES = require("/home/user/cc_yolo_project/Oct11_3pm/deck/evidence/sizes.json");
const sizeOf = (f) => SIZES[path.basename(f)];
const { applyTheme } = require("/root/.claude/skills/synced/1ba17663-7c94-4037-b5c5-839e874a2e21_d1c40c6b-9146-44dd-8f05-4669e50f601f/pptx/scripts/apply_theme.js");

const EV = "/home/user/cc_yolo_project/Oct11_3pm/deck/evidence/";
const OUT = "/home/user/cc_yolo_project/Oct11_3pm/deck/Barclaycard_AI_search_study.pptx";

const THEME = {
  name: "Blue Evidence",
  headFontFace: "Calibri",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "0A1F3D", lt1: "FFFFFF", dk2: "143A6B", lt2: "EAF1F9",
    accent1: "1F5FA8", accent2: "5B8FD0", accent3: "9DBDE3", accent4: "0B2E59", accent5: "C9DBF0", accent6: "3E7CC4",
    hlink: "1F5FA8", folHlink: "5B8FD0",
  },
};
const H = THEME.colors;

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
pres.title = "Barclaycard in AI balance-transfer advice";
pres.author = "Balance-transfer AI search study";
const C = pres.SchemeColor;

const W = 13.33, M = 0.5;

// ---------- layouts ----------
pres.defineSlideMaster({
  title: "DARK",
  background: { color: H.accent4 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: M + 0.3, y: 2.2, w: 11.5, h: 1.6, fontSize: 40, bold: true, color: C.background1, margin: 0, valign: "bottom" } } },
    { placeholder: { options: { name: "body", type: "body", x: M + 0.3, y: 3.95, w: 11.5, h: 1.6, fontSize: 18, color: C.accent5, margin: 0, valign: "top" } } },
  ],
});
pres.defineSlideMaster({
  title: "CONTENT",
  background: { color: H.lt1 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: M, y: 0.35, w: 12.3, h: 0.9, fontSize: 26, bold: true, color: C.text2, margin: 0, valign: "middle" } } },
    { text: { text: "AI balance-transfer study, evidence captured 11 October 2026", options: { x: M, y: 7.05, w: 8, h: 0.3, fontSize: 9, color: C.accent2, margin: 0, isTextBox: true } } },
  ],
  slideNumber: { x: 12.3, y: 7.05, w: 0.6, h: 0.3, fontSize: 9, color: H.accent2 },
});

// ---------- helpers ----------
function img(slide, file, x, y, opts) {
  const f = path.join(EV, file);
  const d = sizeOf(f); const r = d.width / d.height;
  let w = opts.w, h = opts.h;
  if (w && !h) h = w / r; if (h && !w) w = h * r;
  if (w && h && opts.fit) { if (w / h > r) w = h * r; else h = w / r; }
  slide.addImage({ path: f, x, y, w, h, objectName: file, shadow: { type: "outer", blur: 4, offset: 2, angle: 45, color: H.accent4, opacity: 0.25 } });
  if (opts.caption) {
    slide.addText(opts.caption, { x, y: y + h + 0.05, w, h: 0.35, fontSize: 9, color: C.text2, italic: true, margin: 0, isTextBox: true, valign: "top", objectName: "caption " + file });
  }
  return { w, h };
}
function testBox(slide, x, y, w, h, text) {
  slide.addShape(pres.ShapeType.roundRect, { x, y, w, h, fill: { color: C.background2 }, line: { color: C.accent5, width: 0.75 }, rectRadius: 0.08, objectName: "test box" });
  slide.addText([
    { text: "TEST IT  ", options: { bold: true, color: C.accent1, fontSize: 11 } },
    { text, options: { color: C.text1, fontSize: 11 } },
  ], { x: x + 0.15, y: y + 0.05, w: w - 0.3, h: h - 0.1, margin: 0, valign: "top", isTextBox: true, objectName: "test text" });
}
function source(slide, text) {
  slide.addText("Source: " + text, { x: M, y: 6.72, w: 12.3, h: 0.3, fontSize: 9, color: C.accent2, margin: 0, isTextBox: true, objectName: "source" });
}
function para(slide, items, x, y, w, h, opts = {}) {
  const runs = [];
  items.forEach((it, i) => {
    const last = i === items.length - 1;
    if (typeof it === "string") runs.push({ text: it, options: { bullet: opts.bullet !== false ? { indent: 14 } : false, breakLine: !last, paraSpaceAfter: 6 } });
    else runs.push(...it.map((r, j) => ({ text: r.text, options: Object.assign({ bullet: j === 0 && opts.bullet !== false ? { indent: 14 } : false, breakLine: last ? (j < it.length - 1 ? r.breakLine || false : false) : (j === it.length - 1), paraSpaceAfter: 6 }, r.options || {}) })));
  });
  slide.addText(runs, { x, y, w, h, fontSize: opts.fontSize || 14, color: C.text1, margin: 0, valign: "top", isTextBox: true, objectName: opts.name || "body text" });
}
function numCircle(slide, n, x, y, d = 0.42) {
  slide.addShape(pres.ShapeType.ellipse, { x, y, w: d, h: d, fill: { color: C.accent1 }, line: { color: C.accent1 }, objectName: "num " + n });
  slide.addText(String(n), { x, y, w: d, h: d, fontSize: 14, bold: true, color: C.background1, align: "center", valign: "middle", margin: 0, isTextBox: true, objectName: "num text " + n });
}
function statTile(slide, x, y, w, h, big, label, sub) {
  slide.addShape(pres.ShapeType.roundRect, { x, y, w, h, fill: { color: C.background2 }, line: { color: C.accent5, width: 0.75 }, rectRadius: 0.08, objectName: "tile " + label });
  slide.addText(big, { x: x + 0.15, y: y + 0.08, w: w - 0.3, h: 0.72, fontSize: 36, bold: true, color: C.accent1, margin: 0, valign: "middle", isTextBox: true, objectName: "tile big " + label });
  slide.addText(label, { x: x + 0.15, y: y + 0.82, w: w - 0.3, h: 0.55, fontSize: 11.5, bold: true, color: C.text2, margin: 0, valign: "top", isTextBox: true, objectName: "tile label " + label });
  if (sub) slide.addText(sub, { x: x + 0.15, y: y + h - 0.42, w: w - 0.3, h: 0.38, fontSize: 9, color: C.text1, margin: 0, valign: "top", isTextBox: true, objectName: "tile sub " + label });
}
function quote(slide, x, y, w, h, text, who) {
  slide.addShape(pres.ShapeType.rect, { x, y, w, h, fill: { color: C.background2 }, line: { color: C.background2 }, objectName: "quote bg" });
  slide.addText([
    { text: "“" + text + "”", options: { italic: true, fontSize: 11.5, color: C.text1, breakLine: true } },
    { text: who, options: { fontSize: 9.5, color: C.accent1, bold: true } },
  ], { x: x + 0.15, y: y + 0.08, w: w - 0.3, h: h - 0.16, margin: 0, valign: "top", isTextBox: true, objectName: "quote text" });
}
const chartBase = {
  chartColors: [H.accent1],
  showLegend: false, showTitle: false,
  catAxisLabelColor: H.dk2, valAxisLabelColor: H.accent2,
  catAxisLabelFontFace: "+mn-lt", valAxisLabelFontFace: "+mn-lt", dataLabelFontFace: "+mn-lt",
  catAxisLabelFontSize: 11, valAxisLabelFontSize: 10, dataLabelFontSize: 11, dataLabelColor: H.dk2,
  valGridLine: { color: H.accent5, size: 0.5 }, catGridLine: { style: "none" },
  showValue: true, dataLabelPosition: "outEnd",
};

// ---------- slides ----------
pres.addSection({ title: "Summary" });

// 1 Title
{
  const s = pres.addSlide({ masterName: "DARK", sectionTitle: "Summary" });
  s.addText("Barclaycard in AI balance-transfer advice", { placeholder: "title" });
  s.addText("What four AI assistants recommend to a £3,000 balance-transfer customer, why Barclaycard is never the pick, and what to change.\nPrepared for the Head of Credit Cards. Study run and evidence captured 11 October 2026.", { placeholder: "body" });
  s.addNotes("All numbers in this deck come from Oct11_3pm in the study repository: transcripts/ (8 web runs), control/ (4 no-web runs), ground_truth.md (pages fetched the same day), summary.md, results.csv. Screenshots are in deck/evidence/.");
}

// 2 One-page answer
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Summary" });
  s.addText("The one-page answer: the models know Barclaycard, but the sources they rank from do not show the right card", { placeholder: "title" });
  statTile(s, M, 1.45, 2.85, 1.85, "4 of 4", "models shortlist Barclaycard from memory", "No web access. Control runs, turn 2.");
  statTile(s, M + 3.05, 1.45, 2.85, 1.85, "1 of 8", "web runs keep Barclaycard in the unprompted top three", "Turn 2, after persona details.");
  statTile(s, M + 6.1, 1.45, 2.85, 1.85, "7 of 8", "web runs place it in the top three once the user names it", "Turn 3 probe.");
  statTile(s, M + 9.15, 1.45, 2.85, 1.85, "0 of 8", "web runs pick Barclaycard as the card to apply for", "Turn 4 forced choice.");
  para(s, [
    [{ text: "The gap is between memory and the pick. ", options: { bold: true } }, { text: "Every model recalls Barclaycard as a leading issuer and reports its live figures correctly once it opens barclaycard.co.uk. It drops out in the step between: the comparison guides that set the shortlist (Which?, MoneySavingExpert) do not list the 22 month 1.49% card, and label the 36 month card as uncertain against HSBC's and Virgin Money's “definite” terms." }],
    [{ text: "Six causes, each with a screenshot. ", options: { bold: true } }, { text: "Missing 22 month card in the guides; “up to” versus “definite”; a fee 0.06 points above HSBC and 0.15 above the customer's 3% ceiling; no eligibility criteria on Barclaycard pages; offer text that one model read as a card condition; 404s, broken images and inconsistent APR lines." }],
    [{ text: "Decision asked today. ", options: { bold: true } }, { text: "Approve three low-effort actions (slides 17 and 18) and a monthly rerun of the same protocol so the effect can be measured against the baseline on this page." }],
  ], M, 3.6, 12.3, 3.0, { fontSize: 14 });
  source(s, "Oct11_3pm/summary.md sections 1 and 4; results.csv. Each statistic is reproducible from the transcript turn named on the tile.");
  s.addNotes("Tiles: controls 4 of 4 (control/*.md turn 2). Unprompted 1 of 8 is Fable A (transcripts/A-fable.md turn 2, 22 month card third). Prompted 7 of 8: all except Sonnet A. Forced pick 0 of 8: results.csv column t4_pick.");
}

// 3 How to read / falsifiability
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Summary" });
  s.addText("How to read this deck: every claim carries a test that could prove it wrong", { placeholder: "title" });
  const cols = [
    ["Transcripts", "Each count (1 of 8, 7 of 8) points to a turn in a named transcript file. The model's own words are quoted; nothing is paraphrased into a stronger claim.", "Falsified by reading the file and finding a different answer at that turn."],
    ["Screenshots", "Each website claim has a full-page capture and an annotated crop, taken 11 October 2026 between 11:30 and 11:40 UTC with a 1280 pixel desktop viewport. URLs are listed in the appendix.", "Falsified by opening the URL today and finding the page says something else (which would also date the finding)."],
    ["Rerun protocol", "The persona, turn script and scoring are written down in protocol.md. A rerun with the same inputs should reproduce the pattern, not the exact counts.", "Falsified if a rerun with the same protocol puts Barclaycard in the unprompted top three in most runs."],
  ];
  cols.forEach((c, i) => {
    const x = M + i * 4.15;
    s.addShape(pres.ShapeType.roundRect, { x, y: 1.5, w: 3.95, h: 3.6, fill: { color: C.background2 }, line: { color: C.accent5, width: 0.75 }, rectRadius: 0.08, objectName: "col " + i });
    numCircle(s, i + 1, x + 0.2, 1.7);
    s.addText(c[0], { x: x + 0.75, y: 1.68, w: 3, h: 0.45, fontSize: 18, bold: true, color: C.text2, margin: 0, valign: "middle", isTextBox: true, objectName: "col title " + i });
    s.addText(c[1], { x: x + 0.2, y: 2.3, w: 3.55, h: 1.6, fontSize: 12.5, color: C.text1, margin: 0, valign: "top", isTextBox: true, objectName: "col body " + i });
    s.addText([{ text: "Falsified if: ", options: { bold: true, color: C.accent1 } }, { text: c[2].replace(/^Falsified (by|if) /, "") }], { x: x + 0.2, y: 3.95, w: 3.55, h: 1.05, fontSize: 11.5, color: C.text1, margin: 0, valign: "top", isTextBox: true, objectName: "col test " + i });
  });
  para(s, [
    [{ text: "What is inferred rather than observed. ", options: { bold: true } }, { text: "The six causes are the reasons the models themselves gave when they ranked Barclaycard lower, cross-checked against the pages. They are the best available explanation, not a controlled experiment. The measurement plan on slide 18 is how the inference gets tested." }],
    [{ text: "Sample size. ", options: { bold: true } }, { text: "Eight web runs and four controls. One run moving changes a rate by 12.5 points. Read the direction and the repeated reasons, not the decimals." }],
  ], M, 5.35, 12.3, 1.3, { fontSize: 12 });
  source(s, "Oct11_3pm/protocol.md; deck/evidence/README.md for URLs and capture times.");
}

// 4 Method
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Summary" });
  s.addText("Method: one customer, four assistants, two credit profiles, five turns, plus four runs with no web access", { placeholder: "title" });
  // persona card
  s.addShape(pres.ShapeType.roundRect, { x: M, y: 1.5, w: 4.3, h: 4.9, fill: { color: C.background2 }, line: { color: C.accent5, width: 0.75 }, rectRadius: 0.08, objectName: "persona card" });
  s.addText("The customer the models advised", { x: M + 0.2, y: 1.6, w: 3.9, h: 0.4, fontSize: 14, bold: true, color: C.text2, margin: 0, isTextBox: true, objectName: "persona title" });
  para(s, [
    "34, Leeds, renting, employed, £38,000 salary",
    "£3,000 at 24.9% on a small online lender's card",
    "Current account with a building society",
    "Can pay £150 to £200 a month; wants it cleared in 18 to 24 months",
    "Prefers the longest 0% period; fee up to about 3%",
    "Profile A: clean credit, Experian “Good”",
    "Profile B: one missed payment 20 months ago, Experian “Fair”",
    "Has not used an eligibility checker",
  ], M + 0.2, 2.05, 3.9, 4.3, { fontSize: 12 });
  // turn flow
  const turns = [
    ["T1", "Open question", "“Which 0% balance transfer card should I go for?”"],
    ["T2", "Persona answers", "Model's questions answered from the fact sheet; final top three requested with sources"],
    ["T3", "Brand probe", "“A friend mentioned Barclaycard. Where does it sit?”"],
    ["T4", "Forced pick", "One card to apply for, and what would change the answer"],
    ["T5", "Provenance", "Which facts came from where; what was missing from provider pages"],
  ];
  turns.forEach((t, i) => {
    const y = 1.5 + i * 0.8;
    numCircle(s, i + 1, 5.2, y + 0.08, 0.44);
    s.addText([{ text: t[1], options: { bold: true, color: C.text2, breakLine: true } }, { text: t[2], options: { color: C.text1 } }], { x: 5.85, y, w: 3.7, h: 0.75, fontSize: 11.5, margin: 0, valign: "top", isTextBox: true, objectName: "turn " + t[0] });
  });
  // right column: design facts
  s.addText("Design", { x: 9.9, y: 1.5, w: 3, h: 0.4, fontSize: 14, bold: true, color: C.text2, margin: 0, isTextBox: true, objectName: "design title" });
  para(s, [
    "Four assistants (Haiku 5.5, Sonnet 5.5, Opus 5.5, Fable 5.1), medium effort, web search on",
    "4 models x 2 profiles x 5 turns = 40 web turns",
    "4 control runs with no web access, profile A, same script = 20 turns",
    "Every reply logged with the queries run and pages opened",
    "Ground truth: Barclaycard, Barclays, HSBC, MSE and Which? pages fetched the same afternoon",
  ], 9.9, 1.95, 3.0, 4.5, { fontSize: 11.5 });
  testBox(s, 5.2, 5.6, 7.7, 0.8, "Rerun the script in protocol.md with any persona. Falsified if the same inputs produce a materially different pattern (Barclaycard the unprompted pick in most runs).");
  source(s, "Oct11_3pm/protocol.md; transcripts/ and control/ carry the SEARCH LOG after every reply.");
}

pres.addSection({ title: "Results" });
// 5 Results chart
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Results" });
  s.addText("Result: Barclaycard is recalled by every model and chosen by none", { placeholder: "title" });
  s.addChart(pres.ChartType.bar, [{ name: "Web runs (of 8)", labels: ["Unprompted top three (T2)", "Top three once named (T3)", "Card to apply for (T4)", "First or second fallback (T4)"], values: [1, 7, 0, 7] }],
    Object.assign({}, chartBase, { x: M, y: 1.45, w: 7.4, h: 4.2, barDir: "bar", valAxisMaxVal: 8, valAxisMinVal: 0, valAxisMajorUnit: 1, catAxisLabelFontSize: 12, dataLabelFontSize: 12, objectName: "results chart" }));
  s.addText("Web runs in which Barclaycard appears, out of 8", { x: M, y: 5.65, w: 7.4, h: 0.3, fontSize: 10, italic: true, color: C.text2, margin: 0, isTextBox: true, objectName: "chart caption" });
  statTile(s, 8.3, 1.45, 4.5, 1.6, "4 of 4", "controls shortlist Barclaycard with no web access", "Haiku 1st, Sonnet 2nd, Opus 3rd, Fable names the mid-length tier. All quote stale figures.");
  para(s, [
    [{ text: "Recall is not the problem. ", options: { bold: true } }, { text: "The prior is strong and the prompted placement is high." }],
    [{ text: "Selection is. ", options: { bold: true } }, { text: "With retrieval, seven of eight shortlists leave Barclaycard out before the user names it, and no run ends with Barclaycard as the card to apply for." }],
    [{ text: "The fallback position shows the product is competitive: ", options: { bold: true } }, { text: "seven of eight name it first or second if the pick fails." }],
  ], 8.3, 3.25, 4.5, 2.45, { fontSize: 12 });
  testBox(s, M, 6.0, 12.3, 0.65, "Count Barclaycard in the final top three at turn 2 and the single pick at turn 4 across transcripts/*.md. Falsified if the counts differ from 1 and 0.");
  source(s, "Oct11_3pm/results.csv columns barclaycard_in_t2_top3, t3_barclaycard_placement, t4_pick, t4_first_switch; control/*.md turn 2.");
}

// 6 Who won
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Results" });
  s.addText("Who won instead: Virgin Money's 24 month 1.95% card and HSBC's 36 month card took all but one pick", { placeholder: "title" });
  const rows = [
    ["Run", "Profile", "Card the model told the customer to apply for", "First named fallback"],
    ["Haiku", "A good", "HSBC 36m 3.09%", "Barclaycard 36m"],
    ["Sonnet", "A good", "Virgin Money 35m 2.45% (July Moneyfacts figure)", "Halifax 35m, then HSBC"],
    ["Opus", "A good", "HSBC 36m 3.09%", "Barclaycard 36m if pre-approved"],
    ["Fable", "A good", "Virgin Money 24m 1.95%", "HSBC; Barclaycard 22m if pre-approved"],
    ["Haiku", "B fair", "Tesco Low Fee 20m 1.25%", "Barclaycard 22m"],
    ["Sonnet", "B fair", "Virgin Money 36m 3.1%", "Barclaycard 22m"],
    ["Opus", "B fair", "HSBC 36m 3.09%", "Barclaycard 36m"],
    ["Fable", "B fair", "Virgin Money 24m 1.95%", "Capital One; Barclaycard 36m if pre-approved"],
  ];
  const tr = rows.map((r, i) => r.map((c) => ({ text: c, options: i === 0 ? { bold: true, color: H.lt1, fill: { color: H.accent1 }, fontSize: 11 } : { fontSize: 11, color: H.dk1, fill: { color: i % 2 ? H.lt1 : H.lt2 } } })));
  s.addTable(tr, { x: M, y: 1.45, w: 8.2, colW: [0.9, 0.9, 3.6, 2.8], border: { type: "solid", color: H.accent5, pt: 0.5 }, margin: 0.05, rowH: 0.42, objectName: "picks table" });
  statTile(s, 9.0, 1.45, 3.8, 1.3, "4 : 3 : 1 : 0", "Virgin Money : HSBC : Tesco : Barclaycard", "Forced picks at turn 4, eight web runs.");
  para(s, [
    [{ text: "Why those cards: ", options: { bold: true } }, { text: "MSE labels Virgin Money 24m and HSBC 36m “definite”; Virgin's 1.95% fee clears the 3% ceiling with room; HSBC publishes eligibility criteria." }],
    [{ text: "Barclaycard was the fallback in 7 of 8. ", options: { bold: true } }, { text: "The product is competitive on term and fee; it loses on certainty and visibility." }],
    [{ text: "Sonnet A is the outlier: ", options: { bold: true } }, { text: "it never reached MSE and picked from a Moneyfacts chart dated 3 July 2026." }],
  ], 9.0, 2.95, 3.8, 3.0, { fontSize: 11.5 });
  testBox(s, M, 6.0, 12.3, 0.65, "Read turn 4 in each transcript. Falsified if any run names Barclaycard as the single card to apply for, or if the fallback column misquotes a run.");
  source(s, "Oct11_3pm/transcripts/*.md turn 4; results.csv columns t4_pick and t4_first_switch.");
}

// 7 Sources
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Results" });
  s.addText("Where the facts come from: comparison guides set the shortlist, provider pages are checked second", { placeholder: "title" });
  const labels = ["Which?", "barclaycard.co.uk", "Virgin Money", "Nationwide", "HSBC", "Finder", "Tesco Bank", "MoneySavingExpert", "Money to the Masses", "TSB", "barclays.co.uk"];
  const values = [7, 7, 5, 5, 5, 5, 4, 4, 3, 2, 1];
  s.addChart(pres.ChartType.bar, [{ name: "Runs that used the domain", labels: labels.slice().reverse(), values: values.slice().reverse() }],
    Object.assign({}, chartBase, { x: M, y: 1.4, w: 6.6, h: 4.9, barDir: "bar", valAxisMaxVal: 8, valAxisMinVal: 0, valAxisMajorUnit: 1, objectName: "sources chart" }));
  s.addText("Domains used, by number of web runs out of 8", { x: M, y: 6.3, w: 6.6, h: 0.3, fontSize: 10, italic: true, color: C.text2, margin: 0, isTextBox: true, objectName: "chart caption" });
  // path
  const steps = [
    ["Guide sets the shortlist", "Which? or MSE is opened first in every run. Their tables decide which three cards get checked."],
    ["Provider page confirms figures", "Opened second, through a page summariser. Figures read from barclaycard.co.uk were correct in all 8 runs."],
    ["Pick made on the guide's framing", "“Definite” versus “up to”, fee against the 3% ceiling, and stated eligibility decide the tie."],
  ];
  steps.forEach((t, i) => {
    const y = 1.45 + i * 1.25;
    numCircle(s, i + 1, 7.5, y + 0.05, 0.44);
    s.addText([{ text: t[0], options: { bold: true, color: C.text2, breakLine: true } }, { text: t[1], options: { color: C.text1 } }], { x: 8.15, y, w: 4.7, h: 1.15, fontSize: 12, margin: 0, valign: "top", isTextBox: true, objectName: "step " + i });
  });
  para(s, [
    [{ text: "Sonnet never reached MSE in either profile ", options: { bold: true } }, { text: "(“I couldn't find MoneySavingExpert's own ranking”) and built from Which?, then Moneyfacts and money.co.uk." }],
    [{ text: "barclays.co.uk was read once, barclaycard.co.uk seven times. ", options: { bold: true } }, { text: "The two sites list different cards (slide 10)." }],
  ], 7.5, 5.25, 5.35, 1.4, { fontSize: 11.5 });
  source(s, "SEARCH LOG blocks in Oct11_3pm/transcripts/*.md (every reply lists queries and URLs opened); summary.md section 3.");
}

pres.addSection({ title: "Why Barclaycard loses" });
// 8 divider
{
  const s = pres.addSlide({ masterName: "DARK", sectionTitle: "Why Barclaycard loses" });
  s.addText("Why Barclaycard loses: six causes, each with a screenshot", { placeholder: "title" });
  s.addText("Ranked by how many of the eight runs the cause changed. Each slide names the test that would disprove it.", { placeholder: "body" });
}

// 9 Cause 1
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Why Barclaycard loses" });
  s.addText("Cause 1: the 22 month 1.49% card, the best fit for this customer, is not in the guides the models rank from", { placeholder: "title" });
  para(s, [
    [{ text: "Not in MSE's tables. ", options: { bold: true } }, { text: "MSE lists Barclaycard at “up to 36” and “up to 12, no fee” only." }],
    [{ text: "Not in Which?'s tables. ", options: { bold: true } }, { text: "Which? Best Buys show the 12 month no-fee card, with Barclaycard's only Recommended Provider badge." }],
    [{ text: "Not on barclays.co.uk. ", options: { bold: true } }, { text: "The Barclays listing shows four cards; the 22 month card is on barclaycard.co.uk only (slide 15)." }],
    [{ text: "Effect: ", options: { bold: true } }, { text: "Haiku A, which read barclays.co.uk, never knew the card existed. Every run that found it ranked it above the 36 month card for an 18 to 24 month plan. It is the lowest fee of any card over 20 months in any source used." }],
    [{ text: "Runs changed: 5 of 8.", options: { bold: true } }],
  ], M, 1.45, 3.6, 4.4, { fontSize: 11.5 });
  img(s, "E12_which_bestbuy_table.jpg", 4.3, 1.45, { h: 4.2, caption: "Which? Best Buys, 1 Oct 2026: 12 month card only" });
  img(s, "E10_mse_nofee_lowfee_block.jpg", 6.7, 1.45, { h: 4.2, caption: "MSE no-fee and low-fee block, 7 Oct 2026: 12 month card only" });
  img(s, "E3_barclays_listing_four_cards.jpg", 10.0, 1.45, { h: 4.2, caption: "barclays.co.uk: four cards, no 22 month card" });
  testBox(s, M, 6.0, 12.3, 0.65, "Open the MSE guide, the Which? guide and barclays.co.uk/credit-cards/balance-transfer-credit-cards and search the page for “22 month”. Falsified if any of the three lists the 22 month 1.49% card.");
  source(s, "evidence/E10, E12, P3, P5, P6; ground_truth.md lines 23, 35, 51; transcripts/A-haiku.md turn 3.");
  s.addNotes("Runs changed, 5 of 8: Haiku A (never saw the card), Opus A, Opus B, Sonnet A, Sonnet B (saw it only after opening barclaycard.co.uk at turn 3, after the shortlist was set). Fable A found it at turn 1 by opening barclaycard.co.uk directly. The lowest-fee claim: MSE and Which? list no card over 20 months with a fee under 1.95% other than this one.");
}

// 10 Cause 2a
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Why Barclaycard loses" });
  s.addText("Cause 2: MSE labels HSBC, Virgin Money and Tesco “definite” and Barclaycard “up to 36, 32 or 18”, and the models rank on that label", { placeholder: "title" });
  img(s, "E8_mse_definite_block.jpg", M, 1.45, { w: 4.2, caption: "MSE “definite” block: all accepted get the full term" });
  img(s, "E9_mse_upto_barclaycard_row.jpg", 4.95, 1.45, { h: 4.2, caption: "MSE “up to” block: Barclaycard row" });
  quote(s, 8.1, 1.45, 4.75, 1.25, "HSBC's 36 months is listed as definite, while Barclaycard's depends on that check. So HSBC stays first.", "Opus, profile A, turn 3 (transcripts/A-opus.md)");
  quote(s, 8.1, 2.85, 4.75, 1.45, "If it doesn't [pre-approve], the 18-month floor is a real risk with a Fair score, and 18 months at £94.50 would be the worst value on the whole list.", "Fable, profile B, turn 3 (transcripts/B-fable.md)");
  para(s, [
    [{ text: "Cited as the deciding reason by Opus A, Opus B, Fable A and Fable B. ", options: { bold: true } }, { text: "Runs changed: 4 of 8." }],
    [{ text: "Haiku B and Sonnet B ", options: {} }, { text: "repeated the “not guaranteed” caveat without making it decisive." }],
  ], 8.1, 4.45, 4.75, 1.4, { fontSize: 12 });
  testBox(s, M, 6.0, 12.3, 0.65, "Open MSE's guide and compare the wording on the HSBC and Barclaycard rows. Then read turn 3 of the four transcripts named. Falsified if the “definite” label is absent or the runs give a different reason.");
  source(s, "evidence/E8, E9 (MSE guide, updated 7 Oct 2026); transcripts/A-opus.md, B-opus.md, A-fable.md, B-fable.md turn 3.");
}

// 11 Cause 2b
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Why Barclaycard loses" });
  s.addText("Cause 2, continued: the facts that answer “up to” already exist, on the wrong page and the wrong site", { placeholder: "title" });
  img(s, "E5_bc22_seven_in_ten.jpg", M, 1.45, { w: 6.2, caption: "barclaycard.co.uk, 22 month card page, accordion “Why is it 'up to' 22 months?” expanded" });
  img(s, "E7b_hsbc_subject_to_status.jpg", 7.4, 4.7, { w: 5.45, caption: "hsbc.co.uk: HSBC's own page is also conditional (“up to 36”, 14 month outcome in its FAQ)" });
  para(s, [
    [{ text: "Barclaycard already publishes the answer for one card. ", options: { bold: true } }, { text: "The 22 month page says at least 7 in 10 accepted customers last month got the longest period. No model quoted it: it sits inside a collapsed accordion, on a page MSE and Which? do not link to." }],
    [{ text: "The 36 month card has no such statement ", options: { bold: true } }, { text: "on its listing block or on barclays.co.uk. MSE's “36, 32 or 18” is the only tier information any model saw." }],
    [{ text: "HSBC's “definite” is MSE's label, not HSBC's. ", options: { bold: true } }, { text: "HSBC's page says “up to 36 months” and its FAQ lists 36 at 25.9%, 36 at 29.9% or 14 at 29.9%. Opus A and Fable A found this at turn 5 and withdrew “definite”." }],
    [{ text: "Implication: ", options: { bold: true } }, { text: "the asymmetry is in disclosure and labelling, not in the products. It can be closed with wording Barclaycard already uses." }],
  ], 7.4, 1.45, 5.45, 3.2, { fontSize: 11.5 });
  testBox(s, M, 6.0, 12.3, 0.65, "On barclaycard.co.uk/personal/credit-cards/mid-bt-platinum expand the accordion; on hsbc.co.uk open the FAQ “Why are interest-free periods sometimes limited?”. Falsified if the 7 in 10 statement is gone or HSBC guarantees 36 months.");
  source(s, "evidence/E5, E7b, P2, P4; ground_truth.md lines 19 and 27; transcripts/A-opus.md and A-fable.md turn 5.");
}

// 12 Cause 3 fee
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Why Barclaycard loses" });
  s.addText("Cause 3: a 3.15% fee is £1.80 more than HSBC on £3,000, and the models used that to break ties", { placeholder: "title" });
  const cards = [["Virgin Money 24m", 58.5], ["Capital One up to 36m", 87.0], ["HSBC 36m", 92.7], ["Virgin Money 36m", 93.0], ["Barclaycard up to 36m", 94.5], ["Tesco 35m", 94.5], ["Barclaycard up to 24m", 103.5], ["TSB up to 38m", 104.7]];
  s.addChart(pres.ChartType.bar, [{ name: "Fee on £3,000", labels: cards.map((c) => c[0]).reverse(), values: cards.map((c) => c[1]).reverse() }],
    Object.assign({}, chartBase, { x: M, y: 1.4, w: 6.4, h: 4.3, barDir: "bar", valAxisMinVal: 0, valAxisMaxVal: 120, valAxisMajorUnit: 20, dataLabelFormatCode: "£0.00", valAxisLabelFormatCode: "£0", objectName: "fee chart" }));
  s.addText("Fee in pounds on a £3,000 transfer, from each provider's published rate, Oct 2026", { x: M, y: 5.7, w: 6.4, h: 0.3, fontSize: 10, italic: true, color: C.text2, margin: 0, isTextBox: true, objectName: "chart caption" });
  quote(s, 7.3, 1.45, 5.55, 1.0, "The fee is slightly above your 3% ceiling, but only by 0.15 points.", "Haiku, profile A, turn 3 (transcripts/A-haiku.md)");
  quote(s, 7.3, 2.6, 5.55, 1.15, "The fee is a bit higher than HSBC's 3.09% (£92.70). HSBC's 36 months is listed as definite, while Barclaycard's depends on that check. So HSBC stays first.", "Opus, profile A, turn 3 (transcripts/A-opus.md)");
  para(s, [
    [{ text: "The money is trivial; the framing is not. ", options: { bold: true } }, { text: "A customer who says “about 3%” is filtered at 3.00 by the model. 2.9 (Capital One), 2.99 (Nationwide) and 1.95 (Virgin 24m) pass; 3.15 fails and needs a justification." }],
    [{ text: "Where it decided: ", options: { bold: true } }, { text: "Opus B had Barclaycard joint first with HSBC and chose HSBC on fee. Runs changed: 2 of 8." }],
    [{ text: "The 24 and 21 month cards at 3.45% ", options: { bold: true } }, { text: "were rejected in every run that saw them: over the ceiling and shorter than the 36 month card." }],
  ], 7.3, 3.9, 5.55, 2.05, { fontSize: 11.5 });
  testBox(s, M, 6.0, 12.3, 0.65, "Recompute each bar from the fee on the provider's page. Falsified if Barclaycard's 36 month fee is at or below 3.09%, or if Opus B's turn 4 gives a reason other than fee and certainty for choosing HSBC.");
  source(s, "ground_truth.md (Barclaycard 3.15%, HSBC 3.09%, MSE table); transcripts/A-haiku.md, A-opus.md, B-opus.md turns 3 and 4.");
}

// 13 Cause 4 eligibility
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Why Barclaycard loses" });
  s.addText("Cause 4: HSBC states who can apply; Barclaycard's pages do not, so the models treat HSBC as the safer first application", { placeholder: "title" });
  img(s, "E7_hsbc_eligibility_and_subject_to_status.jpg", M, 1.45, { h: 4.3, caption: "hsbc.co.uk: “Who can apply?” lists age, residency, £6,800 income, exclusions" });
  const r = img(s, "E1b_bc36_if_you_apply_box.jpg", 5.95, 1.45, { w: 3.3, caption: "barclaycard.co.uk, 36 month card: the only eligibility text on the listing page" });
  para(s, [
    [{ text: "All eight web runs ", options: { bold: true } }, { text: "listed eligibility criteria (age, income, residency, excluded products) as the first thing missing from provider pages when asked at turn 5." }],
    [{ text: "Haiku A: ", options: { bold: true } }, { text: "“No minimum income is stated on the page.” Haiku A and Opus A used HSBC's explicit criteria to rank HSBC first and Barclaycard as the fallback “if HSBC's income or residency rules fail”." }],
    [{ text: "Also missing on every Barclaycard page, per the models: ", options: { bold: true } }, { text: "whether the checker is a soft search, the typical credit limit, the fee for late transfers, and a “correct as of” date." }],
    [{ text: "Runs changed: 2 to 3 of 8.", options: { bold: true } }],
  ], 9.5, 1.45, 3.35, 4.5, { fontSize: 11.5 });
  testBox(s, M, 6.0, 12.3, 0.65, "Open both pages and search for “income”. Falsified if a Barclaycard balance-transfer page states a minimum age, income or residency requirement, or if fewer than eight transcripts name eligibility as missing at turn 5.");
  source(s, "evidence/E7, E1b, P1, P4; ground_truth.md lines 23 and 27; transcripts/*.md turn 5; A-haiku.md turn 3.");
}

// 14 Cause 5 cashback
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Why Barclaycard loses" });
  s.addText("Cause 5: on the 36 month card, two promotional bullets sit above the terms, and one model read the cashback condition as a card condition", { placeholder: "title" });
  img(s, "E1_bc36_offers_above_terms.jpg", M, 1.45, { h: 4.3, caption: "barclaycard.co.uk listing page: Apple TV and £20 cashback bullets precede the 0% term and the fee" });
  quote(s, 6.6, 1.45, 6.25, 1.3, "Platinum up to 36 month: not available to you. Barclaycard's page says it requires a Barclays personal current account, and its promotion ends on 20 October 2026. You bank with a building society, so I'd rule it out.", "Sonnet, profile B, turn 3 (transcripts/B-sonnet.md)");
  para(s, [
    [{ text: "What the page says: ", options: { bold: true } }, { text: "the current-account condition applies to the £20 cashback only. The card has no such requirement." }],
    [{ text: "Why a model gets it wrong: ", options: { bold: true } }, { text: "the models read a summarised page. The offer block is inside the card's feature list, next to the term and fee, so a summariser merges them. “Offer ends 20 October” also reads as the card ending." }],
    [{ text: "Effect: ", options: { bold: true } }, { text: "Sonnet B excluded the flagship card outright and repeated the error at turns 4 and 5. Runs changed: 1 of 8, but the wrong exclusion was of the headline product." }],
    [{ text: "After 20 October ", options: { bold: true } }, { text: "the offer text goes, and the cause with it, until the next promotion is placed the same way." }],
  ], 6.6, 2.9, 6.25, 3.0, { fontSize: 11.5 });
  testBox(s, M, 6.0, 12.3, 0.65, "Open the listing page and read the 36 month block top to bottom; then read the cashback T&Cs. Falsified if the card itself requires a Barclays current account, or if transcripts/B-sonnet.md turn 3 does not contain the quoted line.");
  source(s, "evidence/E1, P1; ground_truth.md line 11; transcripts/B-sonnet.md turns 3, 4 and 5 (lines 119, 151, 180).");
  s.addNotes("Haiku A read the same offer text on barclays.co.uk and interpreted it correctly (Barclays' cashback offer on this card requires a Barclays personal current account, which you don't have, so ignore it). So the misreading is not universal; it is a risk created by the placement.");
}

// 15 Cause 6 hygiene
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Why Barclaycard loses" });
  s.addText("Cause 6: 404s, broken images, an inconsistent APR line and no dates give the models reasons to trust a third-party figure over Barclaycard's", { placeholder: "title" });
  para(s, [
    [{ text: "Product-level URLs fail. ", options: { bold: true } }, { text: "Barclaycard product pages returned 404 in three runs; Opus B worked from the listing page and Opus A from a search results page. The bare /balance-transfer path is a 404 today." }],
    [{ text: "barclays.co.uk shows broken card images ", options: { bold: true } }, { text: "on three of its four cards, and omits the 22 month card." }],
    [{ text: "A 28.9% APR line sits in the benefits section ", options: { bold: true } }, { text: "of both the 22 month page and the Barclays listing, against the 24.9% headline. The 22 month page links a T&C file named “core-2023.pdf”." }],
    [{ text: "No “correct as of” date on any Barclaycard page. ", options: { bold: true } }, { text: "Which? prints one; the models asked for one in every run." }],
    [{ text: "Result: ", options: { bold: true } }, { text: "Opus B, the Opus control and the Fable control carried a 3.45% fee for the long card from Money to the Masses (May 2026). Opus B corrected it only because it had opened barclaycard.co.uk the same turn." }],
  ], M, 1.4, 5.2, 4.55, { fontSize: 11.5 });
  img(s, "P7_barclaycard_404_balance-transfer.jpg", 5.95, 1.4, { w: 3.3, caption: "barclaycard.co.uk/personal/credit-cards/balance-transfer: 404" });
  img(s, "E6_bc22_289_apr_in_benefits.jpg", 9.5, 1.4, { w: 3.35, caption: "22 month page, benefits section: 28.9% APR" });
  img(s, "E3b_barclays_broken_image.jpg", 5.95, 4.15, { w: 4.6, caption: "barclays.co.uk listing: alt text where the card image should be" });
  testBox(s, M, 6.15, 12.3, 0.5, "Open the four URLs in the appendix. Falsified if the 404 resolves, the images render, the 28.9% line is gone, or a date has been added. Any of these would also date this finding.");
  source(s, "evidence/P7, P8, E3b, E4, E6; ground_truth.md lines 19 and 23; transcripts/B-opus.md turn 3 (line 129), control/opus.md, control/fable.md.");
}

pres.addSection({ title: "What to do" });
// 16 What this is not
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "What to do" });
  s.addText("Three conclusions the evidence does not support, so the fix is not spent on them", { placeholder: "title" });
  const cards = [
    ["Not a brand-awareness problem", "With no web access every model names Barclaycard among the leaders; Haiku and Sonnet rank it first or second from memory. Advertising to the models' training data is not where the gap is.", "control/*.md turn 2. Falsified if a control run omits Barclaycard."],
    ["Not an accuracy problem on barclaycard.co.uk", "Every figure a model read from the Barclaycard page (36m, 3.15%, 22m, 1.49%, 24.9%, 60 days, 12m no fee) was reported correctly, in all runs that opened it. The errors came from a page the model could not reach, from third-party sites, or from one summariser merge.", "summary.md section 2. Falsified if a transcript misquotes a figure it read from barclaycard.co.uk."],
    ["Not a single-model quirk", "The unprompted exclusion happened in all four model families and both credit profiles. The one unprompted inclusion (Fable A) came from opening barclaycard.co.uk at turn 1, which is what action 1 would make unnecessary.", "results.csv column barclaycard_in_t2_top3. Falsified if the pattern is confined to one model."],
  ];
  cards.forEach((c, i) => {
    const x = M + i * 4.15;
    s.addShape(pres.ShapeType.roundRect, { x, y: 1.5, w: 3.95, h: 4.2, fill: { color: C.background2 }, line: { color: C.accent5, width: 0.75 }, rectRadius: 0.08, objectName: "not card " + i });
    s.addText(c[0], { x: x + 0.2, y: 1.65, w: 3.55, h: 0.7, fontSize: 16, bold: true, color: C.text2, margin: 0, valign: "top", isTextBox: true, objectName: "not title " + i });
    s.addText(c[1], { x: x + 0.2, y: 2.4, w: 3.55, h: 2.1, fontSize: 12, color: C.text1, margin: 0, valign: "top", isTextBox: true, objectName: "not body " + i });
    s.addText([{ text: "Test: ", options: { bold: true, color: C.accent1 } }, { text: c[2] }], { x: x + 0.2, y: 4.6, w: 3.55, h: 1.0, fontSize: 10.5, color: C.text1, margin: 0, valign: "top", isTextBox: true, objectName: "not test " + i });
  });
  source(s, "Oct11_3pm/control/*.md; summary.md sections 1, 2 and 4; results.csv.");
}

// 17 Recommendations
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "What to do" });
  s.addText("Eight actions, ranked by how much of the observed loss each would recover", { placeholder: "title" });
  const rows = [
    ["#", "Action", "Evidence", "Runs it would have changed", "Effort"],
    ["1", "Get the 22 month 1.49% card into the MSE and Which? tables and onto barclays.co.uk", "Slide 9", "5 of 8. The only action that reaches the unprompted shortlist", "Low: data submission to two editors, one internal listing"],
    ["2", "Publish the “7 in 10 get the longest period” statistic on the 36 month card and the listing page; give MSE the real tier split", "Slides 10, 11", "4 of 8", "Low: the number already exists for the 22 month card"],
    ["3", "Move offer text (Apple TV, cashback) out of the card's term-and-fee block, under its own heading", "Slide 14", "1 of 8, but a wrong exclusion of the flagship card", "Low: page layout"],
    ["4", "Publish eligibility criteria on every product page: age, residency, income, excluded products, soft-search statement", "Slide 13", "2 to 3 of 8; all 8 flagged it", "Medium: compliance sign-off"],
    ["5", "Stable product-level URLs for each card; align barclays.co.uk with barclaycard.co.uk; fix broken images", "Slide 15", "2 of 8", "Medium: web operations"],
    ["6", "Add “correct as of” dates; remove the 28.9% line from benefits; rename the 2023 T&C file", "Slide 15", "0 directly; every run asked for a date", "Low"],
    ["7", "Review 3.15% against HSBC's 3.09% and the 3.00% round-number filter, or print the pound cost next to the rate", "Slide 12", "2 of 8", "Commercial decision"],
    ["8", "Ask Money to the Masses, Finder and lovemoney to refresh Barclaycard figures", "Slide 15", "1 of 8, plus two controls", "Low: outreach"],
  ];
  const tr = rows.map((r, i) => r.map((c, j) => ({ text: c, options: i === 0 ? { bold: true, color: H.lt1, fill: { color: H.accent1 }, fontSize: 10.5 } : { fontSize: 10, color: H.dk1, bold: j === 0, fill: { color: i <= 3 ? H.lt2 : H.lt1 } } })));
  s.addTable(tr, { x: M, y: 1.4, w: 12.3, colW: [0.4, 5.0, 1.1, 3.0, 2.8], border: { type: "solid", color: H.accent5, pt: 0.5 }, margin: 0.05, rowH: 0.5, objectName: "actions table" });
  s.addText("Shaded rows are the three actions proposed for approval today. “Runs it would have changed” counts runs in which the models gave that cause as a reason for ranking Barclaycard lower.", { x: M, y: 6.2, w: 12.3, h: 0.45, fontSize: 10, italic: true, color: C.text2, margin: 0, isTextBox: true, objectName: "table note" });
  source(s, "Oct11_3pm/barclays_recommendation.md section 3; counts from the cause slides.");
}

// 18 Decision and measurement
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "What to do" });
  s.addText("Decision today, and how we will know it worked", { placeholder: "title" });
  s.addShape(pres.ShapeType.roundRect, { x: M, y: 1.45, w: 5.3, h: 4.5, fill: { color: C.accent4 }, line: { color: C.accent4 }, rectRadius: 0.08, objectName: "decision card" });
  s.addText("Approve", { x: M + 0.25, y: 1.6, w: 4.8, h: 0.45, fontSize: 18, bold: true, color: C.background1, margin: 0, isTextBox: true, objectName: "approve title" });
  s.addText([
    { text: "1  Submit the 22 month 1.49% card to MSE and Which?, and list it on barclays.co.uk", options: { breakLine: true, paraSpaceAfter: 8 } },
    { text: "2  Add the “7 in 10” statement to the 36 month card and share the tier split with MSE", options: { breakLine: true, paraSpaceAfter: 8 } },
    { text: "3  Separate promotional text from card terms on the listing page before the next offer launches", options: { breakLine: true, paraSpaceAfter: 8 } },
    { text: "4  A monthly rerun of this protocol, same persona, four model families, to track the metrics on the right", options: {} },
  ], { x: M + 0.25, y: 2.1, w: 4.8, h: 3.7, fontSize: 13, color: C.background1, margin: 0, valign: "top", isTextBox: true, objectName: "approve list" });
  const rows = [
    ["Metric", "Baseline 11 Oct 2026", "Target"],
    ["Unprompted top-three rate (turn 2)", "1 of 8", "4 of 8"],
    ["Top-three rate once named (turn 3)", "7 of 8", "8 of 8"],
    ["Forced pick rate (turn 4)", "0 of 8", "2 of 8"],
    ["Runs that see the 22 month card from a guide, not only from barclaycard.co.uk", "0 of 8", "8 of 8"],
    ["Runs citing “up to” uncertainty as the reason for ranking below HSBC", "4 of 8", "0 of 8"],
    ["Runs with a wrong Barclaycard eligibility claim", "1 of 8", "0 of 8"],
    ["Runs reporting a Barclaycard product-page 404", "3 of 8", "0 of 8"],
  ];
  const tr = rows.map((r, i) => r.map((c) => ({ text: c, options: i === 0 ? { bold: true, color: H.lt1, fill: { color: H.accent1 }, fontSize: 10.5 } : { fontSize: 10.5, color: H.dk1, fill: { color: i % 2 ? H.lt1 : H.lt2 } } })));
  s.addTable(tr, { x: 6.1, y: 1.45, w: 6.75, colW: [4.15, 1.4, 1.2], border: { type: "solid", color: H.accent5, pt: 0.5 }, margin: 0.05, rowH: 0.48, objectName: "kpi table" });
  s.addText("Read trends over three months: with eight runs, one run moving changes a rate by 12.5 points. Keep all four model families so a change in one vendor's retrieval is not read as a market change.", { x: 6.1, y: 5.5, w: 6.75, h: 0.75, fontSize: 10.5, italic: true, color: C.text2, margin: 0, isTextBox: true, objectName: "kpi note" });
  testBox(s, M, 6.1, 12.3, 0.55, "Each metric is a count from the rerun transcripts, scored the same way as results.csv. The targets are falsifiable by the November rerun.");
  source(s, "Oct11_3pm/barclays_recommendation.md section 5; protocol.md.");
}

// 19 Limits
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "What to do" });
  s.addText("Limits of the study, stated so they can be tested rather than discovered later", { placeholder: "title" });
  const items = [
    ["One persona, one debt size, one day", "A £5,000 debt or a 36 month plan would favour the 36 month card and change the ranking. The 22 month finding is specific to an 18 to 24 month payoff plan."],
    ["Summarised pages, not raw HTML", "Every model read provider pages through a summariser. The layout findings (cause 5) are inferred from what the summariser returned and are corroborated by the screenshot, not proven by it."],
    ["Guides read on a date", "MSE was updated 7 October, Which? 1 October. Editors may update before any submission lands; the screenshots fix what the models saw on 11 October."],
    ["The brand probe is prompted recall", "Turn 3 names Barclaycard for the customer. The turn 2 rate is the better proxy for a customer who names no brand."],
    ["Causes are the models' stated reasons", "Each cause count is the number of runs in which the model gave that reason. A model can give a reason that is not its real driver; the rerun after each fix is the control for that."],
    ["Offer timing", "The Apple TV and cashback offers end 20 October 2026. Cause 5 disappears with them and returns with the next offer placed the same way."],
  ];
  items.forEach((it, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = M + col * 6.25, y = 1.5 + row * 1.6;
    numCircle(s, i + 1, x, y + 0.05, 0.4);
    s.addText([{ text: it[0], options: { bold: true, color: C.text2, breakLine: true } }, { text: it[1], options: { color: C.text1 } }], { x: x + 0.6, y, w: 5.5, h: 1.5, fontSize: 11.5, margin: 0, valign: "top", isTextBox: true, objectName: "limit " + i });
  });
  source(s, "Oct11_3pm/barclays_recommendation.md section 6; protocol.md.");
}

pres.addSection({ title: "Appendix" });
// 20 Evidence index
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Appendix" });
  s.addText("Appendix: evidence index (all captures 11 October 2026, 11:30 to 11:40 UTC, 1280 pixel desktop viewport)", { placeholder: "title" });
  const rows = [
    ["File", "URL", "Used for"],
    ["P1, E1, E1b, E2", "barclaycard.co.uk/personal/credit-cards/balance-transfer-credit-cards", "Offer block above terms; “If you apply” box; 22 month card present"],
    ["P2, E5, E6", "barclaycard.co.uk/personal/credit-cards/mid-bt-platinum", "7 in 10 statement; 28.9% APR in benefits; T&C link ends core-2023.pdf"],
    ["P3, E3, E3b, E4", "barclays.co.uk/credit-cards/balance-transfer-credit-cards/", "Four cards, no 22 month card; broken images; 28.9% APR line"],
    ["P4, E7, E7b", "hsbc.co.uk/credit-cards/products/balance-transfer/", "“Who can apply?”; “subject to status”; FAQ outcomes"],
    ["P5, E8, E9, E10", "moneysavingexpert.com/credit-cards/balance-transfer-credit-cards/", "“Definite” and “up to” blocks; no-fee and low-fee block"],
    ["P6, E11, E12", "which.co.uk/money/credit-cards-and-loans/credit-cards/guides/best-credit-card-deals/best-0-balance-transfer-credit-cards", "Longest table; Best Buy table"],
    ["P7", "barclaycard.co.uk/personal/credit-cards/balance-transfer", "404"],
    ["P8", "barclaycard.co.uk/personal/credit-cards/balance-transfer-credit-cards/36-month", "404 (product-level path a model tried)"],
    ["Transcripts", "Oct11_3pm/transcripts/{A,B}-{haiku,sonnet,opus,fable}.md; control/{haiku,sonnet,opus,fable}.md", "Every quote and count"],
    ["Ground truth", "Oct11_3pm/ground_truth.md", "Page contents as fetched 11 Oct 2026, line numbers cited on slides"],
  ];
  const tr = rows.map((r, i) => r.map((c) => ({ text: c, options: i === 0 ? { bold: true, color: H.lt1, fill: { color: H.accent1 }, fontSize: 10 } : { fontSize: 9.5, color: H.dk1, fill: { color: i % 2 ? H.lt1 : H.lt2 } } })));
  s.addTable(tr, { x: M, y: 1.4, w: 12.3, colW: [1.6, 6.2, 4.5], border: { type: "solid", color: H.accent5, pt: 0.5 }, margin: 0.05, rowH: 0.44, objectName: "evidence table" });
  source(s, "deck/evidence/ in the study repository; README.md there lists capture method and times.");
}

(async () => {
  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("written", OUT);
})();
