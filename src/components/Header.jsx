import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header({ searchValue, setSearchValue, user }) {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <img
            src="/assets/famfresh-logo.svg"
            alt="FamFresh"
            className="w-32 h-auto"
          />
        </div>

        <div className="flex-1 hidden md:block">
          <input
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            placeholder="Search for fresh produce, grains, vegetables..."
            className="w-full border rounded-full px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-famgreen"
          />
        </div>

        <div className="flex items-center gap-4 text-sm">
          {user ? (
            <span className="hidden md:inline">Hi, {user.email}</span>
          ) : (
            <span className="hidden md:inline text-gray-600">
              Welcome to FamFresh
            </span>
          )}
          <Link
            to="/cart"
            className="flex items-center gap-1 bg-famgreen text-white px-3 py-2 rounded-md text-xs md:text-sm"
          >
            <span>Cart</span>
          </Link>
        </div>
      </div>

      <div className="bg-famgreen/10 text-xs text-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-1 flex justify-between">
          <span>Deliveries across Kenya</span>
          <span>Powered by JOMPO Digital Solutions</span>
        </div>
      </div>
    </header>
  );
}
