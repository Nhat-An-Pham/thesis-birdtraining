import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
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
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import dashboardService from "../../../services/dashboard.service";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";

import { ochreTheme } from "../../themes/Theme";
import { Search } from "@mui/icons-material";
import { Img } from "react-image";
import TrainerDetailComponent from "./TrainerDetailComponent";

const TrainerManagementComponent = ({}) => {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedId, setSelectedId] = useState(1);
  const [renderIndex, setRenderIndex] = useState(0);

  const handleOpenModal = () => {
    setOpen(true);
  };
  useEffect(() => {
    fetchTrainers();
    return () => {};
  }, [search]);
  async function fetchTrainers() {
    try {
      let params = {
        $filter: `contains(tolower(name), tolower('${search}'))`, // Replace 'speciesName' with the actual property you are searching
      };
      let response = await dashboardService.GetListTrainers(params);
      console.log(response);
      let result = response.data.sort((a, b) => {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
      setRows(result);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const handleDetailClick = (id) => {
    setSelectedId(id);
    setRenderIndex(1);
  };
  const handleCloseDetail = () => {
    setRenderIndex(0);
  };
  return (
    <>
      <ThemeProvider theme={ochreTheme}>
        <Container sx={{ margin: "10px" }}>
          {renderIndex === 0 ? (
            <Grid container spacing={2}>
              <Grid
                container
                item
                xs={12}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Button
                  color="ochre"
                  variant="contained"
                  onClick={handleOpenModal}
                >
                  Add
                </Button>
                <FormControl sx={{ marginLeft: "10px" }}>
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
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                {rows ? (
                  <>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Picture</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Detail</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row, index) => (
                            <TableRow hover key={row.id}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell className="image-cell" sx={{minWidth: '200px'}}>
                                <Img
                                  src={row.picture}
                                  unloader={<CircularProgress />}
                                />
                              </TableCell>
                              <TableCell>
                                <Typography>{row.name}</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography>{row.description}</Typography>
                              </TableCell>
                              <TableCell>
                                <Button
                                  color="ochre"
                                  variant="contained"
                                  onClick={() => handleDetailClick(row.id)}
                                >
                                  Detail
                                </Button>
                              </TableCell>
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
          ) : (
            <>
              <TrainerDetailComponent
                trainerId={selectedId}
                onClose={handleCloseDetail}
              />
            </>
          )}
        </Container>
      </ThemeProvider>
    </>
  );
};
export default TrainerManagementComponent;
