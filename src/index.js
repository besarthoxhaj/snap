'use strict';

const { html } = require('js-beautify');
const fs = require('fs-extra');

const opts = {
  html: {
    indent_inner_html: true,
    indent_size: 2,
    unformatted: [],
  },
  json: {
    spaces: 2,
  },
};

module.exports = ({outputDir, outputFile}) => {

  fs.ensureDirSync(outputDir);
  const isFile = fs.existsSync(outputFile);
  if(isFile === false) {
    fs.ensureFileSync(outputFile);
    fs.writeFileSync(outputFile,"{}");
  }

  const jsonStore = fs.readJsonSync(outputFile);

  return ({ numId, body, mess, history }) => {

    const current = jsonStore[numId];
    const prettyBody = html(body,opts['html']);

    // if current `numId` doesn't exists
    // create new one and exit
    if(current === undefined) {
      jsonStore[numId] = { mess, numId };
      if(history !== undefined) {
        const { pathname, search } = history.location;
        jsonStore[numId]['href'] = `${pathname}${search}`;
      }
      fs.writeFileSync(`${outputDir}/${numId}.html`,prettyBody);
      fs.writeJsonSync(outputFile,jsonStore,opts['json']);
      return;
    }

    // for the moment just overwrite the
    // old file
    fs.writeFileSync(`${outputDir}/${numId}.html`,prettyBody);
    fs.writeJsonSync(outputFile,jsonStore);
    return;
  };
};
