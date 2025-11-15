import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../App.jsx';

export default function CartPage() {
  const { cart, updateQty, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.product.price || 0) * item.qty,
    0
  );

  if (cart.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-xl font-semibold mb-3">Your cart</h1>
        <p className="text-sm">
          Cart is empty.{' '}
          <Link to="/" className="text-famgreen">
            Shop now
          </Link>
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <section className="md:col-span-2 space-y-3">
        {cart.map(item => (
          <div
            key={item.product.id}
            className="bg-white rounded-lg shadow-sm p-3 flex gap-3"
          >
            <img
              src={item.product.image || '/assets/product_1.png'}
              alt={item.product.name}
              className="h-20 w-20 object-cover rounded-md"
            />
            <div className="flex-1">
              <div className="font-medium text-sm">{item.product.name}</div>
              <div className="text-xs text-gray-600 mt-1">
                KES {Number(item.product.price || 0).toLocaleString()}
              </div>
              <div className="mt-2 flex items-center gap-2 text-xs">
                <button
                  onClick={() => updateQty(item.product.id, item.qty - 1)}
                  className="border px-2 rounded"
                >
                  -
                </button>
                <span>{item.qty}</span>
                <button
                  onClick={() => updateQty(item.product.id, item.qty + 1)}
                  className="border px-2 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="ml-4 text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      <aside className="bg-white rounded-lg shadow-sm p-4 text-sm">
        <h2 className="font-semibold mb-2">Order summary</h2>
        <div className="flex justify-between mt-2">
          <span>Subtotal</span>
          <span className="font-semibold">
            KES {subtotal.toLocaleString()}
          </span>
        </div>
        <button
          onClick={() => navigate('/checkout')}
          className="mt-4 w-full bg-famgreen text-white py-2 rounded-md"
        >
          Proceed to checkout
        </button>
      </aside>
    </main>
  );
}
