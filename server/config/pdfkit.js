const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const PdfModel = require("../models/pdf.models"); // Importez votre modèle Mongoose.

// Créez un document PDF
const doc = new PDFDocument();

// Utilisez une fonction asynchrone pour effectuer la recherche
async function generatePdf() {
  try {
    const pdfData = await PdfModel.findOne({
      /* Conditions de recherche si nécessaire */
    }).exec();

    if (!pdfData) {
      console.error("Aucune donnée trouvée dans la base de données.");
      return;
    }

    // Obtenez le nom à partir des données du modèle
    const name = pdfData.name;

    // Spécifiez le chemin complet pour le fichier de sortie basé sur le nom
    const pdfPath = path.join(__dirname, `../uploads/pdf/${name}-cv.pdf`);

    // Utilisez un flux pour enregistrer le PDF dans le fichier spécifié
    doc.pipe(fs.createWriteStream(pdfPath));

    // Intégrez les informations dans le PDF
    doc.fontSize(27).text("Nom : " + name, 100, 100);
    doc.fontSize(18).text("Profil : " + pdfData.profil, 100, 150);
    doc.fontSize(18).text("Compétences : " + pdfData.competences, 100, 200);
    doc.fontSize(18).text("Expériences : " + pdfData.experiences, 100, 250);
    doc.fontSize(18).text("Hobbies : " + pdfData.hobbies, 100, 300);
    doc.fontSize(18).text("Contact : " + pdfData.contact, 100, 350);

    // Finalisez le fichier PDF
    doc.end();

    console.log(`PDF généré avec succès sous le nom : ${name}.pdf`);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données depuis la base de données :",
      error
    );
    // Gérez les erreurs ici
  }
}

generatePdf();
