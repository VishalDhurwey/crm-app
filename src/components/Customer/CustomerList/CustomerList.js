import { useState } from "react";

   function CustomerList() {

    const[customers,setCustomers]=useState([]);

    fetch("http://localhost:4000/api/customer")
            .then(res=>{
             return  res.json()
            })
            .then((res)=>setCustomers(res));

    return(
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                       <th scope="col">Name</th>
                       <th scope="col">Website</th>
                       <th scope="col">Turnover</th>
                       <th scope="col">NumberOfEmployees</th>
                       <th scope="col">CEO</th>
                       <th scope="col">Established Year</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
   };

   export default CustomerList;