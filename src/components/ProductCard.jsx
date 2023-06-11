import imgDefault from "../assets/images/default_img.png";

const ProductCard = (props) => {
  const { myImg, toggleDelete, toggleEdit } = props;
  return (
    <>
      <div className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-center h-52 w-auto">
          <img className="p-8 rounded-t-lg" src={myImg || imgDefault} alt="product image" />
        </div>
        <div className="px-5 pb-5">
          <a href="#">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
            </h5>
          </a>
          <div className="flex flex-col pt-2">
            <p className="text-base flex justify-between mb-2 text-gray-900 dark:text-white">
              <span className="font-normal">Harga Beli</span> <span className="font-semibold">$599</span>
            </p>
            <p className="text-base flex justify-between mb-2 text-gray-900 dark:text-white">
              <span className="font-normal">Harga Jual</span> <span className="font-semibold">$599</span>
            </p>
            <p className="text-base flex justify-between mb-2 text-gray-900 dark:text-white">
              <span className="font-normal">Jumlah Stok</span> <span className="font-semibold">599</span>
            </p>
            <button
              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-2"
              type="button"
              onClick={() => toggleEdit("x")}
            >
              Edit
            </button>
            <button
              className="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              type="button"
              onClick={toggleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
