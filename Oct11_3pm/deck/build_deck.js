const pptxgen = require("pptxgenjs");
const path = require("path");
const SIZES = require("/home/user/cc_yolo_project/Oct11_3pm/deck/evidence/sizes.json");
const sizeOf = (f) => SIZES[path.basename(f)];
const { applyTheme } = require("/root/.claude/skills/synced/1ba17663-7c94-4037-b5c5-839e874a2e21_d1c40c6b-9146-44dd-8f05-4669e50f601f/pptx/scripts/apply_theme.js");

const EV = "/home/user/cc_yolo_project/Oct11_3pm/deck/evidence/";
const OUT = "/home/user/cc_yolo_project/Oct11_3pm/deck/Barclaycard_AI_search_study.pptx";

const THEME = {
  name: "Blue Evidence",
  headFontFace: "Calibri", bodyFontFace: "Calibri",
  colors: { dk1: "0A1F3D", lt1: "FFFFFF", dk2: "143A6B", lt2: "EAF1F9", accent1: "1F5FA8", accent2: "5B8FD0", accent3: "9DBDE3", accent4: "0B2E59", accent5: "C9DBF0", accent6: "3E7CC4", hlink: "1F5FA8", folHlink: "5B8FD0" },
};
const H = THEME.colors;
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
pres.title = "Barclaycard in AI balance-transfer advice: model by model";
pres.author = "Balance-transfer AI search study";
const C = pres.SchemeColor;
const M = 0.5;

pres.defineSlideMaster({
  title: "DARK", background: { color: H.accent4 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: M + 0.3, y: 2.2, w: 11.5, h: 1.6, fontSize: 40, bold: true, color: C.background1, margin: 0, valign: "bottom", align: "left" } } },
    { placeholder: { options: { name: "body", type: "body", x: M + 0.3, y: 3.95, w: 11.5, h: 2.0, fontSize: 18, color: C.accent5, margin: 0, valign: "top" } } },
  ],
});
pres.defineSlideMaster({
  title: "CONTENT", background: { color: H.lt1 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: M, y: 0.3, w: 12.3, h: 0.9, fontSize: 24, bold: true, color: C.text2, margin: 0, valign: "middle", align: "left" } } },
    { text: { text: "AI balance-transfer study, web-search runs, 11 October 2026", options: { x: M, y: 7.05, w: 8, h: 0.3, fontSize: 9, color: C.accent2, margin: 0, isTextBox: true } } },
  ],
  slideNumber: { x: 12.3, y: 7.05, w: 0.6, h: 0.3, fontSize: 9, color: H.accent2 },
});

// ---------- helpers ----------
function img(slide, file, x, y, opts) {
  const f = path.join(EV, file); const d = sizeOf(f); const r = d.width / d.height;
  let w = opts.w, h = opts.h; if (w && !h) h = w / r; if (h && !w) w = h * r;
  slide.addImage({ path: f, x, y, w, h, objectName: file, shadow: { type: "outer", blur: 4, offset: 2, angle: 45, color: H.accent4, opacity: 0.25 } });
  if (opts.caption) slide.addText(opts.caption, { x, y: y + h + 0.05, w, h: 0.35, fontSize: 9, color: C.text2, italic: true, margin: 0, isTextBox: true, valign: "top", objectName: "caption " + file });
  return { w, h };
}
function testBox(slide, x, y, w, h, text) {
  slide.addShape(pres.ShapeType.roundRect, { x, y, w, h, fill: { color: C.background2 }, line: { color: C.accent5, width: 0.75 }, rectRadius: 0.08, objectName: "test box" });
  slide.addText([{ text: "TEST IT  ", options: { bold: true, color: C.accent1, fontSize: 10.5 } }, { text, options: { color: C.text1, fontSize: 10.5 } }],
    { x: x + 0.15, y: y + 0.05, w: w - 0.3, h: h - 0.1, margin: 0, valign: "top", isTextBox: true, objectName: "test text" });
}
function source(slide, text) {
  slide.addText("Source: " + text, { x: M, y: 6.72, w: 12.3, h: 0.3, fontSize: 9, color: C.accent2, margin: 0, isTextBox: true, objectName: "source" });
}
function card(slide, x, y, w, h, name) {
  slide.addShape(pres.ShapeType.roundRect, { x, y, w, h, fill: { color: C.background2 }, line: { color: C.accent5, width: 0.75 }, rectRadius: 0.08, objectName: "card " + name });
}
function heading(slide, text, x, y, w, size = 14) {
  slide.addText(text, { x, y, w, h: 0.4, fontSize: size, bold: true, color: C.text2, margin: 0, valign: "middle", isTextBox: true, objectName: "heading " + text.slice(0, 20) });
}
// items: array of strings or arrays of runs [{text, options}]
function bullets(slide, items, x, y, w, h, opts = {}) {
  const runs = [];
  items.forEach((it, i) => {
    const last = i === items.length - 1;
    const b = opts.bullet === false ? false : { indent: 12 };
    if (typeof it === "string") runs.push({ text: it, options: { bullet: b, breakLine: !last, paraSpaceAfter: opts.space || 4 } });
    else it.forEach((r, j) => runs.push({ text: r.text, options: Object.assign({ bullet: j === 0 ? b : false, breakLine: j === it.length - 1 ? !last : false, paraSpaceAfter: opts.space || 4 }, r.options || {}) }));
  });
  slide.addText(runs, { x, y, w, h, fontSize: opts.fontSize || 11.5, color: C.text1, margin: 0, valign: "top", isTextBox: true, objectName: opts.name || "bullets" });
}
function quote(slide, x, y, w, h, text, who) {
  slide.addShape(pres.ShapeType.rect, { x, y, w, h, fill: { color: C.background2 }, line: { color: C.background2 }, objectName: "quote bg" });
  slide.addText([{ text: "“" + text + "”", options: { italic: true, fontSize: 10.5, color: C.text1, breakLine: true } }, { text: who, options: { fontSize: 9, color: C.accent1, bold: true } }],
    { x: x + 0.12, y: y + 0.06, w: w - 0.24, h: h - 0.12, margin: 0, valign: "top", isTextBox: true, objectName: "quote text" });
}
function table(slide, rows, x, y, w, colW, opts = {}) {
  const fs = opts.fontSize || 10;
  const tr = rows.map((r, i) => r.map((c, j) => ({ text: c, options: i === 0 ? { bold: true, color: H.lt1, fill: { color: H.accent1 }, fontSize: fs, valign: "middle" } : { fontSize: fs, color: H.dk1, bold: opts.boldFirstCol && j === 0, fill: { color: (opts.shade && opts.shade(i)) ? H.accent5 : (i % 2 ? H.lt1 : H.lt2) }, valign: "top" } })));
  slide.addTable(tr, { x, y, w, colW, border: { type: "solid", color: H.accent5, pt: 0.5 }, margin: 0.04, rowH: opts.rowH || 0.3, objectName: opts.name || "table" });
}
function numCircle(slide, n, x, y, d = 0.38) {
  slide.addShape(pres.ShapeType.ellipse, { x, y, w: d, h: d, fill: { color: C.accent1 }, line: { color: C.accent1 }, objectName: "num " + n });
  slide.addText(String(n), { x, y, w: d, h: d, fontSize: 12, bold: true, color: C.background1, align: "center", valign: "middle", margin: 0, isTextBox: true, objectName: "num text " + n });
}

// ---------- shared content ----------
const T1 = "Hi, I'm in the UK and I've got about £3,000 on a credit card charging me 24.9% APR. I want to move it to a 0% balance transfer card so I can actually clear it. Can you give me your top three cards to consider, ranked, with your reasoning for each? And please tell me where you got each piece of information from, I want to be able to check it.";
const T3 = "A friend mentioned Barclaycard. Where would Barclaycard's balance transfer cards sit in your ranking for me, and why? Please source every number.";
const T4 = "I'm going to apply to one card today. Pick one for me, tell me why, and tell me what would have to be true for you to change that pick.";
const T5 = "Before I apply I want to double check. For each card you named today, where exactly did the 0% length, the fee and the eligibility details come from? Which sites did you rely on most, did you open the providers' own pages, and what came from memory rather than a page? And what information was missing from the card providers' own pages that would have helped you advise me?";

