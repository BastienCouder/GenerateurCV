const fs = require("fs");
const PDFDocument = require("pdfkit");

// Déplacement de la logique de création du PDF dans une fonction
function createInvoice(pdfData, path) {
  let doc = new PDFDocument({ size: "legal", margin: 20 });

  doc.pipe(fs.createWriteStream(path));

  console.log("Largeur de la page en points:", doc.page.width);
  console.log("Hauteur de la page en points:", doc.page.height);
  // Affichage du nom et prénom
  const nom = pdfData.personalInfos[0].nom;
  const prenom = pdfData.personalInfos[0].prenom;

  const nomCapitalized = nom.toUpperCase();
  const prenomCapitalized = prenom.toUpperCase();

  doc
    .font("Helvetica")
    .fontSize(28)
    .text(nomCapitalized + " " + prenomCapitalized, 220, 60, {
      align: "center",
    });

  //Contact
  let yPositionContact = 810;
  doc.font("Helvetica").fontSize(18).text("Contact:", 30, yPositionContact);

  //line
  const lineWidth = 2;
  doc.lineWidth(lineWidth);
  doc
    .moveTo(30, yPositionContact + 20)
    .lineTo(doc.page.width - 400, yPositionContact + 20)
    .stroke();

  // Ajoute l'email
  yPositionContact += 30;
  const svgEmailFilePath = __dirname + "/images/envelope.png";
  doc.image(svgEmailFilePath, 30, yPositionContact, {
    width: 12,
    height: 12,
  });
  yPositionContact += 2;
  doc.fontSize(12).text(pdfData.personalInfos[0].email, 50, yPositionContact);

  // Ajoute le téléphone
  yPositionContact += 17;
  const svgTelFilePath = __dirname + "/images/phone.png";
  doc.image(svgTelFilePath, 30, yPositionContact, {
    width: 12,
    height: 12,
  });
  yPositionContact += 3;
  doc.fontSize(12).text(pdfData.personalInfos[0].tel, 50, yPositionContact);

  // Ajoute l'adresse
  yPositionContact += 17;
  const svgHomeFilePath = __dirname + "/images/house.png";
  doc.image(svgHomeFilePath, 30, yPositionContact, {
    width: 12,
    height: 12,
  });
  yPositionContact += 3;
  doc.fontSize(12).text(pdfData.personalInfos[0].address, 50, yPositionContact);

  // Ajoute les réseaux sociaux
  yPositionContact += 10;
  if (
    pdfData.socialnetwork &&
    Array.isArray(pdfData.socialnetwork) &&
    pdfData.socialnetwork.length > 0
  ) {
    pdfData.socialnetwork.forEach((network, index) => {
      if (network.value) {
        yPositionContact += 17;
        const socialIconPath = __dirname + `/images/${network.network}.png`;
        doc.image(socialIconPath, 30, yPositionContact, {
          height: 13,
        });
        yPositionContact += 1.7;
        doc
          .font("Helvetica")
          .fontSize(12)
          .text(`${network.value}`, 50, yPositionContact);
      }
    });
  }

  // Affichage des études (facultatif)
  if (
    pdfData.educations &&
    Array.isArray(pdfData.educations) &&
    pdfData.educations.length > 0
  ) {
    doc.fontSize(18).text("Éducation :", 100, 400);
    pdfData.educations.forEach((education, index) => {
      doc
        .fontSize(14)
        .text(
          `${index + 1}. ${education.diplome}: ${education.annee}`,
          120,
          430 + index * 20
        );
    });
  } else {
    doc.fontSize(14).text("Aucune éducation disponible.", 120, 430);
  }

  // Affichage des compétences (facultatif)
  if (
    pdfData.competences &&
    Array.isArray(pdfData.competences) &&
    pdfData.competences.length > 0
  ) {
    doc.fontSize(18).text("Compétences :", 100, 480);
    pdfData.competences.forEach((competence, index) => {
      doc
        .fontSize(14)
        .text(`${index + 1}. ${competence.description}`, 120, 330 + index * 20);
    });
  } else {
    doc.fontSize(14).text("Aucune compétence disponible.", 120, 330);
  }

  //Expériences
  let yPositionExperiences = 150;
  let xPositionExperiences = 260;
  doc
    .font("Helvetica")
    .fontSize(18)
    .text("Éxpériences", xPositionExperiences, yPositionExperiences);

  //line
  doc.lineWidth(lineWidth);
  doc
    .moveTo(xPositionExperiences, yPositionExperiences + 20)
    .lineTo(doc.page.width - 30, yPositionExperiences + 20)
    .stroke();

  if (
    pdfData.experiences &&
    Array.isArray(pdfData.experiences) &&
    pdfData.experiences.length > 0
  ) {
    doc.fontSize(18).text("Expériences :", 100, 400);
    pdfData.experiences.forEach((experience, index) => {
      doc
        .fontSize(14)
        .text(
          `${index + 1}. ${experience.date}: ${experience.description}`,
          120,
          430 + index * 20
        );
    });
  } else {
    doc.fontSize(14).text("Aucune expérience disponible.", 120, 430);
  }

  // Affichage des hobbies
  if (
    pdfData.hobbies &&
    Array.isArray(pdfData.hobbies) &&
    pdfData.hobbies.length > 0
  ) {
    doc.fontSize(18).text("Hobbies :", 100, 600);
    pdfData.hobbies.forEach((hobbie, index) => {
      doc.fontSize(14).text(`${index + 1}. ${hobbie}`, 120, 630 + index * 20);
    });
  } else {
    doc.fontSize(14).text("Aucun hobby disponible.", 120, 630);
  }

  // Affichage des langues
  if (
    pdfData.languages &&
    Array.isArray(pdfData.languages) &&
    pdfData.languages.length > 0
  ) {
    doc.fontSize(18).text("Langues :", 100, 800);
    pdfData.languages.forEach((language, index) => {
      doc
        .fontSize(14)
        .text(
          `${index + 1}. ${language.language}: ${language.level}`,
          120,
          830 + index * 20
        );
    });
  } else {
    doc.fontSize(14).text("Aucune langue disponible.", 120, 830);
  }

  // generateHeader(doc);
  // generateFooter(doc);
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
