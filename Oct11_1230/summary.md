# Oct11_1230: three ranked options, rationale and per-fact sources

Full run, 2026-10-11. Four models (Haiku 5.5, Sonnet 5.5, Opus 5.5, Fable 5.1) at medium effort with web search, two credit branches (A good, B fair), three turns each. Every reply carries inline source links and a SEARCH LOG of queries run and URLs used. Turn 3 asked each model where every number came from. Raw replies are in transcripts/. Persona and script are in protocol.md.

Nothing here has been verified by me against live lender pages. This records what the models said and where they said it came from.

## 1. What was recommended

### Provisional top three at turn 1 (before the persona details)

| Run | 1st | 2nd | 3rd |
|---|---|---|---|
| Haiku A | Barclaycard 14m no fee | Barclaycard 36m 3.15% | Nationwide 30m 2.99% |
| Sonnet A | TSB 38m 3.49% | HSBC / NatWest / Virgin 36m ~3.1% | Barclaycard 12m no fee |
| Opus A | HSBC 36m 3.09% | Tesco Bank 20m 1.25% | Barclaycard 12m no fee |
| Fable A | Barclaycard 12m no fee | Tesco Bank 20m 1.25% | Barclaycard 36m 3.15% |
| Haiku B | TSB 38m 3.49% | HSBC 36m 3.09% | Nationwide 30m 2.99% |
| Sonnet B | HSBC 36m 3.09% | Vanquis Low APR 36m no fee | TSB 38m 3.49% |
| Opus B | HSBC 36m 3.09% | TSB 38m 3.49% | Barclaycard 12m no fee |
| Fable B | Barclaycard 36m 3.15% | TSB 38m 3.49% | Barclaycard 14m no fee |

### Final top three at turn 2 (after 150 to 200 a month, 18 to 24 month target, fee up to about 3%, no issuer relationship, credit per branch)

| Run | 1st | 2nd | 3rd |
|---|---|---|---|
| Haiku A | HSBC 36m 3.09% | Nationwide 30m 2.99% (needs membership) | Virgin Money 36m 3.1% |
| Sonnet A | HSBC or Virgin Money 36m ~3.1% | Barclaycard Platinum (figures conflict) | Lloyds Platinum 23m 2.99% |
| Opus A | HSBC 36m 3.09% | Virgin Money 24m 1.95% | Virgin Money 36m 3.1% |
| Fable A | Virgin Money 36m 3.1% | Virgin Money 24m 1.95% | HSBC 36m 3.09% |
| Haiku B | HSBC 36m 3.09% | NatWest up to 36m 3.10% | Barclaycard 36m 3.15% |
| Sonnet B | Tesco Bank 24m 2.75% | Lloyds Platinum 23m 2.99% | HSBC 36m 3.09% |
| Opus B | HSBC 36m 3.09% | Barclaycard 36m 3.15% | Santander Everyday Long Term 34m 3.15% |
| Fable B | Barclaycard 22m 1.49% | HSBC 36m 3.09% | Barclaycard 36m 3.15% (definite) |

Rank-1 tally at turn 2: HSBC 4, HSBC-or-Virgin 1, Virgin Money 1, Tesco Bank 1, Barclaycard 1.

Appearances in a final top three (runs out of 8): HSBC 8, Barclaycard 4, Virgin Money 4, Lloyds 2, Nationwide 1, NatWest 1, Tesco Bank 1, Santander 1. TSB appeared in every run's turn-1 discussion but in no final three: its 3.49% fee broke the 3% ceiling.

After the turn-3 provenance check, Haiku A dropped Nationwide and Sonnet A demoted Barclaycard and Lloyds to "unconfirmed". Both ended on HSBC first, Virgin Money second.

## 2. Where the information came from

### Domains used, by number of runs (out of 8) whose SEARCH LOG lists the domain

