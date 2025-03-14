import { createContext, useState } from "react";

// Create Context
const UserContext = createContext();

// Context Provider Component
export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
