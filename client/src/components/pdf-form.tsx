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

const PdfForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [educationFields, setEducationFields] = useState([{ index: 1 }]);
  const [experienceFields, setExperienceFields] = useState([{ index: 1 }]);
  const [languageFields, setLanguageFields] = useState([{ index: 1 }]);
  const [hobbiesFields, setHobbiesFields] = useState([{ index: 1 }]);
  const [competenceFields, setCompetenceFields] = useState([{ index: 1 }]);

  const form = useForm<z.infer<typeof pdfDataSchema>>({
    resolver: zodResolver(pdfDataSchema),
    mode: "onChange",
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
        for (let i = 0; i < languageFields.length; i++) {
          fieldsToValidate.push(`languages[${i}].language`);
          fieldsToValidate.push(`languages[${i}].level`);
        }
        break;
      case 5:
        for (let i = 0; i < hobbiesFields.length; i++) {
          fieldsToValidate.push(`hobbies[${i}]`);
        }
        break;
      case 6:
        for (let i = 0; i < competenceFields.length; i++) {
          fieldsToValidate.push(`competences[${i}]`);
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
    } else {
      console.error("Champs non valides");
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  function onSubmit(values: z.infer<typeof pdfDataSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
            <PersonalInfos form={form} />
          </>
        )}
        {currentStep === 2 && (
          <>
            <h2>Parcours et formations</h2>
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
            <HobbiesInfos
              form={form}
              hobbiesFields={hobbiesFields}
              setHobbiesFields={setHobbiesFields}
            />
          </>
        )}
        {currentStep === 7 && <SocialNetworksInfos form={form} />}
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
