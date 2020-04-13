import React from 'react'
import Link from 'next/link'
import styles from './Navbar.module.scss'

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <Link href="/"><a className={`${styles.clickable} ${styles.brand}`}><h1>Trending Topics</h1></a></Link>
            <ul className={styles.navLinks}>
                <li className={styles.clickable}><Link href="/"><a>Home</a></Link> </li>
                <li className={styles.clickable}><Link href="/about"><a>About</a></Link></li>
            </ul>
            <Link href="/contact"><button className="btn-primary">contact</button></Link>
        </nav >
    )
}

export default Navbar