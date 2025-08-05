require('dotenv').config();
const { chromium } = require('playwright');
const fs = require('fs');

const VIN = process.env.VIN;

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto('https://app.velocityautomotive.com/windowsticker', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    await page.fill('input[type="email"], input[type="text"]', process.env.VELOCITY_USER);
    await page.fill('input[type="password"]', process.env.VELOCITY_PASS);
    await page.click('button:has-text("Log In"), button:has-text("Sign In")');
    await page.waitForTimeout(5000);

    await page.fill('input[placeholder*="VIN"], input[id*="vin"], input[name*="vin"]', VIN);
    const [newPage] = await Promise.all([
      context.waitForEvent('page', { timeout: 5000 }),
      page.click('button:has-text("Submit")', { force: true })
    ]).catch(() => [null]);

    const activePage = newPage || page;
    await activePage.waitForTimeout(5000);

    const screenshotPath = `./stickers/window_sticker_${VIN}.png`;
    await activePage.screenshot({ path: screenshotPath, fullPage: true });

    console.log(`✅ Screenshot saved: ${screenshotPath}`);
  } catch (err) {
    console.error(`❌ Failed to capture window sticker for VIN ${VIN}:`, err);
  } finally {
    await browser.close();
  }
})();