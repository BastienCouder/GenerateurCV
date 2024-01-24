import { z } from "zod";

const messageChampRequis = "Ce champ est requis";
const messageMinRequis = "Au moins un élément est requis";

const educationSchema = z.object({
  diplome: z.string().nonempty({ message: messageChampRequis }),
  date: z.string().nonempty({ message: messageChampRequis }),
  lieu: z.string().nonempty({ message: messageChampRequis }),
});

const experienceSchema = z.object({
  date: z.string().nonempty({ message: messageChampRequis }),
  lieu: z.string().nonempty({ message: messageChampRequis }),
  description: z.string().nonempty({ message: messageChampRequis }),
});

const languageSchema = z.object({
  language: z.string().nonempty({ message: messageChampRequis }),
  level: z.string().nonempty({ message: messageChampRequis }),
});

const socialnetworkSchema = z.object({
  linkedin: z.string().optional(),
  github: z.string().optional(),
  instagram: z.string().optional(),
  website: z.string().optional(),
});

export const pdfDataSchema = z.object({
  prenom: z.string().nonempty({ message: messageChampRequis }),
  nom: z.string().nonempty({ message: messageChampRequis }),
  status: z.string().nonempty({ message: messageChampRequis }),
  email: z
    .string()
    .email({ message: "Adresse email invalide" })
    .nonempty({ message: messageChampRequis }),
  tel: z.string().nonempty({ message: messageChampRequis }),
  avatar: z.string().optional(),
  adresse: z.string().nonempty({ message: messageChampRequis }),
  profil: z.string().nonempty({ message: messageChampRequis }),
  educations: z.array(educationSchema).min(1, { message: messageMinRequis }),
  experiences: z.array(experienceSchema).min(1, { message: messageMinRequis }),
  competences: z
    .array(z.string().nonempty({ message: messageChampRequis }))
    .min(1, { message: messageMinRequis }),
  languages: z.array(languageSchema),
  hobbies: z
    .array(z.string().nonempty({ message: messageChampRequis }))
    .min(1, { message: messageMinRequis }),
  socialnetwork: z.array(socialnetworkSchema),
});
