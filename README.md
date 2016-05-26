# express-mongoose-sort

> Parse req.query.sort to res.locals.sort

## Usage

Mount the middlewere in your router.

```js
app.get('/api/items', require('express-mongoose-sort'), ctrl);
```

If there is a `req.query.sort` value, the middleware will convert it to something mongoose understands.

```js
'?sort=-name,number'            => { name: -1, number: 1 }
'?sort[0]=-name&sort[1]=number' => { name: -1, number: 1 }
'?sort[name]=-1&sort[number]=1' => { name: -1, number: 1 }
```

**NOTE:** This module does not validate the actual sort properties. You might want to pick only the ones you know are valid for that specific route instead of passing directly to mongoose.

```js
const _ = require('lodash');

function ctrl(req, res, next) {
  const sort = _.pick(res.locals.sort, ['name', 'number']);
  // ...
}
```

## License

Copyright (c) 2016 Marius Craciunoiu. Licensed under the MIT license.
