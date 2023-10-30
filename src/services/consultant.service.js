import axios from "axios";
import { http } from "./http";
// import axios from "axios";
// const URL =  process.env.REACT_APP_API;
const API_URL = "/api/AdviceConsultingCustomer/";

class ConsultantService {
    //self generate: Bảo xem lại api 
    async CusSendTicket({ id, customerId, Address, consultingType, trainerId, consultingDetail, distance, onlineOrOffline, appointmentDate, actualSlotStart, actualEndSlot, price, discountedPrice, status }) {
        return http
            .post(API_URL + "customer-sendConsultingTicket", {
                id,
                customerId,
                Address,
                consultingType,
                trainerId,
                consultingDetail,
                distance,
                onlineOrOffline,
                appointmentDate,
                actualSlotStart,
                actualEndSlot,
                price,
                discountedPrice,
                status
            })
    }
}

export default new ConsultantService();