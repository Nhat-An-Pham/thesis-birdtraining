import { Button, ThemeProvider } from "react-bootstrap";
import { ochreTheme } from "../themes/Theme";
import ReworkSidebar from "../component/sidebar/ReworkSidebar";
import AssignedTicketView from "./AssignedTicketView";
import NotAssignedTicketView from "./NotAssignedTicketView";
import HandledTicketView from "./HandledTicketView";
import TicketDetailView from "./TicketDetailView";
import { jwtDecode } from "jwt-decode";
import './customerReq.scss';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Grid } from "@mui/material";

export default function CustomerReqComponent() {
    const [renderedIndex, setRenderedIndex] = useState(1); // 0: Detail, 1: Assigned, 2: NotAssigned, 3: Handled
    const [ticketIdForDetail, setTicketIdForDetail] = useState();
    const [haveAssignedTrainer, setHaveAssignedTrainer] = useState(1); //1: Assigned, 2: NotAssigned, 3: Handled

    const navigate = useNavigate();
    const accessToken = JSON.parse(localStorage.getItem('user-token'));
    const userRole = jwtDecode(accessToken).role;

    if (userRole === "Trainer") {
        navigate("/management/trainerticket");
    } else if (userRole === "Staff" || userRole === "Manager") {
        navigate("/management/customerreq");
    }

    const handleTicketIdForDetail = (ticketId) => {
        setTicketIdForDetail(ticketId);
        setHaveAssignedTrainer(1)
    }

    const handleHaveAssignedTrainer = (haveAssignedTrainer) => {
        setHaveAssignedTrainer(haveAssignedTrainer)
    }

    const onRenderedIndexSelect = (renderedIndex) => {
        setRenderedIndex(renderedIndex)
    }


    let renderedComponents = [
        <TicketDetailView
            callBackRenderedIndex={onRenderedIndexSelect}
            ticketIdForDetail={ticketIdForDetail}
            callBackHaveAssignedTrainer={haveAssignedTrainer}
        />,
        <AssignedTicketView
            callBackRenderedIndex={onRenderedIndexSelect}
            callbackTicketIdForDetail={handleTicketIdForDetail}
            callBackHaveAssignedTrainer={handleHaveAssignedTrainer}
        />,
        <NotAssignedTicketView
            callBackRenderedIndex={onRenderedIndexSelect}
            callbackTicketIdForDetail={handleTicketIdForDetail}
            callBackHaveAssignedTrainer={handleHaveAssignedTrainer}
        />,
        <HandledTicketView
            callBackRenderedIndex={onRenderedIndexSelect}
            callbackTicketIdForDetail={handleTicketIdForDetail}
            callBackHaveAssignedTrainer={handleHaveAssignedTrainer}
        />
    ];

    return (
        <div className="workshop-container">
            <ThemeProvider theme={ochreTheme}>
                <ReworkSidebar selectTab={1} />
                <Grid container spacing={1} sx={{ margin: "15px" }}>
                    {renderedIndex === 0 ? (<></>) : (
                        <>
                            <Grid container item xs={5} justifyContent="flex-start">
                                {renderedIndex === 1 ? (
                                    <Button variant="contained" color="ochre" onClick={() => { onRenderedIndexSelect(2) }}>
                                        View Not Assigned Ticket
                                    </Button>
                                ) : (
                                    <Button variant="contained" color="ochre" onClick={() => { onRenderedIndexSelect(1) }}>
                                        View Assigned Ticket
                                    </Button>
                                )}
                            </Grid>

                            <Grid container item spacing={0} xs={5} justifyContent="flex-end">
                                {renderedIndex === 3 ? (
                                    <></>
                                ) : (
                                    <Button variant="contained" color="ochre" onClick={() => { onRenderedIndexSelect(3) }}>
                                        View Handled Ticket
                                    </Button>
                                )}
                            </Grid>
                        </>
                    )}
                    <Grid item xs={12}>
                        {renderedComponents[renderedIndex]}
                    </Grid>
                </Grid>
            </ThemeProvider>
        </div>
    )
}