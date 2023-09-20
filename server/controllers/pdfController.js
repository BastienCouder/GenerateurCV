const { createInvoice } = require("../middlewares/pdf.middlewarre");
const PdfModel = require("../models/pdf.model");
const path = require("path");
const multer = require("multer");
const upload = require("../middlewares/avatar.middleware");

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

// Create PDF
module.exports.createPdf = async (req, res) => {
  try {
    if (req.is("multipart/form-data")) {
      console.log("Requête multipart reçue.");
      // Affichez toutes les données de la requête
      console.log("Données de la requête : ", req.body);
    }

    // upload(req, res, async (err) => {
    //   if (err) {
    //     console.error("Erreur lors de l'upload :", err);
    //     // Si l'upload échoue, continuez sans mettre à jour l'image.
    //   } else {
    const pdfData = req.body;
    console.log("Données reçues : ", pdfData);

    if (pdfData && pdfData.personalInfos) {
      const email = pdfData.personalInfos[0].email;

      console.log("Création de nouvelles données :", email);
      await PdfModel.create(pdfData);

      const pdfFileName = `${pdfData.personalInfos[0].prenom}-cv.pdf`;
      const pdfPath = path.join(
        __dirname,
        `../../client/public/uploads/pdf/${pdfFileName}`
      );

      console.log("Chemin du fichier PDF :", pdfPath);

      let picturePath = null;

      // Vérifiez si une image a été téléchargée avant d'appeler createInvoice
      if (req.file) {
        picturePath = req.file.path;
        await createInvoice(pdfData, req.file.path, pdfPath);
        console.log("Une image a été incluse.");
      } else {
        await createInvoice(pdfData, null, pdfPath); // Aucune image à inclure
        console.log("Aucune image incluse.");
      }

      console.log("PDF généré avec succès :", pdfPath);

      return res
        .status(201)
        .json({ message: "PDF généré avec succès", pdfData });
    } else {
      console.error("Données reçues non valides : ", pdfData);
      return res.status(400).json({ error: "Données reçues non valides" });
    }
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
};
