import React from 'react'
import Layout from '../containers/layout/Layout'

const About = () => {
    return (
        <Layout>
            <h1>About</h1>
            <p>Looking for ideas for content creation? Find out the trending topics now!
            </p>
            <h2>Todo</h2>
            <ul>
                <li>Viewing detail about a keyword by clicking on it.</li>
                <li>Add click to copy</li>
            </ul>
            <style jsx>{`
                h1 {
                    margin: 1rem;
                }
                h2 {
                    margin 1rem;
                }
            `}</style>
        </Layout>
    )
}

export default About
