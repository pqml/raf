'use strict'

/**
 * @module raf
 */

var _win = window || global
var _observers = []
var _afterObservers = []
var _beforeObservers = []
var _rafHandler = null
var _lastDate = null
var _once = false
var _complex = false

/**
 * @property {number} time Time elapsed between the previous and the current frame
 */
var time

/**
 * @property {number} dt Time elapsed
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
  _rafHandler = _once ? null : _win.requestAnimationFrame(_frame)
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
 */
function addBefore (fn, prepend) {
  _addObserver(_beforeObservers, fn, prepend) && _swapRunner()
}

/**
 * Add a function for execution at the end of the raf call
 * Calling addAfter will not start the raf.
 * @param {function} fn Function to be called at the end of the raf
 * @param {function} [prepend=false] Prepend the function to the beginning of the functions list
 */
function addAfter (fn, prepend) {
  _addObserver(_afterObservers, fn, prepend) && _swapRunner()
}

/**
 * Add a function for execution on each frame
 * @param {function} fn Function to be called
 * @param {function} [prepend=false] Prepend the function to the beginning of the functions list
 */
function add (fn, prepend) {
  _addObserver(_observers, fn, prepend) && start()
}

/**
 * Remove a function for execution at the beginning of the raf call
 * Calling removeBefore will not stop the raf.
 * @param {function} fn Function to remove from the raf
 */
function removeBefore (fn) {
  console.log('remove')
  _removeObserver(_beforeObservers, fn) && _swapRunner()
}

/**
 * Remove a function for execution at the end of the raf call
 * Calling removeAfter will not stop the raf.
 * @param {function} fn Function to remove from the raf
 * @param {function} [prepend=false] Prepend the function to the beginning of the functions list
 */
function removeAfter (fn, prepend) {
  _removeObserver(_afterObservers, fn) && _swapRunner()
}

/**
 * Remove a function for execution on each frame
 * @param {function} fn Function to remove from the raf
 */
function remove (fn) {
  _removeObserver(_observers, fn) && stop()
}

/**
 * Force start the raf. You usually don't need to use it.
 * @param {boolean} [instant=false] Directly make a raf call without waiting for the next frame (default false)
 */
function start (instant) {
  _once = false
  if (_rafHandler) return
  instant = !!instant
  _lastDate = null
  if (instant) _frame()
  else _rafHandler = _win.requestAnimationFrame(_frame)
}

/**
 * Request once the raf. Will not be executed if the raf is already running.
 */
function requestOnce () {
  if (_rafHandler) return
  _once = true
  _rafHandler = _win.requestAnimationFrame(_frame)
}

/**
 * Force stop the raf. You usually don't need to use it.
 */
function stop () {
  if (!_rafHandler) return
  _win.cancelAnimationFrame(_rafHandler)
  _rafHandler = null
}

export default { add, remove, start, stop, addAfter, addBefore, removeAfter, removeBefore, time, dt, requestOnce }
