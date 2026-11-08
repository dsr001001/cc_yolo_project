from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table,
                                TableStyle, PageBreak, KeepTogether, NextPageTemplate)

OUT = "/home/user/cc_yolo_project/Oct11_3pm/Barclaycard_AI_study_record.pdf"

NAVY = colors.HexColor("#0B2E59")
BLUE = colors.HexColor("#1F5FA8")
MID = colors.HexColor("#5B8FD0")
PALE = colors.HexColor("#EAF1F9")
LINE = colors.HexColor("#C9DBF0")
INK = colors.HexColor("#0A1F3D")

base = dict(fontName="Helvetica", textColor=INK, leading=13.5, fontSize=10)
S = {
    "title": ParagraphStyle("title", fontName="Helvetica-Bold", fontSize=26, leading=31, textColor=colors.white),
    "subtitle": ParagraphStyle("subtitle", fontName="Helvetica", fontSize=13, leading=18, textColor=colors.HexColor("#C9DBF0")),
    "h1": ParagraphStyle("h1", fontName="Helvetica-Bold", fontSize=17, leading=21, textColor=NAVY, spaceBefore=4, spaceAfter=8),
    "h2": ParagraphStyle("h2", fontName="Helvetica-Bold", fontSize=12.5, leading=16, textColor=BLUE, spaceBefore=10, spaceAfter=4),
    "body": ParagraphStyle("body", spaceAfter=6, **base),
    "bullet": ParagraphStyle("bullet", leftIndent=12, bulletIndent=2, spaceAfter=3, **base),
    "cell": ParagraphStyle("cell", fontName="Helvetica", fontSize=8.5, leading=10.8, textColor=INK),
    "cellb": ParagraphStyle("cellb", fontName="Helvetica-Bold", fontSize=8.5, leading=10.8, textColor=INK),
    "head": ParagraphStyle("head", fontName="Helvetica-Bold", fontSize=8.5, leading=10.8, textColor=colors.white),
    "note": ParagraphStyle("note", fontName="Helvetica-Oblique", fontSize=8.5, leading=11, textColor=colors.HexColor("#143A6B"), spaceAfter=6),
    "callout": ParagraphStyle("callout", fontName="Helvetica", fontSize=10, leading=13.5, textColor=INK),
}


def P(t, s="body"):
    return Paragraph(t, S[s])


def bullets(items):
    return [Paragraph(i, S["bullet"], bulletText="•") for i in items]


def table(rows, widths, bold_first=True, shade_rows=()):
    data = []
    for r_i, r in enumerate(rows):
        row = []
        for c_i, c in enumerate(r):
            if r_i == 0:
                row.append(Paragraph(c, S["head"]))
            else:
                row.append(Paragraph(c, S["cellb"] if (bold_first and c_i == 0) else S["cell"]))
        data.append(row)
    t = Table(data, colWidths=[w * cm for w in widths], repeatRows=1)
    style = [
        ("BACKGROUND", (0, 0), (-1, 0), BLUE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("GRID", (0, 0), (-1, -1), 0.4, LINE),
        ("TOPPADDING", (0, 0), (-1, -1), 3.5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3.5),
        ("LEFTPADDING", (0, 0), (-1, -1), 4),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4),
    ]
    for i in range(1, len(rows)):
        if i in shade_rows:
            style.append(("BACKGROUND", (0, i), (-1, i), LINE))
        elif i % 2 == 0:
            style.append(("BACKGROUND", (0, i), (-1, i), PALE))
    t.setStyle(TableStyle(style))
    return t


def callout(paras):
    t = Table([[paras]], colWidths=[17 * cm])
    t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), PALE), ("BOX", (0, 0), (-1, -1), 0.6, LINE),
                           ("LEFTPADDING", (0, 0), (-1, -1), 10), ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                           ("TOPPADDING", (0, 0), (-1, -1), 8), ("BOTTOMPADDING", (0, 0), (-1, -1), 8)]))
    return t


def on_cover(c, d):
    w, h = A4
    c.setFillColor(NAVY)
    c.rect(0, 0, w, h, stroke=0, fill=1)


def on_page(c, d):
    w, h = A4
    c.setFont("Helvetica", 8)
    c.setFillColor(MID)
    c.drawString(2 * cm, 1.2 * cm, "Barclaycard in AI balance-transfer advice: study record, prepared 8 November 2026")
    c.drawRightString(w - 2 * cm, 1.2 * cm, str(d.page))


