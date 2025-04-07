import React, { useState, useEffect, useRef,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button,Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import companyLogo from "../../assets/logo 1.png"; // Company logo
import Acouser from "../../assets/Account circle.png";
import Jsonimg from "../../assets/JSON.png";
import './Upload.css';
import loaderImage from '../../assets/amelialoader.gif'
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { DataContext } from "../Dashboard/Dashboard/DataContext";
import ConversationTable from "../Dashboard/Dashboard/ConversationTable";

const AmeliaUpload = () => {
  const storedUser = localStorage.getItem("username")
  console.log(storedUser);
  const [totalConversations,setTotalConversations] = useState('');
    const [file, setFile] = useState(null);
  // const isMobile = useMediaQuery("(max-width:600px)");
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { fetchData } = useContext(DataContext);
  // const { setUserData } = useDataContext(); // Get function from Context
  const [loading, setLoading] = useState(false);

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

  // const handleProcess = () => {
  //   setIsOpen(true);
  //   console.log(setIsOpen,isOpen);  }

  const handleUpload = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    const username1 = "admin";
    const password1 = "password";
        const credentials = btoa(`${username1}:${password1}`);
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: "Basic " + credentials, // Base64 encoded username:password
        Accept: "application/json"
      },
      body: formData
    };
    fetch("https://ameliaapp.sincera.net/api/upload-transcript", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log('result', result, result.status);
        if (result.status === "success") {
          GetDetails();
          
        }
      })
      .catch((error) => console.error(error));

  };
  const AnalyzeBatch = () =>{
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic YWRtaW46cGFzc3dvcmQ=");
 
const raw = JSON.stringify({
  "batch_size": 2,
  "batch_number": 1
});
 
const requestOptions = {
  method: "POST",
  headers: myHeaders,
  redirect: "follow"
};
 
fetch("https://ameliaapp.sincera.net/api/analyze-all", requestOptions)
  .then((response) => response.json())
  .then((result) => {console.log(result);
    // setTotalConversations(result.total);
        // localStorage.setItem("totalConv", result.total);
        if (result.status === 'success') {
          GetTabelValues();
            
          }
  })
  .catch((error) => console.error(error));
  
  }
  const GetTabelValues  = () => {
    const username = "admin";
    const password ="password";
    const credentials = btoa(`${username}:${password}`);
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: "Basic " + credentials, // Base64 encoded username:password
      Accept: "application/json"
    },
  };

  fetch("https://ameliaapp.sincera.net/api/analysis-results", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log('result',result);
      fetchData();
          setLoading(false);
          navigate('/dashboard', { state: { message: result.results } }); 
    })
    .catch((error) => console.error(error));
  }
  
  const GetDetails = () => {
    const username = "admin";
    const password ="password";
    const credentials = btoa(`${username}:${password}`);
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: "Basic " + credentials, // Base64 encoded username:password
      Accept: "application/json"
    },
  };

  fetch("https://ameliaapp.sincera.net/api/conversations", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log('result',result);
      setTotalConversations(result.total);
      localStorage.setItem("totalConv", result.total);
      if (result.conversations.length >0) {
        //  fetchData();
        // setLoading(false);
        // navigate('/dashboard'); 
        AnalyzeBatch();     }
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

      <Box sx={{ backgroundColor: '#ffffff', padding: 2.5, boxShadow: '0px 3px 3px 0px #5e43b220', position: 'sticky', top: 0, zIndex: 1 }}>
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
                <option value="">{storedUser} <br /> Manager</option>
                <option value="Logout">Logout</option>
                {/* <option value="option2">Option 2</option> */}
              </select>
            </div>
          </div>
        </header>
      </Box>



      <Box sx={{ backgroundColor: '#ffffff', padding: 3 }}>

        {/* ----------------- header -------------------------------------------------------------------- */}


        {/* ----------------- header-end -------------------------------------------------------------------- */}

        {!loading && <Box>
          <div className="bodymain" >
             <div>
              <text className='comname' >
                Conversation Analysis and Customer Experience Scoring Tool
              </text>
            </div> 
            <div style={{ marginTop: 20 }}>
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
                  <p className="ineercard2" >Drag and drop or Browse <br />
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
                {fileUploaded && <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #D1D1D1', borderRadius: 12, padding: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <img src={Jsonimg} alt="json" />
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 400, color: '#737277', marginBottom: 5, marginTop: 0 }}> {fileName ? `Attached: ${fileName}` : ''}</p>
                    <BorderLinearProgress variant="determinate" value={100} style={{}} />
                  </div>
                  <DeleteForeverIcon sx={{ fontSize: 30, color: "red" }} onClick={clearFile} />
                </div>}
                {fileUploaded && <div style={{ display: 'flex', justifyContent: 'center', marginTop: 15 }}>
                  <Button
                    className="custom-button"
                    variant="contained"
                    onClick={handleUpload}
                    // startIcon={<CloudUploadIcon />}
                    sx={{ mt: 2, width: '80%', height: 47, backgroundColor: "#5E43B2", borderRadius: "8px", fontSize: 15, fontWeight: 600 }}
                  >
                    Process
                  </Button>

                </div>}
              </div>


            </div>


            <Box marginTop={3}>
              <p className="copyright" >
                © {new Date().getFullYear()}{" "}
                <span style={{ color: "#4F2580" }}>SINCERA</span>. All rights reserved.</p>
            </Box>

          </div>
        </Box>
        }
        {loading && <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          // height="100vh"
          
        >

          <img src={loaderImage} alt="Loading..." style={{ width: "350px" }} />
          <div>
            <text className='comname' >
              Processing ....
            </text>
          </div>
        </Box>
        }

      </Box>

    </div>


  );
};

export default AmeliaUpload;
