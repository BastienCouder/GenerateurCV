import PropTypes from "prop-types";
import { MdEmail } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BiSolidUserAccount } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";

const FormInputField = ({
  id,
  value,
  type,
  name,
  onChange,
  placeholder,
  icon,
}) => (
  <div className="relative sm:w-1/2">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
      {icon}
    </div>
    <input
      type={type}
      id={id}
      className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder={placeholder}
      value={value}
      name={name}
      required
      onChange={onChange}
      autoComplete="off"
    />
  </div>
);

FormInputField.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

const PersonalInfo = ({
  formData,
  handleChange,
  handleFileChange,
  handleResetImage,
}) => {
  const personalInfo = formData.personalInfos[0];

  const updatePersonalInfoField = (field, value) => {
    const updatedPersonalInfo = { ...personalInfo };
    updatedPersonalInfo[field] = value;

    handleChange({
      target: {
        name: "personalInfos",
        value: [updatedPersonalInfo],
      },
    });
  };

  return (
    <div className="grid mb-4 gap-y-8">
      <div className="flex flex-col md:flex-row  w-full justify-between gap-4 text-white text-lg">
        <FormInputField
          id="prenom"
          value={personalInfo.prenom}
          type="text"
          name="prenom"
          onChange={(e) => updatePersonalInfoField("prenom", e.target.value)}
          placeholder="Prénom"
          icon={<FaUserCircle />}
        />
        <FormInputField
          id="nom"
          value={personalInfo.nom}
          type="text"
          name="nom"
          onChange={(e) => updatePersonalInfoField("nom", e.target.value)}
          placeholder="Nom"
          icon={<FaUserCircle />}
        />
        <FormInputField
          id="status"
          value={personalInfo.status}
          type="text"
          name="status"
          onChange={(e) => updatePersonalInfoField("status", e.target.value)}
          placeholder="Status"
          icon={<BiSolidUserAccount />}
        />
      </div>
      <div className="flex flex-col md:flex-row  w-full justify-between gap-4 text-white text-lg">
        <FormInputField
          id="email"
          value={personalInfo.email}
          type="email"
          name="email"
          onChange={(e) => updatePersonalInfoField("email", e.target.value)}
          placeholder="Email"
          icon={<MdEmail />}
        />

        <FormInputField
          id="tel"
          value={personalInfo.tel}
          type="text"
          name="tel"
          onChange={(e) => updatePersonalInfoField("tel", e.target.value)}
          placeholder="Tel"
          icon={<BsFillTelephoneFill />}
        />
        <FormInputField
          id="address"
          value={personalInfo.address}
          type="text"
          name="address"
          onChange={(e) => updatePersonalInfoField("address", e.target.value)}
          placeholder="Ville"
          icon={<AiFillHome />}
        />
      </div>
      <div className="flex flex-col w-full gap-y-2">
        <input
          id="avatar"
          type="file"
          name="personalInfos[0][avatar]"
          onChange={(e) => handleFileChange(e)}
          placeholder="Choisir une photo de profil"
          className="w-full block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        />
        <button
          type="button"
          onClick={() => handleResetImage()}
          className="w-24 text-white text-sm hover:bg-red-700 bg-red-500 rounded-lg py-1.5 px-2.5 mt-2"
        >
          Supprimer
        </button>
      </div>
      <div className="mb-4">
        <textarea
          id="profil"
          value={personalInfo.profil}
          name="profil"
          autoComplete="off"
          required
          maxLength={400}
          placeholder="Description ..."
          onChange={(e) => updatePersonalInfoField("profil", e.target.value)}
          className="resize-none block h-36 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    </div>
  );
};

PersonalInfo.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  handleResetImage: PropTypes.func.isRequired,
};

export default PersonalInfo;
