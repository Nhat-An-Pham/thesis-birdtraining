import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  OutlinedInput,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import workshopRefundManagement from "../../../services/workshoprefund-management.service";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
import { ochreTheme } from "../../themes/Theme";
import { Close, Search } from "@mui/icons-material";
import AddRefundPolicyComponent from "../refundPolicy/AddRefundPolicyComponent";
import DetailRefundPolicyComponent from "../refundPolicy/DetailRefundPolicyComponent";
import { jwtDecode } from "jwt-decode";

const RefundPoliciesManagement = ({ callbackMainManagement }) => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedId, setSelectedId] = useState(1);
  const userRole = jwtDecode(
    JSON.stringify(localStorage.getItem("user-token"))
  )?.role;
  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = async () => {
    await fetchPricePolicies();
    setOpen(false);
  };
  const handleOpenUpdateModal = (id) => {
    setSelectedId(id);
    setOpenUpdate(true);
  };
  const handleCloseUpdateModal = async () => {
    await fetchPricePolicies();
    setOpenUpdate(false);
  };
  useEffect(() => {
    fetchPricePolicies();
    return () => {};
  }, [rows]);
  async function fetchPricePolicies() {
    try {
      // let params = {
      //   $filter: `contains(tolower(name), tolower('${search}'))`, // Replace 'speciesName' with the actual property you are searching
      // };
      let response = await workshopRefundManagement.getAllRefundPolicies();
      // console.log(response);
      // let result = response.data.sort((a, b) => {
      //   const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      //   const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      //   if (nameA < nameB) {
      //     return -1;
      //   }
      //   if (nameA > nameB) {
      //     return 1;
      //   }

      //   // names must be equal
      //   return 0;
      // });
      setRows(response);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <>
      <ThemeProvider theme={ochreTheme}>
        <Grid sx={{ padding: 2 }}>
          <AppBar position="static" color="ochre" sx={{ borderRadius: 3 }}>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{ mr: 2 }}
                onClick={callbackMainManagement}
              >
                <Close />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", sm: "block" },
                  fontWeight: 700,
                }}
              >
                Refund Policies Management
              </Typography>
            </Toolbar>
          </AppBar>
        </Grid>
        <AddRefundPolicyComponent open={open} handleClose={handleCloseModal} />
        <DetailRefundPolicyComponent
          open={openUpdate}
          handleClose={handleCloseUpdateModal}
          selectedId={selectedId}
        />
        <Container sx={{ padding: 2 }}>
          <Grid container spacing={2}>
            <Grid
              container
              item
              xs={12}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              {userRole?.role === "Manager" ? (
                <Button
                  color="ochre"
                  variant="contained"
                  onClick={handleOpenModal}
                >
                  Add
                </Button>
              ) : null}

              {/* <FormControl>
                <OutlinedInput
                  fullWidth
                  placeholder="Search by name"
                  startAdornment={
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  }
                  onChange={(e) => setSearch(e.target.value)}
                />
              </FormControl> */}
            </Grid>
            <Grid item xs={12}>
              {rows ? (
                <>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>No</TableCell>
                          <TableCell>Duration before start</TableCell>
                          <TableCell>Refund rate</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row, index) => (
                          <TableRow hover key={row.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                              <Typography>{row.totalDayBeforeStart}</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>{row.refundRate}</Typography>
                            </TableCell>
                            {userRole?.role === "Manager" ? (
                              <TableCell>
                                <Button
                                  color="ochre"
                                  variant="contained"
                                  onClick={() => handleOpenUpdateModal(row.id)}
                                >
                                  Update
                                </Button>
                              </TableCell>
                            ) : null}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              ) : (
                <>
                  <CircularProgress />
                </>
              )}
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
};
export default RefundPoliciesManagement;
