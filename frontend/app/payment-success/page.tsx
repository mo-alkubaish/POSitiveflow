"use client";

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import DraftsNavbar from '../customer/store/DraftsNavbar';

// Separate component for the content that uses useSearchParams
function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount') || '0.00'; // Fallback if null

  return (
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
  );
}

export default function PaymentSuccess() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <DraftsNavbar />
      {/* Suspense boundary to handle async hooks */}
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentSuccessContent />
      </Suspense>
    </div>
  );
}
