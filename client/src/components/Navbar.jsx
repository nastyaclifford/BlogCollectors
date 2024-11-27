import React, { useContext, useState, useEffect, useRef } from "react"
import {Link} from 'react-router-dom'
import logo from "../images/logo.jpg"
import { AuthContext } from "../context/authContext"
import { categories } from "../constants/categories"
import { bubble as Menu } from 'react-burger-menu'
import axios from "axios"
import "../styles/components/_navbar.scss"

export default function Navbar () {

const {currentUser,logout} = useContext(AuthContext)
const [categoriesWithPosts, setCategoriesWithPosts] = useState([])
const [isOpen, setIsOpen] = useState(false);
const menuRef = useRef(null);


useEffect(()=> {
      const fetchPostsForCat = async() => {
        const categoriesWithPosts = []
        for (const category of categories) {
          try{
            const res = await axios.get(`http://localhost:3000/api/posts?cat=${category}`);
            if(res.data.length > 0) {
              categoriesWithPosts.push(category)
             
            }
                      }catch(err) {
                          console.error(`Error fetching posts for ${category}:`, err);
                      }
        }
        setCategoriesWithPosts(categoriesWithPosts)

      };
      fetchPostsForCat();
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


 
  const handleLinkClick = () => {
    setIsOpen(false);
  };


  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
          <img src={logo} alt="logo" />
          <div className="logo-text">Clifford's Brick Collection</div>
          </Link>
        </div>

        <div className="burger-menu" ref={menuRef}>
       
        <Menu right isOpen={isOpen} onStateChange={({ isOpen }) => setIsOpen(isOpen)}>
        {currentUser? 
           <div className="username">Hi, {currentUser?.username }!</div>
                      : null
                     }  
        {categoriesWithPosts.map((category) => ( 
                <Link  to={`/?cat=${category}`} key={category} onClick={handleLinkClick}>
                <h5>{category.toUpperCase()}</h5>
                </Link>
            ))} 

{currentUser? 
<div className="links">
<div className="write">
    <Link className="link" to="/write" onClick={handleLinkClick}>New post</Link>
    </div>
</div>
           : <span></span>
          }
            
            {currentUser? 
<div className="logout" onClick={logout} >Logout</div>
           : <Link className="link" to="/login">Login</Link>
          }
        </Menu>
        </div>


        <div className="navbar-links">
          <div className="links-all">
          {currentUser? 
          <div className="username">Hi, {currentUser?.username }!</div>
                     : null
                    }  
       {categoriesWithPosts.map((category) => ( 
               <Link  to={`/?cat=${category}`} key={category} onClick={handleLinkClick}>
               <h5>{category.toUpperCase()}</h5>
               </Link>
           ))} 

{currentUser? 
<div className="links">
<div className="write">
   <Link className="link" to="/write" onClick={handleLinkClick}>New post</Link>
   </div>
</div>
          : <span></span>
         }
           
           {currentUser? 
<div className="logout" onClick={logout} >Logout</div>
          : <Link className="link" to="/login">Login</Link>
         }
          </div>
       
       
       </div>
        
        
      </div>
    </div>
  )
};

