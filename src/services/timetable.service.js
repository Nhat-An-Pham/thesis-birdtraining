import axios from "axios";
import { jwtDecode } from "jwt-decode";
const BASE_URL = process.env.REACT_APP_API;
const DEV_URL = "https://localhost:7176";
const ACCESS_TOKEN = JSON.parse(localStorage.getItem("user-token"));
class TimetableService {
  async getSlotTime(params = null) {
    try {
      const response = await axios.get(`${BASE_URL}/api/slot/time`, {
        params: params,
      });
      // Handle the respons e and update the state
      // toast('Fetching workshops');
      return response;
    } catch (error) {
      console.error("Error fetching slots:", error);
      // You might want to throw an error here or handle it as needed.
      throw error;
    }
  }
  async getFreeTrainerOnSlotDate(params = null, date, slotId) {
    try {
      let data = {
        date: date,
        slotId: slotId,
      };
      const response = await axios.post(
        `${BASE_URL}/api/timetable/free-trainers`,
        data,
        {
          params: params,
        }
      );
      // Handle the response and update the state
      // toast('Fetching workshops');
      return response;
    } catch (error) {
      console.error("Error fetching trainers:", error);
      // You might want to throw an error here or handle it as needed.
      throw error;
    }
  }
  async getTrainerTimetable(trainerId, from, to, params = null) {
    try {
      let data = {
        trainerId: trainerId,
        from: from,
        to: to,
      };
      const response = await axios.post(
        `${BASE_URL}/api/timetable/trainer`,
        data,
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
      console.error("Error fetching trainers:", error);
      // You might want to throw an error here or handle it as needed.
      throw error;
    }
  }

  async updateSlot(time) {
    await axios.put(
      BASE_URL + `/api/slot/updateSlot?minute=${time}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
  }

  // Add Trainer Schedule
  async postLogInDay({selectedDate, option, trainerId, reason}) {
    await axios.post(
      BASE_URL + "/api/timetable/log-in-day", 
      { selectedDate, option, trainerId, reason },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    )
  }
  async postLogRange({from, to, trainerId, reason}) {
    await axios.post(
      BASE_URL + "/api/timetable/log-range", { from, to, trainerId, reason },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    )
  }



}

export default new TimetableService();
