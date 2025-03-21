import React, { useEffect, useState } from "react";
import './ConverationIntents.css'; // Import CSS
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



// individual bar colors
const barColors = ["#968BB3", "#03A9F4", "#605192", "#27BBE2", "#BAB2D0"];
const getRandomColor = () => {
  return barColors[Math.floor(Math.random() * barColors.length)];
};
const ConversationIntents = ({ data }) => {
  const totalConversations = localStorage.getItem("totalConv")
  console.log(totalConversations);
  // const [dataIntent, setDataIntent] = useState([
  //   { name: "Information", value: 850, labelName: 'information',color: getRandomColor() },
  //   { name: "Service", value: 590, labelName: 'service',color: getRandomColor() },
  //   { name: "Others", value: 200, labelName: 'other',color: getRandomColor() }

  // ]);
  const [dataIntent, setDataIntent]  = useState([])

  useEffect(() => {
    if (data.intent_distribution) {
      const intentsArray = Object.entries(data.intent_distribution).map(
        ([key, value]) => ({
          name: key.charAt(0).toUpperCase() + key.slice(1),
          value: value,
          color: barColors[Math.floor(Math.random() * barColors.length)],
        })
      );
      setDataIntent(intentsArray);
    }
  }, [data]);

  const GetIntentDetails = () => {
    if (data.intent_distribution !== undefined) {
      setDataIntent((prevStats) =>
        prevStats.map((item) => ({
          ...item,
          value: data.intent_distribution[item.labelName] ?? item.value, 
          color: getRandomColor(),// Update if key exists, else keep old value
        }))
      );
    }

  }
  return (
    <Card className="card">
      <Typography variant="h6" gutterBottom className="card-title">
        Conversation Intents
      </Typography>

      <ResponsiveContainer className="chart-container">
        <BarChart
          data={dataIntent}
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
            {dataIntent.map((entry, index) => (
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
              {totalConversations}
            </Typography>
            <Typography variant="body2" className="total-conversations-text">
              Total Conversations
            </Typography>
          </div>
        </Grid>
        <Grid item>
          <div className="info-box">
            <Typography variant="h6" className="intent-types">
              03
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