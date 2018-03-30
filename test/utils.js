export const wait = f => new Promise(resolve => {
  const tick = () => --f <= 0 ? resolve() : global.requestAnimationFrame(tick)
  f > 0 ? global.requestAnimationFrame(tick) : resolve()
})
