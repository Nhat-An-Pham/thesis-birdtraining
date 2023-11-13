import axios from "axios";
const URL = process.env.REACT_APP_API;
const API_URL_CUS = URL + "/api/AdviceConsultingCustomer/";
const API_URL_AllROLE = URL + "/api/AdviceConsultingAllRoles/";
const API_URL_STAFF = URL + "/api/AdviceConsultingStaff/";
class ConsultantService {

    async CusSendTicket({ customerId, address, consultingTypeId, trainerId, consultingDetail, onlineOrOffline, appointmentDate, actualSlotStart }) {
        return axios
            .post(API_URL_CUS + "sendConsultingTicket", {
                address,
                consultingTypeId,
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
            .get(API_URL_AllROLE + `getTrainerFreeSlotOnDate?date=${dateValue}&trainerId=${selectedTrainerId}`);
        return response;
    } 

    async getFreeTrainerOnSlotDate({dateValue, slotId}) {
        const response = await axios
            .get(API_URL_AllROLE + `getFreeTrainerOnSlotDate?date=${dateValue}&slotId=${slotId}`);
        return response
    }

    async viewListAssignedConsultingTicket() {
        const response = await axios
            .get(API_URL_STAFF + "viewListAssignedConsultingTicket");
            console.log(response);
        return response;
    }

    async viewListNotAssignedConsultingTicket() {
        const response = await axios
            .get(API_URL_STAFF + "viewListNotAssignedConsultingTicket");
        return response;
    }

    async viewListHandledConsultingTicket() {
        const response = await axios
            .get(API_URL_STAFF + "viewListHandledConsultingTicket");
        return response;
    }

    async cancelConsultingTicket({ticketId}) {
        const response = await axios
            .put(API_URL_STAFF + `cancelConsultingTicket?ticketId=${ticketId}`);
        return response;
    }

    async approveConsultingTicket({ticketId, trainerId, date, slotId}) {
        const response = await axios
            .put(API_URL_STAFF + `approveConsultingTicket?ticketId=${ticketId}&trainerId=${trainerId}&date=${date}&slotId=&${slotId}`)
        return response;
    }

    async assignTrainer({trainerId, ticketId}) {
        const  response = await axios
            .put(API_URL_STAFF + `assignTrainer?trainerId=${trainerId}&ticketId=${ticketId}`);
        return response;
    }

    async getConsultingTicketDetail({ticketId}) {
        const response = await axios
            .get(API_URL_AllROLE + `getConsultingTicketDetail?ticketId=${ticketId}`);
        return response;
    }
}

export default new ConsultantService();