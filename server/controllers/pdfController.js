const { createInvoice } = require("../middlewares/pdf.middlewarre");
const PdfModel = require("../models/pdf.model");
const path = require("path");
const multer = require("multer");

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

//createPdf
module.exports.createPdf = async (req, res, next) => {
  try {
    if (req.is("multipart/form-data")) {
      console.log("Requête multipart reçue.");
    }

    const pdfData = req.body;
    console.log("Données reçues : ", pdfData);

    //ExistingPdf
    const existingPdf = await PdfModel.findOne({ email: pdfData.email });

    if (existingPdf) {
      const updatedPdf = await PdfModel.findOneAndUpdate(
        { email: pdfData.email },
        pdfData,
        { new: true }
      );
      console.log("Enregistrement existant mis à jour :", updatedPdf._id);
    } else {
      await PdfModel.create(pdfData);
      console.log(
        "Aucun enregistrement existant avec cet e-mail n'a été trouvé."
      );
    }

    //Path
    const pdfFileName = `${pdfData.personalInfos[0].prenom}-cv.pdf`;
    const pdfPath = path.join(
      __dirname,
      `../../client/public/uploads/pdf/${pdfFileName}`
    );

    //File
    if (req.file) {
      picturePath = req.file.path;
      await createInvoice(pdfData, req.file.path, pdfPath);
      console.log("Une image a été incluse.");
    } else {
      await createInvoice(pdfData, null, pdfPath);
      console.log("Aucune image incluse.");
    }

    console.log("PDF généré avec succès :", pdfPath);

    return res.status(201).json({ message: "PDF généré avec succès", pdfData });
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
