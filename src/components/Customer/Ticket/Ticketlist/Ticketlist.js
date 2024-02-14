import { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import "./Ticketlist.css";
import { useNavigate } from "react-router-dom";

function Ticketlist(){

    const [tickets, setTickets] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        fetch("http://localhost:4000/api/ticket")
        .then((res) => res.json())
        .then((parsedres) => {
            setTickets(parsedres);
        });
    },[])

    function handleeditclick(desc){
        navigate("/ticketform/"+ desc);
    }



    return(
        <div>
            <Navbar/>

            <a href="/ticketform" className="newbtn btn btn-success">New Ticket</a>

            <div className="container">

            <table className="table">
  <thead>
    <tr>
      <th scope="col">Customer</th>
      <th scope="col">Description</th>
      <th scope="col">Assigned To</th>
      <th scope="col">Status</th>
      <th scope="col">Raised On</th>
      
    </tr>
  </thead>
  <tbody>
    {
        tickets.map((t)=>
    <tr>
      <td>{t.customer}</td>
      <td>{t.desc}</td>
      <td>{t.assignedTo}</td>
      <td>{t.status}</td>
      <td>{t.raisedOn}</td>


    <td> <button onClick={()=>{handleeditclick(t.desc)}} className="btn btn-warning">Edit</button> </td>
     
    
    </tr>
        )

    }
    
    
  </tbody>
</table>

            </div>
        </div>
        
    );
}

export default Ticketlist;