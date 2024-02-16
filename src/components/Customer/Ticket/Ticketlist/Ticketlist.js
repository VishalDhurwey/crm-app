import { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import "./Ticketlist.css";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../../Dashboard/Dashboard";
import TicketDashboard from "../TicketDashboard/TicketDashboard";

function Ticketlist(){

    const [tickets, setTickets] = useState([]);
    const [filteredtickets, setfilteredTickets] = useState([]);
    const [counts,setCounts] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        fetch("http://localhost:4000/api/ticket")
        .then((res) => res.json())
        .then((parsedres) => {
            setTickets(parsedres);
            setfilteredTickets(parsedres);

          let obj={};
          obj.all = parsedres.length;
          obj.new = parsedres.filter(t=>t.status=="New").length;
          obj.progress = parsedres.filter(t=>t.status=="In Progress").length;
          obj.assigned = parsedres.filter(t=>t.status=="Assigned").length;
          obj.resolved = parsedres.filter(t=>t.status=="Resolved").length;
          setCounts(obj);
        });
    },[])

    function handleeditclick(desc){
        navigate("/ticketform/"+ desc);
    }

    function handlesearch(key){
    const result= tickets.filter(t=>t.desc.includes(key));
    setfilteredTickets(result);
    }



    return(
        <div>
            <Navbar/>

            <div className="container">

            <TicketDashboard dashboardcounts={counts}/>

            <hr/>

            <div className="ticketheader">
            <a href="/ticketform" className="newbtn btn btn-success">New Ticket</a>

            <form className="d-flex" role="search">
            <input onInput={(e)=>{handlesearch(e.target.value)}}  className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
            {/* <button  className="btn btn-outline-success" type="submit">Search</button> */}
            </form>
            </div>

            <table className="table">
  <thead>
    <tr>
      <th scope="col">Customer</th>
      <th scope="col">Description</th>
      <th scope="col">Assigned To</th>
      <th scope="col">Status</th>
      <th scope="col">Raised On</th>
      <th scope="col">Update</th>
      
    </tr>
  </thead>
  <tbody>
    {
        filteredtickets.map((t)=>
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