import React, { useEffect, useState, useRef } from "react";
import {
  Tooltip,
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
  Typography,
  Button,
  Breadcrumbs,
  TableSortLabel
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandIcon from "@mui/icons-material/Fullscreen";
import SearchIcon from "@mui/icons-material/Search";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Link, useLocation, useNavigate } from "react-router-dom";
import companyLogo from "../../../assets/logo 1.png"; // Company logo
import Acouser from "../../../assets/Account circle.png";
// import Jsonimg from "../../assets/JSON.png";

const ConversationFullDataTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const tableRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const navigate = useNavigate();
  const storedUser = localStorage.getItem("username")
  console.log(storedUser);
  const location = useLocation();
  const message = location.state?.message || "No data Received";
  console.log(message)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // setLoading(true);

  const totalConversations = localStorage.getItem("totalConv")
  //console.log(totalConversations);
  const HandleClick = async () => {
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
        Accept: "application/json"
      }
    }

    try {
      let response = await fetch("https://ameliaapp.sincera.net/api/analysis-results", requestOptions);
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
  const exportTableToExcel = () => {
    console.log('test')
    // if (!tableRef.current) return;

    // Convert the table to a worksheet
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "TableData");

    // Convert to buffer and save
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(dataBlob, "Conversation_table.xlsx");
  }

  const navigateToTablePage = () => {
    navigate('/conversationTable');
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; // Handle missing values
    const date = new Date(dateString);
    // return date.toLocaleString("en-US", {
    //   year: "numeric",
    //   month: "short",
    //   day: "numeric",
    //   hour: "2-digit",
    //   minute: "2-digit",
    //   // second: "2-digit",
    //   hour12: true, // Convert to AM/PM format
    // });
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
  const formatYesNo = (value) => {
    return value === "Y" ? "Yes" : value === "N" ? "No" : "Partial"; // Default fallback
  };

  const CapitalizeText = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };
  const limit = 12;
  const truncateText = (text, limit) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  useEffect(() => {
    console.log(message);
    if (Array.isArray(message) && message.length > 0) {
      setData(message);
    } else {
      setData([]); // Ensure `data` is an empty array to avoid rendering issues
    }
    setLoading(false); // Ensure loading is always set to false
    console.log(loading)
  }, []);
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setData(message); // Show all data when search is cleared
    } else {
      const filteredData = message.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setData(filteredData);
    }
  }, [searchTerm, message]);
  const handleSort = (column) => {
    const isAsc = sortConfig.key === column && sortConfig.direction === "asc";
    const direction = isAsc ? "desc" : "asc";

    const sortedData = [...data].sort((a, b) => {
      if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
      if (a[column] > b[column]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key: column, direction });
    setData(sortedData);
  };
  const handleSearch = (event) => {

    setSearchTerm(event.target.value.toLowerCase());

  };

  return (
    <div>
      <Box sx={{ backgroundColor: '#ffffff', padding: 2.5, boxShadow: '0px 4px 4px 0px #00000050', position: 'sticky', top: 0, zIndex: 1 }}>
        <header className="headmain" >
          <div>
            <img src={companyLogo} alt="Company Logo" style={{}} />
          </div>
          <div className="userbox" >
            <img src={Acouser} alt="user" />
            <div>
              {/* <h6 style={{border:'none',fontSize:10,fontWeight:400,color:'#2C2C2C'}}>Manager</h6> */}
              <select className="dropdowncs" >
                <option value="">{storedUser} <br /> Manager</option>
                <option value="option1">Logout</option>
                {/* <option value="option2">Option 2</option> */}
              </select>
            </div>
          </div>
        </header>
      </Box>
      <Box sx={{ backgroundColor: '#F5F4F9', padding: 3 }}>


        <Box sx={{ margin: 3 }}>
          {/* <div
      variant="contained"
      style={{
         
        color: "#7D6DB1", 
       // Darker shade on hover
      }}      startIcon={<ArrowBackIcon />} // Back arrow icon
      onClick={() => navigate(-1)} // Navigate back
    >
      Back to Dashboard
    </div> */}
          <div role="presentation" onClick={() => navigate(-1)}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link style={{ color: "#737277", textDecoration: 'none' }} href="/">
                Dashboard
              </Link>

              <Typography sx={{ color: '#4f2580' }}>Conversations Table</Typography>
            </Breadcrumbs>
          </div>
        </Box>


        <Box sx={{ display: "flex", justifyContent: "center", margin: 3 }}>




          <Paper elevation={4} sx={{
            p: isMobile ? 1 : 3, width: "97%", borderRadius: "12px",
            border: '1px solid #c5c4ca ',
            boxShadow: '0px 4px 4px 0px #00000040',
          }}>
            <Box display="flex" flexDirection={isMobile ? "column" : "row"} justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant={isMobile ? "h6" : "h5"} fontWeight={600} color="#4F2580">{data.length} Conversations</Typography>
              <Box display="flex" flexDirection={isMobile ? "column" : "row"} gap={2} alignItems="center">

                {/* <Box display="flex" alignItems="center" border="1px solid #ccc" borderRadius={2} px={2} py={1} bgcolor="white">
              <SearchIcon sx={{ color: "#4F2580", mr: 1 }} />
              <TextField
                size="small"
                variant="standard"
                placeholder="Search..."
                fullWidth
                InputProps={{ disableUnderline: true }}
              />
            </Box> */}
                <Box

                  display="flex"

                  alignItems="center"

                  border="1px solid #ccc"

                  borderRadius={2}

                  px={2}

                  py={1}

                  bgcolor="white"

                >
                  <TextField

                    size="small"

                    variant="standard"

                    placeholder="Search..."

                    fullWidth

                    value={searchTerm}

                    onChange={handleSearch}

                    InputProps={{ disableUnderline: true }}

                  />

                </Box>
                <Box display="flex">
                  <IconButton onClick={exportTableToExcel}>
                    <DownloadIcon sx={{ color: "#7D6DB1" }} />
                  </IconButton>
                  {/* <IconButton onClick={navigateToTablePage}>
                <ExpandIcon sx={{ color: "#7D6DB1" }} />
              </IconButton> */}
                </Box>
              </Box>
            </Box>
            {loading ? (
              <p>Loading data...</p>
            ) : data.length > 0 ? (
              <TableContainer >
                <Table >
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#7D6DB1" }}>
                      {[
                    { key: "Conversation_ID", label: "Conv Id" },
                    { key: "Analysis_Date", label: "Date & Time" },
                    { key: "Duration_Seconds", label: "Duration (ms)" },
                    { key: "Initial_Channel", label: "Channel" },
                    { key: "Intent", label: "Intent" },
                    { key: "Sentiment_Score", label: "Sentiment (1-10)" },
                    { key: "Conversation_Successful", label: "Successful ?" },
                    { key: "Frustration_Score", label: "Frustration (1-10)" },
                    { key: "Messages_Count", label: "Total Msgs" },
                    { key: "User_Messages_Count", label: "User Msgs" },
                    { key: "Amelia_Messages_Count", label: "Amelia Msgs" },
                    { key: "Misunderstandings", label: "Misunderstanding" },
                    { key: "Resolution", label: "Resolved ?" },
                  ].map(({ key, label }) => (
                        <TableCell key={key} sx={{
                          color: "#fff", fontWeight: "bold", fontSize: "14px", backgroundColor: "#7D6DB1", whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          border: 'none'
                        }}>
                          <TableSortLabel
                            active={true}
                            direction={
                              sortConfig.key === key ? sortConfig.direction : "asc"
                            }
                            onClick={() => handleSort(key)}
                            sx={{
                              color: "#fff", // Ensures the label text is white
                              "& .MuiTableSortLabel-icon": {
                                color: "#fff !important", // Ensures the sorting icon is white
                              },
                            }}
                          >
                            <span style={{ color: "#fff" }}>{label}</span>{" "}
                            {/* White label text */}
                          </TableSortLabel>              </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ color: "#737277", fontWeight: "bold" }}>{item.Conversation_ID || "N/A"}</TableCell>
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
                        <TableCell sx={{ color: "#737277" }}><Tooltip title={item.Misunderstandings} arrow>
                          <span>{truncateText(item.Misunderstandings, 12)}</span>
                        </Tooltip></TableCell>
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
      </Box>
    </div>
  );
};

export default ConversationFullDataTable;
