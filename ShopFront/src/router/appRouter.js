import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateProduct from "../pages/createProduct";
import EditProduct from "../pages/editProduct";
import Login from "../pages/login";
import Store from "../pages/store";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/edit-product" element={<EditProduct />} />
      <Route path="/create-product" element={<CreateProduct />} />
      <Route path="/login" element={<Login />} />
      <Route path="/store" element={<Store />} />
    </Routes>
  );
};

export default AppRouter;
