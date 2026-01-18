/**
 * Capture screenshots of each TaskML view for documentation
 */
import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import { join } from 'path';

const VIEWS = ['list', 'kanban', 'tree', 'timeline', 'table', 'graph', 'summary'];
const OUTPUT_DIR = join(__dirname, '../packages/playground/public/images/views');
const PLAYGROUND_URL = 'http://localhost:4444/playground';

async function captureScreenshots() {
  // Ensure output directory exists
  await mkdir(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1400, height: 800 },
    deviceScaleFactor: 2, // Retina quality
  });
  const page = await context.newPage();

  console.log('Navigating to playground...');
  await page.goto(PLAYGROUND_URL);
  await page.waitForTimeout(1000); // Wait for render

  for (const view of VIEWS) {
    console.log(`Capturing ${view} view...`);

    // Navigate to the view
    await page.goto(`${PLAYGROUND_URL}?view=${view}`);
    await page.waitForTimeout(500); // Wait for render

    // Capture full playground
    await page.screenshot({
      path: join(OUTPUT_DIR, `${view}-full.png`),
      type: 'png',
    });

    // Capture just the preview panel
    const previewPanel = page.locator('.taskml-preview, [class*="preview"]').first();
    try {
      await previewPanel.screenshot({
        path: join(OUTPUT_DIR, `${view}.png`),
        type: 'png',
      });
    } catch (e) {
      // If preview panel not found, use the right side of the page
      await page.screenshot({
        path: join(OUTPUT_DIR, `${view}.png`),
        type: 'png',
        clip: { x: 700, y: 50, width: 700, height: 650 },
      });
    }

    console.log(`  Saved ${view}.png`);
  }

  await browser.close();
  console.log('\nAll screenshots captured!');
  console.log(`Output directory: ${OUTPUT_DIR}`);
}

captureScreenshots().catch(console.error);
