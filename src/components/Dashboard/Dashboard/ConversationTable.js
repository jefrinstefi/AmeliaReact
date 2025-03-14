// import React, {} from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   IconButton,
//   Box,
//   useMediaQuery,
//   Typography
// } from "@mui/material";
// import DownloadIcon from "@mui/icons-material/Download";
// import ExpandIcon from "@mui/icons-material/Fullscreen";
// import SearchIcon from "@mui/icons-material/Search";
 
// const data = Array(20).fill({
//   convId: "CONV162025",
//   dateTime: "04/03/2025 11:00am",
//   duration: "5.40 m",
//   channel: "Voice",
//   intent: "Information",
//   sentiment: "4 / 10",
//   misunderstanding: "Amelia misunderstood when the user asked about",
//   resolved: "Yes",
// });
 
// const ConversationTable = () => {
//   const isMobile = useMediaQuery("(max-width: 600px)");
 
//   return (
//     <Box sx={{ display: "flex", justifyContent: "center" }}>
//       <Paper elevation={4} sx={{  p: isMobile ? 1 : 3, width: "100%",  borderRadius: "12px",
//         border: '1px solid #c5c4ca ',
//       boxShadow: '0px 4px 4px 0px #00000040', }}>
//         <Box display="flex" flexDirection={isMobile ? "column" : "row"} justifyContent="space-between" alignItems="center" mb={3}>
//           <Typography variant={isMobile ? "h6" : "h5"} fontWeight={600} color="#4F2580">120 Conversations</Typography>
//           <Box display="flex" flexDirection={isMobile ? "column" : "row"} gap={2} alignItems="center">
//             <Box display="flex" alignItems="center" border="1px solid #ccc" borderRadius={2} px={2} py={1} bgcolor="white">
//               <SearchIcon sx={{ color: "#4F2580", mr: 1 }} />
//               <TextField
//                 size="small"
//                 variant="standard"
//                 placeholder="Search..."
//                 fullWidth
//                 InputProps={{ disableUnderline: true }}
//               />
//             </Box>
//             <Box display="flex">
//               <IconButton>
//                 <DownloadIcon sx={{ color: "#7D6DB1" }} />
//               </IconButton>
//               <IconButton>
//                 <ExpandIcon sx={{ color: "#7D6DB1" }} />
//               </IconButton>
//             </Box>
//           </Box>
//         </Box>
//         <TableContainer sx={{ maxHeight: 400 }}>
//           <Table stickyHeader>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: "#7D6DB1" }}>
//                 {["Conv Id", "Date & Time", "Duration", "Channel", "Intent", "Sentiment", "Misunderstanding", "Resolved"].map((head) => (
//                   <TableCell key={head} sx={{ color: "#fff", fontWeight: "bold", fontSize: "14px", backgroundColor: "#7D6DB1" }}>
//                     {head}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {data.map((row, index) => (
//                 <TableRow key={index}>
//                   <TableCell sx={{ color: "#737277", fontWeight: "bold" }}>{row.convId}</TableCell>
//                   <TableCell sx={{ color: "#737277" }}>{row.dateTime}</TableCell>
//                   <TableCell sx={{ color: "#737277" }}>{row.duration}</TableCell>
//                   <TableCell sx={{ color: "#737277" }}>{row.channel}</TableCell>
//                   <TableCell sx={{ color: "#737277" }}>{row.intent}</TableCell>
//                   <TableCell sx={{ color: "#737277" }}>{row.sentiment}</TableCell>
//                   <TableCell sx={{ color: "#737277" }}>{row.misunderstanding}</TableCell>
//                   <TableCell sx={{ color: "#737277" }}>{row.resolved}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>
//     </Box>
//   );
// };
 
// export default ConversationTable;



import React, { useEffect, useState }  from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Box,
  useMediaQuery,
  Typography
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ExpandIcon from "@mui/icons-material/Fullscreen";
import SearchIcon from "@mui/icons-material/Search";

