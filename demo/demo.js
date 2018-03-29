import { raf, fpsLimiter, RafTimer } from '..'

function log (el, msg, reset = false) { el.innerHTML = (reset ? '' : el.innerHTML) + msg + '\n' }

const toRun = []

;(function () {
  const $ = document.querySelector('pre.log')
  function tick (dt) {
    log($, 'addBefore & requestOnce')
    raf.removeBefore(tick)
    toRun.forEach(raf.add)
  }
  raf.addBefore(tick)
  raf.requestOnce()
})()

// raf
;(function () {
  const $ = document.querySelector('pre.raf')
  function tick (dt) {
    log($, 'Deltatime: ' + dt + 'ms', true)
  }
  toRun.push(tick)
})()

// fps limiter
;(function () {
  const $ = document.querySelector('pre.fpslimiter')
  let ping = true
  toRun.push(fpsLimiter(1, function () {
    log($, (ping ? '—> Ping!' : '<— Pong!') + ' (1fps framerate)', true)
    console.log('ok')
    ping = !ping
  }))
})()

// raf timer
;(function () {
  const $ = document.querySelector('pre.raftimer')
  log($, 'Next call in 1000ms')
  const timer = new RafTimer(1000, restart => {
    const nDelay = (Math.random() - 0.5) * 4000 + 2000 | 0
    log($, 'Called — Next call in ' + nDelay + 'ms', true)
    restart(nDelay)
  })
  toRun.push(dt => timer.update(dt))
})()
