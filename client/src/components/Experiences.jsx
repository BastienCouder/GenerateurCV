import PropTypes from "prop-types";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { MdPlace } from "react-icons/md";

const Experience = ({
  formData,
  handleChange,
  handleSupprimerExperience,
  handleAjouterExperience,
}) => {
  const experiences = formData.experiences;

  const updateExperienceField = (index, field, value) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index][field] = value;

    handleChange({
      target: {
        name: "experiences",
        value: updatedExperiences,
      },
    });
  };

  const handleDescriptionChange = (index, value) => {
    const lines = value.split("\n");
    if (lines.length <= 2) {
      updateExperienceField(index, "description", value);
    }
  };

  return (
    <div className="mb-4">
      <p className="text-xl font-bold mb-1">Expériences</p>
      <div className="border-b-4 border-gray-900 mb-4"></div>
      {formData.experiences.map((experience, index) => (
        <div key={index} className="mb-2">
          <p className="mb-1">Expérience {index + 1}</p>
          <div className="flex justify-between flex-col gap-y-2 text-white text-lg">
            <div className="flex gap-x-4">
              <div className="relative sm:w-1/4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <BsFillCalendarDateFill />
                </div>
                <input
                  type="text"
                  placeholder="Date"
                  name={`experiences[${index}].date`}
                  value={experience.date}
                  maxLength={10}
                  autoComplete="off"
                  required
                  onChange={(e) =>
                    updateExperienceField(index, "date", e.target.value)
                  }
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="relative sm:w-1/4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <MdPlace />
                </div>
                <input
                  type="text"
                  placeholder="Lieu"
                  name={`experiences[${index}].lieu`}
                  value={experience.lieu}
                  autoComplete="off"
                  required
                  maxLength={30}
                  onChange={(e) =>
                    updateExperienceField(index, "lieu", e.target.value)
                  }
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <div className="relative sm:w-1/2">
              <textarea
                type="textarea"
                placeholder="Description"
                name={`experiences[${index}].description`}
                value={experience.description}
                autoComplete="off"
                rows={2}
                required
                maxLength={70}
                style={{ overflowY: "hidden" }}
                onChange={(e) => handleDescriptionChange(index, e.target.value)}
                className="resize-none w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-3 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleSupprimerExperience(index)}
            className="w-24 text-white text-sm hover:bg-red-700 bg-red-500 rounded-lg py-1.5 px-2.5 mt-2"
          >
            Supprimer
          </button>
        </div>
      ))}
      {formData.experiences.length < 3 ? (
        <button
          type="button"
          onClick={handleAjouterExperience}
          className="bg-green-700 text-white py-1.5 px-2.5 rounded-lg hover:bg-green-900"
        >
          Ajouter une expérience
        </button>
      ) : null}
    </div>
  );
};

Experience.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleAjouterExperience: PropTypes.func.isRequired,
  handleSupprimerExperience: PropTypes.func.isRequired,
};

export default Experience;
