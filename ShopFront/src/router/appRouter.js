import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateProduct from "../pages/createProduct";
import EditProduct from "../pages/editProduct";
import Login from "../pages/login";
import Store from "../pages/store";
import Register from "../pages/register"
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/edit-product" element={<EditProduct />} />
      <Route path="/create-product" element={<CreateProduct />} />
      <Route path="/login" element={<Login />} />
      <Route path="/store" element={<Store />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRouter;
