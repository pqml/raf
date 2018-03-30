import test from 'tape-promise/tape'
import { wait } from './utils'
import { raf } from '..'

const log = []
function dispose () {
  raf.dispose()
  log.length = 0
}

test('raf', async t => {
  dispose()
  raf.addAfter(() => log.push('after'))
  raf.addBefore(() => log.push('before'))
  raf.add(() => log.push('call'))
  await wait(2)
  t.deepEqual(log,
    ['before', 'call', 'after', 'before', 'call', 'after'],
    'raf should call before observers, then observers, then after observers'
  )

  dispose()
  raf.add(() => log.push('instant'))
  raf.stop()
  raf.start(true)
  t.deepEqual(
    log,
    ['instant'],
    'raf flow should be called instantly if using the instant argument from raf.add'
  )

  dispose()
  raf.add(dt => t.notOk(isNaN(dt), 'First delta time should be a number'))
  await wait(1)

  dispose()
  raf.add(dt => t.notOk(isNaN(dt), 'Instant call first delta time should be a number'))
  raf.stop()
  raf.start(true)

  dispose()
  raf.start()
  await wait(1)
  raf.add(dt => t.ok(dt > 0, 'Second delta time should not greater than 0ms'))
  await wait(1)

  dispose()
  raf.start()
  await wait(1)
  raf.add(dt => t.ok(dt < 40, 'Stopping the raf should not mess with the delta time'))
  raf.stop()
  await wait(60) // typical one sec
  raf.start()
  await wait(1)

  t.end()
})

test('raf.add', async t => {
  dispose()
  raf.add(() => log.push(2))
  raf.add(() => log.push(1), true)
  raf.add(() => log.push(3))
  raf.add(() => log.push(0), true)
  t.deepEqual(log, [], 'raf.add should request frame, not start the raf instantly')
  await wait(1)
  t.deepEqual(
    log,
    [0, 1, 2, 3],
    'raf.add using prepend argument should add function before any other'
  )
  t.end()
})

test('raf.requestOnce', async t => {
  dispose()
  raf.add(() => log.push('call'))
  raf.stop() // do not autostart
  raf.requestOnce()
  await wait(3)
  t.deepEqual(
    log,
    ['call'],
    'requestOnce only request once when raf is not already running'
  )
  t.end()
})

test('raf.addBefore / raf.addAfter', async t => {
  dispose()
  raf.addBefore(() => log.push('before'))
  raf.addAfter(() => log.push('after'))
  await wait(2)
  t.deepEqual(
    log,
    [],
    'Should not autostart the raf'
  )
  raf.requestOnce()
  await wait(2)
  t.deepEqual(
    log,
    ['before', 'after'],
    'Before instructions are called before after ones'
  )
  t.end()
})
