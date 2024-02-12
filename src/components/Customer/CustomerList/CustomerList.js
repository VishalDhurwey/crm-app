import "./CustomerList.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../Navbar/Navbar";
import Dashboard from "../../Dashboard/Dashboard";

   function CustomerList() {

    const [customers, setCustomers]=useState([]);
    const [filteredcustomers, setFilteredcustomers] = useState([]);
    const [counts, setCounts] = useState({});
    const [pages, setPages] = useState([]);
    

    const navigate = useNavigate();

    useEffect(()=>{
        load(1);
    },[]);

    function load(pageno){
        fetch("http://localhost:4000/api/customer/page/"+pageno)
        .then(res=>{ 
         return  res.json()
        })
        .then((res)=>
        {
        setCustomers(res.records);
        setFilteredcustomers(res.records);

        let newcounts = res.records.filter(c=> c.status=="New").length;
        let newaccepted = res.records.filter(c=> c.status=="Accepted").length;
        let newrejected = res.records.filter(c=> c.status=="Rejected").length;
        let countobj = {
            "new":newcounts,
            "accepted":newaccepted,
            "rejected":newrejected,
            "total":res.records.length
        };
        setCounts(countobj);

        let totalPages = Math.floor(res.totalCount/90);
        let arrayofpages = new Array(totalPages).fill(0);
        setPages(arrayofpages); 


        }
        );
    }
    
    function handleNewCustomerClick(){
        navigate("form");
    }
    function handleSignUp(){
        navigate("SignUp");
    }
    function handleLogIn(){
        navigate("LogIn");
    }
    
    function handleEditClick(name){
         
         navigate("/form/" + name)
    }
    
    function handleDeleteClick(name){
        fetch("http://localhost:4000/api/customer/" +name,{
            method:"delete"
        })
        .then(res=>{return res.json();})
        .then(res=>{setCustomers(res);});
        window.location.reload();
        
        
    }   

    function getStatusCSS(status){
        if(status=="New"){
            return "st_blue";
        }
        else if(status=="Accepted"){
            return "st_green";
        }
        else{
            return "st_red";
        }
    }

    function handlesearch(key){
        if(!key || key.length==0){
            setFilteredcustomers(customers);
        }else
            {
        const result = customers.filter(c=> c.name.includes(key));
        setFilteredcustomers([...result]);
    }
    }


    return(
        <div>
        <NavBar/>

        <div className="container">
        
        <Dashboard counts={counts}/>

        <hr/>
        <div className="header2">
        <button onClick={handleNewCustomerClick} className="newcustomer btn btn-success">New Customer</button>  
        
        <form className="d-flex" role="search">
        <input onInput={(e)=>{handlesearch(e.target.value)}} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
        <button  className="btn btn-outline-success" type="submit">Search</button>
        </form>
        </div>
       
        

{
    filteredcustomers.length==0 && 
    <div className="alert alert-primary" role="alert">
    No Customers are available in system !
    </div>
}

{

filteredcustomers.length>0 &&
<div className="table-parent">
<table className="table">
<thead>
    <tr>
       <th scope="col">Name</th>
       <th scope="col">Website</th>
       <th scope="col">Turnover</th>
       <th scope="col">NumberOfEmployees</th>
       <th scope="col">Status</th>
       <th scope="col">CEO</th>
       <th scope="col">Established Year</th>
    </tr>
</thead>
<tbody>
    {
        filteredcustomers.map(c=>
         
            <tr>
            <td>{c.name}</td>
            <td>{c.website}</td>
            <td>{c.turnover}</td>
            <td>{c.employees}</td>
            <td className={getStatusCSS(c.status)}>
                {c.status}
            </td>
            <td>{c.ceo}</td>
            <td>{c.year}</td>
            <td>
            <button onClick={()=>handleEditClick(c.name)} className="btn btn-warning">Edit</button>
            </td>
            <td>
            <button onClick={()=>handleDeleteClick(c.name)} className="btn btn-danger">Delete</button>
            </td>   
            </tr>
           )
           
    }
    
    

  

</tbody>
</table>


<nav aria-label="Page-bar">
     <ul className="pagination">
     <li className="page-item">
      <a className="page-link" href="#">Previous 
      </a>
    </li>
    {
        pages.map((p,i)=>
            <li className="page-item"><button className="page-link"onClick={()=>{load(i+1)}}>{i+1}</button></li>
            )
    }
    
    <li className="page-item">
    <a className="page-link" href="#">Next 
      </a>
    </li>
    </ul>
    </nav>

</div>

}


     

        </div>
        </div>
    );
   };

   export default CustomerList;