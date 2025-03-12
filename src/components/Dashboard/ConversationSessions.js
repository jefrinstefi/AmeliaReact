import React from "react";
import "./ConversationSessions.css"; // Import CSS
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
} from "@mui/material";
 
const conversationCard = () => {
  return (
<div>
<Card className="conversation-card">
<CardContent>
          {/* Title */}
<Typography variant="subtitle1" className="card-heading">
            Conversations / Sessions
</Typography>
 
          {/* Total Conversations */}
<Typography variant="h3" className="total-number">
            120
</Typography>
<Typography variant="body2" className="total-label">
            Total Conversations
</Typography>
 
          {/* Average Sentiment */}
<Box className="metric">
<Typography
              variant="body2"
              className="metric-label sentiment-label"
>
              Average Sentiment
</Typography>
<Box className="progress-container">
<LinearProgress
                variant="determinate"
                value={63}
                className="progress sentiment-progress"
              />
<Typography variant="body2" className="metric-value ">
                6.3
</Typography>
</Box>
</Box>
 
          {/* Average Frustration */}
<Box className="metric">
<Typography variant="body2" className="sentiment-label">
              Average Frustration
</Typography>
<Box className="progress-container">
<LinearProgress
                variant="determinate"
                value={30}
                className="progress frustration"
              />
<Typography variant="body2" className="metric-value">
                3.0
</Typography>
</Box>
</Box>
 
          {/* Average Messages */}
<Box className="metric">
<Typography variant="body2" className="sentiment-label">
              Average Messages
</Typography>
<Box className="progress-container">
<LinearProgress
                variant="determinate"
                value={90}
                className="progress messages"
              />
<Typography variant="body2" className="metric-value">
                9.0
</Typography>
</Box>
</Box>
 
          {/* Average Duration */}
<Box className="metric">
<Typography variant="body2" className="sentiment-label">
              Average Duration
</Typography>
<Box className="progress-container">
<LinearProgress
                variant="determinate"
                value={60}
                className="progress duration"
              />
<Typography variant="body2" className="metric-value">
                6.0
</Typography>
</Box>
</Box>
</CardContent>
</Card>
</div>
  );
};
export default conversationCard;