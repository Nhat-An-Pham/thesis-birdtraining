import { InfoOutlined } from "@mui/icons-material";
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

export default function WorkshopPaneDrawerItems ({toggleEvent, onDetailRequest, onClassesRequest}) {
  const detailClick = () => {
    onDetailRequest();
  }
  const classClick = () => {
    onClassesRequest();
  }
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
              <ListItemText secondary={'Workshop detail'} />
            </ListItemButton>
        </ListItem>
        <Divider/>
        <ListItem disablePadding onClick={classClick}>
            <ListItemButton>
              <ListItemIcon>
                <InfoOutlined />
              </ListItemIcon>
              <ListItemText  secondary={'Classes'} />
            </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}