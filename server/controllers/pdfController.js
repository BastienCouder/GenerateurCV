const { createInvoice } = require("../middlewares/indexPdf.middlewarres");
const PdfModel = require("../models/pdf.models");
const path = require("path");

// Récupérer tous les PDF
module.exports.readPdf = async (req, res) => {
  try {
    const pdfs = await PdfModel.find().sort({ createdAt: -1 });
    res.status(200).json(pdfs);
  } catch (error) {
    console.error("Erreur lors de la récupération des PDFs :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des PDFs" });
  }
};

// Créer un PDF

module.exports.createPdf = async (req, res) => {
  try {
    const pdfData = req.body;

    const existingPdfData = await PdfModel.findOne({
      name: pdfData.name,
    }).exec();

    if (existingPdfData) {
      await PdfModel.findOneAndUpdate({ name: pdfData.name }, pdfData);
    } else {
      await PdfModel.create(pdfData);
    }

    const pdfPath = path.join(
      __dirname,
      `../uploads/pdf/${pdfData.name}-cv.pdf`
    );

    await createInvoice(pdfData, pdfPath);

    res.status(201).json({ message: "Données ajoutées avec succès", pdfData });
  } catch (error) {
    console.error(
      "Erreur lors de l'ajout ou de la mise à jour des données :",
      error
    );
    res.status(500).json({
      error:
        "Une erreur est survenue lors de l'ajout ou de la mise à jour des données.",
    });
  }
};
