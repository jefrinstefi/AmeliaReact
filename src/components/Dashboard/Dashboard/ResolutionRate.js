import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { PieChart, Pie, Cell } from "recharts";
import "./ResolutionRate.css"
 
const data = [
  { name: "Anonymous Users", value: 1400, color: "#27B3C5" },
  { name: "Users", value: 3980, color: "#C5B3D9" },
  { name: "Amelia", value: 6700, color: "#5D3FD3" },
];
 
// const totalMessages = data.reduce((acc, item) => acc + item.value, 0);
 
const DonutChart = () => {
  return (
    <Box
      // sx={{
      //   display: "flex",
      //   flexDirection: "column",
      //   alignItems: "center",
      //   borderRadius: "16px",
      //   paddingLeft:15,
      //   paddingRight:15,
      //   position: "relative",
      //   backgroundColor:'#a1a1a1'
       
      // }}
    >
      <Card className="MessageCard">
        <CardContent>
          <Typography className="message-title">Resolution Rate</Typography>
 
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Box sx={{ width: 150, height: 150 }}>
              <PieChart width={150} height={150}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={70}
                  dataKey="value"
                  label={false}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </Box>
 
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {data.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      backgroundColor: item.color,
                      borderRadius: "50%",
                    }}
                  />
                  <Typography  sx={{ fontWeight: "bold" }} className="labelValue">
                    {item.value.toLocaleString()}
                  </Typography>
                  <Typography sx={{ color: "#777", fontSize: "12px" }}>
                    {item.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>
 
      {/* <Box
        sx={{
          width: "275px",
          height: "65px",
          position: "absolute",
          bottom: -25,
          left: "50%",
          transform: "translateX(-50%)",
          borderRadius: 3,
          boxShadow: 3,
          p: 2,
          textAlign: "center",
          zIndex: 1,
          background: "#fff",
        }}
      >
        <Typography
          sx={{ fontSize: "24px", fontWeight: "bold", color: "#5D3FD3" }}
        >
          {totalMessages.toLocaleString()}
        </Typography>
        <Typography sx={{ color: "#888", fontSize: "14px" }}>
          Total Messages
        </Typography>
      </Box> */}
    </Box>
  );
};
 
export default DonutChart;