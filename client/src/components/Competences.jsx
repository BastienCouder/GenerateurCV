import PropTypes from "prop-types";

//icons
import { BiLink } from "react-icons/bi";
import { GiSettingsKnobs } from "react-icons/gi";

const Competences = ({
  competences,
  setCompetences,
  handleAjouterCompetence,
  handleSupprimerCompetence,
}) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-1">Compétences</h2>
      <div className="border-b-4 border-gray-900 mb-4"></div>
      <label className="hidden mb-4 text-sm font-medium text-gray-900 dark:text-gray-900">
        Compétences :
      </label>
      {competences.map((competence, index) => (
        <div key={index} className="mb-2 ">
          <p className="mb-1">Compétence {index + 1}</p>

          <div className="flex flex-row gap-x-4 text-white text-lg">
            <div className="relative sm:w-1/4">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <GiSettingsKnobs />
              </div>
              <input
                type="text"
                placeholder="Compétence"
                value={competence.description}
                onChange={(e) => {
                  const updatedCompetences = [...competences];
                  updatedCompetences[index].description = e.target.value;
                  setCompetences(updatedCompetences);
                }}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="relative sm:w-1/4">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <BiLink />
              </div>
              <input
                type="text"
                placeholder="Liens"
                value={competence.link}
                onChange={(e) => {
                  const updatedCompetences = [...competences];
                  updatedCompetences[index].link = e.target.value;
                  setCompetences(updatedCompetences);
                }}
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
      ))}
      {competences.length < 8 ? (
        <button
          type="button"
          onClick={handleAjouterCompetence}
          className="bg-green-700 text-white py-1.5 px-2.5 rounded-lg hover:bg-blue-600"
        >
          Ajouter une compétence
        </button>
      ) : null}
    </div>
  );
};

Competences.propTypes = {
  competences: PropTypes.array.isRequired,
  setCompetences: PropTypes.func.isRequired,
  handleAjouterCompetence: PropTypes.func.isRequired,
  handleSupprimerCompetence: PropTypes.func.isRequired,
};

export default Competences;
