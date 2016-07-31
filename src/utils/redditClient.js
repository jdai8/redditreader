function get(url, params = '?limit=20&raw_json=1') {

  return new Promise(resolve => {

    const client = new XMLHttpRequest();
    client.responseType = 'json';

    client.onload = () => {
      resolve(client.response);
    };

    client.open('GET', `https://www.reddit.com${url}.json${params}`);
    client.send();

  });

}

export default { get };
