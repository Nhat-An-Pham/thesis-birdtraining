import { Button, Grid, Typography } from "@mui/material";
// import { toast } from 'react-toastify';
import Editor from "../../../component/text-editor/Editor";
import { useEffect, useState } from "react";
import workshopManagementService from "../../../../services/workshop-management.service";
import RawHTMLRenderer from "../../../component/htmlRender/htmlRender";
import { toast } from "react-toastify";

export default function WorkshopDetailTemplateComponent({ selectedDetail, callbackUpdateDetail }) {
  const [description, setDescription] = useState('');
  const [tempDescription, setTempDescription] = useState('');
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
      toast.success('Update successfully!');
    } catch (error) {
      toast.error("An error has occur!");
    }
    
  };

  return (
    <Grid container item xs={12} >
      <div>
        {user?.role === "Manager" ? (
          <Grid container item xs={12} alignItems={'flex-end'} justifyContent={'flex-end'} spacing={2}>
            <Grid item xs={12}>
              <Editor onGetHtmlValue={handleChanges}  htmlValue={description}/>
            </Grid>
            <Grid item>
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
          <Typography>
            <RawHTMLRenderer htmlContent={description} />
          </Typography>
        )}
      </div>
    </Grid>
  );
}
