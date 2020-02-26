import axios from 'axios';

import { API_KEY } from '../../apiKey';

const baseUrl = 'https://www.googleapis.com/youtube/v3/search';

export const getVideosByKeyword = async (keyword, page) => {
  let response = null;
  try {
    response = await axios.get(
      `${baseUrl}?part=id,snippet&q=${keyword}&key=${API_KEY}`
    );
  } catch (error) {
    console.error(error);
  }
  return response.data;
};
