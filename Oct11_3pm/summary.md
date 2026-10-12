# Oct11_3pm: five-turn study with control runs and ground truth

Run on 11 October 2026. Eight web runs (Haiku 5.5, Sonnet 5.5, Opus 5.5, Fable 5.1, each in good-credit branch A and fair-credit branch B), four no-web control runs (one per model, branch A persona), five turns each, 60 turns in total. Ground truth for the Barclaycard, Barclays, HSBC, MSE and Which? pages was fetched by the orchestrator the same afternoon and is in ground_truth.md. Raw replies with search logs are in transcripts/ and control/.

## 1. What the models recommended

### Final top three at turn 2 (after the persona details, before Barclaycard was mentioned)

| Run | 1st | 2nd | 3rd | Barclaycard in top three? |
|---|---|---|---|---|
| Haiku A | HSBC 36m 3.09% | Virgin Money 36m 3.1% | TSB 38m 3.49% | No |
| Sonnet A | Virgin Money 35m 2.45% (Moneyfacts, July data) | Halifax 35m 2.49% | HSBC 36m 3.09% | No |
| Opus A | HSBC 36m 3.09% | Virgin Money 24m 1.95% | Capital One up to 36m 2.9% | No |
| Fable A | Virgin Money 24m 1.95% | HSBC 36m 3.09% | Barclaycard 22m 1.49% | Yes, 3rd |
| Haiku B | Tesco Low Fee 20m 1.25% | Tesco 35m 3.15% | HSBC 36m 3.09% | No |
| Sonnet B | Virgin Money 36m 3.1% | HSBC 36m 3.09% | Tesco 35m 3.15% | No |
| Opus B | HSBC 36m 3.09% | Nationwide 30m 2.99% | Virgin Money 36m (fee unconfirmed) | No |
| Fable B | Virgin Money 24m 1.95% | Capital One up to 36m 2.9% | Tesco Low Fee 20m 1.25% | No |

Unprompted, Barclaycard made one final top three out of eight.

### Turn 3: where Barclaycard landed once the user mentioned it

| Run | Placement given | Product | Reason given |
|---|---|---|---|
| Haiku A | 2nd, behind HSBC | 36m 3.15% | Fits brief, fee only 0.15 over ceiling. Read barclays.co.uk, so never saw the 22m card. |
| Sonnet A | 4th and 5th, outside top three | 36m and 22m | HSBC cheaper by a few pounds; Virgin and Halifax cheaper for similar length (Moneyfacts July figures); 22m leaves one month of slack |
| Opus A | 3rd, only if pre-approved for full 36 | 36m 3.15% | HSBC "definite" per MSE; Barclaycard "up to 36, 32 or 18" per MSE |
| Fable A | 3rd (22m), 4th (36m) | 22m 1.49% | Cheapest fee, but "up to"; would be joint first if the checker pre-approves 22 months |
| Haiku B | 2nd (22m); 36m level with HSBC | 22m 1.49% | Cheapest option over 20 months; not guaranteed unlike Tesco |
| Sonnet B | 2nd (22m); 36m "not available to you" | 22m 1.49% | Misread the cashback condition as a card eligibility rule: "requires a Barclays personal current account" |
| Opus B | Joint 1st with HSBC | 36m 3.15% | Same term, 2 pounds more fee, lower APR after the deal (24.9 vs 25.9) |
| Fable B | Joint 2nd if pre-approved; 22m 4th | 36m 3.15% | Pre-approval guarantees 36; without it the 18-month floor is "the worst value on the list" for a Fair applicant |

Prompted, Barclaycard entered the top three in seven of eight runs.

### Turn 4: the single card each model told the user to apply for, and the stated switch condition

| Run | Pick | First named switch |
|---|---|---|
| Haiku A | HSBC 36m | Barclaycard 36m if HSBC's income or residency rules fail |
| Sonnet A | Virgin Money 35m 2.45% | Halifax 35m, then HSBC |
| Opus A | HSBC 36m | Barclaycard 36m if pre-approved and HSBC fails; Virgin 24m |
| Fable A | Virgin Money 24m 1.95% | HSBC; Barclaycard 22m if pre-approved; Nationwide if willing to open an account |
| Haiku B | Tesco Low Fee 20m | Barclaycard 22m if Tesco declines |
| Sonnet B | Virgin Money 36m 3.1% | Barclaycard 22m if offered under 24 months or if lowest fee preferred; HSBC |
| Opus B | HSBC 36m | Barclaycard 36m if HSBC offers under 24 months or better odds; Barclaycard 22m if confident of 150 a month |
| Fable B | Virgin Money 24m 1.95% | Capital One if 30+ months; Barclaycard 36m if pre-approved; Tesco |

