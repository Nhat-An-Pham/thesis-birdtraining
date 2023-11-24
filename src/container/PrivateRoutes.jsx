import React from 'react'
import { Outlet, Navigate, useNavigate } from "react-router-dom"
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';

const PrivateRoutes = () => {
    const [userTokenRole, setUserTokenRole] = useState("");
    const navigate = useNavigate();
    useEffect(() => {

        const token = JSON.parse(localStorage.getItem('user-token'));
        if (token) {
            const decodedToken = jwtDecode(token);
            const newRole = decodedToken.role;
            if (!(newRole && (newRole === "Trainer" || newRole === "Staff" || newRole === "Manager" ||
                newRole === "Administrator"))) {
                navigate("/home")
            }
            setUserTokenRole(newRole);
        }
    }, []);

    return (
        userTokenRole && (userTokenRole === "Trainer" || userTokenRole === "Staff" || userTokenRole === "Manager" ||
            userTokenRole === "Administrator") ?
            <Outlet /> : null
    )

}

export default PrivateRoutes;