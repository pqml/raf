'use strict'

/**
 * Limite function calls to a specified framerate
 * @module fpsLimiter
 * @param {number} [framerate=30] Framerate
 * @param {function} callback Function to be called at the specified frame interval
 * @return {function} Framerate-limited function to add to your raf
 * @example
 * import { raf, fpsLimiter } from '@internet/raf'
 *
 * function tick () {
 *   console.log('called each 10 fps')
 * }
 *
 * const limited = fpsLimiter(10, tick)
 * raf.add(limited)
 */
function fpsLimiter (framerate, callback) {
  if (callback === void 0) throw new Error('You must specify a callback')
  if (framerate === void 0) framerate = 30
  var _interval = 1000 / framerate
  var _remainingTime = 0
  var _elapsedTime = 0
  return function (dt) {
    _remainingTime -= dt
    _elapsedTime += dt
    if (_remainingTime <= 0) {
      callback(_elapsedTime)
      _elapsedTime = 0
      _remainingTime = _interval + (_remainingTime % _interval)
    }
  }
}

export default fpsLimiter
