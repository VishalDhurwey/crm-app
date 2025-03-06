import "./CustomerList.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    
    const navigate = useNavigate();

    useEffect(() => {
        loadCustomers(1);
    }, []);

    const loadCustomers = (pageNo) => {
        setLoading(true);
        fetch("https://crm-app-api-ybms.onrender.com/api/customer/page/" + pageNo)
            .then(res => res.json())
            .then((res) => {
                // Add random dummy websites for customers
                const customersWithWebsites = res.records.map(customer => ({
                    ...customer,
                    website: customer.website || `https://www.${customer.name.toLowerCase().replace(/\s+/g, '')}.com`
                }));
                setCustomers(customersWithWebsites);
                setFilteredCustomers(customersWithWebsites);
                setCurrentPage(pageNo);
                setTotalPages(Math.ceil(res.totalCount / 90));
                setLoading(false);
            })
            .catch(error => {
                console.error("Error loading customers:", error);
                setLoading(false);
            });
    };
    
    const handleNewCustomer = () => {
        navigate("/customerform");
    };
    
    const handleEdit = (name) => {
        navigate("/customerform/" + name);
    };
    
    const handleDelete = (name) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            fetch("https://crm-app-api-ybms.onrender.com/api/customer/" + name, {
                method: "DELETE"
            })
            .then(res => res.json())
            .then(() => {
                loadCustomers(currentPage);
            })
            .catch(error => {
                console.error("Error deleting customer:", error);
            });
        }
    };   

    const getStatusBadgeClass = (status) => {
        switch (status.toLowerCase()) {
            case "new": return "badge bg-info";
            case "accepted": return "badge bg-success";
            case "rejected": return "badge bg-danger";
            default: return "badge bg-secondary";
        }
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
        if (!value.trim()) {
            setFilteredCustomers(customers);
        } else {
            const searchValue = value.toLowerCase();
            const filtered = customers.filter(customer => 
                customer.name.toLowerCase().includes(searchValue)
            );
            setFilteredCustomers(filtered);
        }
    };

    return (
        <div className="customer-list-container">
            <div className="page-header">
                <div className="header-content">
                    <h1>Customer Management</h1>
                    <p>Manage and track all your customer information</p>
                </div>
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
                                placeholder="Search by customer name..." 
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    <button 
                        onClick={handleNewCustomer} 
                        className="btn btn-primary"
                    >
                        <i className="bi bi-plus-lg"></i> Add New Customer
                    </button>
                </div>

                {loading ? (
                    <div className="text-center my-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : filteredCustomers.length === 0 ? (
                    <div className="alert alert-info" role="alert">
                        <i className="bi bi-info-circle me-2"></i>
                        No customers found matching "{searchTerm}". Try a different search term or add a new customer.
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Website</th>
                                    <th>Turnover</th>
                                    <th>Employees</th>
                                    <th>Status</th>
                                    <th>CEO</th>
                                    <th>Est. Year</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCustomers.map(customer => (
                                    <tr key={customer.name}>
                                        <td>{customer.name}</td>
                                        <td>
                                            <a href={customer.website} 
                                               target="_blank" 
                                               rel="noopener noreferrer"
                                               className="website-link"
                                            >
                                                <i className="bi bi-globe me-1"></i>
                                                {customer.website.replace(/^https?:\/\/(www\.)?/, '')}
                                            </a>
                                        </td>
                                        <td>${customer.turnover.toLocaleString()}</td>
                                        <td>{customer.employees.toLocaleString()}</td>
                                        <td>
                                            <span className={getStatusBadgeClass(customer.status)}>
                                                {customer.status}
                                            </span>
                                        </td>
                                        <td>{customer.ceo}</td>
                                        <td>{customer.year}</td>
                                        <td>
                                            <div className="btn-group">
                                                <button 
                                                    onClick={() => handleEdit(customer.name)} 
                                                    className="btn btn-sm btn-outline-primary"
                                                    title="Edit customer"
                                                >
                                                    <i className="bi bi-pencil"></i>
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(customer.name)} 
                                                    className="btn btn-sm btn-outline-danger"
                                                    title="Delete customer"
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </td>   
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <nav aria-label="Customer list pagination" className="d-flex justify-content-center mt-4">
                            <ul className="pagination">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button 
                                        className="page-link" 
                                        onClick={() => loadCustomers(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        <i className="bi bi-chevron-left"></i>
                                    </button>
                                </li>
                                {[...Array(totalPages)].map((_, i) => (
                                    <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                        <button 
                                            className="page-link" 
                                            onClick={() => loadCustomers(i + 1)}
                                        >
                                            {i + 1}
                                        </button>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <button 
                                        className="page-link" 
                                        onClick={() => loadCustomers(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                    >
                                        <i className="bi bi-chevron-right"></i>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CustomerList;