doc = BaseDocTemplate(OUT, pagesize=A4, leftMargin=2 * cm, rightMargin=2 * cm, topMargin=1.8 * cm, bottomMargin=1.9 * cm,
                      title="Barclaycard in AI balance-transfer advice: study record",
                      author="Balance-transfer AI search study", subject="Record of the October 2026 study and choices for the next round")
frame_cover = Frame(2.2 * cm, 2 * cm, A4[0] - 4.4 * cm, A4[1] - 4 * cm, id="cover")
frame = Frame(2 * cm, 1.9 * cm, A4[0] - 4 * cm, A4[1] - 3.7 * cm, id="main")
doc.addPageTemplates([PageTemplate(id="Cover", frames=[frame_cover], onPage=on_cover),
                      PageTemplate(id="Main", frames=[frame], onPage=on_page)])

st = []
# ---------------- Cover ----------------
st += [Spacer(1, 6 * cm),
       P("Barclaycard in AI balance-transfer advice", "title"), Spacer(1, 0.4 * cm),
       P("Record of the October 2026 study: what was done, what was found, what was decided, and the choices to make before the next round", "subtitle"),
       Spacer(1, 1.2 * cm),
       P("Prepared for the Head of Credit Cards, 8 November 2026<br/>Fieldwork 11 October 2026; decisions taken 11 and 12 October 2026<br/>Study repository: dsr001001/cc_yolo_project, branch claude/context-other-chats-projects-gmtsoj, folders Oct11_11am, Oct11_12pm, Oct11_1230, Oct11_3pm", "subtitle"),
       NextPageTemplate("Main"), PageBreak()]

# ---------------- 1 Summary ----------------
st += [P("1. Summary", "h1"),
       P("<b>The question.</b> Which balance-transfer cards do AI assistants recommend to a UK customer, where do they get their information, and why does Barclaycard win or lose? The aim was to find out whether Barclaycard's offers fit how customers now research through AI, and what to change."),
       P("<b>What was done.</b> Four rounds on 11 October 2026, each sharper than the last. The final round ran four AI assistants with web search, twice each (a clean-credit and a fair-credit version of the same customer), over five scripted turns: 40 turns, every reply logged with the searches run and pages opened. Four further runs with no web access showed what the assistants believe from memory. Every claim was scored against the live pages, which were captured as screenshots the same day."),
       P("<b>What was found.</b>")]
st += bullets([
    "Unprompted, Barclaycard made the final top three in 1 of 8 runs. Once the customer named it, 7 of 8. As the single card to apply for, 0 of 8; Virgin Money took 4, HSBC 3, Tesco 1. Barclaycard was the first or second fallback in 7 of 8.",
    "The assistants know Barclaycard: with no web access all four named it among the leaders. Every figure they read from barclaycard.co.uk was reported correctly.",
    "They lose it between memory and the pick. They build the shortlist from comparison guides (Which?, MoneySavingExpert), which omit the 22 month 1.49% card and label the 36 month card 'up to' against HSBC's 'definite'. Barclaycard's own pages lacked an eligibility line, put promotional text above the terms, returned 404s on product pages and carried an APR that contradicted the headline. The 3.15% fee decided ties against HSBC's 3.09%.",
    "In 2 of 8 runs an assistant told the customer something wrong about Barclaycard: a current-account requirement that does not exist, and a stale 3.45% fee.",
])
st += [P("<b>What was decided.</b> Eight items, reviewed one by one with the Head of Credit Cards: six product and page changes (no price change), a measurement plan, and a value case with a proof of concept and a handover to a run-the-bank team. Section 6 lists each with its test."),
       P("<b>What it is worth.</b> An order-of-magnitude estimate from public data, using an assumed £400 per account over 10 years: £11m, £49m or £122m of account value per annual cohort in the low, mid and high cases, with the mid case presented. An alternative impressions-based model is kept alongside for when Barclaycard funnel data is available."),
       Spacer(1, 4),
       callout([P("<b>Before the next round, five things to reconsider</b> (section 10 sets out the options):", "callout")] + bullets([
           "<b>All four assistants studied were Anthropic Claude models.</b> The baseline describes one vendor's assistants, not the market. ChatGPT, Gemini, Copilot, Perplexity and Google's AI answers are not covered. The deck and notes have been corrected on 8 November; earlier versions called them 'four model families'.",
           "<b>Eight runs is too few to separate signal from noise.</b> Under nearly the same design, Barclaycard's final top-three rate moved from 4 of 8 (12:30 round) to 1 of 8 (3pm round), and Fable picked Barclaycard in both runs at 12pm and in neither at 3pm.",
           "<b>The opening question asked for a source for every fact.</b> Real customers rarely ask that, and it likely pushes assistants towards comparison sites. A natural-language arm is needed.",
           "<b>The market has moved since 11 October.</b> The Apple TV and cashback offers ended on 20 October and the comparison tables have been updated. The baseline needs re-capturing before the first PoC cycle.",
           "<b>The value model's 'AI share' input was measured only in Claude models.</b> Barclaycard's share in other assistants is unknown, so the estimate's middle term is the weakest link.",
       ]))]
