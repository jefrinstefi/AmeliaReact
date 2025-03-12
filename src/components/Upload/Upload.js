import React ,{useState, useEffect, useRef}from "react";
import { useNavigate } from "react-router-dom";
import { Box,Button,} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import companyLogo from "../../assets/logo 1.png"; // Company logo
import Acouser from "../../assets/Account circle.png";
import Jsonimg from "../../assets/JSON.png";
import './Upload.css';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Popup from "../Popup";

const AmeliaUpload = () => {
  const storedUser = localStorage.getItem("username")
  console.log(storedUser);
  const [file, setFile] = useState(null);
  // const isMobile = useMediaQuery("(max-width:600px)");
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [fileUploaded] = useState(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);


// Check if a file is already attached 
useEffect(() => {
  const savedFile = fileName;
  if (savedFile) {
    setFileName(savedFile);
  }
}, []);
  const handleDrop = (event) => {
    event.preventDefault();
    if (file) {
      setFileName(file.name); // Store file name
      // fileUploaded(true);
    }
    if (event.dataTransfer.files.length) {
      setFile(event.dataTransfer.files[0]);
    }
  };
  const handleButtonClick = () => {
    fileInputRef.current.click(); // Open file picker
  };
  const handleFileSelect = (event) => {
    console.log(event);
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name); // Store file name
      // fileUploaded(true);
    }
    if (event.target.files.length) {
      setFile(event.target.files[0]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const closeModal = () => {
    setIsOpen(false); // Close popup
  };
  const handleUpload = () => {
    setIsOpen(true);
    console.log(setIsOpen,isOpen);
 const formData = new FormData();
formData.append("file", file);
    const username = "admin";
  const password = "password";
  const credentials = btoa(`${username}:${password}`);
const requestOptions = {
  method: "POST",
  headers: {
    Authorization: "Basic " + credentials, // Base64 encoded username:password
    Accept: "application/json"
  },
  body: formData
};
fetch("http://44.246.164.250:8502/upload-transcript", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    console.log('result',result,result.status);
    if (result.status === "success") {
      navigate('/dashboard');
    }
  })
  .catch((error) => console.error(error));

  };
  



 
 
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 8,
    borderRadius: 10,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: '#EBEBEB',
      ...theme.applyStyles('dark', {
        backgroundColor: '#EBEBEB',
      }),
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: '#5E43B2',
      ...theme.applyStyles('dark', {
        backgroundColor: '#5E43B2',
      }),
    },
  }));
 
  // const handleLogin = () => {
  //   // Authentication logic
  //   navigate("/src/components/Dashboard");
  // };
 
 
 
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


   
    <Box sx={{backgroundColor:'#F5F4F9',padding:3}}>
 
      {/* ----------------- header -------------------------------------------------------------------- */}  
     
 
 {/* ----------------- header-end -------------------------------------------------------------------- */}  
 
    <Box>
      <div className="bodymain" >
<div>
<text className='comname' >
        AMELIA
        </text>
</div>
<div style={{marginTop:20}}>
<text className="uploadhead">
          Upload JSON to Generate Dashboard Insights
        </text>
</div>
 
<div className="bodycard" >
 
<div className="ineercard"
// onDrop={handleDrop}
//       onDragOver={handleDragOver}
//        onClick={() => document.getElementById("file-upload").click()}
//       sx={{ cursor: "pointer", position: "relative" }}
>

  <div className="ineercard1" onDrop={handleDrop}
          onDragOver={handleDragOver} onClick={handleButtonClick}>
            <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />
<CloudUploadIcon sx={{ fontSize: 80, color: "#5E43B2" }} />
<p className="ineercard2" >Drag and drop or Browse <br/>
files here</p>
<p className="ineercard3" >
  Please upload the Amelia Transcript JSON file here and the file size should be below 200MB.</p>
</div>
</div>
 
<div>
<hr className="devider" ></hr>
</div>
 
{/*------------------------------- card 2 section-------------------- */}
 
<div className="cardtwosection" >
  <p className="ineercardslart2" >No Files Uploaded</p>
  <div style={{backgroundColor:'#FFFFFF',border:'1px solid #D1D1D1',borderRadius:12,padding:10,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
    <img src={Jsonimg} alt="json"/>
    <div>
      <p style={{fontSize:12,fontWeight:400,color:'#737277',marginBottom:5,marginTop:0}}> {fileName ? `Attached: ${fileName}`: '' }</p>
      <BorderLinearProgress variant="determinate" value={60} style={{}} />
    </div>
  <DeleteForeverIcon sx={{ fontSize: 30, color: "red" }} />
  </div>
  <div style={{display:'flex',justifyContent:'center',marginTop:15}}>
  <Button
          className="custom-button"
          variant="contained"
          onClick={handleUpload}
          startIcon={<CloudUploadIcon />}
          sx={{ mt: 2, width:'80%',height:47 , backgroundColor: "#5E43B2", borderRadius: "8px", fontSize:15, fontWeight:600 }}
        >
          Upload
        </Button>
        
  </div>
</div>
{/* {isOpen &&    <Popup/>
        } */}
</div>
 
<Box marginTop={3}>
  <p className="copyright" >Developed for Amelia Conversation Analysis@2025</p>
</Box>
 
</div>
    </Box>
 
 
    </Box>

    </div>
 
 
  );
};
 
export default AmeliaUpload;
 