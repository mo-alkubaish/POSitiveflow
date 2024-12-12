"use client";


import React, { useState } from 'react';
import styles from "./styles.module.css";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Static list of users for authentication
const users = [
    {
      "id": 1,
      "name": "Lionel Messi",
      "phone": "(966) 555-0222",
      "email": "messi@icloud.com",
      "password": "1234",
      "job": "cashier"
    },
    {
      "id": 2,
      "name": "Cristiano Ronaldo",
      "phone": "(966) 555-0333",
      "email": "ronaldo@icloud.com",
      "password": "1234",
      "job": "store owner"
    },
    {
      "id": 3,
      "name": "Kylian Mbappé",
      "phone": "(966) 555-0444",
      "email": "mbappe@icloud.com",
      "password": "1234",
      "job": "inventory manager"
    },
    {
      "id": 4,
      "name": "Jude Bellingham",
      "phone": "(966) 555-0555",
      "email": "bellingham@icloud.com",
      "password": "1234",
      "job": "customer"
    }
  ];
  

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        const user = users.find(user => user.phone === phoneNumber && user.password === password);
        if (user) {
            // Navigate based on user job
            switch (user.job) {
                case 'store owner':
                    router.push('/admin/dashboard');
                    break;
                case 'cashier':
                    router.push('/cashier/items');
                    break;
                case 'inventory manager':
                    router.push('/inventory');
                    break;
                case 'customer':
                    router.push('/customer');
                    break;
                default:
                    alert('No suitable role found.');
                    break;
            }
        } else {
            alert('Invalid credentials or user not found.');
        }
    };

    return (
        <div className={styles.center}>
            <div className="card bg-base-100 w-96 shadow-xl">
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
                <div className="card-body">
                    <div className="flex items-center justify-center py-4 w-full px-4 lg:px-0">
                        <div className="flex items-center space-x-2 text-lg font-bold">
                            <img src="/logo.png" alt="PositiveFlow Logo" className="w-8 h-auto" />
                            <Link href="/" className="flex items-center">
                                <span className="text-green-700">POS</span>
                                <span className="text-black">itiveFlow</span>
                            </Link>
                        </div>
                    </div>
                    <div className="card-actions justify-center">
                        <div className='flex flex-col gap-4'>
                            <h1 className='card-title justify-center text-black'>Log in to your account</h1>
                            <form onSubmit={handleLogin} className='flex flex-col gap-4'>
                                <label className="input input-bordered flex items-center gap-2 btn-wide">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="black"
                                        className="h-4 w-4 opacity-70">
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                    </svg>
                                    <input
                                        type="text"
                                        className="grow text-black"
                                        placeholder="Phone number"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </label>
                                <label className="input input-bordered flex items-center gap-2 btn-wide">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="black"
                                        className="h-4 w-4 opacity-70">
                                        <path fillRule="evenodd" d="M8 2a4 4 0 00-4 4v2a4 4 0 000 8h8a4 4 0 000-8V6a4 4 0 00-4-4zm2 6v2a2 2 0 11-4 0V8a2 2 0 114 0z"/>
                                    </svg>
                                    <input
                                        type="password"
                                        className="grow text-black"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </label>
                                <button type="submit" className="btn btn-success btn-wide">Log in</button>
                            </form>
                            <p className={styles.label}><Link href="./LoginEmail">Use email instead</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
