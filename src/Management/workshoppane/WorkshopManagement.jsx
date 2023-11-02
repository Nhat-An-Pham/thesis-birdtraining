import { Button, Drawer, Grid, ThemeProvider } from "@mui/material";
import Sidebar from "../component/sidebar/Sidebar";
import WorkshopPane from "./workshop/workshop-pane/WorkshopPane";
import CreateWorkshopComponent from "./workshop/create-workshop/CreateWorkshop";
import { useState } from "react";
import { ochreTheme } from "./Theme";
import WorkshopDetailOverviewComponent from "./detail-overview/detail/WorkshopDetailOverview";
import WorkshopPaneDrawerItems from "./WorkshopPaneDrawerItems";
import ReworkSidebar from "../component/sidebar/ReworkSidebar";

export default function WorkshopManagementComponent() {
  const [renderedIndex, setRenderedIndex] = useState(0);
  const [statusFilter, setStatusFilter] = useState("Active"); // State for status filter
  const [selectedWorkshop, setSelectedWorkshop] = useState();
  const [drawerState, setDrawerState] = useState(false);

  const handleFilterClick = () => {
    // Toggle between 'Active' and 'Deactive' status filter
    setStatusFilter(statusFilter === "Active" ? "Inactive" : "Active");
  };
  const handleSelectWorkshop = (workshop) => {
    setSelectedWorkshop(workshop);
    // setRenderedIndex(2);
  };
  const onDetailView = () => {
    setRenderedIndex(2);
  };
  const onClassView = () => {
    setRenderedIndex(3);
  };
  const toggleDrawer = (isOpen) => {
    return () => setDrawerState(isOpen);
  };

  const handleCreateWorkshop = (workshop) => {
    setSelectedWorkshop(workshop);
    setRenderedIndex(2);
  };

  let renderedComponents = [
    <WorkshopPane
      statusFilter={statusFilter}
      callbackSelectWorkshop={handleSelectWorkshop}
      onRowClick={toggleDrawer(true)}
    />,
    <CreateWorkshopComponent callbackCreateWorkshop={handleCreateWorkshop} />,
    <WorkshopDetailOverviewComponent workshop={selectedWorkshop} />,
  ];
  return (
    <div className="workshop-container">
      <Drawer anchor={"right"} open={drawerState} onClose={toggleDrawer(false)}>
        <WorkshopPaneDrawerItems
          toggleEvent={toggleDrawer(true)}
          onDetailRequest={onDetailView}
          onClassesRequest={onClassView}
        />
      </Drawer>

      <ThemeProvider theme={ochreTheme}>
        <ReworkSidebar selectTab={3}/>
        <Grid container spacing={1} sx={{ margin: "15px" }}>
          <Grid container item xs={6} justifyContent="flex-start">
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
          <Grid container item spacing={0} xs={6} justifyContent="flex-end">
            {renderedIndex === 1 ? (
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
      </ThemeProvider>
    </div>
  );
}
