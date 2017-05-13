# Snap

Simple testing snapshot utility used in [boilreact](https://github.com/besarthoxhaj/boilreact)

## Usage

```js
const snap = require('snap')({
  outputDir: './tests/_snapshots/html',
  outputFile: './tests/_snapshots/snap.json'
});

snap({
  numId:'000',
  mess:'Hello, World!',
  body:'<h1>Hello, World!</h1>'
});

snap({
  numId:'001',
  mess:'Boom',
  body:'<span>Boom</span>'
});
```
