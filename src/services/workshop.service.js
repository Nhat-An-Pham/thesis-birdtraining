import axios from "axios";
const URL = process.env.REACT_APP_API;
const API_URL = URL + "/api/workshop";

class WorkshopService {

    // get all workshops
    async getWorkshopList() {
        const response = await axios
            .get(API_URL + "");
        // console.log(response)
        return response;
    }

    //get Workshop By ID
    async getWorkshopById({ id }) {
        const response = await axios
            .get(API_URL + `/get-by-id?workshopId=${id}`);
        return response;
    }

    //get classes by workshop Id
    async getClasses({ id }) {
        const accessToken = JSON.parse(localStorage.getItem("user-token"))
        if (accessToken) {
            const response = await axios
                .get(API_URL + `/class?workshopId=${id}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
            return response;
        } else {
            const response = await axios
                .get(API_URL + `/class?workshopId=${id}`);
            return response
        }
    }

    //get class by classID
    async getClassById({ id }) {
        const response = await axios
            .get(API_URL + `/class-by-id?workshopClassId=${id}`)
        return response;
    }

    //get Class number registered
    async getClassNumberRegistered({ id }) {
        const response = await axios
            .get(API_URL + `/registration-info?workshopClassId=${id}`);
        return response;
    }


    // Billing information
    async getBillingInformation({ wclassId }) {
        const accessToken = JSON.parse(localStorage.getItem('user-token'));
        const response = await axios
            .get(API_URL + `/billing-information?workshopClassId=${wclassId}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
        return response;
    }

    //Purchase
    async postPurchaseWsClass({ wclassId }) {
        const accessToken = JSON.parse(localStorage.getItem('user-token'));
        const response = await axios
            .post(API_URL + `/purchase?workshopClassId=${wclassId}`, null, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
        return response;
    }
}

export default new WorkshopService();