const ConversationTable = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
     const HandleClick = async() => {
      setLoading(true);
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Basic YWRtaW46cGFzc3dvcmQ=");
      const username = "admin";
      const password = "password";
      const credentials = btoa(`${username}:${password}`);
      const requestOptions = {
        method: "GET",
        headers: {
        Authorization: "Basic " + credentials, // Base64 encoded username:password},
        redirect: "follow",
        Accept : "application/json"
      } 
      }

      try {
        let response = await fetch("http://44.246.164.250:8502/analysis-results", requestOptions);
        let result = await response.json();
      
              console.log("Full API Response:", result);
      
              if (result.results && Array.isArray(result.results)) {
                console.log("API Data:", result.results);
                setData(result.results);
                console.log("Data:", data);
      
              } else {
                console.warn("No results found.");
                setData([]); // Set empty array to prevent map() errors
              }
            } catch (error) {
              console.error("Error:", error);
              setData([]); // Ensure data is an empty array if an error occurs
            } finally {
              setLoading(false);
            }
            
          }

          const formatDate = (dateString) => {
            if (!dateString) return "N/A"; // Handle missing values
            const date = new Date(dateString);
            return date.toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              // second: "2-digit",
              hour12: true, // Convert to AM/PM format
            });
          };
          const formatYesNo = (value) => {
            return value === "Y" ? "Yes" : value === "N" ? "No" : "Partial"; // Default fallback
          };
         
            const CapitalizeText = (text) => {
              if (!text) return "";
              return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
            };

          useEffect(() => {
            HandleClick(); 
          }, []);
 
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Paper elevation={4} sx={{  p: isMobile ? 1 : 3, width: "100%",  borderRadius: "12px",
        border: '1px solid #c5c4ca ',
      boxShadow: '0px 4px 4px 0px #00000040', }}>
        <Box display="flex" flexDirection={isMobile ? "column" : "row"} justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant={isMobile ? "h6" : "h5"} fontWeight={600} color="#4F2580">120 Conversations</Typography>
          <Box display="flex" flexDirection={isMobile ? "column" : "row"} gap={2} alignItems="center">
            <Box display="flex" alignItems="center" border="1px solid #ccc" borderRadius={2} px={2} py={1} bgcolor="white">
              <SearchIcon sx={{ color: "#4F2580", mr: 1 }} />
              <TextField
                size="small"
                variant="standard"
                placeholder="Search..."
                fullWidth
                InputProps={{ disableUnderline: true }}
              />
            </Box>
            <Box display="flex">
              <IconButton>
                <DownloadIcon sx={{ color: "#7D6DB1" }} />
              </IconButton>
              <IconButton>
                <ExpandIcon sx={{ color: "#7D6DB1" }} />
              </IconButton>
            </Box>
          </Box>
        </Box>
        {loading ? (
      <p>Loading data...</p>
    ) : data.length > 0 ? (
      <TableContainer sx={{ maxHeight: 400 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#7D6DB1" }}>
            {["Conv Id", "Date & Time", "Duration", "Channel", "Intent", "Sentiment","Successful?","Frustration","Total Messages","Amelia Messages","User Messages","Misunderstanding", "Resolved"].map((head) => (
              <TableCell key={head} sx={{ color: "#fff", fontWeight: "bold", fontSize: "14px", backgroundColor: "#7D6DB1" }}>
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
             <TableRow key={index}>
             <TableCell sx={{ color: "#737277", fontWeight: "bold" }}>{item.Conversation_ID || "N/A" }</TableCell>
             <TableCell sx={{ color: "#737277" }}>{formatDate(item.Analysis_Date) || "N/A"}</TableCell>
             <TableCell sx={{ color: "#737277" }}>{item.Duration_Seconds || "N/A"}</TableCell>
             <TableCell sx={{ color: "#737277" }}>{CapitalizeText(item.Initial_Channel) || "N/A"}</TableCell>
             <TableCell sx={{ color: "#737277" }}>{CapitalizeText(item.Intent)}</TableCell>
             <TableCell sx={{ color: "#737277" }}>{item.Sentiment_Score}</TableCell>
             <TableCell sx={{ color: "#737277" }}>{formatYesNo(item.Conversation_Successful)}</TableCell>
             <TableCell sx={{ color: "#737277" }}>{item.Frustration_Score}</TableCell>
             <TableCell sx={{ color: "#737277" }}>{item.Messages_Count}</TableCell>
             <TableCell sx={{ color: "#737277" }}>{item.User_Messages_Count}</TableCell>
             <TableCell sx={{ color: "#737277" }}>{item.Amelia_Messages_Count}</TableCell>
             <TableCell sx={{ color: "#737277" }}>{item.Misunderstandings}</TableCell>
             <TableCell sx={{ color: "#737277" }}>{formatYesNo(item.Resolution)}</TableCell>
           </TableRow>
          ))}
       </TableBody>
          </Table>
        </TableContainer>
    ) : (
      <p>No data available.</p>
    )}
      </Paper>
    </Box>
  );
};
 
export default ConversationTable;
