import { json, LoaderFunction, ActionFunction } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import ShippingSelector from "~/components/ShippingSelector";

export let loader: LoaderFunction = async () => {
  const cartRes = await fetch("https://your-shopify-store.com/cart.js");
  const cart = await cartRes.json();

  const shippingRates = [
    { id: "standard", name: "Standard Shipping", price: "$5.00" },
    { id: "express", name: "Express Shipping", price: "$15.00" },
  ];

  return json({ cart, shippingRates });
};

export let action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  let shippingMethod = formData.get("shipping_method");

  await fetch("https://your-shopify-store.com/cart/update.js", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ attributes: { shipping_method: shippingMethod } }),
  });

  return json({ success: true });
};

export default function CartPage() {
  let { cart, shippingRates } = useLoaderData();

  return (
    <div>
      <h1 className="text-2xl font-bold">Your Cart</h1>
      <ShippingSelector shippingRates={shippingRates} />
    </div>
  );
}