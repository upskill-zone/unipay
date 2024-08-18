import React from "react";

function CurrencySelector({ currency, setCurrency }) {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium">Select Currency:</label>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="form-select block w-full"
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="INR">INR</option>
      </select>
    </div>
  );
}

export default CurrencySelector;
