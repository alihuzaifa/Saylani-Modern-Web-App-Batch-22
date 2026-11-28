import { createContext } from "react";
export const UserContext = createContext();

const UserProvider = (props) => {

  return (
    <UserContext.Provider value={{ userId: "1234", token: "abc123" }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
