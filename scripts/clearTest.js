/**
 * @file clearTest.js
 * @description clear test dir
 */

const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');


clear();

function clear() {
    const dir = path.resolve('./test');
    try{
        fs.emptyDirSync(dir);
        console.log(chalk.green(`clear ${dir} success, now it's empty`));
    } catch (err) {
        console.log(chalk.red(err));
    }
    console.log();
}