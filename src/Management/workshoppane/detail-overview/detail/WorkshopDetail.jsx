import { Button, Grid, Typography } from "@mui/material";
// import { toast } from 'react-toastify';
import Editor from "../../../component/text-editor/Editor";
import { useEffect, useState } from "react";
import workshopManagementService from "../../../../services/workshop-management.service";
import RawHTMLRenderer from "../../../component/htmlRender/htmlRender";
import { toast } from "react-toastify";

export default function WorkshopDetailTemplateComponent({
  selectedDetail,
  callbackUpdateDetail,
}) {
  const [description, setDescription] = useState("");
  const [tempDescription, setTempDescription] = useState("");
  const [user, setUser] = useState(workshopManagementService.getCurrentUser);
  useEffect(() => {
    setDescription(selectedDetail.detail);
  }, [selectedDetail]);

  const handleChanges = (value) => {
    setTempDescription(value);
  };
  const handleSaveChanges = () => {
    try {
      workshopManagementService.modifyTemplateDetail(
        selectedDetail.id,
        tempDescription
      );
      callbackUpdateDetail();
      toast.success("Update successfully!");
    } catch (error) {
      toast.error("An error has occur!");
    }
  };

  return (
    <Grid container item xs={12}>
      {user?.role === "Manager" ? (
        <Grid
          container
          item
          xs={12}
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
          spacing={2}
        >
          <Grid item xs={10}>
            <Editor onGetHtmlValue={handleChanges} htmlValue={description} />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="ochre"
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Grid container item xs={10} justifyContent={'left'} alignItems={'center'} padding={5}>
          <Typography>
            <RawHTMLRenderer htmlContent={description} />
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}
