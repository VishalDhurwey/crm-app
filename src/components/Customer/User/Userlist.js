import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Userlist.css";

function Userlist(){
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const navigate = useNavigate();
    
    useEffect(()=>{
        fetch("https://crm-app-api-ybms.onrender.com/api/user")
        .then((res)=>res.json())
        .then((parsedResult)=>{
            setUsers(parsedResult);
            setFilteredUsers(parsedResult);
        })
    },[]); 

    function handleactivateclick(username){
        fetch("https://crm-app-api-ybms.onrender.com/api/user/activate/" + username, {
            method:"PUT"
        })
        .then((res)=>res.json())
        .then((parsedResponse) => {
            setUsers(parsedResponse);
            setFilteredUsers(parsedResponse);
        });
    }

    function handledeactivateclick(username){
        fetch("https://crm-app-api-ybms.onrender.com/api/user/deactivate/" + username, {
            method:"PUT"
        })
        .then((res)=>res.json())
        .then((parsedResponse) => {
            setUsers(parsedResponse);
            setFilteredUsers(parsedResponse);
        });
    }

    function handledeleteclick(username){
        fetch("https://crm-app-api-ybms.onrender.com/api/user/delete/" +username,{
            method:"delete"
        })
        .then(res=>res.json())
        .then(res=>{
            setUsers(res);
            setFilteredUsers(res);
        });
    }   

    function handleeditclick(username){
        navigate("/userform/" + username);
    }

    function handleNewUser() {
        navigate("/userform");
    }

    function handlesearch(key) {
        if (!key) {
            setFilteredUsers(users);
            return;
        }
        const result = users.filter(u => 
            u.name.toLowerCase().includes(key.toLowerCase()) ||
            u.username.toLowerCase().includes(key.toLowerCase()) ||
            u.email.toLowerCase().includes(key.toLowerCase())
        );
        setFilteredUsers(result);
    }

    return(
        <div className="container">
            <div className="page-header">
                <h1>User Management</h1>
                <p>View and manage system users</p>
            </div>

            <div className="content-wrapper">
                <div className="toolbar">
                    <div className="search-box">
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-search"></i>
                            </span>
                            <input 
                                type="search" 
                                className="form-control" 
                                placeholder="Search users..." 
                                onChange={(e) => handlesearch(e.target.value)}
                            />
                        </div>
                    </div>
                    <button 
                        onClick={handleNewUser} 
                        className="btn btn-primary"
                    >
                        <i className="bi bi-plus-lg"></i>
                        New User
                    </button>
                </div>

                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Username</th>
                                <th scope="col">Password</th>
                                <th scope="col">Status</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-4">
                                        <div className="empty-state">
                                            <i className="bi bi-people text-muted"></i>
                                            <p>No users found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map(u => (
                                    <tr key={u.username}>
                                        <td>{u.name}</td>
                                        <td>{u.email}</td>
                                        <td>{u.username}</td>
                                        <td>••••••••</td>
                                        <td>
                                            <span className={`badge ${u.isActive ? 'bg-success' : 'bg-danger'}`}>
                                                {u.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="btn-group">
                                                <button 
                                                    onClick={() => handleeditclick(u.username)} 
                                                    className="btn btn-sm btn-outline-primary"
                                                    title="Edit user"
                                                >
                                                    <i className="bi bi-pencil"></i>
                                                    Edit
                                                </button>
                                                {!u.isActive ? (
                                                    <button 
                                                        onClick={() => handleactivateclick(u.username)} 
                                                        className="btn btn-sm btn-outline-success"
                                                        title="Activate user"
                                                    >
                                                        <i className="bi bi-check-lg"></i>
                                                        Activate
                                                    </button>
                                                ) : (
                                                    <button 
                                                        onClick={() => handledeactivateclick(u.username)} 
                                                        className="btn btn-sm btn-outline-warning"
                                                        title="Deactivate user"
                                                    >
                                                        <i className="bi bi-pause-fill"></i>
                                                        Deactivate
                                                    </button>
                                                )}
                                                <button  
                                                    onClick={() => handledeleteclick(u.username)} 
                                                    className="btn btn-sm btn-outline-danger"
                                                    title="Delete user"
                                                >
                                                    <i className="bi bi-trash"></i>
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Userlist;