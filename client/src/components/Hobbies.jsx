import PropTypes from "prop-types";

const Hobbies = ({
  hobbies,
  setHobbies,
  handleAjouterHobbie,
  handleSupprimerHobbie,
}) => {
  return (
    <div className="mb-4">
      <p className="text-xl font-bold mb-1">Hobbies</p>
      <div className="border-b-4 border-gray-900 mb-4"></div>
      <label className="hidden mb-4 text-sm font-medium text-gray-900 dark:text-gray-900">
        Hobbies :
      </label>
      {hobbies.map((hobbie, index) => (
        <div key={index} className="mb-2">
          <p className="mb-1">Hobbie {index + 1}</p>

          <div className="flex justify-between flex-col">
            <div className="relative w-1/3">
              <input
                type="text"
                placeholder="Hobbie"
                value={hobbie}
                onChange={(e) => {
                  const updatedHobbies = [...hobbies];
                  updatedHobbies[index] = e.target.value;
                  setHobbies(updatedHobbies);
                }}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
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
          className="bg-green-700 text-white py-1.5 px-2.5 rounded-lg hover:bg-blue-600"
        >
          Ajouter un hobbie
        </button>
      ) : null}
    </div>
  );
};

Hobbies.propTypes = {
  hobbies: PropTypes.array.isRequired,
  setHobbies: PropTypes.func.isRequired,
  handleAjouterHobbie: PropTypes.func.isRequired,
  handleSupprimerHobbie: PropTypes.func.isRequired,
};

export default Hobbies;
