import PropTypes from "prop-types";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa";
import { MdPlace } from "react-icons/md";

const Education = ({
  formData,
  handleChange,
  handleSupprimerEducation,
  handleAjouterEducation,
}) => {
  const educations = formData.educations;

  const updateEducationField = (index, field, value) => {
    const updatedEducations = [...educations];
    updatedEducations[index][field] = value;

    handleChange({
      target: {
        name: "educations",
        value: updatedEducations,
      },
    });
  };

  return (
    <div className="mb-4">
      <p className="text-xl font-bold mb-1">Éducation</p>
      <div className="border-b-4 border-gray-900 mb-4"></div>
      {formData.educations.map((education, index) => (
        <div key={index} className="mb-2">
          <p className="mb-1">Éducation {index + 1}</p>
          <div className="flex justify-between flex-col gap-y-2 text-white text-lg">
            <div className="flex gap-x-4">
              <div className="relative sm:w-1/4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <FaGraduationCap />
                </div>
                <input
                  type="text"
                  placeholder="Diplôme"
                  name={`educations[${index}].diplome`}
                  value={education.diplome}
                  autoComplete="off"
                  required
                  maxLength={40}
                  onChange={(e) =>
                    updateEducationField(index, "diplome", e.target.value)
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
                  name={`educations[${index}].lieu`}
                  value={education.lieu}
                  autoComplete="off"
                  required
                  maxLength={70}
                  onChange={(e) =>
                    updateEducationField(index, "lieu", e.target.value)
                  }
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <div className="relative sm:w-1/4">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <BsFillCalendarDateFill />
              </div>
              <input
                type="text"
                placeholder="Année de graduation"
                name={`educations[${index}].date`}
                value={education.date}
                maxLength={10}
                autoComplete="off"
                required
                onChange={(e) =>
                  updateEducationField(index, "date", e.target.value)
                }
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleSupprimerEducation(index)}
            className="w-24 text-white text-sm hover:bg-red-700 bg-red-500 rounded-lg py-1.5 px-2.5 mt-2"
          >
            Supprimer
          </button>
        </div>
      ))}
      {formData.educations.length < 3 ? (
        <button
          type="button"
          onClick={handleAjouterEducation}
          className="bg-green-700 text-white py-1.5 px-2.5 rounded-lg hover:bg-green-900"
        >
          Ajouter une éducation
        </button>
      ) : null}
    </div>
  );
};

Education.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleAjouterEducation: PropTypes.func.isRequired,
  handleSupprimerEducation: PropTypes.func.isRequired,
};

export default Education;
