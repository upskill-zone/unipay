import React, { useState } from "react";

function Checkout() {
  const [session, setSession] = useState(null);
  const [availableProviders, setAvailableProviders] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState("");

  const createCheckoutSession = async () => {
    const response = await fetch(
      "http://localhost:3000/api/payments/checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price: 1000, currency: "USD" }),
      }
    );
    const data = await response.json();
    setSession(data);
    setAvailableProviders(data.map((ses) => ses.pgw));
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
      {!session && (
        <button
          onClick={createCheckoutSession}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Create Checkout Session
        </button>
      )}

      {session && (
        <div>
          <h3 className="text-lg font-semibold">Checkout Summary</h3>
          <p className="mb-4">
            {session.map((ses) => (
              <li key={ses} className="mb-2">
                Amount: {ses.amount / 100} {ses.currency}
              </li>
            ))}
          </p>

          <h3 className="text-lg font-semibold mb-2">
            Select a Payment Provider:
          </h3>
          <ul className="mb-4">
            {availableProviders.map((provider) => (
              <li key={provider} className="mb-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value={provider}
                    checked={selectedProvider === provider}
                    onChange={(e) => {
                      setSelectedProvider(e.target.value);
                    }}
                    className="form-radio"
                  />
                  <span className="ml-2">{provider}</span>
                </label>
              </li>
            ))}
          </ul>
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
