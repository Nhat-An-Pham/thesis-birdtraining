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

const WorkshopModifyPictureComponent = ({
  workshopId,
  callbackModifyWorkshop,
  callbackBack,
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
          <Alert severity="warning">Uploaded image(s) will pernamently replace previous image(s)</Alert>
            <Grid
              container
              spacing={2}
              direction="column"
              justifyContent="center"
              alignItems="center"
              padding={3}
            >
              {/* <Grid item>
                <Typography variant="h6" fontWeight={"bold"}>
                  Pictures
                </Typography>
              </Grid> */}
              <Grid item>
                {/* <FormControl fullWidth required>
                  <Editor
                    onGetHtmlValue={handleEditorChange}
                    htmlValue={description}
                  />
                </FormControl> */}
                <UploadComponent onChange={handleFileChange} accept="image/*">
                  Upload image(s)
                </UploadComponent>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="contained">Confirm</Button>
            <Button variant="contained">Cancel</Button>
          </DialogActions>
        </Dialog>
      ) : (
        <></>
      )}
    </>
  );
};
export default WorkshopModifyPictureComponent;
