import axios from "axios";
import config from "../config";

export const getAccessToken = async (identity) => {
  const response = await axios(`${config.authTokenUrl}?identity=${identity}`);
  return response?.data?.accessToken;
}