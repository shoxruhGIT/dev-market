import React, { useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/productCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, startAddProduct } from "../slice/product";
import { Link } from "react-router-dom";
import Loader from "../components/loader";

const HomePage = () => {
  const dispatch = useDispatch();

  const { products, isLoading } = useSelector((state) => state.products);

  const getProducts = async () => {
    dispatch(startAddProduct());
    try {
      const response = await axios.get("/api/products");
      dispatch(fetchProducts(response.data.data));
    } catch (error) {
      console.log("error get data", error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="container flex flex-col gap-[30px] justify-center items-center">
        <p className="text-[36px] text-white font-bold">Current Products 🚀</p>
        {isLoading === true ? (
          <Loader />
        ) : (
          <div className="w-full grid xl:grid-cols-3 md:grid-cols-2 gap-4">
            {products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}

            {products.length === 0 && (
              <div className="flex items-center justify-center gap-2 font-bold text-center">
                <p className="text-white">No products found</p>
                <Link to={"/create"} className="text-sky-500">
                  Create a product
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
