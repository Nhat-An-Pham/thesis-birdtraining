import axios from "axios";
import { http } from "./http";
const URL = process.env.REACT_APP_API;
const API_URL = URL + "/api/";

class WorkshopService {

    // get all workshops
    async getWorkshopList() {
        const response = await axios
        .get(API_URL+ "workshop");
        console.log(response)
        return response;
    }

    

}

export default new WorkshopService();
