import {
  Box,
  Button,
  Drawer,
  Grid,
  Tab,
  Tabs,
  ThemeProvider,
} from "@mui/material";
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
  const [statusFilter, setStatusFilter] = useState(0); // State for status filter
  const [selectedWorkshop, setSelectedWorkshop] = useState();
  const [open, setOpen] = useState(false);

  const tabStatusFilter = ["Active", "Inactive"];
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
  const handleCallbackBack = () => {
    setRenderedIndex(0);
  };
  const callbackCreateClass = () => {
    setOpen(false);
    setRenderedIndex(3);
  };
  let renderedComponents = [
    <WorkshopPane
      statusFilter={tabStatusFilter[statusFilter]}
      onDetailRequest={onDetailView}
      onClassesRequest={onClassView}
      onCreateClassRequest={handleOpenModal}
    />,
    <CreateWorkshopComponent callbackCreateWorkshop={handleCreateWorkshop} callbackBack={handleCallbackBack}/>,
    <WorkshopDetailOverviewComponent
      workshop={selectedWorkshop}
      callbackBack={handleCallbackBack}
    />,
    <ClassManagementComponent
      selectedWorkshop={selectedWorkshop}
      callbackBack={handleCallbackBack}
    />,
    // <TrainerSlotDetailComponent entityId={28}/>
  ];
  const handleChange = (event, newValue) => {
    setStatusFilter(newValue);
  };
  return (
    <div className="workshop-container">
      <ToastContainer />

      <ThemeProvider theme={ochreTheme}>
        <ReworkSidebar selectTab={4} />
        <Box sx={{ width: "100%" }}>
          {renderedIndex === 0 ? (
            <>
              <Box
                sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}
              >
                <Grid container justifyContent={'space-between'} alignItems={'center'} padding={2}>
                  <Grid item>
                    <Tabs
                      value={statusFilter}
                      onChange={handleChange}
                      variant="scrollable"
                      TabIndicatorProps={{
                        style: {
                          backgroundColor: "#c8ae7d",
                        },
                      }}
                      sx={{
                        ".Mui-selected": {
                          color: "rgb(200, 174, 125)",
                        },
                      }}
                      scrollButtons
                      allowScrollButtonsMobile
                      aria-label="scrollable force tabs example"
                    >
                      {tabStatusFilter.map((tab) => (
                        <Tab label={tab} />
                      ))}
                    </Tabs>
                  </Grid>
                  <Grid item>
                    <Button color="ochre" variant="contained" onClick={() => setRenderedIndex(1)}>
                      Create workshop
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </>
          ) : (
            <></>
          )}
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {renderedComponents[renderedIndex]}
            </Grid>
          </Grid>
        </Box>
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
