/**
 * @module RafTimer
 */

/**
 * Create a new RafTimer instance.
 * @class RafTimer
 * @param {number} delay Number of milliseconds before executing the callback.
 * @param {Function} cb Callback function executed when the timer hit 0. For convenience, a restart method will be passed as 1st arg of the cb function.
 * @param {boolean} [autostart=true] Optional (default true). Auto-start the timer (Don't need to call start() method).
 * @example
 * import { raf, RafTimer } from '@internet/raf'
 *
 * const timer = new RafTimer(2000, restart => {
 *   console.log('Will be logged after 2000ms')
 *   restart() // Restart the timer. onDone will be called after another 2000ms.
 * })
 *
 * raf.add(dt => timer.update(dt))
 */
function RafTimer (delay, cb, autostart) {
  if (autostart === void 0) autostart = true

  this._stopped = !autostart
  this._remainder = 0
  this._delay = delay | 0
  this._remainingTime = delay
  this._callback = cb === undefined ? function () {} : cb

  // fast binding
  var restart = this.restart
  var self = this
  this.restart = function (n, u) { restart.call(self, n, u) }

  if (this._delay === 0) this._stopped = true
}

/**
 * Set a new callback function.
 * @method
 * @param {function} newCallback New callback function. For convenience, a restart method will be passed as 1st arg of the cb function.
 * @param {number} [newDelay] Optional. Set a new delay (in ms). If set, the timer will be restarted
 */
RafTimer.prototype.setCallback = function setCallback (newCallback, newDelay) {
  this._callback = newCallback === undefined ? function () {} : newCallback
  if (newDelay) this.restart(newDelay)
}

/**
 * Stop the timer. update() calls will do nothing.
 * @method
 */
RafTimer.prototype.stop = function stop () {
  this._stopped = true
}

/**
 * Start the timer if stopped.
 * @method
 */
RafTimer.prototype.start = function start () {
  if (!this._stopped) return
  this.restart()
}

/**
 * Restart the timer
 * @method
 * @param {number} newDelay
 * @param {boolean} [useRemainder=true] Optional (default true). Use deltatime's remainder from the last time the timer hits 0.
 */
RafTimer.prototype.restart = function restart (newDelay, useRemainder) {
  if (useRemainder === void 0) useRemainder = true

  if (newDelay !== undefined) this._delay = newDelay
  this._stopped = false
  this._remainingTime = this._delay - (this._remainder * (+useRemainder))
}

/**
 * Update remaining time. Usually executed inside a requestAnimationFrame call.
 * @method
 * @param {number} dt Time elapsed since the last call (in ms).
 */
RafTimer.prototype.update = function update (dt) {
  if (this._stopped) return
  this._remainingTime -= dt
  if (this._remainingTime <= 0) {
    this._stopped = true
    this._remainder = (-this._remainingTime) % this._delay
    this._callback(this.restart)
  } else {
    this._remainder = 0
  }
}

/**
 * Stop the timer and remove callback reference
 * @method
 */
RafTimer.prototype.dispose = function dispose () {
  this._callback = this.restart = function () {}
  this._stopped = true
  this._remainder = 0
  this._remainingTime = this._delay
}

export default RafTimer
