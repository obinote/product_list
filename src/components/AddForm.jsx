import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";

const AddForm = (props) => {
  const { onAdd, addMode, productId } = props;
  const fileRef = useRef(null);
  const [formReady, setFormReady] = useState(false);

  const validationSchema = Yup.object({
    product: Yup.string().required("Please enter product name"),
    purchasePrice: Yup.number("Only number input number").required("Please input product price"),
    sellingPrice: Yup.number("Only number input number").required("Please input product price"),
    stock: Yup.number("Only number input number").required("Please input product stock"),
    productImage: Yup.mixed()
      .test("is-file-too-big", "File exceeds 120KB", () => {
        let valid = true;
        const files = fileRef?.current?.files;
        if (files) {
          const fileArr = Array.from(files);
          fileArr.forEach((file) => {
            const size = file.size / 1024;
            if (size > 120) {
              valid = false;
            }
          });
        }
        return valid;
      })
      .test("is-file-of-correct-type", "File is not of supported type", () => {
        let valid = true;
        const files = fileRef?.current?.files;
        if (files) {
          const fileArr = Array.from(files);
          fileArr.forEach((file) => {
            const type = file.type.split("/")[1];
            const validTypes = ["png", "jpg"];
            if (!validTypes.includes(type)) {
              valid = false;
            }
          });
        }
        return valid;
      }),
  });

  const formik = useFormik({
    initialValues: {
      product: "",
      purchasePrice: "",
      sellingPrice: "",
      productImage: "",
      stock: "",
      loading: false,
      submited: false,
    },
    validationSchema,
    onSubmit: () => {
      console.log("submit");
      handleSaveProduct();
    },
  });

  const handleSaveProduct = () => {
    console.log(formik);
    console.log(fileRef.current);

    onAdd();
  };

  const handleChangesNumber = (e) => {
    console.log(e.target.value);
    if (Number(e.target.value) || !e.target.value) {
      formik.handleChange(e);
    } else {
      if (!formik.values[e.target.name]) {
        e.target.value = "";
        formik.handleChange(e);
      }
    }
  };

  const loadProduct = async (productId) => {
    await formik.resetForm();
    console.log(productId);
    setFormReady(true);
  };

  useEffect(() => {
    if (addMode && !productId) {
      setFormReady(true);
      formik.resetForm();
    } else if (addMode && productId) {
      loadProduct(productId);
    }
  }, [addMode, productId]);

  return (
    <>
      <div className={addMode && formReady ? "" : "hidden"}>
        <div
          id="authentication-modal"
          aria-hidden="true"
          className="fixed flex justify-center top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={onAdd}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  {productId ? "Update Product" : "Add New Product"}
                </h3>
                <form className="space-y-6" onSubmit={formik.handleSubmit}>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="product"
                      id="product"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Product Name"
                      autoComplete="off"
                      value={formik.values.product}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.product && formik.errors.product ? (
                      <p className="text-sm text-red-400 dark:text-white">{formik.errors.product}</p>
                    ) : null}
                  </div>
                  <div>
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="productImage"
                    >
                      Product Image
                    </label>
                    <input
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id="productImage"
                      type="file"
                      value={formik.values.productImage}
                      onChange={formik.handleChange}
                      ref={fileRef}
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="productImage_help">
                      PNG or JPG (MAX. 100KB).
                    </p>
                    {formik.touched.productImage && formik.errors.productImage ? (
                      <p className="text-sm text-red-400 dark:text-white">{formik.errors.productImage}</p>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Purchase Price
                    </label>
                    <input
                      type="text"
                      name="purchasePrice"
                      id="purchasePrice"
                      placeholder="1234"
                      autoComplete="off"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      value={formik.values.purchasePrice}
                      onChange={handleChangesNumber}
                    />
                    {formik.touched.purchasePrice && formik.errors.purchasePrice ? (
                      <p className="text-sm text-red-400 dark:text-white">{formik.errors.purchasePrice}</p>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Selling Price
                    </label>
                    <input
                      type="text"
                      name="sellingPrice"
                      id="sellingPrice"
                      placeholder="1234"
                      autoComplete="off"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      value={formik.values.sellingPrice}
                      onChange={handleChangesNumber}
                    />
                    {formik.touched.sellingPrice && formik.errors.sellingPrice ? (
                      <p className="text-sm text-red-400 dark:text-white">{formik.errors.sellingPrice}</p>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Stock
                    </label>
                    <input
                      type="text"
                      name="stock"
                      id="stock"
                      pattern="[0-9]*"
                      placeholder="1234"
                      autoComplete="off"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      value={formik.values.stock}
                      onChange={handleChangesNumber}
                    />
                    {formik.touched.stock && formik.errors.stock ? (
                      <p className="text-sm text-red-400 dark:text-white">{formik.errors.stock}</p>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {productId ? "Update" : "Save"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddForm;
