import PropTypes from "prop-types";

//icons
import { BsFillCalendarDateFill } from "react-icons/bs";
import { MdPlace } from "react-icons/md";

const Experiences = ({
  experiences,
  setExperiences,
  handleAjouterExperience,
  handleSupprimerExperience,
}) => {
  return (
    <div className="mb-4">
      <p className="text-xl font-bold mb-1">Experiences</p>
      <div className="border-b-4 border-gray-900 mb-4"></div>
      <label className="hidden mb-4 text-sm font-medium text-gray-900 dark:text-gray-900">
        Expériences :
      </label>
      {experiences.map((experience, index) => (
        <div key={index} className="mb-2 ">
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
                  value={experience.date}
                  onChange={(e) => {
                    const updatedExperiences = [...experiences];
                    updatedExperiences[index].date = e.target.value;
                    setExperiences(updatedExperiences);
                  }}
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
                  value={experience.lieu}
                  onChange={(e) => {
                    const updatedExperiences = [...experiences];
                    updatedExperiences[index].lieu = e.target.value;
                    setExperiences(updatedExperiences);
                  }}
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <div className="relative sm:w-3/4">
              <textarea
                type="text"
                placeholder="Description"
                value={experience.description}
                onChange={(e) => {
                  const updatedExperiences = [...experiences];
                  updatedExperiences[index].description = e.target.value;
                  setExperiences(updatedExperiences);
                }}
                className="resize-none w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
      {experiences.length < 4 ? (
        <button
          type="button"
          onClick={handleAjouterExperience}
          className="bg-green-700 text-white py-1.5 px-2.5 rounded-lg hover:bg-blue-600"
        >
          Ajouter une expérience
        </button>
      ) : null}
    </div>
  );
};

Experiences.propTypes = {
  experiences: PropTypes.array.isRequired,
  setExperiences: PropTypes.func.isRequired,
  handleAjouterExperience: PropTypes.func.isRequired,
  handleSupprimerExperience: PropTypes.func.isRequired,
};

export default Experiences;
