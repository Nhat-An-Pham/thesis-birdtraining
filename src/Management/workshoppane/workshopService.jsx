import axios from "axios";

const BASE_URL = "http://54.179.55.17";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUiLCJlbWFpbCI6InRydW5nYWRtaW5AbWFpbCIsInJvbGUiOiJNYW5hZ2VyIiwibmFtZSI6IlRydW5nIEFkbWluaXN0cmF0b3IiLCJhdmF0YXIiOiIiLCJleHAiOjE2OTgyMDQ4Mzh9.W9HI8eNKb6MNSQERttmbUWPXSvVZf3tpkdbl65rZXYY";
export async function getWorkshops(params = null) {
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
export async function updateWorkshopStatus(workshop) {
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
export async function getDetailsByWorkshop(workshop) {
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
export async function switchWorkshopStatus(workshop) {
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
export function modifyTemplateDetail (id, value) {
    // Define the API URL to modify the detail template
    // Make an axios PUT request to modify the detail
    let modified = {
      id: id,
      detail: value
    }
   try {
     axios.put(`${BASE_URL}/api/workshop/modify-detail-template`, modified, {
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