Picks: Virgin Money 4, HSBC 3, Tesco Bank 1, Barclaycard 0. Barclaycard was the first or second named fallback in seven of eight.

### Control runs (no web access, branch A persona)

| Model | Turn 2 top three from memory | Turn 3 Barclaycard placement | Turn 4 pick | Barclaycard facts recalled |
|---|---|---|---|---|
| Haiku | Barclaycard; MBNA; Santander or Virgin | Top candidate, conditional on a 21+ month live offer | Barclaycard, conditional | 18 to 30 months, about 3% fee, low confidence |
| Sonnet | MBNA; Barclaycard; Virgin, Tesco or Sainsbury's | 2nd, behind MBNA | MBNA, conditional | 20 to 29 months, 0 to 3.5% fee, 25% confidence on exact figures |
| Opus | Santander Everyday Long Term; Lloyds or Halifax; Barclaycard or Virgin | 3rd, "possibly 1st" if a sub-3% version exists | Santander | 27 to 30 months (possibly 33), 3.45% fee, 24.9% APR, 60 days |
| Fable | Tesco; HSBC; NatWest or RBS | Mid-length variant 1st if it exists; long variant below the cap | Tesco | Long: 31 to 33 months at 3.45%. Mid: 24 to 27 months at 1.5 to 2.5%. Short: 14 to 20 months at 0 to 1% |

With no retrieval, Barclaycard appears in every model's shortlist and is the pick or the conditional pick for two of four. The remembered figures are stale: the long card is 36 months at 3.15%, not 31 to 33 at 3.45% (3.45% is the fee on the 24 and 21 month combined cards). Fable's recalled mid-length tier is close to the real 22 month 1.49% card. MBNA, which Sonnet and Haiku rank first or second from memory, appears in no web run's top three; MSE lists it at up to 36 months and 3.29%.

## 2. Accuracy of what the models said, scored against ground_truth.md

| Claim | Ground truth | Runs that stated it | Correct? |
|---|---|---|---|
| Barclaycard 36m, 3.15%, 24.9%, 60 days, "up to" | barclaycard.co.uk, barclays.co.uk | all 8 web runs | Correct in all 8 |
| Barclaycard 22m, 1.49%, 24.9%, 60 days | barclaycard.co.uk only | 7 of 8 (not Haiku A, which read barclays.co.uk) | Correct in all 7 |
| Barclaycard 24m and 21m at 3.45% | both pages | 6 of 8 | Correct |
| Barclaycard 12m no fee, "pre-approved get 12, else 12 or 6" | barclaycard.co.uk; MSE | 8 of 8 | Correct |
| "36, 32 or 18" tiers for the 36m card | MSE only, not on Barclaycard's page | Opus A, Opus B, Fable A, Fable B, Haiku B | Faithful to MSE; unverifiable against Barclaycard |
| 36m card "requires a Barclays personal current account" | False. Only the 20 pound cashback requires it | Sonnet B | Wrong, and it excluded the card on that basis |
| 36m fee 3.45% | False for the 36m card (Money to the Masses, May 2026) | Opus B, Opus control, Fable control | Opus B flagged the conflict and used 3.15% |
| HSBC 3.09%, 25.9% APR, 60 days, income 6,800 | hsbc.co.uk | 6 runs opened the page | Correct; all noted MSE and Which? say 24.9% |
| HSBC "definite 36 months" | MSE's label; HSBC's page says "up to" with a 14-month outcome | Opus A, Fable A, Fable B, Opus B (as caveat) | Opus A and Fable A corrected themselves at turn 5 |
| Virgin Money 24m 1.95% "definite" | MSE table | Opus A, Fable A, Fable B picked or ranked it | Not on Virgin's site; three runs could not open a product page |
| Virgin Money 35m 2.45% | Moneyfacts chart dated 3 July 2026 and Finder (April 2026) | Sonnet A picked it | Not in the October MSE or Which? tables; likely stale. Not verified |
| Vanquis Low APR 36m 0% fee | Which? table | Haiku A, Sonnet B at turn 1 | Contradicted by Vanquis's page (Haiku A: 24m, 4.5%); MSE lists up to 24m at 3.9% |
| Tesco Low Fee 20m 1.25% guaranteed | MSE; Tesco page opened by Haiku B and Fable B | 5 runs | Correct per those pages |
| Capital One up to 36m 2.9% | MSE | Opus A, Fable B ranked it | Capital One's own page could not be opened by any run; Fable A saw only an 18m 3% card on its homepage |

