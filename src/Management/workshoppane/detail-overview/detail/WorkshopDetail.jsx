import { Button, Grid, Typography } from "@mui/material";
// import { toast } from 'react-toastify';
import Editor from "../../../component/text-editor/Editor";
import { useEffect, useState } from "react";
import workshopManagementService from "../../../../services/workshop-management.service";
import RawHTMLRenderer from "../../../component/htmlRender/htmlRender";

export default function WorkshopDetailTemplateComponent({ selectedDetail }) {
  const [description, setDescription] = useState(selectedDetail.detail);
    const [user, setUser] = useState(workshopManagementService.getCurrentUser);
  useEffect(() => {
    setDescription(selectedDetail.detail);
  }, [selectedDetail]);

  const handleChanges = (value) => {
    setDescription(value);
  };

  const handleSaveChanges = () => {
    workshopManagementService.modifyTemplateDetail(
      selectedDetail.id,
      description
    );
  };

  return (
    <Grid item xs={8}>
      <div className="right-side-content">
        {
            user?.role === 'Manager'?(
<div>
            <Editor onGetHtmlValue={handleChanges} htmlValue={description} />
            <Button variant="contained" color="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
        </div>
            ):(
                <Typography><RawHTMLRenderer htmlContent={description} /></Typography>
            )
        }
        
      </div>
    </Grid>
  );
}
