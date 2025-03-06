import { useEffect, useState } from "react";
import "./CustomerForm.css";
import { useNavigate, useParams } from "react-router-dom"; 

function CustomerForm() {
    const [customer, setCustomer] = useState({
        name: '',
        website: '',
        turnover: '',
        employees: '',
        ceo: '',
        year: '',
        status: 'New'
    });
    const { customername } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (customername) {
            fetch("https://crm-app-api-ybms.onrender.com/api/customer/" + customername)
                .then(res => res.json())
                .then(res => {
                    setCustomer(res);
                })
                .catch(error => {
                    console.error("Error fetching customer:", error);
                });
        }
    }, [customername]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch("https://crm-app-api-ybms.onrender.com/api/customer", {
            method: customername ? "PUT" : "POST",
            body: JSON.stringify(customer),
            headers: { "Content-Type": "application/json" },
        })
        .then(res => res.json())
        .then(() => {
            navigate("/");
        })
        .catch(error => {
            console.error("Error submitting customer:", error);
        });
    };

    const updateCustomer = (field, value) => {
        setCustomer(prev => ({ ...prev, [field]: value }));
    };

    const statusOptions = [
        { label: "New", value: "New" },
        { label: "Accepted", value: "Accepted" },
        { label: "Rejected", value: "Rejected" }
    ];

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header">
                    <h2 className="mb-0">
                        {customername ? 'Update Customer' : 'Create New Customer'}
                    </h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="form-label">Name</label>
                            <input 
                                type="text"
                                className="form-control"
                                value={customer.name || ''}
                                onChange={(e) => updateCustomer('name', e.target.value)}
                                placeholder="Enter customer name"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Website</label>
                            <input
                                type="url"
                                className="form-control"
                                value={customer.website || ''}
                                onChange={(e) => updateCustomer('website', e.target.value)}
                                placeholder="Enter website URL"
                            />
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <label className="form-label">Turnover</label>
                                <div className="input-group">
                                    <span className="input-group-text">$</span>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={customer.turnover || ''}
                                        onChange={(e) => updateCustomer('turnover', e.target.value)}
                                        placeholder="Annual turnover"
                                        min="0"
                                    />
                                </div>
                            </div>

                            <div className="col-md-6 mb-4">
                                <label className="form-label">No. of Employees</label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    value={customer.employees || ''}
                                    onChange={(e) => updateCustomer('employees', e.target.value)}
                                    placeholder="Number of employees"
                                    min="1"
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <label className="form-label">CEO</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    value={customer.ceo || ''}
                                    onChange={(e) => updateCustomer('ceo', e.target.value)}
                                    placeholder="CEO name"
                                />
                            </div>

                            <div className="col-md-6 mb-4">
                                <label className="form-label">Established In</label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    value={customer.year || ''}
                                    onChange={(e) => updateCustomer('year', e.target.value)}
                                    placeholder="Year established"
                                    min="1800"
                                    max={new Date().getFullYear()}
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Status</label>
                            <select 
                                className="form-select"
                                value={customer.status || 'New'}
                                onChange={(e) => updateCustomer('status', e.target.value)}
                            >
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

                        <div className="d-flex justify-content-between align-items-center">
                            <button 
                                type="button" 
                                className="btn btn-secondary"
                                onClick={() => navigate('/')}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                {customername ? 'Update Customer' : 'Create Customer'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CustomerForm;