import React, { useState } from 'react';

const ReceivedBirdComponent = () => {
  const [formData, setFormData] = useState({
    Id: 0,
    ReceivedStaffId: 0,
    ReceivedNote: '',
    ReceivedPicture: null,
  });

  const [accessToken, setAccessToken] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const adjustedName = name.replace('Return', 'Received');
    const inputValue = type === 'file' ? e.target.files[0] : value;

    setFormData((prevData) => ({
      ...prevData,
      [adjustedName]: inputValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      const response = await fetch('your-api-endpoint', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formDataToSend,
      });

      console.log('Server Response:', response);
    } catch (error) {
      console.error('Error submitting form:', error);
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
        ReceivedStaffId:
        <input
          type="number"
          name="ReceivedStaffId"
          value={formData.ReceivedStaffId}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <label>
        ReceivedNote:
        <input
          type="text"
          name="ReceivedNote"
          value={formData.ReceivedNote}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <label>
        ReceivedPicture:
        <input
          type="file"
          name="ReceivedPicture"
          onChange={handleInputChange}
        />
      </label>
      <br />

      <button type="submit">Submit</button>
    </form>
  );
};

export default ReceivedBirdComponent;