// ---------- per-model data ----------
const MODELS = [
  {
    key: "haiku", name: "Haiku 5.5", n: 1,
    tagline: "Fewest questions, reads Which? first, and in profile A read barclays.co.uk instead of barclaycard.co.uk",
    questions: {
      A: [
        ["Turn 1", "Three multiple-choice questions after a provisional top three:", "1. About how much could you pay each month? a) under £100 b) £100 to £249 c) £250 or more", "2. How would you describe your credit score? a) good or excellent b) fair c) not sure", "3. Zero fee on a shorter deal, or a longer deal with a fee of about £90 to £105?"],
        ["Turns 2 to 5", "No further questions. Turn 5 ends with an instruction rather than a question: ask HSBC or the small online lender whether the transfer will be accepted."],
      ],
      B: [
        ["Turn 1", "Two multiple-choice questions after a provisional top three:", "1. How much could you realistically pay each month? a) about £150 or more b) about £250 c) around £85 d) not sure yet", "2. How would you describe your credit history? a) good b) fair c) patchy or poor d) not sure"],
        ["Turns 2 to 5", "No further questions."],
      ],
    },
    common: {
      both: ["Monthly repayment capacity (bands differ: A's bands separate the 12 month no-fee card from the 36 month cards; B's bands map to the three cards it had already found, £85 for 36 months, £150 for Tesco's 20 months, £250 for 12 months)", "Credit standing (A asks for a score band, B for a history band)"],
      aOnly: ["Preference between a no-fee shorter deal and a longer deal with a fee"],
      bOnly: [],
      never: ["Who issues the current card (the same-group transfer rule)", "Whether the user banks with any issuer", "Whether the card is needed for spending"],
      reading: "Haiku asks only what it needs to pick a band of cards it has already found. It never asks about banking relationships, so the Barclays current-account condition on the cashback never comes up; it reads it off the page instead.",
    },
    sources: [
      ["Which? guide", "opened, turns 1 to 4", "opened, turns 1, 3, 5", "The shortlist in both runs; Virgin and TSB figures (never checked with the provider); the wrong Vanquis entry in A"],
      ["MoneySavingExpert", "not used", "opened, turns 1 to 3, 5", "Barclaycard pre-approval tiers (36, 32 or 18; 12 or 6); 'up to' wording"],
      ["barclays.co.uk listing", "opened, turns 3, 4", "not used", "Every Barclaycard figure in A: four cards, the 22 month card absent"],
      ["barclaycard.co.uk listing", "not used", "opened, turns 3 to 5", "Every Barclaycard figure in B: five cards including the 22 month card"],
      ["HSBC product page", "opened, turns 2 to 5", "opened, turns 2, 3, 5", "HSBC terms and the only full eligibility list seen"],
      ["Tesco Bank (two pages)", "not used", "opened, turns 1 to 5", "Tesco figures and the word 'guaranteed'"],
      ["Nationwide (two pages)", "not used", "opened, turns 2, 5", "Exclusion: membership required"],
      ["Vanquis", "opened, turn 2", "not used", "Correction of Which?'s 36 month no-fee entry (page says 24 months, 4.5%)"],
      ["Uswitch", "opened, turn 1", "not used", "A general note only; the page showed provider logos"],
      ["Finder; lovemoney (2014)", "lovemoney snippet, ignored", "Finder snippet, not opened", "Virgin 24 month card dropped as unverified; old Barclaycard article ignored"],
    ],
    reliedOn: [
      ["Which? for the comparison of cards, and the provider pages for HSBC, Barclays and Vanquis.", "Haiku, profile A, turn 5"],
      ["The provider pages for each card I recommended (Tesco, Barclaycard, HSBC, Nationwide), then MoneySavingExpert and Which? for the market list and the Barclaycard pre-approval wording.", "Haiku, profile B, turn 5"],
    ],
    options: {
      A: [["T1 provisional", "Vanquis 36m no fee (wrong, corrected at T2); HSBC 36m 3.09%; Barclaycard 12m no fee"], ["T2 final three", "HSBC 36m 3.09%; Virgin Money 36m 3.1%; TSB 38m 3.49%"], ["T3 Barclaycard", "36m card to 2nd behind HSBC; 24m and 21m over the fee ceiling; 12m too short. The 22m card never appeared (read from barclays.co.uk)"], ["T4 pick", "HSBC. Switch to Barclaycard 36m if HSBC's income or residency rules fail; to Barclaycard 12m if £250 a month is possible"]],
      B: [["T1 provisional", "Tesco Low Fee 20m 1.25%; Barclaycard 12m no fee; Barclaycard up to 36m 3.15%"], ["T2 final three", "Tesco Low Fee 20m; Tesco 35m 3.15%; HSBC 36m 3.09%"], ["T3 Barclaycard", "22m card to 2nd; 36m level with HSBC, below Tesco 35m; 12m drops out; 24m and 21m over the ceiling"], ["T4 pick", "Tesco Low Fee. Switch to Barclaycard 22m if Tesco declines"]],
    },
    whyQuotes: [
      ["The fee is slightly above your 3% ceiling, but only by 0.15 points. [...] No minimum income is stated on the page.", "Profile A, turn 3, on the 36 month card"],
      ["It's the only card I've checked on the provider's own page that meets all three of your conditions.", "Profile A, turn 4, why HSBC"],
      ["Unlike the Barclaycard cards, which say 'up to' a period, Tesco says 'guaranteed'.", "Profile B, turn 4, why Tesco"],
      ["I couldn't find it on Which? or MoneySavingExpert, so it has a single source.", "Profile B, turn 5, on the 22 month card"],
    ],
    improve: [
      ["List the 22 month card on barclays.co.uk.", "Haiku A searched 'Barclaycard balance transfer' and landed on barclays.co.uk, which shows four cards. It never learned the 22 month card existed and ranked the 36 month card instead.", "A, turns 3 to 5"],
      ["Use the word 'guaranteed' where it is true, and publish the full-term share where it is not.", "Tesco's 'guaranteed 20 months' beat Barclaycard's 'up to 22 months' for the pick in B, at a £7 difference in fee.", "B, turns 3 and 4"],
      ["Publish eligibility criteria and say whether the checker is a soft search.", "'No minimum income is stated on the page' (A). 'I found no published criteria... I don't know whether it's a soft or hard search' (B).", "A turn 3; B turn 5"],
      ["Get the 22 month card into Which? and MSE.", "Haiku B flagged it as single-sourced; Haiku A, which read Which? four times, never saw it.", "B, turn 5"],
      ["Add the balance-transfer rate after the 0% period, the late-transfer fee and a clear statement that the 60 day window starts at account opening.", "All three were listed by Haiku B as missing from Barclaycard's page.", "B, turn 5"],
    ],
    improveImg: ["E3_barclays_listing_four_cards.jpg", "barclays.co.uk listing read by Haiku A: four cards, no 22 month card"],
    improveTest: "Open barclays.co.uk/credit-cards/balance-transfer-credit-cards and search for '22 month'. Falsified if the card is listed. Then read transcripts/A-haiku.md turn 3: falsified if the 22 month card is mentioned.",
  },
  {
    key: "sonnet", name: "Sonnet 5.5", n: 2,
    tagline: "Builds everything from comparison sites, never reaches MSE, and in profile B excluded the 36 month card on a misread condition",
    questions: {
      A: [
        ["Turn 1", "Four questions after a provisional top three:", "1. How much can you realistically pay each month? a) under £100 b) £100 to £200 c) £250 or more", "2. Lowest total cost, or lowest monthly payment?", "3. Have you been declined recently, or is your record patchy? a) clean b) some missed payments or defaults c) not sure", "4. Is the 24.9% card with HSBC, TSB, Barclaycard or Virgin? (same-provider transfers are blocked)"],
        ["Turns 2 to 5", "No further questions."],
      ],
      B: [
        ["Turn 1", "Four questions after a provisional top three:", "1. Who issues your current card? a) HSBC or Virgin Money b) TSB c) something else", "2. How much could you realistically pay each month? a) under £85 b) £85 to £250 c) over £250", "3. How is your credit rating? a) good b) fair c) poor or unsure", "4. Do you need the card for new spending too? a) no, balance only b) yes"],
        ["Turns 2 to 5", "No further questions."],
      ],
    },
    common: {
      both: ["Monthly repayment capacity", "Credit rating or record", "Who issues the current card (to apply the same-group rule)"],
      aOnly: ["Lowest total cost versus lowest monthly payment"],
      bOnly: ["Whether the card is needed for new spending"],
      never: ["Whether the user banks with any issuer (so the Barclays current-account condition was read from the page, and misread in B)"],
      reading: "Sonnet asks the most complete set of the four models, and asks it once. Its turn 1 picks are already conditional on the answers ('HSBC if you answer a or b, Barclaycard if c').",
    },
    sources: [
      ["Which? guide", "opened, turns 1, 2", "opened, turns 1 to 3, 5", "The shortlist in both runs; the only source for Virgin, HSBC, TSB and Vanquis in B, including the final pick"],
      ["MoneySavingExpert", "searched for, never found", "searched for, never found", "'I couldn't find MoneySavingExpert's own ranking' (A). Neither run saw MSE's 'definite' labels or Barclaycard tiers"],
      ["Moneyfactscompare", "opened, turn 2", "not used", "The final pick in A: Virgin 35m at 2.45%, from a chart whose FAQ dates it to 3 July 2026"],
      ["Finder", "snippet T1; Virgin page opened T4 (updated 10 April 2026)", "not used", "Second source for the Virgin 35m figures"],
      ["money.co.uk", "not used", "opened, turn 2", "General rules: same-group ban, 60 to 90 day windows, eligibility checkers"],
      ["barclaycard.co.uk listing", "opened, turn 3 (a first URL returned 404)", "opened, turn 3 (a first URL returned 404)", "Every Barclaycard figure, including the 22 month card and the cashback conditions"],
      ["Nationwide", "opened, turn 2", "not used", "Exclusion: membership required"],
      ["Tesco Bank (old 'lowfee' index page)", "not used", "opened, turn 2", "Tesco 35m figures; no offer date on the page"],
      ["Virgin Money", "product page 404 at turn 4", "never attempted", "The pick in both runs was never checked on Virgin's site"],
      ["Money to the Masses", "403, not used", "not used", ""],
    ],
    reliedOn: [
      ["Moneyfactscompare, Which? and Finder, then Barclaycard's and Nationwide's own pages. For Virgin, HSBC, TSB, Halifax and Lloyds, they come from comparison sites, not the issuer.", "Sonnet, profile A, turn 5"],
      ["Which?, for four cards including my top pick, then the Barclaycard and Tesco pages. [...] For your top pick I did not open Virgin's page.", "Sonnet, profile B, turn 5"],
    ],
    options: {
      A: [["T1 provisional", "HSBC 36m 3.09%; TSB 38m 3.49%; Barclaycard 12m no fee"], ["T2 final three", "Virgin Money 35m 2.45% (Moneyfacts, July data); Halifax 35m 2.49%; HSBC 36m 3.09%"], ["T3 Barclaycard", "36m card 4th: 3.15% against HSBC's 3.09%, above the 3% ceiling, Virgin and Halifax cheaper for similar length. 22m card 5th: cheapest fee but 'up to' and one month of slack at £150"], ["T4 pick", "Virgin Money 35m 2.45%. Switch to Halifax or HSBC if the offer is worse; to Barclaycard 12m only at £250 a month"]],
      B: [["T1 provisional", "HSBC 36m; TSB 38m; Vanquis 36m no fee (40.9% APR)"], ["T2 final three", "Virgin Money 36m 3.1%; HSBC 36m 3.09%; Tesco 35m 3.15%"], ["T3 Barclaycard", "22m card to 2nd (would be 1st on lowest cost). 36m card 'not available to you': the model read the cashback's current-account condition as a card condition. 24m and 21m over the ceiling; 12m too short"], ["T4 pick", "Virgin Money 36m 3.1%. Switch to Barclaycard 22m if Virgin offers under 24 months or if the user prefers the lowest fee; to HSBC if Virgin's terms have changed"]],
    },
    whyQuotes: [
      ["The fee is 3.15%, against 3.09% for HSBC on Moneyfactscompare. That's a few pounds more for HSBC's 36 months, so HSBC beats it.", "Profile A, turn 3"],
      ["Platinum up to 36 month: not available to you. Barclaycard's page says it requires a Barclays personal current account, and its promotion ends on 20 October 2026.", "Profile B, turn 3 (the condition belongs to the £20 cashback)"],
      ["Barclaycard's 22-month card has a lower fee but, per Barclaycard, only 'up to' 22 months. That leaves little margin at £150 a month.", "Profile A, turn 4"],
      ["If you value the lowest cost over the longest safety net, Barclaycard moves to number 1.", "Profile B, turn 3"],
    ],
    improve: [
      ["Move the Apple TV and cashback bullets out of the 36 month card's term-and-fee block, and state that no Barclays account is needed for the card.", "Sonnet B excluded the flagship card outright and repeated the exclusion at turns 4 and 5.", "B, turns 3 to 5"],
      ["Get the 22 month card into the Which? tables.", "Which? is the first page Sonnet opens in both runs and the only source for its final pick in B. Which? shows only the 12 month card.", "A turn 1; B turns 1 to 5"],
      ["Keep Moneyfacts and Finder current.", "Sonnet A's pick came from a Moneyfacts chart dated 3 July 2026 and a Finder page dated 10 April 2026; neither matches the October MSE or Which? tables.", "A, turns 2, 4, 5"],
      ["Fix the 404 at barclaycard.co.uk/personal/credit-cards/balance-transfer.", "Both Sonnet runs hit a 404 on their first Barclaycard URL before finding the listing page.", "A turn 3; B turn 5"],
      ["Explain how the offered term is decided, and add offer dates to every card, not only the promotions.", "'How the offered term is decided, and no acceptance odds for a Fair band' were Sonnet B's named gaps; 'the date of the information on each page' was Sonnet A's.", "A and B, turn 5"],
    ],
    improveImg: ["E1_bc36_offers_above_terms.jpg", "The 36 month block Sonnet B read: two offer bullets above the term and fee, and the current-account condition inside the second"],
    improveTest: "Read transcripts/B-sonnet.md line 119 and the cashback T&Cs. Falsified if the card itself requires a Barclays current account. Open the Which? guide and search for '22 month': falsified if the card is listed.",
  },
  {
    key: "opus", name: "Opus 5.5", n: 3,
    tagline: "Opens the most provider pages, applies MSE's 'definite' label in A, and in B came within a 404 of picking Barclaycard",
    questions: {
      A: [
        ["Turn 1", "Four questions after a provisional top three:", "1. Who is your current card with? a) HSBC / first direct / M&S b) Lloyds / Halifax / BoS / MBNA c) Barclays d) TSB e) Virgin Money f) Tesco g) other", "2. How much could you pay each month? a) under £100 b) £100 to £150 c) £150 to £250 d) £250 or more", "3. How's your credit history? a) clean b) a few late payments c) a default or CCJ in the last 6 years", "4. Do you bank with any of these? a) HSBC b) Barclays c) Virgin Money d) TSB e) none"],
        ["Turns 2 to 5", "No further questions."],
      ],
      B: [
        ["Turn 1", "Four questions after a provisional top three:", "1. Which bank issued your current card? a) TSB b) HSBC / first direct / M&S c) Virgin Money / Nationwide d) someone else", "2. Roughly how much could you pay each month? a) under £85 b) £85 to £150 c) £150 to £250 d) £250+", "3. How's your credit history? a) good b) a few late payments c) defaults or CCJs in the last 6 years", "4. Which matters more? a) the lowest upfront fee b) the longest time at 0%"],
        ["Turns 2 to 5", "No further questions. Turn 4 ends with an offer: 'If you tell me what the checker shows, I can help you decide what to do next.'"],
      ],
    },
    common: {
      both: ["Who issues the current card, with the banking groups spelled out", "Monthly repayment capacity", "Credit history (clean, late payments, default or CCJ)"],
      aOnly: ["Whether the user banks with HSBC, Barclays, Virgin Money or TSB"],
      bOnly: ["Lowest upfront fee versus longest 0% period"],
      never: ["Whether the card is needed for spending"],
      reading: "Opus leads with the same-group rule in both runs and names the groups from memory (turn 5 admits this). The banking-relationship question in A is why the Barclays cashback was dismissed in one line rather than misread.",
    },
    sources: [
      ["MoneySavingExpert", "opened, every turn", "not used at all", "In A: the 'definite' versus 'up to' labels, the Barclaycard tiers, Tesco, Virgin 24m and Capital One figures. In B, Opus never opened MSE"],
      ["HSBC product page", "opened, turns 1 to 5", "opened, turns 1 to 5 (twice at T4)", "HSBC terms and eligibility; in B the FAQ's 14 month outcome was found at turn 4"],
      ["barclaycard.co.uk/personal/search-balance-transfer", "opened, turns 3, 4", "not used", "A search-results page served as the source for all Barclaycard figures in A"],
      ["barclaycard.co.uk/personal/credit-cards", "not used", "opened, turns 3, 4", "The credit-cards listing; the 36 month card's own product page returned 'not found'"],
      ["TSB", "opened, turns 1, 2", "opened, turns 1, 2, 5", "TSB terms and eligibility"],
      ["Virgin Money BT page", "opened, turn 2", "opened, turns 1 to 3", "Page shows 'up to 36 months', 27.9% APR and no fee; the 24m 1.95% card is not on it"],
      ["Nationwide (page, hub, press release)", "not used", "opened, turns 2 to 4", "Second place at T2 in B, with the membership condition"],
      ["Which?", "not used", "snippet only", "The 3.1% Virgin fee and a 24.9% HSBC APR, both from search results"],
      ["Finder; Santander; Lloyds", "Finder snippet", "snippets; Lloyds site errored twice", "Barclaycard 12m first seen on Finder in B; Lloyds and Santander figures never verified"],
      ["Money to the Masses (May 2026)", "not used", "snippet, turns 3 to 5", "The 3.45% fee for the long card, flagged as probably stale"],
      ["Tesco; Capital One", "could not open", "not attempted", "Tesco and Capital One figures came from MSE only"],
    ],
    reliedOn: [
      ["Two sites did most of the work. I relied most on MoneySavingExpert's balance transfer comparison, updated 7 October 2026. I also used the provider pages I could open: HSBC, TSB, Virgin Money and Barclaycard.", "Opus, profile A, turn 5"],
      ["The providers' own pages, which I opened for HSBC, Barclaycard (listing page only), Nationwide, Virgin Money and TSB. Then Which? and Finder, but only through search results.", "Opus, profile B, turn 5"],
    ],
    options: {
      A: [["T1 provisional", "HSBC 36m 3.09%; Tesco Low Fee 20m 1.25%; TSB 38m 3.49%. Alternatives named: Virgin 36m, Barclaycard 12m no fee"], ["T2 final three", "HSBC 36m; Virgin Money 24m 1.95%; Capital One up to 36m 2.9%"], ["T3 Barclaycard", "36m card to 3rd, only if pre-approved for the full 36 (MSE: 36, 32 or 18). 22m card below Virgin 24m ('definite 24 at 1.95% gives more cover for about £14 more'). Apple TV noted as a tie-breaker"], ["T4 pick", "HSBC. Switch to Barclaycard 36m if HSBC's rules or checker fail and Barclaycard pre-approves 36; to Virgin 24m if Barclaycard would give 18; Barclaycard if 'you'd actually use the Apple TV'"]],
      B: [["T1 provisional", "TSB 38m; HSBC 36m; Virgin Money 36m (fee not shown on Virgin's page). Barclaycard 12m noted via Finder"], ["T2 final three", "HSBC 36m; Nationwide 30m 2.99% (needs membership); Virgin Money 36m (fee unconfirmed)"], ["T3 Barclaycard", "36m card joint 1st with HSBC: same term, £2 more fee, lower APR after the deal. 22m card 'best value if you're confident'. Flagged the May 2026 third-party 3.45% figure against the page's 3.15%"], ["T4 pick", "HSBC, because its figures come from its own product page and Barclaycard's product page would not open to settle 3.15% against 3.45%. Switch to Barclaycard 36m if HSBC offers under 24 months or Barclaycard's application confirms 3.15% with better odds; to Barclaycard 22m if confident of £150 a month"]],
    },
    whyQuotes: [
      ["HSBC's 36 months is listed as definite, while Barclaycard's depends on that check. So HSBC stays first.", "Profile A, turn 3"],
      ["If you clear the debt in 18 to 24 months as planned, the rate afterwards never applies, so these two are effectively tied.", "Profile B, turn 3, Barclaycard 36m against HSBC"],
      ["Barclaycard's 36-month card also says 3.15% on its own listing page. But a May comparison site showed 3.45%, and I couldn't open the card's own page to settle which is current.", "Profile B, turn 4, why HSBC"],
      ["Barclaycard costs about £1.80 more but comes with 12 months of Apple TV. That's a reasonable tie-breaker, but only if you'd watch it.", "Profile A, turn 4"],
    ],
    improve: [
      ["Give every card a product page that resolves, and keep the search page out of the index.", "Opus B had Barclaycard joint first and chose HSBC because the 36 month card's own page returned 'not found'. Opus A sourced all Barclaycard figures from a search-results URL.", "B turns 4, 5; A turns 3, 4"],
      ["Publish the full-term share and the tier logic on the 36 month card.", "The 'definite' versus 'up to' label was the reason HSBC stayed first in A. The 7 in 10 statement exists only on the 22 month page, which Opus never reached.", "A, turns 3 and 4"],
      ["Ask Money to the Masses to update the 3.45% fee.", "The stale figure cost Barclaycard the pick in B, since the model could not resolve the conflict on Barclaycard's own site.", "B, turns 3 to 5"],
      ["Publish eligibility criteria, the soft-search statement and whether Barclays-group cards can be transferred.", "'Barclaycard's eligibility rules (age, income, residency) and any restriction on transferring from Barclays cards, because the product page wouldn't load' (B). 'The listing page gave almost nothing' on eligibility.", "B, turn 5"],
      ["Keep the Apple TV offer, but as a tie-breaker, not in the terms block.", "Opus A treated it as a reasonable tie-breaker between equal cards. That is the right place for it.", "A, turn 4"],
    ],
    improveImg: ["P8_barclaycard_404_36-month.jpg", "A product-level Barclaycard URL returning 404 on 11 October 2026"],
    improveTest: "Read transcripts/B-opus.md turn 4, reason 2, and turn 5 ('I could not open the 36-month card's own product page'). Open the 36 month card's 'See card details' link from the listing page: falsified if the product page resolves and states the fee.",
  },
  {
    key: "fable", name: "Fable 5.1", n: 4,
    tagline: "Opens barclaycard.co.uk at turn 1 in both runs, weights MSE's 'definite' label most, and asks about a Barclays account because of the cashback",
    questions: {
      A: [
        ["Turn 1", "Two questions, the first with the recommendation attached to each answer:", "1. What can you comfortably put towards it each month? A) under £100: HSBC B) £100 to £150: Virgin 24m C) £150 to £250: Tesco Low Fee or Barclaycard's no-fee 12m D) not sure", "2. Do you bank with Barclays or HSBC already? A) Barclays B) HSBC C) neither D) both (asked because of the £20 cashback and HSBC's exclusions)"],
        ["Turn 2", "An offer, not a question for information: 'Would you like me to work out the exact total cost for each card at £150 and £200 a month?'"],
        ["Turns 3 to 5", "No further questions. Turn 4 asks to be told what the application page shows."],
      ],
      B: [
        ["Turn 1", "Four questions after a provisional top three:", "1. How much can you put towards it each month? a) under £125 b) £125 to £200 c) £200 to £300 d) over £300", "2. Your credit record? a) clean b) a few blips c) defaults or CCJs", "3. Who issues your current card? a) Barclaycard b) Tesco c) Virgin / Clydesdale / Yorkshire d) HSBC / First Direct e) someone else", "4. Do you have a Barclays current account? (for the £20 cashback, 'though that card's 3.15% fee makes it a poor fit for £3,000 anyway')"],
        ["Turns 2 to 5", "No further questions."],
      ],
    },
    common: {
      both: ["Monthly repayment capacity", "Whether the user has a Barclays current account (both runs tied this to the £20 cashback condition)"],
      aOnly: ["Whether the user banks with HSBC"],
      bOnly: ["Credit record", "Who issues the current card"],
      never: ["Whether the card is needed for spending", "Fee versus length preference (Fable inferred it from the monthly figure)"],
      reading: "Fable is the only model that asked a Barclays-specific question in both runs. The cashback condition shaped its questions and, in B, its turn 1 verdict on the 36 month card before the user had said anything about affordability.",
    },
    sources: [
      ["MoneySavingExpert", "opened, every turn ('carried the most weight')", "opened, every turn", "'Definite' versus 'up to', the Barclaycard tiers, the Virgin 24m and Capital One figures, the fee-and-length rule of thumb"],
      ["Which? guide", "opened, turns 1, 2, 5", "opened, turns 1 to 3", "Cross-check; TSB and Santander figures; Barclaycard 77% customer score"],
      ["barclaycard.co.uk listing", "opened, turn 1 onward", "opened, turn 1 onward", "All five Barclaycard cards from turn 1, including the 22 month card; offer conditions"],
      ["HSBC product page", "opened, turns 1, 2", "never opened", "In A, HSBC eligibility and 25.9% APR; in B, HSBC figures came from MSE only"],
      ["Tesco Bank", "BT page opened, turn 1 (no Low Fee figures on it)", "both pages opened, turn 1", "Tesco figures; 'guaranteed' wording in B"],
      ["Virgin Money", "hub opened T1; product page 404 twice", "BT page opened, turn 4", "Pages show 27.9% APR and 'up to 36 months'; the 24m 1.95% card, the pick in both runs, is not on Virgin's site"],
      ["Nationwide", "opened, turn 2", "opened, turn 2", "Exclusion: membership required; named as a possible first place if the user opens an account (A)"],
      ["Finder (Virgin page, dated July 2025)", "opened, turn 4", "snippet", "Virgin transfer rules and the 24m figures"],
      ["Money to the Masses (Capital One review)", "not used", "snippet, turn 2", "'Positioned for less-than-perfect credit', an older review"],
      ["Capital One; Lloyds; Barclaycard 12m product page", "Capital One 404", "Capital One 404 twice; Lloyds error; Barclaycard 12m page 404", "Capital One figures from MSE only"],
    ],
    reliedOn: [
      ["MoneySavingExpert's balance transfer page [...] It's the source for every 'definite' versus 'up to' classification, for the fee/length rule of thumb, and for the cards whose provider pages I couldn't reach.", "Fable, profile A, turn 5"],
      ["MoneySavingExpert's balance transfer guide (dated 7 October 2026) carried the most weight, especially for the 'definite' versus 'up to' distinction and the fallback lengths, followed by Which? (1 October 2026).", "Fable, profile B, turn 5"],
    ],
    options: {
      A: [["T1 provisional", "HSBC 36m 3.09%; Virgin Money 24m 1.95%; Tesco Low Fee 20m 1.25%. Barclaycard 12m noted for £250 a month"], ["T2 final three", "Virgin Money 24m 1.95%; HSBC 36m; Barclaycard up to 22m 1.49% (3rd, the only unprompted Barclaycard top three in the study)"], ["T3 Barclaycard", "22m stays 3rd, joint 1st if the checker pre-approves 22 months; 36m 4th behind HSBC (over the ceiling, 'up to' against HSBC's 'definite'); 12m, 24m and 21m not suitable"], ["T4 pick", "Virgin Money 24m. Switch to HSBC if Virgin's page shows other terms; to Barclaycard 22m if MSE pre-approves it and Virgin looks poor; to Nationwide if willing to open an account"]],
      B: [["T1 provisional", "Tesco Low Fee 20m 1.25%; Barclaycard 12m no fee (2nd); Virgin Money 24m 1.95%. The 36 month card dismissed in the questions: '3.15% fee makes it a poor fit for £3,000'"], ["T2 final three", "Virgin Money 24m; Capital One up to 36m 2.9%; Tesco Low Fee. Near misses: Barclaycard 22m ('up to', 60 day window), HSBC (over the ceiling)"], ["T3 Barclaycard", "36m joint 2nd if pre-approved, else 'the 18-month floor is a real risk with a Fair score'. 22m 4th behind Tesco: 'this card isn't in MSE's listing so I can't tell you what shorter period you might be given'"], ["T4 pick", "Virgin Money 24m via MSE's calculator. Switch to Capital One if 30+ months; to Barclaycard 36m only on a pre-approval, 'not a good odds result'; to Tesco if confident of £175 to £200"]],
    },
    whyQuotes: [
      ["For a one-shot application, certainty matters more than £14.", "Profile A, turn 4, Virgin 24m over Barclaycard 22m"],
      ["If the checker pre-approves you for the full 22 months, I'd move it to joint first with Virgin Money: it's cheaper and the cushion is nearly the same.", "Profile A, turn 3"],
      ["Paying £7 more than Tesco for two months that aren't guaranteed isn't a good trade for someone in the Fair band.", "Profile B, turn 3, on the 22 month card"],
      ["None of the provider pages [...] publish the proportion of applicants who get the headline 0% length. That's the information that would most have sharpened the advice for your situation.", "Profile B, turn 5"],
    ],
    improve: [
      ["Publish the share of accepted customers who get the full term, on every card and on the listing page.", "Fable B named this as the single piece of information that would most have sharpened its advice. Barclaycard already publishes it for the 22 month card, inside a collapsed accordion Fable never quoted.", "B, turn 5"],
      ["Get the 22 month card into MSE's table with its tier range.", "'This card isn't in MSE's listing so I can't tell you what shorter period you might be given' is why it ranked 4th in B. In A, with clean credit, the same card reached the unprompted top three.", "B turn 3; A turn 2"],
      ["State on the listing page that no Barclays account is needed, and keep the cashback condition inside the offer text.", "The cashback condition made Fable ask about a Barclays account in both runs and dismiss the 36 month card at turn 1 in B.", "A and B, turn 1"],
      ["Publish minimum age, income and credit criteria, and say the 60 day window runs from account opening.", "Fable A listed both as missing from Barclaycard's page; Fable B listed the absence of any fallback range for the 22 month card.", "A and B, turn 5"],
      ["Fix the 12 month card's product page.", "It returned 404 in B; the figures were taken from the listing page instead.", "B, turn 5"],
    ],
    improveImg: ["E5_bc22_seven_in_ten.jpg", "The 22 month page already states the full-term share, inside an accordion; no run quoted it"],
    improveTest: "Read transcripts/B-fable.md turn 5, last bullet, and turn 3 on the 22 month card. Expand 'Why is it up to 22 months?' on barclaycard.co.uk/personal/credit-cards/mid-bt-platinum: falsified if the 7 in 10 statement is absent, or if the same statement appears on the 36 month card.",
  },
];

