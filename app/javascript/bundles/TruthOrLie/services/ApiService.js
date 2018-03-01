import ActionCable from 'actioncable';

export default class ApiService {
  constructor() {
    // this.cable = ActionCable.createConsumer('/cable');
    // this.subscription = false;
  }

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
// subscribing to actioncable:
// client/app/bundles/Trip/services/TripApi.js
// subscribeTrip = (viewer_uuid, callback) => {
//   this.subscription = this.cable.subscriptions.create({
//     channel: "TripChannel",
//     room: viewer_uuid
//   }, {
//     received: callback
//   });
// }
