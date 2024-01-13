import axios from "axios";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
const URL = process.env.REACT_APP_API;
const API_URL_CUS = URL + "/api/AdviceConsultingCustomer/";
const API_URL_AllROLE = URL + "/api/AdviceConsultingAllRoles/";
const API_URL_STAFF = URL + "/api/AdviceConsultingStaff/";
const API_URL_TRAINER = URL + "/api/AdviceConsultingTrainer/";
const accessToken = JSON.parse(localStorage.getItem("user-token"));
class ConsultantService {
  //All Role
  async getTrainerList() {
    const response = await axios.get(API_URL_AllROLE + "GetListTrainer");
    // console.log(response)
    return response;
  }

  async getConsultingType() {
    const response = await axios.get(API_URL_AllROLE + "GetConsultingType");
    // console.log(response)
    return response;
  }

  async getTrainerFreeSlotOnDate({ dateValue, selectedTrainerId }) {
    const response = await axios.get(
      API_URL_AllROLE +
        `getTrainerFreeSlotOnDate?date=${dateValue}&trainerId=${selectedTrainerId}`
    );
    return response;
  }

  async getFreeTrainerOnSlotDate({ dateValue, slotId }) {
    const response = await axios.get(
      API_URL_AllROLE +
        `getFreeTrainerOnSlotDate?date=${dateValue}&slotId=${slotId}`
    );
    return response;
  }

  async getConsultingTicketDetail({ ticketId }) {
    const response = await axios.get(
      API_URL_AllROLE + `getConsultingTicketDetail?ticketId=${ticketId}`
    );
    return response;
  }

  async getFinishedConsultingTicket() {
    const response = await axios.get(
      API_URL_AllROLE + "getFinishedConsultingTicket"
    );
    return response;
  }

  async GetConsultingTicketPricePolicy() {
    const response = await axios.get(
      API_URL_AllROLE + "GetConsultingTicketPricePolicy"
    );
    return response;
  }

  async GetDistnacePricePolicy() {
    const response = await axios.get(
      API_URL_AllROLE + "GetDistnacePricePolicy"
    );
    return response;
  }

  async GetConsultingType() {
    const response = await axios.get(API_URL_AllROLE + "GetConsultingType");
    return response;
  }

  //Customer
  async CusSendTicket({
    customerId,
    address,
    consultingTypeId,
    trainerId,
    consultingDetail,
    onlineOrOffline,
    appointmentDate,
    actualSlotStart,
  }) {
    return axios.post(
      API_URL_CUS + "sendConsultingTicket",
      {
        address,
        consultingTypeId,
        trainerId,
        consultingDetail,
        onlineOrOffline,
        appointmentDate,
        actualSlotStart,
      },
      {
        headers: {
          Authorization: `Bearer ${customerId}`,
        },
      }
    );
  }

  //Staff
  async viewListAssignedConsultingTicket() {
    const accessToken = JSON.parse(localStorage.getItem("user-token"));
    const response = await axios.get(
      API_URL_STAFF + "viewListAssignedConsultingTicket",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response);
    return response;
  }

  async viewListNotAssignedConsultingTicket() {
    const accessToken = JSON.parse(localStorage.getItem("user-token"));
    const response = await axios.get(
      API_URL_STAFF + "viewListNotAssignedConsultingTicket",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  }

  async viewListHandledConsultingTicket() {
    const accessToken = JSON.parse(localStorage.getItem("user-token"));
    const response = await axios.get(
      API_URL_STAFF + "viewListHandledConsultingTicket",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  }

  async cancelConsultingTicket({ ticketId }) {
    const response = await axios.put(
      API_URL_STAFF + `cancelConsultingTicket?ticketId=${ticketId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  }

  async approveConsultingTicket({ ticketId, distance }) {
    const response = await axios.put(
      API_URL_STAFF +
        `approveConsultingTicket?ticketId=${ticketId}&distance=${distance}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  }

  async assignTrainer({ trainerId, ticketId }) {
    const response = await axios.put(
      API_URL_STAFF +
        `assignTrainer?trainerId=${trainerId}&ticketId=${ticketId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  }

  async UpdateConsultingType({ id, name }) {
    const response = await axios.put(
      API_URL_STAFF + `updateConsultingType`,
      {
        id,
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  }

  async UpdateConsultantPricePolicy({ id, price }) {
    const response = await axios.put(
      API_URL_STAFF + `updateConsultantPricePolicy`,
      {
        id,
        price,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  }

  async UpdateDisntacePricePolicy({ id, pricePerKm }) {
    const response = await axios.put(
      API_URL_STAFF + `updateDistancePricePolicy`,
      {
        id,
        pricePerKm,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  }

  async PreCalculateConsultantPrice({ ticketId, distance }) {
    const accessToken = JSON.parse(localStorage.getItem("user-token"));
    let params = {
      ticketId: ticketId,
      distance: distance,
    };
    const response = await axios.get(
      API_URL_STAFF + `preCalculateConsultantPrice`,
      {
        params: params,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  }

  //Trainer
  async getListAssignedConsultingTicket() {
    const response = await axios.get(
      API_URL_TRAINER + "getListAssignedConsultingTicket",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  }

  async updateGooglemeetLink({ ticketId, ggmeetLink }) {
    const response = await axios.put(
      API_URL_TRAINER +
        `updateGooglemeetLink?ticketId=${ticketId}&ggmeetLink=${ggmeetLink}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  }

  async finishAppointment({ id }) {
    const response = await axios.put(
      API_URL_TRAINER + `finishAppointment?ticketId=${id}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  }

  async GetAvailableFinishTime({ actualSlotStart }) {
    const accessToken = JSON.parse(localStorage.getItem("user-token"));
    const response = await axios.get(
      API_URL_TRAINER +
        `getAvailableFinishTime?actualStartSlot=${actualSlotStart}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  }

  async UpdateEvidence(formData) {
    const response = await axios.put(
      API_URL_TRAINER + `updateEvidence`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  }

  async UpdateRecord({ id, actualSlotStart, actualEndSlot, evidence }) {
    const response = await axios.put(
      API_URL_TRAINER + `updateRecord`,
      {
        id,
        actualSlotStart,
        actualEndSlot,
        evidence,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  }
}

export default new ConsultantService();
