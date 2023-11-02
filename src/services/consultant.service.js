import axios from "axios";
import { http } from "./http";
// import axios from "axios";
// const URL =  process.env.REACT_APP_API;
const API_URL = "/api/AdviceConsultingCustomer/";

class ConsultantService {
    
    async CusSendTicket({customerId, address, consultingType, trainerId, consultingDetail, onlineOrOffline, appointmentDate, actualSlotStart }) {
        return axios
            .post(API_URL + "customer-sendConsultingTicket", {
                customerId,
                address,
                consultingType,
                trainerId,
                consultingDetail,
                onlineOrOffline,
                appointmentDate,
                actualSlotStart,
            })
    }
}

export default new ConsultantService();