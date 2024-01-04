import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ListItemText from "@mui/material/ListItemText";
import ContentCutOutlinedIcon from "@mui/icons-material/ContentCutOutlined";
import { ListItemIcon } from "@mui/material";
import axios from "axios";

/* [{businessId: 1, businessName:'Studio 786 Salon', icon: <StorefrontIcon/>},{businessId: 2, businessName: 'Skull & Thrones', icon:<ContentCutOutlinedIcon/>}] */

export default function Step1({ getServiceId }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const listOfBusinesses = [
    {
      id: false,
      name: "In-home consultation",
    },
    {
      id: true,
      name: "Online consultation",
    },
  ];

  const handleListItemClick = (serviceId) => {
    //this function sets business id into state
    getServiceId(serviceId);
    setSelectedIndex(serviceId);
  };

  //  const serviceList = [{
  //   id:"1",
  //   label: "online"
  //  }]

  //use effect to populate list of businesses
  // useEffect(() => {
  //   //GET REQUEST TO POPULATE listOfBusinesses state array  d

  //   axios.get("https://instabookapi.azurewebsites.net/api/get_all_businesses")
  //     .then((results) => {

  //       setListOfBusinesses(results.data);

  //     })

  // }, [])
  return (
    <Box sx={{ width: "100%", minWidth: 400, bgcolor: "background.paper" }}>
      <List component="nav" aria-label="secondary mailbox folder">
        {listOfBusinesses.map((business) => {
          return (
            <>
              <ListItemButton
                selected={business.id === selectedIndex ? true : false}
                onClick={() => handleListItemClick(business.id)}
              >
                <ListItemText primary={business.name} />
              </ListItemButton>
            </>
          );
        })}
      </List>
    </Box>
  );
}
