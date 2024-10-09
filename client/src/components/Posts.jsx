import React, { useLayoutEffect } from 'react'
import {Link, useLocation} from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from "axios"
import moment from "moment"
import "../styles/components/_posts.scss"


const Posts = () => {

    const [posts,setPosts] = useState([])
    const cat = useLocation().search


    useEffect(()=> {
        const fetchData = async() => {
            try{
const res = await axios.get(`http://localhost:3000/api/posts${cat}`);
setPosts(res.data)
            }catch(err) {
                console.log(err)
            }
        };
        fetchData();
    }, [cat])





    return (
         <div className="posts">
         {posts.map(post => {
            const imgArray = post.img ? post.img.split(',') : [];
            const firstImg = imgArray[0] || '';
            return (
            <Link className="link" to={`/post/${post.id}`}>
                <div className="post" key = {post.id}>
                {firstImg ? (
                            <img className="img"  variant="top" src={`../upload/${firstImg}`} alt={`Image for ${post.title}`} />)
                        : (<div></div>)}
                <div className="content">
                <div className="name">{post.title}</div>
        <div className="description">
        Posted by {post.username} <br/>{moment(post.date).fromNow()}
        </div>
      </div>
      <button>Read more</button>
    </div>
                </Link>
            )})}
        
         </div>
           
        
    )
}

export default Posts