const axios = require('axios');
const cheerio = require('cheerio'); // html 파싱
const xlsx = require('xlsx');
const add_to_sheet = require('./add_to_sheet');
const workbook = xlsx.readFile('xlsx/data.xlsx');

const sheets = workbook.SheetNames;

const crawler = async (ws, records) => {
  add_to_sheet(ws, 'C1', 's', '평점')
  await Promise.all(records.map(async (r, i) => {
    const response = await axios.get(r.B)
    if(response.status === 200){
      const html = response.data;
      const $ = cheerio.load(html)
      const text = $('.score.score_left .star_score').text();
      console.log(r.A, '평점', text.trim())
      const newCell = 'C' + (i + 2);
      add_to_sheet(ws, newCell, 'n', parseFloat(text.trim()))
    }
  }))
  xlsx.writeFile(workbook, 'xlsx/result.xlsx')
}

for(let sheet of sheets){
  const ws = workbook.Sheets[sheet];
  // xlsx 범위 조절 - 최상단 헤더 부분 제외
  ws['!ref'] = ws['!ref'].split(':').map((v, i) => (i === 0) ? 'A2' : v).join(':')
  const records = xlsx.utils.sheet_to_json(ws, { header: 'A'});
  crawler(ws, records)
}





