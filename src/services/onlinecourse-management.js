import axios from "axios";
const URL = process.env.REACT_APP_API;
const API_URL = URL + "/api/online-course/management";

class OnlineCourseManagementService {


    //GET ALL COURSES
    async getAllOnlineCourse() {
        const accessToken = JSON.parse(localStorage.getItem('user-token'))
        const response = await axios
            .get(API_URL + "/courses",
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            );
        return response;
    }

    //ADD COURSE
    async postAddCourse(formData) {
        const accessToken = JSON.parse(localStorage.getItem('user-token'))
        const response = await axios
            .post(API_URL + `/add-course`, formData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
            )
        return response;
    }

    //ADD SECTION
    async postAddSection(formData) {
        const accessToken = JSON.parse(localStorage.getItem('user-token'))
        const response = await axios
            .post(API_URL + `/add-section`, formData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
            )
        return response;
    }


    //ADD LESSON
    async postAddLesson(formData) {
        const accessToken = JSON.parse(localStorage.getItem('user-token'))
        const response = await axios
            .post(API_URL + `/add-lesson`, formData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
        return response;
    }




    //UPDATE SECTION
    async putModifySection(formData) {
        const accessToken = JSON.parse(localStorage.getItem("user-token"))
        const response = await axios
            .put(API_URL + "/modify-section", formData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
        return response;
    }

    //UPDATE LESSON
    async putModifyLesson(formData) {
        const accessToken = JSON.parse(localStorage.getItem("user-token"))
        const response = await axios
            .put(API_URL + "/modify-lesson", formData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
        return response;
    }

    //DELETE SECTION
    async deleteSection({ sectionId }) {
        const accessToken = JSON.parse(localStorage.getItem("user-token"))
        const response = await axios
            .delete(API_URL + "/delete-section", {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                }, data: sectionId
            })
        return response;
    }

    //DELETE LESSON
    async deleteLesson({ lessonId }) {
        const accessToken = JSON.parse(localStorage.getItem("user-token"))
        const response = await axios
            .delete(API_URL + "/delete-lesson", {
                data: lessonId,
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            })
        return response;
    }

    //Set ACTIVE / INACTIVE COURSE
    async putActiveCourse({ courseId }) {
        const accessToken = JSON.parse(localStorage.getItem("user-token"))
        const response = await axios
            .put(API_URL + "/activate", {
                data: courseId,
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                }
            })
        return response;
    }

    async switchCourseStatus(selectedCourse) {
        const accessToken = JSON.parse(localStorage.getItem("user-token"))
        try {
            let action = selectedCourse.status === "ACTIVE" ? "deactivate" : "activate";
            const endpoint = API_URL + `/${action}`;

            // Assuming you have the Bearer token stored in a variable called 'token'

            const response = await axios.put(endpoint, selectedCourse.id, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                // params: {
                //     courseId: `${selectedCourse.id}`,
                // },
            });

            if (response.status === 200) {
                // Workshop status successfully updated
                // toast.success('Workshop status updated successfully');
                return true;
            } else {
                // Handle other response status codes as needed
                // toast.error('Failed to update workshop status');
                throw response;
            }
        } catch (error) {
            console.error("An error occurred:", error);
            //   toast.error('An error occurred while updating workshop status');
            throw error;
        }
    }

}

export default new OnlineCourseManagementService();
