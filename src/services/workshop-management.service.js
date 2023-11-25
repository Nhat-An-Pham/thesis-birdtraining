import axios from "axios";
import { jwtDecode } from "jwt-decode";
const BASE_URL = process.env.REACT_APP_API;
// const BASE_URL = 'https://localhost:7176';
const ACCESS_TOKEN = JSON.parse(localStorage.getItem("user-token"));
class WorkshopManagementService {    
    getCurrentUser() {
        const user = jwtDecode(ACCESS_TOKEN);
        return user;
    }
    async getWorkshops(params = null) {
        try {
          const response = await axios.get(`${BASE_URL}/api/workshop/workshops`, {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
            params: params,
          });
          // Handle the response and update the state
          // toast('Fetching workshops');
          return response.data;
        } catch (error) {
          console.error("Error fetching workshops:", error);
          // You might want to throw an error here or handle it as needed.
          throw error;
        }
      }
     async updateWorkshopStatus(workshop) {
        try {
          let action = workshop.status === "Active" ? "deactivate" : "activate";
          const endpoint = `${BASE_URL}/workshop/${action}`;
      
          // Assuming you have the Bearer token stored in a variable called 'token'
      
          const response = await axios.put(endpoint, null, {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
            params: {
              workshopId: `${workshop.id}`,
            },
          });
      
          return response;
        } catch (error) {
          console.error("An error occurred:", error);
          //   toast.error('An error occurred while updating workshop status');
        }
      }
     async getDetailsByWorkshop(workshop) {
        try {
          const response = await axios.get(
            `${BASE_URL}/api/workshop/detail-template`,
            {
              headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
              },
              params: {
                workshopId: `${workshop.id}`,
              },
            }
          );
          // Handle the response and update the state
          // toast('Fetching workshops');
          // console.log(response.data);
          return response.data;
        } catch (error) {
          console.error("Error fetching details:", error);
          // You might want to throw an error here or handle it as needed.
          throw error;
        }
      }
     async switchWorkshopStatus(workshop) {
        try {
          let action = workshop.status === "Active" ? "deactivate" : "activate";
          const endpoint = `${BASE_URL}/api/workshop/${action}`;
      
          // Assuming you have the Bearer token stored in a variable called 'token'
      
          const response = await axios.put(endpoint, null, {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
            params: {
              workshopId: `${workshop.id}`,
            },
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
    async modifyTemplateDetail (id, value) {
          // Define the API URL to modify the detail template
          // Make an axios PUT request to modify the detail
          let modified = {
            id: id,
            detail: value
          }
         try {
           await axios.put(`${BASE_URL}/api/workshop/modify-detail-template`, modified, {
               headers: {
                 Authorization: `Bearer ${ACCESS_TOKEN}`,
                 'Content-Type': 'application/json',
               },
             });
             console.log('modified');
         } catch (error) {
              throw error;
         }
        };
    async createWorkshop(formData){
          try {
            const response = await axios.post(`${BASE_URL}/api/workshop/create`, formData, {
              headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
                "Content-Type": "multipart/form-data",
              },
            });
      
            if (response.status === 200) {
              return response;
            } else {
              throw response;
            }
          } catch (error) {
            throw error;
          }
        }
    

}

export default new WorkshopManagementService();