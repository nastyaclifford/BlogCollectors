import React, { useLayoutEffect } from 'react'
import Post from "../components/Post.jsx"
import Posts from "../components/Posts.jsx"
import "../styles/components/_home.scss"


const Home = () => {

    return (
        <div className="home">
        <Post/>
        <Posts/>
        </div>
    )
}

export default Home