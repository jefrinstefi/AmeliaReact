import React from "react";
import { Card, CardContent, Typography, Box, LinearProgress } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
 
const SuccessRateCard = () => {
  return (
    <Card sx={{ 
      // width: 300,
     borderRadius: 3, boxShadow: 3, p: 2 }}>
      <CardContent>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" fontWeight={600}>
            Success Rate
          </Typography>
          <Typography variant="body2" color="primary" fontWeight={600}>
            Avg <span style={{ color: "#6937C6" }}>6.3</span>
          </Typography>
        </Box>
 
        {/* Progress Bar */}
        <LinearProgress
          variant="determinate"
          value={97} // Success percentage
          sx={{
            height: 8,
            borderRadius: 5,
            my: 1.5,
            backgroundColor: "#46C5E0",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#6937C6",
            },
          }}
        />
 
        {/* Success & Failure Details */}
        <Box mt={2}>
          {/* Successful Chats */}
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <CircleIcon sx={{ color: "#6937C6", fontSize: 12, mr: 1 }} />
              <Typography fontSize="0.85rem">Chat Successful</Typography>
            </Box>
            <Typography fontSize="0.9rem" fontWeight={600}>
              97%
            </Typography>
          </Box>
          <Typography fontSize="1.2rem" fontWeight={700} color="#6937C6">
            13,620
          </Typography>
 
          {/* Unsuccessful Chats */}
          <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
            <Box display="flex" alignItems="center">
              <CircleIcon sx={{ color: "#46C5E0", fontSize: 12, mr: 1 }} />
              <Typography fontSize="0.85rem">Chat Not Successful</Typography>
            </Box>
            <Typography fontSize="0.9rem" fontWeight={600}>
              3%
            </Typography>
          </Box>
          <Typography fontSize="1.2rem" fontWeight={700} color="#46C5E0">
            200
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
 
export default SuccessRateCard;