const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');

const fileUnderTest = 'file://' + __dirname.replace(/ /g, '%20') + '/../dist/index.html';
const defaultTimeout = 10000;
let driver;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 60 * 5; // 5 minuter

// Det här körs innan vi kör testerna för att säkerställa att Firefox är igång
beforeAll(async () => {
console.log(fileUnderTest);
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get(fileUnderTest);
});

// Allra sist avslutar vi Firefox igen
afterAll(async() => {
    await driver.quit();
}, defaultTimeout);

test('The stack should be empty in the beginning', async () => {
	let stack = await driver.findElement(By.id('top_of_stack')).getText();
	expect(stack).toEqual("n/a");
});

describe('Clicking "Pusha till stacken"', () => {
	it('should open a prompt box', async () => {
		let push = await driver.findElement(By.id('push'));
		await push.click();
		let alert = await driver.switchTo().alert();
		await alert.sendKeys("Bananer");
		await alert.accept();
	});

	it('should display the data at the top of the stack',  async () => {
		let stack =  await driver.findElement(By.id('top_of_stack')).getText();
		expect(stack).toEqual("Bananer");
	})
});

describe('Clicking "Poppa stacken "', () => {
	it('should alert that the element has been removed from the stack', async () => {
		
		let pop = await driver.findElement(By.id('pop'));
		await pop.click();

		let alert = await driver.switchTo().alert();
		let alertText = await alert.getText()
		expect(alertText).toEqual("Tog bort Bananer");
		await alert.accept()
	})
})
describe('Clicking "Vad finns överst för stacken?"', () => {
	it('should show the element on top of the stack', async () => {
		let peek = await driver.findElement(By.id('peek'));
		await peek.click();

		let stack = await driver.findElement(By.id('top_of_stack')).getText();
		expect(stack).toEqual("undefined");
	})
})