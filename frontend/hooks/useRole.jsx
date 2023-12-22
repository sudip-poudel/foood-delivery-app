import axios from "axios";

async function useRole(token) {
  try {
    const response = await axios.post(
      `${process.env.VITE_REACT_API_URL}/validate-token`,
      null,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    if (response.data.success) return response.data.data;
  } catch (error) {
    console.error("Error validating token:", error);
    return null;
  }
}
export default useRole;