// ---------- intro slides ----------
pres.addSection({ title: "Introduction" });
{
  const s = pres.addSlide({ masterName: "DARK", sectionTitle: "Introduction" });
  s.addText("Barclaycard in AI balance-transfer advice: model by model", { placeholder: "title" });
  s.addText("What each of four AI assistants asked, read, recommended and said about Barclaycard when a UK customer with £3,000 of card debt asked for a 0% balance transfer. Web-search runs only, two credit profiles per model, five turns each.\nPrepared for the Head of Credit Cards. Transcripts and screenshots captured 11 October 2026.", { placeholder: "body" });
}
// ---------- Executive summary ----------
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Introduction" });
  s.addText("Executive summary 1 of 3: AI assistants know Barclaycard, read its pages correctly, and still never pick it", { placeholder: "title" });
  const tiles = [["1 of 8", "runs put Barclaycard in the unprompted top three", "Turn 2, after the customer's details"], ["7 of 8", "runs put it in the top three once the customer named it", "Turn 3"], ["0 of 8", "runs chose it as the card to apply for", "Turn 4; HSBC 3, Virgin Money 4, Tesco 1"], ["2 of 8", "runs told the customer something wrong about Barclaycard", "A current-account requirement that does not exist; a stale 3.45% fee"]];
  tiles.forEach((t, i) => {
    const x = M + i * 3.1;
    card(s, x, 1.3, 2.9, 1.85, "exec tile " + i);
    s.addText(t[0], { x: x + 0.15, y: 1.38, w: 2.6, h: 0.72, fontSize: 34, bold: true, color: C.accent1, margin: 0, valign: "middle", isTextBox: true, objectName: "exec big " + i });
    s.addText(t[1], { x: x + 0.15, y: 2.1, w: 2.6, h: 0.55, fontSize: 11, bold: true, color: C.text2, margin: 0, valign: "top", isTextBox: true, objectName: "exec label " + i });
    s.addText(t[2], { x: x + 0.15, y: 2.72, w: 2.6, h: 0.4, fontSize: 9, color: C.text1, margin: 0, valign: "top", isTextBox: true, objectName: "exec sub " + i });
  });
  bullets(s, [
    [{ text: "What was done. ", options: { bold: true } }, { text: "On 11 October 2026 four AI assistants (Haiku, Sonnet, Opus, Fable) with web search were each asked, twice, to recommend a 0% balance transfer card to a UK customer with £3,000 of card debt, over five turns: a top three, the customer's details, a question about Barclaycard, a forced single pick, and a request to show every source. Forty turns, every reply logged with the pages it opened." }],
    [{ text: "Why Barclaycard loses. ", options: { bold: true } }, { text: "The assistants build the shortlist from comparison guides (Which?, MoneySavingExpert) and check provider pages second. The guides do not list the 22 month 1.49% card, the best fit for this customer, and label the 36 month card 'up to' against HSBC's 'definite'. Barclaycard's own pages carry no eligibility line, put promotional text above the terms, return 404s on product pages, and show an APR that contradicts the headline. The 3.15% fee decided ties against HSBC's 3.09%." }],
    [{ text: "What is not wrong. ", options: { bold: true } }, { text: "Every figure an assistant read from barclaycard.co.uk was reported correctly. With no web access, every assistant names Barclaycard among the leaders from memory. The gap is in distribution and disclosure, not awareness or price." }],
  ], M, 3.4, 12.3, 3.2, { fontSize: 11.5 });
  source(s, "Sections 2 to 6 of this deck; Oct11_3pm/transcripts; results.csv.");
}
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Introduction" });
  s.addText("Executive summary 2 of 3: what is at stake, an order-of-magnitude estimate", { placeholder: "title" });
  const rows2 = [
    ["Scenario", "Share of transfer decisions where an AI sets the shortlist", "Gap between fair share and AI share", "Balances at stake a year", "Accounts a year", "Value at £400 per account over 10 years"],
    ["Low", "3%", "10 points", "£61m", "27,000", "£11m per annual cohort"],
    ["Mid", "8%", "17 points", "£279m", "122,000", "£49m per annual cohort"],
    ["High", "17%", "20 points", "£700m", "306,000", "£122m per annual cohort"],
  ];
  table(s, rows2, M, 1.3, 12.3, [1.0, 3.2, 2.3, 1.9, 1.6, 2.3], { fontSize: 10, rowH: 0.5, boldFirstCol: true, shade: (i) => i === 2, name: "exec scenario" });
  bullets(s, [
    [{ text: "The chain. ", options: { bold: true } }, { text: "UK cardholders moved £20.5 billion in 8.9 million balance transfers in the year to March 2026 (UK Finance). Barclays holds about 24% of UK card balances (£17.2bn of £72.3bn). 17% of people who shopped for a financial product in the year to April 2026 used an AI assistant to help, and under a quarter of those followed it outright while most used it to build their shortlist (FCA, n=5,026). In the AI answers studied, Barclaycard's share is below its 12.5% unprompted top-three rate." }],
    [{ text: "Balances at stake ", options: { bold: true } }, { text: "= £20.5bn x AI-shortlist share x (fair share minus AI share). Accounts = balances / £2,290 average transfer. Value = accounts x £400 over 10 years (Head of Credit Cards' assumption)." }],
    [{ text: "Which case to believe. ", options: { bold: true } }, { text: "The mid case takes the FCA's finding that most AI users build a shortlist with it rather than follow it; the high case is today's measured AI usage with no discount; the low case counts only those who followed the suggestion. AI-tool usage among UK adults went from 31% to 54% in two years (Ofcom), so the share grows from here." }],
    [{ text: "Cost of acting. ", options: { bold: true } }, { text: "The six decisions are page wording, data feeds and URL fixes; no price change. Running the monitor is in the low tens of thousands of pounds a year. A second value line is avoided harm: wrong facts given to customers in 2 of 8 runs." }],
  ], M, 3.5, 12.3, 3.1, { fontSize: 11 });
  source(s, "Slide 'Item 8: what is at stake' and what_to_do.md item 8 for every input and its source.");
}
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Introduction" });
  s.addText("Executive summary 3 of 3: the decisions taken and the ask", { placeholder: "title" });
  card(s, M, 1.3, 6.1, 5.3, "decided");
  heading(s, "Decided with the Head of Credit Cards, 11 October", M + 0.2, 1.4, 5.7, 13);
  bullets(s, [
    [{ text: "Show the 22 month card everywhere ", options: { bold: true } }, { text: "Barclaycard balance-transfer cards appear: barclays.co.uk, the app, and the feeds to MSE, Which? and Moneyfacts." }],
    [{ text: "Put the regulatory eligibility line in every card block ", options: { bold: true } }, { text: "and surface what is already published but hidden: the soft-search line, the full-term statement, the documents list." }],
    [{ text: "Replace 'up to 36 months' with a definite list ", options: { bold: true } }, { text: "of the terms an accepted applicant can be offered. No published odds." }],
    [{ text: "Move promotional text below the terms ", options: { bold: true } }, { text: "and state that no Barclays account is needed for the card." }],
    [{ text: "Correct the APR and fee mismatches; ", options: { bold: true } }, { text: "rates right in real time at every listing, with a visible date; a dateless terms file with the edition inside." }],
    [{ text: "Keep the 3.15% fee. ", options: { bold: true } }, { text: "A conscious pricing decision under the weekly-reviewed playbook." }],
  ], M + 0.2, 1.85, 5.7, 4.6, { fontSize: 12, space: 8 });
  card(s, 6.8, 1.3, 6.05, 5.3, "ask");
  heading(s, "The ask", 7.0, 1.4, 5.65, 13);
  bullets(s, [
    [{ text: "Digital capacity ", options: { bold: true } }, { text: "for the page changes on barclaycard.co.uk and barclays.co.uk in the next release, and a separate check of the 404s and broken images." }],
    [{ text: "Comparison-site feeds: ", options: { bold: true } }, { text: "the 22 month card, with its term options, to MSE, Which?, Moneyfacts and Finder." }],
    [{ text: "A three-cycle proof of concept, ", options: { bold: true } }, { text: "November to January: eight runs a month against the 11 October baseline, with a before-and-after cycle timed to the first site change. Owned by the Head of Credit Cards; the agency runs and scores." }],
    [{ text: "A run-the-bank home from February: ", options: { bold: true } }, { text: "scripted monthly runs, a rubric scorer, a nightly site hygiene monitor, a dashboard with alerts; card team decides, digital fixes, analytics runs, compliance approves the persona." }],
    [{ text: "Cost: ", options: { bold: true } }, { text: "four to six weeks of one engineer to build; one to two analyst days a month; model usage in the tens of pounds a month." }],
  ], 7.0, 1.85, 5.65, 4.6, { fontSize: 12, space: 8 });
  source(s, "what_to_do.md items 1 to 8; section 'What to do' of this deck.");
}

