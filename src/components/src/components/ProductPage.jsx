import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../firebase';
import { CartContext } from '../App.jsx';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProductById(id).then(setProduct).catch(console.error);
  }, [id]);

  if (!product) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <img
        src={product.image || '/assets/product_1.png'}
        alt={product.name}
        className="w-full h-80 object-cover rounded-xl"
      />
      <div>
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <div className="mt-2 text-xl font-bold text-famgreen">
          KES {Number(product.price || 0).toLocaleString()}
        </div>
        <p className="mt-4 text-sm text-gray-700">
          {product.description || 'Fresh farm produce supplied by local farmers.'}
        </p>
        <button
          onClick={() => addToCart(product, 1)}
          className="mt-6 bg-famgreen text-white px-4 py-2 rounded-md"
        >
          Add to cart
        </button>
      </div>
    </main>
  );
}
