import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="container flex items-center justify-between">
      <Link to={"/"} className="text-white text-[40px] font-bold">
        DEV MARKET 🛒{" "}
      </Link>
      <Link to={"/create"}>
        <button className="w-[60px] h-[50px] bg-gray-700 flex items-center justify-center rounded cursor-pointer">
          <FaShoppingCart color="white" fontSize={20} />
        </button>
      </Link>
    </div>
  );
};

export default Navbar;
