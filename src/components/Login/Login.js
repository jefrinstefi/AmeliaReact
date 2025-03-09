import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { Person, Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/loginimg.png"; // Background image
import companyLogo from "../../assets/logo 1.png"; // Company logo
import "./Login.css";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:960px)");

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/upload");
  };

  return (
    <Box
      display="flex"
      flexDirection={isTablet ? "column" : "row"}
      height="100vh"
      width="100%"
      alignItems="center"
      justifyContent="center"
      padding={isMobile ? "10px" : "0"}
      position="relative"
    >
      {/* Company Logo (Fixed at Top Left) */}
      <Box position="absolute" top={20} left={20}>
        <img src={companyLogo} alt="Company Logo" style={{ height: "50px" }} />
      </Box>

      {/* Login Form */}
      <Box
        width={isMobile ? "90%" : isTablet ? "50%" : "35%"}
        maxWidth="400px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        margin="auto"
        padding={isMobile ? "20px" : "40px"}
      >
        {/* Title */}
        <Box textAlign="center" mb={3}>
          <Box sx={{ fontSize: 24, fontWeight: 700, color: "#5D3FD3" }}>AMELIA</Box>
          <Box sx={{ fontSize: 14, fontWeight: 600, color: "#0E3169", mt: 1 }}>
            Login to your account
          </Box>
        </Box>

        {/* Username Input */}
        <Box width="100%" marginTop={2}>
          <Box sx={{ fontSize: 12, fontWeight: 500, color: "#8F8F8F", mb: 0.5 }}>Username</Box>
          <TextField
            fullWidth
            margin="dense"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px", 
                borderColor:"#E6E4E6",
                height: "38px",
                fontSize:"12px", 
                color:"#4F2580",
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#4F2580", // Hover color
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Person style={{ color: "grey" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Password Input */}
        <Box width="100%" marginTop={2}>
          <Box sx={{ fontSize: 12, fontWeight: 500, color: "#8F8F8F", mb: 0.5 }}>Password</Box>
          <TextField
            fullWidth
            margin="dense"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px", 
                borderColor:"#E6E4E6",
                height: "38px", 
                paddingRight:"10px",
                fontSize:"12px",
                color:"#4F2580",
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#4F2580", // Hover color
                },
                
                

              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <VisibilityOff style={{ color: "grey" }} />
                    ) : (
                      <Visibility style={{ color: "grey" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Remember Me Checkbox */}
        <Box width="100%" display="flex" justifyContent="flex-start" marginTop={1}>
  <FormControlLabel
    control={<Checkbox sx={{ color: "#4F2580",borderColor:"#E6E4E6", "&.Mui-checked": { color: "#4F2580" } }} />}
    label="Remember Me"
    sx={{ color: "#4F2580", fontWeight: 400, fontSize:12 }} 
  />
</Box>

        {/* Login Button */}
        <Button
          className="custom-button"
          variant="contained"
          onClick={handleLogin}
          sx={{
            mt: 2,
            width: "100%",
            height: 47,
            backgroundColor: "#4F2580",
            borderRadius: "8px",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          LOGIN
        </Button>
      </Box>

      {/* Right Side Background Image */}
      {!isMobile && (
        <Box
          width={isTablet ? "50%" : "65%"}
          height="100%"
          sx={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
    </Box>
  );
};

export default LoginPage;
