import React from "react";

function AmountSelector({ price, setPrice }) {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium">Select Amount:</label>
      <select
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="form-select block w-full"
      >
        <option value="" disabled>
          -- Select Amount --
        </option>
        <option value="500">5.00</option>
        <option value="1000">10.00</option>
        <option value="2000">20.00</option>
      </select>
    </div>
  );
}

export default AmountSelector;
