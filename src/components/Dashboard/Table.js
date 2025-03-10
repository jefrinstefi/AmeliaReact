import React, { useState } from "react";
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
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Box sx={{ p: isMobile ? 1 : 3, display: "flex", justifyContent: "center" }}>
      <Paper elevation={4} sx={{ borderRadius: 3, p: isMobile ? 1 : 3, maxWidth: "1200px", width: "100%", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
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
        <TableContainer sx={{ maxHeight: 400 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#7D6DB1" }}>
                {["Conv Id", "Date & Time", "Duration", "Channel", "Intent", "Sentiment", "Misunderstanding", "Resolved"].map((head) => (
                  <TableCell key={head} sx={{ color: "#fff", fontWeight: "bold", fontSize: "14px", backgroundColor: "#7D6DB1" }}>
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ color: "#737277", fontWeight: "bold" }}>{row.convId}</TableCell>
                  <TableCell sx={{ color: "#737277" }}>{row.dateTime}</TableCell>
                  <TableCell sx={{ color: "#737277" }}>{row.duration}</TableCell>
                  <TableCell sx={{ color: "#737277" }}>{row.channel}</TableCell>
                  <TableCell sx={{ color: "#737277" }}>{row.intent}</TableCell>
                  <TableCell sx={{ color: "#737277" }}>{row.sentiment}</TableCell>
                  <TableCell sx={{ color: "#737277" }}>{row.misunderstanding}</TableCell>
                  <TableCell sx={{ color: "#737277" }}>{row.resolved}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default ConversationTable;