st.append(PageBreak())

# ---------------- 2 How the work evolved ----------------
st += [P("2. How the work evolved", "h1"),
       P("Each round changed the design in response to what the previous one showed or what the Head of Credit Cards asked for. The table is the audit trail; each folder holds its own protocol, transcripts and summary."),
       table([
           ["Round", "Design", "Why it changed", "What it showed"],
           ["11am (Oct11_11am)", "4 assistants x 2 credit profiles, 3 turns planned; stopped after turn 1 at the user's request. The customer's debt was on a Barclaycard, so Barclaycard could not be the target", "First attempt", "No assistant picked at turn 1; all asked 2 to 4 clarifying questions. TSB was the universal 'longest' card. Barclaycard named in 7 of 8 even though it was the source card"],
           ["12pm (Oct11_12pm)", "Same, 3 turns completed. Debt moved to a small online lender and a building society account, so every major brand was a valid target", "Keep the source bank neutral and all major brands as targets", "Single picks: HSBC 3, Barclaycard 2 (both Fable), Nationwide 1, Lloyds 1, Virgin Money 1"],
           ["12:30 (Oct11_1230)", "Three ranked options per turn, rationale, a source link for every fact, a search log after every reply; turn 3 asked where each number came from", "Head of Credit Cards: need to know where information is picked from, for Barclays", "Barclaycard in 4 of 8 final top threes, ranked first in 1. Which? and MSE dominated sources. A Barclaycard tracking report was produced (barclaycard_tracking.md)"],
           ["3pm (Oct11_3pm)", "Five turns: top three, customer details, Barclaycard probe, forced single pick, provenance and gaps. Plus 4 no-web control runs and same-day ground truth for the key pages", "Sharpen to a defensible recommendation", "The results in section 4. Basis for the deck and the decisions"],
           ["Deck, 1st version", "Argued by cause, with a screenshot and a falsification test per claim", "Request for a presentation to the Head of Credit Cards", "Rejected: the structure was not what was needed"],
           ["Deck, 2nd version", "Four sections, one per assistant: question asked, clarifying questions, common questions, sources, options and why or why not Barclaycard, what would improve it", "Head of Credit Cards' structure", "Accepted as the core of the deck"],
           ["What-to-do review", "Eight items, one at a time: problem, challenge, live check, decision, test (what_to_do.md)", "Turn findings into decisions", "Section 6"],
           ["Value and handover", "Public-data value model, sensitivity, £400 account value, alternative impressions model, PoC scope, run-the-bank design", "Needed to get attention at the right level and to hand over", "Sections 7 and 8; executive summary and appendix slides added to the deck"],
       ], [2.4, 5.0, 4.0, 5.6]),
       ]
st.append(PageBreak())

