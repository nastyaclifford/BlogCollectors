import React, {useState, useEffect, useContext} from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEraser, faPenToSquare}  from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from "../context/authContext"
import ImageGallery from "react-image-gallery";
import Menu from "../components/Menu"
import moment from "moment"
import axios from "axios"
import "../styles/components/_single.scss"

const Single = () => {


    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }

    const [post,setPost] = useState({})
    const location = useLocation()
    const navigate = useNavigate()
    const postId = location.pathname.split("/")[2]
    const {currentUser} = useContext(AuthContext)


    useEffect(()=> {
        const fetchData = async() => {
            try{
const res = await axios.get(`http://localhost:3000/api/posts/${postId}`);
setPost(res.data)
            }catch(err) {
                console.log(err)
            }
        };
        fetchData();
    }, [postId])

    const handleDelete = async () => {
        try{
            await axios.delete(`http://localhost:3000/api/posts/${postId}`, {withCredentials: true});
            navigate("/")
                        }catch(err) {
                            console.log(err)
                        }
    }

    const imgs = post.img ? post.img.split(',') : [];



    const galleryItems = imgs.map(file => ({
        original: `../upload/${file}`,
        thumbnail: `../upload/${file}`,
        
    }))



    return (
        <div className="single">
            <div className="content">
                <div className="image-gallery-container">
                <div className="circle-sm"></div>
                {galleryItems.length > 0 ? (
                    <ImageGallery items={galleryItems}/>
                ) : (<div>No images available</div>) }
                <div className="circle-lg"></div>
                </div>
                <h1 className="post-title">{post.title}</h1>
                <div className="user">
                    {post.userImg && <img src={post.userImg} alt="" />}
                    <div className="info">Posted by {post.username} {moment(post.date).fromNow()}</div>
                    {currentUser?.username === post.username && <div className="edit">
                    <Link to={`/write?edit=2`} state={post}>
                    <FontAwesomeIcon icon={faPenToSquare} className = "icon"/>
                    </Link>
                    <FontAwesomeIcon onClick={handleDelete} icon={faEraser} className = "icon"/>
                    </div>}
                </div>
                
            <p>{getText(post.description)}</p>
            </div>
            <Menu cat={post.cat}/>
        </div>
    )
}

export default Single