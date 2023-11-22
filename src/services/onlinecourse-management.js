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
    async postAddSection({ CourseId, Title, Description, ResourceFiles }) {
        const accessToken = JSON.parse(localStorage.getItem('user-token'))
        const response = await axios
            .post(API_URL + `/add-section`, {
                CourseId, Title, Description, ResourceFiles
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
            )
        return response;
    }


    //ADD LESSON
    async postAddLesson({ SectionId, Title, Description, Detail, Video }) {
        const accessToken = JSON.parse(localStorage.getItem('user-token'))
        const response = await axios
            .post(API_URL + `/add-section`, {
                SectionId, Title, Description, Detail, Video
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
            )
        return response;
    }


}

export default new OnlineCourseManagementService();
