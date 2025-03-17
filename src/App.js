import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Upload from "./components/Upload/Upload";
import Dashboard from "./components/Dashboard/Dashboard/Dashboard";
import ConversationTable from "./components/Dashboard/Dashboard/ConversationTable";
import ConversationFullDataTable from "./components/Dashboard/Dashboard/ConversationFullDataTable";
// import Table from "./components/Dashboard/Table";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route path="/upload" element={<Upload />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path = "/conversationTable" element={<ConversationFullDataTable />} />
      </Routes>
    </Router>
  );
}

export default App;
