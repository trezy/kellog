`use strict`





let _ = require(`lodash`)
let moment = require(`moment`)





module.exports = function logger (options) {
  options || (options = {})

  _.defaultsDeep(options, {
    formats: {
      output: `[:start] :method ":url" - :duration ms`,
      time: `x`
    }
  })

  return async function kellog (ctx, next) {
    let start = moment(new Date)

    await next()

    let end = moment(new Date)

    console.log(options.formats.output.replace(/:\w+/g, function (propName, index, string) {
      let propValue = ctx[propName.replace(`:`, ``)]

      if (!propValue) {
        switch (propName.replace(`:`, ``)) {
          case `duration`:
            propValue = end - start
            break

          case `end`:
            propValue = end
            break

          case `start`:
            propValue = start
            break
        }

        if (propValue instanceof moment) {
          propValue = propValue.format(options.formats.time)
        }
      }

      return propValue !== undefined ? propValue : propName
    }))
  }
}