# ---------------- 3 Method ----------------
st += [P("3. Method of the final round", "h1"),
       P("3.1 The customer", "h2"),
       P("Age 34, Leeds, renting, employed on £38,000, on the electoral roll for three years. About £3,000 at 24.9% APR on a card from a small online lender; current account with a building society that does not issue credit cards; no relationship with any major card issuer. Can pay £150 to £200 a month, wants the debt cleared in 18 to 24 months, prefers a longer 0% period as a safety net, accepts a fee up to about 3%, has not used an eligibility checker. Profile A: never missed a payment, Experian 'Good'. Profile B: one missed payment 20 months ago, Experian 'Fair'."),
       P("3.2 The conversation", "h2"),
       table([
           ["Turn", "What the customer said"],
           ["1", "\"Hi, I'm in the UK and I've got about £3,000 on a credit card charging me 24.9% APR. I want to move it to a 0% balance transfer card so I can actually clear it. Can you give me your top three cards to consider, ranked, with your reasoning for each? And please tell me where you got each piece of information from, I want to be able to check it.\""],
           ["2", "Answers to the assistant's questions from the customer sheet, credit standing volunteered per profile, and a request for the final ranked three with a source link per fact"],
           ["3", "\"A friend mentioned Barclaycard. Where would Barclaycard's balance transfer cards sit in your ranking for me, and why? Please source every number.\""],
           ["4", "\"I'm going to apply to one card today. Pick one for me, tell me why, and tell me what would have to be true for you to change that pick.\""],
           ["5", "Where each 0% length, fee and eligibility detail came from; which sites were relied on; whether providers' pages were opened; what came from memory; what was missing from providers' pages"],
       ], [1.2, 15.8]),
       P("3.3 The assistants and the controls", "h2"),
       P("Four Anthropic Claude models at medium effort: Haiku 5.5, Sonnet 5.5, Opus 5.5 and Fable 5.1. Each ran as a separate agent with a web search tool and a page-fetch tool, and appended a SEARCH LOG to every reply (queries run, URLs used, which were opened). Turn 2 answers were given by the study orchestrator from the fixed customer sheet. Four control runs, one per model, used the profile A customer with web access forbidden, to show what each model believes from training data alone."),
       P("3.4 Ground truth and evidence", "h2"),
       P("The same afternoon, the Barclaycard listing and 22 month product page, the barclays.co.uk listing, HSBC's product page, and the MoneySavingExpert and Which? guides were fetched and recorded (ground_truth.md). Full-page screenshots and annotated crops were taken with a headless browser (deck/evidence, with a README listing URLs and capture times). During the what-to-do review, eligibility sections of ten competitor pages, page dates, the Barclaycard terms PDF and three third-party sites were checked live and captured the same way."),
       P("3.5 Scoring", "h2"),
       P("Per run: Barclaycard named, ranked and which product at each turn; stated reasons for and against; the turn 4 pick and switch conditions; sources relied on; provider pages opened; each Barclaycard claim scored against ground truth as matching, stale or wrong. Results are in results.csv and summary.md; every count in this record can be recomputed from the transcripts."),
       ]
st.append(PageBreak())

# ---------------- 4 Results ----------------
st += [P("4. Results", "h1"),
       P("4.1 Barclaycard across the rounds", "h2"),
       table([
           ["Round and stage", "Barclaycard named (of 8)", "In the final three or picked", "Note"],
           ["11am, turn 1", "7", "no picks made", "Barclaycard was the customer's existing card"],
           ["12pm, turn 2 single pick", "7 at turn 1", "picked in 2 (both Fable)", "HSBC picked in 3"],
           ["12:30, turn 2 final three", "6 at turn 1", "in 4 final threes; first in 1 (Fable B, 22 month card)", "Two runs demoted it at turn 3 after failing to reach Barclaycard's page"],
           ["3pm, turn 2 final three", "all 8 by turn 3", "in 1 final three (Fable A, 22 month card, third)", "Most structured round"],
           ["3pm, turn 3 once named", "8", "top three in 7", "Probe names Barclaycard for the customer"],
           ["3pm, turn 4 forced pick", "8", "picked in 0; first or second fallback in 7", "Virgin Money 4, HSBC 3, Tesco 1"],
       ], [3.6, 3.0, 4.6, 5.8]),
       P("The swing between 12:30 and 3pm, under nearly the same customer and opening question, is the clearest sign that eight runs cannot separate a real difference from run-to-run variation. It is the main reason section 10 recommends repeats.", "note"),
       P("4.2 The final round in numbers", "h2"),
       table([
           ["Measure", "Result"],
           ["Barclaycard in the unprompted final top three (turn 2)", "1 of 8"],
           ["Barclaycard in the top three once the customer named it (turn 3)", "7 of 8"],
           ["Barclaycard chosen as the card to apply for (turn 4)", "0 of 8"],
           ["Barclaycard first or second fallback (turn 4)", "7 of 8"],
           ["No-web controls naming Barclaycard in the shortlist", "4 of 4; pick or conditional pick in 2"],
           ["Barclaycard figures correct when read from barclaycard.co.uk", "36 month card 8 of 8; 22 month card 7 of 7 that saw it"],
           ["Runs giving a wrong fact about Barclaycard", "2 of 8"],
           ["Runs listing eligibility criteria as missing from provider pages", "8 of 8"],
       ], [11.0, 6.0]),
       P("4.3 Each assistant in one paragraph", "h2"),
       P("<b>Haiku 5.5</b> asked the fewest questions (3 and 2) and never asked who issued the card or where the customer banked. It shortlisted from Which?. In profile A it read barclays.co.uk, which does not list the 22 month card, and never learned the card existed. Picks: HSBC (A), Tesco Low Fee (B); Barclaycard was the first fallback in both."),
       P("<b>Sonnet 5.5</b> asked the fullest set of questions (4 and 4) but never reached MoneySavingExpert in either run. Its profile A pick, Virgin Money 35 months at 2.45%, came from a Moneyfacts chart dated July 2026 that no October source supports. In profile B it excluded the 36 month card, reading the cashback's current-account condition as a card condition."),
       P("<b>Opus 5.5</b> led with the same-group transfer rule and opened the most provider pages. In profile A it ranked on MSE's 'definite' versus 'up to'. In profile B it had Barclaycard joint first with HSBC and chose HSBC because the 36 month card's own page returned 'not found', so it could not settle 3.15% against a stale third-party 3.45%."),
       P("<b>Fable 5.1</b> opened barclaycard.co.uk at turn 1 in both runs, asked about a Barclays current account in both because of the cashback, and produced the only unprompted Barclaycard top-three entry. It picked Virgin Money's 24 month card in both runs and named 'the proportion of applicants who get the headline 0% length' as the fact that would most have sharpened its advice."),
       P("4.4 Where the information came from", "h2"),
       P("Domains used by number of web runs (of 8): Which? 7, barclaycard.co.uk 7, Virgin Money 5, Nationwide 5, HSBC 5, Finder 5, Tesco Bank 4, MoneySavingExpert 4, Money to the Masses 3, TSB 2, barclays.co.uk 1. The pattern held in every round: a comparison guide sets the shortlist, provider pages are checked second, and the pick follows the guide's framing. Every assistant said it read pages through a summariser, not as raw HTML."),
       ]

