import React, { useContext, useEffect, useState } from "react"
import logo from '../images/logo.jpg'
import {Link} from 'react-router-dom'
import { AuthContext } from "../context/authContext"
import { categories } from "../constants/categories"
import axios from "axios"
import "../styles/components/_footer.scss"

export default function Footer () {
  const {currentUser,logout} = useContext(AuthContext)
  const [categoriesWithPosts, setCategoriesWithPosts] = useState([])


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



  return (
    <div className="container--footer">
      <footer>
      <Link to="/" className="link">
      <div className="img"><img src={logo} alt='logo'/></div>
      </Link>
      <div className="content">
        <div className="content-home">
        <Link className="login" to="/">Home</Link>
      {currentUser? 
      <div className="login"onClick={logout}>Logout</div>
           : <Link className="login" to="/login">Login</Link>
          }
        </div>
      
      <div className="links">
      {categoriesWithPosts.map((category) => ( 
                <Link  to={`/?cat=${category}`} key={category}>
                <h5>{category.toUpperCase()}</h5>
                </Link>
            ))} 
      </div>
      <div className="author">© 2024 Clifford’s Brick Collection | All Rights Reserved</div>
      </div>
    </footer>
    </div>
    
  )
};

