import fs from 'fs';
import pdfCreator from './pdfCreator';

const startProcedure = async (): Promise<void> => {
  const pdfDir = './pdf';

  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir);
  }

  await pdfCreator.createPdf('test');
};

startProcedure();
