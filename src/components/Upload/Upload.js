import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card, CardContent, Typography, Box } from "@mui/material";

const data = [
  { name: "Service", value: 590, color: "#5C469C" },
  { name: "Greeting", value: 200, color: "#38BDF8" },
  { name: "Information", value: 850, color: "#A495C9" },
  { name: "Transaction", value: 700, color: "#5C469C" },
  { name: "Navigation", value: 450, color: "#38BDF8" },
];

const ConversationIntents = () => {
  return (
    <Card
      sx={{
        borderRadius: "10px",
        padding: "16px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        maxWidth: "600px", // Adjusted width
        margin: "auto",
        border: "1px solid #D6E4F0",
      }}
    >
      <CardContent>
        {/* Title */}
        <Typography variant="h6" fontWeight={600} mb={2} sx={{ color: "#4A4A4A", fontSize: "18px" }}>
          Conversation Intents
        </Typography>

        {/* Chart Container */}
        <Box display="flex" alignItems="center">
          {/* Y-Axis Label */}
          <Typography
            variant="body2"
            sx={{
              transform: "rotate(-90deg)",
              whiteSpace: "nowrap",
              fontSize: "14px",
              fontWeight: 500,
              color: "#4A4A4A",
              mr: -1, // Reduced left margin
            }}
          >
            Number of Conversations
          </Typography>

          {/* Bar Chart */}
          <ResponsiveContainer width="85%" height={230}>
            <BarChart data={data} barSize={40}> {/* Ensuring single bar per category */}
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <YAxis
                width={40} // Reduced Y-Axis width
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#4A4A4A" }}
                domain={[0, 1000]}
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: "#4A4A4A" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip />
              <Bar dataKey="value" fill="#5C469C" radius={[5, 5, 0, 0]} /> {/* Single Bar for Each */}
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Statistics (Below Chart) */}
        <Box display="flex" justifyContent="space-between" mt={2} px={3}>
          <Box textAlign="center">
            <Typography variant="h6" fontWeight={700} color="black" fontSize="20px">
              120
            </Typography>
            <Typography variant="body2" color="textSecondary" fontSize="14px">
              Total Conversations
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="h6" fontWeight={700} color="black" fontSize="20px">
              05
            </Typography>
            <Typography variant="body2" color="textSecondary" fontSize="14px">
              Intent Types
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ConversationIntents;
