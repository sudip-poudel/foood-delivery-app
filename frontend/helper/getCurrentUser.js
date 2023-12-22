import axios from "axios";

const getCurrentUser = async (authToken) => {
  const response = await axios.get(
    `${import.meta.env.VITE_REACT_API_URL}/currentuser`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  const user = response.data;
  console.log(user, "getuser");
  return user;
};

export default getCurrentUser;
