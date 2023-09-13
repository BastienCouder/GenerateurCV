import { useState } from "react";
import PropTypes from "prop-types";
import FormProfil from "../components/Profil";
import Competences from "../components/Competences";
import Experiences from "../components/Experiences";
import Hobbies from "../components/Hobbies";
import { useDispatch } from "react-redux";
import SocialMediaInput from "../components/SocialMediaInput";

//icons
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { createPDF } from "../store/actions/pdf.actions";

const Form = () => {
  const dispatch = useDispatch();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [reseauxSociaux, setReseauxSociaux] = useState([
    { network: "Linkedin", value: "" },
    { network: "Github", value: "" },
  ]);
  const [profil, setProfil] = useState("");
  const [experiences, setExperiences] = useState([
    { date: "", description: "" },
  ]);
  const [hobbies, setHobbies] = useState([]);
  const [competences, setCompetences] = useState([
    { description: "", link: "" },
  ]);

  const handleAjouterExperience = () => {
    setExperiences([...experiences, { date: "", description: "" }]);
  };

  const handleSupprimerExperience = (index) => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    setExperiences(updatedExperiences);
  };

  const handleAjouterHobbie = () => {
    setHobbies([...hobbies, ""]);
  };

  const handleSupprimerHobbie = (index) => {
    const updatedHobbies = [...hobbies];
    updatedHobbies.splice(index, 1);
    setHobbies(updatedHobbies);
  };

  const handleAjouterCompetence = () => {
    setCompetences([...competences, ""]);
  };

  const handleSupprimerCompetence = (index) => {
    const updatedCompetences = [...competences];
    updatedCompetences.splice(index, 1);
    setCompetences(updatedCompetences);
  };

  const handleSocialMediaChange = (index, newValue) => {
    const updatedReseauxSociaux = [...reseauxSociaux];
    updatedReseauxSociaux[index].value = newValue;
    setReseauxSociaux(updatedReseauxSociaux);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", nom);
    formData.append("surname", prenom);
    formData.append("email", email);
    formData.append("tel", tel);
    formData.append("picture", avatar);
    formData.append(
      "github",
      reseauxSociaux.find((item) => item.network === "Github")?.value || ""
    );
    formData.append(
      "linkedin",
      reseauxSociaux.find((item) => item.network === "Linkedin")?.value || ""
    );

    // Ajoutez les compétences, expériences et hobbies au FormData ici
    competences.forEach((competence) => {
      formData.append("competences", competence.description);
    });

    experiences.forEach((experience) => {
      formData.append("experiences", experience.description);
    });

    hobbies.forEach((hobbie) => {
      formData.append("hobbies", hobbie);
    });

    await dispatch(createPDF(formData));
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
              <FormProfil
                nom={nom}
                setNom={setNom}
                prenom={prenom}
                setPrenom={setPrenom}
                avatar={avatar}
                setAvatar={setAvatar}
                email={email}
                setEmail={setEmail}
                tel={tel}
                setTel={setTel}
                profil={profil}
                setProfil={setProfil}
              />

              <div className="flex flex-col sm:w-1/2 mb-4 gap-y-2">
                {reseauxSociaux.map((item, index) => (
                  <SocialMediaInput
                    key={index}
                    network={item.network}
                    icon={getSocialMediaIcon(item.network)}
                    value={item.value}
                    onChange={(value) => handleSocialMediaChange(index, value)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <Experiences
          experiences={experiences}
          setExperiences={setExperiences}
          handleAjouterExperience={handleAjouterExperience}
          handleSupprimerExperience={handleSupprimerExperience}
        />
        <Competences
          competences={competences}
          setCompetences={setCompetences}
          handleAjouterCompetence={handleAjouterCompetence}
          handleSupprimerCompetence={handleSupprimerCompetence}
        />
        <Hobbies
          hobbies={hobbies}
          setHobbies={setHobbies}
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

Form.propTypes = {
  nom: PropTypes.string.isRequired,
  prenom: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  reseauxSociaux: PropTypes.array.isRequired,
  profil: PropTypes.string.isRequired,
  experiences: PropTypes.array.isRequired,
  hobbies: PropTypes.array.isRequired,
  competences: PropTypes.array.isRequired,
};

const getSocialMediaIcon = (network) => {
  switch (network) {
    case "Linkedin":
      return <AiFillLinkedin />;
    case "Github":
      return <AiFillGithub />;
    default:
      return null;
  }
};

export default Form;