| Domain | Runs | Role |
|---|---|---|
| which.co.uk | 7 | Shortlist table in almost every run. Dated 30 July, 2 Sept or 1 Oct 2026 depending on the version the model saw. |
| moneysavingexpert.com | 6 | Shortlist and the "definite vs up to" framing. Opus and Fable read it directly (updated 7 Oct 2026). Haiku and Sonnet saw only snippets, one of them a 2017 page. |
| hsbc.co.uk | 6 | The only provider page that loaded for every model that tried it. Became the anchor for verified figures. |
| finder.com | 6 | Card reviews, some dated April 2025 and April 2026. |
| uk.virginmoney.com | 4 | Balance transfer product pages returned 404 in 3 runs; only the general cards page loaded, showing a 27.9% APR. |
| comparethemarket.com | 4 | Snippets only; never opened. |
| tsb.co.uk | 3 | Loaded; quoted for 38m, 3.49%, 90-day window, eligibility. |
| nationwide.co.uk | 3 | Press release and product page; quoted for membership requirement and 90-day fee window. |
| moneytothemasses.com | 3 | Two versions of the same page gave Barclaycard as 36m 3.45% and 35m 2.49%. Blocked one fetch. |
| moneysupermarket.com | 3 | Snippets; gave HSBC as 3.19%. |
| barclaycard.co.uk | 3 | Loaded for Fable (product, promo rates, eligibility checker pages); 404 for Opus B and Sonnet A, who fell back to barclays.co.uk or third parties. |
| getsmartsaver.co.uk | 3 | Haiku only. Low-authority aggregator. |
| clearscore.com, capitalone.co.uk | 2 each | ClearScore for Lloyds and NatWest ranges; Capital One site contradicted MSE's 36m claim. |
| santander.co.uk, tescobank.com, vanquis.com, lloydsbank.com, rbs.co.uk, ulsterbank.co.uk, barclays.co.uk | 1 each | Provider pages hit by single runs. Lloyds returned an error page. |
| kaeltripton.com, savingsgrove.com, goodmoneyguide.com, moneycomms.co.uk, gilt-edge.uk, pocketwise.co.uk, lovemoney.com, wise.com, forbes.com | 1 each | Long-tail aggregators and blogs, almost all surfaced by Haiku. |

Inline citations in the replies (count of links in text): MoneySavingExpert 65, Which? 46, HSBC 37, Finder 20, TSB 13, Barclaycard 13, Money to the Masses 11, Nationwide 9, Compare the Market 7.

### Search queries

52 queries across 24 turns. Every run opened with a variant of "best 0% balance transfer credit cards UK October 2026". Six of eight runs then searched for MoneySavingExpert by name ("Martin Lewis" in one). Later queries were product-specific: brand, months, fee, "representative APR", "transfer within 60 days". The full query list is in the transcripts.

### How each model actually read sources (from the turn-3 provenance replies)

| Run | Opened pages in turns 1 and 2? | Relied on most | Provider pages checked for its final three |
|---|---|---|---|
| Haiku A | No, snippets only. Opened HSBC and Nationwide at turn 3 and corrected itself. | Kaeltripton, Money to the Masses, MSE snippets | HSBC only (at turn 3) |
| Haiku B | No, snippets only, including the Vanquis page. | Which?, Compare the Market, ClearScore | None |
| Sonnet A | No, snippets only. Fetched Which? and HSBC at turn 3; Barclaycard, Virgin and Lloyds pages failed. | Which?, Money to the Masses | HSBC only (at turn 3) |
| Sonnet B | No, snippets only. | Which? table | None (Tesco via snippet only) |
| Opus A | Yes, four pages via a summarising fetch tool. Virgin and Capital One pages 404. | MSE | HSBC only |
| Opus B | Yes, provider pages for all three picks plus Capital One and TSB. barclaycard.co.uk 404, used barclays.co.uk. | Provider pages, Which? for shortlist | HSBC, Barclays, Santander |
| Fable A | Yes, MSE twice, Which?, Barclaycard, HSBC, Virgin general page, Capital One home. Virgin BT pages 404. | MSE | HSBC, Barclaycard (Virgin partial) |
| Fable B | No, worked from search excerpts only, though those excerpts included provider pages. | MSE, Which?, provider excerpts | Barclaycard, HSBC, TSB, Virgin as excerpts |

Pattern: Haiku and Sonnet answered two full turns from search snippets without opening a page. Opus and Fable fetched pages, but their fetch tool returns a summary rather than the raw page, and both said so. Every model admitted the arithmetic and the general advice (direct debit, one application, no spending) came from itself, and Fable B and Opus B each admitted attributing a general-knowledge claim to a page.

## 3. Conflicts between sources that the models surfaced

