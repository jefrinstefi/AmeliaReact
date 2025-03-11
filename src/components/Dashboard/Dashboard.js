import { Box } from '@mui/material'
import React from 'react'
import companyLogo from "../../assets/logo 1.png"; // Company logo
import Acouser from "../../assets/Account circle.png";
import DateRangeIcon from '@mui/icons-material/DateRange';
import Grid from '@mui/material/Grid2';
import './Dashboard.css'

const Dashboard = () => {
  return (
    <Box margin={3}>
       <Box >
            <header className="headmain" >
                <div>
                <img src={companyLogo} alt="Company Logo" style={{ }} />
                </div>
                <div className="userbox" >
                  <img src={Acouser} alt="user" />
                  <div>
                  {/* <h6 style={{border:'none',fontSize:10,fontWeight:400,color:'#2C2C2C'}}>Manager</h6> */}
            <select className="dropdowncs" >
              <option value="">Jeyaprakash <br /> Manager</option>
              <option value="option1">Logout</option>
              {/* <option value="option2">Option 2</option> */}
            </select>
          </div>
                </div>
            </header>
            </Box>

{/*----------------------------------------- body------------------------------ */}

<Box>
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
<Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>

        {/*----------------col 1---------------------- */}
        <Grid size={3}>
          <div style={{height:500,width:400,}}>
          <h1>hello</h1>
          </div>
        
        </Grid>

           {/*----------------col 2---------------------- */}
        <Grid size={6}>
          <div>
          <h1>hello</h1>
          </div>
      
         </Grid>

            {/*----------------col 3---------------------- */}
        <Grid size={3}>
          <div><h1>hello</h1></div>
      
        </Grid>
      
      </Grid>

      <div>
        <h1>hello</h1>
      </div>
    </Box>
</Box>


    </Box>
  )
}

export default Dashboard