{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Introduction" });
  s.addText("The conversation every model had: one opening question, then four fixed follow-ups", { placeholder: "title" });
  card(s, M, 1.3, 7.6, 5.3, "script");
  heading(s, "What the user asked", M + 0.2, 1.4, 7.2);
  s.addText([
    { text: "Turn 1, verbatim. ", options: { bold: true, color: C.accent1 } }, { text: T1, options: { breakLine: true, paraSpaceAfter: 6 } },
    { text: "Turn 2. ", options: { bold: true, color: C.accent1 } }, { text: "The user answered the model's questions from the persona sheet and asked for a final ranked top three with a source link for each fact.", options: { breakLine: true, paraSpaceAfter: 6 } },
    { text: "Turn 3, verbatim. ", options: { bold: true, color: C.accent1 } }, { text: T3, options: { breakLine: true, paraSpaceAfter: 6 } },
    { text: "Turn 4, verbatim. ", options: { bold: true, color: C.accent1 } }, { text: T4, options: { breakLine: true, paraSpaceAfter: 6 } },
    { text: "Turn 5, verbatim. ", options: { bold: true, color: C.accent1 } }, { text: T5, options: {} },
  ], { x: M + 0.2, y: 1.85, w: 7.2, h: 4.7, fontSize: 10.5, color: C.text1, margin: 0, valign: "top", isTextBox: true, objectName: "script text" });
  card(s, 8.4, 1.3, 4.45, 5.3, "persona");
  heading(s, "The customer behind the answers", 8.6, 1.4, 4.1);
  bullets(s, [
    "34, Leeds, renting, employed, £38,000 salary",
    "£3,000 at 24.9% on a small online lender's card",
    "Current account with a building society; no relationship with any card issuer",
    "£150 to £200 a month; wants it cleared in 18 to 24 months; wants a longer 0% period as a safety net",
    "Fee up to about 3%",
    [{ text: "Profile A: ", options: { bold: true } }, { text: "clean credit, never missed a payment" }],
    [{ text: "Profile B: ", options: { bold: true } }, { text: "one missed payment 20 months ago, Experian 'Fair'" }],
  ], 8.6, 1.85, 4.1, 3.0, { fontSize: 11 });
  heading(s, "Design", 8.6, 4.9, 4.1, 12);
  bullets(s, ["Four assistants, medium effort, web search on in every run", "4 models x 2 profiles x 5 turns = 40 turns", "Every reply logged with the queries run and the URLs opened"], 8.6, 5.3, 4.1, 1.3, { fontSize: 11 });
  source(s, "Oct11_3pm/protocol.md; transcripts/{A,B}-{haiku,sonnet,opus,fable}.md turn 1 to turn 5 user messages.");
}

