import { useState } from "react";
import PersonalInfo from "../components/Profil";
import Experience from "../components/Experiences";
import Competences from "../components/Competences";
import Languages from "../components/Languages";
import Hobbies from "../components/Hobbies";
import SocialMediaInput from "../components/SocialMediaInput";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { BsGlobe } from "react-icons/bs";
import Education from "../components/Educations";

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    educations: [{ diplome: "", annee: "" }],
    experiences: [{ date: "", lieu: "", description: "" }],
    competences: [{ description: "", link: "" }],
    languages: [{ language: "", level: "" }],
    hobbies: [""],
    socialnetwork: [
      { network: "linkedin", value: "" },
      { network: "twitter", value: "" },
      { network: "github", value: "" },
      { network: "website", value: "" },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log(formData);

  const handleAjouterEducation = () => {
    const nouvelleEducation = { diplome: "", annee: "" }; // Modifiez cela en fonction de vos champs d'éducation
    setFormData({
      ...formData,
      educations: [...formData.educations, nouvelleEducation],
    });
  };

  // Fonction pour supprimer une éducation par index
  const handleSupprimerEducation = (index) => {
    const educationsCopie = [...formData.educations];
    educationsCopie.splice(index, 1);
    setFormData({
      ...formData,
      educations: educationsCopie,
    });
  };

  const handleAjouterExperience = () => {
    const nouvelleExperience = { date: "", lieu: "", description: "" };
    setFormData({
      ...formData,
      experiences: [...formData.experiences, nouvelleExperience],
    });
  };

  const handleSupprimerExperience = (index) => {
    const experiencesCopie = [...formData.experiences];
    experiencesCopie.splice(index, 1);
    setFormData({
      ...formData,
      experiences: experiencesCopie,
    });
  };

  const handleAjouterCompetence = () => {
    const nouvelleCompetence = { description: "", link: "" };
    setFormData({
      ...formData,
      competences: [...formData.competences, nouvelleCompetence],
    });
  };

  const handleSupprimerCompetence = (index) => {
    const competencesCopie = [...formData.competences];
    competencesCopie.splice(index, 1);
    setFormData({
      ...formData,
      competences: competencesCopie,
    });
  };

  const handleAjouterLanguage = () => {
    const nouvelleLangue = { language: "", level: "" };
    setFormData({
      ...formData,
      languages: [...formData.languages, nouvelleLangue],
    });
  };
  const handleSupprimerLanguage = (index) => {
    const LanguagesCopie = [...formData.languages];
    LanguagesCopie.splice(index, 1);
    setFormData({
      ...formData,
      languages: LanguagesCopie,
    });
  };

  const handleAjouterHobbie = () => {
    const nouvelleHobbie = "";
    setFormData({
      ...formData,
      hobbies: [...formData.hobbies, nouvelleHobbie],
    });
  };

  const handleSupprimerHobbie = (index) => {
    const hobbiesCopie = [...formData.hobbies];
    hobbiesCopie.splice(index, 1);
    setFormData({
      ...formData,
      hobbies: hobbiesCopie,
    });
  };

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      socialnetwork: formData.socialnetwork.map((item) =>
        item.network === name ? { ...item, value } : item
      ),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Vous pouvez traiter les données du formulaire ici
    console.log(formData);
  };

  return (
    <div className="p-5 md:p-40">
      <h1 className="text-4xl font-bold mb-12">Generateur de CV</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex w-full gap-x-12">
          <div className="flex flex-col w-full">
            <h2 className="text-xl font-bold mb-1">Profil</h2>
            <div className="border-b-4 border-gray-900 mb-4"></div>
            <div className="flex flex-row w-full gap-x-10">
              <PersonalInfo formData={formData} handleChange={handleChange} />
              <div className="flex flex-col sm:w-1/2 mb-4 gap-y-2">
                {formData.socialnetwork.map((item, index) => (
                  <SocialMediaInput
                    key={index}
                    network={item.network}
                    icon={getSocialMediaIcon(item.network)}
                    value={item.value}
                    handleChange={handleInputChange}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <Education
          formData={formData}
          handleChange={handleChange} // Assurez-vous de passer les gestionnaires d'événements nécessaires
          handleAjouterEducation={handleAjouterEducation}
          handleSupprimerEducation={handleSupprimerEducation}
        />
        <Experience
          formData={formData}
          handleChange={handleChange}
          handleAjouterExperience={handleAjouterExperience}
          handleSupprimerExperience={handleSupprimerExperience}
        />
        <Competences
          formData={formData}
          handleChange={handleChange}
          handleAjouterCompetence={handleAjouterCompetence}
          handleSupprimerCompetence={handleSupprimerCompetence}
        />
        <Languages
          formData={formData}
          handleChange={handleChange}
          handleAjouterLanguage={handleAjouterLanguage}
          handleSupprimerLanguage={handleSupprimerLanguage}
        />
        <Hobbies
          formData={formData}
          handleChange={handleChange}
          handleAjouterHobbie={handleAjouterHobbie}
          handleSupprimerHobbie={handleSupprimerHobbie}
        />

        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
};

const getSocialMediaIcon = (network) => {
  switch (network) {
    case "linkedin":
      return <AiFillLinkedin />;
    case "github":
      return <AiFillGithub />;
    case "twitter":
      return <AiFillTwitterCircle />;
    case "website":
      return <BsGlobe />;
    default:
      return null;
  }
};
export default Form;