# ---------------- 5 Causes ----------------
st += [P("5. Why Barclaycard loses", "h1"),
       P("Six causes, each tied to the runs in which an assistant gave it as a reason and to a screenshot of the page involved."),
       table([
           ["Cause", "Evidence", "Runs affected"],
           ["The 22 month 1.49% card, the best fit for this customer, is missing from MSE, Which? and barclays.co.uk", "Screenshots of all three; Haiku A never saw it; Fable B could not rank it without MSE's tier range", "5 of 8"],
           ["'Up to 36, 32 or 18' against HSBC's 'definite 36' on MSE", "HSBC's own page also says 'up to 36' with a 14 month outcome; Barclaycard already publishes '7 in 10 get the longest period' for the 22 month card, inside an accordion", "4 of 8"],
           ["3.15% fee against HSBC's 3.09% and the customer's 'about 3%'", "£1.80 difference on £3,000; still decided ties", "4 of 8"],
           ["No eligibility line on Barclaycard's pages; HSBC states age, residency and a £6,800 income floor", "All 8 runs listed eligibility as missing; HSBC won two tie-breaks on it", "2 to 3 of 8 decided, 8 of 8 flagged"],
           ["Promotional text above the card terms", "Sonnet B excluded the 36 month card on the cashback condition", "1 of 8 decided"],
           ["404s, broken images, a 28.9% APR line against the 24.9% headline, a terms file named 2023, no dates, stale third-party snippets", "Opus B lost a joint-first tie; Opus A sourced from a search page; three runs carried 3.45%", "2 of 8 decided, 5 of 8 hit"],
       ], [5.3, 8.7, 3.0]),
       P("Three conclusions the evidence does not support: it is not a brand-awareness problem (the no-web controls name Barclaycard), not an accuracy problem on barclaycard.co.uk (every figure read there was right), and not a single-model quirk (all four models excluded it unprompted). The last of these is narrower than it sounds: all four models come from one vendor.", "note"),
       ]

