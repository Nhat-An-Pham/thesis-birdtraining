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
                `${BASE_URL}/api/trainingcourse-staff/birdtrainingcourse-confirm`, null,
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
    async assignTrainer(params = null){
        try {
            const response = await axios.put(
                `${BASE_URL}/api/trainingcourse-staff/assigntrainertoprogress`,null,
                {
                    headers: {
                        Authorization: `Bearer ${ACCESS_TOKEN}`,
                    },
                    params: params
                }
            );
            return response;
        }catch (error) {
            console.error("Error assign trainer to course:", error);
            // You might want to throw an error here or handle it as needed.
            throw error;
        }
    }
    async markTrainingSlotDone(params = null){
        try {
            const response = await axios.put(
                `${BASE_URL}/api/trainingcourse-trainer/mark-trainingslotdone`,null,
                {
                    headers: {
                        Authorization: `Bearer ${ACCESS_TOKEN}`,
                    },
                    params: params
                }
            );
            return response;
        }catch (error) {
            console.error("Error mark training slot failed:", error);
            // You might want to throw an error here or handle it as needed.
            throw error;
        }
    }
    async getTimetableReportView(params = null){
        try {
            const response = await axios.put(
                `${BASE_URL}/api/trainingcourse-trainer/timetable-slot-itemdetail`,null,
                {
                    headers: {
                        Authorization: `Bearer ${ACCESS_TOKEN}`,
                    },
                    params: params
                }
            );
            return response;
        }catch (error) {
            console.error("Error get training slot detail failed:", error);
            // You might want to throw an error here or handle it as needed.
            throw error;
        }
    }
    async receiveBirdForm(formData){
        try {
            const response = await axios.put(
                `${BASE_URL}/api/trainingcourse-staff/receive-bird`,formData,
                {
                    headers: {
                        Authorization: `Bearer ${ACCESS_TOKEN}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response;
        }catch (error) {
            console.error("Error receive bird input failed:", error);
            // You might want to throw an error here or handle it as needed.
            throw error;
        }
    }
    async returnBirdForm(formData){
        try {
            const response = await axios.put(
                `${BASE_URL}/api/trainingcourse-staff/return-bird`,formData,
                {
                    headers: {
                        Authorization: `Bearer ${ACCESS_TOKEN}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response;
        }catch (error) {
            console.error("Error return bird input failed:", error);
            // You might want to throw an error here or handle it as needed.
            throw error;
        }
    }
}

export default new TrainingCourseManagementService();