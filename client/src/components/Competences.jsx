import PropTypes from "prop-types";
import { GiSettingsKnobs } from "react-icons/gi";

const Competences = ({
  formData,
  handleChange,
  handleSupprimerCompetence,
  handleAjouterCompetence,
}) => {
  const competences = formData.competences;

  const updateCompetenceField = (index, value) => {
    const updatedCompetences = [...competences];
    updatedCompetences[index] = value;

    handleChange({
      target: {
        name: "competences",
        value: updatedCompetences,
      },
    });
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-1">Compétences</h2>
      <div className="border-b-4 border-gray-900 mb-4"></div>
      {competences.map((competence, index) => (
        <div key={index} className="mb-2 ">
          <p className="mb-1">Compétence {index + 1}</p>
          <div className="flex justify-between flex-col gap-y-2 text-white text-lg">
            <div className="flex gap-x-4">
              <div className="relative sm:w-1/4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <GiSettingsKnobs />
                </div>
                <input
                  type="text"
                  placeholder="Compétence"
                  name={`competences[${index}]`}
                  value={competence}
                  autoComplete="off"
                  required
                  maxLength={20}
                  onChange={(e) => updateCompetenceField(index, e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleSupprimerCompetence(index)}
              className="w-24 text-white text-sm hover:bg-red-700 bg-red-500 rounded-lg py-1.5 px-2.5 mt-2"
            >
              Supprimer
            </button>
          </div>
        </div>
      ))}
      {competences.length < 8 ? (
        <button
          type="button"
          onClick={handleAjouterCompetence}
          className="bg-green-700 text-white py-1.5 px-2.5 rounded-lg hover:bg-green-900"
        >
          Ajouter une compétence
        </button>
      ) : null}
    </div>
  );
};

Competences.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleAjouterCompetence: PropTypes.func.isRequired,
  handleSupprimerCompetence: PropTypes.func.isRequired,
};

export default Competences;
