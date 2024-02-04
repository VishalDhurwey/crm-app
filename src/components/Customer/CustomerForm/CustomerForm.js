import { useEffect, useState } from "react";
import "./CustomerForm.css";
import { useNavigate, useParams } from "react-router-dom"; 
import NavBar from "../Navbar/Navbar";

function CustomerForm(){
    
    // const [customer, setCustomer] = useState({});
    const [customertoupdate, setUpdatecustomer] = useState({});
    const{customername} = useParams();
    // console.log(customername);
    // console.log(customer);
    const navigate = useNavigate();

    useEffect(()=>{
        if(customername){
            fetch("http://localhost:4000/api/customer/" + customername)
            .then(res=>{return res.json()})
            .then(res=>{
                setUpdatecustomer(res);
        });
        }
    }, []);



    function handleformsubmmit(){
        console.log(customertoupdate);
        fetch("http://localhost:4000/api/customer",{
            method: customername ? "put":"post",
            body:JSON.stringify(customertoupdate),
            headers:{"Content-Type":"application/json"},
        })
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            console.log(res);
            navigate("/");
        });

    }


    return(

        <div>
            <NavBar/>
        
        <div className="container">

        
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input 
                    value={customertoupdate.name}
                    onInput={(e)=>{
                        let obj = {...customertoupdate};
                        obj.name=e.target.value;
                        setUpdatecustomer(obj);
                    }}
                    type="text" className="form-control"></input>
            </div>
            <div className="mb-3">
                <label className="form-label">Website</label>
                <input
                    value={customertoupdate.website}
                    onInput={(e)=>{
                        let obj = {...customertoupdate};
                        obj.website=e.target.value;
                        setUpdatecustomer(obj);
                    }}
                 type="text" className="form-control"></input>
            </div>
            <div className="mb-3">
                <label className="form-label">Turnover</label>
                <input
                    value={customertoupdate.turnover}
                    onInput={(e)=>{
                        let obj = {...customertoupdate};
                        obj.turnover=e.target.value;
                        setUpdatecustomer(obj);
                    }}
                type="number" className="form-control"></input>
            </div>
            <div className="mb-3">
                <label className="form-label">No. Of Employees</label>
                <input 
                    value={customertoupdate.employees}
                    onInput={(e)=>{
                        let obj = {...customertoupdate};
                        obj.employees=e.target.value;
                        setUpdatecustomer(obj);
                    }} 
                type="number" className="form-control"></input>
            </div>
            <div className="mb-3">
                <label className="form-label">CEO</label>
                <input 
                    value={customertoupdate.ceo}
                    onInput={(e)=>{
                        let obj = {...customertoupdate};
                        obj.ceo=e.target.value;
                        setUpdatecustomer(obj);
                    }} 
                type="text" className="form-control"></input>
            </div>
            <div className="mb-3">
                <label className="form-label">Established In</label>
                <input 
                    value={customertoupdate.year}
                    onInput={(e)=>{
                        let obj = {...customertoupdate};
                        obj.year=e.target.value;
                        setUpdatecustomer(obj);
                    }}
                type="number" className="form-control"></input>
            </div>
            <div className="mb-3">
                <label className="form-label">Status</label>
                <select 
                onChange={
                    (e)=>{
                        let obj = {...customertoupdate};
                        obj.status=e.target.value;
                        setUpdatecustomer(obj);
                }
            }
                    className="form-select">
                    <option value="New">New</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>
            <div>
                <button onClick={handleformsubmmit} className="btn btn-primary float-end" type="button">
                    {
                        customername &&
                        <span>Update Customer</span>
                    }
                    {
                        !customername &&
                        <span>Create New Customer</span>
                    }

                    </button>
            </div>

        </div>
        </div>
    );
};

export default CustomerForm;