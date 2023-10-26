import React, { useState } from 'react'
import Sidebar from '../component/sidebar/Sidebar'
import "./workshop.scss"
import { Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Paper, } from "@mui/material";

const Workshop = () => {

    const [selectedWorkshop, setSelectedWorkshop] = useState(null);

    const handleWorkshopClick = (workshopId) => {
        setSelectedWorkshop(workshopId);
    };

    const workshops = [
        { id: 1, name: "Workshop 1", location: "Location 1", capacity: 30 },
        { id: 2, name: "Workshop 2", location: "Location 2", capacity: 25 },
        { id: 3, name: "Workshop 3", location: "Location 3", capacity: 20 },
    ];

    const classes = [
        { id: 1, name: "Class 1", instructor: "Instructor A", time: "9:00 AM", workshopId: 1 },
        { id: 2, name: "Class 2", instructor: "Instructor B", time: "10:30 AM", workshopId: 1 },
        { id: 3, name: "Class 3", instructor: "Instructor C", time: "11:30 AM", workshopId: 2 },
        { id: 4, name: "Class 4", instructor: "Instructor D", time: "1:00 PM", workshopId: 2 },
    ];

    return (
        <div className='workshop-container'>
            <Sidebar />
            <div className='workshop_section-wrapper'>
                <div className='workshop_section_table workshop_section_table-workshop'>
                    <h2>Workshops</h2>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Workshop Name</TableCell>
                                    <TableCell>Location</TableCell>
                                    <TableCell>Capacity</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {workshops && workshops.length > 0 ? (
                                    workshops.map((workshop) => (
                                        <TableRow
                                            key={workshop.id}
                                            onClick={() => handleWorkshopClick(workshop.id)}
                                            style={{ cursor: "pointer", background: selectedWorkshop === workshop.id ? "#f0f0f0" : "white" }}
                                        >
                                            <TableCell>{workshop.name}</TableCell>
                                            <TableCell>{workshop.location}</TableCell>
                                            <TableCell>{workshop.capacity}</TableCell>
                                        </TableRow>
                                    ))
                                ) : null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className='workshop_section_table-button'>
                        <button>Add New Workshop</button>
                    </div>
                </div>
                <div className='workshop_section_table workshop_section_table-classes'>
                    <h2>Classes</h2>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Class Name</TableCell>
                                    <TableCell>Instructor</TableCell>
                                    <TableCell>Time</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedWorkshop !== null && classes && classes.length > 0
                                    ? classes
                                        .filter((cls) => cls.workshopId === selectedWorkshop)
                                        .map((cls) => (
                                            <TableRow key={cls.id}>
                                                <TableCell>{cls.name}</TableCell>
                                                <TableCell>{cls.instructor}</TableCell>
                                                <TableCell>{cls.time}</TableCell>
                                            </TableRow>
                                        ))
                                    : null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className='workshop_section_table-button'>
                        <button>Add New Class</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Workshop