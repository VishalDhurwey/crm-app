import { useEffect, useState } from "react";
import "./UserForm.css";
import { useNavigate, useParams } from "react-router-dom"; 
import NavBar from "../../Navbar/Navbar";


function UserForm(){
    
    // const [User, setUser] = useState({});
    const [Usertoupdate, setUpdateUser] = useState({});
   
    const navigate = useNavigate();



    function handleformsubmmit(){
        console.log(Usertoupdate);
        fetch("http://localhost:4000/api/User/signup",{
            method: "post",
            body:JSON.stringify(Usertoupdate),
            headers:{"Content-Type":"application/json"},
        })
        .then(res=>{
            navigate("/users");
        })
       

    }


    return(

        <div>
            <NavBar/>
        
        <div className="container">

        
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input 
                    value={Usertoupdate.name}
                    onInput={(e)=>{
                        let obj = {...Usertoupdate};
                        obj.name=e.target.value;
                        setUpdateUser(obj);
                    }}
                    type="text" className="form-control"></input>
            </div>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                    value={Usertoupdate.email}
                    onInput={(e)=>{
                        let obj = {...Usertoupdate};
                        obj.email=e.target.value;
                        setUpdateUser(obj);
                    }}
                 type="text" className="form-control"></input>
            </div>
            <div className="mb-3">
                <label className="form-label">Username</label>
                <input 
                    value={Usertoupdate.username}
                    onInput={(e)=>{
                        let obj = {...Usertoupdate};
                        obj.username=e.target.value;
                        setUpdateUser(obj);
                    }} 
                type="text" className="form-control"></input>
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                    value={Usertoupdate.password}
                    onInput={(e)=>{
                        let obj = {...Usertoupdate};
                        obj.password=e.target.value;
                        setUpdateUser(obj);
                    }}
                type="password" className="form-control"></input>
            </div>
            <div className="mb-3">
            <div class="form-check">
            <input
             onChange={
                (e)=>{
                    console.log(e.target.checked)
                    let obj = {...Usertoupdate};
                    obj.isActive=e.target.checked;
                    setUpdateUser(obj);
                }
             }
             className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate"></input>
            <label className="form-check-label" for="flexCheckIndeterminate">
             IsActive
             </label>
             </div>
                
            </div>
            <div>
                <button onClick={handleformsubmmit} className="btn btn-primary float-end" type="button">
                    Create New User
                    </button>
            </div>

        </div>
        </div>
    );
};

export default UserForm;