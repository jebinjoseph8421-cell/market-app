import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Add from "./components/AddProduct.jsx";
import All from "./components/AllProducts.jsx";
import View from "./components/ViewDetails.jsx";
import Navbar from "./components/Navbar.jsx";
import Cart from "./components/Cart.jsx";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/all" element={<All />} />
          <Route path="/add" element={<Add />} />
          <Route path="/view/:id" element={<View />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
