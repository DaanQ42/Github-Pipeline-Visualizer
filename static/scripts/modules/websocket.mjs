export class EventConnection {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    console.log(`Connecting to ${url}`);
    /**  */
    this.ws = new WebSocket(url);
  }

  on(event, callback) {
    this.ws.on(event, callback);
  }
}
