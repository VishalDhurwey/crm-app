import { useEffect, useState } from "react";
import Navbar from "../../../Navbar/Navbar";
import "./Ticketform.css";
import { useNavigate } from "react-router-dom";

    function Ticketform(){

        const[users,setUsers] = useState([]);
        const[customer,setCustomer] = useState([]);

        const [ticket,setTicket]=useState({});
        const [valueMissing, setValueMisssing]=useState(false);
        const navigate = useNavigate();

        useEffect(()=>{
            fetch("http://localhost:4000/api/user")
            .then((res)=>res.json())
            .then((parsedRes)=>setUsers(parsedRes));

            fetch("http://localhost:4000/api/customer")
            .then((res)=>res.json())
            .then(parsedRes => setCustomer(parsedRes));
            
        })

        function handlenewticketclick(){
            setValueMisssing(false);
            if(!ticket.status){
                setValueMisssing(true);
            }
            
            fetch("http://localhost:4000/api/ticket",{
                method:"POST",
                body:JSON.stringify(ticket),
                headers:{"Content-Type":"application/json"},
            })
            .then((res)=>{
                navigate("/tickets");
            }).catch((err)=>{
                console.log(err);
            })
        }


        return(
            <div>
                <Navbar/>
            <div className="container">
                {   valueMissing &&
                    <div className="warning alert alert-warning" role="alert">
                    Please Select Status.!
                  </div>
                }
            <div className="mb-3">
                <label className="form-label">Customer Name</label>
                <select 
                name = "customer"
                onChange={
                    (e)=>{
                        let obj = {...ticket};
                        obj.customer=e.target.value;
                        setTicket(obj);
                }
            }
                    className="form-select">
                   {
                    customer.map(c=>
                        <option value={c.name}>{c.name}</option>
                        )
                   }
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="desc" className="form-label">Description</label>
                <input
                name="desc"
                    value={ticket.desc}
                    onInput={(e)=>{
                        let obj = {...ticket};
                        obj.desc=e.target.value;
                        setTicket(obj);
                    }}
                 type="text" className="form-control"></input>
            </div>
            <div className="mb-3">
                <label className="form-label">Assigned To</label>
                <select 
                onChange={
                    (e)=>{
                        let obj = {...ticket};
                        obj.assignedTo=e.target.value;
                        setTicket(obj);
                }
            }
                    className="form-select">
                   {
                    users.map(u=>
                        <option value={u.name}>{u.name}</option>
                        )
                   }
                </select>
            </div>
            <div className="mb-3">
            <label className="form-label">Status</label>
                <select 
                onChange={
                    (e)=>{
                        let obj = {...ticket};
                        obj.status=e.target.value;
                        setTicket(obj);
                }
            }
                    className="form-select">
                    <option value="Select">Please Select</option>
                    <option value="New">New</option>
                    <option value="Assigned">Assigned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Rsolved">Rsolved</option>
                </select>
            </div> 
            <div className="mb-3">
                <label className="form-label">Raised On</label>
                <input
                    value={ticket.raisedOn}
                    onInput={(e)=>{
                        let obj = {...ticket};
                        obj.raisedOn=e.target.value;
                        setTicket(obj);
                    }}
                type="date" className="form-control"></input>
            </div>

            <button onClick={handlenewticketclick} className="btn btn-success float-end">Create Ticket</button>
            </div>
            </div>
        )
    }

    export default Ticketform;