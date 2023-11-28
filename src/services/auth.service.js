import axios from "axios";
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
    try {
      const response = await axios
        .post(API_URL + "register", {
          name,
          password,
          email,
          phoneNumber,
        });
        return response.data
    } catch (error) {
      throw error;
    }
  }


}

export default new AuthService();
