import React, { useState } from "react";
import { Box, Typography, Avatar, useMediaQuery } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import companyLogo from "../../assets/logo.jpg"; // Company logo


const AmeliaUpload = () => {
  const [file, setFile] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.files.length) {
      setFile(event.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (event) => {
    if (event.target.files.length) {
      setFile(event.target.files[0]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    
    <Box display="flex" flexDirection={isMobile ? "column" : "row"} height="100vh" bgcolor="#F3F0FA">
        {/* Company Logo */}
        <Box position="absolute" top={20} left={20}>
          <img src={companyLogo} alt="Company Logo" style={{ height: "50px" }} />
        </Box>
      {/* Left Section */}
      <Box
        width={isMobile ? "100%" : "40%"}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        bgcolor="#fff"
        padding={isMobile ? 3 : 0}
      >
        <Typography variant="h4" fontWeight="bold" color="#673AB7" gutterBottom>
          AMELIA
        </Typography>
        <Avatar sx={{ width: 80, height: 80, bgcolor: "#D1C4E9", mb: 1 }} />
        <Typography variant="subtitle1" color="textSecondary">
          Silpa Chandrasekaran
        </Typography>
      </Box>
      
      {/* Right Section */}
      <Box
        width={isMobile ? "100%" : "60%"}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        padding={4}
      >
        <input
          type="file"
          onChange={handleFileSelect}
          style={{ display: "none" }}
          id="file-upload"
        />
        <Box
          width={isMobile ? "80%" : 700}
          height={isMobile ? 200 : 500}
          border="2px dashed #673AB7"
          borderRadius={3}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bgcolor="#EDE7F6"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById("file-upload").click()}
          sx={{ cursor: "pointer", position: "relative" }}
        >
          <CloudUploadIcon sx={{ fontSize: 50, color: "#673AB7" }} />
          <Typography variant="h6" fontWeight="500" color="#303F9F" mt={2} textAlign="center">
            {file ? file.name : "Drag and drop files here"}
          </Typography>
          <Typography
            variant="body2"
            color="#303F9F"
            textAlign="center"
            width={isMobile ? "90%" : 400}
            sx={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)" }}
          >
            Please upload the Amelia Transcript JSON file here
            and the file size should be below 200MB.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AmeliaUpload;
