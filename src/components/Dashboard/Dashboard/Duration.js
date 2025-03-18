import React ,{useEffect,useState} from "react";
import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
 
const DurationCard = (message) => {
  const [avgSession, setAvgSession] = useState('');
  const [TotalSession, setTotalSession] = useState('');

  const totalConversations = localStorage.getItem("totalConv")
  console.log(totalConversations);
  useEffect(() => {
    getDuration();
  },[]);
  const getDuration = () => {
    console.log(message);
    if (message.Avg.key_metrics !== undefined ) {
      setAvgSession(message.Avg.key_metrics.avg_duration);
    }   
    
    const totals = message.data.reduce((acc, obj) => {
      acc.totalDuration += obj.Duration_Seconds;
            acc.totalAmeliaMessages += obj.Amelia_Messages_Count;
      acc.totalUserMessages += obj.User_Messages_Count;
      if (obj.Sentiment_Score >= 7.5) {
        acc.sentimentdata.good++;
      } else if (obj.Sentiment_Score < 7.5 && obj.Sentiment_Score >= 5) {
        acc.sentimentdata.average++;
      } else if (obj.Sentiment_Score < 5 && obj.Sentiment_Score >= 2.5) {
        acc.sentimentdata.needToImprove++;
      } else {
        acc.sentimentdata.bad++;
      }
      return acc;
    }, { 
      totalDuration: 0, 
      totalAmeliaMessages: 0, 
      totalUserMessages: 0, 
      sentimentdata: { bad: 0, needToImprove: 0, average: 0, good: 0 }
    });
     
    console.log("total",totals);
     setTotalSession(totals.totalDuration)
  }
  return (
    <Card
      sx={{
        // width: 300,
        borderRadius: "12px",
        border: '1px solid #c5c4ca ',
      boxShadow: '0px 4px 4px 0px #00000040',
        // p: 1,
      }}
    >
      <CardContent>
        {/* Title with Icon */}
        <Box display="flex" mb={2}>
          <AccessTimeIcon sx={{ color: "#4F2580", mr: 1 }} />
          <Typography variant="subtitle1" 
           style={{ 
        fontWeight:600,
    fontSize:14,
    letterSpacing:0.5,
    color: '#616163',
    fontFamily: "Instrument Sans,sans-serif",
  }}>
            Duration (In Milliseconds)
          </Typography>
        </Box>
 
        {/* Data Section */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box textAlign="center">
            <Typography fontSize="0.85rem" color="textSecondary">
              Total Session Duration
            </Typography>
            <Typography variant="h5" fontWeight={700} color="#6937C6">
{TotalSession}            </Typography>
          </Box>
 
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
 
          <Box textAlign="center">
            <Typography fontSize="0.85rem" color="textSecondary">
              Average Session Time
            </Typography>
            <Typography variant="h6" fontWeight={700} color="#6937C6">
{avgSession}      
      </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
 
export default DurationCard;