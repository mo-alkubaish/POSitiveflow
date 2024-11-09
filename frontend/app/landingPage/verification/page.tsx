import React from 'react'
import styles from "./styles.module.css";
const  verification= () => {
    return (
        <div className={styles.center}>
            <div className="card bg-base-100 w-96 shadow-xl">
                <div className="card-body">
                    <div className="card-actions justify-center">
                        <div className='flex flex-col gap-4'>
                            <h1 className='card-title justify-center'>Verify Your Code</h1>
                                <p className={styles.label1}>We've sent a verification code</p>
                                <input type="text" placeholder="Verficiation code" className="input input-bordered w-full max-w-xs" />
                            <button className="btn btn-neutral btn-wide">Verify</button>
                            <p className={styles.label}>Didn't receive the code? Resend</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default verification