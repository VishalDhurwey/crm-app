import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SecuredRoutes(props){

    const [loggedIn, setLogin] = useState(false);

    useEffect(()=>{
        
        const isUserlogged = localStorage.getItem("loggedIn");
        if(!isUserlogged || isUserlogged!="true"){
            console.log("not logged in");
            window.location.href="/login";
        }else{
            setLogin(true);
        }
    },[]);
    

    return(
        <React.Fragment>
            {
                loggedIn ? props.children:null
            }
        </React.Fragment>
    )

}

export default SecuredRoutes;