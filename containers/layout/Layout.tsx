import React from 'react'
import Head from 'next/head'
import Navbar from './navbar/Navbar'

const Layout = (props) => (
    <>
        <Head>
            <title>Trending Topics</title>
            <link href="https://fonts.googleapis.com/css2?family=Mukta:wght@500&display=swap" rel="stylesheet"></link>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        </Head>
        <Navbar />
        <div className="container">
            {props.children}
        </div>
    </>
)

export default Layout