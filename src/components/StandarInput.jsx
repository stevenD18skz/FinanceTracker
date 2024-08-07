import PropTypes from "prop-types";

export default function StandarInput({
  titulo,
  dato,
  handleChange,
  type,
  isRequired = true,
}) {
  return (
    <>
      <label
        className="mt-4 block text-sm font-medium text-gray-900 dark:text-gray-200"
        htmlFor={titulo}
      >
        <p className="capitalize">{titulo}</p>
        <input
          type={type}
          name={titulo}
          id={titulo}
          value={dato}
          onChange={handleChange}
          placeholder="Type product name"
          required={isRequired}
          className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
        />
      </label>
    </>
  );
}

StandarInput.propTypes = {
  titulo: PropTypes.string.isRequired,
  dato: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
};
