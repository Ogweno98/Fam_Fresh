import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../firebase';

export default function Home({ searchValue }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(setProducts).catch(console.error);
  }, []);

  const q = (searchValue || '').toLowerCase();
  const filtered = products.filter(p =>
    (p.name || '').toLowerCase().includes(q)
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <section className="bg-gradient-to-r from-famgreen to-famgold text-white rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-semibold">
            Fresh from farm to your doorstep
          </h1>
          <p className="mt-2 text-sm md:text-base">
            Support local farmers and get quality produce, grains and more —
            all in one place.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Popular categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['Fruits & Veggies', 'Cereals', 'Roots & Tubers', 'Commodities'].map(
            c => (
              <Link
                key={c}
                to={`/category/${encodeURIComponent(c)}`}
                className="bg-white border rounded-lg px-3 py-4 text-sm shadow-sm hover:shadow-md transition"
              >
                {c}
              </Link>
            )
          )}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">All products</h2>
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-600">
            No products found. Add some in Firestore under <code>products</code>.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map(p => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-2 flex flex-col"
              >
                <img
                  src={p.image || '/assets/product_1.png'}
                  alt={p.name}
                  className="h-28 w-full object-cover rounded-md"
                />
                <div className="mt-2 text-xs text-gray-600">{p.category}</div>
                <div className="mt-1 text-sm font-medium line-clamp-2">
                  {p.name}
                </div>
                <div className="mt-1 text-sm font-bold text-famgreen">
                  KES {Number(p.price || 0).toLocaleString()}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
