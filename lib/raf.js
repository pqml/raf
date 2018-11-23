'use strict'

/**
 * Core of the raf package
 * @module raf
 * @type {Object}
 * @example
 * import { raf } from '@internet/raf'
 *
 * function tick (dt) {
 *  console.log('called on new frame')
 * }
 *
 * raf.add(tick)
 */

var root = typeof window === 'undefined' ? global : window
var _observers = []
var _afterObservers = []
var _beforeObservers = []
var _rafHandler = null
var _lastDate = null
var _once = false
var _complex = false

/**
 * Time elapsed between the previous and the current frame
 * @type {number}
 * @static
 * @category properties
 */
var time

/**
 * Current delta time
 * @type {number}
 * @static
 * @category properties
 */
var dt

function _frame (timestamp) {
  // compute deltatime and time
  if (timestamp === void 0) timestamp = 0
  if (_lastDate === null) _lastDate = timestamp
  dt = timestamp - _lastDate
  time += dt
  _lastDate = timestamp
  // we request the frame now, allowing to cancel it from observers
  _rafHandler = _once ? null : root.requestAnimationFrame(_frame)
  if (_once) _once = false
  // call all observers
  var i
  if (_complex) {
    for (i = 0; i < _beforeObservers.length; i++) _beforeObservers[i](dt)
    for (i = 0; i < _observers.length; i++) _observers[i](dt)
    for (i = 0; i < _afterObservers.length; i++) _afterObservers[i](dt)
  } else {
    for (i = 0; i < _observers.length; i++) _observers[i](dt)
  }
}

function _swapRunner () {
  _complex = !!(_afterObservers.length > 0 || _beforeObservers.length > 0)
}

function _addObserver (arr, fn, prepend) {
  if (!fn || !arr) return false
  if (~arr.indexOf(fn)) return false
  prepend = !!prepend
  prepend ? arr.unshift(fn) : arr.push(fn)
  return true
}

function _removeObserver (arr, fn) {
  if (!fn) return false
  var index = arr.indexOf(fn)
  if (!~index) return false
  arr.splice(index, 1)
  return !!(arr.length === 0)
}

/**
 * Add a function for execution at the beginning of the raf call
 * Calling addBefore will not start the raf.
 * @param {function} fn Function to be called at the start of the raf
 * @param {function} [prepend=false] Prepend the function to the beginning of the functions list
 * @static
 * @category methods
 */
function addBefore (fn, prepend) {
  _addObserver(_beforeObservers, fn, prepend) && _swapRunner()
}

/**
 * Add a function for execution at the end of the raf call
 * Calling addAfter will not start the raf.
 * @param {function} fn Function to be called at the end of the raf
 * @param {function} [prepend=false] Prepend the function to the beginning of the functions list
 * @static
 * @category methods
 */
function addAfter (fn, prepend) {
  _addObserver(_afterObservers, fn, prepend) && _swapRunner()
}

/**
 * Add a function for execution on each frame
 * @param {function} fn Function to be called
 * @param {function} [prepend=false] Prepend the function to the beginning of the functions list
 * @static
 * @category methods
 */
function add (fn, prepend) {
  _addObserver(_observers, fn, prepend) && start()
}

/**
 * Remove a function for execution at the beginning of the raf call
 * Calling removeBefore will not stop the raf.
 * @param {function} fn Function to remove from the raf
 * @static
 * @category methods
 */
function removeBefore (fn) {
  _removeObserver(_beforeObservers, fn) && _swapRunner()
}

/**
 * Remove a function for execution at the end of the raf call
 * Calling removeAfter will not stop the raf.
 * @param {function} fn Function to remove from the raf
 * @param {function} [prepend=false] Prepend the function to the beginning of the functions list
 * @static
 * @category methods
 */
function removeAfter (fn, prepend) {
  _removeObserver(_afterObservers, fn) && _swapRunner()
}

/**
 * Remove a function for execution on each frame
 * @param {function} fn Function to remove from the raf
 * @static
 * @category methods
 */
function remove (fn) {
  _removeObserver(_observers, fn) && stop()
}

/**
 * Force start the raf. You usually don't need to use it.
 * @param {boolean} [instant=false] Directly make a raf call without waiting for the next frame (default false)
 * @static
 * @category methods
 */
function start (instant) {
  _once = false
  if (_rafHandler) return
  instant = !!instant
  _lastDate = null
  if (instant) _frame()
  else _rafHandler = root.requestAnimationFrame(_frame)
}

/**
 * Request once the raf. Will not be executed if the raf is already running.
 * @static
 * @category methods
 */
function requestOnce () {
  if (_rafHandler) return
  _once = true
  _lastDate = null
  _rafHandler = root.requestAnimationFrame(_frame)
}

/**
 * Force stop the raf. You usually don't need to use it.
 * @static
 * @category methods
 */
function stop () {
  if (!_rafHandler) return
  root.cancelAnimationFrame(_rafHandler)
  _rafHandler = null
}

/**
 * Remove all observers from the raf singleton and stop the raf if it's running. Reset time.
 * @static
 * @category methods
 */
function dispose () {
  stop()
  _observers.length = 0
  _afterObservers.length = 0
  _beforeObservers.length = 0
  _complex = false
  _lastDate = null
  time = 0
  dt = 0
}

export default {
  add: add,
  addAfter: addAfter,
  addBefore: addBefore,
  remove: remove,
  removeAfter: removeAfter,
  removeBefore: removeBefore,
  start: start,
  stop: stop,
  time: time,
  dt: dt,
  requestOnce: requestOnce,
  dispose: dispose
}
