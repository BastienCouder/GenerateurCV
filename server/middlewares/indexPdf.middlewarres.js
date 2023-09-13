const fs = require("fs");
const PDFDocument = require("pdfkit");

// Déplacement de la logique de création du PDF dans une fonction
function createInvoice(pdfData, path) {
  let doc = new PDFDocument({ margin: 50 });

  doc.pipe(fs.createWriteStream(path));
  // Affichage du nom et prénom
  doc.fontSize(18).text("Nom : " + pdfData.name, 100, 100);
  doc.fontSize(18).text("Prenom : " + pdfData.surname, 100, 150);

  // Affichage de l'email et du téléphone
  doc.fontSize(18).text("Email : " + pdfData.email, 100, 200);
  doc.fontSize(18).text("Tel : " + pdfData.tel, 100, 250);

  // // Affichage des expériences
  // doc.fontSize(18).text("Expériences :", 100, 400);
  // pdfData.experiences.forEach((experience, index) => {
  //   doc
  //     .fontSize(14)
  //     .text(
  //       `${index + 1}. ${experience.date}: ${experience.description}`,
  //       120,
  //       430 + index * 20
  //     );
  // });

  // // Affichage des compétences
  // doc.fontSize(18).text("Compétences :", 100, 300);
  // pdfData.competences.forEach((competence, index) => {
  //   doc
  //     .fontSize(14)
  //     .text(`${index + 1}. ${competence.description}`, 120, 330 + index * 20);
  // });

  // // Affichage des hobbies
  // doc.fontSize(18).text("Hobbies :", 100, 600);
  // pdfData.hobbies.forEach((hobbie, index) => {
  //   doc.fontSize(14).text(`${index + 1}. ${hobbie}`, 120, 630 + index * 20);
  // });

  generateHeader(doc);
  generateFooter(doc);
  doc.end();
}

module.exports = {
  createInvoice,
};

function generateHeader(doc) {
  doc

    .fillColor("#444444")
    .fontSize(20)
    .text("ACME Inc.", 110, 57)
    .fontSize(10)
    .text("123 Main Street", 200, 65, { align: "right" })
    .text("New York, NY, 10025", 200, 80, { align: "right" })
    .moveDown();
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Payment is due within 15 days. Thank you for your business.",
      50,
      780,
      { align: "center", width: 500 }
    );
}
