#!/usr/bin/env node

const yargs = require('yargs');
const chalk = require('chalk');
const { writeFileSync, existsSync, mkdirSync } = require('fs');
const { javascript, typescript } = require('./vue-template');

function setOptions() {
  return yargs
    .usage('Usage: vue-create [options] --name <component-name>')
    .option('g', { alias: 'global', describe: 'Will attempt to add the component to the global environment [disabled]', type: 'boolean' })
    .option('t', { alias: 'type', describe: 'Use a specific dialect of JavaScript [TS, JS]. Leaving this blank will result in JS' })
    .option('s', { alias: 'style', describe: 'Specifies the styling framework [CSS, SCSS]. Leaving this blank will result in CSS' })
    .option('n', { alias: 'name', describe: 'Specifies the name of the created component. We be created exactly as described' }).argv;
}

function checkForErrors(options) {
  if (!options.name) {
    throw new Error(`Missing required argument ${chalk.yellow('<name>')}.`);
  }

  if (!options.type) {
    options.type = 'js';
  }

  if (!['js', 'ts'].includes(options.type)) {
    throw new Error(`Invalid value for ${chalk.yellow('<type>')}.`);
  }

  if (!options.style) {
    options.style = 'css';
  }

  if (!['css', 'scss'].includes(options.style)) {
    throw new Error(`Invalid value for ${chalk.yellow('<style>')}`);
  }

  return options;
}

function checkPathExistsAndCreateIt(name) {
  const pathsToFile = name.split('/');
  pathsToFile.unshift('src');
  pathsToFile.pop();

  if (pathsToFile.length <= 1) {
    return;
  }

  const directory = pathsToFile.join('/');

  if (!existsSync(directory)) {
    mkdirSync(directory, { recursive: true });
  }

  return [directory, name.split('/')[name.split('/').length - 1]];
}

function createFile(options, path) {
  writeFileSync(`${path}/${options.name}.vue`, options.type == 'ts' ? typescript(options.style) : javascript(options.style), 'utf8');

  return;
}

function logError(e) {
  yargs.showHelp();
  console.log(`\n${chalk.red(e.message)}\n`);
}

try {
  let options = setOptions();
  options = checkForErrors(options);

  const [path, name] = checkPathExistsAndCreateIt(options.name);

  options.name = name;

  if (!path) {
    throw new Error(`${chalk.yellow('No component was created.')}`);
  }

  createFile(options, path);
} catch (e) {
  logError(e);
}
