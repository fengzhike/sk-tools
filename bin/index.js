#!/usr/bin/env node
/**
 * @file index.js
 * @description cli 入口文件
 */

const path = require('path');
const fs = require('fs-extra')
const program = require('commander');
const chalk = require('chalk');
const download = require('download-git-repo');

let projectName;
let projectType;

program
    .version(require('../package.json').version)
    .arguments('[name] [type]')
    .action((name, type) => {
        projectName = name;
        projectType = type;
    })
    .parse(process.argv);

if (typeof projectName === 'undefined') {
    console.error('please specify the project name');
    process.exit(1);
}

createApp(projectName);

async function createApp(name) {
    const root = path.resolve(name);
    fs.ensureDirSync(name);
    process.chdir(root);
    console.log(`create a new app in ${chalk.green(root)}`)

    await run(root);
    console.log('done');
}


async function run(root) {
    fs.emptyDirSync(root);

    let branch = 'master';

    switch(projectType) {
        case 'react':
            branch = 'react-tpl';
            break;
        case 'react-hook':
            branch = 'react-hook-tpl';
            break;
        default:
            branch = 'master';
    }

    const repo = {
        name: `fengzhike/web-template#/${branch}`,
        tmp: 'tmp'
    };

    console.log(`begin load remote template from ${chalk.green(`https://github.com/${repo.name}`)}`);

    await loadRemoteTpl(repo);

    await fs.removeSync(path.resolve(`${repo.tmp}/doc`));
    await fs.copySync(path.resolve(repo.tmp), root);
    await fs.removeSync(path.resolve(repo.tmp));

    console.log('copy from tmp successful');
}


async function loadRemoteTpl(repo) {
    await new Promise((resolve, reject) => {
        download(
            repo.name,
            repo.tmp,
            err => {
                if (err) {
                    reject(err);
                    console.log(chalk.red('load repo faild'));
                } else {
                    resolve();
                    console.log('load repo successful');
                }
            }
        )
    })
}
