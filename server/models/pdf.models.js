const mongoose = require("mongoose");

const pdfSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    email: {
      type: String,
    },
    tel: {
      type: String,
    },
    picture: {
      type: String,
    },
    github: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    competences: [
      {
        type: String,
      },
    ],
    experiences: [
      {
        type: String,
      },
    ],
    hobbies: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("pdf", pdfSchema);
