import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-8">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        <div>
          <h3 className="font-semibold">FamFresh</h3>
          <p className="mt-2 text-gray-400">
            Connecting farmers and buyers across Kenya. Powered by JOMPO
            Digital Solutions.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Categories</h3>
          <ul className="mt-2 space-y-1 text-gray-400">
            <li>Fruits &amp; Veggies</li>
            <li>Cereals</li>
            <li>Roots &amp; Tubers</li>
            <li>Commodities</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Support</h3>
          <p className="mt-2 text-gray-400">
            Email: support@jompo.org
            <br />
            Phone: +254 700 000 000
          </p>
        </div>
      </div>
      <div className="border-t border-gray-800 py-3 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} FamFresh – Powered by JOMPO Digital
        Solutions.
      </div>
    </footer>
  );
}
