const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1280, height: 800 }
  });
  
  const filePath = path.resolve('春天壁纸生成器.html');
  await page.goto('file://' + filePath);
  
  // Wait for initial render
  await page.waitForTimeout(1000);
  
  // Screenshot 1: Initial state
  await page.screenshot({ path: 'preview-1-初始界面.png' });
  console.log('Screenshot 1: Initial state saved');
  
  // Click "抽取句子" button
  await page.click('#quoteBtn');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'preview-2-抽取句子后.png' });
  console.log('Screenshot 2: After quote selected');
  
  // Type name
  await page.fill('#nameInput', '思儿');
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'preview-3-输入名字后.png' });
  console.log('Screenshot 3: After entering name');
  
  // Click print (will animate)
  await page.click('#printBtn');
  await page.waitForTimeout(1500); // Wait for animation
  await page.screenshot({ path: 'preview-4-打印完成.png' });
  console.log('Screenshot 4: After printing');
  
  await browser.close();
  console.log('All screenshots saved!');
})();
