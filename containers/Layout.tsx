import React from 'react'
import Head from 'next/head'
import Navbar from './Navbar'

const Layout = (props) => (
    <>
        <Head>
            <title>Trending Topics</title>
            <link rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Tangerine"></link>
        </Head>
        <Navbar />
        <div className="container">
            {props.children}
        </div>
    </>
)

export default Layout