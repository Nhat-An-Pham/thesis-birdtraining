import axios from "axios";
const URL = process.env.REACT_APP_API;
const API_UM_URL = URL + "/api/user-management/";
const API_PROFILE = URL + "/api/"

class UserService {

    //Management
    //CREATE User
    async postCreateUser({ name, email, phoneNumber, password }) {

        const response = await axios
            .post(API_PROFILE + "auth/register", {
                name, email, password, phoneNumber
            })
        return response
    }
    //Get  Roles
    async getRoles() {
        const accessToken = JSON.parse(localStorage.getItem("user-token"))
        const response = await axios
            .get(API_UM_URL + "roles",
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
        return response;
    }
    async getCustomerStatuses() {
        const accessToken = JSON.parse(localStorage.getItem("user-token"))
        const response = await axios
            .get(API_UM_URL + "customer-statuses",
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
        return response;
    }
    async getTrainerStatuses() {
        const accessToken = JSON.parse(localStorage.getItem("user-token"))
        const response = await axios
            .get(API_UM_URL + "trainer-statuses",
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
        return response;
    }

    //UPDATE ROLE AND STATUS
    async putChangeRole({ id, role }) {
        const accessToken = JSON.parse(localStorage.getItem("user-token"))
        const response = await axios
            .put(API_UM_URL + "update-role", { id, role }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
        return response;
    }

    async putChangeStatus({ id, status }) {
        const accessToken = JSON.parse(localStorage.getItem("user-token"))
        const response = await axios
            .put(API_UM_URL + "update-status", { id, status }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
        return response;
    }


    // ------------------------
    // get all users
    async getUserList() {
        const accessToken = JSON.parse(localStorage.getItem('user-token'));
        const response = await axios
            .get(API_UM_URL + "users", {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
        // console.log(response)
        return response;
    }

    async getUserProfile() {
        const accessToken = JSON.parse(localStorage.getItem('user-token'));
        const response = await axios
            .get(API_PROFILE + "profile", {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
        return response;
    }

    async putUserProfile({ name, email, phoneNumber, password, gender = null, birthDay = null, ggMeetLink = null }) {
        const accessToken = JSON.parse(localStorage.getItem('user-token'));
        const response = await axios
            .put(API_PROFILE + "profile/update-information", {
                name,
                email,
                phoneNumber,
                password,
                gender,
                birthDay,
                ggMeetLink
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
        return response;
    }

    async putProfileImage({ avatar }) {
        const accessToken = JSON.parse(localStorage.getItem('user-token'));
        console.log(avatar)
        const response = await axios
            .put(API_PROFILE + "profile/update-avatar", {
                avatar
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Content-Type": "multipart/form-data",
                }
            })
        return response;
    }

}

export default new UserService();
