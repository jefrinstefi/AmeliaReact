import React , {useState, useEffect}from "react";
import { Card, CardContent, Typography, Box, LinearProgress } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
 
const SuccessRateCard = ({ data }) => {
  const [successPercentage, setSuccessPercentage] = useState(0);
  const [failurePercentage, setFailurePercentage] = useState(0);
  const [totalChats, setTotalChats] = useState(0);

  useEffect(() => {
    if (data.success_rate && data.success_rate.Y !== undefined && data.success_rate.N !== undefined) {
      const total = data.success_rate.Y + data.success_rate.N;
      setTotalChats(total);
console.log(total);
      setSuccessPercentage(total > 0 ? Math.round((data.success_rate.Y / total) * 100) : 0);
      console.log(successPercentage)
      setFailurePercentage(total > 0 ? 100 - Math.round((data.success_rate.Y / total) * 100) : 0);
    }
  }, [data]);
  return (
    <Card sx={{ 
      // width: 300,
     borderRadius: "12px", p: 2, border: '1px solid #c5c4ca ',
     boxShadow: '0px 4px 4px 0px #00000040', }}>
      <CardContent>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" fontWeight={600}>
            Success Rate
          </Typography>
          <Typography variant="body2" color="primary" fontWeight={600}>
            {/* Avg <span style={{ color: "#6937C6" }}>6.3</span> */}
          </Typography>
        </Box>
 
        {/* Progress Bar */}
        <LinearProgress
          variant="determinate"
          value={successPercentage} // Success percentage
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
            {successPercentage}%
            </Typography>
          </Box>
          <Typography fontSize="1.2rem" fontWeight={700} color="#6937C6">
          {data?.success_rate.Y ?? 0}
          </Typography>
 
          {/* Unsuccessful Chats */}
          <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
            <Box display="flex" alignItems="center">
              <CircleIcon sx={{ color: "#46C5E0", fontSize: 12, mr: 1 }} />
              <Typography fontSize="0.85rem">Chat Not Successful</Typography>
            </Box>
            <Typography fontSize="0.9rem" fontWeight={600}>
            {failurePercentage}%
            </Typography>
          </Box>
          <Typography fontSize="1.2rem" fontWeight={700} color="#46C5E0">
          {data?.success_rate.N ?? 0}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
 
export default SuccessRateCard;