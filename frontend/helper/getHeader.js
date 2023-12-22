import useAuth from "../hooks/useAuth";

const getHeader = () => {
  const { auth } = useAuth();
  if (auth.authToken) {
    return `Bearer ${auth.authToken}`;
  }
  return "";
};

export default getHeader;
