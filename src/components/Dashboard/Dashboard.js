import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, IconButton, Box, useMediaQuery
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ExpandIcon from "@mui/icons-material/Fullscreen";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SearchIcon from "@mui/icons-material/Search";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import dayjs from "dayjs";

const data = Array(20).fill({
  convId: "CONV162025",
  dateTime: "04/03/2025 11:00am",
  duration: "5.40 m",
  channel: "Voice",
  intent: "Information",
  sentiment: "4 / 10",
  misunderstanding: "Amelia misunderstood when the user asked about",
  resolved: "Yes",
});

const ConversationTable = () => {
  const [dateRange, setDateRange] = useState([dayjs("2025-01-21"), dayjs("2025-01-27")]);
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(max-width: 900px)");

  return (
    <Paper elevation={3} sx={{ borderRadius: 2, padding: isMobile ? 1 : 2, overflowX: "auto" }}>
      {/* Header Section */}
      <Box display="flex" flexDirection={isMobile ? "column" : "row"} justifyContent="space-between" alignItems={isMobile ? "flex-start" : "center"} padding={2}>
        <Box display="flex" alignItems="center" mb={isMobile ? 2 : 0}>
          <Box fontSize={24} fontWeight={600} color="#4F2580" mr={1}>120</Box>
          <Box fontSize={18} fontWeight={500}>Conversations</Box>
        </Box>

        <Box display="flex" flexDirection={isMobile ? "column" : "row"} gap={2} alignItems={isMobile ? "flex-start" : "center"}>
          {/* Date Picker */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
              display="flex"
              alignItems="center"
              border="1px solid #ccc"
              borderRadius={1}
              px={1}
              sx={{ cursor: "pointer", width: isMobile ? "100%" : "auto" }}
              onClick={() => setOpen(true)}
            >
              <CalendarTodayIcon fontSize="small" sx={{ color: "#4F2580" }} />
              <Box fontSize={14} mx={1}>
                {`${dateRange[0].format("MMM DD, YYYY")} - ${dateRange[1].format("MMM DD, YYYY")}`}
              </Box>
            </Box>

            {/* Hidden Date Range Picker */}
            {open && (
              <DateRangePicker
                open={open}
                onClose={() => setOpen(false)}
                value={dateRange}
                onChange={(newValue) => setDateRange(newValue)}
                renderInput={() => null} // Hides default input fields
              />
            )}
          </LocalizationProvider>

          {/* Search Bar with Icon */}
          <Box display="flex" alignItems="center" border="1px solid #ccc" borderRadius={1} px={1} bgcolor="white" width={isMobile ? "100%" : "auto"}>
            <SearchIcon sx={{ color: "#4F2580", mr: 1 }} />
            <TextField
              size="small"
              variant="standard"
              placeholder="Search..."
              fullWidth
              sx={{ minWidth: 180, border: "none" }}
              InputProps={{ disableUnderline: true }}
            />
          </Box>

          {/* Icons */}
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

      {/* Scrollable Table */}
      <TableContainer sx={{ maxHeight: 400, overflowX: "auto" }}>
        <Table stickyHeader size={isMobile ? "small" : "medium"}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#7D6DB1" }}>
              {["Conv Id", "Date & Time", "Duration", "Channel", "Intent", "Sentiment", "Misunderstanding", "Resolved"].map((head) => (
                <TableCell
                  key={head}
                  sx={{
                    color: "#fff",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    backgroundColor: "#7D6DB1",
                    fontSize: isMobile ? "12px" : "14px"
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ color: "#737277", fontWeight: "bold", fontSize: isMobile ? "12px" : "15px" }}>{row.convId}</TableCell>
                <TableCell sx={{ color: "#737277", fontSize: isMobile ? "12px" : "15px" }}>{row.dateTime}</TableCell>
                <TableCell sx={{ color: "#737277", fontSize: isMobile ? "12px" : "15px" }}>{row.duration}</TableCell>
                <TableCell sx={{ color: "#737277", fontSize: isMobile ? "12px" : "15px" }}>{row.channel}</TableCell>
                <TableCell sx={{ color: "#737277", fontSize: isMobile ? "12px" : "15px" }}>{row.intent}</TableCell>
                <TableCell sx={{ color: "#737277", fontSize: isMobile ? "12px" : "15px" }}>{row.sentiment}</TableCell>
                <TableCell sx={{ color: "#737277", fontSize: isMobile ? "12px" : "15px" }}>{row.misunderstanding}</TableCell>
                <TableCell sx={{ color: "#737277", fontSize: isMobile ? "12px" : "15px" }}>{row.resolved}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ConversationTable;
