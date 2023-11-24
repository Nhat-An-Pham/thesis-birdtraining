import axios from "axios";
import { jwtDecode } from "jwt-decode";
const BASE_URL = process.env.REACT_APP_API;
const ACCESS_TOKEN = JSON.parse(localStorage.getItem("user-token"));

class TrainingCourseManagementService{
    getCurrentUser() {
        const user = jwtDecode(ACCESS_TOKEN);
        return user;
    }
    async confirmBirdTrainingCourse(params = null){
        try {
            const response = await axios.post(
                `${BASE_URL}/api/trainingcourse-staff/birdtrainingcourse-confirm`,
                {
                    headers: {
                        Authorization: `Bearer ${ACCESS_TOKEN}`,
                    },
                    params: params
                }
            );
            return response;
        }catch (error) {
            console.error("Error confirm bird training course:", error);
            // You might want to throw an error here or handle it as needed.
            throw error;
          }
    }
}