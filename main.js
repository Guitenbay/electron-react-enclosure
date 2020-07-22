/* main.js */
const { app, BrowserWindow, Menu, dialog } = require('electron');
const path = require('path');

const title = '教师综合考察记录系统';

let mainWindow = null;
const createWindow = () => {
  // 隐藏菜单栏
  Menu.setApplicationMenu(null);
  let mainWindow = new BrowserWindow({
    width: 1600,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
    }
  });

  /**
   * loadURL 分为两种情况
   *  1.开发环境，指向 react 的开发环境地址
   *  2.生产环境，指向 react build 后的 index.html
   */
  const startUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8000'
      :  path.join(__dirname, "/build/index.html");
  mainWindow.loadURL(startUrl);

  // 控制下载文件
  mainWindow.webContents.session.on('will-download', (event, item, webContents) => {
    item.on('updated', (event, state) => {
      if (state === 'interrupted') {
        console.log(dialog.showMessageBoxSync({ type: 'info', title, message: 'Download is interrupted but can be resumed'}));
      } else if (state === 'progressing') {
        if (item.isPaused()) {
          console.log(dialog.showMessageBoxSync({ type: 'info', title, message: 'Download is paused'}));
        } else {
          // 显示下载进度
          mainWindow.setProgressBar(item.getReceivedBytes() / item.getTotalBytes());
        }
      }
    })
    item.once('done', (event, state) => {
      if (state === 'completed') {
        console.log(dialog.showMessageBoxSync({ type: 'info', title, message: '下载完成！'}));
      } else {
        console.log(dialog.showMessageBoxSync({ type: 'error', title, message: `下载失败：${state}`}));
      }
      // 不显示下载进度
      mainWindow.setProgressBar(-1);
    })
  });

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});