// ---------- per-model sections ----------
for (const m of MODELS) {
  const sec = `Model ${m.n}: ${m.name}`;
  pres.addSection({ title: sec });
  {
    const s = pres.addSlide({ masterName: "DARK", sectionTitle: sec });
    s.addText(`Model ${m.n} of 4: ${m.name}`, { placeholder: "title" });
    s.addText(m.tagline + "\nFive slides: the questions it asked, what was common across its two runs, the sources it used, the options it gave and where Barclaycard sat, and what would change its answer.", { placeholder: "body" });
  }
  // Questions slide
  {
    const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: sec });
    s.addText(`${m.name}: the question asked, and the clarifying questions the model asked, turn by turn`, { placeholder: "title" });
    s.addText([{ text: "User, turn 1: ", options: { bold: true, color: C.accent1 } }, { text: T1 }], { x: M, y: 1.25, w: 12.3, h: 0.75, fontSize: 10.5, color: C.text1, margin: 0, valign: "top", isTextBox: true, objectName: "user q" });
    ["A", "B"].forEach((p, i) => {
      const x = M + i * 6.25;
      card(s, x, 2.1, 6.05, 4.0, "q" + p);
      heading(s, p === "A" ? "Profile A (clean credit): what the model asked" : "Profile B (Fair credit): what the model asked", x + 0.2, 2.2, 5.7, 12.5);
      const runs = [];
      m.questions[p].forEach((blk, bi) => {
        runs.push({ text: blk[0], options: { bold: true, color: C.accent1, breakLine: true, paraSpaceBefore: bi ? 6 : 0 } });
        blk.slice(1).forEach((line, li) => runs.push({ text: line, options: { breakLine: !(bi === m.questions[p].length - 1 && li === blk.length - 2), paraSpaceAfter: 2 } }));
      });
      s.addText(runs, { x: x + 0.2, y: 2.65, w: 5.7, h: 3.35, fontSize: 11.5, color: C.text1, margin: 0, valign: "top", isTextBox: true, objectName: "q text " + p });
    });
    source(s, `transcripts/A-${m.key}.md and B-${m.key}.md, model replies at turns 1 to 5. Falsified if a turn contains a question not listed here.`);
  }
  // Common questions slide
  {
    const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: sec });
    s.addText(`${m.name}: questions common to both runs, and what the differences show`, { placeholder: "title" });
    const cols = [["Asked in both runs", m.common.both], ["Profile A only", m.common.aOnly.length ? m.common.aOnly : ["Nothing beyond the common set"]], ["Profile B only", m.common.bOnly.length ? m.common.bOnly : ["Nothing beyond the common set"]]];
    cols.forEach((c, i) => {
      const x = M + i * 4.15;
      card(s, x, 1.35, 3.95, 2.75, "common" + i);
      heading(s, c[0], x + 0.2, 1.45, 3.55, 13);
      bullets(s, c[1], x + 0.2, 1.9, 3.55, 2.1, { fontSize: 11 });
    });
    card(s, M, 4.3, 12.3, 2.3, "never");
    heading(s, "Never asked in either run", M + 0.2, 4.38, 5.8, 12.5);
    bullets(s, m.common.never, M + 0.2, 4.78, 5.6, 1.7, { fontSize: 11 });
    heading(s, "What this tells us", 6.6, 4.38, 6.0, 12.5);
    s.addText(m.common.reading, { x: 6.6, y: 4.78, w: 6.0, h: 1.7, fontSize: 11, color: C.text1, margin: 0, valign: "top", isTextBox: true, objectName: "reading" });
    source(s, `transcripts/A-${m.key}.md and B-${m.key}.md turn 1 (and turn 2 for Fable A). Falsified if a listed question is missing from the turn, or an unlisted one is present.`);
  }
  // Sources slide
  {
    const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: sec });
    s.addText(`${m.name}: the sources it referred to, and which ones it opened`, { placeholder: "title" });
    const rows = [["Source", "Profile A", "Profile B", "What it was used for"], ...m.sources];
    table(s, rows, M, 1.25, 8.6, [1.9, 1.75, 1.75, 3.2], { fontSize: 8.5, rowH: 0.3, boldFirstCol: true, name: "sources table" });
    heading(s, "What the model said it relied on most (turn 5)", 9.35, 1.25, 3.5, 11.5);
    quote(s, 9.35, 1.7, 3.5, 1.75, m.reliedOn[0][0], m.reliedOn[0][1]);
    quote(s, 9.35, 3.6, 3.5, 1.75, m.reliedOn[1][0], m.reliedOn[1][1]);
    s.addText("'Opened' means the URL appears in the SEARCH LOG with an (opened) marker. Every model said at turn 5 that opened pages were read through a summariser, not as raw HTML.", { x: 9.35, y: 5.55, w: 3.5, h: 0.8, fontSize: 8.5, italic: true, color: C.text2, margin: 0, valign: "top", isTextBox: true, objectName: "opened note" });
    source(s, `SEARCH LOG blocks in transcripts/A-${m.key}.md and B-${m.key}.md; turn 5 replies. Falsified if a URL marked 'opened' here is absent from the logs.`);
  }
  // Options slide
  {
    const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: sec });
    s.addText(`${m.name}: the options it gave, and why Barclaycard was or was not among them`, { placeholder: "title" });
    ["A", "B"].forEach((p, i) => {
      const y = 1.25 + i * 2.72;
      heading(s, p === "A" ? "Profile A, clean credit" : "Profile B, Fair credit", M, y, 8.3, 12);
      table(s, [["Turn", "What the model named, in rank order"], ...m.options[p]], M, y + 0.38, 8.3, [1.2, 7.1], { fontSize: 8.5, rowH: 0.42, boldFirstCol: true, name: "options " + p });
    });
    heading(s, "In the model's words", 9.05, 1.25, 3.8, 12);
    m.whyQuotes.forEach((q, i) => quote(s, 9.05, 1.65 + i * 1.27, 3.8, 1.17, q[0], q[1]));
    source(s, `transcripts/A-${m.key}.md and B-${m.key}.md turns 1 to 4; quotes verbatim from the turn named. Falsified if the ranking at a turn differs from the row shown.`);
  }
  // Improve slide
  {
    const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: sec });
    s.addText(`${m.name}: what would change its answer for Barclaycard`, { placeholder: "title" });
    m.improve.forEach((it, i) => {
      const y = 1.3 + i * 0.93;
      numCircle(s, i + 1, M, y + 0.03, 0.36);
      s.addText([{ text: it[0] + " ", options: { bold: true, color: C.text2 } }, { text: it[1] + " ", options: { color: C.text1 } }, { text: "(" + it[2] + ")", options: { color: C.accent2, fontSize: 9 } }],
        { x: M + 0.5, y, w: 7.2, h: 0.9, fontSize: 10.5, margin: 0, valign: "top", isTextBox: true, objectName: "improve " + i });
    });
    const d0 = sizeOf(path.join(EV, m.improveImg[0])); const ratio = d0.width / d0.height;
    const r = (4.55 / ratio > 4.1) ? img(s, m.improveImg[0], 8.3, 1.3, { h: 4.1 }) : img(s, m.improveImg[0], 8.3, 1.3, { w: 4.55 });
    s.addText(m.improveImg[1], { x: 8.3, y: 1.3 + r.h + 0.05, w: 4.55, h: 0.5, fontSize: 9, italic: true, color: C.text2, margin: 0, isTextBox: true, objectName: "improve caption" });
    testBox(s, M, 6.05, 12.3, 0.62, m.improveTest);
    source(s, `transcripts/A-${m.key}.md and B-${m.key}.md at the turns in brackets; deck/evidence for the screenshot.`);
  }
}

