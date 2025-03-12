import React,{useEffect, useState} from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
 
 
const DashboardStats = () => {
  const [totalConversations,setTotalConversations] = useState('');
  const [stats, setStats] = useState([
    { label: "Average Sentiment", value: 6.3, color: "#673AB7" ,labelName: 'avg_sentiment'},
    { label: "Average Frustration", value: 3.0, color: "#03A9F4" ,labelName: 'avg_frustration'},
    { label: "Average Messages", value: 9.0, color: "#9575CD" ,labelName: 'avg_messages'},
    { label: "Average Duration", value: 6.0, color: "#303F9F" ,labelName: 'avg_duration'},
  ]

  )
  useEffect(() => {
    GetDetails();
    GetAverageValues();
  });
  const GetAverageValues = () => {
    const username = "admin";
    const password = "password";
    const credentials = btoa(`${username}:${password}`);
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: "Basic " + credentials, // Base64 encoded username:password
      Accept: "application/json"
    },
  };
  // http://44.246.164.250:8502/analytics-overview

  fetch("http://44.246.164.250:8502/analytics-overview", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log('result',result);
      localStorage.setItem("successrate", result.success_rate); // Store in localStorage
      // setUsername(result);
      if (result.key_metrics !== undefined) {
        console.log(result.key_metrics);
        setStats((prevStats) =>
          prevStats.map((item) => ({
            ...item,
            value: result.key_metrics[item.labelName] ?? item.value, // Update if key exists, else keep old value
          }))
        );
      }
    })
    .catch((error) => console.error(error));
  }
  const GetDetails = () => {
    const username = "admin";
    const password = "password";
    const credentials = btoa(`${username}:${password}`);
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: "Basic " + credentials, // Base64 encoded username:password
      Accept: "application/json"
    },
  };

  fetch("http://44.246.164.250:8502/conversations", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log('result',result);
      setTotalConversations(result.total)
      if (result.status === "success") {
        // navigate('/dashboard');
      }
    })
    .catch((error) => console.error(error));
  
    };
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
        {totalConversations}
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