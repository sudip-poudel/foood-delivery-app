import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import getCurrentUser from "../../helper/getCurrentUser";
export const AuthContext = createContext({
  auth: {},
  setAuth: () => {},
});

const AuthProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies(["authToken"]);
  const [auth, setAuth] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      if (cookies.authToken) {
        const user = await getCurrentUser(cookies.authToken);
        const data = {
          user,
          authToken: cookies.authToken,
        };
        setAuth(data);
      }
    };
    fetchData();
  }, []);
  console.log(cookies.authToken);
  // console.log(authToken);
  // const authToken =
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
