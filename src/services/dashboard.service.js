import axios from "axios";
import { jwtDecode } from "jwt-decode";
const BASE_URL = process.env.REACT_APP_API;
// const DEV_URL = 'https://localhost:7176';
// const BASE_URL = 'https://localhost:7176';
const ACCESS_TOKEN = JSON.parse(localStorage.getItem("user-token"));
class DashboardService {
  async GetListSpecies(params) {
    try {
      let response = await axios.get(
        `${BASE_URL}/api/trainingcourse-manager/birdspecies`,
        {
          params: params,
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  async UpdateSpecies(model) {
    try {
      let response = await axios.put(
        `${BASE_URL}/api/trainingcourse-manager/birdspecies`,
        model,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  async AddSpecies(model) {
    try {
      let response = await axios.post(
        `${BASE_URL}/api/trainingcourse-manager/birdspecies`,
        model,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  async GetListSkills(params) {
    try {
      let response = await axios.get(
        `${BASE_URL}/api/trainingcourse-manager/birdskill`,
        {
          params: params,
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  async UpdateBirdSkill(model) {
    try {
      let response = await axios.put(
        `${BASE_URL}/api/trainingcourse-manager/birdskill-update`,
        model,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  async AddBirdSkill(model) {
    try {
      let response = await axios.post(
        `${BASE_URL}/api/trainingcourse-manager/birdskill-create`,
        model,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  async GetListSkillsBySpeciesId(id, params) {
    try {
      let queryId = {
        birdSpeciesId: id,
      };
      let data = {
        ...queryId,
        ...params,
      };
      let response = await axios.get(
        `${BASE_URL}/api/trainingcourse-manager/accquirablebirdskill-birdspecies`,
        {
          params: data,
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  async AddSkillToSpecies(model) {
    try {
      let response = await axios.post(
        `${BASE_URL}/api/trainingcourse-manager/acquirablebirdskill-create`,
        model,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  async DeleteSkillFromSpecies(model) {
    try {
      console.log(model);
      let response = await axios.delete(
        `${BASE_URL}/api/training-skill/management/acquirable-skill`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
          data: model,
        }
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
  async AddTrainableSkillToBirdSkill(model) {
    try {
      let response = await axios.post(
        `${BASE_URL}/api/trainingcourse-manager/trainableskill-create`,
        model,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  async GetListTrainableSkills(params) {
    try {
      let response = await axios.get(
        `${BASE_URL}/api/trainingcourse-manager/trainableskill`,
        {
          params: params,
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async GetListTrainerSkills(params) {
    try {
      let response = await axios.get(
        `${BASE_URL}/api/trainingcourse-manager/skill`,
        {
          params: params,
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async DeleteTrainerSkillFromBirdSkill(model) {
    try {
      console.log(model);
      let response = await axios.delete(
        `${BASE_URL}/api/training-skill/management/trainable-skill`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
          data: model,
        }
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
  async UpdateTrainerSkill(model) {
    try {
      let response = await axios.put(
        `${BASE_URL}/api/trainingcourse-manager/skill-update`,
        model,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  async AddTrainerSkill(model) {
    try {
      let response = await axios.post(
        `${BASE_URL}/api/trainingcourse-manager/birdskill-create`,
        model,
        {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  //GetListTrainers
  async GetListTrainers(params) {
    try {
      let response = await axios.get(
        `${BASE_URL}/api/user-management/trainers`,
        {
          params: params,
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  //GetListTrainerSkillsByTrainer
  async GetListTrainerSkillsByTrainer(params) {
    try {
      let response = await axios.get(
        `${BASE_URL}/api/trainingcourse-manager/trainerskill-trainerid`,
        {
          params: params,
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  async AddTrainerSkillToTrainer(model) {
    try {
      let response = await axios.post(
        `${BASE_URL}/api/trainingcourse-manager/trainerskill-create`,
        model,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  //DeleteTrainerSkillFromTrainer
  async DeleteTrainerSkillFromTrainer(model) {
    try {
      console.log(model);
      let response = await axios.delete(
        `${BASE_URL}/api/training-skill/management/trainer-skill`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
          data: model,
        }
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default new DashboardService();
