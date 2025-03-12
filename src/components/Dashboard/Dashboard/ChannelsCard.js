import React from "react";
import { Card, CardContent, Typography, Box, LinearProgress } from "@mui/material";
 
const ChannelsCard = () => {
  return (
    <Card sx={{ 
        // width: 320,
        height:188,
        borderRadius: "12px",
        border: '1px solid #c5c4ca ',
      boxShadow: '0px 4px 4px 0px #00000040',
        //    p: 1.5
           }}>
      <CardContent>
        {/* Header */}
        <Typography variant="subtitle1" fontWeight={600}>
          Channels
        </Typography>
 
        {/* Subheading */}
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          Voice
        </Typography>
 
        {/* Progress Bar */}
        <Box mt={1.5} display="flex" alignItems="center">
          <LinearProgress
            variant="determinate"
            value={100}
            sx={{ width: "100%", height: 8, borderRadius: 4, bgcolor: "#e0e0e0" }}
          />
        </Box>
 
        {/* Conversations Count */}
        <Box display="flex" justifyContent="space-between" mt={1}>
          <Typography variant="body2" color="text.secondary">
            Conversations
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            6,700
          </Typography>
        </Box>
 
        {/* Description */}
        <Typography variant="caption" color="text.secondary" mt={1} display="block">
          There are 6,700 total conversations and all of them are based on the voice channel.
        </Typography>
      </CardContent>
    </Card>
  );
};
 
export default ChannelsCard;