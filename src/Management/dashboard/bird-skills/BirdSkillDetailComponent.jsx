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
import AddTrainableSkillToBirdSkillComponent from "./AddTrainableSkillToBirdSkillComponent.jsx";
import { jwtDecode } from "jwt-decode";
export default function BirdSkillDetailComponent({ birdSkillId, onClose }) {
  const userRole = jwtDecode(
    JSON.stringify(localStorage.getItem("user-token"))
  );
  const [birdSkill, setBirdSkill] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");
  const [openAddSkill, setOpenAddSkill] = useState(false);
  async function fetchTrainableSkillsByBirdSkill() {
    try {
      let params = {
        $filter: `contains(tolower(birdSkillName), tolower('${search}')) and birdSkillId eq ${birdSkillId}`,
      };

      let res = await dashboardService.GetListTrainableSkills(params);
      console.log(res);
      setSkills(res.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  async function fetchBirdSkill() {
    try {
      let params = {
        $filter: `id eq ${birdSkillId}`,
      };
      let response = await dashboardService.GetListSkills(params);
      console.log(response);
      setName(response.data[0].name);
      setDescription(response.data[0].description);
      setBirdSkill(response.data[0]);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function onClickDeleteChip(skill) {
    try {
      let model = {
        skillId: skill.skillId,
        birdSkillId: skill.birdSkillId,
      };
      await dashboardService.DeleteTrainerSkillFromBirdSkill(model);
      toast.success("Remove successfully!");
      fetchTrainableSkillsByBirdSkill();
    } catch (error) {
      toast.error("This species skill is currently in customer operation!");
    }
  }
  async function onCloseAddSkillModal() {
    setOpenAddSkill(false);
    fetchTrainableSkillsByBirdSkill();
  }
  useEffect(() => {
    fetchBirdSkill();
    fetchTrainableSkillsByBirdSkill();
    return () => {};
  }, []);
  useEffect(() => {
    fetchTrainableSkillsByBirdSkill();
    return () => {};
  }, [search]);

  return (
    <>
      {birdSkill ? (
        <>
          <AddTrainableSkillToBirdSkillComponent
            birdSkill={birdSkill}
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
                Bird Skill: {birdSkill.name}
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
                  value={birdSkill.description}
                  fullWidth
                  disabled={true}
                />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <OutlinedInput
                placeholder="Existing trainable skills"
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
                        {userRole === "Manager" ? (
                          <Chip
                            color="ochre"
                            label={skill.skillName}
                            variant="contained"
                            onDelete={() => onClickDeleteChip(skill)}
                          />
                        ) : (
                          <Chip
                            color="ochre"
                            label={skill.skillName}
                            variant="contained"
                          />
                        )}
                      </>
                    ))}
                    <Chip
                      color="ochre"
                      label={"Add more"}
                      variant="contained"
                      icon={<Add />}
                      onClick={() => setOpenAddSkill(true)}
                      disabled={userRole !== "Manager"}
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
