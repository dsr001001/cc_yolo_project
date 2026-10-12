# Barclaycard in AI balance-transfer recommendations: a defensible recommendation

Prepared 11 October 2026 from the Oct11_3pm study (8 web runs, 4 no-web control runs, 5 turns each, across Haiku 5.5, Sonnet 5.5, Opus 5.5 and Fable 5.1), with the earlier 11am, 12pm and 1230 runs as corroboration. Every claim below points at a transcript in Oct11_3pm/transcripts or Oct11_3pm/control, or at a page fetched independently and recorded in Oct11_3pm/ground_truth.md. Nothing here rests on what a model said about itself.

Persona throughout: 34, Leeds, renting, 38,000 salary, 3,000 at 24.9% on a small lender's card, 150 to 200 a month, wants it cleared in 18 to 24 months, fee ceiling about 3%. Branch A has clean credit; branch B has one missed payment 20 months ago.

## 1. The headline finding in one table

| Measure | Result | Where to check |
|---|---|---|
| Barclaycard in the model's final top three, unprompted (turn 2) | 1 of 8 web runs (Fable A, 3rd, the 22 month card) | summary.md section 1 |
| Barclaycard in the top three once the user mentioned it (turn 3) | 7 of 8 web runs | transcripts/*.md turn 3 |
| Barclaycard as the single card the model said to apply for (turn 4) | 0 of 8 | transcripts/*.md turn 4 |
| Barclaycard as first or second named fallback (turn 4) | 7 of 8 | transcripts/*.md turn 4 |
| Barclaycard in the shortlist with no web access (control) | 4 of 4 models; pick or conditional pick for 2 of 4 | control/*.md |
| Barclaycard facts stated correctly when the model read barclaycard.co.uk | 36m card correct in 8 of 8; 22m card correct in 7 of 7 that saw it | summary.md section 2 |

Reading: the models already think of Barclaycard as a leading balance-transfer issuer (the controls show that from memory alone), and they report the live offers accurately once they reach barclaycard.co.uk. The brand loses in the step between those two points: the comparison sources the models rank from do not carry the Barclaycard product that fits this user, and the framing those sources use for the products they do carry makes Barclaycard look uncertain next to HSBC, Virgin Money and Tesco.

## 2. Why the models did not pick Barclaycard, with the evidence for each cause

### Cause 1: the 22 month 1.49% card is invisible outside barclaycard.co.uk

This card is the best Barclaycard fit for an 18 to 24 month payoff plan, and it has the lowest fee of any card over 20 months in any source the models used. Yet:

- It is not in the MoneySavingExpert tables (ground_truth.md line 35).
- It is not in the Which? tables (ground_truth.md line 51).
- It is not on barclays.co.uk's own balance-transfer listing, which shows four cards (ground_truth.md line 23).
- Haiku A, the one run that read barclays.co.uk instead of barclaycard.co.uk, never learned the card existed and ranked the 36 month card instead (transcripts/A-haiku.md turn 3).
- Every run that found the card ranked it above the 36 month card for this persona (Fable A, Haiku B, Sonnet B, Fable A turn 3; Sonnet A placed both outside the top three but ranked 22m level with 36m).

Which? gives Barclaycard its only "Recommended Provider" badge for the 12 month no-fee card (ground_truth.md line 41). For a user who needs 18 to 24 months that badge does nothing; the models saw a 12 month card and moved on.

### Cause 2: "up to 36" loses to "definite 36" every time a model reads MSE

MSE lists HSBC, Virgin Money and Tesco under "definite" 36, 36 and 35 months, and Barclaycard under "up to 36 (pre-approved get 36, otherwise 36, 32 or 18)" (ground_truth.md lines 31 and 32). Opus A, Opus B, Fable A and Fable B all cited that split as the reason Barclaycard was conditional or lower (summary.md section 1, turn 3 table). Fable B called the 18 month floor "the worst value on the list" for a Fair applicant.

Two facts weaken MSE's framing and are not being used:

- HSBC's own page says "up to 36 months" with a possible 14 month outcome at 29.9% APR (ground_truth.md line 27). Opus A and Fable A discovered this at turn 5 and retracted "definite". The models only found it because they opened hsbc.co.uk themselves.
- Barclaycard's 22 month card page already states "at least 7 out of 10 customers accepted last month received the longest promotional period" (ground_truth.md line 19). No equivalent statement exists on the 36 month card page or on the listing page, and no model quoted it.

### Cause 3: the 3.15% fee sits 0.06 points above HSBC and 0.15 above the user's round-number ceiling

On 3,000 the gap to HSBC's 3.09% is under 2 pounds, and Haiku A, Opus A and Opus B said so. It still decided ties: Opus B put Barclaycard joint first with HSBC and then chose HSBC on the fee; Haiku A noted the fee was "0.15 over the ceiling". A persona who says "about 3%" filters at 3.00 in the model's reasoning, and 3.15 fails that filter while 2.9 (Capital One), 2.99 (Nationwide) and 1.95 (Virgin 24m) pass it.

### Cause 4: Barclaycard's pages publish no eligibility criteria, so the models treat HSBC as safer

HSBC's page states age, residency, a 6,800 income floor and group exclusions (ground_truth.md line 27). Barclaycard's listing page says only that "approval depends on financial circumstances and borrowing history" (ground_truth.md line 23). All eight web runs listed eligibility criteria as the top missing item at turn 5 (summary.md section 3, last bullet). Opus A and Haiku A used HSBC's explicit criteria as a reason to rank HSBC first and Barclaycard as the fallback "if HSBC's income or residency rules fail".

### Cause 5: the cashback-offer condition was read as a card condition

Sonnet B excluded the 36 month card outright because it "requires a Barclays personal current account" (transcripts/B-sonnet.md turn 3). The current-account condition applies only to the 20 pound cashback (ground_truth.md line 11). The offer text sits inside the card's listing block, with the cashback and Apple TV lines next to the term and fee, and that is where a summariser merges them.

### Cause 6: product-level URLs fail and third-party figures are stale

- Barclaycard product-level pages returned 404 in three runs; Opus B had to work from the listing page and Opus A from a search results page (summary.md section 3).
- Money to the Masses (May 2026) still gives 3.45% as the long-card fee. Opus B, the Opus control and the Fable control all carried 3.45%; Opus B only corrected it because it had opened barclaycard.co.uk the same turn.
- The 22 month card page shows 28.9% APR in its benefits section against a 24.9% headline, links a T&C file named 2023, and carries no "correct as of" date (ground_truth.md line 19). No Barclaycard page carries a date. Models at turn 5 asked for one in every run.

## 3. What to do, ranked by how much of the observed loss each item would recover

The ranking is by the number of runs in which the cause changed the outcome, then by how cheap the fix is.

| Rank | Action | Runs it would have changed | Effort |
|---|---|---|---|
| 1 | Get the 22 month 1.49% card into the MSE and Which? tables and onto barclays.co.uk | 5 (Haiku A, Opus A, Opus B, Sonnet A, Sonnet B never saw it in a table; Haiku A never saw it at all) | Low: a data submission to two editors and one internal listing |
| 2 | Publish the "7 in 10 get the longest period" statistic on the 36 month card and on the listing page, and give MSE the actual tier split for pre-approved and non-pre-approved applicants | 4 (Opus A, Opus B, Fable A, Fable B all ranked on "up to" versus "definite") | Low: the number already exists for the 22 month card |
| 3 | Separate the cashback and Apple TV offer block from the card's term, fee and eligibility block on the listing page, with its own heading | 1 directly (Sonnet B), but it was a wrong exclusion of the flagship card | Low: page layout |
| 4 | Publish eligibility criteria on every product page: minimum age, UK residency, minimum income, excluded existing products, and whether the checker is a soft search | 2 to 3 (Opus A, Haiku A ranked HSBC above on explicit criteria; all 8 flagged it missing) | Medium: compliance sign-off |
| 5 | Fix product-level URLs so the 36 month, 22 month and 12 month cards each have a stable page that resolves, and align barclays.co.uk with barclaycard.co.uk | 2 (Opus A, Opus B worked from search or listing pages) | Medium: web operations |
| 6 | Add "correct as of" dates to every product page; fix the 28.9% APR line and the 2023 T&C filename on the 22 month page | 0 directly, but every run asked for a date and three runs quoted stale third-party figures | Low |
| 7 | Review the 3.15% fee against HSBC's 3.09% and the 3.00% round-number filter; if the fee cannot move, state the pound cost on 3,000 next to the percentage | 2 (Opus B tie-break, Haiku A ceiling) | Commercial decision |
| 8 | Ask Money to the Masses, Finder and lovemoney to refresh Barclaycard figures (3.45% long-card fee, 2014 and 2025 pages still indexed) | 1 (Opus B) plus both Opus and Fable controls | Low: outreach |

### Why item 1 is first

It is the only change that affects the unprompted shortlist, which is where seven of eight runs dropped Barclaycard. Items 2 to 8 mostly improve what happens after the user mentions Barclaycard, where recall is already high (7 of 8). The models rank from MSE and Which? first and open provider pages second; a product absent from both tables is absent from the shortlist unless the user asks about the brand.

### Why item 2 is second

"Definite" versus "up to" was cited more often than any other single reason for ranking HSBC above Barclaycard, and the data to answer it already exists on the 22 month page. HSBC's own page shows HSBC is also "up to", so the asymmetry is in MSE's labelling and in what each issuer discloses, not in the products.

## 4. What Barclaycard should not conclude from this study

- **Not a brand-awareness problem.** Every model names Barclaycard from memory with no web access, and Haiku and Sonnet rank it first or second there. The prior is strong.
- **Not an accuracy problem on barclaycard.co.uk.** Every figure a model read from the page was reported correctly. The errors came from pages the models could not reach (Haiku A on barclays.co.uk), from third-party sites (3.45%), and from one summariser merge (Sonnet B).
- **Not a problem with a single model.** The unprompted exclusion happened in all four model families and both credit branches. The one unprompted inclusion (Fable A) came from the model opening barclaycard.co.uk at turn 1, which is the behaviour item 1 would make unnecessary.

## 5. How to measure whether the actions worked

Rerun the same protocol (Oct11_3pm/protocol.md) with the same persona and the same turn script, monthly, and track:

| Metric | Baseline 11 Oct 2026 | Target |
|---|---|---|
| Unprompted top-three rate (turn 2) | 1 of 8 | 4 of 8 |
| Prompted top-three rate (turn 3) | 7 of 8 | 8 of 8 |
| Forced pick rate (turn 4) | 0 of 8 | 2 of 8 |
| Runs that see the 22 month card | 7 of 8 | 8 of 8, and from a comparison table, not only from barclaycard.co.uk |
| Runs citing "up to" uncertainty as the reason for ranking below HSBC | 4 of 8 | 0 of 8 |
| Runs with a wrong Barclaycard eligibility claim | 1 of 8 | 0 of 8 |
| Runs reporting a Barclaycard product-page 404 | 3 of 8 | 0 of 8 |

Two cautions on measurement. First, eight runs is a small sample; a single run moving changes a rate by 12.5 points, so read trends over three months, not month to month. Second, the model mix will change; keep the four-family design so that a shift in one vendor's retrieval behaviour (Sonnet never reaching MSE, for example) does not get read as a market change.

## 6. Limits of this study

- One persona, one debt size, one date. A 5,000 debt or a 36 month plan would favour the 36 month card and change the ranking.
- Sub-agents saw summarised pages, not raw HTML, so page-layout findings (cause 5) are inferred from what the summariser returned.
- Comparison-site tables were read on 7 October (MSE) and 1 October (Which?); editors may update them before any submission lands.
- The turn 3 probe ("a friend mentioned Barclaycard") measures prompted recall, not organic discovery. The unprompted rate at turn 2 is the better proxy for a real user who does not name a brand.
