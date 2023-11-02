import { Button, Grid, ThemeProvider } from "@mui/material";
import Sidebar from "../component/sidebar/Sidebar";
import WorkshopPane from "./workshop-pane/WorkshopPane";
import CreateWorkshopComponent from "./create-workshop/CreateWorkshop";
import { useState } from "react";
import { ochreTheme } from "./Theme";
import WorkshopDetailOverviewComponent from "./detail-overview/detail/WorkshopDetailOverview";



export default function WorkshopManagementComponent() {
    const [renderedIndex, setRenderedIndex] = useState(0);
    const [statusFilter, setStatusFilter] = useState('Active'); // State for status filter
    const [selectedWorkshop, setSelectedWorkshop] = useState();
    const handleFilterClick = () => {
        // Toggle between 'Active' and 'Deactive' status filter
        setStatusFilter(statusFilter === 'Active' ? 'Inactive' : 'Active');
    };
    const handleSelectWorkshop = (workshop) => {
        setSelectedWorkshop(workshop);
        setRenderedIndex(2);
    }        
    const handleCreateWorkshop = (workshop) => {
        setSelectedWorkshop(workshop);
        setRenderedIndex(2);
    }
    let renderedComponents = [
        <WorkshopPane statusFilter={statusFilter} callbackChangeStatus={handleFilterClick} callbackSelectWorkshop={handleSelectWorkshop}/>,
        <CreateWorkshopComponent callbackCreateWorkshop={handleCreateWorkshop}/>,
        <WorkshopDetailOverviewComponent workshop={selectedWorkshop}/>
    ]
    return (
        <div className="workshop-container">
            <Sidebar/>
            <ThemeProvider  theme={ochreTheme}>
                <div className="workshop_section-wrapper">
                <Grid container spacing={1}>
                            <Grid container item xs={6} justifyContent="flex-start">
                                {renderedIndex === 0 ? (
                                    <Button color="ochre" variant="contained" onClick={handleFilterClick}>
                                        {statusFilter}
                                    </Button>     
                                ) : (
                                    <Button color="ochre" variant="contained" onClick={() => setRenderedIndex(0)}>
                                        Back
                                    </Button>  
                                )}
                                                                   
                            </Grid>
                            <Grid container item spacing={0} xs={6} justifyContent="flex-end">
                                {renderedIndex === 1 ? (
                                   <></>
                                ) : (
                                    <Button variant='contained' color="ochre" onClick={() => setRenderedIndex(1)}>
                                    Add new workshop
                                </Button>
                                )}
                                
                            </Grid>
                            <Grid item xs={12}>
                                {
                                    renderedComponents[renderedIndex]
                                }
                            </Grid>
                        </Grid>
                </div>
            </ThemeProvider>
        </div>
            
    );
}