const test = require('tape');
const fs = require('fs-extra');

const snap = require('../src');
const DIR_TEST = `${__dirname}/dirTests`;

const takeSnap = snap({
  outputDir:`${DIR_TEST}/html`,
  outputFile:`${DIR_TEST}/snap.json`,
});

test('Create directories and files if needed', t => {

  const isDir = fs.existsSync(`${DIR_TEST}/html`);
  const isFile = fs.existsSync(`${DIR_TEST}/snap.json`);

  t.ok(isDir,'directory created');
  t.ok(isFile,'file created');
  t.doesNotThrow(fs.readJsonSync.bind(undefined,`${DIR_TEST}/snap.json`));

  t.end();
});

test('Save snap body', t => {

  takeSnap({
    numId:'001',
    mess:'Hello, World!',
    body:'<h1>Hello, World!</h1>'
  });

  const isFile = fs.existsSync(`${DIR_TEST}/html/001.html`);
  const snapJson = fs.readJsonSync(`${DIR_TEST}/snap.json`);

  t.ok(isFile,'body saved in a file');
  t.deepEqual(snapJson,{
    '001': {
      numId:'001',
      mess:'Hello, World!',
    }
  },'snapJson updated successfully');
  t.end();
});