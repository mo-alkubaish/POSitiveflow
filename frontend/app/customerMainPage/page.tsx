import React from 'react'
import styles from './styles.module.css';
import logo from "../logo/logo2.png";
import logo2 from "../logo/logoText.png";
import bell from "../logo/notification-bell.png";
import Image from 'next/image';
import Link from 'next/link';

const customerPage = () => {
    return (
        <>
            <header className={styles.header}>
                <div className='flex flex-row'>
                    <Image src={logo} alt={"not found"} width={60} height={60} className={styles.logo}></Image>
                    <Image src={logo2} alt={"not found"} width={170} height={170}></Image>
                </div>
                <div className="card-actions justify-end">

                    <div className="avatar">
                        <div className={styles.bell} >
                            <Image src={bell} alt={"not found"} width={40} height={40} ></Image>
                        </div>

                        <div className={styles.avatarImg}>
                            <div className="w-10 rounded-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>



            <div className={styles.container}>
                <h1 className={styles.primaryFont}>Purchase History Dashboard</h1>
                <div className={styles.border}>
                    <h2 className={styles.secFont}>Order Summary</h2>
                    <div className={styles.summary}>
                        <div className="card bg-base-100 w-72 h-24 shadow-xl">
                            <div className={styles.textIncards}>
                                <p className={styles.secFont2}>Total Orders</p>
                                <h1>42</h1>
                            </div>
                        </div>
                        <div className="card bg-base-100 w-72 h-24 shadow-xl">
                            <div className={styles.textIncards}>
                                <p className={styles.secFont2}>Total Spent</p>
                                <h1>$1,234.56</h1>
                            </div>
                        </div>
                        <div className="card bg-base-100 w-72 h-24 shadow-xl">
                            <div className={styles.textIncards}>
                                <p className={styles.secFont2}>Loyalty Points</p>
                                <h1>2,500</h1>
                            </div>
                        </div>
                    </div>
                    <h2 className={styles.secFont}>Recent Orders</h2>
                    <div>
                        <div>
                            <div className={styles.item}>
                                <div className={styles.rowFlex}>
                                    <div className={styles.colFlex}>
                                        <p className={styles.secFont2}>oreder #1234</p>
                                        <p className={styles.secFont2}>$99.99 - 3 items</p>
                                    </div>
                                    <button className={`btn btn-neutral w-24 ${styles.button1}`}><Link href="./Invoice">View</Link></button>
                                    <div className={`${styles.date} ${styles.secFont2}`}>
                                        <div className="badge badge-ghost">Rated</div>
                                        <p>Ordered on Jan 15, 2025</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.item}>
                            <div className={styles.rowFlex}>
                                    <div className={styles.colFlex}>
                                        <p className={styles.secFont2}>oreder #1234</p>
                                        <p className={styles.secFont2}>$99.99 - 3 items</p>
                                    </div>
                                    <button className={`btn btn-neutral w-52 ${styles.button1}`}><Link href="./feedback">Submit Feedback</Link></button>
                                    <button className={`btn btn-neutral w-24 ${styles.button1}`}><Link href="./Invoice">View</Link></button>
                                    <div className={`${styles.date} ${styles.secFont2}`}>
                                        <div className="badge badge-ghost">Not Rated</div>
                                        <p className={styles.secFont2}>Ordered on Jan 15, 2025</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className={styles.extraSpace}></div>
                </div>
            </div>


        </>
    )
}

export default customerPage