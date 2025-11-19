import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export default function SellerDashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    description: ''
  });

  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, 'products'));
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }
    load();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      alert('Sign in as seller/admin first.');
      return;
    }
    const data = {
      ...form,
      price: Number(form.price || 0),
      sellerId: user.uid
    };
    await addDoc(collection(db, 'products'), data);
    alert('Product added');
    setForm({ name: '', price: '', category: '', image: '', description: '' });
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <section>
        <h1 className="text-xl font-semibold mb-3">Add product</h1>
        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          <input
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="Name"
            className="w-full border rounded px-3 py-2"
          />
          <input
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
            placeholder="Price"
            className="w-full border rounded px-3 py-2"
          />
          <input
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            placeholder="Category"
            className="w-full border rounded px-3 py-2"
          />
          <input
            value={form.image}
            onChange={e => setForm({ ...form, image: e.target.value })}
            placeholder="Image URL"
            className="w-full border rounded px-3 py-2"
          />
          <textarea
            value={form.description}
            onChange={e =>
              setForm({ ...form, description: e.target.value })
            }
            placeholder="Description"
            className="w-full border rounded px-3 py-2"
          />
          <button
            type="submit"
            className="bg-famgreen text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
        </form>
      </section>
      <section>
        <h1 className="text-xl font-semibold mb-3">Your products</h1>
        <div className="space-y-2 text-sm">
          {products.map(p => (
            <div
              key={p.id}
              className="bg-white rounded-lg shadow-sm p-2 flex justify-between"
            >
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-xs text-gray-600">
                  KES {Number(p.price || 0).toLocaleString()} • {p.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
