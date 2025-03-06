import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SecuredRoutes({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            const isUserLogged = localStorage.getItem("loggedIn");
            if (!isUserLogged || isUserLogged !== "true") {
                navigate("/login", { replace: true });
            } else {
                setIsLoggedIn(true);
            }
            setIsLoading(false);
        };

        checkAuth();
    }, [navigate]);

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return isLoggedIn ? children : null;
}

export default SecuredRoutes;