# ---------------- 6 Decisions ----------------
st += [P("6. Decisions taken", "h1"),
       P("Reviewed item by item with the Head of Credit Cards on 11 and 12 October. The full record, with each challenge and live check, is what_to_do.md."),
       table([
           ["#", "Decision", "Test after the change"],
           ["1", "Eligibility: state the regulatory constraints in every card block (18 or over, UK resident, subject to status); look to competitors for the rest. Live check of eleven issuers: HSBC, Santander, NatWest and Nationwide publish a pound income figure; TSB, MBNA and Lloyds 'a regular income'; Virgin, Tesco and Sainsbury's age and residency only; Barclaycard nothing on the listing page. Principle adopted: be explicit with what can already be shared but was held back for UI/UX (the soft-search line, the full-term statement, the documents list, the window-starts-at-opening statement)", "No run lists eligibility or soft-search status as missing (baseline 8 of 8)"],
           ["2", "The 22 month card: likely a legacy channel policy. Show it everywhere Barclaycard balance-transfer cards appear, including comparison-site feeds", "Seen from a guide in at least 4 of 8 (baseline 0 of 8)"],
           ["3", "'Up to': do not publish full-term shares or downsell tiers (hard to maintain; may deter applicants). Replace 'up to N months' with a definite list of the options an accepted applicant can be offered, each with fee and rate", "No run calls the term 'up to' or 'not guaranteed' after reading the site (baseline 7 of 8)"],
           ["4", "Promotional text: move below the terms (recommended); add 'You do not need a Barclays current account to apply for this card' (taken); next promotion's layout to be confirmed; apply on barclays.co.uk too", "No run implies a current-account requirement (baseline 1 of 8)"],
           ["5", "Correct the APR and fee mismatches; rates right in real time at every listing, with a visible date; 404s and images in a separate run, web team informed; terms file without a year, edition inside; get Barclaycard into Moneyfacts; ask Finder to review its soft-search line", "No quoted rate or fee differs from the site (baseline 3 of 8); no 404 or search-page source (baseline 5 of 8)"],
           ["6", "Fee: no change. 3.15% is a conscious decision under the pricing playbook, reviewed weekly by the commercial team. Pound-cost labelling not adopted. 24 and 21 month cards deferred", "Reported as observed behaviour"],
           ["7", "Measurement: monthly rerun of the same protocol against the 11 October baseline; one-persona proof of concept first, personas widened later", "Section 8"],
           ["8", "Value case, PoC and handover to run-the-bank, with £400 per account over 10 years assumed", "Sections 7 and 8"],
       ], [0.6, 11.4, 5.0]),
       ]
st.append(PageBreak())

# ---------------- 7 Value ----------------
st += [P("7. Commercial value", "h1"),
       P("7.1 Main model", "h2"),
       P("Value = UK balance-transfer pool x share of decisions where an AI assistant sets the shortlist x (Barclaycard's fair share minus its share in AI answers), converted to accounts at the average transfer and valued at £400 per account over 10 years."),
       table([
           ["Step", "Figure", "Source and working", "Weakest point"],
           ["1. Pool", "£20.5bn in 8.9m transfers a year; £2,293 average", "UK Finance Card Spending Update, March 2026, 'of which balance transfers', April 2025 to March 2026 summed", "Includes transfers onto existing cards and repeats; new-card acquisition is a subset"],
           ["2. Fair share", "About 24%, used as 20 to 25%", "Barclays 2025 results: UK cards gross exposure £17.2bn (incl. Tesco Bank) / UK Finance £72.3bn balances", "Share of balances, not of transfers; different dates"],
           ["3. AI sets the shortlist", "3%, 8%, 17%", "FCA / Yonder, n=5,026, April 2026: 17% of financial-product shoppers used AI; under a quarter followed it; 72 to 80% compared it with other sources", "8% is a judgement between two measured ends"],
           ["4. Gap", "10, 17, 20 points", "This study: unprompted top three 1 of 8, picked 0 of 8; AI share below 12.5%", "Eight runs, one vendor"],
           ["5. Balances", "£61m, £279m, £697m", "1 x 3 x 4", ""],
           ["6. Accounts", "26,600; 121,700; 304,000", "5 / £2,293", "One transfer taken as one account"],
           ["7. Value", "£10.6m, £48.7m, £121.6m per annual cohort", "6 x £400 (assumption supplied by the Head of Credit Cards)", "Check whether £400 is for a balance-transfer account and whether it is discounted"],
       ], [2.3, 3.2, 6.6, 4.9], shade_rows=(7,)),
       Spacer(1, 4),
       P("Sensitivity of the mid case (£48.7m), one input at a time: new-card transfers at 60% of the pool, £29m; AI shortlist share 5%, £30m; 12%, £73m; gap 10 points, £29m; 1.3 transfers per account, £37m. Three years of mid-case cohorts is about £146m. Running cost: tens of pounds a month in model usage, four to six weeks of one engineer to build, one to two analyst days a month to run; the page changes themselves sit with digital's release capacity.", "body"),
       P("7.2 Alternative model, kept alongside", "h2"),
       P("Value = lost favourable impressions x conversion (favourable impression, or quote, to account) x £400 x N years of cohorts. Illustration with public proxies: 1.5m impressions a year (8.9m transfers x 17% AI-assisted); favourable rate today 12.5%; placeholder target 50%; 569,000 lost favourable impressions; placeholder conversion 10% or 20%; 57,000 or 114,000 accounts; £23m or £45m per annual cohort. This model is the one the monthly runs (favourable rate) and the funnel (conversion) can measure directly. 'Favourable' must be defined before it is populated: named, in the top three, or recommended."),
       ]

