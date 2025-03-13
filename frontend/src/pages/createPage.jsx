import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../slice/product";
import { toast } from "react-hot-toast";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateProduct = async () => {
    try {
      const response = await axios.post("api/products", newProduct);
      console.log(response.data.success);
      dispatch(createProduct(newProduct));
      navigate("/");
      toast.success("Product added successfully!");
    } catch (error) {
      console.log(error.message, "error adding product");
      toast.error("Error adding product!");
    }

    setNewProduct({ name: "", price: "", image: "" });
  };

  return (
    <div className="container flex flex-col items-center gap-[20px]">
      <h1 className="text-white text-[36px] font-bold">Create New Product</h1>
      <div className="flex flex-col md:w-[500px] m-auto gap-[15px]">
        <input
          type="text"
          className="create-product__input bg-white py-1.5 pr-3 pl-1 appearance-none focus:outline-none sm:text-sm/6 rounded h-[50px]"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          type="number"
          className="create-product__input bg-white py-1.5 pr-3 pl-1 appearance-none focus:outline-none sm:text-sm/6 rounded h-[50px]"
          placeholder="Product Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <input
          type="text"
          className="create-product__input bg-white py-1.5 pr-3 pl-1 appearance-none focus:outline-none sm:text-sm/6 rounded h-[50px]"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) =>
            setNewProduct({ ...newProduct, image: e.target.value })
          }
        />

        <button
          onClick={handleCreateProduct}
          className="bg-blue-500 h-[50px] text-white text-[24px] font-semibold rounded cursor-pointer"
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default CreatePage;
