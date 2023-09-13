import PropTypes from "prop-types";

//icons
import { MdEmail } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";

const FormProfil = ({
  nom,
  setNom,
  prenom,
  setPrenom,
  avatar,
  setAvatar,
  email,
  setEmail,
  tel,
  setTel,
  profil,
  setProfil,
}) => {
  return (
    <>
      <div className="grid mb-4 gap-y-8">
        <div className="flex w-full justify-between gap-x-4 text-white text-lg">
          <label
            htmlFor="website-admin"
            className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Prenom :
          </label>
          <div className="flex sm:w-1/2">
            <span className="inline-flex items-center px-3 text-lg  bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:border-gray-600">
              <FaUserCircle />
            </span>
            <input
              type="text"
              id="prenom"
              className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
            />
          </div>
          <label
            htmlFor="website-admin"
            className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nom :
          </label>
          <div className="flex sm:w-1/2">
            <span className="inline-flex items-center px-3 text-lg  bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:border-gray-600">
              <FaUserCircle />
            </span>
            <input
              type="text"
              id="nom"
              className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Prenom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-x-4 justify-between w-full items-center text-white text-lg">
          <label
            type="email"
            id="email"
            htmlFor="email-address-icon"
            className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Email
          </label>
          <div className="relative sm:w-1/2 ">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <MdEmail />
            </div>
            <input
              type="text"
              id="email-address-icon"
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <label
            id="tel"
            htmlFor="tel"
            className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Tel
          </label>
          <div className="relative sm:w-1/2 ">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <BsFillTelephoneFill />
            </div>
            <input
              type="text"
              id="tel"
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tel"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
            />
          </div>
        </div>{" "}
        <label
          className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="avatar"
        >
          photo de profil
        </label>
        <input
          className="w-full block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="user_avatar_help"
          id="avatar"
          type="file"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="Choisir une photo de profil"
        />
        <div className="mb-4">
          <label
            htmlFor="profil"
            className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Profil :
          </label>
          <textarea
            id="profil"
            value={profil}
            placeholder="Decription ..."
            onChange={(e) => setProfil(e.target.value)}
            className="resize-none block h-36 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
    </>
  );
};

FormProfil.propTypes = {
  nom: PropTypes.string.isRequired,
  setNom: PropTypes.func.isRequired,
  prenom: PropTypes.string.isRequired,
  setPrenom: PropTypes.func.isRequired,
  avatar: PropTypes.string.isRequired,
  setAvatar: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  tel: PropTypes.string.isRequired,
  setTel: PropTypes.func.isRequired,
  profil: PropTypes.string.isRequired,
  setProfil: PropTypes.func.isRequired,
};

export default FormProfil;
