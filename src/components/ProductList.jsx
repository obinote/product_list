import ProductCard from "./ProductCard";

const ProductList = (props) => {
  const { toggleDelete, toggleEdit, dataList } = props;
  const listProduct = dataList ?? [];
  return (
    <>
      <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
        {listProduct.map((user) => {
          return <ProductCard product={user} toggleDelete={toggleDelete} toggleEdit={toggleEdit} key={user.id}/>;
        })}
      </div>
    </>
  );
};

export default ProductList;
