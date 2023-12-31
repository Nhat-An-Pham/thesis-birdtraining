import { useEffect, useState } from "react";
import classManagementService from "../../../services/class-management.service";
import { toast } from "react-toastify";
import {
  Box,
  CssBaseline,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";

export default function ClassSlotsPaneComponent({
  passedSlots,
  callbackSelectSlot,
}) {
  const [slots, setSlots] = useState(passedSlots);
  const [selectedIndex, setSelectedIndex] = useState(null);
  
  useEffect(() => {
    setSlots(passedSlots);
    return () => {
      
    }
  }, [passedSlots]);
  
  const handleSelectSlot = (index) => {
    setSelectedIndex(index);
    let slot = slots[index];
    callbackSelectSlot(slot);
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          minWidth: 200,
          maxWidth: 200,
          bgcolor: "background.paper",
        }}
      >
        <List>
          <Divider />
          {slots.map((slot, index) => (
            <>
              <ListItem disablePadding>
                <ListItemButton
                  selected={ index === selectedIndex  ? true : false }
                  onClick={() => handleSelectSlot(index)}
                  sx={{
                    borderLeft: "1px solid #e0e0e0", // Left border
                    borderRight: "1px solid #e0e0e0", // Right border
                    borderRadius: 0, // Remove border radius if needed
                  }}
                >
                  <ListItemIcon>
                    <InfoOutlined />
                  </ListItemIcon>
                  <ListItemText primary={`Slot ${index + 1}`} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </Box>
    </>
  );
}
