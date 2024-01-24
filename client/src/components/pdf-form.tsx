import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { pdfDataSchema } from "../schemas";
import { z } from "zod";

import { Form } from "../components/ui/form";
import { Button } from "./ui/button";
import PersonalInfos from "./personal-infos";
import { useState } from "react";
import EducationsInfos from "./education-infos";
import ExperiencesInfos from "./experience-infos";
import LanguagesInfos from "./langages-infos";
import HobbiesInfos from "./hobbies-infos";
import CompetencesInfos from "./competences-infos";
import SocialNetworksInfos from "./social-network-infos";
import { Separator } from "./ui/separator";

const PdfForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [educationFields, setEducationFields] = useState([{ index: 1 }]);
  const [experienceFields, setExperienceFields] = useState([{ index: 1 }]);
  const [languageFields, setLanguageFields] = useState([{ index: 1 }]);
  const [hobbiesFields, setHobbiesFields] = useState([{ index: 1 }]);
  const [competenceFields, setCompetenceFields] = useState([{ index: 1 }]);

  const form = useForm<z.infer<typeof pdfDataSchema>>({
    resolver: zodResolver(pdfDataSchema),
    mode: "onSubmit",
    defaultValues: {},
  });
  const TotalSteps = 7;

  const handleNextStep = async () => {
    let fieldsToValidate: any = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = [
          "prenom",
          "nom",
          "email",
          "tel",
          "adresse",
          "profil",
        ];
        break;
      case 2:
        for (let i = 0; i < educationFields.length; i++) {
          fieldsToValidate.push(`educations[${i}].diplome`);
          fieldsToValidate.push(`educations[${i}].date`);
          fieldsToValidate.push(`educations[${i}].lieu`);
        }
        break;
      case 3:
        for (let i = 0; i < experienceFields.length; i++) {
          fieldsToValidate.push(`experiences[${i}].date`);
          fieldsToValidate.push(`experiences[${i}].lieu`);
          fieldsToValidate.push(`experiences[${i}].description`);
        }
        break;
      case 4:
        for (let i = 0; i < competenceFields.length; i++) {
          fieldsToValidate.push(`competences[${i}]`);
        }
        break;

      case 5:
        for (let i = 0; i < languageFields.length; i++) {
          fieldsToValidate.push(`languages[${i}].language`);
          fieldsToValidate.push(`languages[${i}].level`);
        }
        break;

      case 6:
        for (let i = 0; i < hobbiesFields.length; i++) {
          fieldsToValidate.push(`hobbies[${i}]`);
        }
        break;
      case 7:
        fieldsToValidate.push("socialnetwork.linkedin");
        fieldsToValidate.push("socialnetwork.github");
        fieldsToValidate.push("socialnetwork.instagram");
        fieldsToValidate.push("socialnetwork.website");
        break;
    }

    const isStepValid = await form.trigger(fieldsToValidate);

    if (isStepValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  async function onSubmit(values: z.infer<typeof pdfDataSchema>) {
    console.log("Tentative de soumission du formulaire", values);

    try {
      const response = await fetch("http://localhost:5000/pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      // Gestion de la réponse en tant que blob
      const blob = await response.blob();

      // Création d'un URL pour le blob
      const downloadUrl = window.URL.createObjectURL(blob);

      // Création d'un élément 'a' pour le téléchargement
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `${values.prenom}-${values.nom}-CV.pdf`; // Nom du fichier PDF
      document.body.appendChild(a);
      a.click();

      // Nettoyage
      window.URL.revokeObjectURL(downloadUrl);
      a.remove();

      console.log("Données envoyées avec succès et fichier PDF téléchargé.");
    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-4 flex flex-col gap-x-6"
      >
        {currentStep === 1 && (
          <>
            <h2>Informations personnelles</h2>
            <Separator />
            <PersonalInfos form={form} />
          </>
        )}
        {currentStep === 2 && (
          <>
            <h2>Parcours et formations</h2>
            <Separator />
            <EducationsInfos
              form={form}
              educationFields={educationFields}
              setEducationFields={setEducationFields}
            />
          </>
        )}
        {currentStep === 3 && (
          <>
            <h2>Expériences professionelles</h2>
            <Separator />
            <ExperiencesInfos
              form={form}
              experienceFields={experienceFields}
              setExperienceFields={setExperienceFields}
            />
          </>
        )}
        {currentStep === 4 && (
          <>
            <h2>Compétences</h2>
            <Separator />
            <CompetencesInfos
              form={form}
              competenceFields={competenceFields}
              setCompetenceFields={setCompetenceFields}
            />
          </>
        )}
        {currentStep === 5 && (
          <>
            <h2>Langues</h2>
            <Separator />
            <LanguagesInfos
              form={form}
              languageFields={languageFields}
              setLanguageFields={setLanguageFields}
            />
          </>
        )}
        {currentStep === 6 && (
          <>
            <h2>Loisirs</h2>
            <Separator />
            <HobbiesInfos
              form={form}
              hobbiesFields={hobbiesFields}
              setHobbiesFields={setHobbiesFields}
            />
          </>
        )}
        {currentStep === 7 && (
          <>
            <h2>Réseaux sociaux</h2>
            <Separator />
            <SocialNetworksInfos form={form} />{" "}
          </>
        )}
        <div className="space-x-4">
          {currentStep > 1 && (
            <Button type="button" onClick={handlePreviousStep}>
              Précédent
            </Button>
          )}

          {currentStep < TotalSteps && (
            <Button type="button" onClick={handleNextStep}>
              Suivant
            </Button>
          )}

          {currentStep === TotalSteps && (
            <Button type="submit">Générer mon CV</Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default PdfForm;
