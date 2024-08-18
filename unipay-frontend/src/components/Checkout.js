import React, { useState } from "react";
import AmountSelector from "./AmountSelector";
import CurrencySelector from "./CurrencySelector";
import ProviderSelector from "./ProviderSelector";
import CheckoutSummary from "./CheckoutSummary";

function Checkout() {
  const [session, setSession] = useState([]);
  const [availableProviders, setAvailableProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [state, setState] = useState("checkoutSession");

  const createCheckoutSession = async () => {
    if (!price || !currency) {
      alert("Please select an amount and currency.");
      return;
    }

    const response = await fetch(
      "http://localhost:3000/api/payments/checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price: parseFloat(price), currency }),
      }
    );
    const data = await response.json();
    setSession(data);
    setAvailableProviders(data.map((ses) => ses.pgw));
    setState("initiatePayment");
  };

  const initiatePayment = async () => {
    if (!selectedProvider) {
      alert("Please select a payment provider");
      return;
    }

    const response = await fetch(
      "http://localhost:3000/api/payments/initiate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          providerName: selectedProvider,
          sessionId: session.find((ses) => ses.pgw === selectedProvider).id,
        }),
      }
    );

    const data = await response.json();
    console.log("Payment initiated:", data);
  };

  return (
    <div className="p-4">
      {state === "checkoutSession" && (
        <div>
          <AmountSelector price={price} setPrice={setPrice} />
          <CurrencySelector currency={currency} setCurrency={setCurrency} />
          <button
            onClick={createCheckoutSession}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          >
            Create Checkout Session
          </button>
        </div>
      )}

      {state === "initiatePayment" && (
        <div>
          <CheckoutSummary session={session} />
          <ProviderSelector
            availableProviders={availableProviders}
            selectedProvider={selectedProvider}
            setSelectedProvider={setSelectedProvider}
          />
          <button
            onClick={initiatePayment}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Initiate Payment
          </button>
        </div>
      )}
    </div>
  );
}

export default Checkout;
