import React, {useEffect,useState} from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { PieChart, Pie, Cell } from "recharts";
import "./Messages.css"
 
const dataValue = [
  { name: "Anonymous Users", value: 1400, color: "#27B3C5" },
  { name: "Users", value: 3980, color: "#C5B3D9" },
  { name: "Amelia", value: 6700, color: "#5D3FD3" },
];

 
const totalMessages = dataValue.reduce((acc, item) => acc + item.value, 0);
 
const DonutChart = ({data}) => {
  const [avgMsg, setAvgMsg] = useState('');
      useEffect(() => {
        getAvgDetails();
      },[data]);
      const getAvgDetails = () => {
    if (data.key_metrics !== undefined ) {
      setAvgMsg(data.key_metrics.avg_messages);
    }
      }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "16px",
        paddingLeft:15,
        paddingRight:15,
        position: "relative",
       
       
      }}
    >
      <Card className="MessageCard">
        <CardContent>
          <Typography className="message-title">Messages</Typography>
 {/* <Typography className="avg-score">
             Avg <strong> {avgMsg}</strong>
 </Typography> */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Box sx={{ width: 150, height: 150 }}>
              <PieChart width={150} height={150}>
                <Pie
                  data={dataValue}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={70}
                  dataKey="value"
                  label={false}
                >
                  {dataValue.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </Box>
 
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {dataValue.map((item, index) => (
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
          <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
          <Typography
          sx={{ fontSize: "24px", fontWeight: "bold", color: "#5D3FD3" }}
        >
          {totalMessages.toLocaleString()}
        </Typography>
        <Typography sx={{ color: "#888", fontSize: "14px",paddingLeft:2 }}>
          Total Messages
        </Typography>
        </div>
        </CardContent>
    
      </Card>
 
      {/* <Box
        sx={{
          width: "275px",
          // height: "65px",
          position: "absolute",
          bottom: -20,
          left: "50%",
          transform: "translateX(-50%)",
          
         
          borderRadius: '12px',
          boxShadow: '0px 4px 4px 0px #00000040 ',
          p: 1,
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