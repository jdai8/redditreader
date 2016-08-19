import cookies from 'js-cookie';
import axios from 'axios';

function get(url, params) {

  return axios.get(`https://oauth.reddit.com${url}.json`, {
    params,
    headers: {
      'Authorization': `bearer ${cookies.get('accessToken')}`, // eslint-disable-line
    },
  }).then(response => {
    if (response.status === 200) {
      return response.data;
    }
    return null;
  });
}

export default { get };
