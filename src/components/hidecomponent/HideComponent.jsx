import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

const HideComponent = ({ children }) => {

    const location = useLocation();
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (location.pathname === "/management" || location.pathname === "/management/customerreq" || location.pathname === "/management/timetable"
     || location.pathname === "/management/birdacademy" || location.pathname === '/management/userdata' || location.pathname === '/login' || location.pathname === '/signup'


     || location.pathname === '/payment' || location.pathname === "/management/workshop" || location.pathname === "/management/trainerticket" || location.pathname === "/management/onlinecourse" ) {

            setShow(false)
        } else {
            setShow(true)
        }
    }, [location])
    
    return (
        <div>{show && children}</div>
    )
}

export default HideComponent