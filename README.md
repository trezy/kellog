# kellog

`kellog` is a simple logging middleware for [Koa 2](koajs.com).

## Usage

Pass `kellog` as the first middleware on your app for the best results:

```javascript
'use strict'

let Koa = require('koa')
let logger = require('kellog')

let app = new Koa

app.use(logger())

// Other middleware...

app.listen(3000)
```

## Configuration

`kellog` accepts an `options` hash:

```javascript
let options = {
  formats: {
    time: 'DD MMM - HH:MM:ss'
  }
}

app.use(logger(options))
```

### `formats`

`kellog` uses formats to determine how it will log its output to the console. There are currently only a couple of formats available for editing:

#### `output`

*default: `[:start] :method ":url" - :duration ms`*

The output format determines how `kellog` will write its logs. All replacements are formatted as a variable name prefixed with `:`. Currently `kellog` supports being passed any property available on `app.context` plus a few extras:

##### `start`

This is the time that the server received the request

##### `end`

This is the time that the server completed all downstream middleware and returned to `kellog`

##### `duration`

This is the how long, in milliseconds, the server took to complete the request.

#### `time`

*default: `x`*

`kellog` uses [Moment.js](http://momentjs.com/) for displaying dates and times. This will be passed directly to Moment so any formating string that Moment accepts will work here, too. [Here's a list of Moment formating options](http://momentjs.com/docs/#/displaying/format/).
