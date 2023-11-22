import { useState } from "react";
import { toast } from "react-toastify";
import dashboardService from "../../../services/dashboard.service";
import { useEffect } from "react";
import React from "react";
import {
  AppBar,
  Backdrop,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  ListItem,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Add, Close, PlusOneOutlined, Search } from "@mui/icons-material";
import AddSkillToSpeciesComponent from "./AddSkillToSpeciesComponent";
export default function BirdSpeciesDetailComponent({ birdSpeciesId, onClose }) {
  const [birdSpecies, setBirdSpecies] = useState(null);
  const [name, setName] = useState("");
  const [shortDetail, setDetail] = useState("");
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");
  const [openAddSkill, setOpenAddSkill] = useState(false);
  async function fetchSkillsBySpecies() {
    try {
      let params = {
        $filter: `contains(tolower(birdSkillName), tolower('${search}'))`, // Replace 'speciesName' with the actual property you are searching
      };

      let res = await dashboardService.GetListSkillsBySpeciesId(birdSpeciesId, params);
      setSkills(res.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  async function fetchBirdSpecies() {
    try {
      let params = {
        $filter: `id eq ${birdSpeciesId}`,
      };
      let response = await dashboardService.GetListSpecies(params);
      setName(response.data[0].name);
      setDetail(response.data[0].shortDetail);
      setBirdSpecies(response.data[0]);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function onClickDeleteChip(skill) {
    try {
      let model = {
        birdSpeciesId: skill.birdSpeciesId,
        birdSkillId: skill.birdSkillId,
      };
      await dashboardService.DeleteSkillFromSpecies(model);
      toast.success("Remove successfully!");
      fetchSkillsBySpecies();
    } catch (error) {
      toast.error("This species skill is currently in customer operation!");
    }
  }
  async function onCloseAddSkillModal() {
    setOpenAddSkill(false);
    fetchSkillsBySpecies();
  }
  useEffect(() => {
    fetchBirdSpecies();
    fetchSkillsBySpecies();
    return () => {};
  }, []);
  useEffect(() => {
    fetchSkillsBySpecies();
    return () => {};
  }, [search]);

  return (
    <>
      {birdSpecies ? (
        <>
          <AddSkillToSpeciesComponent
            birdSpecies={birdSpecies}
            handleClose={() => onCloseAddSkillModal()}
            open={openAddSkill}
          />
          <AppBar position="static" color="ochre">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{ mr: 2 }}
                onClick={onClose}
              >
                <Close />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                Species: {birdSpecies.name}
              </Typography>
            </Toolbar>
          </AppBar>
          <Divider />
          <Grid container spacing={3} marginTop={1}>
            <Grid item xs={12}>
              <Paper elevation={3}>
                <TextField
                  label="Short Detail"
                  multiline={false}
                  value={birdSpecies.shortDetail}
                  fullWidth
                  onChange={(e) => {
                    setDetail(e.target.value);
                  }}
                  disabled={false}
                />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <OutlinedInput
                placeholder="Search existing skills"
                startAdornment={
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                }
                onChange={(e) => setSearch(e.target.value)}
              />
            </Grid>
            <Grid item>
              {skills ? (
                <>
                  <Stack direction="row" spacing={1}>
                    {skills.map((skill) => (
                      <>
                        <Chip
                          color="ochre"
                          label={skill.birdSkillName}
                          variant="contained"
                          onDelete={() => onClickDeleteChip(skill)}
                        />
                      </>
                    ))}
                    <Chip
                      color="ochre"
                      label={"Add more"}
                      variant="contained"
                      icon={<Add />}
                      onClick={() => setOpenAddSkill(true)}
                    />
                  </Stack>
                </>
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Backdrop>
            <CircularProgress />
          </Backdrop>
        </>
      )}
    </>
  );
}
