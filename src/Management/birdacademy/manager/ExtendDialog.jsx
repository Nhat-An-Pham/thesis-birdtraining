import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  Table,
  TableBody,
  TableCell,
  Button,
  InputLabel,
  Input,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Img } from "react-image";
import TrainingCourseManagement from "../../../services/trainingcourse-management.service";
import { ToastContainer, toast } from "react-toastify";

const ExtendDialog = ({
  trainingCourse,
  birdSkillId,
  renderIndex,
  callbackUpdate,
}) => {
  const [slot, setSlot] = useState(0.0);
  const handleConfirm = () => {
    if (renderIndex == 1) {
      let check = true;
      if (!slot || slot < 1) {
        check = false;
        toast.error("Please provide train slot");
      }
      if (check) {
        let model = {
          birdSkillId: birdSkillId,
          trainingCourseId: trainingCourse.id,
          totalSlot: slot,
        };
        TrainingCourseManagement.addTrainingSkill(model)
          .then((response) => {
            console.log(response);
            toast.success("Add skill success!");
            callbackUpdate(trainingCourse);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    if (renderIndex == 2) {
      let model = {
        birdSkillId: birdSkillId,
        trainingCourseId: trainingCourse.id,
      };
      console.log(model);
      TrainingCourseManagement.removeTrainingSkill(model)
        .then((response) => {
          console.log(response);
          toast.success("Remove skill success!");
          callbackUpdate(trainingCourse);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <Dialog open={renderIndex} onClose={callbackUpdate}>
      <ToastContainer />
      <DialogTitle>
        {renderIndex == 1 ? (
          <>Add skill to course</>
        ) : (
          <>Remove skill from course</>
        )}
      </DialogTitle>
      <DialogContent>
        {renderIndex == 1 && (
          <div style={{ margin: "10px" }}>
            <InputLabel>Slot</InputLabel>
            <Input
              type="number"
              step="0.01"
              onChange={(e) => setSlot(e.target.value)}
              required
              value={slot}
            />
          </div>
        )}
        <Button
          sx={{
            float: "right",
            marginBottom: "10px",
            marginRight: "10px",
            width: "100px",
          }}
          variant="contained"
          color="ochre"
          onClick={() => handleConfirm()}
        >
          Confirm
        </Button>
        <Button
          sx={{
            float: "right",
            marginBottom: "10px",
            marginRight: "10px",
            width: "100px",
          }}
          variant="contained"
          color="ochre"
          onClick={() => callbackUpdate()}
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};
export default ExtendDialog;
