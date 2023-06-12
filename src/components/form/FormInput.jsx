const FormInput = (props) => {
  const { label, name, isNumber, errorMessage, inputValue, handleChanges } = props;

  return (
    <>
      <div>
        <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
        <input
          type="text"
          name={name}
          id={name}
          placeholder={isNumber ? "1234" : label}
          autoComplete="off"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          value={inputValue}
          onChange={handleChanges}
        />
        {errorMessage ? <p className="text-sm text-red-400 dark:text-white">{errorMessage}</p> : null}
      </div>
    </>
  );
};

export default FormInput;
