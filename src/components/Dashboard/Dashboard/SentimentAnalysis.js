import React , {useEffect,useState} from "react";
import './SentimentAnalysis.css' // Import CSS
import { Card, Typography } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
 
const SentimentAnalysis = ({data}) => {
  const sentiments = [
    {
      icon: <SentimentVeryDissatisfiedIcon />,
      percentage: "5%",
      label: "Bad",
      className: "bad",
    },
    {
      icon: <SentimentDissatisfiedIcon />,
      percentage: "10%",
      label: "Need Improvement",
      className: "need-improvement",
    },
    {
      icon: <SentimentSatisfiedIcon />,
      percentage: "65%",
      label: "Average",
      className: "average",
    },
    {
      icon: <SentimentVerySatisfiedIcon />,
      percentage: "30%",
      label: "Exceptional",
      className: "exceptional",
    },
  ];
  const [avgSentiment, setAvgSentiment] = useState('');
    useEffect(() => {
      getAvgDetails();
    },[data]);
    const getAvgDetails = () => {
  if (data.key_metrics !== undefined ) {
    setAvgSentiment(data.key_metrics.avg_sentiment);
  }
    }
 
  return (
<div>
<Card className="card-container">
<div className="header">
<Typography className="sentiment-title">
            Sentiment Analysis
</Typography>
<Typography className="avg-score">
            Avg <strong> {avgSentiment}</strong>
</Typography>
</div>
 
        <div className="grid-container">
          {sentiments.map((item, index) => (
<div key={index} className={`sentiment-box ${item.className}`}>
              {item.icon}
<Typography className="percentage">{item.percentage}</Typography>
<Typography className={`sentiment-label ${item.className}`}>
                {item.label}
</Typography>
</div>
          ))}
</div>
</Card>
</div>
  );
};
 
export default SentimentAnalysis;