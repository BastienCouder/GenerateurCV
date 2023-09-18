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
    console.log("Données: ", pdfData);

    const existingPdfData = await PdfModel.findOne({
      name: pdfData.name,
    });

    if (existingPdfData) {
      console.log("Mise à jour des données existantes :", pdfData.name);
      await PdfModel.findOneAndUpdate({ name: pdfData.name }, pdfData);
    } else {
      console.log("Création de nouvelles données :", pdfData.name);
      await PdfModel.create(pdfData);
    }

    const pdfPath = path.join(
      __dirname,
      `../../client/public/uploads/pdf/${pdfData.name}-cv.pdf`
    );

    console.log("Chemin du fichier PDF :", pdfPath);

    await createInvoice(pdfData, pdfPath);

    console.log("PDF généré avec succès :", pdfPath);

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
