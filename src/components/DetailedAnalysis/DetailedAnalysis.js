import React, { useState, useEffect } from "react";
import { AppBar, Tabs, Tab, Box, Typography, Paper, Button, MenuItem, Select, Grid, Divider, Avatar, Stack,Breadcrumbs } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import PersonIcon from "@mui/icons-material/Person";
import flowdiagram from '../../assets/flowdiagramimage.png';
import companyLogo from "../../assets/logo 1.png" // Company logo
import Acouser from "../../assets/Account circle.png";
import { useNavigate, useLocation, Navigate ,Link} from 'react-router-dom';
// import { Link, useLocation, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
// import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SmartToyIcon from "@mui/icons-material/SmartToy";

function TabPanel({ children, value, index }) {
  return <div hidden={value !== index}>{value === index && <Box p={2}>{children}</Box>}</div>;
}

// const data = [
//   { sequence: 1, sentimentScore1: 0.5, sentimentScore2: 0.3 },
//   { sequence: 2, sentimentScore1: 1, sentimentScore2: 0.6 },
//   { sequence: 3, sentimentScore1: 0, sentimentScore2: -0.2 },
//   { sequence: 4, sentimentScore1: 2, sentimentScore2: 1.5 },
//   { sequence: 5, sentimentScore1: 1, sentimentScore2: 0.8 },
//   { sequence: 6, sentimentScore1: 0, sentimentScore2: -0.1 },
//   { sequence: 7, sentimentScore1: 1, sentimentScore2: 0.4 },
//   { sequence: 8, sentimentScore1: 2, sentimentScore2: 1.2 },
// ];

// const messages = [
//     { speaker: 1, speaker: "user", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt" },
//     { speaker: 2, speaker: "bot", text: "Hi am Amelia your celebrity center visionwork assistaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. nt. " },
//     { speaker: 3, speaker: "user", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
//     { speaker: 4, speaker: "bot", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
//     { speaker: 5, speaker: "user", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ulla." },
//     { speaker: 6, speaker: "bot", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit" },
//     { speaker: 7, speaker: "user", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ulla." },
//     { speaker: 7, speaker: "bot", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit" }
//   ];

