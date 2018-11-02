#!/usr/bin/env node

'use strict';
const chalk = require("chalk");
const meow = require("meow");
const ora = require("ora");
// const inquirer = require('inquirer'); incase i need this
// const clear = require("clear"); figure out why im getting package error
const log = console.log;

const cli = meow(`
    Usage
    $ cli <input>

    Options
    --javascript, -j  Message you want to send

    Examples
    $ cli.js --javascript "isInteger"
    Number.isInterger
    Type: ABC Returns: BOOL
    `, {
        booleanDefault: undefined,
        flags: {
            message: {
                type: 'string',
                default: false,
                alias: 'm'
            }
        }
    }
);

// clear(); this will clear console before running program
const dots2 = {"interval": 80,"frames": ["⣾","⣽","⣻","⢿","⡿","⣟","⣯","⣷"]};
const spinner = ora({text:'program started, press any key to continue', spinner: dots2}).start();

const keypress = async () => {
    process.stdin.setRawMode(true)
    return new Promise(resolve => process.stdin.once('data', data => {
      const byteArray = [...data]
      if (byteArray.length > 0 && byteArray[0] === 3) {
        console.log('^C')
        process.exit(1)
      }
      process.stdin.setRawMode(false)
      resolve()
    }))
};
  
(async () => {

    await keypress();
    spinner.succeed('this step completed');
    spinner.start('program still running, press any key to continue');
    await keypress();
    spinner.succeed("donezo");

})().then(process.exit)

// log(chalk.yellow("cli"));
// log(chalk.yellow(JSON.stringify(cli)));
// log(chalk.blue("cli.flags"));
// log(chalk.blue(JSON.stringify(cli.flags)));
