"use client";

import React, { Suspense } from 'react';
import convertToSubcurrency from '@/lib/convertToSubcurrency';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutPage from '../../../components/CheckoutPage';
import DraftsNavbar from '../DraftsNavbar';
import { useSearchParams } from 'next/navigation';

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

// Component that uses useSearchParams
function HomeContent() {
  const searchParams = useSearchParams();
  const queryTotal = searchParams.get('total');

  // Fallback to 49.99 if not provided
  const amount = queryTotal ? parseFloat(queryTotal) : 49.99;

  return (
    <div className="p-4 md:p-8 flex flex-col justify-between space-y-4 md:space-y-0 bg-gray-100">
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Main content section */}
      <div className="w-full bg-white p-4 rounded-lg shadow-md">
        <div className="mb-4 text-center">
          <h1 className="text-4xl font-extrabold mb-2">
            <span className="text-success">POS</span>itiveFlow
          </h1>
          <h2 className="text-2xl">
            has requested
            <span className="font-bold"> ${amount}</span>
          </h2>
        </div>

        <Elements
          stripe={stripePromise}
          options={{
            mode: 'payment',
            amount: convertToSubcurrency(amount), // ensure convertToSubcurrency converts dollars to cents
            currency: 'usd',
          }}
        >
          <CheckoutPage amount={amount} />
        </Elements>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <DraftsNavbar />
      {/* Wrap HomeContent in a Suspense boundary */}
      <Suspense fallback={<div>Loading...</div>}>
        <HomeContent />
      </Suspense>
    </div>
  );
}
