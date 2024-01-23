import mongoose from "mongoose";

interface IPdf extends Document {
  prenom: string;
  nom: string;
  status: string;
  email: string;
  tel: string;
  avatar?: string;
  adresse: string;
  profil: string;
  educations: Array<{
    diplome?: string;
    date?: Date;
    lieu?: string;
  }>;
  experiences: Array<{
    date?: Date;
    lieu?: string;
    description?: string;
  }>;
  competences: string[];
  languages: Array<{
    language?: string;
    level?: string;
  }>;
  hobbies: string[];
  socialnetwork: Array<{
    network?: string;
    value?: string;
  }>;
}

const pdfSchema = new mongoose.Schema(
  {
    prenom: { type: String, required: true },
    nom: { type: String, required: true },
    status: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
      match: /.+\@.+\..+/,
    },
    tel: { type: String, required: true },
    avatar: String,
    adresse: { type: String, required: true },
    profil: { type: String, required: true },

    educations: [
      {
        diplome: String,
        date: Date,
        lieu: String,
      },
    ],
    experiences: [
      {
        date: Date,
        lieu: String,
        description: String,
      },
    ],
    competences: [String],
    languages: [
      {
        language: String,
        level: String,
      },
    ],
    hobbies: [String],
    socialnetwork: [
      {
        network: String,
        value: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Pdf", pdfSchema);
const Pdf = mongoose.model<IPdf>("Pdf", pdfSchema);
export { Pdf, IPdf };
