import { useState } from "react";
import PersonalInfo from "../components/Profil";
import Experience from "../components/Experiences";
import Competences from "../components/Competences";
import Languages from "../components/Languages";
import Hobbies from "../components/Hobbies";
import SocialMediaInput from "../components/SocialMediaInput";
import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import { BsGlobe } from "react-icons/bs";
import Education from "../components/Educations";
import { apiUrl } from "../utils/Utils";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState({
    personalInfos: [
      {
        prenom: "",
        nom: "",
        status: "",
        email: "",
        tel: "",
        avatar: "",
        address: "",
        profil: "",
      },
    ],
    educations: [{ diplome: "", date: "", lieu: "" }],
    experiences: [{ date: "", lieu: "", description: "" }],
    competences: [""],
    languages: [{ language: "", level: "" }],
    hobbies: [""],
    socialnetwork: [
      { network: "linkedin", value: "" },
      { network: "instagram", value: "" },
      { network: "github", value: "" },
      { network: "web", value: "" },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Obtenez le premier fichier sélectionné

    if (file) {
      setFormData({
        ...formData,
        personalInfos: [
          {
            ...formData.personalInfos[0],
            avatar: file, // Mettez le fichier dans le champ "avatar"
          },
        ],
      });
    }
  };

  const handleAjouterEducation = () => {
    const nouvelleEducation = { diplome: "", annee: "" };
    setFormData({
      ...formData,
      educations: [...formData.educations, nouvelleEducation],
    });
  };

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
    const nouvelleCompetence = "";
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

  const handleResetImage = () => {
    const updatedPersonalInfo = { ...formData.personalInfos[0] };
    updatedPersonalInfo.avatar = ""; // Réinitialisez la propriété avatar à une chaîne vide
    const updatedFormData = { ...formData };
    updatedFormData.personalInfos[0] = updatedPersonalInfo; // Mise à jour de formData avec la nouvelle valeur
    handleChange({
      target: {
        name: "personalInfos",
        value: [updatedPersonalInfo],
      },
    });
    setFormData(updatedFormData); // Mettez à jour le state formData avec la nouvelle valeur

    // Réinitialisez la valeur de l'input file
    const fileInput = document.getElementById("avatar");
    if (fileInput) {
      fileInput.value = ""; // Définissez la valeur du champ input sur une chaîne vide
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("avatar", formData.avatar || "");
      const personalInfo = formData.personalInfos[0];
      formDataToSend.append(
        "personalInfos[0][avatar]",
        personalInfo.avatar || ""
      );
      formDataToSend.append(
        "personalInfos[0][prenom]",
        personalInfo.prenom || ""
      );
      formDataToSend.append("personalInfos[0][nom]", personalInfo.nom || "");
      formDataToSend.append(
        "personalInfos[0][status]",
        personalInfo.status || ""
      );
      formDataToSend.append(
        "personalInfos[0][email]",
        personalInfo.email || ""
      );
      formDataToSend.append("personalInfos[0][tel]", personalInfo.tel || "");
      formDataToSend.append(
        "personalInfos[0][address]",
        personalInfo.address || ""
      );
      formDataToSend.append(
        "personalInfos[0][profil]",
        personalInfo.profil || ""
      );

      const education = formData.educations;
      formDataToSend.append("educations[0][diplome]", education.diplome || "");
      formDataToSend.append("educations[0][date]", education.date || "");
      formDataToSend.append("educations[0][lieu]", education.lieu || "");

      const experience = formData.experiences;
      formDataToSend.append("experiences[0][date]", experience.date || "");
      formDataToSend.append("experiences[0][lieu]", experience.lieu || "");
      formDataToSend.append(
        "experiences[0][description]",
        experience.description || ""
      );

      for (let i = 0; i < formData.competences.length; i++) {
        formDataToSend.append("competences[]", formData.competences[i] || "");
      }

      for (let i = 0; i < formData.languages.length; i++) {
        formDataToSend.append(
          "languages[][language]",
          formData.languages[i].language || ""
        );
        formDataToSend.append(
          "languages[][level]",
          formData.languages[i].level || ""
        );
      }

      for (let i = 0; i < formData.hobbies.length; i++) {
        formDataToSend.append("hobbies[]", formData.hobbies[i] || "");
      }

      const response = await axios.post(`${apiUrl}/pdf`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        const responseData = response.data;
        console.log("Réponse du serveur : ", responseData);

        if (responseData.message === "PDF généré avec succès") {
          console.log("PDF généré avec succès.");
        }
      } else {
        console.error("Erreur lors de la génération du PDF.");
      }
    } catch (error) {
      console.error("Erreur lors de la génération du PDF.", error);
    }
  };

  return (
    <div className="p-5 md:px-20 md:py-10">
      <h1 className="text-4xl font-bold mb-12">Generateur de CV</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="flex w-full gap-x-12">
          <div className="flex flex-col w-full">
            <h2 className="text-xl font-bold mb-1">Profil</h2>
            <div className="border-b-4 border-gray-900 mb-4"></div>
            <div className="flex flex-col md:flex-row w-full gap-x-10">
              <PersonalInfo
                formData={formData}
                handleChange={handleChange}
                handleFileChange={handleFileChange}
                handleResetImage={handleResetImage}
              />
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
          handleChange={handleChange}
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
          className="bg-blue-700 text-white py-1.5 px-2.5 rounded-lg hover:bg-blue-900"
        >
          Obtenir mon cv
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
    case "instagram":
      return <AiFillInstagram />;
    case "web":
      return <BsGlobe />;
    default:
      return null;
  }
};
export default Form;
