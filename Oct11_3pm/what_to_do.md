# What to do: working list

Built item by item with the Head of Credit Cards review. Each item records the problem the study found, the challenge raised, what was checked, and the decision. Status: open until a decision is written.

## 1. Eligibility criteria on Barclaycard pages

**Problem found.** All eight web runs listed eligibility criteria (age, income, residency, excluded products) as the first thing missing from provider pages at turn 5. Haiku A and Opus B ranked HSBC above Barclaycard partly because HSBC states who can apply.

**Challenge raised.** "No bank declares eligibility on income. Check online."

**Checked online, 11 October 2026 (deck/evidence/X_elig_*.jpg and README).**

| Issuer | Minimum income stated | Other criteria stated |
|---|---|---|
| HSBC | £6,800 taxable income or pension | over 18, UK resident, no HSBC Basic Bank Account, group exclusions |
| Santander | £10,500 a year | 18+, permanent UK resident, no bankruptcy, CCJ or IVA in 6 years |
| NatWest | £10,000 a year | UK resident, 18+, not bankrupt in 6 years |
| Nationwide | £5,000 a year before tax | 18+, UK resident, Nationwide member |
| TSB | "a regular income" | over 18, UK resident, no recent CCJs, defaults or bankruptcies |
| MBNA | "a regular income" | UK resident 18+, no bankruptcy, IVA or CCJs, not declined in 30 days |
| Lloyds | "a regular income" | UK resident, 18+, no bankruptcies, CCJs or IVAs |
| Virgin Money | none | UK residents aged 18 or over, subject to status |
| Tesco Bank | none | UK residents aged 18 and over, subject to status |
| Sainsbury's Bank | none | UK resident |
| Barclaycard | none | none on the listing page; the 22 month page says the checker is for 18 or over and lists the documents an applicant needs |

Result: four of the ten competitors checked publish a pound figure; three more state "a regular income" plus adverse-credit exclusions; three state only age and residency. Barclaycard is the only one of the eleven with no eligibility line at all on its balance-transfer listing page.

**Proposal.** Two tiers, decide which:
- Tier 1 (matches Virgin, Tesco): add "Available to UK residents aged 18 or over, subject to status" to every card block, and move the "won't affect your credit score" line from the page-bottom banner into each card block next to the eligibility checker link. No policy change needed.
- Tier 2 (matches HSBC, Santander, NatWest, Nationwide): also state a minimum income and the adverse-credit exclusions Barclaycard applies. Needs the credit policy owner to confirm the figures can be published.

**Decision (11 October 2026): closed.**
1. State the criteria that are a regulatory constraint on every applicant, in every card block: aged 18 or over, UK resident, credit subject to status and affordability. These are already true, cost nothing to publish, and are what Virgin Money and Tesco publish.
2. Look to competitors for the rest. Where Barclaycard's credit policy allows, match what HSBC, Santander, NatWest and Nationwide disclose (minimum income, adverse-credit exclusions). This needs the policy owner's confirmation and is not a condition of closing the item.
3. The principle for this item and the ones that follow: be explicit in sharing what can already be shared but was held back for UI/UX reasons. On Barclaycard's own pages today that means:
   - the "won't affect your credit score" soft-search line, which exists only in a banner below all five cards, so two runs said they could not tell whether the checker is a soft search;
   - the "at least 7 in 10 accepted customers get the longest period" statement, which exists only inside a collapsed accordion on the 22 month page;
   - the "what you'll need" list (address history, income before and after tax, outgoings, bank details), which exists only on the 22 month page;
   - the statement that the 60 day transfer window and the 0% period run from account opening.
   Move each into the card blocks on the listing page and onto every product page, in plain text, not in banners, accordions or footers that a page summariser drops.

**Test after the change.** Rerun the protocol. Falsified as a fix if any run still lists eligibility or the soft-search status as missing at turn 5.


## 2. The 22 month 1.49% card is absent from the comparison guides and from barclays.co.uk

**Problem found.** The card is on barclaycard.co.uk only. It is not in MoneySavingExpert's tables (updated 7 October 2026), not in Which?'s tables (1 October 2026), and not on the barclays.co.uk balance-transfer listing, which shows four cards. Haiku A, which read barclays.co.uk, never learned it existed. Fable B could not rank it because MSE gives no tier range for it. Every run that found it ranked it above the 36 month card for an 18 to 24 month payoff plan, and it was the first fallback in four runs. Evidence: deck/evidence E10, E12, E3, P3, P5, P6.

**Question put to the Head of Credit Cards.** Is the omission deliberate (a card meant for direct or app traffic only, or a test cell), a data-feed gap to the comparison sites, or not known about?

**Decision (11 October 2026): closed.** Likely a legacy channel policy (shown on some channels, not others). Recommendation: show the 22 month card as an option everywhere Barclaycard balance-transfer cards appear: barclays.co.uk, the Barclays app, and the data feeds to MoneySavingExpert, Which?, Moneyfacts, Finder and other comparison sites, with the same tier information as the 36 month card so the guides can label it.

