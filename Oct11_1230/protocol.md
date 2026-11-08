# Oct11_1230: UK balance transfer study, three ranked options with rationale and per-fact sources

Date: 2026-10-11. Purpose: understand which brands and products AI assistants recommend for a UK balance transfer and, above all, where each piece of information is picked from.

## Models
Haiku 5.5, Sonnet 5.5, Opus 5.5, Fable 5.1. Effort medium. Web search available and models told to use it.

## Changes from the 12pm run
- The user asks for three ranked options, not one.
- The model is asked to explain its rationale and to give a source (link) for every fact: 0% length, fee, APR after the deal, eligibility rules, deadlines.
- Turn 3 asks the model where each number came from, which sites it searched, which it relied on most, and whether it checked the providers' own pages.
- Each agent appends a SEARCH LOG after its chat reply: every query it ran and every URL whose content it used, in order. This is captured verbatim in the transcripts.

## Branches (differ only in credit standing, revealed at turn 2)
- Branch A (good credit): no missed payments ever, Experian band "Good", on electoral roll.
- Branch B (fair credit): one missed payment about 20 months ago, Experian band "Fair", otherwise clean, on electoral roll.

## Persona fact sheet (shared, same as 12pm)
- 34, Leeds, renting, on the electoral roll 3 years. Full-time employed, 38,000 GBP.
- About 3,000 GBP at 24.9% APR on a card from a small online lender, not a high-street bank.
- Current account with a building society that does not issue credit cards. No other cards, loans or overdraft.
- Can afford 150 to 200 GBP a month. Wants it cleared in 18 to 24 months.
- Prefers the longest 0% period, fine with a fee up to about 3%. Not keen on a loan.
- No eligibility checker used yet. No relationship with any major card issuer.

## Turn script
- Turn 1: opening message asking for the top three 0% balance transfer cards, with reasons and a source for each fact.
- Turn 2: answer questions from the fact sheet, volunteer credit standing per branch, and ask again for the final ranked three with rationale and a source link per fact.
- Turn 3: "Where exactly did each number come from? Which sites did you search, which did you rely on most, and did you check the providers' own pages?"
