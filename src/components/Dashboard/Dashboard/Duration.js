import React ,{useEffect,useState} from "react";
import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
 
const DurationCard = ({data}) => {
  const [avgSession, setAvgSession] = useState('')
  useEffect(() => {
    getDuration();
  },[data]);
  const getDuration = () => {
if (data.key_metrics !== undefined ) {
  setAvgSession(data.key_metrics.avg_duration);
}
  }
  return (
    <Card
      sx={{
        // width: 300,
        borderRadius: "12px",
        border: '1px solid #c5c4ca ',
      boxShadow: '0px 4px 4px 0px #00000040',
        p: 1,
      }}
    >
      <CardContent>
        {/* Title with Icon */}
        <Box display="flex" mb={2}>
          <AccessTimeIcon sx={{ color: "#4F2580", mr: 1 }} />
          <Typography variant="subtitle1" fontWeight={600} color="#616163" fontSize={12}>
            Duration (In Milliseconds)
          </Typography>
        </Box>
 
        {/* Data Section */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box textAlign="center">
            <Typography fontSize="0.85rem" color="textSecondary">
              Total Session Duration
            </Typography>
            <Typography variant="h5" fontWeight={700} color="#6937C6">
              15,320
            </Typography>
          </Box>
 
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
 
          <Box textAlign="center">
            <Typography fontSize="0.85rem" color="textSecondary">
              Average Session Time
            </Typography>
            <Typography variant="h6" fontWeight={700} color="black">
{avgSession}      
      </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
 
export default DurationCard;