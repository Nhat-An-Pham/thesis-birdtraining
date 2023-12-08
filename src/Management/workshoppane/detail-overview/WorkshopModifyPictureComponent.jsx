import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import workshopManagementService from "../../../services/workshop-management.service";
import { useEffect } from "react";
import { UploadComponent } from "../../component/upload/Upload";
import { toast } from "react-toastify";

const WorkshopModifyPictureComponent = ({
  workshopId,
  callbackModifyWorkshop,
  open,
  handleClose,
}) => {
  const [workshop, setWorkshop] = useState(null);
  const [pictures, setPictures] = useState([]);

  const fetchWorkshopData = async () => {
    try {
      let params = {
        $filter: `id eq ${workshopId}`,
      };
      let response = await workshopManagementService.getWorkshops(params);
      setWorkshop(response[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPictures(files);
  };
  const handleSubmit = async (e) => {
    // e.preventDefault();
    // Create a FormData object to hold the form data
    let check = true;
    if (pictures && pictures.length < 1) {
      check = false;
      toast.error("No picture provided!");
    }
    if (check) {
      const formData = new FormData();
      formData.append("Id", workshop.id);
      // Append each file separately
      pictures.forEach((picture, index) => {
        formData.append(`Pictures`, picture);
      });

      //   console.log('Modified data: ', workshop);
      //   console.log('Modified desc: ', tempDesc);
      try {
        let response = await workshopManagementService.modifyWorkshop(formData);
        if (response.status === 200) {
          toast.success("Modify successfully!");
          callbackModifyWorkshop();
        }
      } catch (error) {
        if (error.response?.data?.message) {
          toast.error(error.response?.data?.message);
        } else {
          toast.error("An error has occured!");
        }
      }
    }
  };
  useEffect(() => {
    fetchWorkshopData();

    return () => {};
  }, [workshopId, open]);
  return (
    <>
      {workshop ? (
        <Dialog
          open={open}
          onClose={handleClose}
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: 540, // Set your width here
              },
            },
          }}
        >
          <DialogTitle>
            Upload new image(s) for workshop: {workshop.title}
          </DialogTitle>
          <DialogContent>
            <Alert severity="warning">
              Uploaded image(s) will pernamently replace previous image(s)
            </Alert>
            <Grid
              container
              spacing={2}
              direction="column"
              justifyContent="center"
              alignItems="center"
              padding={3}
            >
              <UploadComponent onChange={handleFileChange} accept="image/*">
                Upload image(s)
              </UploadComponent>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="primary" variant="contained" onClick={handleSubmit}>
              Confirm
            </Button>
            <Button color={"warning"} variant="contained" onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <></>
      )}
    </>
  );
};
export default WorkshopModifyPictureComponent;
