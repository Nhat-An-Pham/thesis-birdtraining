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
import BirdSpeciesAddComponent from "./BirdSkillAddComponent";
import { ochreTheme } from "../../themes/Theme";
import { Search } from "@mui/icons-material";
import BirdSkillDetailComponent from "./BirdSkillDetailComponent";
import BirdSkillUpdateComponent from "./BirdSkillUpdateComponent";
import { Img } from "react-image";
import { jwtDecode } from "jwt-decode";

const BirdSkillManagementComponent = ({}) => {
  const userRole = jwtDecode(JSON.parse(localStorage.getItem('user-token')));
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedId, setSelectedId] = useState(1);
  const [renderIndex, setRenderIndex] = useState(0);

  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleOpenUpdateModal = (id) => {
    setSelectedId(id);
    setOpenUpdate(true);
  };
  const handleCloseUpdateModal = async () => {
    await fetchSkills();
    setOpenUpdate(false);
  };
  useEffect(() => {
    fetchSkills();
    return () => {};
  }, [search]);
  async function fetchSkills() {
    try {
      let params = {
        $filter: `contains(tolower(name), tolower('${search}'))`, // Replace 'speciesName' with the actual property you are searching
      };
      let response = await dashboardService.GetListSkills(params);
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
        <BirdSpeciesAddComponent open={open} handleClose={handleCloseModal} />
        <BirdSkillUpdateComponent
          open={openUpdate}
          handleClose={handleCloseUpdateModal}
          birdSkillId={selectedId}
        />
        <Container sx={{ padding: 2 }}>
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
                            <TableCell width={"25%"}>Name</TableCell>
                            <TableCell width={"50%"}>Description</TableCell>
                            <TableCell>Action</TableCell>
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
                                  onClick={() => handleOpenUpdateModal(row.id)}
                                >
                                  Update
                                </Button>
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
              <BirdSkillDetailComponent
                birdSkillId={selectedId}
                onClose={handleCloseDetail}
              />
            </>
          )}
        </Container>
      </ThemeProvider>
    </>
  );
};
export default BirdSkillManagementComponent;
