import { useEffect, useState } from "react";
import "./Navbar.css";
import { useNavigate, Link, useLocation } from "react-router-dom";

function Navbar() {
    const [islogged, setLoggedinstatus] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        const value = localStorage.getItem("loggedIn");
        if (value && value === "true") {
            setLoggedinstatus(true);
        } else {
            setLoggedinstatus(false);
            if (!location.pathname.includes('login') && !location.pathname.includes('signup')) {
                navigate("/login");
            }
        }
    }, [navigate, location]);

    function handlesignout() {
        localStorage.removeItem("loggedIn");
        navigate("/login");
    }

    function handleLogoClick(e) {
        e.preventDefault();
        if (islogged) {
            navigate("/");
        } else {
            navigate("/login");
        }
    }

    const isActive = (path) => {
        return location.pathname === path ? "active" : "";
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="nav-text navbar-brand d-flex align-items-center" href="/" onClick={handleLogoClick}>
                    <i className="bi bi-cloud me-2 text-primary"></i>
                    <span className="brand-text">
                        <span className="text-primary">Sales</span>
                        <span className="text-secondary">Cloud</span>
                    </span>
                </a>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {islogged && (
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link 
                                    className={`nav-text nav-link ${isActive("/") || isActive("/dashboard")}`} 
                                    to="/"
                                >
                                    <i className="bi bi-speedometer2 me-1"></i>
                                    Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                    className={`nav-text nav-link ${isActive("/customers")}`} 
                                    to="/customers"
                                >
                                    <i className="bi bi-people me-1"></i>
                                    Customers
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                    className={`nav-text nav-link ${isActive("/tickets")}`} 
                                    to="/tickets"
                                >
                                    <i className="bi bi-ticket-detailed me-1"></i>
                                    Tickets
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                    className={`nav-text nav-link ${isActive("/users")}`} 
                                    to="/users"
                                >
                                    <i className="bi bi-person-gear me-1"></i>
                                    Users
                                </Link>
                            </li>
                        </ul>
                    )}
                    <div className="headerbutton">
                        {!islogged ? (
                            <>
                                <Link className="btn btn-success me-2" to="/signup">
                                    <i className="bi bi-person-plus me-1"></i>
                                    Sign Up
                                </Link>
                                <Link className="btn btn-primary" to="/login">
                                    <i className="bi bi-box-arrow-in-right me-1"></i>
                                    Login
                                </Link>
                            </>
                        ) : (
                            <button onClick={handlesignout} className="btn btn-outline-danger">
                                <i className="bi bi-box-arrow-right me-1"></i>
                                Sign Out
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;