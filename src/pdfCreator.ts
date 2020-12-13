import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import puppeteer from 'puppeteer';

export default class PdfCreator {
  static async createPdf(datas: string[]): Promise<void> {
    const templates = datas.map((data) => {
      const templateHtml = fs.readFileSync(
        path.join(__dirname, 'template', 'template.html'),
        'utf8'
      );
      const template = handlebars.compile(templateHtml);
      return template({ data });
    });

    const groupedTemplates = templates.join('');

    const date = new Date();
    const milis = date.getTime();

    const pdfPath = path.join('pdf', `test-${milis}.pdf`);

    const options = {
      width: '1230px',
      headerTemplate: '<p></p>',
      footerTemplate: '<p></p>',
      displayHeaderFooter: false,
      margin: {
        top: '10px',
        bottom: '30px',
      },
      printBackground: true,
      path: pdfPath,
    };

    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      headless: true,
    });

    const page = await browser.newPage();

    await page.goto(`data:text/html;charset=UTF-8,${groupedTemplates}`, {
      waitUntil: 'networkidle0',
    });

    await page.pdf(options);
    await browser.close();
  }
}
