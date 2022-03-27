const {chromium} = require('playwright-chromium');
const {expect} = require('chai');

describe('Tests', async function () {
    this.timeout(60000);

    let page, browser;

    before(async () => {
        browser = await chromium.launch();
    });

    after(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        page = await browser.newPage();
    });

    afterEach(async () => {
        await page.close();
    });
    it('loads and displays all messages', async () => {
        await page.goto('http://localhost:5500');
        await Promise.all([
            page.click('text=Refresh'),
            page.waitForRequest('**/jsonstore/messenger')
        ]);
        const content = await page.$eval('textarea[id="messages"]', (m) => m.value);
        expect(content).to.contains(`Spami: Hello, are you there?`);
        expect(content).to.contains(`Garry: Yep, whats up :?`);
        expect(content).to.contains(`Spami: How are you? Long time no see? :)`);
        expect(content).to.contains(`George: Hello, guys! :))`);
        expect(content).to.contains(`Spami: Hello, George nice to see you! :)))`);

    });
    it('can send message', async () => {
        await page.goto('http://localhost:5500');
        await page.fill('#author', 'Author');
        await page.fill('#content', 'Content');
        await page.click('text=Send');
        await page.click('text=Refresh');
        const content = await page.$eval('textarea[id="messages"]', (m) => m.value);
        expect(content).to.contains('Author: Content');
        
    });
});