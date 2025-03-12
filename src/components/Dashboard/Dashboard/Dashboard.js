import { Box} from '@mui/material'
import React from 'react'
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

const Dashboard = () => {
  const storedUser = localStorage.getItem("username")
  console.log(storedUser);

  // const GetDetails = () => {
  //   const username = "admin";
  //   const password = "password";
  //   const credentials = btoa(`${username}:${password}`);
  // const requestOptions = {
  //   method: "GET",
  //   headers: {
  //     Authorization: "Basic " + credentials, // Base64 encoded username:password
  //     Accept: "application/json"
  //   },
  // };
  // fetch("http://44.246.164.250:8502//conversations", requestOptions)
  //   .then((response) => response.json())
  //   .then((result) => {
  //     console.log('result',result,result.status);
  //     if (result.status === "success") {
  //       // navigate('/dashboard');
  //     }
  //   })
  //   .catch((error) => console.error(error));
  
  //   };
    
  
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
            <select className="dropdowncs" >
              <option value="">{storedUser} <br /> Manager</option>
              <option value="option1">Logout</option>
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
<text className='comname' >
        AMELIA
        </text>
</div>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',height:40}} >
  <h4 style={{fontSize:24,fontWeight:600,color:'#605192'}}>Amelia Analytics Dashboard</h4>
  <div style={{display:'flex',alignItems:'center',border:'1px solid #CCCCCC',height:25,borderRadius:12,paddingLeft:10,paddingRight:10,paddingTop:3,paddingBottom:3}}>
<DateRangeIcon sx={{ fontSize: 20, color: "#5E43B2",paddingRight:2 }} />
    <p style={{fontSize:14}}>Jan 21,2025-Jan 27,2025</p>
  </div>
</div>
{/*-------------------- devide column----------------*/}
<Box marginTop={3} marginBottom={3}>
<Grid container spacing={2}>

  <Grid size={{ xs: 12, md: 3 }}>
  {/* <Card sx={{height:300,}}>

  </Card> */}
  <Dashscreen/>
    <div  style={{marginTop:20}}>
   <SuccessRateCard/>
    </div>
  </Grid>

{/* ----------------------2col-------------------------- */}

  <Grid size={{ xs: 12, md: 6 }}>
  <ConverationIntents/>
    
      <div style={{display:'flex',justifyContent:'space-between',marginTop:20}}>
        <div>
        {/* <Card style={{width:250,height:200,backgroundColor:'#c1c'}}></Card> */}
        <ResolutionRateCard/>
        </div>
        <div>
      {/* <Card style={{width:250,height:200}}></Card> */}
      <SentimentAnalysis/>
      </div>
     
      
    
    </div>
  </Grid>

{/* ----------------------3col-------------------------- */}

  <Grid size={{ xs: 12, md: 3 }}>
  <Messages/>
    <div style={{marginTop:20}}>
    <DurationCard />
    <div style={{marginTop:10}}>
    <ChannelsCard />
    </div>
    </div>
  </Grid>

</Grid>
</Box>

<Box>
  <ConversationTable/>
</Box>

</Box>


    </Box>
    </div>
  )
}

export default Dashboard
