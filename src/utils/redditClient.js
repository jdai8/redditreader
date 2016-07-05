function get(url) {

    return new Promise((resolve, reject) => {

        const client = new XMLHttpRequest();
        client.responseType = 'json';
        client.onload = () => {

            if (client.status === 200) {
                resolve(client.response);
            }
        };
        client.open('GET', '/api' + url);
        client.send();
    });
}

export default { get };
