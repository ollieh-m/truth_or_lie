import ActionCable from 'actioncable';

export default class WebSocketsService {
  constructor(){
    this.cable = ActionCable.createConsumer('/cable');
    this.subscription = false;
  }

  subscribe = (callback) => {
    this.subscription = this.cable.subscriptions.create({
      channel: "RevealAndRestartChannel"
    }, {
      received: callback
    }, {
      connected: () => {
        console.log("CONNECTED");
      }
    });
  }
}


