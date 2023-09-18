import PropTypes from "prop-types";

//icons
import { MdEmail } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";

const FormInputField = ({ id, value, type, onChange, placeholder, icon }) => (
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
      onChange={onChange}
      autoComplete="off"
    />
  </div>
);

const PersonalInfo = ({ formData, handleChange }) => {
  const { nom, prenom, avatar, email, tel, adress, profil } = formData;

  return (
    <>
      <div className="grid mb-4 gap-y-8">
        <div className="flex w-full justify-between gap-x-4 text-white text-lg">
          <FormInputField
            id="prenom"
            value={prenom}
            type="text"
            onChange={(e) => handleChange(e, "prenom")}
            placeholder="Prénom"
            icon={<FaUserCircle />}
          />
          <FormInputField
            id="nom"
            value={nom}
            type="text"
            onChange={(e) => handleChange(e, "nom")}
            placeholder="Nom"
            icon={<FaUserCircle />}
          />
        </div>
        <div className="flex gap-x-4 justify-between w-full items-center text-white text-lg">
          <FormInputField
            id="email"
            value={email}
            type="text"
            onChange={(e) => handleChange(e, "email")}
            placeholder="Email"
            icon={<MdEmail />}
          />

          <FormInputField
            id="tel"
            value={tel}
            type="text"
            onChange={(e) => handleChange(e, "tel")}
            placeholder="Tel"
            icon={<BsFillTelephoneFill />}
          />
          <FormInputField
            id="adress"
            value={adress}
            type="text"
            onChange={(e) => handleChange(e, "adress")}
            placeholder="Adresse"
            icon={<AiFillHome />}
          />
        </div>
        <input
          id="avatar"
          value={avatar}
          type="file"
          onChange={(e) => handleChange(e, "avatar")}
          placeholder="Choisir une photo de profil"
          className="w-full block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        />
        <div className="mb-4">
          <textarea
            id="profil"
            value={profil}
            type="textarea"
            placeholder="Decription ..."
            onChange={(e) => handleChange(e, "profil")}
            className="resize-none block h-36 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
    </>
  );
};

FormInputField.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

PersonalInfo.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default PersonalInfo;
