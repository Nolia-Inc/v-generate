# vue-create

> A command-line tool for dynamically creating Vue.js component files.

## Prerequisites

This project requires NodeJS (version 8 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
6.14.9
v14.15.3
```

## Table of contents

- [Project Name](#project-name)
  - [Prerequisites](#prerequisites)
  - [Table of contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Authors](#authors)

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

Start with installing the command globally on your local machine:
To install and set up the library, run:

```sh
$ npm install -g vue-create
```

## Usage

> Example with all parameters
```sh
$ vue-create --name <component-name> --type <javascript dialect> --style <style dialect>
```

> Simplest example for usage
```sh
$ vue-create -n <component-name>
```

> Help menu
```sh
$ vue-create --help
Usage: create [options] --name <component-name>

Options:
  --help        Show help
  --version     Show version number
  -g, --global  Will attempt to add the component to the global environment [disabled]
  -t, --type    Use a specific dialect of JavaScript [TS, JS]. Leaving this blank will result in JS
  -s, --style   Specifies the styling framework [CSS, SCSS]. Leaving this blank will result in CSS
  -n, --name    Specifies the name of the created component. Will be created exactly as described
```

## Authors

* **Austin Henderson** - *Initial work and Continued support* - [austinhenderson19](https://github.com/austinhenderson19)
