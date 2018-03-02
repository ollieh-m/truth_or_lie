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

  vote = (vote) => {
    return fetch('/votes',
      this.requestTemplate({vote: vote})
    ).then(response => {
      return response.json()
    }).catch(error => {
      console.log(error)
    });
  }
}
