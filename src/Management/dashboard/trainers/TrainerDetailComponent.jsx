import { useState } from "react";
import { toast } from "react-toastify";
import dashboardService from "../../../services/dashboard.service.js";
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
import AddSkillToTrainerComponent from "./AddTrainerSkillComponent.jsx";

export default function TrainerDetailComponent({ trainerId, onClose }) {
  const [trainer, setTrainer] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");
  const [openAddSkill, setOpenAddSkill] = useState(false);
  async function fetchSkillsByTrainer() {
    try {
      let params = {
        $filter: `contains(tolower(skillName), tolower('${search}')) and trainerId eq ${trainerId}`
      };

      let res = await dashboardService.GetListTrainableSkills(params);
      console.log(res);
      setSkills(res.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  async function fetchTrainer() {
    try {
      let params = {
        $filter: `id eq ${trainerId}`
      };
      let response = await dashboardService.GetListTrainers(params);
      console.log(response);
      setName(response.data[0].name);
      setDescription(response.data[0].description);
      setTrainer(response.data[0]);
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
      await dashboardService.DeleteTrainerSkillFromTrainer(model);
      toast.success("Remove successfully!");
      fetchSkillsByTrainer();
    } catch (error) {
      toast.error("This species skill is currently in customer operation!");
    }
  }
  async function onCloseAddSkillModal() {
    setOpenAddSkill(false);
    fetchSkillsByTrainer();
  }
  useEffect(() => {
    fetchTrainer();
    fetchSkillsByTrainer();
    return () => {};
  }, []);
  useEffect(() => {
    fetchSkillsByTrainer();
    return () => {};
  }, [search]);

  return (
    <>
      {trainer ? (
        <>
          <AddSkillToTrainerComponent
            trainer={trainer}
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
                Trainer Detail
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
                  value={trainer.description}
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
                        <Chip
                          color="ochre"
                          label={skill.skillName}
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
