const mongoose = require("mongoose");

const pdfSchema = mongoose.Schema(
  {
    personalInfos: [
      {
        prenom: {
          type: String,
          required: true,
        },
        nom: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          unique: true,
          required: true,
        },
        tel: {
          type: String,
          required: true,
        },
        avatar: { type: String },
        address: {
          type: String,
          required: true,
        },
        profil: {
          type: String,
          required: true,
        },
      },
    ],
    educations: [
      {
        diplome: {
          type: String,
        },
        date: {
          type: String,
        },
        lieu: {
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
        type: String,
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
