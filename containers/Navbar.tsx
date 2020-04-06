import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link href="/"><a><h1>Trending Topics</h1></a></Link>
            <ul className="navLinks">
                <li><Link href="/"><a>Home</a></Link> </li>
                <li><Link href="/about"><a>About</a></Link></li>
            </ul>
            <Link href="/contact"><button className="btn"><a>contact</a></button></Link>
        </nav >
    )
}

export default Navbar