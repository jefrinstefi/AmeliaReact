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
import { Dialog, DialogTitle, DialogContent, DialogActions ,TextField,InputAdornment,IconButton} from "@mui/material";
import { Person, Visibility, VisibilityOff } from "@mui/icons-material";
// import { useDataContext } from "./DataContext";
// import { DataContext } from "../Dashboard/Dashboard/DataContext";
const AmeliaUpload = () => {
  const storedUser = localStorage.getItem("username")
  console.log(storedUser);
  const [file, setFile] = useState(null);
  // const isMobile = useMediaQuery("(max-width:600px)");
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [fileUploaded,setFileUploaded] = useState(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('')
  const [showPassword,setShowPassword] = useState('')
  // const { setUserData } = useDataContext(); // Get function from Context

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
       setFileUploaded(true);
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
      setFileUploaded(true);
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

  const handleProcess = () => {
    setIsOpen(true);
    console.log(setIsOpen,isOpen);  }

  const handleUpload = () => {
    console.log(username,password)
 const formData = new FormData();
formData.append("file", file);
    const username1 = "admin";
  const password1 = "password";
  localStorage.setItem('apiUser',username1);
  localStorage.setItem('apiPass',password1)

  const credentials = btoa(`${username1}:${password1}`);
  // setUserData(credentails);
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
  
  const handleLogout = () => {
    console.log('data')
    localStorage.clear();  // Clears all stored data
    sessionStorage.clear(); // Clears session storage (optional)
    navigate("/login"); // Redirect to login page (update path as needed)
  };
  const clearFile = () => {
    setFileName(null); // Remove file from state
    setFileUploaded(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset input field
    }
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

<Box sx={{backgroundColor:'#ffffff',padding:2.5,boxShadow: '0px 3px 3px 0px #5e43b220',position:'sticky',top:0,zIndex:1}}>
            <header className="headmain" >
                <div>
                <img src={companyLogo} alt="Company Logo" style={{ }} />
                </div>
                <div className="userbox" >
                  <img src={Acouser} alt="user" />
                  <div>
                  {/* <h6 style={{border:'none',fontSize:10,fontWeight:400,color:'#2C2C2C'}}>Manager</h6> */}
            <select className="dropdowncs"  onChange={(e) => {
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


   
    <Box sx={{backgroundColor:'#ffffff',padding:3}}>
 
      {/* ----------------- header -------------------------------------------------------------------- */}  
     
 
 {/* ----------------- header-end -------------------------------------------------------------------- */}  
 
    <Box>
      <div className="bodymain" >
<div>
<text className='comname' >
Conversation Analysis and Customer Experience Scoring Tool
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
  {!fileUploaded && <p className="ineercardslart2" >No Files Uploaded</p>}
  {fileUploaded && <div style={{backgroundColor:'#FFFFFF',border:'1px solid #D1D1D1',borderRadius:12,padding:10,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
    <img src={Jsonimg} alt="json"/>
    <div>
      <p style={{fontSize:12,fontWeight:400,color:'#737277',marginBottom:5,marginTop:0}}> {fileName ? `Attached: ${fileName}`: '' }</p>
      <BorderLinearProgress variant="determinate" value={100} style={{}} />
    </div>
  <DeleteForeverIcon sx={{ fontSize: 30, color: "red" }} onClick={clearFile}/>
  </div> }
  {fileUploaded &&<div style={{display:'flex',justifyContent:'center',marginTop:15}}>
  <Button
          className="custom-button"
          variant="contained"
          onClick={handleProcess}
          // startIcon={<CloudUploadIcon />}
          sx={{ mt: 2, width:'80%',height:47 , backgroundColor: "#5E43B2", borderRadius: "8px", fontSize:15, fontWeight:600 }}
        >
          Process
        </Button>
        
  </div>}
</div>


</div>
<Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            padding: "20px",
            backgroundColor: "#FFFFFF",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#4F2580",
            fontSize: "24px",
          }}
        >
          Authentication
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Username"
            margin="dense"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            sx={{
              marginBottom: "12px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
 
          <TextField
            fullWidth
            label="Password"
            margin="dense"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            sx={{
              marginBottom: "12px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
 
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            variant="outlined"
            onClick={() => setIsOpen(false)}
            sx={{
              borderColor: "#4F2580",
              color: "#4F2580",
              borderRadius: "5px",
              width: "100px",
            }}
          >
            Cancel
          </Button>
 
          <Button
            variant="contained"
            onClick={handleUpload}
            sx={{
              backgroundColor: "#4F2580",
              color: "#fff",
              borderRadius: "5px",
              width: "100px",
            }}
          >
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
 
<Box marginTop={3}>
  <p className="copyright" >
        © {new Date().getFullYear()}{" "}
        <span style={{ color: "#4F2580" }}>SINCERA</span>. All rights reserved.</p>
</Box>
 
</div>
    </Box>
 
 
    </Box>

    </div>
 
 
  );
};
 
export default AmeliaUpload;
 