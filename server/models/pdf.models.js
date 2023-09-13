const mongoose = require("mongoose");

const pdfSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    tel: {
      type: String,
      required: true,
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
        required: true,
      },
    ],
    experiences: [
      {
        type: String,
        required: true,
      },
    ],
    hobbies: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("pdf", pdfSchema);
