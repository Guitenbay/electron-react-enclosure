/* main.js */
const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

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
