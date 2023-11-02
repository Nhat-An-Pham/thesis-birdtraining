import React from 'react'
import { Outlet, Navigate } from "react-router-dom"
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';

const PrivateRoutes = () => {
    const decodeToken = localStorage.getItem("user-token");
    const [userRole, setUserRole] = useState();
    useEffect(() => {
        if (decodeToken !== null) {
            setUserRole(jwtDecode(decodeToken).role)
        }
    }, [])

    return (
        userRole === "Trainer" || userRole === "Staff" || userRole === "Manager" ||
            userRole === "Administrator" && decodeToken !== null ?
            <Outlet /> : <Navigate to="/home" />
    )
}

export default PrivateRoutes