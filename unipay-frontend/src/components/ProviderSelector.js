import React from "react";

function ProviderSelector({
  availableProviders,
  selectedProvider,
  setSelectedProvider,
}) {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Select a Payment Provider:</h3>
      <ul>
        {availableProviders.map((provider) => (
          <li key={provider} className="mb-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value={provider}
                checked={selectedProvider === provider}
                onChange={(e) => setSelectedProvider(e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">{provider}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProviderSelector;
