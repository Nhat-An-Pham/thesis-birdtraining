import axios from "axios";
import Cookies from "js-cookie";
import { http } from "./http";
const URL = process.env.REACT_APP_API;
const API_URL = URL + "/api/auth/";

class AuthService {

  //login
  async login({ email, password }) {
    return await axios 
      .post(API_URL + "login", {
        email,
        password
      })
      .then(response => {
        if (response.data) {
          localStorage.setItem("user-token", JSON.stringify(response.data));
        } 
        return response.data;
      });
  }




  async register({ name, email, password, phoneNumber }) {
    const response = await http
      .post(API_URL + "register", {
        name,
        password,
        email,
        phoneNumber,
      });
    return response;

  }


  async getCustomer({ id }) {
    return axios
      .get(API_URL + "login", {
        id
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log(response);
        }

        return response.data;
      });
  }

}

export default new AuthService();