// ---------- closing ----------
pres.addSection({ title: "Across the four models" });
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Across the four models" });
  s.addText("Across the four models: what they asked, what they read, and where Barclaycard ended up", { placeholder: "title" });
  const rows = [
    ["", "Haiku 5.5", "Sonnet 5.5", "Opus 5.5", "Fable 5.1"],
    ["Clarifying questions at turn 1 (A / B)", "3 / 2", "4 / 4", "4 / 4", "2 / 4"],
    ["Asked in both runs", "Monthly amount; credit standing", "Monthly amount; credit; card issuer", "Card issuer; monthly amount; credit history", "Monthly amount; Barclays current account"],
    ["Page opened first", "Which?", "Which?", "MSE (A); TSB and HSBC (B)", "MSE, then barclaycard.co.uk"],
    ["Reached MSE?", "B only", "Never", "A only", "Both"],
    ["Barclaycard page read", "barclays.co.uk (A); barclaycard.co.uk (B), turn 3", "barclaycard.co.uk, turn 3, after a 404", "search page (A); listing page (B), turn 3; product page 404", "barclaycard.co.uk, turn 1, both runs"],
    ["Barclaycard in unprompted final top three (T2)", "No / No", "No / No", "No / No", "22m 3rd / No"],
    ["Barclaycard placement once named (T3)", "36m 2nd / 22m 2nd", "4th and 5th / 22m 2nd, 36m excluded", "36m 3rd if pre-approved / 36m joint 1st", "22m 3rd / 36m joint 2nd if pre-approved"],
    ["Card picked at T4 (A / B)", "HSBC / Tesco Low Fee", "Virgin 35m / Virgin 36m", "HSBC / HSBC", "Virgin 24m / Virgin 24m"],
    ["First Barclaycard fallback", "36m (A); 22m (B)", "12m at £250 a month (A); 22m (B)", "36m if pre-approved (both)", "22m if pre-approved (A); 36m if pre-approved (B)"],
  ];
  table(s, rows, M, 1.3, 12.3, [2.7, 2.4, 2.4, 2.4, 2.4], { fontSize: 9, rowH: 0.42, boldFirstCol: true, name: "cross table" });
  source(s, "results.csv; transcripts/*.md turns 1 to 4. Each cell is a count or a ranking that can be read off the turn named in the row.");
}
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Across the four models" });
  s.addText("What would improve the situation, ranked by how many models it would have moved", { placeholder: "title" });
  const rows = [
    ["#", "Action", "Models and runs it would have moved", "Evidence"],
    ["1", "Get the 22 month 1.49% card into MSE and Which? tables and onto barclays.co.uk", "All four. Haiku A never saw it; Sonnet A and B, Opus A and B found it only after the user named Barclaycard; Fable B could not rank it without MSE's tier range", "Model slides 'improve', item 1 (Haiku), 2 (Sonnet), 2 (Fable)"],
    ["2", "Publish the full-term share ('at least 7 in 10') and tier logic on the 36 month and 22 month cards and the listing page", "Opus A, Fable A and B, Haiku B ranked on 'definite' versus 'up to'. Fable B called it the one fact that would most have sharpened its advice", "Opus item 2; Fable item 1; Haiku item 2"],
    ["3", "Publish eligibility criteria and a soft-search statement on every card", "All eight runs listed it as missing at turn 5; Haiku A and Opus B used HSBC's explicit criteria to rank HSBC first", "Haiku item 3; Opus item 4; Fable item 4"],
    ["4", "Separate the offer text from the card terms and state that no Barclays account is needed", "Sonnet B excluded the 36 month card; Fable asked about a Barclays account in both runs; every other run spent a paragraph dismissing the cashback", "Sonnet item 1; Fable item 3"],
    ["5", "Give every card a product page that resolves; fix the /balance-transfer 404; keep the search page out of results", "Opus B lost a joint-first tie on it; Sonnet A and B, Fable B hit 404s; Opus A sourced from a search page", "Opus item 1; Sonnet item 4; Fable item 5"],
    ["6", "Refresh third-party figures (Money to the Masses 3.45%, Finder 2025, Moneyfacts July) and date every Barclaycard page", "Opus B carried 3.45%; Sonnet A picked from July data; all runs asked for dates", "Opus item 3; Sonnet item 3"],
    ["7", "Fee: 3.15% against HSBC's 3.09% and the customer's 'about 3%'", "Haiku A, Opus A and B, Sonnet A used it as the tie-break against HSBC; Fable B dismissed the 36 month card on it at turn 1", "Options slides, quotes"],
  ];
  table(s, rows, M, 1.3, 12.3, [0.4, 4.2, 5.0, 2.7], { fontSize: 9, rowH: 0.55, boldFirstCol: true, shade: (i) => i <= 3, name: "actions table" });
  s.addText("Shaded rows are the three actions that would have changed the most runs and cost the least. 'Would have moved' counts runs in which the model gave that cause as a reason for ranking Barclaycard lower; it is the model's stated reason, not a controlled test. The test is a rerun of the same protocol after the change.", { x: M, y: 6.0, w: 12.3, h: 0.65, fontSize: 9.5, italic: true, color: C.text2, margin: 0, isTextBox: true, objectName: "note" });
  source(s, "The four 'what would change its answer' slides; Oct11_3pm/barclays_recommendation.md section 3.");
}
// ---------- What to do ----------
pres.addSection({ title: "What to do" });
{
  const s = pres.addSlide({ masterName: "DARK", sectionTitle: "What to do" });
  s.addText("What to do: decisions taken with the Head of Credit Cards", { placeholder: "title" });
  s.addText("Eight items reviewed on 11 October 2026, each with the problem the study found, the challenge raised, what was checked, the decision and the test that would show it worked. Working record: Oct11_3pm/what_to_do.md.", { placeholder: "body" });
}
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "What to do" });
  s.addText("The six product and page decisions", { placeholder: "title" });
  const rows = [
    ["#", "Problem the study found", "Decision", "Test after the change"],
    ["1", "No eligibility line on Barclaycard's listing page; all 8 runs listed it as missing; HSBC's explicit criteria won two tie-breaks", "State the regulatory constraints in every card block (18 or over, UK resident, subject to status). Look to competitors for the rest. Surface what is already published but hidden for UI/UX: the soft-search line, the full-term statement, the 'what you'll need' list, the window-starts-at-opening statement", "No run lists eligibility or soft-search status as missing at turn 5 (baseline 8 of 8)"],
    ["2", "The 22 month 1.49% card is absent from MSE, Which? and barclays.co.uk; 5 of 8 runs never saw it before the user named Barclaycard", "Likely a legacy channel policy. Show the card everywhere Barclaycard balance-transfer cards appear, including comparison-site feeds, with the same tier information as the 36 month card", "At least 4 of 8 runs see it from a guide (baseline 0 of 8)"],
    ["3", "MSE labels HSBC 'definite' and Barclaycard 'up to 36, 32 or 18'; the most-cited reason for ranking HSBC first", "Do not publish full-term shares or downsell tiers. Replace 'up to N months' with a definite list of the options an accepted applicant can be offered, each with fee and rate, plus one line that the checker shows which applies", "No run calls a Barclaycard term 'up to' or 'not guaranteed' after reading the site (baseline 7 of 8)"],
    ["4", "Offer bullets (Apple TV, £20 cashback) sit above the term and fee; Sonnet B excluded the 36 month card on the cashback's current-account condition", "Move offers below the terms under their own heading (recommended). Add 'You do not need a Barclays current account to apply for this card' (taken). Next promotion's layout: to be confirmed. Apply on barclays.co.uk too", "No run states or implies a current-account requirement (baseline 1 of 8)"],
    ["5", "404s on product pages; alt text instead of images on barclays.co.uk; 28.9% APR line against the 24.9% headline; T&C file named 2023 (content June 2025); no dates; stale third-party snippets", "Correct the APR and fee mismatches; rates correct in real time at every listing, with a visible date. 404s and images: separate run, web team informed. T&C: dateless filename, edition line inside. Get Barclaycard into Moneyfacts; ask Finder to review its soft-search line", "No run quotes a Barclaycard rate or fee that differs from the site on the day (baseline 3 of 8); no 404 or search-page source (baseline 5 of 8)"],
    ["6", "3.15% fee against HSBC's 3.09% and the customer's 'about 3%' decided tie-breaks in 4 runs", "No change. The fee is a conscious pricing decision under the pricing playbook, reviewed weekly by the commercial team. Pound-cost labelling not adopted. 24 and 21 month cards deferred", "Not a test item: reported as observed behaviour"],
  ];
  table(s, rows, M, 1.3, 12.3, [0.35, 3.3, 5.5, 3.15], { fontSize: 8.5, rowH: 0.78, boldFirstCol: true, name: "decisions table" });
  source(s, "Oct11_3pm/what_to_do.md items 1 to 6; baselines from results.csv and the transcripts.");
}
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "What to do" });
  s.addText("Item 1 evidence: what the regulator fixes, what competitors print, what Barclaycard already has but hides", { placeholder: "title" });
  const rows = [
    ["Issuer", "Minimum income stated", "Other criteria on the page"],
    ["HSBC", "£6,800", "over 18, UK resident, no HSBC Basic Bank Account, group exclusions"],
    ["Santander", "£10,500", "18+, permanent UK resident, no bankruptcy, CCJ or IVA in 6 years"],
    ["NatWest", "£10,000", "UK resident, 18+, not bankrupt in 6 years"],
    ["Nationwide", "£5,000", "18+, UK resident, Nationwide member"],
    ["TSB, MBNA, Lloyds", "'a regular income'", "18+, UK resident, no recent CCJs, defaults, IVAs or bankruptcy"],
    ["Virgin Money, Tesco Bank, Sainsbury's", "none", "UK residents aged 18 or over, subject to status"],
    ["Barclaycard", "none", "nothing on the listing page; the 22 month page: checker for 18 or over, documents needed"],
  ];
  table(s, rows, M, 1.3, 7.3, [2.0, 1.5, 3.8], { fontSize: 9, rowH: 0.42, boldFirstCol: true, shade: (i) => i === 7, name: "elig table" });
  heading(s, "Already on Barclaycard's pages, where a summariser drops it", 8.1, 1.3, 4.75, 12.5);
  bullets(s, [
    "'Won't affect your credit score': in a banner below all five cards. Two runs could not tell whether the checker is a soft search",
    "'At least 7 out of 10 accepted customers received the longest promotional period': inside a collapsed accordion on the 22 month page only",
    "'What you'll need' (address history, income, outgoings, bank details): 22 month page only",
    "The 60 day window and the 0% period run from account opening: not stated on the listing page",
  ], 8.1, 1.75, 4.75, 3.2, { fontSize: 10.5 });
  img(s, "X_elig_santander.jpg", 8.1, 5.0, { w: 2.3, caption: "santander.co.uk eligibility block" });
  img(s, "E1b_bc36_if_you_apply_box.jpg", 10.55, 5.0, { w: 2.3, caption: "barclaycard.co.uk, the only eligibility text" });
  source(s, "Live pages, 11 October 2026 afternoon; deck/evidence X_elig_* and README. Falsified by opening the pages.");
}
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "What to do" });
  s.addText("Item 3: from 'up to' to a definite list, so a model reads fixed terms", { placeholder: "title" });
  card(s, M, 1.3, 5.9, 4.0, "before");
  heading(s, "What a model reads today", M + 0.2, 1.4, 5.5, 13);
  bullets(s, [
    "Barclaycard: '0% interest on balance transfers for up to 36 months'; 'the balance transfer period and interest rates may differ from those shown'",
    "MSE: 'If pre-approved you'll get the full 36 months at 0%. If not, you may get 36, 32 or 18 months and you'll only find out which after applying'",
    "Result: Opus A, Opus B, Fable A and Fable B ranked HSBC above Barclaycard on the label; Fable B called the 18 month floor 'the worst value on the whole list'",
  ], M + 0.2, 1.85, 5.5, 3.3, { fontSize: 10.5 });
  card(s, 6.9, 1.3, 5.95, 4.0, "after");
  heading(s, "What the decision puts in its place (illustrative wording)", 7.1, 1.4, 5.6, 13);
  s.addText([
    { text: "Depending on our assessment, accepted applicants are offered one of:", options: { breakLine: true, paraSpaceAfter: 4 } },
    { text: "•  36 months at 0% on balance transfers, 3.15% fee, 24.9% APR representative (variable)", options: { breakLine: true } },
    { text: "•  32 months at 0% on balance transfers, 3.15% fee, 24.9% APR representative (variable)", options: { breakLine: true } },
    { text: "•  18 months at 0% on balance transfers, 3.15% fee, 24.9% APR representative (variable)", options: { breakLine: true, paraSpaceAfter: 4 } },
    { text: "Our eligibility checker shows which option you would be offered before you apply, without affecting your credit score.", options: { italic: true } },
  ], { x: 7.1, y: 1.85, w: 5.6, h: 3.3, fontSize: 10.5, color: C.text1, margin: 0, valign: "top", isTextBox: true, objectName: "after text" });
  bullets(s, [
    [{ text: "Why not publish the share who get the full term: ", options: { bold: true } }, { text: "exact downsell durations are hard to maintain and the figure could scare applicants away. The list carries the same information as options, not odds." }],
    [{ text: "What it does and does not earn: ", options: { bold: true } }, { text: "a model quotes fixed terms and the checker result maps to one of them. MSE's 'definite' label still goes only to cards where every accepted applicant gets the full term; ask MSE to show the list rather than '36, 32 or 18'." }],
    [{ text: "Apply the same format ", options: { bold: true } }, { text: "to the 22 month card (22 or 11) and the 12 month card (12 or 6). The options shown must track what the decision engine can offer." }],
  ], M, 5.45, 12.3, 1.2, { fontSize: 10 });
  source(s, "what_to_do.md item 3; MSE guide 7 October 2026 (E9); transcripts A-opus turn 3, B-fable turn 3.");
}
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "What to do" });
  s.addText("Item 5 checks: dates, the terms file, and the three third-party sites", { placeholder: "title" });
  const cols = [
    ["Do other providers print a 'correct as of' date?", ["No issuer does, except Santander: 'correct as at 26 February 2025', twenty months old", "Every comparison site does: MSE 7 October, Which? 1 October, Finder 7 October, Money to the Masses 5 October 2026", "So the date is a comparison-site convention the models have learned to expect. Real-time correctness is the decision; a visible date that moves with the rates costs nothing on top"]],
    ["The terms file named core-2023.pdf", ["The generic 30-page core credit card agreement; no APR, no term, no transfer fee figure ('depends on' the promotion), so it cannot settle a rate question", "PDF created 11 June 2025, modified 19 June 2025", "The only edition marker is a footer code on the last page: 'BUK000333047 TAC CORE 06/25'", "Decision: dateless filename, plain edition line near the top"]],
    ["Why Money to the Masses, Finder and Moneyfacts matter", ["They are what the models read when they miss MSE or a provider page: Sonnet never found MSE; Opus B never opened it", "Money to the Masses today: 3.15%, published 5 October. Opus B's 3.45% came from a stale search snippet, not the page", "Finder: current figures, but one line to review: 'Barclaycard doesn't estimate your credit limit from a soft search'", "Moneyfacts: Barclaycard absent from its chart entirely. Same gap as item 2", "Controls recalled 3.45% from memory: old figures outlive page fixes"]],
  ];
  cols.forEach((c, i) => {
    const x = M + i * 4.15;
    card(s, x, 1.3, 3.95, 5.3, "chk" + i);
    heading(s, c[0], x + 0.2, 1.4, 3.55, 12.5);
    bullets(s, c[1], x + 0.2, 2.05, 3.55, 4.5, { fontSize: 10 });
  });
  source(s, "Live pages 11 October 2026 afternoon; deck/evidence/barclaycard_core_tnc_text.txt; what_to_do.md item 5.");
}
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "What to do" });
  s.addText("Item 7: how we will know it worked, measured against the 11 October baseline", { placeholder: "title" });
  const rows = [
    ["Metric (8 web runs per cycle)", "Baseline", "PoC target by cycle 3"],
    ["Barclaycard in the unprompted final top three (turn 2)", "1 of 8", "3 of 8"],
    ["Barclaycard in the top three once the user names it (turn 3)", "7 of 8", "8 of 8"],
    ["Barclaycard the single card to apply for (turn 4)", "0 of 8", "2 of 8"],
    ["Runs that see the 22 month card from a comparison guide, not only barclaycard.co.uk", "0 of 8", "4 of 8"],
    ["Runs calling a Barclaycard term 'up to' or 'not guaranteed' after reading the site", "7 of 8", "0 of 8"],
    ["Runs with a wrong Barclaycard eligibility claim", "1 of 8", "0 of 8"],
    ["Runs listing eligibility or soft-search status as missing at turn 5", "8 of 8", "0 of 8"],
    ["Runs quoting a Barclaycard fee or APR that differs from the site on the day", "3 of 8", "0 of 8"],
    ["Runs hitting a Barclaycard 404 or using a search page as the source", "5 of 8", "0 of 8"],
  ];
  table(s, rows, M, 1.3, 8.6, [5.8, 1.4, 1.4], { fontSize: 10, rowH: 0.42, name: "kpi table" });
  heading(s, "Reading the numbers", 9.4, 1.3, 3.45, 12.5);
  bullets(s, [
    "Eight runs: one run moving changes a rate by 12.5 points. Read three cycles of direction, not one month",
    "Keep all four model families, so a change in one vendor's retrieval is not read as a market change",
    "Every metric is a count from the transcripts, scored the same way as results.csv, so a reviewer can recount it",
    "Personas widen after the PoC: a £5,000 debt, a 36 month plan, an existing Barclays customer",
  ], 9.4, 1.75, 3.45, 4.8, { fontSize: 10.5 });
  source(s, "what_to_do.md item 7; results.csv; protocol.md.");
}
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "What to do" });
  s.addText("Item 8: what is at stake, an order-of-magnitude estimate from public data", { placeholder: "title" });
  const rows = [
    ["Input", "Value", "Source"],
    ["UK balance transfers, Apr 2025 to Mar 2026", "8.9m transfers, £20.5bn, average £2,290", "UK Finance Card Spending Update, March 2026"],
    ["Barclays UK cards gross exposure, end 2025", "£17.2bn of £72.3bn UK balances, about 24%", "Barclays 2025 Results; UK Finance"],
    ["Financial-product shoppers who used AI to assist", "17% (credit cards in the 15 to 20% band); under a quarter followed it outright, 72 to 80% compared it with other sources", "FCA / Yonder, n=5,026, April 2026"],
    ["UK adults using AI tools", "54%, from 31% in 2024", "Ofcom 2026"],
    ["Barclaycard in AI answers today", "unprompted top three 1 of 8; pick 0 of 8", "This study"],
    ["Account value", "£400 per account over 10 years (assumption supplied)", "Head of Credit Cards"],
  ];
  table(s, rows, M, 1.3, 7.4, [2.5, 3.0, 1.9], { fontSize: 8.5, rowH: 0.46, boldFirstCol: true, name: "inputs table" });
  const rows2 = [
    ["Scenario", "AI sets the shortlist", "Gap to fair share", "Balances a year", "Accounts a year", "Value at £400 over 10 years"],
    ["Low", "3%", "10 points", "£61m", "27,000", "£11m per cohort"],
    ["Mid", "8%", "17 points", "£279m", "122,000", "£49m per cohort"],
    ["High", "17%", "20 points", "£700m", "306,000", "£122m per cohort"],
  ];
  table(s, rows2, 8.2, 1.3, 4.65, [0.65, 0.85, 0.8, 0.75, 0.75, 0.85], { fontSize: 8.5, rowH: 0.5, boldFirstCol: true, shade: (i) => i === 2, name: "scenario table" });
  bullets(s, [
    [{ text: "The model: ", options: { bold: true } }, { text: "UK transfer value x share of decisions where an AI sets the shortlist x (Barclaycard's fair share, 20 to 25%, minus its share in AI answers, below 12.5%). Accounts = balances / £2,290. Value = accounts x £400." }],
    [{ text: "Why the mid case leads: ", options: { bold: true } }, { text: "17% is the FCA's measured share of shoppers who used AI, before weighting for how many followed it; 8% applies the finding that most use AI to build the shortlist rather than follow it; 3% counts only those who followed it." }],
    [{ text: "Direction: ", options: { bold: true } }, { text: "Ofcom's AI-tool usage doubled in two years; the FCA figure is six months old. Each year's cohort adds its own 10-year value: three years of the mid case is about £150m against running costs in the low tens of thousands a year." }],
    [{ text: "A second value line: ", options: { bold: true } }, { text: "2 of 8 runs gave the customer a wrong fact about Barclaycard, a conduct and complaints exposure as well as a lost sale." }],
  ], 8.2, 3.5, 4.65, 3.1, { fontSize: 9 });
  source(s, "what_to_do.md item 8a; deck/evidence/ukfinance_card_spending_march2026_text.txt; FCA ai-consumer-research.pdf; Barclays FY25 results credit risk tables.");
}
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "What to do" });
  s.addText("Item 8: proof of concept, then handover to run-the-bank", { placeholder: "title" });
  card(s, M, 1.3, 5.9, 5.3, "poc");
  heading(s, "Proof of concept, owned by the Head of Credit Cards", M + 0.2, 1.4, 5.5, 13);
  bullets(s, [
    [{ text: "Scope: ", options: { bold: true } }, { text: "balance transfers only; the existing persona with two credit profiles; four model families; web search on; five turns; eight runs a cycle. Baseline done 11 October." }],
    [{ text: "Cycles: ", options: { bold: true } }, { text: "November, December, January, plus one before-and-after cycle the week after the first site change (items 1, 2, 4) goes live." }],
    [{ text: "Success criteria: ", options: { bold: true } }, { text: "the item 7 targets: 22 month card seen from a guide in 4 of 8; no wrong eligibility claim; no rate or fee differing from the site; unprompted top three in 3 of 8 by cycle three." }],
    [{ text: "Deliverables: ", options: { bold: true } }, { text: "the written scoring rubric; a one-page report per cycle; an end-of-January decision on widening personas and products." }],
    [{ text: "Execution: ", options: { bold: true } }, { text: "the agency runs and scores; the Head of Credit Cards owns the decisions." }],
  ], M + 0.2, 1.85, 5.5, 4.6, { fontSize: 10.5 });
  card(s, 6.9, 1.3, 5.95, 5.3, "rtb");
  heading(s, "Handover to run-the-bank: automate and monitor", 7.1, 1.4, 5.6, 13);
  bullets(s, [
    [{ text: "Scripted monthly runs ", options: { bold: true } }, { text: "against each vendor's API with the search tool on; persona and turn script from protocol.md; search logs captured as data." }],
    [{ text: "Rubric scorer ", options: { bold: true } }, { text: "extracts rankings, picks, every Barclaycard figure and every URL; an analyst checks one run in five; a figure that differs from the live page is flagged the same day." }],
    [{ text: "Nightly site hygiene monitor: ", options: { bold: true } }, { text: "404s on every 'See card details' link, APR consistency, eligibility and date lines, the 22 month card on barclays.co.uk, presence in MSE, Which? and Moneyfacts." }],
    [{ text: "Dashboard and alerts: ", options: { bold: true } }, { text: "the item 7 table monthly; alerts to the product owner for a wrong fact, to the web team for a 404." }],
    [{ text: "Ownership: ", options: { bold: true } }, { text: "card team decides; digital fixes the site and runs the monitor; analytics runs the scorer; compliance approves persona and prompts; agency on methodology for three cycles, then advisory." }],
    [{ text: "Cost: ", options: { bold: true } }, { text: "model usage in the tens of pounds a month; four to six weeks of one engineer to build; one to two analyst days a month to run." }],
  ], 7.1, 1.85, 5.6, 4.6, { fontSize: 10 });
  source(s, "what_to_do.md items 8b and 8c.");
}

