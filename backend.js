const { spawn } = require('child_process');

let workerProcess;

function run() {
  return new Promise((resolve, reject) => {
    // 任何你期望执行的cmd命令，ls都可以
    const cmdStr = process.platform === "win32" ? "npm.cmd" : "npm";
    const cmdArgs = ['start'];
    const cmdPath = 'D:\\2020FirstHalf\\项目\\chenxi\\tsystem-pro-v5';
    // 子进程名称
    workerProcess = spawn(cmdStr, cmdArgs, { cwd: cmdPath });
    // 打印正常的后台可执行程序输出
    workerProcess.stdout.on('data', function (data) {
      console.log('stdout: ' + data);
      if (data.toString('utf8').includes('Compiled successfully')) {
        resolve();
      }
    });
    // 打印错误的后台可执行程序输出
    workerProcess.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
      reject(data);
    });
    // 退出之后的输出
    workerProcess.on('close', function (code) {
      console.log('out code：' + code);
    });
  });
}

function kill() {
  // workerProcess.exit(0);
  workerProcess.kill('SIGINT');
}

module.exports = { run, kill }
