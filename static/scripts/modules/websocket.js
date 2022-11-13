export class EventConnection {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    this.ws = new WebSocket(url);
  }
}
