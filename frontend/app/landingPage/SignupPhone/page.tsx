import React from 'react'
import styles from "./styles.module.css";
import Link from 'next/link';
const signup = () => {
    return (
        <div className={styles.center}>
                                  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
            <div className="card bg-base-100 w-96 shadow-xl">
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
                            <h1 className='card-title justify-center'>Fill your information</h1>
                            <label className="input input-bordered flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                </svg>
                                <input type="text" className="grow" placeholder="Name" />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                </svg>
                                <input type="text" className="grow" placeholder="Phone number" />
                            </label>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                <input type="checkbox" defaultChecked className="checkbox" />
                                    <p className={styles.label1}>I'd like to receive promotional offers and updates via Whatsapp</p>
                                </label>
                            </div>
                            <Link href="/">
                            <button className="btn btn-success btn-wide">Request a Quote</button>
                            </Link>
                            <p className={styles.label}><Link href="./SignupEmail">Use email insted</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default signup