import { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";



function SignUp(){

    const [user, setUser] = useState({});
    const navigate= useNavigate();
    
    function handleregister(){
        console.log(user);
        fetch("http://localhost:4000/api/user/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user),
            
        })
        .then((res)=>{
            console.log(res);
            navigate("/Login");
        })
        .catch((err)=>{
            console.log(err);
        });


    }

    return(
        <div className="Signuppage"> 
            <label className="form-label">Enter Your Name</label>
            <input 
            onInput={(e)=>setUser({...user, name:e.target.value})}
            type="text" name="name" className="form-control"></input>

            <label className="form-label">Email</label>
            <input
            onInput={(e)=>setUser({...user, email:e.target.value})}
            type="Email" name="Email" className="form-control"></input>

            <label className="form-label">Username</label>
            <input
            onInput={(e)=>setUser({...user, username:e.target.value})}
            type="Email" name="Email" className="form-control"></input>

            <label className="form-label">Password</label>
            <input 
            onInput={(e)=>setUser({...user, password:e.target.value})}
            type="password" name="Password" className="form-control"></input>
        
            

            <input onClick={handleregister} className="buttons" type="button" value="Register"></input>
            
           
        
        </div>
        
    )
}
export default SignUp;