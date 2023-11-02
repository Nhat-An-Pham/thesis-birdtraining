import axios from "axios";
const URL = process.env.REACT_APP_API;
const API_UM_URL = URL + "/api/user-management/";

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


}

export default new UserService();
