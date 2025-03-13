import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import CreatePage from "./pages/createPage";
import Navbar from "./components/navbar";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="h-[100vh] xl:min-w-[1320px] lg:min-w-[1000px]">
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </div>
  );
};

export default App;
