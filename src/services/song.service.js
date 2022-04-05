import axios from "axios";
import config from "../config";

export const getSongResult = async (query) => {
  const response = await axios(`${config.searchUrl}/search?term=${query}`);
  return response?.data?.results[0];
}

export const getSongCollection = async (id) => {
  const response = await axios(`${config.searchUrl}/lookup?id=${id}`);
  return response?.data?.results[0];
} 