import axios from "axios";
const URL = process.env.REACT_APP_API;
const API_URL_CUS = URL + "/api/AdviceConsultingCustomer/";
const API_URL_AllROLE = URL + "/api/AdviceConsultingAllRoles/";

class ConsultantService {

    async CusSendTicket({ customerId, address, consultingType, trainerId, consultingDetail, onlineOrOffline, appointmentDate, actualSlotStart }) {
        return axios
            .post(API_URL_CUS + "customer-sendConsultingTicket", {
                address,
                consultingType,
                trainerId,
                consultingDetail,
                onlineOrOffline,
                appointmentDate,
                actualSlotStart,
            },{
                headers: {
                    'Authorization': `Bearer ${customerId}`
                }
            })
    }

    async getTrainerList() {
        const response = await axios
            .get(API_URL_AllROLE + "GetListTrainer");
        // console.log(response)
        return response;
    }

    async getConsultingType() {
        const response = await axios
            .get(API_URL_AllROLE + "GetConsultingType");
        // console.log(response)
        return response;
    }

    async getTrainerFreeSlotOnDate({dateValue, selectedTrainerId}){
        const response = await axios
            .get(API_URL_CUS + `getTrainerFreeSlotOnDate?date=${dateValue}&trainerId=${selectedTrainerId}`);
        return response;
    } 


}

export default new ConsultantService();