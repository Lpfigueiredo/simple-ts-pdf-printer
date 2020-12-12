import fs from "fs";
import pdfCreator from "./pdfCreator";

const startProcedure = (): void => {
  const pdfDir = "./pdf";

  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir);
  }

  pdfCreator.createPdf("test");
};

startProcedure();
