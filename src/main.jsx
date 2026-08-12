import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App.jsx";

import Add from "./components/AddProduct.jsx";
import All from "./components/AllProducts.jsx";
import View from "./components/ViewDetails.jsx";
import Navbar from "./components/Navbar.jsx";
import Cart from "./components/Cart.jsx";
import Pro from "./components/Profile.jsx";
import My from "./components/MyProducts.jsx";

import In from "./Login/SignIn.jsx";
import Up from "./Login/SignUp.jsx";

import {
  BrowserRouter,
  Routes,
  Route,
  Outlet
} from "react-router-dom";

import {
  GoogleOAuthProvider
} from "@react-oauth/google";


// =====================================================
// LAYOUT
// NAVBAR + PAGE CONTENT
// =====================================================

function Layout() {

  return (

    <>
      <Navbar />

      <Outlet />
    </>

  );

}


// =====================================================
// GOOGLE CLIENT ID
// MUST MATCH application.properties
// =====================================================

const GOOGLE_CLIENT_ID =
  "193598475859-it881m1gmloh2oirk1ho66bgg2a7p0hc.apps.googleusercontent.com";


// =====================================================
// MAIN APPLICATION
// =====================================================

createRoot(
  document.getElementById("root")
).render(

  <StrictMode>

    {/* ==========================================
        GOOGLE OAUTH PROVIDER
    ========================================== */}

    <GoogleOAuthProvider
      clientId={GOOGLE_CLIENT_ID}
    >

      {/* ==========================================
          BROWSER ROUTER
      ========================================== */}

      <BrowserRouter>

        <Routes>


          {/* ==========================================
              LOGIN PAGE
              URL: /
          ========================================== */}

          <Route
            path="/"
            element={<In />}
          />


          {/* ==========================================
              SIGNUP PAGE
              URL: /signup
          ========================================== */}

          <Route
            path="/signup"
            element={<Up />}
          />


          {/* ==========================================
              MAIN LAYOUT
              NAVBAR IS SHOWN HERE
          ========================================== */}

          <Route
            element={<Layout />}
          >


            {/* ==========================================
                HOME
                URL: /home
            ========================================== */}

            <Route
              path="/home"
              element={<App />}
            />


            {/* ==========================================
                ALL PRODUCTS
                URL: /all
            ========================================== */}

            <Route
              path="/all"
              element={<All />}
            />


            {/* ==========================================
                ADD PRODUCT
                URL: /add
            ========================================== */}

            <Route
              path="/add"
              element={<Add />}
            />


            {/* ==========================================
                VIEW PRODUCT
                URL: /view/:id
            ========================================== */}

            <Route
              path="/view/:id"
              element={<View />}
            />


            {/* ==========================================
                CART
                URL: /cart
            ========================================== */}

            <Route
              path="/cart"
              element={<Cart />}
            />


            {/* ==========================================
                MY PRODUCTS
                URL: /my
            ========================================== */}

            <Route
              path="/my"
              element={<My />}
            />


            {/* ==========================================
                PROFILE
                URL: /profile
            ========================================== */}

            <Route
              path="/profile"
              element={<Pro />}
            />


          </Route>

        </Routes>

      </BrowserRouter>

    </GoogleOAuthProvider>

  </StrictMode>

);