pres.addSection({ title: "Appendix" });
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Appendix" });
  s.addText("Appendix: where to check every claim", { placeholder: "title" });
  const rows = [
    ["Claim type", "Where", "How to test"],
    ["A question the model asked, at a turn", "Oct11_3pm/transcripts/{A,B}-{model}.md, the model reply under that turn heading", "Read the turn; the question is there verbatim or it is not"],
    ["A source opened or used", "SEARCH LOG block after each reply: Q: lines are queries, URL: lines are pages, '(opened)' marks a fetched page", "Search the file for the domain"],
    ["A ranking at a turn", "The numbered list or 'updated ranking' in the reply", "Compare with the options slide row"],
    ["A quote", "Verbatim from the turn named under the quote", "Search the file for a phrase from the quote"],
    ["A website claim (22 month card absent, offer block, 404, 7 in 10)", "deck/evidence: P files are full-page captures, E files are crops with a blue box; README.md lists URLs and capture times (11 Oct 2026, 11:30 to 11:40 UTC)", "Open the URL; a change since capture dates the finding"],
    ["A count across runs", "Oct11_3pm/results.csv", "Recount from the transcripts"],
    ["Page contents on the day", "Oct11_3pm/ground_truth.md", "Compare with a fresh fetch"],
  ];
  table(s, rows, M, 1.3, 12.3, [3.2, 5.6, 3.5], { fontSize: 9.5, rowH: 0.5, boldFirstCol: true, name: "appendix table" });
  source(s, "Study repository, folder Oct11_3pm.");
}

