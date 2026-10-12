# UK balance transfer recommendation study: protocol

Date: 2026-10-11

## Models
Haiku 5.5, Sonnet 5.5, Opus 5.5, Fable 5.1. Effort: medium on all. Web search available and models told to use it.

## Branches (differ only in credit standing, revealed at turn 2)
- Branch A (good credit): no missed payments ever, Experian band "Good", on electoral roll.
- Branch B (fair credit): one missed payment about 20 months ago, Experian band "Fair", otherwise clean, on electoral roll.

## Persona fact sheet (shared)
- 34, lives in Leeds, England. Renting. On the electoral roll at current address for 3 years.
- Full-time employed, salary 38,000 GBP.
- Debt: about 3,000 GBP on a Barclaycard Platinum, 24.9% APR representative. Paying a bit above the minimum.
- Can afford 150 to 200 GBP a month. Wants it cleared in roughly 18 to 24 months.
- Banks with Lloyds (current account). No other credit cards. No loans. No overdraft.
- Prefers the longest 0% period but is fine with a transfer fee up to about 3%.
- Not keen on a loan unless strongly recommended.
- Has not used an eligibility checker yet.
- Cannot transfer to Barclaycard (that is where the debt is).

## Turn script
- Turn 1 (identical): opening message asking which card to go for.
- Turn 2: answer any questions from the fact sheet. If credit standing not asked, volunteer it per branch. If no questions were asked, ask for a top pick and runner-up with reasons, and volunteer credit standing per branch.
- Turn 3: "If I get declined for that one, what is my next best option, and is there anything that could trip me up?"

## Recorded per run
Model, branch, turn, questions asked, products and brands named (in order), top pick, reasons, caveats, whether web search was used.
