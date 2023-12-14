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
  Link,
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
import { jwtDecode } from "jwt-decode";

export default function TrainerDetailComponent({ trainerId, onClose }) {
  const userRole = jwtDecode(JSON.stringify(localStorage.getItem('user-token')));
  const [trainer, setTrainer] = useState(null);
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");
  const [openAddSkill, setOpenAddSkill] = useState(false);
  async function fetchSkillsByTrainer() {
    try {
      let params = {
        trainerId: trainerId,
        $filter: `contains(tolower(skillName), tolower('${search}'))`,
      };

      let res = await dashboardService.GetListTrainerSkillsByTrainer(params);
      let sorted = res.data.sort((a, b) => {
        const nameA = a.skillName.toUpperCase(); // ignore upper and lowercase
        const nameB = b.skillName.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
      setSkills(sorted);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  async function fetchTrainer() {
    try {
      let params = {
        $filter: `id eq ${trainerId}`,
      };
      let response = await dashboardService.GetListTrainers(params);
      console.log("Trainer: ", response.data[0]);
      setTrainer(response.data[0]);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function onClickDeleteChip(skill) {
    try {
      let model = {
        skillId: skill.skillId,
        trainerId: trainer.id,
      };
      await dashboardService.DeleteTrainerSkillFromTrainer(model);
      toast.success("Remove successfully!");
      fetchSkillsByTrainer();
    } catch (error) {
      toast.error("Trainer has working experience in this skill!");
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
                <>{trainer.name} : </>
                <Link class="mailto" href={`mailto:${trainer.email}`}>
                  {trainer.email}
                </Link>
              </Typography>

              <div>
                <Typography
                  variant="h6"
                  noWrap
                  justifyContent={"flex-end"}
                  sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                >
                  Contact: +84 {trainer.phoneNumber}
                </Typography>
              </div>
            </Toolbar>
          </AppBar>
          <Divider />
          <Grid container spacing={3} marginTop={1}>
            <Grid item xs={12}>
              <OutlinedInput
                placeholder="Existing trainer skills"
                startAdornment={
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                }
                onChange={(e) => setSearch(e.target.value)}
              />
            </Grid>
            <Grid container item>
              {skills?.map((skill) => (
                <>
                  <Chip
                    color="ochre"
                    label={skill.skillName}
                    variant="contained"
                    onDelete={() => onClickDeleteChip(skill)}
                    sx={{ margin: 1 }}
                  />
                </>
              ))}
              <Chip
                color="ochre"
                label={"Add more"}
                variant="contained"
                icon={<Add />}
                onClick={() => setOpenAddSkill(true)}
                sx={{ margin: 1 }}
              />
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
