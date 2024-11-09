import React from 'react'
import Image from 'next/image'
import logo from "../logo/logo1.png"
import styles from "./styles.module.css";
import Link from 'next/link';

const Login = () => {
    return (
        <div className={styles.center}>
            <div className="card bg-base-100 w-96 shadow-xl">
                <div className="card-body">
                    <div className="card-actions justify-center">
                        <div className='flex flex-col gap-4'>
                            <Image src={logo} alt={"not found"} width={200} height={200} className={styles.logo}/>
                            <h1 className='card-title justify-center'>Log in to your account</h1>
                            <label className="input input-bordered flex items-center gap-2 btn-wide">
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
                            <button className="btn btn-neutral btn-wide">Log in</button>
                            <p className={styles.label}><Link href="./LoginEmail">Use email insted</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login