# ---------------- 8 PoC and handover ----------------
st += [P("8. Proof of concept and handover", "h1"),
       table([
           ["", "Proof of concept (Head of Credit Cards)", "Run-the-bank (after handover)"],
           ["Scope", "Balance transfers; the existing customer in two credit profiles; web search on; five turns; eight runs a cycle", "Same, scripted against each assistant's API on a monthly schedule; search logs captured as data"],
           ["Cadence", "Three monthly cycles, planned November to January, plus a before-and-after cycle the week after the first site change", "Monthly, plus a nightly site hygiene monitor"],
           ["Measures", "The decision tests in section 6 against the 11 October baseline; targets by cycle 3 include the 22 month card seen from a guide in 4 of 8 and Barclaycard in the unprompted top three in 3 of 8", "Dashboard of the same table; same-day alerts for a wrong Barclaycard fact (product owner) or a 404 (web team)"],
           ["People", "Head of Credit Cards decides; the agency runs and scores", "Card team decides; digital fixes the site and runs the monitor; analytics runs the scorer with one-in-five human checks; compliance approves persona and prompts"],
       ], [2.2, 7.4, 7.4]),
       P("Status on 8 November: the November cycle was planned but has not been run in this workstream, and it is not known here whether any of the page changes have gone live.", "note"),
       ]

# ---------------- 9 Limitations ----------------
st += [P("9. What the method can and cannot support", "h1"),
       table([
           ["Limitation", "Effect on the findings", "How serious"],
           ["All four assistants are Anthropic Claude models", "Findings describe one vendor's assistants and its search tool. ChatGPT, used by about six in ten UK adults who use AI for money (Lloyds, November 2025), is not covered, nor Gemini, Copilot, Perplexity or Google's AI answers", "High: limits every market-level statement and the value model's gap input"],
           ["Eight runs per round, one per cell", "One run moving changes a rate by 12.5 points; Barclaycard's top-three rate went from 4 of 8 to 1 of 8 between two near-identical rounds", "High for rates; lower for the repeated reasons, which held across rounds"],
           ["The opening question asked for sources and reasoning", "Probably pushes assistants to comparison sites and to longer, more cautious answers than a customer would get", "Medium: the source findings may overstate guide-led shortlisting"],
           ["One customer, one debt size, one day", "A £5,000 debt or a 36 month plan would favour the 36 month card; a Barclays customer would change the cashback reading", "Medium: findings are specific to this customer"],
           ["Turn 3 names Barclaycard", "Measures prompted recall, not discovery; turn 2 is the better proxy for a customer who names no brand", "Low if read correctly"],
           ["Causes are the assistants' stated reasons", "A model can give a reason that is not its real driver; the after-change rerun is the control", "Medium"],
           ["Assistants read pages through a summariser", "Layout findings (offer text merged with terms) are inferred from what the summariser returned and corroborated by screenshots", "Low to medium"],
           ["Search location not controlled", "The search tool the runs used is documented as US-based; UK customers search from UK locations, which may change results", "Unknown: record and control it next round"],
           ["Turn 2 answers given by the study orchestrator", "Consistent across runs, but a real customer answers less tidily", "Low"],
           ["Value model built from public proxies", "Pool includes existing-card transfers; fair share is a balance share; the 8% AI-shortlist share is a judgement", "High for the point estimate; the range is the honest output"],
       ], [4.3, 8.7, 4.0]),
       ]
st.append(PageBreak())

