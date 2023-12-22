import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";

const OffSlotDialogComponent = ({ selectedSlot, open, handleClose }) => {
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography fontWeight={"bold"}>Absent Slot Detail</Typography>
        </DialogTitle>
        {selectedSlot ? (
          <DialogContent>
            <Typography >Reason: </Typography>
            <Typography>{selectedSlot.reason}</Typography>
          </DialogContent>
        ) : null}
      </Dialog>
    </>
  );
};
export default OffSlotDialogComponent;
