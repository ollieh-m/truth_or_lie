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

  handleErrors = (response) =>{
    // can we get the error message from this response object - response.json() returns a promise resolving the message
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  vote = (vote) => {
    return fetch('/votes',
      this.requestTemplate({vote: vote})
    ).then(
      this.handleErrors
    ).then(response => {
      return response.json()
    })
  }
}
