import { Button, Drawer, Grid, ThemeProvider } from "@mui/material";
import WorkshopPane from "./workshop/workshop-pane/WorkshopPane";
import CreateWorkshopComponent from "./workshop/create-workshop/CreateWorkshop";
import { useState } from "react";
import { ochreTheme } from "../themes/Theme";
import WorkshopDetailOverviewComponent from "./detail-overview/detail/WorkshopDetailOverview";
import ReworkSidebar from "../component/sidebar/ReworkSidebar";
import ClassManagementComponent from "./classes/ClassManagementComponent";
import { ToastContainer } from "react-toastify";
import ClassAddNewComponent from "./classes/ClassAddNewComponent";
import TrainerSlotDetailComponent from "./trainer/TrainerSlotDetailComponent";

export default function WorkshopManagementComponent() {
  const [renderedIndex, setRenderedIndex] = useState(0);
  const [statusFilter, setStatusFilter] = useState("Active"); // State for status filter
  const [selectedWorkshop, setSelectedWorkshop] = useState();
  const [open, setOpen] = useState(false);

  const handleFilterClick = () => {
    // Toggle between 'Active' and 'Deactive' status filter
    setStatusFilter(statusFilter === "Active" ? "Inactive" : "Active");
  };
  const onDetailView = (workshop) => {
    setSelectedWorkshop(workshop);
    setRenderedIndex(2);
  };
  const onClassView = (workshop) => {
    setSelectedWorkshop(workshop);
    setRenderedIndex(3);
  };
  const handleCreateWorkshop = (workshop) => {
    setSelectedWorkshop(workshop);
    setStatusFilter("Inactive");
    setRenderedIndex(2);
  };
  const handleOpenModal = (workshop) => {
    setSelectedWorkshop(workshop);
    setOpen(true);
  };

  const handleCloseModal = () => {
    // setSelectedWorkshop(null);
    setOpen(false);
  };
  const callbackCreateClass= () => {
    setOpen(false);
    setRenderedIndex(3);
  }
  let renderedComponents = [
    <WorkshopPane
      statusFilter={statusFilter}
      onDetailRequest={onDetailView}
      onClassesRequest={onClassView}
      onCreateClassRequest={handleOpenModal}
    />,
    <CreateWorkshopComponent callbackCreateWorkshop={handleCreateWorkshop} />,
    <WorkshopDetailOverviewComponent workshop={selectedWorkshop} />,
    <ClassManagementComponent selectedWorkshop={selectedWorkshop} />,
    // <TrainerSlotDetailComponent entityId={28}/>
  ];

  
  return (
    <div className="workshop-container">
      <ToastContainer />

      <ThemeProvider theme={ochreTheme}>
        <ReworkSidebar selectTab={4} />
        {/* <Button
                variant="contained"
                color="ochre"
                onClick={() => setRenderedIndex(4)}
              >
                Test trainer slot
              </Button> */}
        <Grid container spacing={1} padding={5}>
          <Grid container item xs={6} justifyContent="flex-start" padding={3}>
            {renderedIndex === 0 ? (
              // <Button
              //   color="ochre"
              //   variant="contained"
              //   onClick={handleFilterClick}
              // >
              //   {statusFilter}
              // </Button>
              <Button
                variant="contained"
                color="ochre"
                onClick={() => setRenderedIndex(1)}
              >
                Add new workshop
              </Button>
            ) : (
              <Button
                color="ochre"
                variant="contained"
                onClick={() => setRenderedIndex(0)}
              >
                Back
              </Button>
            )}
          </Grid>
          <Grid container item xs={6} justifyContent="flex-end" padding={3}>
            {!(renderedIndex === 0) ? (
              <></>
            ) : (
              // <Button
              //   variant="contained"
              //   color="ochre"
              //   onClick={() => setRenderedIndex(1)}
              // >
              //   Add new workshop
              // </Button>
              <Button
                color="ochre"
                variant="contained"
                onClick={handleFilterClick}
              >
                {statusFilter}
              </Button>
            )}
          </Grid>
          <Grid item xs={12}>
            {renderedComponents[renderedIndex]}
          </Grid>
        </Grid>
        <ClassAddNewComponent
        selectedWorkshop={selectedWorkshop}
        open={open}
        handleClose={handleCloseModal}
        callbackCreateClass={callbackCreateClass}
      />
      </ThemeProvider>
    </div>
  );
}
