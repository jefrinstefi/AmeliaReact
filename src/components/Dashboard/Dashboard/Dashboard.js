import { Box,CircularProgress } from '@mui/material'
import React , {useEffect}from 'react'
import companyLogo from "../../../assets/logo 1.png" // Company logo
import Acouser from "../../../assets/Account circle.png";
import DateRangeIcon from '@mui/icons-material/DateRange';
import Grid from '@mui/material/Grid2';
import './Dashboard.css'
import Dashscreen from'./ConversationsSessions'
import Messages from './Messages'
import SuccessRateCard from './SuccessRate';
import ResolutionRateCard from './ResolutionRate';
import ConverationIntents from './ConverationIntents'
import SentimentAnalysis from './SentimentAnalysis';
import DurationCard from './Duration';
import ConversationTable from './ConversationTable'
import ChannelsCard from './ChannelsCard';
import { useContext } from "react";
import { DataContext } from "./DataContext";
import { useNavigate ,useLocation} from 'react-router-dom';
const Dashboard = () => {
  const storedUser = localStorage.getItem("username")
  console.log(storedUser);
  const { data, fetchData,loading } = useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message || "No data Received";
  console.log('test',storedUser);
  useEffect(() => {
    if (!data) {
      fetchData(); // Fetch data only if it's null
    }
  }, [data]);

  const handleLogout = () => {
    console.log('data')
    localStorage.clear();  // Clears all stored data
    sessionStorage.clear(); // Clears session storage (optional)
    navigate("/login"); // Redirect to login page (update path as needed)
  };
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress size={50} />
      </Box>
    );
  }
  
  return (
    <div>
    <Box sx={{backgroundColor:'#ffffff',padding:2.5,boxShadow: '0px 4px 4px 0px #00000050',position:'sticky',top:0,zIndex:1}}>
            <header className="headmain" >
                <div>
                <img src={companyLogo} alt="Company Logo" style={{ }} />
                </div>
                <div className="userbox" >
                  <img src={Acouser} alt="user" />
                  <div>
                  {/* <h6 style={{border:'none',fontSize:10,fontWeight:400,color:'#2C2C2C'}}>Manager</h6> */}
            <select className="dropdowncs" onChange={(e) => {
    if (e.target.value === "Logout") {
      handleLogout();
    }
  }}>
              <option value="">{storedUser} <br /> Manager</option>
              <option value="Logout">Logout</option>
              {/* <option value="option2">Option 2</option> */}
            </select>
          </div>
                </div>
            </header>
            </Box>
    <Box  sx={{backgroundColor:'#F5F4F9',padding:3}}>
       

{/*----------------------------------------- body------------------------------ */}

<Box sx={{}}>
<div style={{display:'flex',textAlign:'center',justifyContent:'center'}}>
<text className='comname1' >
Conversation Analysis and Customer Experience Scoring Tool
        </text>
</div>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',height:40}} >
  <h4 style={{fontSize:24,fontWeight:600,color:'#605192'}}>Amelia Analytics Dashboard</h4>
  {/* <div style={{display:'flex',alignItems:'center',border:'1px solid #CCCCCC',height:25,borderRadius:12,paddingLeft:10,paddingRight:10,paddingTop:3,paddingBottom:3}}>
<DateRangeIcon sx={{ fontSize: 20, color: "#5E43B2",paddingRight:2 }} />
    <p style={{fontSize:14}}>Jan 21,2025-Jan 27,2025</p>
  </div> */}
</div>
{/*-------------------- devide column----------------*/}
<Box marginTop={3} marginBottom={3}>
<Grid container spacing={2}>

  <Grid size={{ xs: 12, md: 3 }}>
  {/* <Card sx={{height:300,}}>

  </Card> */}
  <div>
  <Dashscreen  data={data}/>
  </div>
    <div  style={{marginTop:20}}>
   <SuccessRateCard data={data}/>
    </div>
  </Grid>

{/* ----------------------2col-------------------------- */}

  <Grid size={{ xs: 12, md: 6 }}>
    <div>
  <ConverationIntents data={data}/>
  </div>
  <Grid container spacing={2} >
  <Grid size={{ xs: 12, md: 6 }}>
  <div  style={{marginTop:20}}>
        {/* <Card style={{width:250,height:200,backgroundColor:'#c1c'}}></Card> */}
        <ResolutionRateCard data={data}/>
        </div>
 
 </Grid>
 <Grid size={{ xs: 12, md: 6 }}>

 <div  style={{marginTop:20}}>
      {/* <Card style={{width:250,height:200}}></Card> */}
      <SentimentAnalysis data={message} Avg={data}/>
      </div>
     </Grid>
     </Grid>
      
    
  </Grid>

{/* ----------------------3col-------------------------- */}

  <Grid size={{ xs: 12, md: 3 }}>
    <div>
  <Messages data={message}/>
  </div>
    <div style={{marginTop:18}}>
    <DurationCard data={message} Avg={data}/>
    </div>
    <div style={{marginTop:20}}>
    <ChannelsCard data={data}/>
    </div>
  </Grid>

</Grid>
</Box>

<Box>
  <ConversationTable data={message}/>
</Box>

</Box>


    </Box>
    </div>
  )
}

export default Dashboard
