import axios from "axios";
const URL = process.env.REACT_APP_API;
const API_URL_ADMIN = URL + "/api/MembershipAdministrator/";

class MembershipService {
  async getListMembership() {
    const response = await axios.get(API_URL_ADMIN + "getListMembership");
    return response;
  }

  async getMembershipDetail(id) {
    const response = await axios.get(
      API_URL_ADMIN + `getMembershipDetail?id=${id}`
    );
    return response;
  }

  async createNewMembership({ Name, Discount, Requirement }) {
    const accessToken = JSON.parse(localStorage.getItem("user-token"));
    return axios.post(
      API_URL_ADMIN + "createNewMembership",
      {
        Name,
        Discount,
        Requirement,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }

  async updateMembership({ Id, Name, Discount, Requirement }) {
    const accessToken = JSON.parse(localStorage.getItem("user-token"));
    return axios.put(
      API_URL_ADMIN + "updateMembership",
      {
        Id,
        Name,
        Discount,
        Requirement,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }

  async deleteMembership({ id }) {
    const accessToken = JSON.parse(localStorage.getItem("user-token"));
    return axios.delete(API_URL_ADMIN + `deleteMembership?id=${id}`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}

export default new MembershipService();