export default function ConversationAnalysis() {
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedConversation, setSelectedConversation] = useState("");
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  const message = location.state?.message || "No data Received";
  const conversationDetails = location.state?.selectedConversationDetails || "No Data";
  const convList = location.state?.ConversationList || 'NO Data'
  const [conversationList,setConversationList] = useState([]); 
  const [data,setSentimentAnalysisData] = useState([]);
  const [avgSentiment,setavgSentiment] = useState('')
  const [loading, setLoading] = useState(false); // Handle loading state
  const [metricsData, setMetricsData] = useState({duration: 0});
  const [metaData, setMetadata] = useState('')
  const [summaryData,setSummaryData] = useState('')
  const [sentimentLoaded, setSentimentLoaded] = useState(false);
  const [apiResponse,setAPIRESPONSE] = useState("");
  const FullConversationList = location.state?.FullData|| 'NO Data';
    const navigate = useNavigate();
  
  // const [FullData,setFullDAta]
  // const [ConvList,setConvList] = useState([]);
  useEffect(() => {
    // setLoading(true);
    if(message){
    setMessages(message.transcript);
    setSelectedConversation(message.conversation_id);
    setSentimentAnalysisData(message.sentiment_analysis.data);
    setavgSentiment(message.sentiment_analysis.avg_sentiment.toFixed(2));
    setMetricsData(message.metrics || {});
    setMetadata(message.meta || {});
    setSummaryData(message.summary);
    setAPIRESPONSE(message);
    setConversationList(convList);
    // setConvList(conversationList);
    console.log('messages', message);
    console.log('List',conversationList);
    console.log('Download',FullConversationList)
    setSentimentLoaded(true)
    // setLoading(false);
    }
  }, [message]);
  const CustomTooltip = ({payload }) => {
     if (sentimentLoaded &&payload.length) {
      const { message_id, sentiment } = payload[0].payload; // Extract values dynamically

      return (
  <div style={{ background: "#968BB3", padding: "10px 16px", borderRadius: "5px" }}>

  <p style={{ color:"#fff" ,margin:"0"}}>{`Msg_id : ${message_id}`}</p>
  <p style={{ color: "#fff" ,margin:"0"}}>{`Sentiment : ${sentiment}`}</p>
  </div>
      );
     }
    return null;
  };
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };
  const storedUser = localStorage.getItem("username")
  console.log(storedUser);

  const handleLogout = () => {
    console.log('data')
    localStorage.clear();  // Clears all stored data
    sessionStorage.clear(); // Clears session storage (optional)
    Navigate("/login"); // Redirect to login page (update path as needed)
  };
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; // Handle missing values
    const date = new Date(dateString);
    return date.toLocaleString("en-US", { 
      year: "numeric", 
      month: "2-digit", 
      day: "2-digit", 
      hour: "2-digit", 
      minute: "2-digit", 
      second: "2-digit",
      hour12: false // 24-hour format
    }).replace(",", "");
  };
  const formatDatefromUnix = (datestring) => {
    const date = new Date(datestring * 1000);
    // return date.toISOString()
    return date.toLocaleString("en-US", { 
      year: "numeric", 
      month: "2-digit", 
      day: "2-digit", 
      hour: "2-digit", 
      minute: "2-digit", 
      hour12: false // 24-hour format
    }).replace(",", "");
  }
  const formatYesNo = (value) => {
    return value === "Y" ? "Yes" : value === "N" ? "No" : "No"; // Default fallback
  };
  const formatTrueFalse = (value) => {
    return value === "true" ? "Yes" : value === "false" ? "No" : "No"; // Default fallback
  };
  const CapitalizeText = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };
  const handleConversationChange = (event) => {
    setSelectedConversation(event.target.value);
    handleRowClick(event.target.value);

  }
  const handleRowClick = (row) => {
    setLoading(true);
    const username = "admin";
    const password = "password";
    const credentials = btoa(`${username}:${password}`);
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Basic " + credentials, // Base64 encoded username:password
        Accept: "application/json"
      },
    };

    fetch("https://ameliaapp.sincera.net/api/conversation-details/" + row, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log('result', result);
        if (result.detail === undefined) {
          setMessages(result.transcript);
          setSelectedConversation(result.conversation_id);
          setSentimentAnalysisData(result.sentiment_analysis.data);
          setMetricsData(result.metrics);
    setMetadata(result.meta);
    setSummaryData(result.summary);
    setAPIRESPONSE(result);
          setLoading(false);
        }

      })
      .catch((error) => console.error(error));

    // alert(`Clicked on Conversation ID: ${row.Conversation_ID}`);
  };
  const exportTableToExcel = () => {
      console.log('test')
      // if (!tableRef.current) return;
  
      // Convert the table to a worksheet
      // let downloadData = [{
      //    "Analysis-Date": apiResponse.Analysis_Date,
      //    "Conversation-Id":apiResponse.Conversation_ID,
      //    "Duration":apiResponse.Duration_Seconds,
      //    "Total Messages" :apiResponse.Messages_Count
      // }]
      const ws = XLSX.utils.json_to_sheet(FullConversationList);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "TableData");
  
      // Convert to buffer and save
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
      saveAs(dataBlob, "Conversation_table.xlsx");
    }
  return (
    
    <div>

      <Box sx={{ backgroundColor: '#ffffff', padding: 2.5, boxShadow: '0px 4px 4px 0px #00000050', position: 'sticky', top: 0, zIndex: 1 }}>
        <header className="headmain" >
          <div>
            <img src={companyLogo} alt="Company Logo" style={{}} />
          </div>
          {/* <Typography variant="h6" align="center" gutterBottom sx={{ color: "#5E43B2", fontWeight: 600, fontSize: 22, marginLeft:20 }}>
          Conversation Analysis and Customer Experience Scoring Tool
        </Typography> */}
          <div className="userbox" >
            <img src={Acouser} alt="user" />
            <div>
              {/* <h6 style={{border:'none',fontSize:10,fontWeight:400,color:'#2C2C2C'}}>Manager</h6> */}
              <select className="dropdowncs" onChange={(e) => {
                if (e.target.value === "Logout") {
                  handleLogout();
                }
              }}>
                <option value="">{storedUser} <br /> Manager</option>
                <option value="Logout">Logout</option>
                {/* <option value="option2">Option 2</option> */}
              </select>
            </div>
          </div>
        </header>
      </Box>
       

      <Box p={2} sx={{ margin: "auto", backgroundColor: "#F5F4F9", minHeight: "100vh", paddingX: "5%", paddingTop: 5 }}>
         <Typography variant="h6" align="center" gutterBottom sx={{ color: "#5E43B2", fontWeight: 600, fontSize: 25 }}>
                                            Conversation Analysis and Customer Experience Scoring Tool
                                          </Typography>
      <Box sx={{ marginBottom:2 }}>
                <div role="presentation" onClick={() => navigate(-1)}>
                  <Breadcrumbs aria-label="breadcrumb">
                    <Link style={{ color: "#737277", textDecoration: 'none' }} href="/">
                      Dashboard
                    </Link>
      
                    <Typography sx={{ color: '#4f2580' }}>Detailed Analysis</Typography>
                  </Breadcrumbs>
                </div>

              </Box>
       
        <div style={{}}>
          <Typography variant="body1" align="start" fontWeight="bold" mt={1} sx={{ color: "#605192", paddingBottom: 3, fontSize: 20 }}>
            Detailed Conversation Analysis
          </Typography>
        </div>

        <Paper elevation={3} sx={{ padding: 3, borderRadius: 3, margin: "auto", backgroundColor: "#fff", }}>
          <Typography variant="body1" fontWeight="small" fontSize={13}>Select a conversation for detailed analysis</Typography>
          <Grid container justifyContent="space-between" alignItems="center" mt={2}>
            <Select
              value={selectedConversation}
              onChange={handleConversationChange}
              sx={{
                minWidth: { xs: '100%', sm: 300, md: 400 }, backgroundColor: "#f8f8f8", height: 35, fontSize: "14px",
                '&:hover': { borderColor: "#4A1C9D" },
                '&.Mui-focused': { borderColor: "#4A1C9D" },
                marginBottom:3
              }}
            >
              {conversationList.map((conv) => (
    <MenuItem key={conv.conversation_id} value={conv.conversation_id}>
      {conv.conversation_id} {conv.count} 
    </MenuItem>
  ))}
            </Select>
            <Button variant="outlined" onClick={exportTableToExcel} startIcon={<DownloadIcon />} sx={{ borderColor: "#4A1C9D", color: "#4A1C9D", fontSize: "14px", fontWeight: 600 }}>
              Download All Analysis Results
            </Button>
          </Grid>

          <AppBar position="static" color="default" sx={{ mt: 3, boxShadow: "none", backgroundColor: "#fff" }}>
            <Tabs value={tabIndex} onChange={handleTabChange} indicatorColor="primary" textColor="primary"   variant="scrollable"        // Enables horizontal scroll
    scrollButtons="auto"        // Auto shows arrows on overflow
    allowScrollButtonsMobile    // Optional: forces scroll arrows on mobile
    aria-label="conversation tabs"
              sx={{ "& .MuiTabs-indicator": { backgroundColor: "#4A1C9D" } }}>
              <Tab label="Overview" sx={{ fontSize: "16px", textTransform: "none", mr: 2, fontWeight: 600, color: "#737277", "&.Mui-selected": { color: "#4A1C9D" } }} />
              <Tab label="Sentiment Analysis" sx={{ fontSize: "16px", textTransform: "none", mr: 2, fontWeight: 600, color: "#737277", "&.Mui-selected": { color: "#4A1C9D" } }} />
              <Tab label="Conversation Transcript" sx={{ fontSize: "16px", textTransform: "none", mr: 2, fontWeight: 600, color: "#737277", "&.Mui-selected": { color: "#4A1C9D" } }} />
              {/* <Tab label="Conversation Flow" sx={{ fontSize: "16px", textTransform: "none", fontWeight: 600, color: "#737277", "&.Mui-selected": { color: "#4A1C9D" } }} /> */}
            </Tabs>
          </AppBar>

          {!loading &&<TabPanel value={tabIndex} index={0}>
            {/* <Typography variant="body1" fontWeight="small" fontSize={12}>Select a conversation for detailed analysis</Typography> */}
            <Grid container justifyContent="space-between" alignItems="center" mt={2}>
              <Typography variant="body1" fontWeight="bold" fontSize={16} sx={{ color: "#3A4B6F", mb: 2 }}>Conversation Summary</Typography>

              <Typography
                variant="body1"
                fontWeight="bold"
                fontSize={14}
                sx={{ color: "#3A4B6F", mb: 2 }}
              >
                Conversation ID : <span style={{ color: "#4A1C9D", fontSize: 15 }}>{selectedConversation}</span>
              </Typography>
            </Grid>

            <Box sx={{ backgroundColor: "#FAF9FF", border: "1px solid #D1D1D1", borderRadius: 2, padding: 2 }}>
              <Grid container spacing={2} mb={4}>
                <Grid item xs={12} sm={2}><Typography variant="body2" sx={{ color: "#737277", fontSize: 13 }}><b>Date & Time</b></Typography><Typography variant="body2" sx={{ color: "#4A1C9D", fontSize: 14, fontWeight: 600 }}>{formatDate(apiResponse.Analysis_Date) || "N/A"}</Typography></Grid>
                <Grid item xs={12} sm={2}><Typography variant="body2" sx={{ color: "#737277", fontSize: 13 }}><b>Duration</b></Typography><Typography variant="body2" sx={{ color: "#4A1C9D", fontSize: 14, fontWeight: 600 }}>{metricsData.duration ? metricsData.duration.toFixed(2): 'N/A'}ms</Typography></Grid>
                <Grid item xs={12} sm={2}><Typography variant="body2" sx={{ color: "#737277", fontSize: 13 }}><b>Channel</b></Typography><Typography variant="body2" sx={{ color: "#4A1C9D", fontSize: 14, fontWeight: 600 }}>{CapitalizeText(metaData.initial_channel)|| "N/A"}</Typography></Grid>
                <Grid item xs={12} sm={2}><Typography variant="body2" sx={{ color: "#737277", fontSize: 13 }}><b>Intent</b></Typography><Typography variant="body2" sx={{ color: "#4A1C9D", fontSize: 14, fontWeight: 600 }}>{CapitalizeText(apiResponse.Intent) || "N/A"}</Typography></Grid>
                <Grid item xs={12} sm={2}><Typography variant="body2" sx={{ color: "#737277", fontSize: 13 }}><b>Resolved?</b></Typography><Typography variant="body2" sx={{ color: "#4A1C9D", fontSize: 14, fontWeight: 600 }}>{formatYesNo(apiResponse.Resolution)}</Typography></Grid>
                <Grid item xs={12} sm={2}><Typography variant="body2" sx={{ color: "#737277", fontSize: 13 }}><b>Successful?</b></Typography><Typography variant="body2" sx={{ color: "#4A1C9D", fontSize: 14, fontWeight: 600 }}>{formatYesNo(apiResponse.Conversation_Successful)}</Typography></Grid>
              </Grid>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={2}><Typography variant="body2" sx={{ color: "#737277", fontSize: 13 }}><b>Total Messages</b></Typography><Typography variant="body2" sx={{ color: "#4A1C9D", fontSize: 14, fontWeight: 600 }}>{metricsData.total_messages}</Typography></Grid>
                <Grid item xs={12} sm={2}><Typography variant="body2" sx={{ color: "#737277", fontSize: 13 }}><b>Amelia Messages</b></Typography><Typography variant="body2" sx={{ color: "#4A1C9D", fontSize: 14, fontWeight: 600 }}>{metricsData.amelia_messages}</Typography></Grid>
                <Grid item xs={12} sm={2}><Typography variant="body2" sx={{ color: "#737277", fontSize: 13 }}><b>User Messages</b></Typography><Typography variant="body2" sx={{ color: "#4A1C9D", fontSize: 14, fontWeight: 600 }}>{metricsData.user_messages}</Typography></Grid>
                <Grid item xs={12} sm={2}><Typography variant="body2" sx={{ color: "#737277", fontSize: 13 }}><b>Anonymous User</b></Typography><Typography variant="body2" sx={{ color: "#4A1C9D", fontSize: 14, fontWeight: 600 }}>{formatTrueFalse(metaData.anonymous)}</Typography></Grid>
                <Grid item xs={12} sm={2}><Typography variant="body2" sx={{ color: "#737277", fontSize: 13 }}><b>Sentiment (1-10)</b></Typography><Typography variant="body2" sx={{ color: "#4A1C9D", fontSize: 14, fontWeight: 600 }}>{apiResponse.Sentiment_Score}</Typography></Grid>
                <Grid item xs={12} sm={2}><Typography variant="body2" sx={{ color: "#737277", fontSize: 13 }}><b>Frustration (1-10)</b></Typography><Typography variant="body2" sx={{ color: "#4A1C9D", fontSize: 14, fontWeight: 600 }}>{apiResponse.Frustration_Score}</Typography></Grid>
              </Grid>
            </Box>
            <Typography variant="body1" mt={3} fontWeight="bold" sx={{ color: "#3A4B6F" }}>AI Generated Insights</Typography>
            <Typography variant="body2" sx={{ color: "#737277", mt: 2 }}><b>Main Query : </b>{summaryData.QUERY_SUMMARY}</Typography>
            <Typography variant="body2" sx={{ color: "#737277", mt: 2 }}><b>Understanding : </b>{summaryData.UNDERSTANDING} </Typography>
            <Typography variant="body2" sx={{ color: "#737277", mt: 2 }}><b>Key Insight 1 : </b>{summaryData.INSIGHT1}</Typography>
            <Typography variant="body2" sx={{ color: "#737277", mt: 2 }}><b>Key Insight 2 : </b>{summaryData.INSIGHT2} </Typography>

          </TabPanel>
}
          {/* Sentiment ANalysiss */}
          {!loading &&<TabPanel value={tabIndex} index={1}>
            {/* <Typography variant="h6">Sentiment Analysis</Typography> */}
            <div >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ fontSize: 16, fontWeight: 600, color: '#3A4B6F' }}>Sentiment Analysis</p>
                <p style={{ fontSize: 16, fontWeight: 400, color: '#3A4B6F' }}>
                  Average Sentiment : <span style={{ color: '#4F2580', fontSize: 18, fontWeight: 600 }}>{avgSentiment}</span>
                </p>
              </div>

              <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="message_id" label={{ value: "Message Sequence", position: "insideBottom", offset: -12 ,dy:16}} />
                    <YAxis   domain={[-1, 1]} label={{ value: "Sentiment Score", angle: -90, position: "insideLeft",dy:40 }} />
                    <Tooltip content={<CustomTooltip />} />
                    {/* First Line - Sentiment Score 1 (Dots Kept) */}
                    <Line type="monotone" dataKey="sentiment" stroke="#5E43B2" strokeWidth={2} dot={{ r: 5 }} />
                    <ReferenceLine y={0} stroke="#C4A484" strokeWidth={2} />
 
                    {/* Second Line - Sentiment Score 2 (Dots Kept) */}
                    {/* <Line type="monotone" data={data.map(d => ({ message_id: d.message_id, y: 0 }))} stroke="red" dataKey="y" strokeWidth={2} dot={{ r: 5 }} dot={false}/> */}
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div style={{ border: '1px solid #D1D1D1', backgroundColor: '#FAF9FF', borderRadius: 8, marginTop: 100, paddingLeft: 20, paddingRight: 20, paddingTop: 0, paddingBottom: 20 }}>
                <h4 style={{ fontSize: 18, color: '#616163', fontWeight: 400, marginBottom:12 }}>Sentiment Score Interpretation</h4>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircleOutlineIcon style={{ color: '#8C7BC0', fontSize: 20, paddingRight: 5 }} />
                  <p style={{ fontSize: 14, fontWeight: 400, color: '#737277',margin:4 }}>Score ranges from -1 (very negative) to +1 (very positive)</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircleOutlineIcon style={{ color: '#8C7BC0', fontSize: 20, paddingRight: 5 }} />
                  <p style={{ fontSize: 14, fontWeight: 400, color: '#737277',margin:4 }}>0 represents neutral sentiment</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircleOutlineIcon style={{ color: '#8C7BC0', fontSize: 20, paddingRight: 5 }} />
                  <p style={{ fontSize: 14, fontWeight: 400, color: '#737277',margin:4 }}>The chart shows how sentiment changes throughout the conversation</p>
                </div>
              </div>

            </div>
          </TabPanel>
}
{!loading &&<TabPanel value={tabIndex} index={2}>
  <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: "#3A4B6F" }}>
    Conversation Transcript
  </Typography>
 
  <Box
    sx={{
      maxHeight: "500px",
      overflowY: "auto",
      p: 3,
      background: "#F8F9FA",
      borderRadius: 3,

      border: "1px solid #e0e0e0",
      scrollbarWidth: "bold",
      scrollbarColor: "#8C7BC0 #e0e0e0",
      "&::-webkit-scrollbar": {
        width: "16px",
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: "#f1f1f1",
        borderRadius: "8px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#8C7BC0",
        borderRadius: "8px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#8C7BC0",
      },
    }}
  >
    {messages.map((msg) => (
      <Stack
        key={msg.id}
        direction="row"
        spacing={1.5}
        justifyContent={msg.speaker === "User" ? "flex-end" : "flex-start"}
        alignItems="flex-start"
        sx={{ my: 1.5 }}
      >
        {/* Bot Icon */}
        {msg.speaker === "Amelia" && (
          <Avatar sx={{ bgcolor: "#8C7BC0" }}>
            <SmartToyIcon />
          </Avatar>
        )}
 
        {/* Message Box */}
        <Paper
          sx={{
            p: 2,
            maxWidth: "75%",
            backgroundColor: msg.speaker === "User" ? "#8C7BC0" : "#FFFFFF",
            color: msg.speaker === "User" ? "#fff" : "#333",
            borderRadius:3,
            borderTopRightRadius :msg.speaker === "User" ? 0 : 10,
            borderTopLeftRadius :msg.speaker === "User" ? 10 : 0,
            boxShadow: msg.speaker === "User" ? 0 : 1,
          }}
        >
          <Typography variant="body2">{msg.message}</Typography>
 
          {/* Timestamp */}
          <Typography
            variant="caption"
            sx={{
              display: "block",
              textAlign: msg.speaker === "User" ? "right" : "left",
              mt: 1,
              color: msg.speaker === "User" ? "#E0E0E0" : "#666",
            }}
          >
            {formatDatefromUnix(msg.timestamp)}
          </Typography>
        </Paper>
 
        {/* User Icon */}
        {msg.speaker === "User" && (
          <Avatar sx={{ bgcolor: "#8C7BC0" }}>
            <PersonIcon />
          </Avatar>
        )}
      </Stack>
    ))}
  </Box>
