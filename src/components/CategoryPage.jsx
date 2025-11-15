import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProducts } from '../firebase';

export default function CategoryPage() {
  const { name } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then(all =>
        setItems(all.filter(p => (p.category || '') === decodeURIComponent(name)))
      )
      .catch(console.error);
  }, [name]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">
        {decodeURIComponent(name)}
      </h1>
      {items.length === 0 ? (
        <p className="text-sm text-gray-600">
          No items found in this category yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map(p => (
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
    </main>
  );
}
