/*
 * Point d'entrée de l'application React, configurant Redux, le routing et la restauration de l'authentification
 */
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./index.css";
import store from "./redux/store";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import OrdersPage from "./components/OrdersPage";
import AdminAddProductPage from "./components/AdminAddProductPage";

// Configuration d'Axios pour les requêtes API avec gestion des tokens
axios.defaults.baseURL = "https://ecommerce-backend-1-znfo.onrender.com/api";
// axios.defaults.baseURL = "http://localhost:5000/api";
axios.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Composant pour restaurer l'authentification au chargement
const AppInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Vérifier le token et récupérer les infos utilisateur
          const response = await axios.get("/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          dispatch({
            type: "SET_USER",
            payload: { user: response.data.user, token },
          });
          // Récupérer le panier si connecté
          const cartResponse = await axios.get("/cart");
          dispatch({ type: "SET_CART", payload: cartResponse.data });
        } catch (error) {
          console.error(
            "Erreur lors de la restauration de l'authentification:",
            error
          );
          dispatch({ type: "CLEAR_USER" });
          dispatch({ type: "CLEAR_CART" });
          localStorage.removeItem("token");
        }
      }
    };
    restoreAuth();
  }, [dispatch]);

  return children;
};

// Composant principal définissant la structure de l'application
const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AppInitializer>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route
                path="/admin/add-product"
                element={<AdminAddProductPage />}
              />
            </Routes>
          </main>
          <Footer />
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </AppInitializer>
    </BrowserRouter>
  </Provider>
);

// Rendu de l'application dans le DOM
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
