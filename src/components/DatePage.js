import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  TextField,
  MenuItem,
  CircularProgress,
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

const AmeliaInsightsPicker = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const [fromDate, setFromDate] = useState(dayjs('2025-04-11'));
  const [toDate, setToDate] = useState(dayjs('2025-04-15'));
  const [fromTime, setFromTime] = useState({ hour: '09', minute: '00', period: 'AM' });
  const [toTime, setToTime] = useState({ hour: '06', minute: '00', period: 'PM' });
  const [loading, setLoading] = useState(false);

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

  const handleProcess = () => {
    setLoading(true);
    const from = updateDateTime(fromDate, fromTime);
    const to = updateDateTime(toDate, toTime);

    setTimeout(() => {
      console.log('Processing From:', from.format());
      console.log('Processing To:', to.format());
      setLoading(false);
    }, 2000);
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  const customTheme = createTheme({
    palette: {
      primary: {
        main: '#5e2ced', // Violet theme for selected date
      },
    },
  });

  const minDate = dayjs('2020-01-01'); // Restrict date from Jan 1, 2020
  const maxDate = dayjs(); // Set the maximum date to today's date

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
              backgroundColor: '#fff', // Light grey background color for the content
              minHeight: '100vh',
              display: 'flex',
              flexDirection:'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: isSmallScreen ? 2 : 4,
              margin:2
            }}
          >
             <div>
              <text className='comname' >
                Conversation Analysis and Customer Experience Scoring Tool
              </text>
            </div>
            
            <Card
              sx={{
                backgroundColor: '#EDEBF9', // Set background color to match the content area
                padding: isSmallScreen ? 2 : 4,
                width: '100%',
                maxWidth: 1200,
                textAlign: 'center',
                boxShadow: 'none',
                borderRadius: 2,
               marginTop:5
              }}
            >
             
              <Typography variant="h6" gutterBottom sx={{color:'#0E3169',fontSize:20,fontWeight:500}} >
                Select date and time for processing Amelia insights
              </Typography>
              <Typography variant="body2" mb={4} sx={{color:'#0E3169',fontSize:14,fontWeight:400}} >
              Slect date and time from the DateTime Picker for From and To input fields to process Amelia insights
              </Typography>

              <Grid container spacing={4}>
                {/* FROM Section */}
                <Grid item xs={12} md={6}>
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
                    sx={{ marginBottom: 2,zIndex:0 }}
                  />
                  <StaticDatePicker
                    displayStaticWrapperAs="desktop"
                    value={fromDate}
                    onChange={(newDate) => setFromDate(newDate)}
                    minDate={minDate} // Restrict date from Jan 1, 2020
                    maxDate={maxDate} // Restrict date to today
                  />
                  <Grid container spacing={1} mt={1}>
                    {['hour', 'minute', 'period'].map((type) => (
                      <Grid item xs={4} key={type}>
                        <TextField sx={{zIndex:0}}
                          select
                          label={type === 'period' ? 'AM/PM' : type.charAt(0).toUpperCase() + type.slice(1)}
                          value={fromTime[type]}
                          onChange={(e) => setFromTime((prev) => ({ ...prev, [type]: e.target.value }))} 
                          fullWidth
                          size="small"
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
                </Grid>

                {/* TO Section */}
                <Grid item xs={12} md={6}>
                  <TextField 
                    label="To"
                    value={updateDateTime(toDate, toTime).format('MM/DD/YYYY hh:mm A')}
                    fullWidth
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position="start" >
                          <CalendarTodayIcon sx={{ color: '#5E43B2' }} />
                        </InputAdornment>
                      ),
                    }}
                    size="small"
                    sx={{ marginBottom: 2,zIndex:0 }}
                  />
                  <StaticDatePicker
                    displayStaticWrapperAs="desktop"
                    value={toDate}
                    onChange={(newDate) => setToDate(newDate)}
                    minDate={fromDate} // Set To date's min date based on From date
                    maxDate={maxDate} // Restrict date to today
                  />
                  <Grid container spacing={1} mt={1}>
                    {['hour', 'minute', 'period'].map((type) => (
                      <Grid item xs={4} key={type}>
                        <TextField sx={{zIndex:0}}
                          select
                          label={type === 'period' ? 'AM/PM' : type.charAt(0).toUpperCase() + type.slice(1)}
                          value={toTime[type]}
                          onChange={(e) => setToTime((prev) => ({ ...prev, [type]: e.target.value }))} 
                          fullWidth
                          size="small"
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
                </Grid>
              </Grid>

              <Button
                variant="contained"
                color="secondary"
                onClick={handleProcess}
                disabled={loading}
                sx={{
                  marginTop: 4,
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
                {loading ? (
                  <CircularProgress size={24} sx={{ color: '#ffffff' }} />
                ) : (
                  'Process Insights'
                )}
              </Button>
            </Card>

            <Box marginTop={3}>
              <p className="copyright" >
                © {new Date().getFullYear()}{" "}
                <span style={{ color: "#4F2580" }}>SINCERA</span>. All rights reserved.</p>
            </Box>

          </Box>
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default AmeliaInsightsPicker;
    