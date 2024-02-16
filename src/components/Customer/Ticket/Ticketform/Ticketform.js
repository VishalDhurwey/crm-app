import { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import "./Ticketform.css";
import { useNavigate, useParams } from "react-router-dom";
import { Dropdown } from 'primereact/dropdown';
        

    function Ticketform(){

        const[users,setUsers] = useState([]);
        const[customers,setCustomers] = useState([]);

        const [ticket,setTicket]=useState({});
        const [valueMissing, setValueMissing]=useState(false);
        const navigate = useNavigate();

        const{desc} = useParams();

        useEffect(()=>{
            fetch("http://localhost:4000/api/user")
            .then((res)=>res.json())
            .then((parsedRes)=>setUsers(parsedRes));

            fetch("http://localhost:4000/api/customer")
            .then((res)=>res.json())
            .then(parsedRes => setCustomers(parsedRes));

            if(desc){
            fetch("http://localhost:4000/api/ticket/"+desc)
            .then((res)=>res.json())
            .then(parsedRes => setTicket(parsedRes));
            }
            
        },[])

        function handlenewticketclick(){
            setValueMissing(false);
            if(!ticket.status){
                setValueMissing(true);
            }
            
            fetch("http://localhost:4000/api/ticket",{
                method:desc ? "PUT": "POST",
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
                {/* <select 
                name = "customer"
                disabled={desc}
                onChange={
                    (e)=>{
                        let obj = {...ticket};
                        obj.customer=e.target.value;
                        setTicket(obj);
                }
            }
                    className="form-select">
                   {
                    customers.map(c=>
                        <option selected={c.name==ticket.customer} value={c.name}>{c.name}</option>
                        )
                   }
                </select> */}
                <Dropdown 
                disabled={desc}
                value={
                   customers.find(c=> c.name==ticket.customer)  
                }
                onChange={
                    (e)=>{
                        let obj = {...ticket};
                        obj.customer=e.value.name;
                        setTicket(obj);
                }
            }
                options={customers}
                optionLabel="name"
                placeholder="Select a Customer"
                filter 
                className="w-full"
            />

               
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
                {/* <select 
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
                        
                        <option selected={u.name==ticket.assignedTo} value={u.name}>{u.name}</option>
                        
                        )
                   }
                </select> */}

            <Dropdown value={
                   users.find(c=> c.name==ticket.assignedTo) 
                }
                onChange={
                    (e)=>{
                        let obj = {...ticket};
                        obj.assignedTo=e.value.name;
                        setTicket(obj);
                }
            }
                options={users}
                optionLabel="name"
                placeholder="Select a User"
                filter 
                className="w-full"
            />
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
                    <option selected={"New"==ticket.status} value="New">New</option>
                    <option selected={"Assigned"==ticket.status} value="Assigned">Assigned</option>
                    <option selected={"In Progress"==ticket.status} value="In Progress">In Progress</option>
                    <option selected={"Rsolved"==ticket.status} value="Rsolved">Rsolved</option>
                </select>
            </div> 
            <div className="mb-3">
                <label className="form-label">Raised On</label>
                <input
                name="raisedOn"
                    value={ticket.raisedOn}
                    readOnly={desc}
                    onInput={(e)=>{
                        let obj = {...ticket};
                        obj.raisedOn=e.target.value;
                        setTicket(obj);
                    }}
                type="date" className="form-control"></input>
            </div>

            <button onClick={handlenewticketclick} className="btn btn-success float-end">
               
               {
                desc &&
                <span> Update Ticket</span>
               }
               {
                !desc &&
                <span> Create Ticket</span>
               }
                
                
                </button>
            </div>
            </div>
        )
    }

    export default Ticketform;