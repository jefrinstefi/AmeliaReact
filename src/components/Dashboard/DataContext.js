import React, { createContext, useState } from 'react';
import dayjs from 'dayjs';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [analysisResults, setAnalysisResults] = useState('');
  const [analysisOverview, setAnalysisOverview] = useState('');
  const [businessMetrics,setBusinessMetrics] = useState('')
  const [loading, setLoading] = useState(true);
  const [businessIntents,setBusinessIntents]= useState('');
  const [startDate,setstartDate] = useState('');
  const [endDate,setEndDate] =useState('');;

  // const fetch
  // try {
  //   const username = "admin";
  //   const password = "password";
  //   const credentials = btoa(`${username}:${password}`);

  //   const requestOptions = {
  //     method: "POST",
  //     headers: {
  //       Authorization: "Basic " + credentials,
  //       Accept: "application/json"
  //     },
  //   };

  //   const response = await fetch(
  //     `https://ameliaapp.sincera.net/api/get-conversation-exports?start_date=${from}&end_date=${to}`,
  //     requestOptions
  //   );

  //   const result = await response.json();
  //   console.log("Export result:", result);

  //   if (result) {
  //     await getDetails(from,to);
  //   }

  // } catch (error) {
  //   console.error("fetchDataFromAPI error:", error);
  // }

  const fetchDataFromAPI = async (from,to,type) => {
    console.log(from,to);
    setLoading(true);
      setstartDate(from);
    setEndDate(to);
    if(type === 'process') {
      await fetchTableData(from,to);

    } else {
    try {
      const username = "admin";
      const password = "password";
      const credentials = btoa(`${username}:${password}`);

      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: "Basic " + credentials,
          Accept: "application/json"
        },
      };
      const response = await fetch(
        `https://ameliaapp.sincera.net/api/get-analysis-dates-from-db`,
        requestOptions
      );

      const result = await response.json();
      console.log("Export result:", result);

      if (result.status === 'success') {
        const todayString = result.analytics_datarange_in_db[0].MaxDate; // e.g., "04/14/2025 10:10"
const today = new Date(todayString);
const sevenDaysAgo = new Date(today);
sevenDaysAgo.setDate(today.getDate() - 7);

// Format manually to 'MM/DD/YYYY HH:mm'
const formatTwoDigits = (num) => num.toString().padStart(2, '0');

const formattedDate = `${formatTwoDigits(sevenDaysAgo.getMonth() + 1)}/` +
                      `${formatTwoDigits(sevenDaysAgo.getDate())}/` +
                      `${sevenDaysAgo.getFullYear()} ` +
                      `${formatTwoDigits(sevenDaysAgo.getHours())}:` +
                      `${formatTwoDigits(sevenDaysAgo.getMinutes())}`;

console.log(formattedDate); // e.g., "04/07/2025 10:10";
localStorage.setItem("startDate",result.analytics_datarange_in_db[0].MinDate );
localStorage.setItem('endDate',result.analytics_datarange_in_db[0].MaxDate)
        await fetchTableData(formattedDate,result.analytics_datarange_in_db[0].MaxDate);
      }

    } catch (error) {
      console.error("fetchDataFromAPI error:", error);
    }
  }
  };

  const getDetails = async (from,to) => {
    try {
      const username = "admin";
      const password = "password";
      const credentials = btoa(`${username}:${password}`);

      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: "Basic " + credentials,
          Accept: "application/json"
        },
      };

      const result = await fetch(`https://ameliaapp.sincera.net/api/conversations`, requestOptions)
        .then(res => res.json());

      // console.log("Table result:", result);
      // localStorage.setItem("totalConv", result.total_analyzed);

      // setAnalysisResults(result);

      await analyzeBatch(from,to);
    } catch (error) {
      console.error("fetchTableData error:", error);
    }
  }

  const analyzeBatch = async (from,to) => {
    console.log(from,to)

    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Basic YWRtaW46cGFzc3dvcmQ=");

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch( `https://ameliaapp.sincera.net/api/analyze-all?start_date=${from}&end_date=${to}`, requestOptions);
      const result = await response.json();

      console.log("Analyze result:", result);

      if (result.status === 'success') {
        await fetchTableData(from,to);
      }
    } catch (error) {
      console.error("analyzeBatch error:", error);
    }
  };

  const fetchTableData = async (from,to) => {
    console.log(from,to)
    try {
      const username = "admin";
      const password = "password";
      const credentials = btoa(`${username}:${password}`);

      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: "Basic " + credentials,
          Accept: "application/json"
        },
      };

      const result = await fetch(`https://ameliaapp.sincera.net/api/get-analytics-data?start_date=${from}&end_date=${to}`, requestOptions)
        .then(res => res.json());

      console.log("Table result:", result);
      localStorage.setItem("totalConv", result.results.length);

      setAnalysisResults(result);

      await fetchOverview(from,to);
    } catch (error) {
      console.error("fetchTableData error:", error);
    }
  };

  const fetchOverview = async (from,to) => {
    try {
      const username = "admin";
      const password = "password";
      const credentials = btoa(`${username}:${password}`);

      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: "Basic " + credentials,
          Accept: "application/json"
        },
      };

      const result = await fetch(`https://ameliaapp.sincera.net/api/analytics-overview?startdate=${from}&enddate=${to}`, requestOptions)
        .then(res => res.json());

      console.log("Overview result:", result);
      setAnalysisOverview(result);
      await fetchBusinessMetrics(from,to);

      // setLoading(false);
    } catch (error) {
      console.error("fetchOverview error:", error);
    }
  };
  const fetchBusinessMetrics = async (from,to) => {
    try {
      const username = "admin";
      const password = "password";
      const credentials = btoa(`${username}:${password}`);

      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: "Basic " + credentials,
          Accept: "application/json"
        },
      };

      const result = await fetch(`https://ameliaapp.sincera.net/api/get-business-metrics?start_date=${from}&end_date=${to}`, requestOptions)
        .then(res => res.json());

      console.log("Overview result:", result);
      setBusinessMetrics(result);
      await fetchBusinessIntents(from,to)
      // setLoading(false);
    } catch (error) {
      console.error("fetchOverview error:", error);
    }
  };
  const fetchBusinessIntents = async (from,to) => {
    try {
      const username = "admin";
      const password = "password";
      const credentials = btoa(`${username}:${password}`);

      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: "Basic " + credentials,
          Accept: "application/json"
        },
      };

      const result = await fetch(`http://52.12.103.246:8009/get-conversation-intent?start_date=${from}&end_date=${to}`, requestOptions)
        .then(res => res.json());

      console.log("Overview result:", result);
      setBusinessIntents(result);
      setLoading(false);
    } catch (error) {
      console.error("fetchOverview error:", error);
    }
  };

  return (
    <DataContext.Provider value={{
      analysisResults,
      analysisOverview,
      loading,
      businessMetrics,
      businessIntents,
      fetchDataFromAPI
    }}>
      {children}
    </DataContext.Provider>
  );
};
