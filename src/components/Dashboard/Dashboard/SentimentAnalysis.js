import React , {useEffect,useState} from "react";
import './SentimentAnalysis.css' // Import CSS
import { Card, Typography } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
 
const SentimentAnalysis = (message) => {
  const [sentiments,setsentiments] = useState([
    {
      icon: <SentimentVeryDissatisfiedIcon />,
      percentage: "5%",
      label: "Bad (0 to 2.5)",
      className: "bad",
    },
    {
      icon: <SentimentDissatisfiedIcon />,
      percentage: "10%",
      label: "Improve (2.5 to 5)",
      className: "need-improvement",
    },
    {
      icon: <SentimentSatisfiedIcon />,
      percentage: "65%",
      label: "Average (5 to 7.5)",
      className: "average",
    },
    {
      icon: <SentimentVerySatisfiedIcon />,
      percentage: "30%",
      label: "Good (7.5 to 10)",
      className: "exceptional",
    },
  ]);
  const [avgSentiment, setAvgSentiment] = useState('');
    useEffect(() => {
      getDuration()
    },[]);
  
    const getDuration = () => {
      console.log(message);
      if (message.Avg.key_metrics !== undefined ) {
        setAvgSentiment(message.Avg.key_metrics.avg_sentiment);
      }   
      
      const totals = message.data.reduce((acc, obj) => {
        acc.totalDuration += obj.Duration_Seconds;
              acc.totalAmeliaMessages += obj.Amelia_Messages_Count;
        acc.totalUserMessages += obj.User_Messages_Count;
        if (obj.Sentiment_Score >= 7.5) {
          acc.sentimentdata.good++;
        } else if (obj.Sentiment_Score < 7.5 && obj.Sentiment_Score >= 5) {
          acc.sentimentdata.average++;
        } else if (obj.Sentiment_Score < 5 && obj.Sentiment_Score >= 2.5) {
          acc.sentimentdata.needToImprove++;
        } else {
          acc.sentimentdata.bad++;
        }
        return acc;
      }, { 
        totalDuration: 0, 
        totalAmeliaMessages: 0, 
        totalUserMessages: 0, 
        sentimentdata: { bad: 0, needToImprove: 0, average: 0, good: 0 }
      });
       
      console.log("total",totals);
      const sentimentData = totals.sentimentdata
      const totalSentiments = Object.values(sentimentData).reduce((sum, value) => sum + value, 0);
const percentages = Object.fromEntries(
    Object.entries(sentimentData).map(([key, value]) => [
        key, totalSentiments === 0 ? 0 : ((value / totalSentiments) * 100).toFixed(2) + "%"
    ])
);
 
console.log(percentages);
const updatevalues = sentiments.map(function(item) {
  if(item.label === "Bad (0 to 2.5)") {
    item.percentage = percentages.bad;
  } else if(item.label === "Improve (2.5 to 5)") {
    item.percentage = percentages.needToImprove;
  } else if(item.label === "Average (5 to 7.5)") {
    item.percentage = percentages.average;
  } else if(item.label === "Good (7.5 to 10)") {
    item.percentage = percentages.good;
  }
  return item;
});
console.log('uypdate',updatevalues);
setsentiments(updatevalues)
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