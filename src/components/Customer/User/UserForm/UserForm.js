import { useEffect, useState } from "react";
import "./UserForm.css";
import { useNavigate, useParams } from "react-router-dom"; 

function UserForm() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        isActive: false
    });
    const [errors, setErrors] = useState({});
    const { username } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (username) {
            fetch("https://crm-app-api-ybms.onrender.com/api/user/" + username)
                .then(res => res.json())
                .then(res => {
                    setUser(res);
                })
                .catch(error => {
                    console.error("Error fetching user:", error);
                });
        }
    }, [username]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        fetch("https://crm-app-api-ybms.onrender.com/api/user", {
            method: username ? "PUT" : "POST",
            body: JSON.stringify(user),
            headers: { "Content-Type": "application/json" },
        })
        .then(res => res.json())
        .then(() => {
            navigate("/users");
        })
        .catch(error => {
            console.error("Error submitting user:", error);
            setErrors({ submit: "Failed to save user. Please try again." });
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!user.name?.trim()) {
            newErrors.name = "Name is required";
        }

        if (!user.email?.trim()) {
            newErrors.email = "Email is required";
        } else if (!isValidEmail(user.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!user.username?.trim()) {
            newErrors.username = "Username is required";
        }

        if (!username && !user.password?.trim()) {
            newErrors.password = "Password is required for new users";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const updateUser = (field, value) => {
        setUser(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        <div className="container">
            <div className="page-header">
                <h1>{username ? 'Update User' : 'Create New User'}</h1>
                <p>Enter user details below</p>
            </div>

            <div className="content-wrapper">
                <form onSubmit={handleSubmit}>
                    {errors.submit && (
                        <div className="alert alert-danger mb-4" role="alert">
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            {errors.submit}
                        </div>
                    )}

                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <label className="form-label" htmlFor="name">Name</label>
                            <input 
                                id="name"
                                type="text"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                value={user.name || ''}
                                onChange={(e) => updateUser('name', e.target.value)}
                                placeholder="Enter full name"
                            />
                            {errors.name && (
                                <div className="invalid-feedback">{errors.name}</div>
                            )}
                        </div>

                        <div className="col-md-6 mb-4">
                            <label className="form-label" htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                value={user.email || ''}
                                onChange={(e) => updateUser('email', e.target.value)}
                                placeholder="Enter email address"
                            />
                            {errors.email && (
                                <div className="invalid-feedback">{errors.email}</div>
                            )}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <label className="form-label" htmlFor="username">Username</label>
                            <input 
                                id="username"
                                type="text"
                                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                value={user.username || ''}
                                onChange={(e) => updateUser('username', e.target.value)}
                                placeholder="Choose a username"
                            />
                            {errors.username && (
                                <div className="invalid-feedback">{errors.username}</div>
                            )}
                        </div>

                        <div className="col-md-6 mb-4">
                            <label className="form-label" htmlFor="password">
                                Password
                                {username && (
                                    <small className="text-muted">(Leave blank to keep current)</small>
                                )}
                            </label>
                            <div className="input-group">
                                <input
                                    id="password"
                                    type="password"
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    value={user.password || ''}
                                    onChange={(e) => updateUser('password', e.target.value)}
                                    placeholder={username ? "Enter new password" : "Choose a password"}
                                />
                                <span className="input-group-text">
                                    <i className="bi bi-key"></i>
                                </span>
                                {errors.password && (
                                    <div className="invalid-feedback">{errors.password}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="isActive"
                                checked={user.isActive || false}
                                onChange={(e) => updateUser('isActive', e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="isActive">
                                Active Account
                            </label>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <button 
                            type="button" 
                            className="btn btn-secondary"
                            onClick={() => navigate('/users')}
                        >
                            <i className="bi bi-arrow-left"></i>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            <i className="bi bi-check-lg"></i>
                            {username ? 'Update User' : 'Create User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserForm;