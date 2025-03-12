import { Box, } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import companyLogo from "../../assets/logo 1.png"; // Company logo
import Acouser from "../../assets/Account circle.png";
import DateRangeIcon from '@mui/icons-material/DateRange';
import './Dashboard.css';
import ConversationSessions from './ConversationSessions';
import Messages from './Messages';
import SuccessRateCard from './SuccessRateCard';
import ResolutionRateCard from './ResolutionRateCard';
import ConversationIntents from './ConversationsIntents';
import SentimentAnalysis from './SentimentAnalysis';
import Duration from './DurationCard';
import ConversationTable from './Table';
import Channels from './Channels';

const Dashboard = () => {
  return (
    <Box margin={3}>
      <Box>
        <header className="headmain">
          <div>
            <img src={companyLogo} alt="Company Logo" />
          </div>
          <div className="userbox">
            <img src={Acouser} alt="user" />
            <div>
              <select className="dropdowncs">
                <option value="">Jeyaprakash <br /> Manager</option>
                <option value="option1">Logout</option>
              </select>
            </div>
          </div>
        </header>
      </Box>

      {/* ---------------------------- Body ---------------------------- */}
      <Box sx={{ backgroundColor: '#F5F4F9', padding: 3 }}>
        <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
          <p className='comname'>AMELIA</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <h4 style={{ fontSize: 24, fontWeight: 600, color: '#605192' }}>Amelia Analytics Dashboard</h4>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #CCCCCC',
            height: 30,
            borderRadius: 12,
            padding: '5px 12px'
          }}>
            <DateRangeIcon sx={{ fontSize: 20, color: "#5E43B2", marginRight: 1 }} />
            <p style={{ fontSize: 14 }}>Jan 21, 2025 - Jan 27, 2025</p>
          </div>
        </div>

        {/* Dashboard Grid Layout */}
        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} md={3}>
            <ConversationSessions />
            <Box >
              <SuccessRateCard />
            </Box>
          </Grid>

          {/* Center Column */}
          <Grid item xs={12} md={6}>
            <ConversationIntents />
            <Grid container spacing={2} mt={1}>
              <Grid item xs={6}>
                <ResolutionRateCard />
              </Grid>
              <Grid item xs={6}>
                <SentimentAnalysis />
              </Grid>
            </Grid>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={3}>
            <Messages />
            <Box mt={2}>
              <Duration />
            </Box>
            <Box mt={2}>
              <Channels />
            </Box>
          </Grid>
        </Grid>

        {/* Conversation Table */}
        <Box mt={3}>
          <ConversationTable />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
