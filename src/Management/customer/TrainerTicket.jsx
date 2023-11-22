import { useState } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import ReworkSidebar from "../component/sidebar/ReworkSidebar";
import { ThemeProvider } from "react-bootstrap";
import TrainerTicketDetailView from "./TrainerTicketDetailView";
import TrainerTicketListView from "./TrainerTicketListView";
import { ochreTheme } from "../themes/Theme";
import TrainerFinishTicketView from "./TrainerFinishTicketView";

export default function TrainerTicketComponent() {
    const [renderedIndex, setRenderedIndex] = useState(1); // 0: Detail, 1: List Assigned, 2: Finish Ticket
    const [ticketIdForDetail, setTicketIdForDetail] = useState();

    const navigate = useNavigate();
    const accessToken = JSON.parse(localStorage.getItem('user-token'));
    const userRole = jwtDecode(accessToken).role;
    if (userRole === "Staff" || userRole === "Manager") {
        navigate("/management/customerreq");
    } else if (userRole === "Trainer") {
        navigate("/management/trainerticket");
    }

    const handleTicketIdForDetail = (ticketId) => {
        setTicketIdForDetail(ticketId);
    }
    const onRenderedIndexSelect = (renderedIndex) => {
        setRenderedIndex(renderedIndex)
    }

    let renderedComponents = [
        <TrainerTicketDetailView
            callBackRenderedIndex={onRenderedIndexSelect}
            ticketIdForDetail={ticketIdForDetail}
        />,
        <TrainerTicketListView
            callBackRenderedIndex={onRenderedIndexSelect}
            callbackTicketIdForDetail={handleTicketIdForDetail}
        />,
        <TrainerFinishTicketView
        callBackRenderedIndex={onRenderedIndexSelect}
        ticketIdForDetail={ticketIdForDetail}
        />
    ]

    return (
        <div className="workshop-container">
            <ThemeProvider theme={ochreTheme}>
                <ReworkSidebar selectTab={1} />
                <Grid container spacing={1} sx={{ margin: "15px" }}>
                    {renderedComponents[renderedIndex]}
                </Grid>
            </ThemeProvider>
        </div>
    )
}