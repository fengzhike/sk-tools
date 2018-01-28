const childProcess = require('child_process')
const which = require('which')
const fs = require('fs')
const path = require('path')

var npms = ['npm']

function findNpm() {
	for (var i = 0; i < npms.length; i++) {
		try {
			which.sync(npms[i])
			console.log('use npm: ' + npms[i])
			return npms[i]
		} catch (e) {

		}
	}
	throw new Error('please install npm')
}

async function runCmd(cmd, args, cwd) {
    return new Promise((reslove, reject)=>{
        args = args || []
        var runner = childProcess.spawn(cmd, args, {
            stdio: "inherit",
            cwd:cwd
        })
        runner.on('close', function(code) {
            reslove(code)
        })
    })
}


function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

function writeFile(path, content) {
	var exists = fs.existsSync(path)
	if (exists) {
		fs.unlinkSync(path)
	}
	fs.writeFileSync(path, content)
}
module.exports = {
	findNpm,
	runCmd,
	trim,
	writeFile
}
