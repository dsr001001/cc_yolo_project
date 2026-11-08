const { chromium } = require('playwright');
(async () => {
  const [url, out, fullPage] = process.argv.slice(2);
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--ignore-certificate-errors'] });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, ignoreHTTPSErrors: true,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36' });
  const page = await ctx.newPage();
  const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  console.log('status', resp && resp.status());
  await page.waitForTimeout(4000);
  // dismiss cookie banners heuristically
  for (const sel of ['button:has-text("Accept all")','button:has-text("Accept All")','button:has-text("Accept all cookies")','button:has-text("Accept")','#onetrust-accept-btn-handler','button:has-text("I agree")','button:has-text("Yes, I accept")']) {
    try { const b = page.locator(sel).first(); if (await b.isVisible({timeout:800})) { await b.click({timeout:2000}); await page.waitForTimeout(1000); break; } } catch(e) {}
  }
  await page.screenshot({ path: out, fullPage: fullPage === 'full' });
  const title = await page.title(); console.log('title', title);
  await browser.close();
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
