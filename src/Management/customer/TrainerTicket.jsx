import { useState } from "react";
import { Grid, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import ReworkSidebar from "../component/sidebar/ReworkSidebar";
import TrainerTicketDetailView from "./TrainerTicketDetailView";
import TrainerTicketListView from "./TrainerTicketListView";
import { ochreTheme } from "../themes/Theme";
import TrainerFinishTicketView from "./TrainerFinishTicketView";
import FinishedTicketView from "./FinishedTicketView";
import { useEffect } from "react";

export default function TrainerTicketComponent() {
  const [renderedIndex, setRenderedIndex] = useState(1); // 0: Detail, 1: List Assigned, 2: Finish Ticket, 3: Finished View
  const [ticketIdForDetail, setTicketIdForDetail] = useState();

  const navigate = useNavigate();
  const accessToken = JSON.parse(localStorage.getItem("user-token"));
  const userRole = jwtDecode(accessToken).role;

  useEffect(() => {
    if (userRole === "Staff" || userRole === "Manager") {
      navigate("/management/customerreq");
    }
  }, []);
  const handleTicketIdForDetail = (ticketId) => {
    setTicketIdForDetail(ticketId);
  };
  const onRenderedIndexSelect = (renderedIndex) => {
    setRenderedIndex(renderedIndex);
  };

  const handleCallBackToDetail = () => {
    setRenderedIndex(0);
  };

  const handleCallBackToList = () => {
    setRenderedIndex(1);
  };

  let renderedComponents = [
    <TrainerTicketDetailView
      callBackRenderedIndex={onRenderedIndexSelect}
      ticketIdForDetail={ticketIdForDetail}
      callBackToList={handleCallBackToList}
    />,
    <TrainerTicketListView
      callBackRenderedIndex={onRenderedIndexSelect}
      callbackTicketIdForDetail={handleTicketIdForDetail}
    />,
    <TrainerFinishTicketView
      callBackRenderedIndex={onRenderedIndexSelect}
      ticketIdForDetail={ticketIdForDetail}
      callBackToDetail={handleCallBackToDetail}
    />,
    <FinishedTicketView
      callBackRenderedIndex={onRenderedIndexSelect}
      callbackTicketIdForDetail={handleTicketIdForDetail}
    />,
  ];

  return (
    <div className="workshop-container">
      <ThemeProvider theme={ochreTheme}>
        <ReworkSidebar selectTab={1} />
        <Grid container spacing={1} sx={{ margin: "15px" }}>
          {renderedComponents[renderedIndex]}
        </Grid>
      </ThemeProvider>
    </div>
  );
}
