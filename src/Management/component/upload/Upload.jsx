import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";

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
    <div>
      <Button variant="contained" color="ochre">
        <label htmlFor="contained-button-file" className="m-0 w-100">
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

      <div>
        {/* Display file previews */}
        {filePreviews.map((preview) => (
          <img
            key={preview.file.name}
            src={preview.dataURL}
            alt={preview.file.name}
            style={{ maxWidth: "200px", maxHeight: "200px", margin: "5px" }}
          />
        ))}
      </div>
    </div>
  );
};
