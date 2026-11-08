const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, ignoreHTTPSErrors: true,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36' });
  const page = await ctx.newPage();
  await page.goto('https://www.barclaycard.co.uk/personal/credit-cards/mid-bt-platinum', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(4000);
  for (const sel of ['button:has-text("Accept all")','#onetrust-accept-btn-handler','button:has-text("Accept")']) {
    try { const b = page.locator(sel).first(); if (await b.isVisible({timeout:800})) { await b.click({timeout:2000}); await page.waitForTimeout(1000); break; } } catch(e) {}
  }
  const hdr = page.locator('text=/Why is it .up to. 22 months/').first();
  await hdr.scrollIntoViewIfNeeded(); await hdr.click(); await page.waitForTimeout(1500);
  const txt = page.locator('text=/7 out of 10/').first();
  const found = await txt.count();
  console.log('found 7 out of 10:', found);
  if (found) { console.log(await txt.textContent()); }
  const section = page.locator('text=Important things you need to know').first();
  const box = await section.boundingBox();
  await page.screenshot({ path: 'shots/bc_22m_accordion.png', fullPage: true });
  const b2 = await txt.boundingBox(); console.log('box', JSON.stringify(box), JSON.stringify(b2));
  // Also find terms link href and the 28.9 text
  const links = await page.locator('a').evaluateAll(as => as.map(a => a.href).filter(h => /pdf/i.test(h)));
  console.log('pdf links', JSON.stringify([...new Set(links)]));
  await browser.close();
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
