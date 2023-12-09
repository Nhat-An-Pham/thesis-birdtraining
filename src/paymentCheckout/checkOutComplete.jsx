import React from "react";
import { useNavigate } from "react-router-dom";

export default function CheckOutComplete() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "500px",
        position: "relative",
        flexDirection: "column",
      }}
    >
      <h1>Thank you for your purchase ~~ !!</h1>

      <button
        onClick={() => {
            navigate('/home');
        }}
        style={{
          width: "auto",
          backgroundColor: "#4c616b",
          border: "none",
          borderRadius: "8px",
          color: "#eff2f3",
          fontSize: "1.6rem",
          fontWeight: 700,
          margin: "2rem 0",
          padding: "1rem",
          cursor: "pointer",
        }}
      >
        Back to home page
      </button>
    </div>
  );
}
