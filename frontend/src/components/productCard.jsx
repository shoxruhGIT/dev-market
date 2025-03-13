import axios from "axios";
import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  deleteProduct,
  updateProduct,
} from "../slice/product";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const { name, price, image, _id } = product;
  const [updatedProduct, setUpdateProduct] = useState(product);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  const handleDeleteProduct = async () => {
    try {
      const response = await axios.delete(`/api/products/${_id}`);
      if (!response.data.success)
        return { success: false, message: response.data.message };
      dispatch(deleteProduct(_id));
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.log(error.message, "delete product");
      toast.error("Error deleting product!");
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/products/${_id}`, updatedProduct);
      dispatch(updateProduct({ _id, updatedProduct: response.data.data }));
      setOpenModal(false);
      toast.success("Product updated successfully!");
      console.log(response);
    } catch (error) {
      console.log(error.message, "error updating product");
      toast.error("Error updating product");
    }
  };

  return (
    <>
      <div className="container max-w-[350px] bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden p-8">
        <img src={image} alt={name} className="w-full h-48 object-cover" />

        <div className="product-info h-[140px] gap-2 flex flex-col">
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-gray-400 text-lg font-bold">${price}</p>

          <div className="mt-4 flex gap-2">
            <button
              onClick={handleOpenModal}
              className="flex items-center justify-center w-[40px] h-[40px] bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
            >
              <FaRegEdit />
            </button>
            <button
              onClick={handleDeleteProduct}
              className="flex items-center justify-center w-[40px] h-[40px] bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer"
            >
              <MdDeleteOutline fontSize={20} />
            </button>
          </div>
        </div>
      </div>
      {openModal === true && (
        <div className="fixed inset-0 bg-gray-600/50 bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 h-[300px] flex flex-col items-center justify-center gap-[10px] text-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Update Product</h2>
            <form className="space-y-4 w-[90%] flex flex-col gap-[20px]">
              <input
                type="text"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdateProduct({ ...updatedProduct, name: e.target.value })
                }
                placeholder="Product Name"
                className="product-update__input w-full border border-gray-600 rounded bg-gray-700 text-white"
              />
              <input
                type="number"
                name="price"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdateProduct({ ...updatedProduct, price: e.target.value })
                }
                placeholder="Product Price"
                className="product-update__input w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
              />
              <input
                type="text"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdateProduct({ ...updatedProduct, image: e.target.value })
                }
                placeholder="Image URL"
                className="product-update__input w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
              />
              <div className="flex justify-end space-x-2 gap-[5px]">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="product-update__btn px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateProduct}
                  className="product-update__btn px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