{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Appendix" });
  s.addText("Appendix: value working, steps 1 to 4 (the inputs)", { placeholder: "title" });
  const rows = [
    ["Step", "Figure", "Source and arithmetic", "Weakest point"],
    ["1. The pool", "£20.5bn in 8.9m balance transfers a year; £2,293 average", "UK Finance Card Spending Update, March 2026, row 'of which balance transfers', April 2025 to March 2026 summed: value £1,536m + £1,599m + £1,608m + £1,672m + £1,528m + £1,826m + £1,708m + £1,561m + £1,586m + £2,229m + £1,744m + £1,863m = £20,460m; volume 668k + 697k + 704k + 735k + 671k + 786k + 737k + 677k + 702k + 1,017k + 735k + 793k = 8,922k", "Counts every transfer onto any card, including onto existing cards and repeat transfers. New-card acquisition is a subset; if it is 60% of the pool, every value scales by 0.6"],
    ["2. Fair share", "About 24%, used as 20 to 25%", "Barclays 2025 Results: UK cards gross exposure £17.2bn at 31 Dec 2025 (includes Tesco Bank). UK Finance: £72.3bn UK card balances, March 2026. 17.2 / 72.3 = 23.8%", "Different bases and dates; share of balances, not of transfers. Replace with Barclaycard's share of the balance-transfer market if known"],
    ["3. AI sets the shortlist", "3%, 8%, 17%", "FCA / Yonder, n=5,026, April 2026: 69% shopped for a financial product; 17% of those used AI; credit-card shoppers 15 to 20%; 72 to 80% compared the AI's advice with other sources; under a quarter followed it; 2 to 6% ignored it. High = 17% undiscounted. Mid = 8%, roughly 17% x (a quarter who followed plus a fraction of those who compared). Low = 3%, roughly 17% x 0.2, those who followed only", "The 8% weighting is a judgement between two measured ends, not a measured figure. The input most worth arguing over"],
    ["4. The gap", "10, 17, 20 points", "This study: Barclaycard in the unprompted top three in 1 of 8 runs (12.5%), chosen in 0 of 8; a top-three entry converts less than a pick, so the AI share today is below 12.5%. Gap = fair share minus AI share: low 20 minus 10; mid 22 minus 5; high 25 minus 5", "Eight runs: one run moving changes the rate by 12.5 points. The PoC reruns narrow this"],
  ];
  table(s, rows, M, 1.3, 12.3, [1.3, 2.0, 5.6, 3.4], { fontSize: 8.5, rowH: 1.0, boldFirstCol: true, name: "value steps 1" });
  source(s, "deck/evidence/ukfinance_card_spending_march2026_text.txt; Barclays FY25 results credit risk tables; FCA ai-consumer-research.pdf; results.csv.");
}
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Appendix" });
  s.addText("Appendix: value working, steps 5 to 8 (the arithmetic and the cost side)", { placeholder: "title" });
  const rows = [
    ["Step", "Low", "Mid", "High", "Note"],
    ["5. Balances at stake = pool x AI share x gap", "£20.5bn x 3% x 10% = £61m", "£20.5bn x 8% x 17% = £279m", "£20.5bn x 17% x 20% = £697m", "Shown as £700m in the high case"],
    ["6. Accounts = balances / £2,293", "26,600", "121,700", "304,000", "One transfer taken as one account; if customers average 1.3 transfers per new account, divide by 1.3"],
    ["7. Value = accounts x £400 over 10 years", "£10.6m", "£48.7m", "£121.6m", "Per annual cohort; each year adds its own. Three years of the mid case is about £146m. Check that £400 is for a balance-transfer account and whether it is discounted"],
    ["8. Cost", "Model usage: tens of pounds a month for 8 to 24 runs", "Build: four to six weeks of one engineer", "Run: one to two analyst days a month", "Excludes the page changes, which sit with digital's release capacity"],
  ];
  table(s, rows, M, 1.3, 12.3, [2.8, 2.2, 2.2, 2.2, 2.9], { fontSize: 9, rowH: 0.62, boldFirstCol: true, shade: (i) => i === 3, name: "value steps 2" });
  heading(s, "Sensitivity of the mid case (£48.7m) to one input moving at a time", M, 4.6, 12.3, 12.5);
  const rows2 = [
    ["If this input changes", "to", "Mid-case value becomes"],
    ["New-card transfers are 60% of the UK Finance pool, not 100%", "£12.3bn pool", "£29m"],
    ["AI sets the shortlist in 5% of decisions, not 8%", "5%", "£30m"],
    ["AI sets the shortlist in 12% of decisions", "12%", "£73m"],
    ["The gap is 10 points, not 17", "10 points", "£29m"],
    ["1.3 transfers per new account", "accounts / 1.3", "£37m"],
  ];
  table(s, rows2, M, 5.0, 12.3, [6.5, 2.5, 3.3], { fontSize: 9, rowH: 0.27, name: "sensitivity" });
  source(s, "what_to_do.md item 8a. Every cell recomputes from the step 1 to 4 inputs on the previous slide.");
}
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Appendix" });
  s.addText("Appendix: alternative value model, impressions x conversion x £400 (to be populated with Barclaycard funnel data)", { placeholder: "title" });
  card(s, M, 1.3, 6.0, 4.65, "alt formula");
  heading(s, "The formula", M + 0.2, 1.4, 5.6, 13);
  s.addText([
    { text: "Value = lost favourable impressions x conversion (favourable impression to account) x £400 x N years of cohorts", options: { bold: true, color: C.accent1, breakLine: true, paraSpaceAfter: 8 } },
    { text: "where", options: { breakLine: true, paraSpaceAfter: 4 } },
    { text: "Impressions (I) = AI-assisted balance-transfer research sessions a year", options: { breakLine: true, paraSpaceAfter: 4 } },
    { text: "Favourable impression = the AI answer names Barclaycard in its shortlist (a 'quote')", options: { breakLine: true, paraSpaceAfter: 4 } },
    { text: "Lost favourable impressions = I x (target favourable rate minus current favourable rate)", options: { breakLine: true, paraSpaceAfter: 4 } },
    { text: "Conversion = share of favourable impressions that become a funded account (Barclaycard's quote-to-account rate for the AI channel, or the nearest digital proxy)", options: { breakLine: true, paraSpaceAfter: 4 } },
    { text: "£400 = value per account over 10 years (assumption supplied); N = years of cohorts counted", options: {} },
  ], { x: M + 0.2, y: 1.85, w: 5.6, h: 4.6, fontSize: 10.5, color: C.text1, margin: 0, valign: "top", isTextBox: true, objectName: "alt formula text" });
  card(s, 6.7, 1.3, 6.15, 4.65, "alt illustration");
  heading(s, "Illustration with public proxies (replace the shaded cells)", 6.9, 1.4, 5.75, 13);
  const rows = [
    ["Input", "Illustrative value", "Basis"],
    ["Impressions a year", "1.5m", "8.9m transfers x 17% AI-assisted (UK Finance; FCA)"],
    ["Current favourable rate", "12.5%", "Unprompted top three, 1 of 8 runs (this study)"],
    ["Target favourable rate", "50%", "Placeholder: Barclaycard in the top three of half of answers"],
    ["Lost favourable impressions", "569,000", "1.5m x (50% minus 12.5%)"],
    ["Conversion, favourable impression to account", "10% / 20%", "Placeholder: Barclaycard funnel data"],
    ["Accounts a year", "57,000 / 114,000", "569,000 x 10% / 20%"],
    ["Value per annual cohort at £400", "£23m / £45m", "accounts x £400"],
  ];
  table(s, rows, 6.9, 1.85, 5.75, [2.0, 1.3, 2.45], { fontSize: 8.5, rowH: 0.5, boldFirstCol: true, shade: (i) => i === 3 || i === 5, name: "alt table" });
  s.addText("Both models share the pool (step 1) and the £400. They differ in what sits between: the main model uses balances and market share; this one uses the AI answer as an impression and Barclaycard's own conversion rate, which makes it directly measurable by the monthly runs (favourable rate) and the funnel (conversion).", { x: M, y: 6.05, w: 12.3, h: 0.6, fontSize: 9.5, italic: true, color: C.text2, margin: 0, isTextBox: true, objectName: "alt note" });
  source(s, "what_to_do.md item 8a, alternative model. Shaded rows are placeholders, not findings.");
}

(async () => {
  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("written", OUT);
})();
