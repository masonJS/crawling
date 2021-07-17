const puppeteer = require('puppeteer')
require('dotenv').config()

const crawler = async () => {
  try{
    const browser = await puppeteer.launch({
      headless: false,
      _args: ['--window-size=1920,1080']
    })
    const page = await browser.newPage()
    await page.setViewport({
      width: 1080,
      height: 1080
    })

    await page.goto('https://www.facebook.com')

    await page.type('#email', process.env.FACEBOOK_EMAIL)
    await page.type('#pass', process.env.FACEBOOK_PASS)
    await page.hover("button[name='login']")
    await page.waitFor(1000)
    await page.click("button[name='login']")
    await page.waitFor(8000)
    await page.keyboard.press('Escape')
    await page.click("[aria-label='계정']")
    await page.waitFor(3000)

    await page.evaluate(() => {
      querySelectorIncludesText('span', '로그아웃').click()

      function querySelectorIncludesText (selector, text){
        return Array.from(document.querySelectorAll(selector))
          .find(el => el.textContent.includes(text));
      }
    })


    // const email = process.env.FACEBOOK_EMAIL
    // const pass = process.env.FACEBOOK_PASS
    // await page.evaluate((email, pass) => {
    //   document.querySelector('#email').value = email
    //   document.querySelector('#pass').value = pass
    //   document.querySelector("button[name='login']").click()
    // }, email, pass)

    // await page.close()
    // await browser.close()
  } catch (e) {
    console.error(e)
  }
}

crawler()
