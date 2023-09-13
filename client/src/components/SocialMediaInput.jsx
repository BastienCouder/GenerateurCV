import PropTypes from "prop-types";

const SocialMediaInput = ({ network, icon, value, onChange }) => {
  return (
    <div className="relative sm:w-1/2">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
        <span className="text-white text-xl">{icon}</span>
      </div>
      <input
        type="text"
        placeholder={`${network}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  );
};

SocialMediaInput.propTypes = {
  network: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default SocialMediaInput;
