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
import { useEffect } from "react";
import workshopRefundManagement from "../../../services/workshoprefund-management.service";

export default function DetailRefundPolicyComponent({
  open,
  handleClose,
  selectedId,
}) {
  const [totalDayBeforeStart, setTotalDayBeforeStart] = useState(0);
  const [refundRate, setRefundRate] = useState(0.0);
  const [policy, setPolicy] = useState(null);
  async function fetchRefundPolicy() {
    try {
      let params = {
        $filter: `id eq ${selectedId}`,
      };
      let response = await workshopRefundManagement.getAllRefundPolicies(
        params
      );
      setTotalDayBeforeStart(response[0].totalDayBeforeStart);
      setRefundRate(response[0].refundRate);
      setPolicy(response[0]);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  async function updateRefundPolicy() {
    try {
      let model = {
        id: selectedId,
        totalDayBeforeStart: totalDayBeforeStart,
        refundRate: refundRate,
      };
      console.log("update model: ", model);
      let res = await workshopRefundManagement.updateRefundpolicy(model);
      if (res.status === 200) {
        toast.success("Update successfully!");
        handleClose();
      } else {
        toast.error("An error has occur");
      }
    } catch (error) {
      toast.error("An error has occur");
    }
  }
  const handleResetClick = () => {
    setTotalDayBeforeStart(policy.totalDayBeforeStart);
    setRefundRate(policy.refundRate);
  };
  const handleUpdateClick = async () => {
    await updateRefundPolicy();
  };
  useEffect(() => {
    fetchRefundPolicy();

    return () => {};
  }, [selectedId, open]);

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Modify refund policy: </DialogTitle>
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
          <Button
            color="ochre"
            variant="contained"
            onClick={() => handleResetClick()}
          >
            Reset
          </Button>
          <Button
            color="ochre"
            variant="contained"
            onClick={() => handleUpdateClick()}
          >
            Confirm
          </Button>
          <Button
            color="ochre"
            variant="contained"
            onClick={() => handleClose()}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
