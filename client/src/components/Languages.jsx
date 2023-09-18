import PropTypes from "prop-types";
import { FaLevelUpAlt } from "react-icons/fa";
import { IoLanguageOutline } from "react-icons/io5";

const Language = ({
  formData,
  handleChange,

  handleAjouterLanguage,
  handleSupprimerLanguage,
}) => {
  const languages = formData.languages;

  const updateLanguageField = (index, field, value) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index][field] = value;

    handleChange({
      target: {
        name: "languages",
        value: updatedLanguages,
      },
    });
  };

  return (
    <div className="mb-4">
      <p className="text-xl font-bold mb-1">Langues</p>
      <div className="border-b-4 border-gray-900 mb-4"></div>
      {languages.map((language, index) => (
        <div key={index} className="mb-2">
          <p className="mb-1">Langue {index + 1}</p>
          <div className="flex justify-between flex-col gap-y-2 text-white text-lg">
            <div className="flex gap-x-4">
              <div className="relative sm:w-1/4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <IoLanguageOutline />
                </div>
                <input
                  type="text"
                  placeholder="Langue"
                  name={`languages[${index}.language`}
                  value={language.language}
                  onChange={(e) =>
                    updateLanguageField(index, "language", e.target.value)
                  }
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="relative sm:w-1/4">
                <div className="absolute inset-y-0 left-0 flex text-sm items-center pl-3.5 pointer-events-none">
                  <FaLevelUpAlt />
                </div>
                <input
                  type="text"
                  placeholder="Niveau"
                  name={`languages[${index}].level`}
                  value={language.level}
                  onChange={(e) =>
                    updateLanguageField(index, "level", e.target.value)
                  }
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleSupprimerLanguage(index)}
            className="w-24 text-white text-sm hover:bg-red-700 bg-red-500 rounded-lg py-1.5 px-2.5 mt-2"
          >
            Supprimer
          </button>
        </div>
      ))}
      {languages.length < 5 ? (
        <button
          type="button"
          onClick={handleAjouterLanguage}
          className="bg-green-700 text-white py-1.5 px-2.5 rounded-lg hover:bg-blue-600"
        >
          Ajouter une langue
        </button>
      ) : null}
    </div>
  );
};

Language.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleAjouterLanguage: PropTypes.func.isRequired,
  handleSupprimerLanguage: PropTypes.func.isRequired,
};

export default Language;
