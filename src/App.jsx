import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import DeleteConfirm from "./components/DeleteConfirm";
import AddForm from "./components/AddForm";
import SearchBar from "./components/SearchBar";
import PagNavigation from "./components/PagNavigation";

function App() {
  const [onDelete, setOnDelete] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [productId, setProductId] = useState();

  const toggleDelete = () => {
    setOnDelete((prev) => !prev);
  };

  const toggleAdd = () => {
    setAddMode((prev) => !prev);
  };

  const toggleEdit = (productId) => {
    setProductId(productId);
    setAddMode((prev) => !prev);
  };

  useEffect(() => {
    if (!addMode) {
      setProductId("");
    }
  }, [addMode]);

  return (
    <>
      <div className="p-4">
        <SearchBar />
        <PagNavigation />
        <div>
          <button
            onClick={toggleAdd}
            title="Contact Sale"
            className="fixed z-90 bottom-10 right-8 bg-blue-600 w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-blue-700 hover:drop-shadow-2xl"
          >
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </button>
          <div>
            <ProductList toggleDelete={toggleDelete} toggleEdit={toggleEdit} />
          </div>
        </div>
        <PagNavigation />
        <DeleteConfirm onDelete={onDelete} toggleDelete={toggleDelete} />
        <AddForm onAdd={toggleAdd} addMode={addMode} productId={productId} />
      </div>
    </>
  );
}

export default App;
