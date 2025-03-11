import React from "react";
import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const DurationCard = () => {
  return (
    <Card
      sx={{
        width: 300,
        borderRadius: 3,
        boxShadow: 3,
        textAlign: "center",
        p: 2,
      }}
    >
      <CardContent>
        {/* Title with Icon */}
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <AccessTimeIcon sx={{ color: "#4F2580", mr: 1 }} />
          <Typography variant="subtitle1" fontWeight={600} color="#4F2580">
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
              15.6
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DurationCard;