| Fact | Comparison site value | Provider page value | Who noticed |
|---|---|---|---|
| HSBC APR after deal | 24.9% (MSE, Which?) | 25.9% (hsbc.co.uk) | Opus A and B, Fable A and B, Haiku A, Sonnet A |
| HSBC fee | 3.19% (MoneySuperMarket, older HSBC summary box PDF) | 3.09% (hsbc.co.uk) | Sonnet B, Haiku A and B, Fable B, Opus B |
| HSBC term | "definite 36 months" (MSE) | "up to 36 months", possible 14m at 29.9% (hsbc.co.uk) | Opus A, Fable A and B, Sonnet A, Haiku A |
| Virgin Money APR | 24.9% (MSE, Which?) | 27.9% on the general cards page (uk.virginmoney.com) | Fable A, Opus B |
| Barclaycard 36m fee | 3.15% (MSE, Kaeltripton), 3.45% and 2.49% (two Money to the Masses versions) | 3.15% (barclays.co.uk, barclaycard.co.uk) | Haiku A, Sonnet A, Opus B |
| Lloyds | 23m 2.99% (ClearScore, Money to the Masses), 33m 2.49% (older ClearScore), 35m (Haiku 12pm) | Page unavailable | Sonnet A and B |
| Vanquis Low APR | 36m at 0%, no fee (Which?) | 9.9% or 12.9%, not 0% (vanquis.com) | Haiku B (and Haiku A at 12pm) |
| Santander Everyday Long Term | 26m 3% (snippet) | 34m 3.15% (santander.co.uk) | Opus B |
| Capital One | up to 36m 2.9%, 28.9% after (MSE) | 18m 3% at 34.9% only (capitalone.co.uk) | Fable A, Opus B |
| Nationwide | 30m 2.99% | Confirmed, plus membership, 5,000 income, 90-day fee window | Haiku A, Sonnet A |

## 4. What this suggests for a card issuer in the AI search era

- **Which? and MoneySavingExpert are the shortlist.** Every run's candidate set came from one or both. If a product is not in those tables with current figures, it does not enter the conversation. MSE's "definite" label was repeated as a selling point in five runs.
- **A reachable, stable product page decides who gets verified.** HSBC's page loaded for every model that tried. Barclaycard, Virgin Money, Capital One and Lloyds pages returned 404 or errors in several runs. When that happened the model either fell back to third-party figures or demoted the card to "unconfirmed". HSBC ended first in six of eight runs partly because it was the only brand the models could check.
- **Models quote summary-box facts verbatim when they find them.** Minimum income, transfer window, same-group exclusions, "up to" wording and backup rates from HSBC, Santander and TSB pages were all repeated to the user. Issuers that publish those clearly get them stated accurately; those that do not get "I found no eligibility rules".
- **Stale artefacts create contradictions.** An older HSBC summary-box PDF (3.19%, 24.9%) and two cached versions of a Money to the Masses page produced three different Barclaycard fees. Models flagged the conflicts and told the user to distrust the card. Removing or redirecting outdated PDFs and pages matters.
- **Press releases are picked up directly.** Nationwide's January 2026 launch release was cited in three runs as a primary source.
- **Long-tail aggregators feed the smaller model.** Haiku cited Kaeltripton, GetSmartSaver, SavingsGrove, Good Money Guide, MoneyComms and GiltEdge. Their figures were sometimes wrong (Vanquis at 0%, TSB at "about 3%"). Monitoring what these sites say about a product is cheap and worthwhile.
- **The fee ceiling is a hard filter.** A 3.49% fee removed TSB from every final three despite the longest term. Fees at 3.09% to 3.15% were accepted as "about 3%". Fee positioning relative to round numbers matters for inclusion.
- **Eligibility for fair credit is a gap.** Seven of eight runs said they found no source on how a Fair-band applicant would fare with a specific card. An issuer that publishes clear acceptance guidance or a soft-search checker gets named as the safer route (Barclaycard's checker and HSBC's backup-rate disclosure were both cited that way).

## 5. Compared with the 12pm run

Asking for three options and per-fact sources changed behaviour: models searched more (52 queries versus roughly 30), opened provider pages more often, surfaced ten factual conflicts, and corrected themselves at turn 3. HSBC's dominance increased (first in 4 of 8 versus 3 of 8). Lloyds, Nationwide and Virgin Money's 24-month card gained visibility; Vanquis lost it once a provider page contradicted Which?.
