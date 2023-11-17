import React from 'react';
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css"
import {useNavigate} from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    const logOutCallback = async () => {
        await fetch('http://localhost:4000/logout', {
            method: 'POST',
            credentials: 'include'
        });
        localStorage.clear();
        navigate('/login');
    }

    return (
        <div>
            <Button variant="primary" onClick={logOutCallback}>Logout</Button>
        </div>
    );
}

export default Logout;