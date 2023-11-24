import axios from "axios";
const URL = process.env.REACT_APP_API;
const API_URL = URL + "/api/online-course";

class OnlineCourseService {

    //GET ALL COURSES
    async getAllOnlineCourse() {
        const response = await axios
            .get(API_URL + "/courses");
        // console.log(response)
        return response;
    }

    // GET ONLINE COURSE BY ID
    async getOnlineCourseById({ id }) {
        const accessToken = JSON.parse(localStorage.getItem('user-token'))
        const response = await axios
            .get(API_URL + `/course-by-id?courseId=${id}`, {
                headers: {
                    'Authorization': accessToken === null ? '' : `Bearer ${accessToken} `
                }
            })
        return response;
    }

    //GET BILLING INFORMATION
    async getBillingInformation({ oclassid }) {
        const accessToken = JSON.parse(localStorage.getItem('user-token'))
        const response = await axios
            .get(API_URL + `/billing-information?courseId=${oclassid}`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken} `
                    }
                })
        return response;
    }

    //SUBMIT PAYMENT
    async postSubmitPayment({ courseId, coursePrice, discountedPrice, totalPrice, discountRate, membershipName }) {
        const accessToken = JSON.parse(localStorage.getItem('user-token'))
        const response = await axios
            .post(API_URL + `/enroll`, {
                courseId, coursePrice, discountedPrice, totalPrice, discountRate, membershipName
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
            )
        return response;

    }


    //CHECK LESSON
    async putCheckLesson({ lessonId }) {
        const accessToken = JSON.parse(localStorage.getItem('user-token'))
        const response = await axios
            .put(API_URL + "/check-lesson", { lessonId },
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                })
        return response;
    }
    //CHECK SECTION
    async putCheckSection({ sectionId }) {
        const accessToken = JSON.parse(localStorage.getItem("user-token"))
        const response = await axios
            .put(API_URL + "/check-section", { sectionId },
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                })
        return response;
    }

}

export default new OnlineCourseService();
