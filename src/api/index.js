import axios from 'axios';

import { API_KEY } from '../apiKey';

const baseUrl = `https://www.googleapis.com/youtube/v3/search?part=id,snippet&maxResults=10&type=video&key=${API_KEY}`;

export const getVideos = async ({ keyword, pageToken }) => {
  console.log({ keyword, pageToken });
  return null;

  // let response = null;
  // try {
  //   response = await axios.get(
  //     `${baseUrl}&q=${keyword}&pageToken=${pageToken}`
  //   );
  // } catch (error) {
  //   console.error(error);
  // }
  // return response.data;
};
