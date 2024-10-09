import React, { useContext } from "react"
import logo from '../images/logo.jpg'
import {Link} from 'react-router-dom'
import { AuthContext } from "../context/authContext"
import { categories } from "../constants/categories"
import "../styles/components/_footer.scss"

export default function Footer () {
  const {currentUser,logout} = useContext(AuthContext)

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
      {categories.map((category) => ( 
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

