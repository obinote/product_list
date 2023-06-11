import ProductCard from "./ProductCard";

const ProductList = (props) => {
  const { toggleDelete, toggleEdit } = props;
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
        <ProductCard imgSrc="" toggleDelete={toggleDelete} toggleEdit={toggleEdit}/>
        <ProductCard imgSrc="" toggleDelete={toggleDelete} toggleEdit={toggleEdit}/>
        <ProductCard imgSrc="" toggleDelete={toggleDelete} toggleEdit={toggleEdit}/>
        <ProductCard imgSrc="" toggleDelete={toggleDelete} toggleEdit={toggleEdit}/>
        <ProductCard imgSrc="" toggleDelete={toggleDelete} toggleEdit={toggleEdit}/>
        <ProductCard imgSrc="" toggleDelete={toggleDelete} toggleEdit={toggleEdit}/>
      </div>
    </>
  );
};

export default ProductList;
