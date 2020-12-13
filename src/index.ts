import fs from 'fs';
import pdfCreator from './pdfCreator';

const startProcedure = (): void => {
  const pdfDir = './pdf';

  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir);
  }

  pdfCreator.createPdf([
    'test1',
    'test2',
    'test3',
    'test4',
    'test5',
    'test6',
    'test7',
    'test8',
    'test9',
    'test10',
  ]);
};

startProcedure();
