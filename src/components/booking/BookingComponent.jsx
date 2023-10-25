import { useEffect, useState, useContext } from "react";
import { AppointmentPicker } from "react-appointment-picker";

import { DatePickerCalendar } from "react-nice-dates";
import "react-nice-dates/build/style.css";

import { Container, Row, Col } from "react-bootstrap";
import { getDay } from "date-fns";

import "./booking.scss"

function BookingComponent() {
    const [lodaing, setLoading] = useState(false);
    const [date, setDate] = useState(new Date(new Date().setHours(8, 0, 0, 0)));
    const [days, setDays] = useState([[]]);
    const [appointment, setAppointment] = useState("");

    const modifiers = {
        disabled: (date) => getDay(date) === 0 || getDay(date) === 6 // Disables Saturdays
    };

    useEffect(() => {
        if (date != null) {
            console.log("getting appointments");
            const days = [
                [
                    {
                        id: 1,
                        number: 1,
                        isReserved: true
                    },
                    {
                        id: 2,
                        number: 2,
                        isReserved: true
                    },
                    {
                        id: 3,
                        number: 3
                    },
                    {
                        id: 4,
                        number: 4,
                        isSelected: true
                    },
                    {
                        id: 5,
                        number: 5
                    }
                ]
            ];
            setAppointment(
                <AppointmentPicker
                    addAppointmentCallback={addAppointmentCallbackContinuousCase}
                    removeAppointmentCallback={removeAppointmentCallbackContinuousCase}
                    initialDay={date}
                    days={days}
                    maxReservableAppointments={1}
                    visible
                    selectedByDefault
                    unitTime={3600000}
                    loading={lodaing}
                    continuous
                />
            );
        }
    }, [date, lodaing]);

    // useEffect(() => {
    //   console.log(appointments)
    //   if (appointments.length > 0) {
    //     setDays(appointments)
    //   }
    // }, [appointments])

    async function addAppointmentCallbackContinuousCase({
        addedAppointment: { day, number, time, id },
        addCb,
        removedAppointment: params,
        removeCb
    }) {
        setLoading(true);
        if (removeCb) {
            //await removeAppointment({ params });
            console.log(
                `Removed appointment ${params.number}, day ${params.day}, time ${params.time}, id ${params.id}`
            );
            removeCb(params.day, params.number);
        }

        //await addAppointment({ id, number, day, time });
        //console.log(error);
        addCb(day, number, time, id);
        setLoading(false);
    }

    async function removeAppointmentCallbackContinuousCase(
        { day, number, time, id },
        removeCb
    ) {
        setLoading(true);
        let params = { id, number, day, time };
        //await removeAppointment({ params });
        console.log(
            `Removed appointment ${number}, day ${day}, time ${time}, id ${id}`
        );
        removeCb(day, number);
        setLoading(false);
    }

    const [inputValues, setInputValues] = useState({
        field1: '',
        field2: '',
        field3: '',
        field4: '',
        field5: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [name]: value,
        }));
    };


    return (
        <div className="booking-container">
            <div className="booking_section booking_section-inputcontainer">
                <div className="booking_section_input booking_section_input-input">
                    <div className="booking_section_input_input">
                        <input
                            type="text"
                            name="field1"
                            placeholder="Name"
                            value={inputValues.field1}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="field2"
                            placeholder="Phone Number"
                            value={inputValues.field2}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="booking_section_input_input">
                        <input
                            type="text"
                            name="field3"
                            placeholder="Your Needs"
                            value={inputValues.field3}
                            onChange={handleInputChange}
                            required
                        />
                        <label for={inputValues.field4}>Choose your service</label>
                        <select id={inputValues.field4}>
                            <option value="inhome">In Home Consultation</option>
                            <option value="online">Online Consultation</option>
                        </select>
                    </div>
                    <div className="booking_section_input_input">
                        <label for={inputValues.field5}>Choose Your Consultant</label>
                        <select id={inputValues.field5}>
                            <option value="inhome">Dr. Pham Nhat An</option>
                            <option value="online">Dr. Nguyen Thanh Trung</option>
                        </select>
                    </div>
                </div>
                <div className="booking_section_input booking_section_input-appointment">
                    {appointment}
                </div>
            </div>
            <Container fluid className="booking_section booking_section-calendar">
                <DatePickerCalendar
                    date={date}
                    onDateChange={setDate}
                    modifiers={modifiers}
                    className="booking_section_calendar-datepicker"
                />

                <div className="booking_section_calendar-button">
                    <button>Submit your letter</button>
                </div>
            </Container>

        </div>
    );
}

export default BookingComponent;
