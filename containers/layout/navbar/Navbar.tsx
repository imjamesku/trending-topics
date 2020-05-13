import React from 'react'
import Link from 'next/link'
import NavLink from './NavLink/Navlink'
import styles from './Navbar.module.scss'

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <Link href="/"><a className={`${styles.clickable} ${styles.brand}`}><h1>Trending Topics</h1></a></Link>
            <div className={styles.navLinks}>
                <NavLink href="/" activeClassName={styles.active}><a>Home</a></NavLink>
                <NavLink href="/about" activeClassName={styles.active}><a>About</a></NavLink>
            </div>
            <Link href="/contact"><button className="btn-primary">contact</button></Link>
        </nav >
    )
}

export default Navbar