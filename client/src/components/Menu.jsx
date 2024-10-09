import React, { useEffect, useState } from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import moment from "moment"
import "../styles/components/_menu.scss"


export default function Menu ({cat}) {
    const [posts,setPosts] = useState([])

    useEffect(()=> {
        const fetchData = async() => {
            try{
const res = await axios.get(`http://localhost:3000/api/posts/?cat=${cat}`);
setPosts(res.data)
            }catch(err) {
                console.log(err)
            }
        };
        fetchData();
    }, [cat]);


        const handleClick = () => {
            window.scrollTo(0, 0);
        };


  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      <div className="posts">
      {posts.map((post) => {
    const imgArray = post.img ? post.img.split(',') : [];
    const firstImg = imgArray[0] || '';
    return(
    <Link className="link" to={`/post/${post.id}`} onClick={handleClick}>
    <div className="post" key={post.id}>
    <img src={`../upload/${firstImg}`} alt={`Image for ${post.title}`} />
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

    </div>
  )
};

