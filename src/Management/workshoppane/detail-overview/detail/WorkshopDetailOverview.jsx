import React, { useEffect, useState } from "react";
import {
  Alert,
  AppBar,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
// import { toast } from 'react-toastify';
import WorkshopDetailTemplateComponent from "./WorkshopDetail";
import WorkshopViewComponent from "../WorkshopViewComponent";
import workshopManagementService from "../../../../services/workshop-management.service";
import { ArrowBackIosOutlined, InfoOutlined } from "@mui/icons-material";

export default function WorkshopDetailOverviewComponent({ workshop, callbackBack }) {
  const [details, setDetails] = useState([]);
  const [selectedDetail, setSelectedDetail] = useState(null);

  async function fetchData(workshop) {
    try {
      let response = await workshopManagementService.getDetailsByWorkshop(
        workshop
      );
      setDetails(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchData(workshop);
  }, []);
  const onCallbackUpdateDetail = async () => {
    fetchData(workshop);
  }
  const handleDetailClick = (detail) => {
    setSelectedDetail(detail);
    // console.log('slot component: ' +selectedDetail);
  };
  const onBack = () => {
    callbackBack();
  }
  return (
    
    <>
     <AppBar position="static" color="ochre">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{ mr: 2 }}
                onClick={onBack}
              >
                <ArrowBackIosOutlined />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                Workshop: {workshop.title} - Detail
              </Typography>
            </Toolbar>
          </AppBar>
          <Divider/>
      <Grid container spacing={2} marginTop={1}>
        <Grid item xs={12}>
          <WorkshopViewComponent workshopId={workshop.id} />
        </Grid>
        <Grid item xs={2}>
          <List>
            {details.map((detail, index) => (
              <>
                <ListItemButton
                  key={detail.id}
                  onClick={() => handleDetailClick(detail)}
                  selected={selectedDetail === detail}
                >
                  <ListItemIcon>
                    <InfoOutlined />
                </ListItemIcon>
                  <ListItemText primary={`Slot ${index + 1}`} />
                </ListItemButton>
                <Divider />
              </>
            ))}
          </List>
        </Grid>
        <Grid item xs={10}>
          {selectedDetail ? (
            <WorkshopDetailTemplateComponent selectedDetail={selectedDetail}  callbackUpdateDetail={onCallbackUpdateDetail}/>
          ) : (
            <Alert severity="info">No detail selected!</Alert>
          )}
        </Grid>
      </Grid>
    </>
  );
}
