import React from "react";
import LottieView from "lottie-react";
import loadingCircle from './../assets/lottie/loading.json';

export default function Loader() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: " rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
      }}
    >
      <LottieView
        animationData={loadingCircle}
        autoPlay
        loop
        style={{
          width: 200,
          height: 200,
        }}
      ></LottieView>
    </div>
  );
}
