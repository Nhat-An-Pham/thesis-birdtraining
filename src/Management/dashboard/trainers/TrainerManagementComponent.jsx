import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  Link,
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
  const [selectedId, setSelectedId] = useState(1);
  const [renderIndex, setRenderIndex] = useState(0);
  useEffect(() => {
    fetchTrainers();
    return () => {};
  }, [search]);
  async function fetchTrainers() {
    try {
      let params = {
        $filter: `contains(tolower(name), tolower('${search}')) or contains(tolower(email), tolower('${search}'))`, // Replace 'speciesName' with the actual property you are searching
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
                <FormControl sx={{ marginLeft: "10px" }}>
                  <OutlinedInput
                    fullWidth
                    placeholder="Search by name or email"
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
                            <TableCell>Avatar</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Field</TableCell>
                            <TableCell>Detail</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row, index) => (
                            <TableRow hover key={row.id}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell className="image-cell" sx={{minWidth: '200px'}}>
                                {!row.avatar || row.avatar === ''? <><Typography>None</Typography></> : <Img
                                style={{minHeight: '180px', maxWidth: '180px'}}
                                  src={row.avatar}
                                  unloader={<CircularProgress />}
                                />}
                                
                              </TableCell>
                              <TableCell>
                                <Typography>{row.name}</Typography>
                              </TableCell>
                              <TableCell>
                                <Link class="mailto" href={`mailto:${row.email}`}>
                                <Typography >{row.email}</Typography>
                                </Link>
                                
                              </TableCell>
                              <TableCell>
                                <Typography>+84 {row.phoneNumber}</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography>{row.category}</Typography>
                              </TableCell>
                              <TableCell>
                                <Button
                                  color="ochre"
                                  variant="contained"
                                  onClick={() => handleDetailClick(row.id)}
                                >
                                  Skills
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
