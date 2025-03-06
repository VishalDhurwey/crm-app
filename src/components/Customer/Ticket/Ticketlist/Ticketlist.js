import { useEffect, useState } from "react";
import "./Ticketlist.css";
import { useNavigate } from "react-router-dom";

function Ticketlist(){
    const [tickets, setTickets] = useState([]);
    const [filteredtickets, setfilteredTickets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://crm-app-api-ybms.onrender.com/api/ticket")
        .then((res) => res.json())
        .then((parsedres) => {
            setTickets(parsedres);
            setfilteredTickets(parsedres);
        });
    }, []);

    function handleeditclick(desc){
        navigate("/ticketform/" + desc);
    }

    function handleNewTicket() {
        navigate("/ticketform");
    }

    function handlesearch(key){
        if (!key) {
            setfilteredTickets(tickets);
            return;
        }
        const result = tickets.filter(t => t.desc.toLowerCase().includes(key.toLowerCase()));
        setfilteredTickets(result);
    }
    
    function getstatuscss(status){
        switch(status) {
            case "New":
                return "badge bg-info";
            case "Assigned":
                return "badge bg-warning";
            case "Resolved":
                return "badge bg-success";
            default:
                return "badge bg-secondary";
        }
    }

    return(
        <div className="container">
            <div className="page-header">
                <h1>Ticket Management</h1>
                <p>View and manage customer support tickets</p>
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
                                placeholder="Search tickets..." 
                                onChange={(e) => handlesearch(e.target.value)}
                            />
                        </div>
                    </div>
                    <button 
                        onClick={handleNewTicket} 
                        className="btn btn-primary"
                    >
                        <i className="bi bi-plus-lg"></i>
                        New Ticket
                    </button>
                </div>

                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Customer</th>
                                <th scope="col">Description</th>
                                <th scope="col">Assigned To</th>
                                <th scope="col">Status</th>
                                <th scope="col">Raised On</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredtickets.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-4">
                                        <div className="empty-state">
                                            <i className="bi bi-ticket-detailed text-muted"></i>
                                            <p>No tickets found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredtickets.map((t) => (
                                    <tr key={t.desc}>
                                        <td>{t.customer}</td>
                                        <td>{t.desc}</td>
                                        <td>
                                            {t.assignedTo || (
                                                <span className="text-muted">Unassigned</span>
                                            )}
                                        </td>
                                        <td>
                                            <span className={getstatuscss(t.status)}>
                                                {t.status}
                                            </span>
                                        </td>
                                        <td>{t.raisedOn}</td>
                                        <td>
                                            <button 
                                                onClick={() => handleeditclick(t.desc)} 
                                                className="btn btn-sm btn-outline-primary"
                                                title="Edit ticket"
                                            >
                                                <i className="bi bi-pencil"></i>
                                                Edit
                                            </button>
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

export default Ticketlist;