</TabPanel>
}
 








          {/* {messages.map((msg) => (
                <Stack
                  key={msg.speaker}
                  direction="row"
                  spacing={1.5}
                  justifyContent={msg.speaker === "User" ? "flex-end" : "flex-start"}
                  alignItems="flex-start"
                  sx={{ my: 1.5 }}
                > */}

                  {/* {msg.speaker === "Amelia" && (
                    <Avatar sx={{ bgcolor: "#8C7BC0" }}>
                      <SmartToyIcon />
                    </Avatar>
                  )}


                  <Paper
                    sx={{
                      p: 2,
                      maxWidth: "75%",
                      backgroundColor: msg.speaker === "User" ? "#8C7BC0" : "#FFFFFF",
                      color: msg.speaker === "User" ? "#fff" : "#333",
                      borderRadius: 3,
                      boxShadow: msg.speaker === "User" ? 0 : 1,

                    }}
                  >
                    <Typography variant="body2">{msg.message}</Typography>
                  </Paper>


                  {msg.speaker === "User" && (
                    <Avatar sx={{ bgcolor: "#8C7BC0" }}>
                      <PersonIcon />
                    </Avatar>
                  )}
                </Stack>
              ))} */}

          {/* <TabPanel value={tabIndex} index={3}>
            <Typography variant="body1" fontWeight="bold" fontSize={16} sx={{ color: "#3A4B6F", mb: 2 }}>Conversation Flow</Typography>
            <Box
              sx={{

                overflowY: "auto",
                alignItems: "center",

                justifyContent: "center",
                display: "flex",

                borderRadius: 3,
                width: '100%'


              }}
            >
              <img src={flowdiagram} />


            </Box>
          </TabPanel> */}
        </Paper>
      </Box>
    </div>
  );
}