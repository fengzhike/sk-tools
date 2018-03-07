const vfs = require('vinyl-fs')
const fs = require('fs')
const through = require('through2')
const path = require('path')
const which = require('which')
const { findNpm, runCmd } = require('../utils')
var shell = require("shelljs")

const { join, basename } = path
module.exports = init

function init(cmd, options) {
    console.log("init project "+cmd+" OK !")
	createWebsite(cmd)
}

function createWebsite(websiteName) {
    var dirname = __dirname.replace(/\\/,'/')
    var cwd = join(dirname, '../../assets/website/template')
    // console.log(dirname)
    var uriArr = dirname.split('/')
    uriArr.pop()
    uriArr.pop()
    uriArr.push('template/website')
    var uri = uriArr.join('/')
    // console.log(uri)
    shell.exec("cp -r "+uri+"/ " + './'+websiteName);

}
