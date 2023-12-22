import { useContext } from "react";
import { AuthContext } from "../src/store/AuthContext";
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
