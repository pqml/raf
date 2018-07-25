# Raf
RequestAnimationFrame utilities

[→ Documentation](https://pqml.github.io/raf/docs) |
[→ Example](https://pqml.github.io/raf)

<br><br>

## Requirements
- ES6 Modules support
  - Using a module bundler like Webpack, Rollup or Parcel
  - [Native support from browser](https://caniuse.com/#feat=es6-module)
  - From NodeJS
- [window.requestAnimationFrame()](https://developer.mozilla.org/fr/docs/Web/API/Window/requestAnimationFrame)

<br>

## Features
- RAF Singleton with high resolution delta time (if supported)
  - Autostop & autostart requestAnimationFrame when adding/removing function
  - `setBefore` & `setAfter` methods to add function at the beginning and the end of the raf call
- fps limiter
- RAF-based timer Class

<br>

## Module Installation

```sh
# using npm
$ npm install --save @internet/raf

# or using yarn
$ yarn add @internet/raf
```

<br>

## Usage

##### Core
```js
import raf from '@internet/raf'

function tick (dt) {
  console.log('called on new frame')
}

raf.add(tick)
```

##### Using other utilities
```js
import { raf, fpsLimiter } from '@internet/raf'

function tick (dt) {
  console.log('Called at a framerate of 10fps')
}

raf.add(fpsLimiter(10, tick))
```

<br>

## Documentation
Full documentation available from https://pqml.github.io/raf/docs

<br>

## License
[MIT.](LICENSE)

<br><br>

<i>`raf` is a package of the [@internet](https://www.npmjs.com/org/internet) npm scope. </i>

_[@internet](https://www.npmjs.com/org/internet) is a collection of opinionated and interoperables front-end npm ES6 modules, with minimal external dependencies._