import axios from "axios";
import { jwtDecode } from "jwt-decode";
const BASE_URL = process.env.REACT_APP_API;
// const DEV_URL = 'https://localhost:7176';
// const BASE_URL = 'https://localhost:7176';
const ACCESS_TOKEN = JSON.parse(localStorage.getItem("user-token"));
class DashboardService {
  async GetConsultingTicketOverview(params = null) {
    try {
      let response = await axios.get(
        `${BASE_URL}/api/overview/consulting-ticket`,
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
  async GetWorkshopClassOverview(params = null) {
    try {
      let response = await axios.get(`${BASE_URL}/api/overview/workshop`, {
        params: params,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async GetTrainingCourseOverview(params = null) {
    try {
      let response = await axios.get(
        `${BASE_URL}/api/overview/training-course`,
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

  async GetTransactions(params = null) {
    try {
      let response = await axios.get(`${BASE_URL}/api/overview/transactions`, {
        params: params,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
  async GetCampaignRevenue(month, year) {
    try {
      let params = {
        month: month,
        year: year,
      };
      let response = await axios.get(
        `${BASE_URL}/api/overview/campaign-revenue`,
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
  async GetOnlineCourseOverview(params = null) {
    try {
      let response = await axios.get(`${BASE_URL}/api/overview/online-course`, {
        params: params,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
  async GetListSpecies(params) {
    try {
      let response = await axios.get(
        `${BASE_URL}/api/trainingcourse/birdspecies`,
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
        `${BASE_URL}/api/trainingcourse/birdskill`,
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
        `${BASE_URL}/api/trainingcourse/accquirablebirdskill-birdspecies`,
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
        `${BASE_URL}/api/trainingcourse/trainableskill`,
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
      let response = await axios.get(`${BASE_URL}/api/trainingcourse/skill`, {
        params: params,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
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
        `${BASE_URL}/api/trainingcourse/trainerskill-trainerid`,
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

  // get dashboard api base on year
  async DashboardRevenueInYearData(year) {
    try {
      let response = await axios.get(
        `${BASE_URL}/api/overview/revenue-in-year`,
        {
          params: year,
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async DashboardTopContributor() {
    try {
      // console.log(year);
      let response = await axios.get(`${BASE_URL}/api/overview/trainer-top`, {
        // params: year,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      return response;
    } catch (error) {
      throw error;
    }
  }

  // pie chart services
  async DashboardPieServicesData(year) {
    try {
      let response = await axios.get(
        `${BASE_URL}/api/overview/pie-services-data`,
        {
          params: year,
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  // top revenue online courses
  async TopRevenueCourseServicesData(year) {
    try {
      let response = await axios.get(
        `${BASE_URL}/api/top-revenue/online-course`,
        {
          params: year,
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  // top registration online course
  async TopRegistrationCourseServicesData(year) {
    try {
      let response = await axios.get(
        `${BASE_URL}/api/top-registration/online-course`,
        {
          params: year,
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  // top revenue workshop
  async TopRevenueWorkshopServicesData(year) {
    try {
      let response = await axios.get(`${BASE_URL}/api/top-revenue/workshop`, {
        params: year,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  // top registration workshop
  async TopRegistrationWorkshopServicesData(year) {
    try {
      let response = await axios.get(
        `${BASE_URL}/api/top-registration/workshop`,
        {
          params: year,
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  // top revenue TrainingCourse
  async TopRevenueTrainingCourseServicesData(year) {
    try {
      let response = await axios.get(`${BASE_URL}/api/top-revenue/training-course`, {
        params: year,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  // top registration TrainingCourse
  async TopRegistrationTrainingCourseServicesData(year) {
    try {
      let response = await axios.get(
        `${BASE_URL}/api/top-registration/training-course`,
        {
          params: year,
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  // get-ticket-ratio-onl-off-by-year
  async TicketRatioOnOffByYear(year) {
    try {
      let response = await axios.get(
        `${BASE_URL}/api/AdviceConsultingStaff/get-ticket-ratio-onl-off-by-year`,
        {
          params: year,
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }


  //  get by month
  // top revenue online courses
  async TopRevenueCourseServicesDataByMonth(year) {
    try {
      let response = await axios.get(
        `${BASE_URL}/api/top-revenue/online-course-month`,
        {
          params: year,
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  // top registration online course
  async TopRegistrationCourseServicesDataByMonth(year) {
    try {
      let response = await axios.get(
        `${BASE_URL}/api/top-registration/online-course-month`,
        {
          params: year,
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  
  // top revenue workshop
  async TopRevenueWorkshopServicesDataByMonth(year) {
    try {
      let response = await axios.get(`${BASE_URL}/api/top-revenue/workshop-month`, {
        params: year,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  // top registration workshop
  async TopRegistrationWorkshopServicesDataByMonth(year) {
    try {
      let response = await axios.get(
        `${BASE_URL}/api/top-registration/workshop-month`,
        {
          params: year,
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  // top revenue TrainingCourse
  async TopRevenueTrainingCourseServicesDataByMonth(year) {
    try {
      let response = await axios.get(`${BASE_URL}/api/top-revenue/training-course-month`, {
        params: year,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  // top registration TrainingCourse
  async TopRegistrationTrainingCourseServicesDataByMonth(year) {
    try {
      let response = await axios.get(
        `${BASE_URL}/api/top-registration/training-course-month`,
        {
          params: year,
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  // get-ticket-ratio-onl-off-by-year
  async TicketRatioOnOffByMonth(year) {
    try {
      let response = await axios.get(
        `${BASE_URL}/api/AdviceConsultingStaff/get-ticket-ratio-onl-off-by-month`,
        {
          params: year,
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default new DashboardService();
