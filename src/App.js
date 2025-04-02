import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Upload from "./components/Upload/Upload";
import Dashboard from "./components/Dashboard/Dashboard/Dashboard";
import ConversationAnalysis from "./components/DetailedAnalysis/DetailedAnalysis";
import ConversationTable from "./components/Dashboard/Dashboard/ConversationTable";
import ConversationFullDataTable from "./components/Dashboard/Dashboard/ConversationFullDataTable";
import ChatTimeline from "./components/HeatMap";
import './App.css';
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Table from "./components/Dashboard/Table";

const theme = createTheme({
  typography: {
    fontFamily: "'Instrument Sans', sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
         Margin:0,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path = "/conversationTable" element={<ConversationFullDataTable />} />
        <Route path="/detailedAnalysis" element={<ConversationAnalysis />}/>
        <Route path="/map" element={<ChatTimeline />}/>

      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
