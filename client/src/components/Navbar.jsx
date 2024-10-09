import React, { useContext } from "react"
import {Link} from 'react-router-dom'
import logo from "../images/logo.jpg"
import { AuthContext } from "../context/authContext"
import { categories } from "../constants/categories"
import { bubble as Menu } from 'react-burger-menu'
import "../styles/components/_navbar.scss"

export default function Navbar () {

  const {currentUser,logout} = useContext(AuthContext)

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
          <img src={logo} alt="logo" />
          <div className="logo-text">Clifford's Brick Collection</div>
          </Link>
        </div>

        <div className="burger-menu">
       
        <Menu right >
        {currentUser? 
           <div className="username">Hi, {currentUser?.username }!</div>
                      : <span></span>
                     }  
        {categories.map((category) => ( 
                <Link  to={`/?cat=${category}`} key={category}>
                <h5>{category.toUpperCase()}</h5>
                </Link>
            ))} 

{currentUser? 
<div className="links">
<div className="write">
    <Link className="link" to="/write">New post</Link>
    </div>
</div>
           : <span></span>
          }
            
            {currentUser? 
<div className="logout" onClick={logout}>Logout</div>
           : <Link className="link" to="/login">Login</Link>
          }
        </Menu>
        </div>
        
        
      </div>
    </div>
  )
};

