import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "Anonymous Users", value: 1400, color: "#21B6EC" },
  { name: "Users", value: 3980, color: "#B2A5D5" },
  { name: "Amelia", value: 6700, color: "#6937C6" },
];

const MessagesCard = () => {
  return (
    <Card
      sx={{
        width: 300,
        borderRadius: 3,
        boxShadow: 3,
        textAlign: "center",
        p: 2,
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight={600} color="#4F2580" mb={2}>
          Messages
        </Typography>

        {/* Pie Chart */}
        <Box display="flex" justifyContent="center">
          <PieChart width={180} height={180}>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={60}
              innerRadius={30}
              label={({ name, value }) => `${value}`}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </Box>

        {/* Legend */}
        <Box>
          {data.map((entry, index) => (
            <Typography
              key={index}
              fontSize="0.85rem"
              color="textSecondary"
              mb={0.5}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 12,
                  height: 12,
                  backgroundColor: entry.color,
                  marginRight: 6,
                  borderRadius: 2,
                }}
              ></span>
              {entry.name}
            </Typography>
          ))}
        </Box>

        {/* Total Messages */}
        <Typography variant="h5" fontWeight={700} color="#6937C6" mt={2}>
          10,4520
        </Typography>
        <Typography fontSize="0.9rem" color="textSecondary">
          Total Messages
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MessagesCard;
