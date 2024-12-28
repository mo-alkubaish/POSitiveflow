"use client";

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import DraftsNavbar from '../customer/store/DraftsNavbar';

export default function PaymentSuccess() {
  // 1. Use the hook to get the search params object
  const searchParams = useSearchParams();

  // 2. Retrieve your parameter by name
  const amount = searchParams.get('amount') || '0.00'; // Fallback if null

  return (
    <div className="bg-gray-100 min-h-screen">
      <DraftsNavbar />
      <main className="max-w-6xl mx-auto p-10 text-black text-center border m-10 rounded-md bg-white shadow-md">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
          <h2 className="text-2xl">You successfully sent</h2>

          <div className="bg-gray-200 p-2 rounded-md text-black mt-5 text-4xl font-bold">
            ${amount}
          </div>

          <div className="mt-5">
            <Link href="/customer/store" passHref>
              <button className="px-6 py-2 bg-gray-500 hover:bg-gray-700 text-white font-bold rounded-md transition duration-300 ease-in-out">
                Shop More Deals
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
