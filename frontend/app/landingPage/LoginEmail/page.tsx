import React from 'react'
import styles from "./styles.module.css";
import Link from 'next/link';
const Login = () => {
    return (
        <div className={styles.center}>
         <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
            <div className="card bg-base-100 w-96 shadow-xl">
                <div className="card-body">
                    <div className="card-actions justify-center">
                        <div className='flex flex-col gap-4'>
                            <h1 className='card-title justify-center'>Log in to your account</h1>
                            <label className="input input-bordered flex items-center gap-2 btn-wide">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                    <path
                                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                </svg>
                                <input type="text" className="grow" placeholder="Email" />
                            </label>
                            <button className="btn btn-neutral btn-wide">Log in</button>
                            <p className={styles.label}><Link href="./LoginPhone">Use phone number insted</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login