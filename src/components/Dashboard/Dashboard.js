
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import companyLogo from "../../assets/logo 1.png";
import Acouser from "../../assets/Account circle.png";
import DateRangeIcon from '@mui/icons-material/DateRange';
import Grid from '@mui/material/Grid';
import './Dashboard.css'
import Dashscreen from './ConversationsSessions'
import Messages from './Messages'
import SuccessRateCard from './SuccessRate';
import ResolutionRateCard from './ResolutionRate';
import ConverationIntents from './ConverationIntents'
import SentimentAnalysis from './SentimentAnalysis';
import DurationCard from './Duration';
import ConversationTable from './ConversationTable'
import ChannelsCard from './ChannelsCard';
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { useContext } from "react";
import { DataContext } from "./DataContext";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import loaderImage from '../../assets/amelialoader.gif'
import BusinessMetricsChart from './BusinessMetrics';

const Dashboard = () => {
    // const { fetchData } = useContext(DataContext);
    const storedUser = localStorage.getItem("username");
    const storedStartDate = localStorage.getItem('startDate');
    const storedEndDate = localStorage.getItem('endDate');
    const userType = localStorage.getItem('userType');
    const navigate = useNavigate();
    // const [loading, setLoading] = useState(true);
    // const [fromDate, setFromDate] = React.useState(dayjs('2025-04-16'));
    // const [toDate, setToDate] = React.useState(dayjs('2025-04-23'));
    // const [analysisResults, setAnalysisResults] = useState('');
    // const [analysisOverview, setAnalysisOverview] = useState('');
    const today = dayjs(storedEndDate);
    const minimumDate = dayjs(storedStartDate); // 1st Jan 2020
    const oneWeekAgo = today.subtract(7, "day"); // today - 7 days
    const [fromDate, setFromDate] = useState(oneWeekAgo);
    const [toDate, setToDate] = useState(today);
    const {
        analysisResults,
        analysisOverview,
        loading,
        businessMetrics,
        fetchDataFromAPI
      } = useContext(DataContext);
    
      useEffect(() => {
        fetchDataFromAPI(dayjs(fromDate).format('MM/DD/YYYY')+" 00:00",dayjs(toDate).format('MM/DD/YYYY')+" 00:00",'Load');
      }, []);
   
      const handleFetchData = () => {
        fetchDataFromAPI(dayjs(fromDate).format('MM/DD/YYYY')+" 00:00",dayjs(toDate).format('MM/DD/YYYY')+" 00:00",'process');
    };

    const handleLogout = () => {
        console.log('data')
        localStorage.clear();  // Clears all stored data
        sessionStorage.clear(); // Clears session storage (optional)
        navigate("/login"); // Redirect to login page (update path as needed)
    };
    const navigateInsights = () => {
      navigate("/date");

    }
    const displayDateRange = () => {
        const sameMonth = fromDate.format('MMM') === toDate.format('MMM');
        const sameYear = fromDate.format('YYYY') === toDate.format('YYYY');

        if (sameMonth && sameYear) {
            return `${fromDate.format('MMM D')}–${toDate.format('D')}, ${toDate.format('YYYY')}`;
        } else if (sameYear) {
            return `${fromDate.format('MMM D')}–${toDate.format('MMM D')}, ${toDate.format('YYYY')}`;
        } else {
            return `${fromDate.format('MMM D, YYYY')}–${toDate.format('MMM D, YYYY')}`;
        }
    };

  

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
                                <option value="">{storedUser} </option>
                                <option value="Logout">Logout</option>
                                {/* <option value="option2">Option 2</option> */}
                            </select>
                        </div>
                    </div>
                </header>
            </Box>
            <Box sx={{ backgroundColor: '#F5F4F9', padding: 3 }}>


                {/*----------------------------------------- body------------------------------ */}

                <Box sx={{}}>
                    <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center' }}>
                        <text className='comname1' >
                            Conversation Analysis and Customer Experience Scoring Tool
                        </text>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 30, marginBottom: 30 }} >
                        <h4 style={{ fontSize: 20, fontWeight: 600, color: '#605192', marginTop: 20 }}>Amelia Analytics Dashboard ({displayDateRange()})</h4>
                        {/* <div style={{display:'flex',alignItems:'center',border:'1px solid #CCCCCC',height:25,borderRadius:12,paddingLeft:10,paddingRight:10,paddingTop:3,paddingBottom:3}}>
    <DateRangeIcon sx={{ fontSize: 20, color: "#5E43B2",paddingRight:2 }} />
        <p style={{fontSize:14}}>Jan 21,2025-Jan 27,2025</p>
      </div> */}
                        <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" gap={1} alignItems="center">
        
        <DatePicker
          sx={{ backgroundColor: "#fff",zIndex:0 }}
          label="From Date"
          value={fromDate}
          onChange={(newValue) => setFromDate(newValue)}
          maxDate={today}  // Cannot pick future date
          minDate={minimumDate}  // Not before 2020 Jan 1
          slots={{
            openPickerIcon: () => (
              <CalendarTodayIcon sx={{ color: "#5E43B2" }} />
            ),
          }}
          renderInput={(params) => (
            <TextField {...params} size="small" />
          )}
        />

        <DatePicker
          sx={{ backgroundColor: "#fff" ,zIndex:0}}
          label="To Date"
          value={toDate}
          onChange={(newValue) => setToDate(newValue)}
          minDate={fromDate || minimumDate} // Cannot pick before FromDate
          maxDate={today} // Cannot pick future dates
          slots={{
            openPickerIcon: () => (
              <CalendarTodayIcon sx={{ color: "#5E43B2" }} />
            ),
          }}
          renderInput={(params) => (
            <TextField {...params} size="small" />
          )}
        />

        <Button
          onClick={handleFetchData}
          sx={{
            backgroundColor: "#5E43B2",
            height: "55px",
            "&:hover": {
              backgroundColor: "#605192",
            },
          }}
        >
          <ArrowForwardIcon sx={{ color: "#fff" }} />
        </Button>

        {localStorage.getItem('userType') === 'admin' && (<Button
        onClick={navigateInsights}
        sx={{
            // backgroundColor: "#5E43B2",
            border:'2px solid #5E43B2',
            color:"#5e43b2",
            height: "55px",
            "&:hover": {
              backgroundColor: "#605192",
              color:"#fff"
            },
          }}
        >
        GO To Process
        </Button>
        )}

      </Box>
    </LocalizationProvider>

                        </div>


                    </div>

                    {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center",flexDirection:"column",height:"70vh" }}>
                        <CircularProgress size={50} />
                        {/* <img src={loaderImage} alt="Loading..." style={{ width: "350px" }} /> */}
                                  <div style={{marginTop:30}}>
                                    <text className='comname' >
                                      Loading ....
                                    </text>
                                  </div>
                    </Box>
                ) : (
                    <Box marginTop={3} marginBottom={3}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={3}>
                                <Dashscreen data={analysisOverview} />
                                <div style={{ marginTop: 20 }}>
                                    <SuccessRateCard data={analysisOverview} />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <ConverationIntents data={analysisOverview} />
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <div style={{ marginTop: 20 }}>
                                            <ResolutionRateCard data={analysisOverview} />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <div style={{ marginTop: 20 }}>
                                            <SentimentAnalysis data={analysisResults} Avg={analysisOverview} />
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Messages data={analysisResults} />
                                <div style={{ marginTop: 18 }}>
                                    <DurationCard  data={analysisResults} Avg={analysisOverview}  />
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <ChannelsCard data={analysisOverview} />
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                )}
                    {!loading && (<Box mb={3}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                        <BusinessMetricsChart data={businessMetrics} />
                        </Grid>
                         <Grid item xs={12} md={4}>
                         <ConverationIntents data={analysisOverview} />
                         </Grid>
                      </Grid>
                    </Box>)
}
                   
                   {!loading && (<Box>
                        <ConversationTable data={analysisResults} />
                    </Box>)
}
                    

                </Box>


            </Box>
        </div>
    )
}
export default Dashboard
