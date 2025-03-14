import { Button } from '@mui/material';
import React from 'react';

const Popup = () => (
    <div style={{backgroundColor:'#ffffff',borderRadius:8,width:'40%',boxShadow:' 3px 3px 3px rgba(159, 159, 159, 0.1)'}}>
    <h4 style={{backgroundColor:'#5E43B2',padding:18,color:'#ffffff',borderTopLeftRadius:8,borderTopRightRadius:8}}>Confirmation</h4>
    <div style={{padding:18}}>
    <p style={{color:'#65686C',fontSize:20,fontWeight:500,textAlign:'center'}}>Uploaded successfully! Please proceed with full analysis.</p>
    <div style={{display:'flex',justifyContent:'center',paddingBottom:20,paddingTop:10}}>
      <Button style={{backgroundColor:'#5E43B2',height:45,width:100,color:'#ffffff'}}>
      Proceed
      </Button>
    </div>
    </div>
  </div>
);

export default Popup;