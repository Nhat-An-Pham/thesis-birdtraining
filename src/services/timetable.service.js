import axios from "axios";
import { jwtDecode } from "jwt-decode";
const BASE_URL = process.env.REACT_APP_API;
const DEV_URL = 'https://localhost:7176';
const ACCESS_TOKEN = JSON.parse(localStorage.getItem("user-token"));
class TimetableService {    
      async getSlotTime(params = null){
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
      async getFreeTrainerOnSlotDate(params = null, date, slotId){
        try {
            let data = {
                date : date,
                slotId: slotId
            }
            const response = await axios.post(`${BASE_URL}/api/timetable/free-trainers`, data, {
              params: params,              
            });
            // Handle the response and update the state
            // toast('Fetching workshops');
            return response;
          } catch (error) {
            console.error("Error fetching trainers:", error);
            // You might want to throw an error here or handle it as needed.
            throw error;
          }
      }
}

export default new TimetableService();