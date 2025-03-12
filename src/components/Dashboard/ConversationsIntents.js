import React from "react";
import './ConversationIntents.css'; // Import CSS
import { Card, Typography, Grid } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Label,
  LabelList,
  Cell,
} from "recharts";
 
const data = [
  { name: "Service", value: 590 },
  { name: "Greeting", value: 200 },
  { name: "Information", value: 850 },
  { name: "Transaction", value: 700 },
  { name: "Navigation", value: 450 },
];
 
// individual bar colors
const barColors = ["#968BB3", "#6BE0FF", "#605192", "#27BBE2", "#BAB2D0"];
 
const ConversationIntents = () => {
  return (
<Card className="card">
<Typography variant="h6" gutterBottom className="card-title">
        Conversation Intents
</Typography>
 
      <ResponsiveContainer className="chart-container">
<BarChart
          data={data}
          barSize={40} // Reduced bar width
          margin={{ top: 20, right: 50, left: 50, bottom: 50 }}
>
<CartesianGrid strokeDasharray="3 3" />
 
          <XAxis dataKey="name" interval={0} tick={{ fontSize: 12 }}>
<Label
              value="Intent Types"
              offset={-10}
              position="insideBottom"
            />
</XAxis>
 
         
<YAxis>
<Label
              value="Number of Conversations"
              angle={-90} // Keep vertical rotation
              position="insideLeft" // Inside the Y-axis
              dx={-20} // Moves the text left or right (negative = left, positive = right)
              dy={93} // Moves the text downward
              className="y-axis-label"
            />
</YAxis>
 
          {/* Bars with Individual Colors */}
<Bar dataKey="value">
            {data.map((entry, index) => (
<Cell key={`cell-${index}`} fill={barColors[index]} />
            ))}
<LabelList dataKey="value" position="top" />
</Bar>
</BarChart>
</ResponsiveContainer>
 
      {/* Bottom section for Total Conversations & Intent Types */}
<Grid container spacing={2} mt={2} justifyContent="space-between">
<Grid item>
<div className="info-box">
<Typography variant="h6" className="total-conversations">
              120
</Typography>
<Typography variant="body2" className="total-conversations-text">
              Total Conversations
</Typography>
</div>
</Grid>
<Grid item>
<div className="info-box">
<Typography variant="h6" className="intent-types">
              05
</Typography>
<Typography variant="body2" className="total-conversations-text">
              Intent Types
</Typography>
</div>
</Grid>
</Grid>
</Card>
  );
};
 
export default ConversationIntents;