**Test after the change.** Open barclays.co.uk's listing and the MSE and Which? guides and search for "22 month". Rerun the protocol: falsified as a fix if any run that opens a guide or barclays.co.uk still fails to see the card.

## 3. "Up to" against "definite": the term-certainty label

**Problem found.** MoneySavingExpert files HSBC, Virgin Money and Tesco under "definite" long deals ("ALL accepted get the full 0% length") and Barclaycard under "up to" ("if pre-approved you'll get the full 36 months; if not, you may get 36, 32 or 18 months and you'll only find out after applying"). Opus A, Opus B, Fable A and Fable B gave that label as the reason HSBC or Virgin stayed above Barclaycard; Haiku B made the same point with Tesco's "guaranteed". It was the single most-cited reason in the study. Evidence: E8, E9 (MSE blocks); transcripts A-opus turn 3, B-fable turn 3, A-fable turn 4, B-haiku turn 4.

Three facts the models did not have:
- HSBC's own page says "up to 36 months" and its FAQ gives three outcomes (36 at 25.9%, 36 at 29.9%, 14 at 29.9%). MSE's "definite" is MSE's label, not HSBC's. Opus A and Fable A found this at turn 5 and withdrew "definite". Evidence: E7b, ground_truth.md line 27.
- Barclaycard already publishes "at least 7 out of 10 customers accepted last month received the longest promotional period" for the 22 month card, inside a collapsed accordion. Nothing equivalent exists for the 36 month card. Evidence: E5.
- The 36, 32 or 18 tiers appear only on MSE. Barclaycard's own pages say "the balance transfer period and interest rates may differ from those shown" and nothing more.

**Questions put to the Head of Credit Cards.**
1. Can the full-term share be published for the 36 month card (and the 12 month card) the way it is for the 22 month card, and can it move out of the accordion into the card block?
2. Is the tier structure on MSE (36, 32 or 18) current, and does Barclaycard supply it or does MSE infer it?
3. Is there a case for making one card "definite" (every accepted applicant gets the full term), given that HSBC's product is in fact also conditional and wins on the label alone?

**Decision (11 October 2026): closed.** Do not publish the full-term share or the downsell tiers: the exact downsell durations are hard to maintain, and revealing them may scare applicants away. Instead, replace "up to N months" with a long but clear, definite list of the options an accepted applicant can be offered, each stated as a definite term with its fee and rate (for example: 36 months at 0% with a 3.15% fee; 32 months at 0% with a 3.15% fee; 18 months at 0% with a 3.15% fee), with one line saying the option offered depends on the eligibility assessment and is shown by the checker before applying. The aim is that a model reads definite terms, not an open-ended "up to".

**Notes for implementation.**
- The list must match what the decision engine can actually offer, and change when it changes; that is the maintenance cost the item accepts in place of publishing shares.
- MSE's "definite" label is for cards where every accepted applicant gets the full term. A definite list does not earn that label on its own; what it earns is a model that can quote each option as a fixed term, and a checker result that maps to one of them. Ask MSE to show the list rather than "36, 32 or 18".
- Apply the same format to the 22 month card (22 or 11 months, per its own page) and the 12 month card (12 or 6).

**Test after the change.** Rerun the protocol. Falsified as a fix if a model still describes the Barclaycard term as "up to" or "not guaranteed" after reading barclaycard.co.uk, or if the listed options differ from what the checker returns.

## 4. Promotional text sits inside the card's terms block

**Problem found.** On the listing page the 36 month card's block opens with two promotional bullets (12 months of Apple TV; £20 cashback, which needs an application in the Barclays app and a Barclays personal current account) before the 0% term, the fee and the transfer window. Sonnet B read the cashback condition as a card condition and excluded the card: "Platinum up to 36 month: not available to you. Barclaycard's page says it requires a Barclays personal current account." It repeated the exclusion at turns 4 and 5. Fable asked whether the user has a Barclays current account in both runs because of the cashback, and in B dismissed the 36 month card in the same breath. Haiku A, Opus A, Opus B and Fable A each spent a paragraph establishing that the cashback does not apply. Opus A alone treated the Apple TV offer as a tie-breaker in Barclaycard's favour. Evidence: E1; transcripts B-sonnet turn 3 line 119, A-fable and B-fable turn 1, A-opus turn 4.

**Questions put to the Head of Credit Cards.**
1. Can the offer bullets move below the term, fee and window, under their own heading ("Offers for new customers"), with the cashback condition kept inside that heading?
2. Is a one-line statement "You do not need a Barclays current account to apply for this card" acceptable in the card block?
3. The offers end 20 October 2026. Is the next promotion going into the same slot, and if so can it follow the new layout from day one?

**Decision.** Open.
