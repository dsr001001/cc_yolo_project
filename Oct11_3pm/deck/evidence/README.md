# Evidence captures for the Barclaycard AI search deck

All captures taken 11 October 2026 between 11:30 and 11:40 UTC with headless Chromium (Playwright), 1280 x 900 viewport, desktop user agent, cookie banners dismissed where a button was found. P files are unaltered full-page captures. E files are crops of the P files with a blue rectangle drawn around the passage the deck cites; nothing else is edited. sizes.json holds pixel dimensions for the deck generator.

| File | URL | HTTP status | Deck slide |
|---|---|---|---|
| P1_barclaycard_bt_listing_full.jpg | https://www.barclaycard.co.uk/personal/credit-cards/balance-transfer-credit-cards | 200 | 9, 13, 14 |
| E1_bc36_offers_above_terms.jpg | crop of P1: 36 month card block | | 14 |
| E1b_bc36_if_you_apply_box.jpg | crop of P1: "If you apply" box | | 13 |
| E2_bc22_card_on_barclaycard_site.jpg | crop of P1: 22 month card block | | (reference) |
| P2_barclaycard_22m_page_full.jpg | https://www.barclaycard.co.uk/personal/credit-cards/mid-bt-platinum (accordion "Why is it 'up to' 22 months?" clicked open before capture) | 200 | 11, 15 |
| E5_bc22_seven_in_ten.jpg | crop of P2: expanded accordion | | 11 |
| E6_bc22_289_apr_in_benefits.jpg | crop of P2: benefits section | | 15 |
| P3_barclays_bt_listing_full.jpg | https://www.barclays.co.uk/credit-cards/balance-transfer-credit-cards/ | 200 | 9, 15 |
| E3_barclays_listing_four_cards.jpg | crop of P3: the four card blocks | | 9 |
| E3b_barclays_broken_image.jpg | crop of P3: 24 month card block with alt text | | 15 |
| E4_barclays_289_apr_line.jpg | crop of P3: benefits section | | (reference) |
| P4_hsbc_bt_page_full.jpg | https://www.hsbc.co.uk/credit-cards/products/balance-transfer/ | 200 | 11, 13 |
| E7_hsbc_eligibility_and_subject_to_status.jpg | crop of P4 | | 13 |
| E7b_hsbc_subject_to_status.jpg | crop of P4 | | 11 |
| P5_mse_bt_guide_full.jpg | https://www.moneysavingexpert.com/credit-cards/balance-transfer-credit-cards/ (page states "Updated 7 October 2026") | 200 | 9, 10 |
| E8_mse_definite_block.jpg | crop of P5 | | 10 |
| E9_mse_upto_barclaycard_row.jpg | crop of P5 | | 10 |
| E10_mse_nofee_lowfee_block.jpg | crop of P5 | | 9 |
| P6_which_bt_guide_full.jpg | https://www.which.co.uk/money/credit-cards-and-loans/credit-cards/guides/best-credit-card-deals/best-0-balance-transfer-credit-cards (tables "correct as of 1 October 2026") | 200 | 9 |
| E11_which_longest_table.jpg | crop of P6 | | (reference) |
| E12_which_bestbuy_table.jpg | crop of P6 | | 9 |
| P7_barclaycard_404_balance-transfer.jpg | https://www.barclaycard.co.uk/personal/credit-cards/balance-transfer | 404 | 15 |
| P8_barclaycard_404_36-month.jpg | https://www.barclaycard.co.uk/personal/credit-cards/balance-transfer-credit-cards/36-month | 404 | 15 |

The T&C link on the 22 month page resolved to https://www.barclaycard.co.uk/content/dam/barclaycard/documents/personal/existing-customers/terms-and-conditions-barclaycard-core-2023.pdf at capture time.

## Added 11 October 2026, afternoon: competitor eligibility sections

Captured with the same method after the Head of Credit Cards review raised whether any issuer publishes income criteria. Each is the eligibility block of the issuer's live balance-transfer or credit-card page.

| File | URL | What it shows |
|---|---|---|
| X_elig_santander.jpg | santander.co.uk/personal/credit-cards/everyday-credit-card | Aged 18+, permanent UK resident, income of £10,500 or more a year, no bankruptcy, CCJ or IVA in 6 years |
| X_elig_nationwide.jpg | nationwide.co.uk/credit-cards/balance-transfer-credit-card/ | Aged 18+, UK resident, earn £5,000 or more a year before tax, Nationwide member |
| X_elig_tsb.jpg | tsb.co.uk/credit-cards/balance-transfers | Over 18, UK resident, regular income, no recent CCJs, defaults or bankruptcies |
| X_elig_mbna.jpg | mbna.co.uk/credit-cards/balance-transfer-credit-cards.html | UK resident 18+, regular income, no bankruptcy, IVA or CCJs, not declined by MBNA in 30 days |
| X_elig_lloyds.jpg | lloydsbank.com/credit-cards.html | UK resident, 18+, regular income, no bankruptcies, CCJs or IVAs |
| (text only) NatWest | natwest.com/credit-cards/balance-transfer-credit-card.html | "be a UK resident, aged 18+ and earn 10k+ each year", not bankrupt in the last 6 years |
| (text only) Virgin Money, Tesco Bank, Sainsbury's | balance-transfer pages | UK residents aged 18 or over, subject to status; no income figure |
| (text only) Barclaycard listing and 22 month page | barclaycard.co.uk | No age, residency or income criterion on the listing page; the 22 month page says 18 or over for the checker and lists the documents needed, with no threshold |
