import React,{useEffect, useState} from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
 
 
const DashboardStats = ({ data }) => {
  const [totalConversations,setTotalConversations] = useState('');
  const [stats, setStats] = useState([
    { label: "Average Sentiment", value: 6.3, color: "#673AB7" ,max: 100,labelName: 'avg_sentiment'},
    { label: "Average Frustration", value: 3.0, color: "#03A9F4" ,max: 100,labelName: 'avg_frustration'},
    { label: "Average Messages", value: 9.0, color: "#9575CD" ,max: 100,labelName: 'avg_messages'},
    { label: "Average Duration", value: 81.12, color: "#03A9F4" ,max: 100,labelName: 'avg_duration'}

    // { label: "Average Duration", value: 6.0, color: "#3A4B6F" ,labelName: 'avg_duration'},
  ]

  )
  useEffect(() => {
    GetDetails();
    GetAverageValues();
  },[]);
  const GetAverageValues = () => {
    if (data.key_metrics !== undefined) {
      setStats((prevStats) =>
                prevStats.map((item) => ({
                  ...item,
                  value: data.key_metrics[item.labelName] ?? item.value, // Update if key exists, else keep old value
                }))
              );
    }
  
  }
  const GetDetails = () => {
    const username = localStorage.getItem('apiUser');
    const password =localStorage.getItem('apiPass');
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
      setTotalConversations(result.total);
      localStorage.setItem("totalConv", result.total);
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
      <Typography variant="subtitle1" 
      style={{ 
        fontWeight:600,
    fontSize:14,
    letterSpacing:0.5,
    color: '#616163',
    fontFamily: "Instrument Sans,sans-serif",
  }} 
    gutterBottom>
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
              value={Math.min(100, (stat.value / stat.max) * 100)} // Ensure value stays in 0-100 range
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