Models corrected themselves at turn 5 in five runs (Haiku A on Vanquis, Opus A on "definite" and on a mis-attributed MSE claim, Sonnet B on an unverified HSBC end date, Fable A on a mis-attributed MSE claim, Opus B on "most providers use soft searches").

## 3. Where the information came from

Domains used by number of web runs (out of 8): Which? 7, barclaycard.co.uk 7, Virgin Money 5, Nationwide 5, HSBC 5, Finder 5, Tesco Bank 4, MoneySavingExpert 4, Money to the Masses 3, TSB 2, and one each for Vanquis, Uswitch, Santander, Moneyfacts, money.co.uk, lovemoney and barclays.co.uk.

Patterns that held across all three studies today and sharpened here:

- **Sonnet never reached MoneySavingExpert in either branch.** Both Sonnet runs said they could not find MSE's ranking and built their shortlists from Which?, then Moneyfacts and money.co.uk. Sonnet A's final pick came from a Moneyfacts chart dated 3 July 2026. Opus and Fable opened MSE in every run and treated its "definite" versus "up to" labels as decisive.
- **Provider pages now get opened, but through a summariser.** Every model that opened a page said it saw a summary, not the raw page. Five runs still worked partly from search snippets.
- **Page failures were common.** Virgin Money product pages returned 404 in four runs. Capital One's page failed in three. Lloyds' site errored in two. Barclaycard product-level pages (the 36m and 12m card pages, and the bare balance-transfer path) returned 404 in three runs; the main listing page loaded in six, and Opus A used a search page as its source.
- **The 22 month 1.49% card was found only by models that opened barclaycard.co.uk.** It is absent from MSE, Which? and barclays.co.uk. Haiku A, which read barclays.co.uk, never knew it existed.
- **Every run said the same information was missing from provider pages:** eligibility criteria (age, income, residency), how "up to" terms are decided and who gets what, the typical credit limit, whether the checker is a soft search, the rate after the deal on balance transfers, the fee for late transfers, and a "last updated" date.

## 4. Why Barclaycard lost unprompted and recovered when prompted

Unprompted, the shortlist came from Which? (which lists only the 12 month no-fee card) and MSE (which labels the 36 month card "up to 36, 32 or 18" against HSBC's "definite 36" and Virgin's "definite 24"). On those two framings Barclaycard looks either too short or uncertain, and its 3.15% fee sits 2 pounds above HSBC's on 3,000. The 22 month card, which fits this persona's plan better than any other Barclaycard product, is not in either table.

Prompted, seven of eight runs opened Barclaycard's page, found the 22 month card and the 36 month card, and placed one of them in the top three. The forced pick still went elsewhere in every run, for three reasons that repeat across transcripts: the "up to" uncertainty for a one-shot application, the 2 pound fee gap to HSBC, and the lack of eligibility detail compared with HSBC's page. In the one run where Barclaycard reached joint first (Opus B), the model had the lower post-deal APR to weigh and had read the page itself.

The controls show the prior is strong: with no retrieval, every model names Barclaycard among the leaders. Retrieval does not add negative information about Barclaycard; it adds positive, labelled information about competitors that Barclaycard's own presence in the sources does not match.

## 5. Compared with the 1230 run

Opening provider pages rose (barclaycard.co.uk in 7 of 8 versus 3 of 8). The direct probe showed prompted recall is high. Forced picks consolidated on Virgin Money's 24 month card and HSBC. Sonnet A's reliance on a July Moneyfacts chart produced the one pick in the study that does not match any October source.
