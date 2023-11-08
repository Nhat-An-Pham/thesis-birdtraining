import axios from "axios";
import { jwtDecode } from "jwt-decode";
const BASE_URL = process.env.REACT_APP_API;
const ACCESS_TOKEN = JSON.parse(localStorage.getItem("user-token"));
class ClassManagementService {
  getCurrentUser() {
    const user = jwtDecode(ACCESS_TOKEN);
    return user;
  }
  async getClasses(params = null) {
    try {
      const response = await axios.get(`${BASE_URL}/api/workshop/get-classes`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        params: params,
      });
      // Handle the response and update the state
      // toast('Fetching workshops');
      return response;
    } catch (error) {
      console.error("Error fetching classes:", error);
      // You might want to throw an error here or handle it as needed.
      throw error;
    }
  }
  async getSlots(params = null) {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/workshop/get-class-details`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
          params: params,
        }
      );
      // Handle the response and update the state
      // toast('Fetching workshops');
      return response;
    } catch (error) {
      console.error("Error fetching class details:", error);
      // You might want to throw an error here or handle it as needed.
      throw error;
    }
  }
  async getSlotTime(params = null) {
    try {
      const response = await axios.get(`${BASE_URL}/api/slot/time`, {
        params: params,
      });
      // Handle the response and update the state
      // toast('Fetching workshops');
      return response;
    } catch (error) {
      console.error("Error fetching slots:", error);
      // You might want to throw an error here or handle it as needed.
      throw error;
    }
  }
  async AssignTrainer(model) {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/workshop/modify-trainer`,
        model,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      // Handle the response and update the state
      // toast('Fetching workshops');
      return response;
    } catch (error) {
      console.error("Error update trainer slot:", error);
      // You might want to throw an error here or handle it as needed.
      throw error;
    }
  }
  async CreateClass(workshopId, startTime) {
    try {
      let model = {
        workshopId : workshopId,
        startTime : startTime
      }
      const response = await axios.post(
        `${BASE_URL}/api/workshop/create-class`,
        model,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      // Handle the response and update the state
      // toast('Fetching workshops');
      return response;
    } catch (error) {
      console.error("Error update trainer slot:", error);
      // You might want to throw an error here or handle it as needed.
      throw error;
    }
  }
}

export default new ClassManagementService();
