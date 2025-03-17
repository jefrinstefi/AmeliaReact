import React ,{useEffect,useState}from "react";
import { Card, CardContent, Typography, Box, LinearProgress } from "@mui/material";
 
const ChannelsCard = ({data}) => {
  const [channel, setChannel] = useState('');
        useEffect(() => {
          getAvgDetails();
        },[data]);
        const getAvgDetails = () => {
      if (data.channel_distribution !== undefined ) {
        setChannel(data.channel_distribution.voice);
      }
        }
  return (
    <Card sx={{ 
        // width: 320,
        height:244,
        borderRadius: "12px",
        border: '1px solid #c5c4ca ',
      boxShadow: '0px 4px 4px 0px #00000040',
        //    p: 1.5
           }}>
      <CardContent>
        {/* Header */}
        <Typography variant="subtitle1"  
        style={{ 
        fontWeight:600,
    fontSize:14,
    letterSpacing:0.5,
    color: '#616163',
    fontFamily: "Instrument Sans,sans-serif",
  }}>
          Channels
        </Typography>
 
        {/* Subheading */}
        <Typography variant="body2" color="text.secondary" mt={1.5}>
          Voice
        </Typography>
 
        {/* Progress Bar */}
        <Box mt={1.5} display="flex" alignItems="center">
          <LinearProgress
            variant="determinate"
            value={100}
            sx={{ width: "100%", height: 8, borderRadius: 4,  bgcolor: "#e0e0e0",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#6937C6", // Change this to your desired color
              }, }}
          />
        </Box>
 
        {/* Conversations Count */}
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography variant="body2" color="text.secondary">
            Conversations
          </Typography>
          <Typography variant="body1" fontWeight={600}>
{channel}          </Typography>
        </Box>
 
        {/* Description */}
        <Typography variant="caption" color="text.secondary" mt={3} display="block" fontSize={15}>
          There are { channel} total conversations and all of them are based on the voice channel.
        </Typography>
      </CardContent>
    </Card>
  );
};
 
export default ChannelsCard;