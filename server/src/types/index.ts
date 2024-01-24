export interface PdfDataType extends Document {
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
