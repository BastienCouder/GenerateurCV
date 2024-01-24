import { createInvoice } from "../middlewares/pdf.middlewarre";
import PdfModel from "../models/pdf.model";
import path from "path";
import multer from "multer";
import { Request, Response, NextFunction } from "express";

// Récupérer tous les PDF
export const readPdf = async (req: Request, res: Response) => {
  try {
    const pdfs = await PdfModel.find().sort({ createdAt: -1 });
    res.status(200).json(pdfs);
  } catch (error) {
    console.error("Erreur lors de la récupération des PDFs :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des PDFs" });
  }
};

// Configuration de multer pour l'upload de fichier
const storageEngine = multer.memoryStorage();
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const pattern = /jpg|jpeg/;
  if (pattern.test(path.extname(file.originalname).toLowerCase())) {
    cb(null, true);
  } else {
    cb(new Error("Erreur : type de fichier non valide"));
  }
};

const upload = multer({
  storage: storageEngine,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5 Mo
}).single("avatar");

// Création d'un PDF
export const createPdf = [
  upload,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pdfData = req.body;
      const pdfFileName = pdfData.prenom
        ? `${pdfData.prenom}-cv.pdf`
        : "cv.pdf";
      const pdfPath = path.join(
        __dirname,
        `../../client/public/uploads/pdf/${pdfFileName}`
      );

      const existingPdf = await PdfModel.findOne({ email: pdfData.email });

      if (existingPdf) {
        await PdfModel.findOneAndUpdate({ email: pdfData.email }, pdfData, {
          new: true,
        });
      } else {
        await PdfModel.create(pdfData);
      }

      if (req.file) {
        console.log(req.file.buffer);
        await createInvoice(pdfData, req.file.buffer, pdfPath);
        console.log("Une image a été incluse.");
      } else {
        await createInvoice(pdfData, null, pdfPath);
        console.log("Aucune image incluse.");
      }

      console.log("PDF généré avec succès :", pdfPath);

      return res
        .status(201)
        .json({ message: "PDF généré avec succès", pdfData });
    } catch (error) {
      console.error(
        "Erreur lors de l'ajout ou de la mise à jour des données :",
        error
      );
      return res.status(500).json({
        error:
          "Une erreur est survenue lors de l'ajout ou de la mise à jour des données.",
      });
    }
  },
];

const pdfController = {
  readPdf,
  createPdf,
};

export { pdfController };
