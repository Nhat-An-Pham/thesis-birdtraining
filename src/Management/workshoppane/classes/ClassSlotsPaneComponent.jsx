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
  selectedClassId,
  callbackSelectSlot,
}) {
  const [slots, setSlots] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState();
  async function fetchSlots() {
    try {
      let params = {
        workshopClassId: selectedClassId,
      };
      let response = await classManagementService.getSlots(params);
      setSlots(response.data);
    } catch (error) {
      toast.error(error);
    }
  }
  useEffect(() => {
    fetchSlots();

    return () => {};
  }, [selectedClassId]);
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
                  selected={selectedIndex === index ? true : false}
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
