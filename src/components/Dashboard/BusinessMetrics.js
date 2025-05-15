import React, { useEffect , useState} from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import {
  Card,
  CardContent,
  Typography,
  Box,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
 
const data = [
  {
    store: '200',
    Appointment_Booked: 0,
    Appointment_Canceled: 0,
    Appointment_Lookup: 0,
    Appointment_Reschedule: 12,
  },
  {
    store: '360',
    Appointment_Booked: 250,
    Appointment_Canceled: 120,
    Appointment_Lookup: 225,
    Appointment_Reschedule: 140,
  },
  {
    store: '478',
    Appointment_Booked: 240,
    Appointment_Canceled: 100,
    Appointment_Lookup: 170,
    Appointment_Reschedule: 180,
  },
  {
    store: '598',
    Appointment_Booked: 200,
    Appointment_Canceled: 80,
    Appointment_Lookup: 190,
    Appointment_Reschedule: 150,
  },
  {
    store: '687',
    Appointment_Booked: 190,
    Appointment_Canceled: 140,
    Appointment_Lookup: 200,
    Appointment_Reschedule: 130,
  },
 
  // Add more data points here if required
];
 
const legendItems = [
  { key: 'Appointment_Booked', color: '#27BBE2' }, // Changed color
  { key: 'Appointment_Canceled', color: '#3A4B6F' }, // Changed color
  { key: 'Appointment_Lookup', color: '#8C7BC0' }, // Changed color
  { key: 'Appointment_Reschedule', color: '#BAB2D0' }, // Changed color
];
 
const BusinessMetricsChart = (message) => {
  const [chartData, setChartData] = useState(data); // Start with default data
  const [domain, setDomain] = useState([0, 10]);
  const [ticks, setTicks] = useState([0, 2, 4, 6, 8, 10]);
    console.log(message);
    useEffect(() => {
      if (message?.data?.business_stats?.queries_per_stores?.length) {
        const transformed = message.data.business_stats.queries_per_stores.map((store) => {
          const stats = store.store_list || {};
          return {
            store: store.custom_store_number,
            Appointment_Booked: stats.appointment_book || 0,
            Appointment_Canceled: stats.appointment_cancel || 0,
            Appointment_Lookup: stats.appointment_lookup || 0,
            Appointment_Reschedule: stats.appointment_reschedule || 0,
            conversations: store.conversations ?? 0,
            stored: store.custom_store_number

          };
        });
        const allValues = transformed.flatMap(store => [
          store.Appointment_Booked,
          store.Appointment_Canceled,
          store.Appointment_Lookup,
          store.Appointment_Reschedule,
        ]);
      
        // Find the maximum value from all values
        const maxValue = Math.max(...allValues);
      
        console.log("Maximum Value:", maxValue);
        if (maxValue > 0) {
          const domainMax = Math.ceil(maxValue / 10) * 10;
          const newDomain = [0, domainMax];
          const newTickStep = domainMax / 5;
          const newTicks = Array.from({ length: 6 }, (_, i) => i * newTickStep);
          setDomain(newDomain);
          setTicks(newTicks);
        } else {
          // Reset to default
          setDomain([0, 10]);
          setTicks([0, 2, 4, 6, 8, 10]);
        }
    
      
        console.log("Domain:", domain);
        console.log("Ticks:", ticks);
      
        setChartData(transformed);
      }
    }, [message]);
  //   const CustomTooltip = ({payload }) => {
  //     if (sentimentLoaded &&payload.length) {
  //      const { message_id, sentiment } = payload[0].payload; // Extract values dynamically
 
  //      return (
  //  <div style={{ background: "#968BB3", padding: "10px 16px", borderRadius: "5px" }}>
 
  //  <p style={{ color:"#fff" ,margin:"0"}}>{`Msg_id : ${message_id}`}</p>
  //  <p style={{ color: "#fff" ,margin:"0"}}>{`Sentiment : ${sentiment}`}</p>
  //  </div>
  //      );
  //     }
  //    return null;
  //  };
    // const conversations = "238 30 con";
    
const filteredLegendItems = legendItems.filter(item =>
  chartData.some(entry => entry[item.key] > 0)
);
    const CustomXAxisTick = ({ x, y, payload }) => {
      const label = payload.value; // e.g., "238 30 con"
      const [firstLine, ...rest] = label.split(' ');
      const secondLine = rest.join(' '); // "30 con"
    
      return (
        <g transform={`translate(${x},${y})`}>
          <text x={0} y={0} dy={16} textAnchor="middle" fill="#333" fontSize={12} >
            <tspan x={0} dy={0}>{firstLine}</tspan>
            <tspan x={0} dy={14}>{secondLine}</tspan>
          </text>
        </g>
      );
    };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
 
  const renderCustomLegend = () => {
    const fontSize = isMobile ? 11 : isTablet ? 13 : 15;
    const rectWidth = isMobile ? 16 : isTablet ? 20 : 28;
    const rectHeight = isMobile ? 12 : isTablet ? 14 : 18;
    const spacing = isMobile ? 10 : 14;
 
    if (isMobile) {
      // Two columns on mobile
      const firstCol = legendItems.slice(0, Math.ceil(legendItems.length / 2));
      const secondCol = legendItems.slice(Math.ceil(legendItems.length / 2));
 
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            padding: '0 10px',
            width: '100%',
          }}
        >
          {[firstCol, secondCol].map((col, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: spacing }}>
              {col.map((item) => (
                <div
                  key={item.key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <div
                    style={{
                      width: rectWidth,
                      height: rectHeight,
                      backgroundColor: item.color,
                      borderRadius: 3,
                    }}
                  />
                  <span
                    style={{
                      fontSize,
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.key.replace(/_/g, ' ')}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    }
 
    // Desktop and tablet - single column
    return (
      <div
        style={{
          fontSize,
          display: 'flex',
          flexDirection: 'column',
          gap: spacing,
          paddingLeft: 12,
          paddingRight: 12,
          minWidth: isTablet ? 130 : 160,
        }}
      > v
        {legendItems.map((item) => (
          <div
            key={item.key}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <div
              style={{
                width: rectWidth,
                height: rectHeight,
                backgroundColor: item.color,
                borderRadius: 3,
              }}
            />
            <span
              style={{
                whiteSpace: 'nowrap',
                fontSize,
                fontWeight: 500,
              }}
            >
              {item.key.replace(/_/g, ' ')}
            </span>
          </div>
        ))}
      </div>
    );
  };
 
  return (
    <Card sx={{ m: 0,mb:3, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography
          variant={isMobile ? 'subtitle1' : 'h6'}
          fontWeight={600}
          gutterBottom
          color="#616163"
        >
          Business Metrics
        </Typography>
        <Box
          sx={{
            width: '100%',
            height: isMobile ? 340 : isTablet ? 360 : 400,
           
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: isMobile ? 10 : isTablet ? 50 : 120, // Reduced space on right side
                left: isMobile ? 10 : 40, // Space on the left
                bottom: 70, // Increased bottom margin
              }}
              barCategoryGap="10%"
            >
              <CartesianGrid strokeDasharray="none" vertical={false} />
              <XAxis
                dataKey="stored"
                tick={{ fontSize: isMobile ? 10 : 12, fill: '#333' }}
                
                tickLine={false}
                axisLine={{ stroke: '#616163', strokeWidth: 2 }} // black X-axis base
                label={{
                  value: 'Store Number',
                  position: 'insideBottom',
                  offset: -10,
                  fontSize: isMobile ? 11 : 13,
                  fill: '#222222',
                  fontWeight: 600,
                }}
              />
              <YAxis
                domain={domain}
                ticks={ticks}
                tick={{ fontSize: isMobile ? 10 : 12, fill: '#333' }}
                tickLine={false}
                axisLine={false}
                label={{
                  value: 'Store Status Count',
                  angle: -90,
                  position: 'insideLeft',
                  offset: 10,
                  fontSize: isMobile ? 11 : 13,
                  fill: '#222222',
                  fontWeight: 600,
                  textAnchor: 'start',
                  dx: -20,
                }}
              />
              <Tooltip />
              <Legend
                verticalAlign="middle"
                align="right"
                layout="vertical"
                content={renderCustomLegend}
                wrapperStyle={{
                  // marginLeft: isTablet ? '80px' : '100px', // Increased left margin for legend
                  paddingLeft:"40px",
                }}
              />
             {filteredLegendItems.map((item) => (
  <Bar
    key={item.key}
    dataKey={item.key}
    fill={item.color}
    barSize={isMobile ? 8 : isTablet ? 10 : 14}
   
  >
    <LabelList
      dataKey={item.key}
      position="top"
      fontSize={isMobile ? 8 : 10}
      dy={-4}
      formatter={(value) => (value > 0 ? value : '')}
    />
  </Bar>
              ))}
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};
 
export default BusinessMetricsChart;
 
 