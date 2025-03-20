import { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);  // Store user credentials

  const fetchData = async () => {
    setLoading(true);
    const username = "admin";
    const password ="password";
    const credentials = btoa(`${username}:${password}`);
    // setUser(credentials);


    try {
      const response = await fetch("http://52.12.103.246:8502/analytics-overview", {
        method: "GET",
        headers: {
          Authorization: "Basic " + credentials,
          Accept: "application/json",
        },
      });

      const result = await response.json();
      console.log("API Response:", result); // Debugging

      if (result) {
        setData(result); // ✅ Updating the context
      } else {
        console.error("API did not return success");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Automatically fetch data when the provider mounts
  }, []);

  return (
    <DataContext.Provider value={{ data, fetchData, loading}}>
      {children}
    </DataContext.Provider>
  );
};
