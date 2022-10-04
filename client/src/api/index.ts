import axios from 'axios';

const baseUrl = 'http://127.0.0.1:7000/api';

export const getSubscriptions = async () => {
  return await axios.get(`${baseUrl}/subscriptions`).then((subs) => subs);
};
