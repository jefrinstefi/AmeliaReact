import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Partially Resolved", value: 1400, color: "#46C5E0" },
  { name: "Not Resolved", value: 3980, color: "#6937C6" },
  { name: "Resolved", value: 6700, color: "#B8A3D8" },
];

const ResolutionRateCard = () => {
  return (
    <Card sx={{ width: 320, borderRadius: 3, boxShadow: 3, p: 2 }}>
      <CardContent>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" fontWeight={600}>
            Resolution Rate
          </Typography>
          <Typography variant="body2" color="primary" fontWeight={600}>
            Avg <span style={{ color: "#6937C6" }}>7.7</span>
          </Typography>
        </Box>

        {/* Pie Chart */}
        <ResponsiveContainer width="100%" height={150}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={55}
              dataKey="value"
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Labels */}
        <Box mt={1}>
          {data.map((item, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center">
                <Typography fontSize="1rem" fontWeight={600} color={item.color}>
                  {item.value}
                </Typography>
                <Typography fontSize="0.85rem" ml={1}>
                  {item.name}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ResolutionRateCard;
