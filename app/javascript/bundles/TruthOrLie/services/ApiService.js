export default class ApiService {
  requestTemplate = (body) => {
    return {
      method: 'post',
      headers: new Headers({
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }),
      body: JSON.stringify(body),
      credentials: 'same-origin'
    }
  }

  parseJSON = (response) => {
    return new Promise((resolve) => response.json()
      .then((json) => resolve({
        status: response.status,
        ok: response.ok,
        json,
      })));
  }

  request = (endpoint, options) => {
    return new Promise((resolve, reject) => {
      fetch(endpoint, options)
        .then(this.parseJSON)
        .then((response) => {
          if (response.ok) {
            return resolve(response.json);
          }
          // extract the error from the server's json
          return reject(response.json.reason);
        })
        .catch((error) => reject({
          networkError: error.message,
        }));
    });
  }

  vote = (vote) => {
    return this.request('/votes',
      this.requestTemplate({vote: vote})
    )
  }
}
