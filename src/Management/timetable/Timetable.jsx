import React, { useState } from "react";
import "./timetable.scss";
import Sidebar from "../component/sidebar/Sidebar";


function TimeTable() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [busySlots, setBusySlots] = useState(Array(8).fill({ date: null, reason: '' }));

    const handleDateChange = (e) => {
        setSelectedDate(new Date(e.target.value));
    };

    const handleSlotClick = (index) => {
        const updatedSlots = [...busySlots];
        if (updatedSlots[index].date) {
            updatedSlots[index] = { date: null, reason: '' };
        } else {
            updatedSlots[index] = { date: selectedDate, reason: '' };
        }
        setBusySlots(updatedSlots);
    };

    return (
        <>
            <div className="timetable-container">
                <Sidebar />
                <div className="timetable-wrapper">
                    <div>
                        <h2>TimeTable</h2>
                        <label>Select Date:</label>
                        <input type="date" value={selectedDate.toISOString().split('T')[0]} onChange={handleDateChange} />

                        <div className="timetable">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Time Slot</th>
                                        <th>Busy?</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {busySlots.map((slot, index) => (
                                        <tr key={index} onClick={() => handleSlotClick(index)} className={slot.date ? 'busy' : ''}>
                                            <td>Slot {index + 1}</td>
                                            <td>{slot.date ? 'Busy' : 'Free'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default TimeTable;
