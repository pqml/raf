import { raf, fpsLimiter, RafTimer } from '..'

function log (el, msg, reset = false) { el.innerHTML = (reset ? '' : el.innerHTML) + msg + '\n' }

// raf
(function () {
  const $ = document.querySelector('pre.raf')
  function tick (dt) {
    log($, 'Deltatime: ' + dt + 'ms', true)
  }
  raf.add(tick)
})()

// fps limiter
;(function () {
  const $ = document.querySelector('pre.fpslimiter')
  let ping = true
  raf.add(fpsLimiter(1, function () {
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
  raf.add(dt => timer.update(dt))
})()
