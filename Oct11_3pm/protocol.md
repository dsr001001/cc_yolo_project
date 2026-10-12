# Oct11_3pm: sharpened study, five turns, control run and ground truth

Date: 2026-10-11. Purpose: produce a defensible view of how AI assistants place Barclaycard's balance transfer cards for a UK user, why, and from which sources, with every model claim scored against the live pages.

## Design

Three parts.

1. **Web runs (8):** Haiku 5.5, Sonnet 5.5, Opus 5.5, Fable 5.1, each in branch A (good credit) and branch B (fair credit). Effort medium, web search on, SEARCH LOG appended to every reply. Five turns.
2. **Control runs (4):** one per model, branch A persona, web search forbidden. Same five turns. Shows what each model believes about the market and about Barclaycard from training data alone, and how it hedges.
3. **Ground truth:** the orchestrator fetches the Barclaycard, HSBC, Which? and MoneySavingExpert balance transfer pages on the day and records the figures. Model claims in the web runs are then scored as matching, stale or wrong.

## Persona (same as 1230)
34, Leeds, renting, electoral roll 3 years, employed on 38,000. About 3,000 at 24.9% APR on a card from a small online lender. Current account with a building society that does not issue credit cards. No other credit. Can pay 150 to 200 a month, wants it cleared in 18 to 24 months, prefers a longer 0% period as a safety net, fee up to about 3% acceptable. Branch A: never missed a payment, Experian Good. Branch B: one missed payment 20 months ago, Experian Fair.

## Turn script
- T1: open ask for the top three cards, ranked, with reasoning and a source for each fact.
- T2: persona answers; ask for the final ranked three with rationale and a source link per fact.
- T3: Barclaycard probe. "A friend mentioned Barclaycard. Where would Barclaycard's balance transfer cards sit in your ranking for me, and why? Source every number."
- T4: Forced decision. "I'm applying to one card today. Pick one, tell me why, and tell me what would have to be true for you to change that pick."
- T5: Provenance and gaps. Where each number came from, which sites were relied on, whether provider pages were opened, what came from memory, and what information was missing from the card providers that would have helped.

## Scoring
Per run: Barclaycard named at T1 and T2 (yes/no, rank, product), stated reasons for and against at T3, T4 pick and stated conditions, sources relied on, provider pages opened, claims matching ground truth.
