/**
 * @callback ConnectionStateFn
 * @param {"open"|"close"} state
 * @param {any} data
 * @returns {void}
 */

/**
 * @callback ErrorFn
 * @param {any} data
 * @returns {void}
 */

/**
 * @callback MessageFn
 * @param {any} data
 * @returns {void}
 */

/**
 * @typedef {Object} Events
 * @property {ConnectionStateFn[]} connection_state
 * @property {ErrorFn[]} on_error
 * @property {MessageFn[]} on_message
 */

/**
 * test
 * @property {WebSocket} ws
 * @property {Events} events
 */
export class EventConnection {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    console.log(`Connecting to ${url}`);
    /**  */
    this.ws = new WebSocket(url);

    /** @type {Events} */
    const events = (this.events = {
      connection_state: [],
      on_error: [],
      on_message: [],
    });

    this.ws.addEventListener("open", (ev) => {
      console.log("Connection opened", ev);
      events.connection_state.forEach((fn) => fn("open", ev));
    });
    this.ws.addEventListener("close", (ev) => {
      console.log("Connection closed", ev);
      events.connection_state.forEach((fn) => fn("close", ev));
    });
    this.ws.addEventListener("error", (ev) => {
      console.log("Connection error", ev);
      events.on_error.forEach((fn) => fn(ev));
    });
    this.ws.addEventListener("message", (msg) => {
      console.log("Message received", msg);

      const str = msg.data.toString();
      console.log("Buffer converted to string", str);
      msg = JSON.parse(str);
      console.log("Buffer parsed", msg);

      events.on_message.forEach((fn) => fn(msg));
    });
  }

  /**
   *
   * @param {ConnectionStateFn} fn
   */
  on_connection_state(fn) {
    this.events.connection_state.push(fn);
  }

  /**
   *
   * @param {ErrorFn} fn
   */
  on_error(fn) {
    this.events.on_error.push(fn);
  }

  /**
   *
   * @param {MessageFn} fn
   */
  on_message(fn) {
    this.events.on_message.push(fn);
  }
}
