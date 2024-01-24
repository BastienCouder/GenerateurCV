import { z } from "zod";

const messageChampRequis = "Ce champ est requis";
const messageMinRequis = "Au moins un élément est requis";

const educationSchema = z.object({
  diplome: z
    .string({ required_error: messageChampRequis })
    .nonempty({ message: messageChampRequis }),
  date: z
    .string({ required_error: messageChampRequis })
    .nonempty({ message: messageChampRequis }),
  lieu: z
    .string({ required_error: messageChampRequis })
    .nonempty({ message: messageChampRequis }),
});

const experienceSchema = z.object({
  date: z
    .string({ required_error: messageChampRequis })
    .nonempty({ message: messageChampRequis }),
  lieu: z
    .string({ required_error: messageChampRequis })
    .nonempty({ message: messageChampRequis }),
  description: z
    .string({ required_error: messageChampRequis })
    .nonempty({ message: messageChampRequis }),
});

const languageSchema = z.object({
  language: z
    .string({ required_error: messageChampRequis })
    .nonempty({ message: messageChampRequis }),
  level: z
    .string({ required_error: messageChampRequis })
    .nonempty({ message: messageChampRequis }),
});

const socialnetworkSchema = z.object({
  linkedin: z.string().optional(),
  github: z.string().optional(),
  instagram: z.string().optional(),
  website: z.string().optional(),
});

const competencesSchema = z.array(
  z.string().nonempty({ message: "La compétence ne peut pas être vide" })
);
const hobbiesSchema = z.array(
  z.string().nonempty({ message: "Le loisir ne peut pas être vide" })
);

export const pdfDataSchema = z.object({
  prenom: z
    .string({ required_error: messageChampRequis })
    .nonempty({ message: messageChampRequis }),
  nom: z
    .string({ required_error: messageChampRequis })
    .nonempty({ message: messageChampRequis }),
  status: z
    .string({ required_error: messageChampRequis })
    .nonempty({ message: messageChampRequis }),
  email: z
    .string({ required_error: messageChampRequis })
    .email({ message: "Adresse email invalide" })
    .nonempty({ message: messageChampRequis }),
  tel: z
    .string({ required_error: messageChampRequis })
    .nonempty({ message: messageChampRequis }),
  avatar: z.string().optional(),
  adresse: z
    .string({ required_error: messageChampRequis })
    .nonempty({ message: messageChampRequis }),
  profil: z
    .string({ required_error: messageChampRequis })
    .nonempty({ message: messageChampRequis }),
  educations: z.array(educationSchema).min(1, { message: messageMinRequis }),
  experiences: z.array(experienceSchema).min(1, { message: messageMinRequis }),
  languages: z.array(languageSchema),
  competences: competencesSchema.min(1, { message: messageMinRequis }),
  hobbies: hobbiesSchema.min(1, { message: messageMinRequis }),
  socialnetwork: z.array(socialnetworkSchema).optional(),
});
