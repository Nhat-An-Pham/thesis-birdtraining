import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
let URL = process.env.REACT_APP_API;

export default function PdfCertificate({ courseId }) {
  const [cert, setCert] = useState();
  const accessToken = JSON.parse(localStorage.getItem("user-token"));
  async function fetchCertificate() {
    try {
      let params = {
        courseId: courseId,
      };
      const response = await axios.get(URL + "/api/online-course/certificate-base64", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params,
      });
      //   let pdfdata = JSON.parse(response.data);
      //   console.log(pdfdata);
      //   setCert(pdfdata);
      const dataUrl = `data:application/pdf;base64,${response.data}`;
      // console.log(response);
      setCert(dataUrl);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetchCertificate();

    return () => {};
  }, []);
  return (
    <div>
        <embed
          src={cert}
          id="displayFile"
          width="100%"
          height="500px"
          style={{ borderStyle: "solid" }}
          type="application/pdf"
        />    
    </div>
  );
}
