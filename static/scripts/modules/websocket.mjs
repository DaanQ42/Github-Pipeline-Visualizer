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
 * @typedef {Object} Events
 * @property {ConnectionStateFn[]} connection_state
 * @property {ErrorFn[]} on_error
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
    });

    this.ws.onopen((ev) => {
      events.connection_state.forEach((fn) => fn("open", ev));
    });
    this.ws.onclose((ev) => {
      events.connection_state.forEach((fn) => fn("close", ev));
    });
    this.ws.onerror((ev) => {
      events.on_error.forEach((fn) => fn(ev));
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
}
