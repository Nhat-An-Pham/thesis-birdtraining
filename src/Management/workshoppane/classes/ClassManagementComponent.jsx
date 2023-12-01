import { useState } from "react";
import ClassOverviewComponent from "./ClassOverviewComponent";
import ClassDetailViewComponent from "./ClassDetailViewComponent";
import {
  AppBar,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { ArrowBackIosOutlined } from "@mui/icons-material";

export default function ClassManagementComponent({
  selectedWorkshop,
  callbackBack,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedClass, setSelectedClass] = useState();
  const handleClassSelect = (selectedClass) => {
    setSelectedClass(selectedClass);
    setCurrentIndex(1);
  };
  const handleClassCreateDemand = () => {
    setCurrentIndex(1);
  };
  const handleSlotSelect = (slot) => {};
  const onBack = () => {
    if (currentIndex === 0) {
      callbackBack();
    } else {
      setCurrentIndex(0);
    }
  };
  let components = [
    <ClassOverviewComponent
      workshop={selectedWorkshop}
      callbackClassSelect={handleClassSelect}
    />,
    <ClassDetailViewComponent selectedClassId={selectedClass} />,
  ];
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
            Workshop: {selectedWorkshop.title} - Classes
          </Typography>
        </Toolbar>
      </AppBar>
      <Divider />
      {components[currentIndex]}
    </>
  );
}
