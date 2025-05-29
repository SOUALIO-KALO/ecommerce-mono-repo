/*
 * Page de paiement avec intégration Stripe et formulaire de livraison
 */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import axios from "axios";

// Initialisation de Stripe avec la clé publique
const stripePromise = loadStripe(
  "pk_test_51RMA3JD5A2gpvkHvgLTSsxUzCxjcOER5nYY5hTAn8LKD6R5bmtsXGYYsx3YUnzG1XkscBmLMMmUPrMvSP6ILOzk6002bu266Kj"
);

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { items } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    postalCode: "",
  });

  // Soumission du formulaire de paiement
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    try {
      const { paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      const response = await axios.post("/orders", {
        paymentMethodId: paymentMethod.id,
      });

      if (response.data.paymentIntent.status === "succeeded") {
        dispatch({ type: "CLEAR_CART" });
        toast.success("Commande passée avec succès !");
        navigate("/orders");
      } else {
        // Gérer les actions supplémentaires requises
        const { error: confirmError } = await stripe.confirmCardPayment(
          response.data.paymentIntent.client_secret
        );

        if (confirmError) {
          toast.error(confirmError.message);
        } else {
          dispatch({ type: "CLEAR_CART" });
          toast.success("Commande passée avec succès !");
          navigate("/orders");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Erreur lors du paiement");
    } finally {
      setLoading(false);
    }
  };

  // Calcul du total du panier
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Adresse</label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          className="w-full border p-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Ville</label>
        <input
          type="text"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Code postal</label>
        <input
          type="text"
          value={formData.postalCode}
          onChange={(e) =>
            setFormData({ ...formData, postalCode: e.target.value })
          }
          className="w-full border p-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Carte bancaire</label>
        <CardElement className="border p-2 rounded" />
      </div>
      <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
        disabled={!stripe || loading}
      >
        {loading ? "Traitement en cours..." : "Payer"}
      </button>
    </form>
  );
};

const CheckoutPage = () => (
  <div className="container mx-auto p-4 max-w-md">
    <h2 className="text-2xl font-bold mb-4">Paiement</h2>
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  </div>
);

export default CheckoutPage;
