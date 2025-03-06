import { useEffect, useState } from "react";
import "./Ticketform.css";
import { useNavigate, useParams } from "react-router-dom";
import { Dropdown } from 'primereact/dropdown';

function Ticketform() {
    const [users, setUsers] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [ticket, setTicket] = useState({});
    const [valueMissing, setValueMissing] = useState(false);
    const navigate = useNavigate();
    const { desc } = useParams();

    useEffect(() => {
        Promise.all([
            fetch("https://crm-app-api-ybms.onrender.com/api/user").then(res => res.json()),
            fetch("https://crm-app-api-ybms.onrender.com/api/customer").then(res => res.json()),
            desc ? fetch("https://crm-app-api-ybms.onrender.com/api/ticket/" + desc).then(res => res.json()) : Promise.resolve(null)
        ]).then(([users, customers, ticketData]) => {
            setUsers(users);
            setCustomers(customers);
            if (ticketData) {
                setTicket(ticketData);
            }
        }).catch(error => {
            console.error("Error fetching data:", error);
        });
    }, [desc]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setValueMissing(false);

        if (!ticket.status) {
            setValueMissing(true);
            return;
        }

        fetch("https://crm-app-api-ybms.onrender.com/api/ticket", {
            method: desc ? "PUT" : "POST",
            body: JSON.stringify(ticket),
            headers: { "Content-Type": "application/json" },
        })
        .then(() => {
            navigate("/tickets");
        })
        .catch((err) => {
            console.error("Error submitting ticket:", err);
        });
    };

    const updateTicket = (field, value) => {
        setTicket(prev => ({ ...prev, [field]: value }));
    };

    const statusOptions = [
        { label: "New", value: "New" },
        { label: "Assigned", value: "Assigned" },
        { label: "In Progress", value: "In Progress" },
        { label: "Resolved", value: "Resolved" }
    ];

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header">
                    <h2 className="mb-0">{desc ? 'Update Ticket' : 'Create New Ticket'}</h2>
                </div>
                <div className="card-body">
                    {valueMissing && (
                        <div className="alert alert-warning" role="alert">
                            Please select a status for the ticket
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="form-label">Customer Name</label>
                            <Dropdown 
                                disabled={desc}
                                value={customers.find(c => c.name === ticket.customer)}
                                onChange={(e) => updateTicket('customer', e.value.name)}
                                options={customers}
                                optionLabel="name"
                                placeholder="Select a Customer"
                                filter
                                className="w-full"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                value={ticket.desc || ''}
                                onChange={(e) => updateTicket('desc', e.target.value)}
                                placeholder="Enter ticket description"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Assigned To</label>
                            <Dropdown 
                                value={users.find(u => u.name === ticket.assignedTo)}
                                onChange={(e) => updateTicket('assignedTo', e.value.name)}
                                options={users}
                                optionLabel="name"
                                placeholder="Select a User"
                                filter
                                className="w-full"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Status</label>
                            <select 
                                className="form-select"
                                value={ticket.status || ''}
                                onChange={(e) => updateTicket('status', e.target.value)}
                            >
                                <option value="">Select Status</option>
                                {statusOptions.map(option => (
                                    <option 
                                        key={option.value} 
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Raised On</label>
                            <input
                                type="date"
                                className="form-control"
                                value={ticket.raisedOn || ''}
                                onChange={(e) => updateTicket('raisedOn', e.target.value)}
                                readOnly={desc}
                            />
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                            <button 
                                type="button" 
                                className="btn btn-secondary"
                                onClick={() => navigate('/tickets')}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-success">
                                {desc ? 'Update Ticket' : 'Create Ticket'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Ticketform;