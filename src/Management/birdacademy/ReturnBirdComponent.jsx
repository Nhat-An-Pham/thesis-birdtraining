import React, { useState } from "react";

const ReturnBirdComponent = () => {
  const [formData, setFormData] = useState({
    Id: 0,
    ReturnStaffId: 0,
    ReturnNote: "",
    ReturnPicture: null,
  });

  const [accessToken, setAccessToken] = useState(""); // Set the access token here

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const inputValue = type === "file" ? e.target.files[0] : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      const response = await fetch("your-api-endpoint", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include access token in the headers
        },
        body: formDataToSend,
      });

      // Handle the response as needed
      console.log("Server Response:", response);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Id:
        <input
          type="number"
          name="Id"
          value={formData.Id}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <label>
        ReturnStaffId:
        <input
          type="number"
          name="ReturnStaffId"
          value={formData.ReturnStaffId}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <label>
        ReturnNote:
        <input
          type="text"
          name="ReturnNote"
          value={formData.ReturnNote}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <label>
        ReturnPicture:
        <input type="file" name="ReturnPicture" onChange={handleInputChange} />
      </label>
      <br />

      <button type="submit">Submit</button>
    </form>
  );
};
export default ReturnBirdComponent;
