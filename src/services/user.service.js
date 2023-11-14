import axios from "axios";
const URL = process.env.REACT_APP_API;
const API_UM_URL = URL + "/api/user-management/";
const API_PROFILE = URL + "/api/"

class UserService {

    //management

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

    async putUserProfile({ name, email, phoneNumber, password }) {
        const accessToken = JSON.parse(localStorage.getItem('user-token'));
        const response = await axios
            .put(API_PROFILE + "profile/update-information", {
                name,
                email,
                phoneNumber,
                password,
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
