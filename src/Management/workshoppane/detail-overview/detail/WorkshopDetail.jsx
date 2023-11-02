
import { Button, Grid } from "@mui/material";
import axios from "axios";
// import { toast } from 'react-toastify';
import Editor from "../../../component/text-editor/Editor";
import { useEffect, useState } from "react";
import { modifyTemplateDetail } from "../../workshopService";

export default function WorkshopDetailTemplateComponent( {selectedDetail} ) {    
    const [description, setDescription] = useState(selectedDetail.detail);
    // const handleEditorSubmit = (value) => {
    //   setDescription(value);
    //   console.log('description');
    //   console.log(value);
    // }
    useEffect(() => {
        // console.log('change selected detail');
        // console.log(selectedDetail);
      setDescription(selectedDetail.detail);
    }, [selectedDetail])
    const handleChanges = (value) => {
        setDescription(value);
    }
    const handleSaveChanges = () => {
      modifyTemplateDetail(selectedDetail.id, description);
    //   onHandleDetailChange();
      };
    return (
        <Grid item xs={8}>
            <div className="right-side-content">
            <Editor onGetHtmlValue={handleChanges} htmlValue={description}/>
                <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                    Save Changes
                </Button>
            </div>
        </Grid>
    );
}