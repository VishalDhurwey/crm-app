import { useState } from "react";
import "./LogIn.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function LogIn(){
    const[logindetails, setLogindetails] = useState({
        username: '',
        password: ''
    });
    const[invalidcreds, setInvalidcreds] = useState(false);
    const navigate = useNavigate();

    function handlelogin(e){
        e.preventDefault();
        setInvalidcreds(false);

        fetch("https://crm-app-api-ybms.onrender.com/api/user/signin",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(logindetails),
        })
        .then((res) => {
            if(res.status === 400){
                setInvalidcreds(true);  
            } else if (res.status === 200){
                localStorage.setItem("loggedIn", "true");
                navigate("/dashboard");
            }
        })
        .catch((err) => {
            console.error("Login error:", err);
            setInvalidcreds(true);
        });
    }

    function handlesignup(){
        navigate("/signup");
    }

    return (
        <motion.div 
            className="Loginpage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >  
            <motion.div 
                className="loginform"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <div className="text-center mb-4">
                    <div className="brand-logo mb-3">
                        <i className="bi bi-cloud text-primary"></i>
                    </div>
                    <div className="brand-name mb-2">
                        <span className="text-primary">Sales</span>
                        <span className="text-secondary">Cloud</span>
                    </div>
                    <p className="text-muted">Sign in to your account</p>
                </div>
                
                {invalidcreds && (
                    <motion.div 
                        className="alert alert-danger"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        role="alert"
                    >
                        Invalid username or password!
                    </motion.div>
                )}

                <form onSubmit={handlelogin}>
                    <div className="mb-3">
                        <label className="form-label">
                            <i className="bi bi-person me-2"></i>
                            Username
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={logindetails.username}
                            onChange={(e) => setLogindetails({...logindetails, username: e.target.value})}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            <i className="bi bi-lock me-2"></i>
                            Password
                        </label>
                        <input 
                            type="password"
                            className="form-control"
                            value={logindetails.password}
                            onChange={(e) => setLogindetails({...logindetails, password: e.target.value})}
                            required
                        />
                    </div>
                    
                    <div className="form-button">
                        <motion.button
                            type="submit"
                            className="btn btn-primary w-100 mb-2"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <i className="bi bi-box-arrow-in-right me-2"></i>
                            Sign In
                        </motion.button>
                        <motion.button
                            type="button"
                            className="btn btn-outline-primary w-100"
                            onClick={handlesignup}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <i className="bi bi-person-plus me-2"></i>
                            Create Account
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}

export default LogIn;