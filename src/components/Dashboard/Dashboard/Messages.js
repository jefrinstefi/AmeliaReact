import React, {useEffect,useState} from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { PieChart, Pie, Cell } from "recharts";
import "./Messages.css"
 


 
 
const DonutChart = (message) => {
  const [dataValue, setDataValue] = useState([
    // { name: "Anonymous Users", value: 1400, color: "#27B3C5",itemName:"" },
    { name: "Users", value: 3980, color: "#03A9F4" ,itemName:"totalAmeliaMessages"},
    { name: "Amelia", value: 6700, color: "#5D3FD3",itemName:"totalUserMessages" },
  ]);
  const totalMessages = dataValue.reduce((acc, item) => acc + item.value, 0);

  const [avgMsg, setAvgMsg] = useState('');
      useEffect(() => {
        // getAvgDetails();
        ValueCalculation();
      },[]);
      const getAvgDetails = () => {
        
    // if (data.key_metrics !== undefined ) {
    //   setAvgMsg(data.key_metrics.avg_messages);
    // }
      }

      const ValueCalculation = () => {
        console.log(message);
        const totals = message.data.reduce((acc, obj) => {

          acc.totalDuration += obj.Duration_Seconds;
          
          acc.totalAmeliaMessages += obj.Amelia_Messages_Count;
          acc.totalUserMessages += obj.User_Messages_Count;
          if (obj.Sentiment_Score >= 7.5) {
            acc.sentimentdata.good++;
          } else if (obj.Sentiment_Score < 7.5 && obj.Sentiment_Score >= 5) {
            acc.sentimentdata.average++;
          } else if (obj.Sentiment_Score < 5 && obj.Sentiment_Score >= 2.5) {
            acc.sentimentdata.needToImprove++;
          } else {
            acc.sentimentdata.bad++;
          }
          return acc;
        }, { 
          totalDuration: 0, 
          totalAmeliaMessages: 0, 
          totalUserMessages: 0, 
          sentimentdata: { bad: 0, needToImprove: 0, average: 0, good: 0 }
        });
         
        console.log("total",totals);
      setAvgMsg(totals.totalAmeliaMessages+totals.totalUserMessages)
       dataValue.map((item) => {
        if(item.name === 'Amelia') {
          item.value = totals.totalAmeliaMessages
        } else if(item.name === 'Users') {
          item.value = totals.totalUserMessages
        }
       }
        // item.name === 'Amelia' ? { ...item, value: totals.totalAmeliaMessages } : item
      );
      console.log(dataValue)
      }
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
       
       
      // }}
    >
      <Card className="MessageCard">
        <CardContent>
          <Typography className="message-title">Messages</Typography>
 {/* <Typography className="avg-score">
             Avg <strong> {avgMsg}</strong>
 </Typography> */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Box sx={{ width: 150, height: 130 }}>
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