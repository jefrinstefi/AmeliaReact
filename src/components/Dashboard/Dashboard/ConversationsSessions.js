import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
 
const stats = [
  { label: "Average Sentiment", value: 6.3, color: "#673AB7" },
  { label: "Average Frustration", value: 3.0, color: "#03A9F4" },
  { label: "Average Messages", value: 9.0, color: "#9575CD" },
  { label: "Average Duration", value: 6.0, color: "#303F9F" },
];
 
const DashboardStats = () => {
  return (
    <Box sx={{
      p: 2,
      borderRadius: '12px',
      border: '1px solid #c5c4ca ',
      boxShadow: '0px 4px 4px 0px #00000040',
      backgroundColor: "#fff",
      maxWidth: 320,
      minWidth: 280,
      height:339
    }}>
      <Typography variant="subtitle1" fontWeight={500} color="#666" gutterBottom>
        Conversations / Sessions
      </Typography>
      <Typography variant="h3" fontWeight={700} color="#673AB7">
        120
      </Typography>
      <Typography variant="body2" color="#666" mb={1}>
        Total Conversations
      </Typography>
 
      {stats.map((stat, index) => (
        <Box key={index} sx={{ mb: 1 }}>
          <Typography variant="body2" color="#666" mb={0.5}>
            {stat.label}
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <LinearProgress
              variant="determinate"
              value={(stat.value / 10) * 100}
              sx={{
                flex: 1,
                height: 8,
                borderRadius: 5,
                backgroundColor: "#E0E0E0",
                '& .MuiLinearProgress-bar': {
                  backgroundColor: stat.color,
                },
              }}
            />
            <Typography variant="body1" fontWeight={600}>
              {stat.value}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
 
export default DashboardStats;