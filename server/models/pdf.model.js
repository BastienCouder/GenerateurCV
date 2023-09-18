const mongoose = require("mongoose");

const pdfSchema = mongoose.Schema(
  {
    personalInfos: [
      {
        prenom: {
          type: String,
        },
        nom: {
          type: String,
        },
        email: {
          type: String,
        },
        tel: {
          type: String,
        },
        avatar: {
          type: String,
        },
        address: {
          type: String,
        },
        profil: {
          type: String,
        },
      },
    ],
    educations: [
      {
        diplome: {
          type: String,
        },
        annee: {
          type: String,
        },
      },
    ],
    experiences: [
      {
        date: {
          type: String,
        },
        lieu: {
          type: String,
        },
        description: {
          type: String,
        },
      },
    ],
    competences: [
      {
        description: {
          type: String,
        },
        link: {
          type: String,
        },
      },
    ],
    languages: [
      {
        language: {
          type: String,
        },
        level: {
          type: String,
        },
      },
    ],
    hobbies: [
      {
        type: String,
      },
    ],
    socialnetwork: [
      {
        network: {
          type: String,
        },
        value: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("pdf", pdfSchema);
