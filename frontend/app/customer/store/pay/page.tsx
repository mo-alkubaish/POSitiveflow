"use client";

import React from 'react';
import convertToSubcurrency from '@/lib/convertToSubcurrency';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutPage from '../../../components/CheckoutPage';
import DraftsNavbar from '../DraftsNavbar';

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Home() {
  const amount = 49.99;

  return (
    <div className="bg-gray-100 min-h-screen">
      <DraftsNavbar />
      <div className="p-4 md:p-8 flex flex-col justify-between space-y-4 md:space-y-0 bg-gray-100">
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Main content section */}
        <div className="w-full bg-white p-4 rounded-lg shadow-md">
          <div className="mb-4 text-center">
            <h1 className="text-4xl font-extrabold mb-2">POSitiveFlow</h1>
            <h2 className="text-2xl">
              has requested
              <span className="font-bold"> ${amount}</span>
            </h2>
          </div>

          <Elements stripe={stripePromise} options={{
            mode: 'payment',
            amount: convertToSubcurrency(amount),
            currency: 'usd',
          }}>
            <CheckoutPage amount={amount} />
          </Elements>
        </div>
      </div>
    </div>
  );
}
