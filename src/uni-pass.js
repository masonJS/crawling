const uniPass = require('puppeteer');
require('dotenv').config()
const crawler = async () => {
  try{
    const browser = await uniPass.launch({
      headless: false,
      executablePath: process.env.CHROME_EXE_PATH
    });
    const page = await browser.newPage();

    await page.setUserAgent(process.env.CHROME_USER_AGENT)

    page.on('dialog', async (dialog) => {
      // console.log(dialog.type(), dialog.message())
      if(dialog.message() === '실명인증에 성공하였습니다.')
        await dialog.accept()
      if(dialog.message() === '발급 된 개인통관고유부호가 존재합니다. 조회하시겠습니까?')
        await dialog.accept()
    })
    await page.goto('https://unipass.customs.go.kr/csp/persIndex.do')

    await page.click('#newIssBtn');

    // await page.evaluate(() => {
    //   document.querySelector('#clphType').click();
    //   document.querySelector('#MYC1104002Q_fnm').value = '이민우';
    //   document.querySelector('#MYC1104002Q_rrnoFrdg').value = 940526;
    //   document.querySelector('#MYC1104002Q_rrnoBcdg').value = 1261811;
    //   document.querySelector('#MYC1104002Q_search').click()
    // })

    await page.close();
    await browser.close();
  } catch (e) {
    console.log(e)
  }

}

crawler()
