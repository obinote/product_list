import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import DeleteConfirm from "./components/DeleteConfirm";
import AddForm from "./components/AddForm";
import SearchBar from "./components/SearchBar";
import PagNavigation from "./components/PagNavigation";

function App() {
  const [onDelete, setOnDelete] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [product, setProduct] = useState({});
  const [token, setToken] = useState("");
  const [cPage, setCPage] = useState(1);
  const [dataList, setDataList] = useState([]);
  const [keyword, setKeyword] = useState("");

  const toggleDelete = () => {
    setOnDelete((prev) => !prev);
  };

  const toggleAdd = () => {
    setAddMode((prev) => !prev);
  };

  const toggleEdit = (product) => {
    setProduct(product);
    setAddMode((prev) => !prev);
  };

  const getToken = () => {
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "kminchelle",
        password: "0lelplR",
      }),
    })
      .then((res) => res.json())
      .then((data) => setToken(data.token));
  };

  useEffect(() => {
    if (token) {
      fetch(`https://reqres.in/api/users?page=${cPage}`)
        .then((response) => response.json())
        .then((json) => {
          if (json.data) {
            setDataList(json.data);
          }
        });
    }
  }, [token, cPage]);

  useEffect(() => {
    if (!addMode) {
      setProduct({});
    }
  }, [addMode]);

  const onSearch = (value) => {
    setKeyword(value);
  };
  const filtered = dataList.filter((obj) => {
    if (keyword) {
      return obj.first_name.toLowerCase().includes(keyword.toLowerCase());
    } else {
      return obj
    }
  });

  return (
    <>
      {!token && (
        <div className="flex justify-center items-center h-screen">
          <button
            onClick={getToken}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
        </div>
      )}
      {token && (
        <div className="p-4">
          <SearchBar onSearch={onSearch}/>
          <PagNavigation
            prevPage={() => {
              setCPage((prev) => (prev === 1 ? prev : prev - 1));
            }}
            nextPage={() => {
              setCPage((prev) => (prev === dataList.total_pages ? prev : prev + 1));
            }}
          />
          <div>
            <button
              onClick={toggleAdd}
              title="Add Product"
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
              <ProductList toggleDelete={toggleDelete} toggleEdit={toggleEdit} dataList={filtered} />
            </div>
          </div>
          <PagNavigation
            prevPage={() => {
              setCPage((prev) => prev - 1);
            }}
            nextPage={() => {
              setCPage((prev) => prev + 1);
            }}
          />
          <DeleteConfirm onDelete={onDelete} toggleDelete={toggleDelete} />
          <AddForm onAdd={toggleAdd} addMode={addMode} product={product} />
        </div>
      )}
    </>
  );
}

export default App;
