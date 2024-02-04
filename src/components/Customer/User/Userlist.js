import { useEffect, useState } from "react";
import NavBar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import "./Userlist.css";


function Userlist(){

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    
    useEffect(()=>{
        fetch("http://localhost:4000/api/user")
        .then((res)=>res.json())
        .then((parsedResult)=>{
            setUsers(parsedResult);
        })
    },[]); 

    function handleactivateclick(username){
        fetch("http://localhost:4000/api/user/activate/" + username, {
            method:"PUT"
        })
        .then((res)=>res.json())
        .then((parsedResponse) => setUsers(parsedResponse));

    }

    function handledeactivateclick(username){
        fetch("http://localhost:4000/api/user/deactivate/" + username, {
            method:"PUT"
        })
        .then((res)=>res.json())
        .then((parsedResponse) => setUsers(parsedResponse));

    }

    function handledeleteclick(username){
      fetch("http://localhost:4000/api/user/delete/" +username,{
          method:"delete"
      })
      .then(res=>{return res.json();})
      .then(res=>{setUsers(res);});
  }   

    function handleeditclick(username){
      
      navigate("/userform/" + username);
    }
    
    

    return(

        <div>

            <NavBar/>

            <a href="/userform" className="btn btn-success">New User</a>

        <div className="usercontainer">

        


            <table class="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Username</th>
      <th scope="col">Password</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    {
        users.map(u=>
    <tr>
      <td>{u.name}</td>
      <td>{u.email}</td>
      <td>{u.username}</td>
      <td>{u.password}</td>
      <td className="activestatus">{
        !u.isActive &&
        <button onClick={()=>{handleactivateclick(u.username)}} className="btn btn-primary">Activate</button>
          }
          {
            u.isActive &&
        <button onClick={()=>{handledeactivateclick(u.username)}} className="btn btn-danger">De-Activate</button>
          }
        
      </td>

      <td> <button onClick={()=>{handleeditclick(u.username)}} className="btn btn-warning">Edit</button> </td>
      <td> <button  onClick={()=>{handledeleteclick(u.username)}} className="btn btn-danger">Delete</button></td> 
    </tr>
        )
    }
    
    
  </tbody>
</table>
        </div>
        </div>
    );
}

export default Userlist;