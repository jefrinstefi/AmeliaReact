import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <Box sx={{ p: 4, bgcolor: "#F5F5FA", minHeight: "100vh" }}>
      {/* Header */}
      <Typography
        variant="h4"
        fontWeight={700}
        textAlign="center"
        color="#4F2580"
        mb={4}
      >
        Amelia Analytics Dashboard
      </Typography>

      {/* Dashboard Layout */}
      <Grid container spacing={3}>
        {/* Conversations Card (Medium) */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3, borderRadius: 3, height: "343px", width: "284px" }}>
            <Typography variant="h6" color="#4F2580">
              Conversations / Sessions
            </Typography>
            <Typography variant="h3" fontWeight={700} color="#4F2580">
              120
            </Typography>
            <Typography>Effective: 90</Typography>
            <Typography>InEffective: 30</Typography>
          </Paper>
        </Grid>

        {/* Intent Chart (Large) */}
        <Grid item xs={12} md={5.5}>
          <Paper sx={{ p: 3, borderRadius: 3, height: "339px", width: "588px" }}>
            <Typography variant="h6" color="#4F2580">
              Conversation Intents
            </Typography>
            {/* Insert Bar Chart Component Here */}
          </Paper>
        </Grid>

        {/* Messages Card */}
       {/* Messages and Success Rate stacked */}
<Grid item xs={12} md={3}>
  <Box display="flex" flexDirection="column" gap={2}>
    {/* Messages Card */}
    <Paper sx={{ p: 3, borderRadius: 3, height: "218px", width: "275px" }}>
      <Typography variant="h6" color="#4F2580">
        Messages
      </Typography>
      <Typography variant="h6" fontWeight={700} color="#4F2580">
        10,4520
      </Typography>
    </Paper>

    {/* Success Rate Card */}
    <Paper sx={{ p: 3, borderRadius: 3, height: "138px", width: "275px" }}>
      <Typography variant="h6" color="#4F2580">
        Success Rate
      </Typography>
      <Typography>Chat Successful: 97%</Typography>
      <Typography>Chat Not Successful: 3%</Typography>
    </Paper>
  </Box>
</Grid>


        {/* Resolution Rate (Medium) */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3, borderRadius: 3, height: "237px",width:"278px" }}>
            <Typography variant="h6" color="#4F2580">
              Success Rate
            </Typography>
            {/* Insert Pie Chart Component Here */}
          </Paper>
        </Grid>

        {/* Sentiment Analysis (Medium) */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3, borderRadius: 3, height: "238px",width:"291px" }}>
            <Typography variant="h6" color="#4F2580">
              Resolution Analysis
            </Typography>
            <Typography variant="h4" fontWeight={700} color="#4F2580">
              6.7 Avg
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3, borderRadius: 3, height: "238px",width:"291px" }}>
            <Typography variant="h6" color="#4F2580">
              Sentiment Analysis
            </Typography>
            <Typography variant="h4" fontWeight={700} color="#4F2580">
              6.7 Avg
            </Typography>
          </Paper>
        </Grid>

        {/* Channels Card (Medium) */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3, borderRadius: 3, height: "184px",width:"275px" }}>
            <Typography variant="h6" color="#4F2580">
              Channels
            </Typography>
            <Typography>Voice Conversations: 6,700</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
