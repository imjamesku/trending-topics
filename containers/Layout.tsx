import React from 'react'
import Head from 'next/head'
import Navbar from './Navbar'

const Layout = (props) => (
    <>
        <Head>
            <title>Trending Topics</title>
            <link href="https://fonts.googleapis.com/css2?family=Mukta:wght@500&display=swap" rel="stylesheet"></link>
        </Head>
        <Navbar />
        <div className="container">
            {props.children}
        </div>
    </>
)

export default Layout