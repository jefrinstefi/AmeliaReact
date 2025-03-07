import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { Person, Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import bgImage from "../../assets/logo.jpg"; // Background image
import companyLogo from "../../assets/logo.jpg"; // Company logo

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:960px)");

  const navigate = useNavigate(); // React Router Navigation Hook

  const handleLogin = () => {
    // Authentication logic
    navigate("/upload");
  };

  return (
    <Box display="flex" flexDirection={isTablet ? "column" : "row"} height="100vh" width="100%">
      {/* Login Form */}
      <Box
        width={isTablet ? "60%" : isMobile ? "100%" : "35%"}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        padding={isMobile ? "20px" : "40px"}
        bgcolor="#fff"
        boxShadow="2px 4px 10px rgba(0,0,0,0.1)"
        position="relative"
        margin={isMobile ? "auto" : "0"}
        alignSelf={isTablet ? "center" : "stretch"}
      >
        {/* Company Logo */}
        <Box position="absolute" top={20} left={20}>
          <img src={companyLogo} alt="Company Logo" style={{ height: "50px" }} />
        </Box>

        <Typography variant="h4" fontWeight="bold" color="#5D3FD3" marginTop={8} letterSpacing={10}>
          AMELIA
        </Typography>
        <Typography variant="h6" marginTop={1} color="black">
          Login to your account
        </Typography>

        {/* Username Input */}
        <Box width="80%" marginTop={2}>
          <TextField
            fullWidth
            margin="dense"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
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
        <Box width="80%" marginTop={2}>
          <TextField
            fullWidth
            margin="dense"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff style={{ color: "grey" }} /> : <Visibility style={{ color: "grey" }} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box width="80%" display="flex" justifyContent="flex-start" marginTop={1}>
          <FormControlLabel
            control={<Checkbox sx={{ color: "#5D3FD3", "&.Mui-checked": { color: "#5D3FD3" } }} />}
            label="Remember Me"
          />
        </Box>

        {/* Login Button */}
        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{ mt: 2, width: "80%", backgroundColor: "#5D3FD3", borderRadius: "20px" }}
        >
          LOGIN
        </Button>
      </Box>

      {/* Right Side */}
      {!isMobile && (
        <Box
          width={isTablet ? "40%" : "65%"}
          height={isTablet ? "100%" : "100%"}
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