const puppeteer = require('puppeteer')

const crawler = async () => {
  try{
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto('https://github.com/masonJS')
    await page.close()
    await browser.close()
  } catch (e) {
    console.error(e)
  }
}

crawler()
