import React from "react";

function CheckoutSummary({ session }) {
  return (
    <div>
      <h3 className="text-lg font-semibold">Checkout Summary</h3>
      <p className="mb-4">
        Amount: {session[0]?.amount / 1000} {session[0]?.currency}
      </p>
    </div>
  );
}

export default CheckoutSummary;
