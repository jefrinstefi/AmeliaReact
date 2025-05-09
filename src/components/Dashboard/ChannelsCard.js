import React ,{useEffect,useState}from "react";
import { Card, CardContent, Typography, Box, LinearProgress } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

const ChannelsCard = ({data}) => {
   const [successPercentage, setSuccessPercentage] = useState(0);
    const [failurePercentage, setFailurePercentage] = useState(0);
  const [channel, setChannel] = useState('');
        useEffect(() => {
          getAvgDetails();
        },[data]);
        const getAvgDetails = () => {
      if (data.channel_distribution !== undefined ) {
        const total = Object.values(data.channel_distribution).reduce((acc, value) => acc + value, 0);
        setChannel(total);
        setSuccessPercentage(total > 0 ? Math.round((data.channel_distribution.webchat_coreuser/ total) * 100) : 0);
        console.log(successPercentage)
        setFailurePercentage(total > 0 ? 100 - Math.round((data.channel_distribution.webchat_coremind/ total) * 100) : 0);

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
        <div style={{display:"flex",justifyContent:"space-between"}}>

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
        <Typography variant="body1" fontWeight={600}>
        {channel}      
        </Typography>
        </div>

        {/* Subheading */}
        {/* <Typography variant="body2" color="text.secondary" mt={1.5}>
          Voice
        </Typography> */}
 
        {/* Progress Bar */}
        <Box mt={1.5} display="flex" alignItems="center">
          <LinearProgress
            variant="determinate"
            value={successPercentage}
            sx={{ width: "100%", height: 8, borderRadius: 4,   backgroundColor: "#46C5E0",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#6937C6", // Change this to your desired color
              }, }}
          />
        </Box>
 
        {/* Conversations Count */}
        <Box display="flex" justifyContent="space-between" mt={2}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <CircleIcon sx={{ color: "#6937C6", fontSize: 12, mr: 1 }} />
              <Typography fontSize="0.85rem">{data?.channel_distribution.webchat_coreuser}  Webchat_coreuser</Typography>
            </Box>
            
          </Box>
{/*           
         
          <Typography variant="body1" fontWeight={600}>
{channel}          </Typography> */}
        </Box>
        <Box display="flex" justifyContent="space-between" mt={2}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <CircleIcon sx={{ color: "#46C5E0", fontSize: 12, mr: 1 }} />
              <Typography fontSize="0.85rem">{data?.channel_distribution.webchat_coremind}  Webchat_coremind</Typography>
            </Box>
            
          </Box>
          
         
       
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