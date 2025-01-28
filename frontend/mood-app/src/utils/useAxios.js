import jwtDecode from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../Contexts/AuthContext";
import axios from "axios";

const baseURL = "http://localhost:4000";

const useAxios = () => {
  const { userToken, setUserToken, handleLogout } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  axiosInstance.interceptors.request.use(
    async (req) => {
      if (userToken) {
        req.headers.Authorization = `Bearer ${userToken}`;
      }

      const decodedToken = userToken ? jwtDecode(userToken) : null;

      const isExpired =
        decodedToken && dayjs.unix(decodedToken.exp).diff(dayjs()) < 0;

      if (!isExpired) return req;

      try {
        const response = await axios.post(
          `${baseURL}/refreshtoken`,
          {},
          {
            withCredentials: true,
          }
        );

        const { accessToken } = response.data;

        localStorage.setItem("accesstoken", accessToken);
        setUserToken(accessToken);

        req.headers.Authorization = `Bearer ${accessToken}`;

        return req;
      } catch (error) {
        console.log("Error refreshing token", error);
        handleLogout();
        return Promise.reject(error);
      }
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
