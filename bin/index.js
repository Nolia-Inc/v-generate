#!/usr/bin/env node

const yargs = require('yargs');
const chalk = require('chalk');
const inquirer = require('inquirer');
const { writeFileSync, existsSync, mkdirSync } = require('fs');
const { javascript, typescript } = require('./vue-template');

function setOptions() {
  const options = yargs
    .usage('Usage: vue-create [options] --name <component-name>')
    .option('g', { alias: 'global', describe: 'Will attempt to add the component to the global environment [disabled]', type: 'boolean' })
    .option('t', { alias: 'type', describe: 'Use a specific dialect of JavaScript [TS, JS]. Leaving this blank will result in JS' })
    .option('s', { alias: 'style', describe: 'Specifies the styling framework [CSS, SCSS]. Leaving this blank will result in CSS' })
    .option('n', { alias: 'name', describe: 'Specifies the name of the created component. We be created exactly as described' }).argv;

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

async function doesFileAlreadyExist(pathToFile) {
  const pathToFileWithBase = `src/${pathToFile}`;

  if (existsSync(`${pathToFileWithBase}.vue`)) {
    const { overwrite } = await inquirer.prompt({ type: 'confirm', message: 'A file already exists in the specified location with the same name. Do you want to overwrite it?', name: 'overwrite' });

    return overwrite;
  }

  return true;
}

function checkPathExistsAndCreateIt(name) {
  const directory = `src/${name.split('/').slice(0, name.split('/').length - 1)}`;

  if (!existsSync(directory)) {
    mkdirSync(directory, { recursive: true });
  }
}

function createFile(options, path) {
  writeFileSync(`${path}/${options.name}.vue`, options.type == 'ts' ? typescript(options.style) : javascript(options.style), 'utf8');

  return;
}

function logError(e) {
  yargs.showHelp();
  console.log(`\n${chalk.red(e.message)}\n`);
}

(async function main() {
  try {
    let options = setOptions();
    const overwrite = await doesFileAlreadyExist(options.name);

    if (!overwrite) {
      throw new Error(chalk.yellow('No component was created'));
    }

    checkPathExistsAndCreateIt(options.name);

    const path = `src/${options.name.split('/').slice(0, options.name.split('/').length - 1)}`;
    options.name = options.name.split('/').slice(-1)[0];

    createFile(options, path);
  } catch (e) {
    logError(e);
  }
})();
