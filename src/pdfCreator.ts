import fs from "fs";
import path from "path";
import handlebars from "handlebars";
import puppeteer from "puppeteer";

export default class PdfCreator {
  static async createPdf(data: string): Promise<void> {
    const templateHtml = fs.readFileSync(
      path.join(__dirname, "template", "template.html"),
      "utf8"
    );
    const template = handlebars.compile(templateHtml);
    const html = template({ data });

    const date = new Date();
    const milis = date.getTime();

    const pdfDir = "./pdf";

    if (!fs.existsSync(pdfDir)) {
      fs.mkdirSync(pdfDir);
    }

    const pdfPath = path.join("pdf", `${data}-${milis}.pdf`);

    const options = {
      width: "1230px",
      headerTemplate: "<p></p>",
      footerTemplate: "<p></p>",
      displayHeaderFooter: false,
      margin: {
        top: "10px",
        bottom: "30px",
      },
      printBackground: true,
      path: pdfPath,
    };

    const browser = await puppeteer.launch({
      args: ["--no-sandbox"],
      headless: true,
    });

    const page = await browser.newPage();

    await page.goto(`data:text/html;charset=UTF-8,${html}`, {
      waitUntil: "networkidle0",
    });

    await page.pdf(options);
    await browser.close();
  }
}
