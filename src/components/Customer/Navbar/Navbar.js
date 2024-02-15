import { useEffect, useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";


function Navbar(){

    const [islogged, setLoggedinstatus] = useState(false);
    const navigate = useNavigate();
    
    useEffect(()=>{
      const value = localStorage.getItem("loggedIn");

      if(value && value=="true"){
        setLoggedinstatus(true);
      }else{
        setLoggedinstatus(false);
      }
    })

    function handlesignout(){
        localStorage.removeItem("loggedIn")
        navigate("/login");
    }

    
  

    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="nav-text navbar-brand" href="/">CRM</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto  mb-lg-0">
        <li className="nav-item">
          <a className="nav-text nav-link active" aria-current="page" href="/users">Users</a>
        </li>
        <li className="nav-item">
          <a className="nav-text nav-link active" aria-current="page" href="/tickets">Tickets</a>
        </li>
        
      </ul>
      {
        !islogged &&
        <div className="headerbutton">
        <a className="btn btn-success" href="/Signup">SignUp</a>
        <a className="btn btn-primary" href="/Login">Login</a>
      </div>
      }
      {
        islogged &&
        <div className="headerbutton">
          
        <button onClick={handlesignout} className="btn btn-success" >Signout</button>
        </div>
      }
      
        

    </div>
  </div>
</nav>
    );
}

export default Navbar;