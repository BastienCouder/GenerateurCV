import { createInvoice } from "../middlewares/pdf.middlewarre.js";
import path from "path";
import multer from "multer";

// Configuration de multer pour l'upload de fichier
const storageEngine = multer.memoryStorage();
const fileFilter = () => {
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
  async (req, res, next) => {
    try {
      const pdfData = req.body;
      const imageBuffer = req.file ? req.file.buffer : null;
      const pdfFileName = pdfData.prenom
        ? `${pdfData.prenom}-cv.pdf`
        : "cv.pdf";

      // Configurer les en-têtes pour le téléchargement
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${pdfFileName}"`
      );

      await createInvoice(pdfData, imageBuffer, res);
    } catch (error) {
      console.error("Erreur lors de la création du PDF :", error);
      res.status(500).json({ error: "Erreur lors de la création du PDF" });
    }
  },
];

const pdfController = {
  createPdf,
};

export { pdfController };
