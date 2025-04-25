import React, { createContext, useState } from 'react';
import dayjs from 'dayjs';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [analysisResults, setAnalysisResults] = useState('');
  const [analysisOverview, setAnalysisOverview] = useState('');
  const [loading, setLoading] = useState(true);

  const [startDate,setstartDate] = useState('');
  const [endDate,setEndDate] =useState('');;

  const fetchDataFromAPI = async (from,to) => {
    console.log(from,to);
    // const start = dayjs(from).format('MM/DD/YYYY')+" 00:00"
    // const end = dayjs(to).format('MM/DD/YYYY')+" 00:00"
    // console.log(start,end);
    setstartDate(from);
    setEndDate(to);
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

      const response = await fetch(
        `http://52.12.103.246:8009/get-conversation-exports?start_date=${from}&end_date=${to}`,
        requestOptions
      );

      const result = await response.json();
      console.log("Export result:", result);

      if (result) {
        await analyzeBatch(from,to);
      }

    } catch (error) {
      console.error("fetchDataFromAPI error:", error);
    }
  };

  const analyzeBatch = async (from,to) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Basic YWRtaW46cGFzc3dvcmQ=");

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch("http://52.12.103.246:8009/analyze-all", requestOptions);
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

      const result = await fetch(`http://52.12.103.246:8009/analysis-results?start_date=${from}&end_date=${to}`, requestOptions)
        .then(res => res.json());

      console.log("Table result:", result);
      localStorage.setItem("totalConv", result.total_analyzed);

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

      const result = await fetch(`http://52.12.103.246:8009/analytics-overview?start_date=${from}&end_date=${to}`, requestOptions)
        .then(res => res.json());

      console.log("Overview result:", result);
      setAnalysisOverview(result);
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
      fetchDataFromAPI
    }}>
      {children}
    </DataContext.Provider>
  );
};
