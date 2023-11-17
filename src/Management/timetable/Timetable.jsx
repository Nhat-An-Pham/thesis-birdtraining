import React, { useState } from "react";
import "./timetable.scss";
import ReworkSidebar from "../component/sidebar/ReworkSidebar";

import { Calendar, momentLocalizer } from 'react-big-calendar';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';




function TimeTable() {
    const localizer = momentLocalizer(moment);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedEmployee, setSelectedEmployee] = useState([]);
    const events = [
        {
            title: 'Sự kiện 1',
            start: new Date(2023, 10, 20, 10, 0),
            end: new Date(2023, 10, 20, 12, 0),
        },
        {
            title: 'Sự kiện 2',
            start: new Date(2023, 10, 21, 14, 0),
            end: new Date(2023, 10, 21, 16, 0),
        },
        // Thêm các sự kiện khác tại đây
    ];

    const employees = [
        { id: 1, name: 'Pham Nhat An' },
        { id: 2, name: 'Nguyen Thanh Trung' },
        { id: 3, name: 'Hoang Dinh Thong' },
        // Thêm các nhân viên khác tại đây
    ];

    const handleEmployeeChange = (employee) => {
        setSelectedEmployee(employee);
    };
    return (
        <>
            <div className="timetable-container">
                <ReworkSidebar />
                <div className="timetable-wrapper">
                    <div className="timetable_section timetable_section-center">
                        <h2>CENTER SCHEDULE</h2>
                        <Calendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 500 }}
                        />
                        <div className="timetable_section_center-button">
                            <button>Add New Event</button>
                        </div>
                    </div>
                    <div className="timetable_section timetable_section-employee">
                        <h2>EMPLOYEE SCHEDULE</h2>
                        <div>
                            <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
                        </div>
                        <div className="timetable_section_employee-select">
                            <select onChange={(e) => handleEmployeeChange(e.target.value)}>
                                <option value="">Employee</option>
                                {employees.map((employee) => (
                                    <option key={employee.id} value={employee.id}>
                                        {employee.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {selectedEmployee && (
                            <Calendar
                                localizer={localizer}
                                events={events}
                                startAccessor="start"
                                endAccessor="end"
                                style={{ height: 500 }}
                            />
                        )}
                        <div className="timetable_section_employee-button">
                            <button>Add New Event</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TimeTable;
