import axios from "axios";
import { jwtDecode } from "jwt-decode";
const BASE_URL = process.env.REACT_APP_API;
const ACCESS_TOKEN = JSON.parse(localStorage.getItem("user-token"));

class WorkshopRefundManagement {
  getCurrentUser() {
    const user = jwtDecode(ACCESS_TOKEN);
    return user;
  }
  async getAllRefundPolicies(params = null) {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/workshop/refund-policies`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
          params: params,
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      // You might want to throw an error here or handle it as needed.
      throw error;
    }
  }
  async createRefundpolicy(model) {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/workshop/refund-policies`,
        model,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(error);
      // You might want to throw an error here or handle it as needed.
      throw error;
    }
  }
  async updateRefundpolicy(model) {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/workshop/refund-policies`,
        model,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(error);
      // You might want to throw an error here or handle it as needed.
      throw error;
    }
  }
}

export default new WorkshopRefundManagement();
