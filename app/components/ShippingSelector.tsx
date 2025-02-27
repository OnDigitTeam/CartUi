import { useState } from "react";
import { useFetcher } from "@remix-run/react";

export default function ShippingSelector({ shippingRates }) {
  const fetcher = useFetcher();
  const [selectedMethod, setSelectedMethod] = useState(shippingRates[0]?.id);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetcher.submit(
      { shipping_method: selectedMethod },
      { method: "post", action: "/cart" }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
      <h3 className="text-lg font-semibold">Select Shipping Method</h3>
      {shippingRates.map((rate) => (
        <label key={rate.id} className="flex items-center space-x-2">
          <input
            type="radio"
            name="shipping_method"
            value={rate.id}
            checked={selectedMethod === rate.id}
            onChange={() => setSelectedMethod(rate.id)}
          />
          <span>{rate.name} - {rate.price}</span>
        </label>
      ))}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Save
      </button>
    </form>
  );
}