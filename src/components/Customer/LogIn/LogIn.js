import { useState } from "react";
import "./LogIn.css";
import { useNavigate } from "react-router-dom";


function LogIn(){

    const[logindetails , setLogindetails] = useState({});
    const[invalidcreds, setInvalidcreds]= useState(false);
    const navigate=useNavigate();

    function handlelogin(){

        setInvalidcreds(false);

        fetch("http://localhost:4000/api/user/signin",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(logindetails),
        })
        .then((res)=>{
            console.log(res);
            if(res.status==400){
                setInvalidcreds(true);  
            }else if (res.status==200){
                localStorage.setItem("loggedIn", "true");
                navigate("/");
            }
        })
        .catch((err)=>{
            //server error
            console.log(err);
        });
    }

    function handlesignup(){
        navigate("/signup");
    }

    return (
        <div className="Loginpage">  

            {
                invalidcreds &&
            <div className="alert alert-danger" role="alert">
            Invalid Credentials.!
            </div>
            }

            <div className="loginform">
            
            <label className="form-label">username</label>
            <input
            onInput={(e)=>setLogindetails({...logindetails, username:e.target.value})}
            type="text" name="Email" className="form-control"></input>

            <label className="form-label">Password</label>
            <input 
            onInput={(e)=>setLogindetails({...logindetails, password:e.target.value})}
            type="password" name="Password" className="form-control"></input>
        
            

            <input onClick={handlelogin} className="buttons" type="button" value="Login"></input>
            <input onClick={handlesignup} className="buttons" type="button" value="Signup"></input>
           
            </div>
            
        
        </div>
    )
}

export default LogIn;