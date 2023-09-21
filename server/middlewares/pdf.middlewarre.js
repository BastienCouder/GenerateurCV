const fs = require("fs");
const PDFDocument = require("pdfkit");

// Déplacement de la logique de création du PDF dans une fonction
function createInvoice(pdfData, picturePath, pdfPath) {
  let doc = new PDFDocument({ size: "legal", margin: 20 });
  const lineWidth = 2;

  doc.pipe(fs.createWriteStream(pdfPath));

  const widthRectangle = 240;
  const heightRectangle = 1008;

  const xPositionRectangle = 0;
  const yPositionRectangle = 0;

  const customFillColor = "#6282B0";
  doc.fillColor(customFillColor);
  doc
    .rect(
      xPositionRectangle,
      yPositionRectangle,
      widthRectangle,
      heightRectangle
    )
    .fill();
  // Définir la couleur de remplissage pour les titres en bleu
  const blueFillColor = "#063970"; // Code hexadécimal de la couleur bleue
  doc.fillColor(blueFillColor);

  const bluestrokeFillColor = "#063970"; // Code hexadécimal de la couleur bleue
  doc.strokeColor(bluestrokeFillColor);

  const whiteFillColor = "#FFFFFF";

  // Nom et prénom
  const nom = pdfData.personalInfos[0].nom;
  const prenom = pdfData.personalInfos[0].prenom;

  const nomCapitalized = nom.toUpperCase();
  const prenomCapitalized = prenom.toUpperCase();

  doc
    .font("Helvetica-Bold")
    .fontSize(26)
    .text(nomCapitalized + " " + prenomCapitalized, 220, 60, {
      align: "center",
    });

  const maxWidthForstatusText = 300;
  doc
    .font("Helvetica")
    .fontSize(14)
    .text(pdfData.personalInfos[0].status, 260, 90, {
      align: "center",
      width: maxWidthForstatusText,
    });

  // Profil
  let yPositionProfil = 260;
  let xPositionProfil = 30;

  doc
    .font("Helvetica")
    .fontSize(18)
    .text("Profil", xPositionProfil, yPositionProfil);

  // Ligne
  doc.lineWidth(lineWidth);
  doc
    .moveTo(30, yPositionProfil + 20)
    .lineTo(doc.page.width - 400, yPositionProfil + 20)
    .stroke();

  yPositionProfil += 20;

  const maxWidthForProfilText = 180;

  doc
    .font("Helvetica")
    .fontSize(12)
    .fillColor(whiteFillColor)
    .text(
      pdfData.personalInfos[0].profil,
      xPositionProfil,
      (yPositionProfil += 10),
      {
        width: maxWidthForProfilText,
        align: "justify",
      }
    );

  // Langues
  let yPositionLangues = 550;
  let xPositionLangues = 30;

  doc
    .font("Helvetica")
    .fontSize(18)
    .fillColor(blueFillColor)
    .text("Langues", xPositionLangues, yPositionLangues);

  // Ligne
  doc.lineWidth(lineWidth);
  doc
    .moveTo(xPositionLangues, yPositionLangues + 20)
    .lineTo(doc.page.width - 400, yPositionLangues + 20)
    .stroke();

  if (
    pdfData.languages &&
    Array.isArray(pdfData.languages) &&
    pdfData.languages.length > 0
  ) {
    yPositionLangues += 15;
    pdfData.languages.forEach((language) => {
      if (language.language && language.level) {
        yPositionLangues += 25;

        const languageCapitalized =
          language.language.charAt(0).toUpperCase() +
          language.language.slice(1);

        doc
          .fontSize(12)
          .fillColor(whiteFillColor)
          .font("Helvetica-Bold")
          .text(`${languageCapitalized}`, xPositionLangues, yPositionLangues);

        doc
          .fontSize(12)
          .fillColor(whiteFillColor)
          .font("Helvetica")
          .text(`${language.level}`, xPositionLangues + 90, yPositionLangues);
      }
    });
  }
  // Contact
  let yPositionContact = 780;

  doc
    .font("Helvetica")
    .fontSize(18)
    .fillColor(blueFillColor)
    .text("Contact:", 30, yPositionContact);

  // Ligne
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
  });
  yPositionContact += 2;

  doc
    .fontSize(12)
    .fillColor(whiteFillColor)
    .text(pdfData.personalInfos[0].email, 50, yPositionContact);
  yPositionContact += 17;
  const svgTelFilePath = __dirname + "/images/phone.png";
  doc.image(svgTelFilePath, 30, yPositionContact, {
    width: 12,
  });
  yPositionContact += 3;

  doc
    .fontSize(12)
    .fillColor(whiteFillColor) // Définir la couleur de remplissage en blanc
    .text(pdfData.personalInfos[0].tel, 50, yPositionContact);

  // Ajoute l'adresse
  yPositionContact += 17;
  const svgHomeFilePath = __dirname + "/images/house.png";
  doc.image(svgHomeFilePath, 30, yPositionContact, {
    width: 12,
  });
  yPositionContact += 3;

  doc
    .fontSize(12)
    .fillColor(whiteFillColor) // Définir la couleur de remplissage en blanc
    .text(pdfData.personalInfos[0].address, 50, yPositionContact);

  // Ajoute les réseaux sociaux
  yPositionContact += 10;
  if (
    pdfData.socialnetwork &&
    Array.isArray(pdfData.socialnetwork) &&
    pdfData.socialnetwork.length > 0
  ) {
    pdfData.socialnetwork.forEach((network) => {
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
          .fillColor(whiteFillColor) // Définir la couleur de remplissage en blanc
          .text(`${network.value}`, 50, yPositionContact);
      }
    });
  }

  // Ajoute les réseaux sociaux
  yPositionContact += 10;
  if (
    pdfData.socialnetwork &&
    Array.isArray(pdfData.socialnetwork) &&
    pdfData.socialnetwork.length > 0
  ) {
    pdfData.socialnetwork.forEach((network) => {
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

  doc.fillColor(blueFillColor);

  const maxWidthForRightText = 220;

  // Expériences
  let yPositionExperiences = 150;
  let xPositionExperiences = 260;
  doc
    .font("Helvetica")
    .fontSize(18)
    .text("Expériences", xPositionExperiences, yPositionExperiences);

  // Ligne
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
    yPositionExperiences -= 20;
    pdfData.experiences.forEach((experience) => {
      if (experience.description && experience.lieu && experience.date) {
        yPositionExperiences += 55;
        doc
          .fontSize(14)
          .text(
            `${experience.date}`,
            xPositionExperiences,
            yPositionExperiences
          );

        const lieuCapitalized =
          experience.lieu.charAt(0).toUpperCase() + experience.lieu.slice(1);

        doc
          .fontSize(14)
          .font("Helvetica-Bold")
          .text(
            `${lieuCapitalized}`,
            xPositionExperiences + 90,
            yPositionExperiences
          );

        const descriptionCapitalized =
          experience.description.charAt(0).toUpperCase() +
          experience.description.slice(1);

        doc
          .font("Helvetica")
          .fontSize(12)
          .text(
            `${descriptionCapitalized}`,
            xPositionExperiences + 90,
            yPositionExperiences + 15,
            {
              align: "left",
              width: maxWidthForRightText,
            }
          );
      }
    });
  } else {
    null;
  }

  // Études
  let yPositionEtudes = 360;
  let xPositionEtudes = 260;
  doc
    .font("Helvetica")
    .fontSize(18)
    .text("Études", xPositionEtudes, yPositionEtudes);

  // Ligne sous le titre des études
  doc.lineWidth(lineWidth);
  doc
    .moveTo(xPositionEtudes, yPositionEtudes + 20)
    .lineTo(doc.page.width - 30, yPositionEtudes + 20)
    .stroke();

  if (
    pdfData.educations &&
    Array.isArray(pdfData.educations) &&
    pdfData.educations.length > 0
  ) {
    yPositionEtudes -= 20;
    pdfData.educations.forEach((education) => {
      if (education.diplome && education.date && education.lieu) {
        yPositionEtudes += 55;
        doc
          .fontSize(14)
          .text(`${education.date}`, xPositionEtudes, yPositionEtudes);

        const diplomeCapitalized =
          education.diplome.charAt(0).toUpperCase() +
          education.diplome.slice(1);

        // Mettre en gras et capitaliser le diplôme
        doc
          .fontSize(14)
          .font("Helvetica-Bold")
          .text(`${diplomeCapitalized}`, xPositionEtudes + 90, yPositionEtudes);

        // Mettre en majuscules la première lettre du lieu
        const lieuCapitalized =
          education.lieu.charAt(0).toUpperCase() + education.lieu.slice(1);

        doc
          .font("Helvetica")
          .fontSize(12)
          .text(
            `${lieuCapitalized}`,
            xPositionEtudes + 90,
            yPositionEtudes + 15
          );
      }
    });
  } else {
    null;
  }

  //compétences
  let yPositionCompetences = 570;
  let xPositionCompetences = 260;

  doc
    .fontSize(18)
    .text("Compétences", xPositionCompetences, yPositionCompetences);

  // Ligne sous le titre des compétences
  doc.lineWidth(lineWidth);
  doc
    .moveTo(xPositionCompetences, yPositionCompetences + 20)
    .lineTo(doc.page.width - 30, yPositionCompetences + 20)
    .stroke();

  if (
    pdfData.competences &&
    Array.isArray(pdfData.competences) &&
    pdfData.competences.length > 0
  ) {
    for (let i = 0; i < pdfData.competences.length; i += 2) {
      const competence1 = pdfData.competences[i];
      const competence2 =
        i + 1 < pdfData.competences.length ? pdfData.competences[i + 1] : null;

      yPositionCompetences += 30;
      doc.fontSize(14).text(`${competence1}`, 260, yPositionCompetences);

      if (competence2) {
        doc.fontSize(14).text(`${competence2}`, 420, yPositionCompetences);
      }
    }
  } else {
    null;
  }

  //hobbies
  let yPositionHobbies = 750;
  let xPositionHobbies = 260;

  doc.fontSize(18).text("Hobbies", xPositionHobbies, yPositionHobbies);

  // Ligne sous le titre des hobbies
  doc.lineWidth(lineWidth);
  doc
    .moveTo(xPositionHobbies, yPositionHobbies + 20)
    .lineTo(doc.page.width - 30, yPositionHobbies + 20)
    .stroke();

  if (
    pdfData.hobbies &&
    Array.isArray(pdfData.hobbies) &&
    pdfData.hobbies.length > 0
  ) {
    yPositionHobbies += 5;
    pdfData.hobbies.forEach((hobby) => {
      yPositionHobbies += 30;
      doc.fontSize(14).text(`${hobby}`, xPositionHobbies, yPositionHobbies);
    });
  } else {
    null;
  }

  //Photo
  const circleX = 125;
  const circleY = 130;
  const circleRadius = 60;
  const padding = 5;

  const imageX = circleX - circleRadius + padding;
  const imageY = circleY - circleRadius + padding;
  const imageWidth = (circleRadius - padding) * 2;
  const imageHeight = (circleRadius - padding) * 2;

  const whiteStrokeColor = "#FFFFFF";
  doc.strokeColor(whiteStrokeColor);

  //cercle
  doc.circle(circleX, circleY, circleRadius).lineWidth(2).stroke();

  // Chargez l'image à l'intérieur du cercle
  if (fs.existsSync(picturePath)) {
    doc.save();
    doc.circle(circleX, circleY, circleRadius - padding).clip();
    doc.rotate(90, { origin: [circleX, circleY] });
    doc.image(picturePath, imageX, imageY, {
      width: imageWidth,
      height: imageHeight,
    });
    doc.restore();
  }

  doc.end();
}

module.exports = {
  createInvoice,
};
