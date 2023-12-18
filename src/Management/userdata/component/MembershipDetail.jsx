import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import membershipService from "../../../services/membership.service";

const MembershipDetail = ({ selectedMembership, openDiv, handleCloseDiv }) => {
  const [errMessage, setErrMessage] = useState(null);

  const [changedName, setChangedName] = useState(null);
  const [changedDiscount, setChangedDiscount] = useState(null);
  const [changedRequirement, setChangedRequirement] = useState(null);

  const handleUpdateClick = (id, name, discount, requirement) => {
    console.log("ID Ne::::::::::", id);
    membershipService
      .updateMembership({ Id: id, Name: name, Discount: discount, Requirement: requirement })
      .then((res) => {
        console.log("Success Update Membership");
        toast.success("Success Update Membership");
        handleCloseDiv();
      })
      .catch((e) => toast.error("Fail Update Membership"));
  };

  return (
    <Dialog open={openDiv} onClose={handleCloseDiv}>
      <ToastContainer />
      <DialogTitle style={{ margin: "0px" }}>
        <h3>{selectedMembership.name}</h3>
      </DialogTitle>
      <DialogContent>
        <section>
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>
                  <TextField
                    type="text"
                    defaultValue={selectedMembership.name}
                    onChange={(e) => setChangedName(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Discount</td>
                <td>
                  <TextField
                    type="number"
                    inputProps={{
                      min: 0,
                      step: 0.1,
                    }}
                    label={"%"}
                    defaultValue={selectedMembership.discount}
                    onChange={(e) => setChangedDiscount(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Requirement</td>
                <td>
                  <TextField
                    type="number"
                    inputProps={{
                      min: 0,
                      step: 1000,
                    }}
                    label={"VND"}
                    defaultValue={selectedMembership.requirement}
                    onChange={(e) => setChangedRequirement(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <section>
          <p>{errMessage}</p>
          <Button
            color="ochre"
            variant="contained"
            onClick={() =>
              handleUpdateClick(
                selectedMembership.id,
                changedName,
                changedDiscount,
                changedRequirement
              )
            }
          >
            Update
          </Button>
          <Button color="ochre" variant="contained" onClick={handleCloseDiv}>
            Cancel
          </Button>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default MembershipDetail;
