import axios from "axios";
import { jwtDecode } from "jwt-decode";
const BASE_URL = process.env.REACT_APP_API;
// const BASE_URL = 'https://localhost:7176';
const ACCESS_TOKEN = JSON.parse(localStorage.getItem("user-token"));
class TrainerWorkshopService {
  async getAssignedSlots(params = null) {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/workshop/assigned-slots`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
          params: params,
        }
      );
      return response;
    } catch (error) {
      console.error("Error fetching assigned slots:", error);
      // You might want to throw an error here or handle it as needed.
      throw error;
    }
  }
  async getTrainerSlotByEntityId(entityId) {
    try {
      let params = {
        entityId: entityId,
      };
      const response = await axios.get(
        `${BASE_URL}/api/workshop/get-by-entity-id`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
          params: params,
        }
      );
      return response;
    } catch (error) {
      console.error("Error fetching getTrainerSlotByEntityId:", error);
      // You might want to throw an error here or handle it as needed.
      throw error;
    }
  }
  async getListAttendees(classSlotId) {
    try {
      let params = {
        classSlotId: classSlotId,
      };
      const response = await axios.get(
        `${BASE_URL}/api/workshop/attendance/list-attendees`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
          params: params,
        }
      );
      return response;
    } catch (error) {
      console.error("Error fetching getListAttendees:", error);
      // You might want to throw an error here or handle it as needed.
      throw error;
    }
  }
  async updateAttendance(attendees, classSlotId) {
    try {
      let params = {
        classSlotId: classSlotId,
      };
      console.log(attendees);
      const response = await axios.put(
        `${BASE_URL}/api/workshop/attendance/submit`,
        attendees,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": 'application/json'
          },
          params: params,
        }
      );
      return response;
    } catch (error) {
      console.error("Error fetching getListAttendees:", error);
      // You might want to throw an error here or handle it as needed.
      throw error;
    }
  }
}

export default new TrainerWorkshopService();
