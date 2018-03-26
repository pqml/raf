/**
 * @module raf
 */

var _observers = []
var _afterObservers = []
var _beforeObservers = []
var _rafHandler = null
var _lastDate = null
var _runner = _simpleRun

function _simpleRun (timestamp) {
  if (timestamp === void 0) timestamp = 16.67 // default 60fps
  if (_lastDate === null) _lastDate = timestamp
  var _delta = timestamp - _lastDate
  _lastDate = timestamp
  for (var i = 0; i < _observers.length; i++) _observers[i](_delta)
  _rafHandler = window.requestAnimationFrame(_runner)
}

function _complexRun (timestamp) {
  if (timestamp === void 0) timestamp = 16.67 // default 60fps
  if (_lastDate === null) _lastDate = timestamp
  var _delta = timestamp - _lastDate
  _lastDate = timestamp
  for (var i = 0; i < _beforeObservers.length; i++) _beforeObservers[i](_delta)
  for (var i = 0; i < _observers.length; i++) _observers[i](_delta)
  for (var i = 0; i < _afterObservers.length; i++) _afterObservers[i](_delta)
  _rafHandler = window.requestAnimationFrame(_runner)
}

function _swapRunner () {
  _runner = (_afterObservers.length > 0 || _beforeObservers > 0)
    ? _complexRun
    : _simpleRun
}

/**
 * Add functions for execution at the beginning of the raf call
 * @param {(function|array)} fns Function or Array of Functions to be called at the start of the raf
 */
function setBefore (fns) {
  _beforeObservers = Array.isArray(fns) ? fns : [fns]
  _swapRunner()
}

/**
 * Add functions for execution at the end of the raf call
 * @param {(function|array)} fns Function or Array of Functions to be called at the end of the raf
 */
function setAfter (fns) {
  _afterObservers = Array.isArray(fns) ? fns : [fns]
  _swapRunner()
}

/**
 * Add a function for execution on each frame
 * @param {function} fn Function to be called
 */
function add (fn) {
  if (!fn) return
  if (_observers.indexOf(fn) === -1) {
    _observers.push(fn)
    start()
  }
}

/**
 * Remove a function for execution on each frame
 * @param {function} fn Function to remove from the raf
 */
function remove (fn) {
  if (!fn) return
  var index = _observers.indexOf(fn)
  if (index !== -1) {
    _observers.splice(index, 1)
    if (_observers.length === 0) stop()
  }
}

/**
 * Force start the raf. You usually don't need to use it.
 */
function start () {
  if (_rafHandler) return
  _lastDate = null
  _runner()
}

/**
 * Force stop the raf. You usually don't need to use it.
 */
function stop () {
  if (!_rafHandler) return
  window.cancelAnimationFrame(_rafHandler)
  _rafHandler = null
}

export default { add, remove, start, stop, setAfter, setBefore }
