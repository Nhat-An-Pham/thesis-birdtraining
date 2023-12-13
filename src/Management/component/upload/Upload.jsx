import { Alert, Button, CircularProgress, Divider, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Img } from "react-image";
import { Carousel } from "react-responsive-carousel";
import "./upload.scss";
export const UploadComponent = ({
  children,
  value,
  onChange,
  disabled,
  accept,
  multiple = true,
}) => {
  const [filePreviews, setFilePreviews] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      // Read and store file previews
      const newFilePreviews = Array.from(files).map((file) => {
        const reader = new FileReader();

        return new Promise((resolve) => {
          reader.onload = (e) => resolve({ file, dataURL: e.target.result });
          reader.readAsDataURL(file);
        });
      });

      Promise.all(newFilePreviews).then(setFilePreviews);
    }

    // Trigger the original onChange handler
    onChange && onChange(event);
  };

  useEffect(() => {
    // Clear file previews when the component is unmounted
    return () => {
      setFilePreviews([]);
    };
  }, []);
  return (
    <>
      <Grid
        container
        item
        alignItems={"center"}
        justifyContent={"center"}
        spacing={3}
        padding={2}
      >
        <Grid container item xs={12} justifyContent={"center"}>
          <Button variant="contained" color="ochre">
            <label htmlFor="contained-button-file">
              <input
                value={value}
                accept={accept}
                disabled={disabled}
                style={{ display: "none" }}
                id="contained-button-file"
                multiple={multiple}
                type="file"
                onChange={disabled ? () => {} : handleFileChange}
              />
              {children}
            </label>
          </Button>
        </Grid>
        {filePreviews && filePreviews.length > 0 ? (
          <Grid item>
            <Carousel swipeable>
              {filePreviews?.map((file) => (
                <div style={{ height: 300 }}>

                  {file.dataURL.includes("image") ? (
                    <Img
                      // srcSet={`${picture}`}
                      src={`${file.dataURL}`}
                      alt={`error`}
                      style={{ height: "100%", width: "auto", objectFit:"contain", border:"0.4px grey solid" }}
                      loading={<CircularProgress />}
                    />
                  ) : file.dataURL.includes("video") ? (
                    <video
                      // srcSet={`${picture}`}
                      controls
                      src={`${file.dataURL}`}
                      alt={`error`}
                      style={{ height: "100%", width: "auto" }}
                      loading={<CircularProgress />}
                    />
                  ) : null}
                </div>
              ))}
            </Carousel>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Alert severity="info">No file is provided!</Alert>
          </Grid>
        )}
      </Grid>
    </>
  );
};
