import Image from 'next/image'
import React from 'react'
import logo from "../logo/logo2.png"
import styles from "./styles.module.css";

const Feedback = () => {
    return (
        <>
            <header className={styles.header}>
                <div className='flex flex-row'>
                    <Image src={logo} alt={"not found"} width={50} height={50} className={styles.logo}></Image>
                    <h1 className='card-title'>Customer Feedback</h1>
                </div>
                <div className="card-actions justify-end">
                    <div className="avatar">
                        <p className={styles.avatarText}>transaction #12345</p>
                        <div className={styles.avatarImg}>
                            <div className="w-10 rounded-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className={styles.feedbackWidget}>
                <div className="card lg:card-side bg-base-100 shadow-xl">

                    <div className="card-body">
                        <h2 className="card-title">How was your experience?</h2>
                        <p className={styles.p}>We value your feedback. Please take a moment to rate your recent transaction and share your thoughts.</p>
                        <p className={styles.p}>Overall satisfaction</p>
                            <div className="rating rating-lg gap-10">
                                <input type="radio" name="rating-9" className="rating-hidden" />
                                <input type="radio" name="rating-9" className="mask mask-star-2" />
                                <input type="radio" name="rating-9" className="mask mask-star-2" defaultChecked />
                                <input type="radio" name="rating-9" className="mask mask-star-2" />
                                <input type="radio" name="rating-9" className="mask mask-star-2" />
                                <input type="radio" name="rating-9" className="mask mask-star-2" />
                            </div>


                        <p className={styles.p}>Cashiers satisfaction</p>
                            <div className="rating rating-lg gap-10">
                                <input type="radio" name="rating-8" className="rating-hidden" />
                                <input type="radio" name="rating-8" className="mask mask-star-2" />
                                <input type="radio" name="rating-8" className="mask mask-star-2" defaultChecked />
                                <input type="radio" name="rating-8" className="mask mask-star-2" />
                                <input type="radio" name="rating-8" className="mask mask-star-2" />
                                <input type="radio" name="rating-8" className="mask mask-star-2" />
                            </div>


                        <p className={styles.p}>Additional comments</p>
                        <textarea
                            placeholder="Share your thoughts..."
                            className={`textarea textarea-bordered textarea-md w-full `}
                            ></textarea>
                        <div className="card-actions justify-end">
                            <button className="btn btn-neutral btn-wide">Submit Feedback</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.div1}></div>
        </>
    )
}

export default Feedback