# Raf
[:books: **Documentation**](#api)  |  [:tada: **Example**](https://pqml.github.io/raf) | [:globe_with_meridians: **Internet modules**](https://www.npmjs.com/org/internet)


- RAF Singleton with high resolution delta time (if supported)
  - Autostop & autostart requestAnimationFrame when adding/removing function
  - `setBefore` & `setAfter` methods to add function at the beginning and the end of the raf call
- fps limiter
- RAF-based timer Class

<br>

# Requirements
- ES6 Modules support
  - Using a module bundler like Webpack, Rollup or Parcel
  - [Native support from browser](https://caniuse.com/#feat=es6-module)
  - From NodeJS
- [window.requestAnimationFrame()](https://developer.mozilla.org/fr/docs/Web/API/Window/requestAnimationFrame)

<br>

# Installation

```sh
# using npm
$ npm install --save @internet/raf

# or using yarn
$ yarn add @internet/raf
```

<br>

<a name="api"></a>
# API

```js
import { raf, fpsLimiter, RafTimer } from '@internet/raf'
```

- [:movie_camera: **raf**](#module_raf): _Raf core_
- [:hourglass_flowing_sand: **fpsLimiter**](#module_raf): _Limit function calls to a specific framerate_
- [:alarm_clock: **RafTimer**](#module_raf): _Raf-based timer class_

<br>

<a name="module_raf"></a>
## :movie_camera: raf
Core of the raf package

**Example**  
```js
import { raf } from '@internet/raf'

function tick (dt) {
 console.log('called on new frame')
}

raf.add(tick)
```
#### API

* [raf](#module_raf) : <code>Object</code>
    * _methods_
        * [.addBefore(fn, [prepend])](#module_raf.addBefore)
        * [.addAfter(fn, [prepend])](#module_raf.addAfter)
        * [.add(fn, [prepend])](#module_raf.add)
        * [.removeBefore(fn)](#module_raf.removeBefore)
        * [.removeAfter(fn, [prepend])](#module_raf.removeAfter)
        * [.remove(fn)](#module_raf.remove)
        * [.start([instant])](#module_raf.start)
        * [.requestOnce()](#module_raf.requestOnce)
        * [.stop()](#module_raf.stop)
        * [.dispose()](#module_raf.dispose)
    * _properties_
        * [.time](#module_raf.time) : <code>number</code>
        * [.dt](#module_raf.dt) : <code>number</code>

<br>
<a name="module_raf.addBefore"></a>

#### raf.addBefore(fn, [prepend])
Add a function for execution at the beginning of the raf call
Calling addBefore will not start the raf.

**Kind**: static method of [<code>raf</code>](#module_raf)  
**Category**: methods  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| fn | <code>function</code> |  | Function to be called at the start of the raf |
| [prepend] | <code>boolean</code> | <code>false</code> | Prepend the function to the beginning of the functions list |


* * *

<a name="module_raf.addAfter"></a>

#### raf.addAfter(fn, [prepend])
Add a function for execution at the end of the raf call
Calling addAfter will not start the raf.

**Kind**: static method of [<code>raf</code>](#module_raf)  
**Category**: methods  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| fn | <code>function</code> |  | Function to be called at the end of the raf |
| [prepend] | <code>boolean</code> | <code>false</code> | Prepend the function to the beginning of the functions list |


* * *

<a name="module_raf.add"></a>

#### raf.add(fn, [prepend])
Add a function for execution on each frame

**Kind**: static method of [<code>raf</code>](#module_raf)  
**Category**: methods  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| fn | <code>function</code> |  | Function to be called |
| [prepend] | <code>boolean</code> | <code>false</code> | Prepend the function to the beginning of the functions list |


* * *

<a name="module_raf.removeBefore"></a>

#### raf.removeBefore(fn)
Remove a function for execution at the beginning of the raf call
Calling removeBefore will not stop the raf.

**Kind**: static method of [<code>raf</code>](#module_raf)  
**Category**: methods  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Function to remove from the raf |


* * *

<a name="module_raf.removeAfter"></a>

#### raf.removeAfter(fn, [prepend])
Remove a function for execution at the end of the raf call
Calling removeAfter will not stop the raf.

**Kind**: static method of [<code>raf</code>](#module_raf)  
**Category**: methods  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| fn | <code>function</code> |  | Function to remove from the raf |


* * *

<a name="module_raf.remove"></a>

#### raf.remove(fn)
Remove a function for execution on each frame

**Kind**: static method of [<code>raf</code>](#module_raf)  
**Category**: methods  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Function to remove from the raf |


* * *

<a name="module_raf.start"></a>

#### raf.start([instant])
Force start the raf. You usually don't need to use it.

**Kind**: static method of [<code>raf</code>](#module_raf)  
**Category**: methods  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [instant] | <code>boolean</code> | <code>false</code> | Directly make a raf call without waiting for the next frame (default false) |


* * *

<a name="module_raf.requestOnce"></a>

#### raf.requestOnce()
Request once the raf. Will not be executed if the raf is already running.

**Kind**: static method of [<code>raf</code>](#module_raf)  
**Category**: methods  

* * *

<a name="module_raf.stop"></a>

#### raf.stop()
Force stop the raf. You usually don't need to use it.

**Kind**: static method of [<code>raf</code>](#module_raf)  
**Category**: methods  

* * *

<a name="module_raf.dispose"></a>

#### raf.dispose()
Remove all observers from the raf singleton and stop the raf if it's running. Reset time.

**Kind**: static method of [<code>raf</code>](#module_raf)  
**Category**: methods  

* * *

<a name="module_raf.time"></a>

#### raf.time : <code>number</code>
Time elapsed between the previous and the current frame

**Kind**: static property of [<code>raf</code>](#module_raf)  
**Category**: properties  

* * *

<a name="module_raf.dt"></a>

#### raf.dt : <code>number</code>
Current delta time

**Kind**: static property of [<code>raf</code>](#module_raf)  
**Category**: properties  

* * *


<br>

<a name="fpsLimiter"></a>
## :hourglass_flowing_sand: fpsLimiter
Limit function calls to a specific framerate

**Kind**: global function  
**Returns**: <code>function</code> - Framerate-limited function to add to your raf  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [framerate] | <code>number</code> | <code>30</code> | Framerate |
| callback | <code>function</code> |  | Function to be called at the specified frame interval |

**Example**  
```js
import { raf, fpsLimiter } from '@internet/raf'

function tick () {
  console.log('called each 10 fps')
}

const limited = fpsLimiter(10, tick)
raf.add(limited)
```

<br>

<a name="RafTimer"></a>
## :alarm_clock: RafTimer
RafTimer

**Kind**: global class  
#### API

* [RafTimer](#RafTimer)
    * [new RafTimer(delay, cb, [autostart])](#new_RafTimer_new)
    * [.setCallback(newCallback, [newDelay])](#RafTimer+setCallback)
    * [.stop()](#RafTimer+stop)
    * [.start()](#RafTimer+start)
    * [.restart(newDelay, [useRemainder])](#RafTimer+restart)
    * [.update(dt)](#RafTimer+update)
    * [.dispose()](#RafTimer+dispose)

<br>
<a name="new_RafTimer_new"></a>

#### new RafTimer(delay, cb, [autostart])
Create a new RafTimer instance.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| delay | <code>number</code> |  | Number of milliseconds before executing the callback. |
| cb | <code>function</code> |  | Callback function executed when the timer hit 0. For convenience, a restart method will be passed as 1st arg of the cb function. |
| [autostart] | <code>boolean</code> | <code>true</code> | Optional (default true). Auto-start the timer (Don't need to call start() method). |

**Example**  
```js
import { raf, RafTimer } from '@internet/raf'

const timer = new RafTimer(2000, restart => {
  console.log('Will be logged after 2000ms')
  restart() // Restart the timer. onDone will be called after another 2000ms.
})

raf.add(dt => timer.update(dt))
```

* * *

<a name="RafTimer+setCallback"></a>

#### rafTimer.setCallback(newCallback, [newDelay])
Set a new callback function.

**Kind**: instance method of [<code>RafTimer</code>](#RafTimer)  

| Param | Type | Description |
| --- | --- | --- |
| newCallback | <code>function</code> | New callback function. For convenience, a restart method will be passed as 1st arg of the cb function. |
| [newDelay] | <code>number</code> | Optional. Set a new delay (in ms). If set, the timer will be restarted |


* * *

<a name="RafTimer+stop"></a>

#### rafTimer.stop()
Stop the timer. update() calls will do nothing.

**Kind**: instance method of [<code>RafTimer</code>](#RafTimer)  

* * *

<a name="RafTimer+start"></a>

#### rafTimer.start()
Start the timer if stopped.

**Kind**: instance method of [<code>RafTimer</code>](#RafTimer)  

* * *

<a name="RafTimer+restart"></a>

#### rafTimer.restart(newDelay, [useRemainder])
Restart the timer

**Kind**: instance method of [<code>RafTimer</code>](#RafTimer)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| newDelay | <code>number</code> |  |  |
| [useRemainder] | <code>boolean</code> | <code>true</code> | Optional (default true). Use deltatime's remainder from the last time the timer hits 0. |


* * *

<a name="RafTimer+update"></a>

#### rafTimer.update(dt)
Update remaining time. Usually executed inside a requestAnimationFrame call.

**Kind**: instance method of [<code>RafTimer</code>](#RafTimer)  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>number</code> | Time elapsed since the last call (in ms). |


* * *

<a name="RafTimer+dispose"></a>

#### rafTimer.dispose()
Stop the timer and remove callback reference

**Kind**: instance method of [<code>RafTimer</code>](#RafTimer)  

* * *

