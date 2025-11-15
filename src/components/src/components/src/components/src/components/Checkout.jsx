import React, { useContext, useState } from 'react';
import { CartContext } from '../App.jsx';
import { auth, createOrder, markOrderPaid } from '../firebase';
import startInlinePayment from './PaymentsInline.js';

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const user = auth.currentUser;

  const total = cart.reduce(
    (sum, item) => sum + Number(item.product.price || 0) * item.qty,
    0
  );

  async function handlePlaceOrder() {
    if (!user) {
      alert('Please sign in via Firebase Authentication first.');
      return;
    }
    if (!address || !phone) {
      alert('Please enter address and phone.');
      return;
    }

    const items = cart.map(item => ({
      productId: item.product.id,
      qty: item.qty,
      price: Number(item.product.price || 0)
    }));

    const orderId = await createOrder({
      userId: user.uid,
      items,
      total,
      address,
      phone
    });

    startInlinePayment({
      amount: total,
      currency: 'KES',
      tx_ref: orderId,
      customer: { email: user.email, phone_number: phone },
      onSuccess: async data => {
        await markOrderPaid(orderId, data);
        clearCart();
        alert('Payment successful & order placed.');
      },
      onError: err => {
        console.error(err);
        alert('Payment failed or cancelled.');
      }
    });
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold mb-4">Checkout</h1>
      <div className="space-y-3">
        <input
          value={address}
          onChange={e => setAddress(e.target.value)}
          placeholder="Delivery address"
          className="w-full border rounded px-3 py-2 text-sm"
        />
        <input
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Phone number"
          className="w-full border rounded px-3 py-2 text-sm"
        />
      </div>
      <div className="mt-4 text-sm">
        <div className="flex justify-between">
          <span>Order total</span>
          <span className="font-semibold">
            KES {total.toLocaleString()}
          </span>
        </div>
      </div>
      <button
        onClick={handlePlaceOrder}
        className="mt-4 bg-famgreen text-white px-4 py-2 rounded-md"
      >
        Pay KES {total.toLocaleString()}
      </button>
    </main>
  );
}
