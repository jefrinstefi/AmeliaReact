import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  TextField,
  MenuItem,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  LocalizationProvider,
  StaticDatePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import dayjs from 'dayjs';
import companyLogo from "../assets/logo 1.png";
import Acouser from "../assets/Account circle.png";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CustomAlert from './CustomAlert';
import './style.css';
const AmeliaInsightsPicker = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const [fromDate, setFromDate] = useState(dayjs('2025-04-11'));
  const [toDate, setToDate] = useState(dayjs('2025-04-15'));
  const [fromTime, setFromTime] = useState({ hour: '09', minute: '00', period: 'AM' });
  const [toTime, setToTime] = useState({ hour: '06', minute: '00', period: 'PM' });
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlert1, setShowAlert1] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);

  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

  const storedUser = localStorage.getItem("username");

  const updateDateTime = (date, time) => {
    const hour =
      time.period === 'PM' && time.hour !== '12'
        ? parseInt(time.hour, 10) + 12
        : time.period === 'AM' && time.hour === '12'
          ? 0
          : parseInt(time.hour, 10);
    return date.hour(hour).minute(parseInt(time.minute, 10));
  };
 
  
    const formatDate = (isoStr) => {
      const date = new Date(isoStr);
      
      const pad = (num) => String(num).padStart(2, '0');
  
      const month = pad(date.getMonth() + 1); // getMonth() is 0-based
      const day = pad(date.getDate());
      const year = date.getFullYear();
  
      const hours = pad(date.getHours());
      const minutes = pad(date.getMinutes());
  
      return `${month}/${day}/${year} ${hours}:${minutes}`;
    };
  const handleProcess = () => {
    console.log(fromDate, fromTime);
    setLoading(true);
    const from = updateDateTime(fromDate, fromTime);
    const to = updateDateTime(toDate, toTime);

    setTimeout(() => {
      console.log('Processing From:', from.format());
      console.log('Processing To:', to.format());
      const startDate = formatDate(from.format());
      const endDate = formatDate(to.format());
      console.log('startDate',startDate);
      FetchAPI(startDate,endDate);
    }, 2000);
  };

  const FetchAPI = async (from,to) =>{
    setShowAlert(false);

    try {
    const username = "admin";
    const password = "password";
    const credentials = btoa(`${username}:${password}`);

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: "Basic " + credentials,
        Accept: "application/json"
      },
    };

    const response = await fetch(
      `https://ameliaapp.sincera.net/api/get-conversation-exports?start_date=${from}&end_date=${to}`,
      requestOptions
    );

    const result = await response.json();
    console.log("Export result:", result);

    if (result) {
      if(result.total_conversations >0) {
      
      }
      await analyzeBatch(from,to);
    }

  } catch (error) {
    console.error("fetchDataFromAPI error:", error);
  }
  }


  const analyzeBatch = async (from,to) => {
    console.log(from,to)

    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Basic YWRtaW46cGFzc3dvcmQ=");

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch( `https://ameliaapp.sincera.net/api/analyze-all?start_date=${from}&end_date=${to}`, requestOptions);
      const result = await response.json();

      console.log("Analyze result:", result);

      if (result.status === 'success') {
        // await fetchTableData(from,to);
        setShowAlert(false);
        setShowAlert1(true)
        setLoading(false);


      } else {
        setShowAlert(false);
        setShowAlert2(true)
        setLoading(false);
      }
    } catch (error) {
      console.error("analyzeBatch error:", error);
    }
  };
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  const GotoDash = () => {
    navigate("/dashboard");
  }

  const customTheme = createTheme({
    palette: {
      primary: {
        main: '#5e2ced',
      },
    },
  });

  const minDate = dayjs('2020-01-01');
  const maxDate = dayjs();

  return (
    <ThemeProvider theme={customTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div>
          <Box sx={{
            backgroundColor: '#ffffff',
            padding: 2.5,
            boxShadow: '0px 4px 4px 0px #00000050',
            position: 'sticky',
            top: 0,
            zIndex: 1
          }}>
            <header className="headmain">
              <div>
                <img src={companyLogo} alt="Company Logo" />
                 </div>
               <div>
                 <text className='comname hide-on-small'>
                Conversation Analysis and Customer Experience Scoring Tool
              </text>
              </div>
              <div className="userbox">
                <img src={Acouser} alt="user" />
                <div>
                  <select
                    className="dropdowncs"
                    onChange={(e) => {
                      if (e.target.value === "Logout") {
                        handleLogout();
                      }
                    }}
                  >
                    <option value="">{storedUser} <br /> Manager</option>
                    <option value="Logout">Logout</option>
                  </select>
                </div>
              </div>
            </header>
          </Box>

          <Box
            sx={{
              backgroundColor: '#fff',
              // minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: isSmallScreen ? 2 :  "20px 30px",
              margin: 0
            }}
          >
            <div>
              <text className='comname hide-on-big'>
                Conversation Analysis and Customer Experience Scoring Tool
              </text>
            </div>

            <Card
              sx={{
                backgroundColor: '#EDEBF9',
                padding: isSmallScreen ? 2 : "20px 30px",
                width: '100%',
                maxWidth: 1200,
                textAlign: 'center',
                boxShadow: 'none',
                borderRadius: 2,
                marginTop: "10px",
                paddingLeft: 0,
                paddingRight:0,
              }}
            >

              <Typography variant="h6" gutterBottom sx={{ color: '#0E3169', fontSize: 20, fontWeight: 500,marginTop:'-5px' }} >
                Select date and time for processing Amelia insights
              </Typography>
              {/* <Typography variant="body2" mb={4} sx={{ color: '#0E3169', fontSize: 14, fontWeight: 400 }} >
                Select date and time from the DateTime Picker for From and To input fields to process Amelia insights
              </Typography> */}

              <Grid container spacing={4} justifyContent="center">
                {/* FROM Section */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ width: 400, mx: 'auto' }}>
                    <TextField
                      label="From"
                      value={updateDateTime(fromDate, fromTime).format('MM/DD/YYYY hh:mm A')}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarTodayIcon sx={{ color: '#5E43B2' }} />
                          </InputAdornment>
                        ),
                      }}
                      size="small"
                      sx={{ marginBottom: 2, backgroundColor: '#fff',zIndex:0 }}
                    />
                    <StaticDatePicker
                      displayStaticWrapperAs="desktop"
                      value={fromDate}
                      onChange={(newDate) => setFromDate(newDate)}
                      minDate={minDate}
                      maxDate={maxDate}
                      
 slotProps={{
    layout: {
      sx: {
        borderRadius: '4px',
        height:300,
        paddingBottom: 0, // helps reduce default bottom padding
        '& .MuiCalendarPicker-root': {
          minHeight: 'auto',
          paddingBottom: 0,
        },
        '& .MuiPickersCalendarHeader-root': {
          marginBottom: 0,
        },
        '& .MuiDayCalendar-monthContainer': {
          marginBottom: 0, // prevents spacing under the days
        },
        '& .MuiPickersSlideTransition-root': {
          minHeight: 200,
          marginBottom: 0,
        },
        '& .MuiDayCalendar-slideTransition': {
          paddingBottom: 0,
        },
        '& .MuiPickersLayout-actionBar': {
          marginTop: 0,
          paddingTop: 0,
        },
        '& .MuiPickersLayout-root': {
          paddingBottom: 0,
        },
      },
    },
  }}             />
                    <Grid container spacing={1} mt={1} justifyContent="space-between">
                      {['hour', 'minute', 'period'].map((type) => (
                        <Grid item key={type}>
                          <TextField
                            select
                            label={type === 'period' ? 'AM/PM' : type.charAt(0).toUpperCase() + type.slice(1)}
                            value={fromTime[type]}
                            onChange={(e) => setFromTime((prev) => ({ ...prev, [type]: e.target.value }))}
                            size="small"
                            sx={{ width: '120px', backgroundColor: '#fff',zIndex:0 }}
                          >
                            {(type === 'hour' ? hours : type === 'minute' ? minutes : ['AM', 'PM']).map((val) => (
                              <MenuItem key={val} value={val}>
                                {val}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Grid>

                {/* TO Section */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ width: 400, mx: 'auto', }}>
                    <TextField
                      label="To"
                      value={updateDateTime(toDate, toTime).format('MM/DD/YYYY hh:mm A')}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarTodayIcon sx={{ color: '#5E43B2' }} />
                          </InputAdornment>
                        ),
                      }}
                      size="small"
                      sx={{ marginBottom: 2, backgroundColor: '#fff',zIndex:0 }}
                    />
                    <StaticDatePicker
                      displayStaticWrapperAs="desktop"
                      value={toDate}
                      onChange={(newDate) => setToDate(newDate)}
                      minDate={fromDate}
                      maxDate={maxDate}
                       slotProps={{
    layout: {
      sx: {
        borderRadius: '4px',
        height:300,
        paddingBottom: 0, // helps reduce default bottom padding
        '& .MuiCalendarPicker-root': {
          minHeight: 'auto',
          paddingBottom: 0,
        },
        '& .MuiPickersCalendarHeader-root': {
          marginBottom: 0,
        },
        '& .MuiDayCalendar-monthContainer': {
          marginBottom: 0, // prevents spacing under the days
        },
        '& .MuiPickersSlideTransition-root': {
          minHeight: 200,
          marginBottom: 0,
        },
        '& .MuiDayCalendar-slideTransition': {
          paddingBottom: 0,
        },
        '& .MuiPickersLayout-actionBar': {
          marginTop: 0,
          paddingTop: 0,
        },
        '& .MuiPickersLayout-root': {
          paddingBottom: 0,
        },
      },
    },
  }}
                    />
                    <Grid container spacing={1} mt={1} justifyContent="space-between">
                      {['hour', 'minute', 'period'].map((type) => (
                        <Grid item key={type}>
                          <TextField
                            select
                            label={type === 'period' ? 'AM/PM' : type.charAt(0).toUpperCase() + type.slice(1)}
                            value={toTime[type]}
                            onChange={(e) => setToTime((prev) => ({ ...prev, [type]: e.target.value }))}
                            size="small"
                            sx={{ width: '120px', backgroundColor: '#fff',zIndex:0 }}
                          >
                            {(type === 'hour' ? hours : type === 'minute' ? minutes : ['AM', 'PM']).map((val) => (
                              <MenuItem key={val} value={val}>
                                {val}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ justifyContent: 'center', display: 'flex', mt: 4, gap: 2 }}>
                <Button
                  variant="contained"
                  color="secondary" onClick={() => GotoDash()}
                  disabled={loading}
                  sx={{
                    backgroundColor: '#fff',
                    textTransform: 'none',
                    paddingX: 4,
                    height: 45,
                    borderRadius: 2,
                    color: '#5E43B2',
                    border: '1px solid #5E43B2',
                    '&:hover': {
                      backgroundColor: '#4F2580',
                      color: '#fff',
                    },
                  }}
                >
                  Go to Dashboard
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setShowAlert(true)}
                  disabled={loading}
                  sx={{
                    backgroundColor: '#5E43B2',
                    textTransform: 'none',
                    paddingX: 4,
                    height: 45,
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: '#4F2580',
                    },
                  }}
                >
                  Process Insights
                </Button>

                <CustomAlert
                  open={showAlert}
                  title="Confirm Processing"
                  message="Are you sure you want to process Amelia insights?"
                  onClose={() => setShowAlert(false)}
                  onConfirm={() => {
                    handleProcess();
                  }}
                  confirmText="Yes, Process"
                  cancelText="Cancel"
                />
                <CustomAlert
                  open={showAlert1}
                  title="Confirmation"
                  message="Amelia Insights was processed successfully"
                  onClose={() => setShowAlert1(false)}
                  onConfirm={() => {
                    GotoDash();
                  }}
                  confirmText="GoTo Dashboard"
                  cancelText="Stay here"
                />
                 <CustomAlert
                  open={showAlert2}
                  title="Warning"
                  message="Successfully fetched 0 conversations"
                  onClose={() => setShowAlert2(false)}
                  onConfirm={() =>setShowAlert2(false) }
                  confirmText="Try again"
                />
              </Box>
            </Card>

          
             
          </Box>
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default AmeliaInsightsPicker;
