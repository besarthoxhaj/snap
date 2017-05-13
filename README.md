# Snap

Simple testing snapshot utility used in [boilreact](https://github.com/besarthoxhaj/boilreact)

```
$ npm i @bes/snap --save-dev
```

## Usage

```js
const snap = require('@bes/snap')({
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

## Idea

It works similarly to jest snapshot but with less magic. The idea is to create
a file e.g. `snap.json` where the snapshot info will be saved.

```json
{
  "000": {
    "numId": "000",
    "mess": "Hello, World!"
  },
  "001": {
    "numId": "001",
    "mess": "Boom"
  }
}
```

This while in a new directory saving the data themselves.

```
_snapshots
├── html
│   ├── 000.html
│   └── 001.html
└── snap.json
```
