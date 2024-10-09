import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import "../styles/components/_post.scss";

const Post = () => {
    const [posts, setPosts] = useState([]);
    const cat = useLocation().search;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/posts${cat}`);
                setPosts(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [cat]);

    if (posts.length === 0) return null;

    const latestPost = posts[posts.length - 1];
    const imgArray = latestPost.img ? latestPost.img.split(',') : [];
    const firstImg = imgArray[0] || '';

    return (
      <div className="post-container">
      <div className="circle-lg"></div>
      <Link className="link" to={`/post/${latestPost.id}`}>
                <div className="post" key={latestPost.id}>
                    {firstImg ? (
                        <img
                            className="img"
                            variant="top"
                            src={`../upload/${firstImg}`}
                            alt={`Image for ${latestPost.title}`}
                        />
                    ) : (
                        <div>No Image</div>
                    )}
                    <div className="content">
                        <div className="name">{latestPost.title}</div>
                        <div className="description">
                            by {latestPost.username} <br />
                            
                        </div>
                        <button>Read more</button>
                    </div>
                    
                </div>
            </Link>
            <div className="circle-sm"></div>
      </div>
      
       
    );
};

export default Post;