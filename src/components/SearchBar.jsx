import { useFormik } from "formik";
import * as Yup from "yup";

const SearchBar = (props) => {
  const { onSearch } = props;

  const formik = useFormik({
    initialValues: {
      keywords: "",
    },
    validationSchema: Yup.object({
      keywords: Yup.string(),
    }),
    onSubmit: () => {
      onSearch(formik.values.keywords);
    },
  });

  return (
    <>
      <form className="" onSubmit={formik.handleSubmit}>
        <div className="flex items-start flex-col sm:flex-row">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="keywords"
              name="keywords"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Product Name"
              onChange={formik.handleChange}
              value={formik.values.keywords}
            />
          </div>
          <div className="relative w-full sm:w-40">
            <button
              type="submit"
              className="w-full text-center py-2.5 px-3 sm:ml-2 sm:mt-0 mt-2 text-sm font-medium text-white disabled:bg-gray-300 disabled:border-gray-300 bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SearchBar;
