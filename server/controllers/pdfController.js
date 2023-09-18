const { createInvoice } = require("../middlewares/indexPdf.middlewarres");
const PdfModel = require("../models/pdf.model");
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

module.exports.createPdf = async (req, res) => {
  try {
    const pdfData = req.body;

    console.log("Données reçues : ", pdfData);

    if (pdfData && pdfData.personalInfos) {
      const email = pdfData.personalInfos[0].email;

      // Recherche du document existant par e-mail
      const existingPdfData = await PdfModel.findOne({
        "personalInfos[0].email": email,
      });

      if (existingPdfData) {
        console.log(
          "Suppression de l'ancien fichier PDF pour l'e-mail existant :",
          email
        );

        // Suppression du fichier PDF existant dans le répertoire upload/pdf
        const pdfFileName = `${existingPdfData.personalInfos[0].prenom}-cv.pdf`;
        const pdfPath = path.join(
          __dirname,
          `../../client/public/uploads/pdf/${pdfFileName}`
        );

        try {
          // Fermez le fichier PDF existant s'il est ouvert
          const existingPdfStream = fs.createWriteStream(pdfPath);
          existingPdfStream.end();
        } catch (closeError) {
          console.error(
            "Erreur lors de la fermeture du fichier PDF existant :",
            closeError
          );
        }

        fs.unlinkSync(pdfPath); // Supprimez le fichier PDF existant
      }

      console.log("Création de nouvelles données pour l'e-mail :", email);
      await PdfModel.create(pdfData);

      const pdfFileName = `${pdfData.personalInfos[0].prenom}-cv.pdf`;
      const pdfPath = path.join(
        __dirname,
        `../../client/public/uploads/pdf/${pdfFileName}`
      );

      console.log("Chemin du fichier PDF :", pdfPath);

      await createInvoice(pdfData, pdfPath);

      console.log("PDF généré avec succès :", pdfPath);

      res
        .status(201)
        .json({ message: "Données ajoutées avec succès", pdfData });
    } else {
      console.error("Données reçues non valides : ", pdfData);
      res.status(400).json({ error: "Données reçues non valides" });
    }
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