# ---------------- 10 Strategy choices ----------------
st += [P("10. Choices for the next round", "h1"),
       P("Each row is a decision to make before the first PoC cycle, with the options and a recommendation. The recommendations are a starting point for discussion, not settled."),
       table([
           ["Decision", "Options", "Recommendation and why"],
           ["Which assistants", "a) Keep the four Claude models. b) Add other vendors through their APIs with search grounding. c) Capture consumer apps directly (ChatGPT, Gemini, Copilot, Perplexity, Google AI answers) with screenshots", "b) for the monthly automated runs, plus c) once a quarter as a check, because consumer apps add memory, location and personalisation that APIs do not. Without other vendors the baseline is one vendor's view"],
           ["How many runs", "a) One run per cell, as now. b) Three repeats per cell. c) Five repeats", "b) at minimum: three repeats of 2 profiles x the chosen assistants. Report the range across repeats, not a single count. Variance between rounds was larger than most effects"],
           ["Opening question", "a) Keep the source-requesting question. b) Replace with a natural question. c) Run both arms", "c): a natural arm ('What's the best balance transfer card for about £3k?') to measure what customers see, and the sourced arm as the diagnostic that explains why"],
           ["Barclaycard probe and forced pick", "a) Keep turns 3 and 4. b) Drop turn 3 to avoid leading", "a): keep both, but report turn 2 (unprompted) as the headline and turn 3 only as prompted recall"],
           ["Customers", "a) One customer as in the PoC. b) Add one more now. c) A matrix", "a) for cycle 1 to keep it comparable with 11 October; add an existing Barclays current-account customer in cycle 2 (tests decisions 1 and 4 directly), then a £5,000 / 36 month customer"],
           ["What to score", "a) Barclaycard only. b) Share of voice for every issuer", "b): score HSBC, Virgin Money, Tesco, Capital One, Nationwide and TSB the same way, so a Barclaycard gain or loss is read against the field"],
           ["Definition of a favourable answer", "Named; in the top three; recommended as the pick", "Record all three every run; pick one for the alternative value model and use the matching conversion rate"],
           ["Ground truth and timing", "a) Re-use 11 October. b) Re-capture every cycle", "b): offers ended 20 October and the guides have been updated. Capture ground truth and screenshots the same day as each cycle; time one cycle for the week after the first page change"],
           ["Search location", "Not controlled; record it; route through a UK location", "Record it at minimum; route UK where the assistant allows"],
           ["Value inputs", "Keep public proxies or replace from internal data", "Replace three: new-card share of the transfer pool, Barclaycard's share of balance-transfer acquisitions, and referral traffic from AI assistants in web analytics (a direct measure of impressions for the alternative model)"],
       ], [3.2, 5.4, 8.4]),
       ]
st.append(PageBreak())

# ---------------- 11 Questions ----------------
st += [P("11. Questions for the consultation", "h1")]
st += bullets([
    "Which assistants matter most to Barclaycard's customers? Web analytics referrals from chatgpt.com, gemini.google.com, copilot.microsoft.com and perplexity.ai would answer this and size the impressions input at the same time.",
    "Have any of decisions 1 to 5 gone live, or been scheduled? This decides whether the November cycle is a second baseline or an after-change measurement.",
    "What budget is there for repeats and for consumer-app capture? Three repeats across, say, six assistants and two profiles is 36 runs a cycle instead of eight.",
    "Who signs off the customer persona and the prompts for the run-the-bank version? Compliance was proposed.",
    "Can the funnel give a conversion rate from a favourable AI mention to a funded account, or the nearest digital proxy (quote to account, eligibility check to account)?",
    "Is the £400 per account over 10 years specific to balance-transfer accounts, and is it discounted?",
    "Should the next round widen beyond balance transfers (purchase cards, rewards cards, loans) or deepen on balance transfers first?",
])

# ---------------- 12 Artefacts ----------------
st += [P("12. Where everything is", "h1"),
       table([
           ["Artefact", "Path in the repository"],
           ["Deck (43 slides: executive summary, method, four model sections, cross-model comparison, What to do, appendix with value working)", "Oct11_3pm/deck/Barclaycard_AI_search_study.pptx; generator build_deck.js"],
           ["Screenshots and annotated crops, with capture README", "Oct11_3pm/deck/evidence/"],
           ["Decisions record, item by item", "Oct11_3pm/what_to_do.md"],
           ["Final round: protocol, summary, results, ground truth", "Oct11_3pm/protocol.md, summary.md, results.csv, ground_truth.md"],
           ["Final round transcripts with search logs; no-web controls", "Oct11_3pm/transcripts/, Oct11_3pm/control/"],
           ["Earlier written recommendation", "Oct11_3pm/barclays_recommendation.md"],
           ["Earlier rounds", "Oct11_11am/, Oct11_12pm/, Oct11_1230/; Barclaycard tracking across them: barclaycard_tracking.md"],
           ["Public data used in the value model", "Oct11_3pm/deck/evidence/ukfinance_card_spending_march2026_text.txt; Barclays and FCA sources cited in what_to_do.md item 8"],
           ["This record", "Oct11_3pm/Barclaycard_AI_study_record.pdf"],
       ], [8.5, 8.5]),
       Spacer(1, 8),
       P("Correction made on 8 November 2026: the deck, what_to_do.md and barclays_recommendation.md previously described the four assistants as 'four model families' and implied several vendors. They are four Anthropic Claude models. The wording has been corrected in all three; the findings and numbers are unchanged.", "note"),
       ]

doc.build(st)
print("written", OUT)
