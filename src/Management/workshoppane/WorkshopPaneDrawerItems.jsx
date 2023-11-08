import { AddBoxOutlined, InfoOutlined, PlusOneOutlined } from "@mui/icons-material";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";

export default function WorkshopPaneDrawerItems({
  toggleEvent,
  onDetailRequest,
  onClassesRequest,
  onCreateClassRequest,
}) {
  const detailClick = () => {
    onDetailRequest();
  };
  const classClick = () => {
    onClassesRequest();
  };
  const createClassClick = () => {
    onCreateClassRequest();
  };
  return (
    <Box
      sx={{ width: 200 }}
      role="presentation"
      onClick={toggleEvent}
      onKeyDown={toggleEvent}
    >
      <List>
        <ListItem disablePadding onClick={detailClick}>
          <ListItemButton>
            <ListItemIcon>
              <InfoOutlined />
            </ListItemIcon>
            <ListItemText primary={"Workshop detail"} />
          </ListItemButton>
        </ListItem>

        <Divider />
        <ListItem disablePadding onClick={classClick}>
          <ListItemButton>
            <ListItemIcon>
              <InfoOutlined />
            </ListItemIcon>
            <ListItemText primary={"Classes"} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding onClick={createClassClick}>
          <ListItemButton>
            <ListItemIcon>
              <AddBoxOutlined />
            </ListItemIcon>
            <ListItemText primary={"New class"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
