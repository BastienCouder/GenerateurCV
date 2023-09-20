import PropTypes from "prop-types";
import { AiFillControl } from "react-icons/ai";

const Hobbies = ({
  formData,
  handleChange,
  handleSupprimerHobbie,
  handleAjouterHobbie,
}) => {
  const hobbies = formData.hobbies;

  const updateHobbieField = (index, value) => {
    const updatedHobbies = [...hobbies];
    updatedHobbies[index] = value;

    handleChange({
      target: {
        name: "hobbies",
        value: updatedHobbies,
      },
    });
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-1">Hobbies</h2>
      <div className="border-b-4 border-gray-900 mb-4"></div>
      {hobbies.map((hobbie, index) => (
        <div key={index} className="mb-2">
          <p className="mb-1">Hobbie {index + 1}</p>
          <div className="flex justify-between flex-col gap-y-2 text-white text-lg">
            <div className="flex gap-x-4">
              <div className="relative sm:w-1/4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <AiFillControl />
                </div>
                <input
                  type="text"
                  placeholder="Hobbie"
                  name={`hobbies[${index}]`}
                  value={hobbie}
                  autoComplete="off"
                  required
                  maxLength={30}
                  onChange={(e) => updateHobbieField(index, e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleSupprimerHobbie(index)}
              className="w-24 text-white text-sm hover:bg-red-700 bg-red-500 rounded-lg py-1.5 px-2.5 mt-2"
            >
              Supprimer
            </button>
          </div>
        </div>
      ))}
      {hobbies.length < 4 ? (
        <button
          type="button"
          onClick={handleAjouterHobbie}
          className="bg-green-700 text-white py-1.5 px-2.5 rounded-lg hover:bg-green-900"
        >
          Ajouter un hobbie
        </button>
      ) : null}
    </div>
  );
};

Hobbies.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleAjouterHobbie: PropTypes.func.isRequired,
  handleSupprimerHobbie: PropTypes.func.isRequired,
};

export default Hobbies;
