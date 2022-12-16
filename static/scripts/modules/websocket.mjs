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
 * @typedef {Object} WorkflowJob
 * @property {string} conclusion
 * @property {string} id
 * @property {string[]} labels
 * @property {"queued"|"in_progress"|"completed"} status
 * @property {WorkflowJobStep[]} steps
 */

/**
 * @typedef {Object} WorkflowJobStep
 * @property {string} completed_at
 * @property {string} conclusion
 * @property {string} name
 * @property {number} number
 * @property {string} started_at
 * @property {"queued"|"in_progress"|"completed"} status
 */

/**
 * @typedef {Object} WorkflowJobFn
 * @property {WorkflowJob} data
 * @returns {void}
 */

/**
 * @typedef {Object} Events
 * @property {ConnectionStateFn[]} connection_state
 * @property {ErrorFn[]} on_error
 * @property {MessageFn[]} on_message
 * @property {WorkflowJobFn[]} workflow_update
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
      workflow_update: [],
    });

    this.ws.addEventListener("open", (ev) => {
      events.connection_state.forEach((fn) => fn("open", ev));
    });
    this.ws.addEventListener("close", (ev) => {
      events.connection_state.forEach((fn) => fn("close", ev));
    });
    this.ws.addEventListener("error", (ev) => {
      events.on_error.forEach((fn) => fn(ev));
    });
    this.ws.addEventListener("message", (msg) => {
      if (msg.data instanceof Blob) {
        msg.data.text().then((text) => {
          const data = JSON.parse(text);
          events.on_message.forEach((fn) => fn(data));

          switch (data.type) {
            case "workflow":
              events.workflow_update.forEach((fn) => fn(data.data));
              break;
          }
        });
      }
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

  /**
   * @param {WorkflowJobFn} fn
   */
  workflow_update(fn) {
    this.events.workflow_update.push(fn);
  }
}
