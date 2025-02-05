import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets.js'
import { Input } from 'postcss'
import { StoreContext } from '../../context/StoreContext.jsx'
import axios from 'axios'


const LoginPopup = ({setShowLogin}) => {

   const{url,setToken} = useContext(StoreContext)

    const [currState , setCurrtState] = useState("Login")
    const [data ,setData] = useState({
        name:"",
        email:"",
        password:""
    })

    const onchangeHandler = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onLogin = async (event)=>{
        event.preventDefault()
        let newUrl = url;
        if(currState==="Login"){
            newUrl+="/api/user/login"
        }else{
            newUrl+="/api/user/register"
        }
        const response = await axios.post(newUrl,data);
        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false)
        }else{
            alert(response.data.message)
        }
    }

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className='login-popup-container'>
            <div className="login-popup-titile">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)}  src={assets.cross_icon}  />
            </div>
            <div className="login-popup-inputs">
                {currState==="Login"?<></>: <input name='name' onChange={onchangeHandler} value={data.name} type='text' placeholder='Your Name' required/> }
                <input type="email" name='email' onChange={onchangeHandler} value={data.email} placeholder='Your email ' required />
                <input type="password" name='password' onChange={onchangeHandler} value={data.password} placeholder='Password' required />
            </div>
            <button type='submit' > { currState==="Login"?"Login":"Sign Up"} </button>
            <div className="login-popup-condition">
                <input type="checkbox" required />    
                <p>By continuing , i agree to the terms of use & privacy policy.</p>
            </div>
            {
                currState==="Login"? <p>Creat a new Accounnt .<span onClick={()=>setCurrtState("Sign up")}> Click here</span> </p>:
                <p>Already have an account? <span onClick={()=>setCurrtState("Login")} >Login here</span></p>
            }

        </form>
        
    </div>
  )
}

export default LoginPopup
