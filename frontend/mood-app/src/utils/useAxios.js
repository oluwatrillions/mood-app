import jwtDecode from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../Contexts/AuthContext";
import axios from "axios";

const baseURL = "http://localhost:4000";

const useAxios = () => {
  const { userToken, setUserToken, user, setUser, handleLogout } =
    useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL,
    credentials: "include",
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
      //   const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

      const decodedToken = userToken ? jwtDecode(userToken) : null;

      const isExpired =
        decodedToken && dayjs.unix(decodedToken.exp).diff(dayjs()) < 10;

      if (!isExpired) return req;

      try {
        const response = await fetch(`${baseURL}/refreshtoken`, {
          method: "POST",
          credentials: "include",
        });

        if (!response.ok) {
          handleLogout(); // Logout user if token refresh fails
          throw new Error("Failed to refresh token");
        }
        const newAccess = await response.json();
        console.log(newAccess);

        const newAccessToken = newAccess.accessToken;

        localStorage.setItem("accesstoken", newAccessToken);
        setUserToken(newAccessToken);

        req.headers.Authorization = `Bearer ${newAccessToken}`;

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
