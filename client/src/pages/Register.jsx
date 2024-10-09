import React from 'react'
import {useState} from "react"
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import "../styles/components/_login.scss"

const Register = () => {
    const [inputs, setInputs] = useState({
        username:"",
        email:"",
        password:"",
    })

    const [err, setError] = useState(null)

    const navigate = useNavigate()


    const handleChange = e => {
        setInputs(prev=> ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try{
            await axios.post("http://localhost:3000/api/auth/register", inputs);
            navigate("/login");
        }catch(err) {
            setError(err.response.data)
        }
        
    }

    return (
        <div className="auth">
            <h1>Create an account</h1>
            <form>
                <input required type="text" placeholder="username" name="username" onChange={handleChange}/>
                <input required type="text" placeholder="email" name="email" onChange={handleChange}/>
                <input required type="password" placeholder="password" name="password" onChange={handleChange}/>
<button onClick={handleSubmit}>Sign up</button>
{err && <p>{err}</p>}
<span>
    Do you already have an account? 
    <Link to="/login">Login</Link>
</span>
            </form>
        </div>
    )
}

export default Register