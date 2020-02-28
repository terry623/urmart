import axios from 'axios';

import { API_KEY } from '../apiKey';

const baseUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&key=${API_KEY}`;

export const getVideos = async ({ keyword, pageToken }) => {
  try {
    const response = await axios.get(
      `${baseUrl}&q=${keyword}&pageToken=${pageToken}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    alert('出現錯誤，請重新確認你的 API KEY 😥');
    return null;
  }
};
