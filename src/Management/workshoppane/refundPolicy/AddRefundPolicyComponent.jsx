import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import workshopRefundManagement from "../../../services/workshoprefund-management.service";

export default function AddRefundPolicyComponent({ open, handleClose }) {
  const [totalDayBeforeStart, setTotalDayBeforeStart] = useState(0);
  const [refundRate, setRefundRate] = useState(0.0);
  async function addRefundPolicy() {
    try {
      let model = {
        totalDayBeforeStart: totalDayBeforeStart,
        refundRate: refundRate,
      };
      let res = await workshopRefundManagement.createRefundpolicy(model);
      if (res.status === 200) {
        handleClose();
      } else {
        toast.error(res.data.messages);
      }
    } catch (error) {
      toast.error(error);
    }
  }
  const handleCreateClick = async () => {
    await addRefundPolicy();
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Add new refund policy</DialogTitle>
        <DialogContent>
          <Stack sx={{ paddingTop: 4 }} spacing={3}>
            <FormControl sx={{ paddingTop: "5px" }}>
              <InputLabel>Duration before start</InputLabel>
              <Input
                type="number"
                step="0.01"
                onChange={(e) => setTotalDayBeforeStart(e.target.value)}
                required
                multiline={false}
                value={totalDayBeforeStart}
                fullWidth
              />
            </FormControl>
            <FormControl>
              <InputLabel>Refund rate</InputLabel>
              <Input
                type="number"
                step="0.01"
                onChange={(e) => setRefundRate(e.target.value)}
                required
                multiline={false}
                value={refundRate}
                fullWidth
              />
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button color="ochre" variant="contained" onClick={handleCreateClick}>
            Add
          </Button>
          <Button color="ochre" variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
