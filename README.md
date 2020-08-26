# 包装 Web 应用的 Electron 项目

该项目可以将 Web 应用打包成 Windows 系统内运行的 exe 程序

**重要代码**

```js
  /**
   * loadURL 分为两种情况
   *  1.开发环境，指向 react 的开发环境地址
   *  2.生产环境，指向 react build 后的 index.html
   */
  const startUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8000'
      :  path.join(__dirname, "/dist/index.html");
```

## 安装

    $ npm install

## 启动

> 运行开发环境，需要先更新开发环境地址，再启动以下命令

    $ npm run start-electron

> 运行生产环境，需要先将你的应用 build 后的文件夹放在项目根目录，更新 index.html 地址，再启动以下命令

    $ npm run start-electron-prod

## 打包

> 打包需要 `favicon_256.ico` 图片文件，图片必须 256x256

    $ npm run build-electron

## Q&A

1. 运行生产环境有图片无法加载？

    答：问题在于你的应用 build 后的文件夹里的图片路径出现错误，请自行检查。
2. 运行生产环境发现后端接口无法连接？
    
    答：问题在于你的 Web 应用使用的是相对接口连接后端或其他原因，请检查你 Web 应用的接口代码。

3. 打包发现一直卡在 winCodeSign-2.6.0 ？

    答：去 https://github.com/electron-userland/electron-builder-binaries/releases/tag/winCodeSign-2.6.0 下载对应版本的 winCodeSign (记得切换成你需要的版本)，然后下载 source code(zip) 文件，将文件解压在 `C:\Users\你的用户名\AppData\Local\electron-builder\Cache\winCodeSign` 文件夹内。

4. 打包发现一直卡在 nsis ？

    答：去 https://github.com/electron-userland/electron-builder-binaries/releases/tag/nsis-3.0.4.1 下载对应版本的 nsis (记得切换成你需要的版本)，然后下载 source code(zip) 文件，将文件解压在 `C:\Users\你的用户名\AppData\Local\electron-builder\Cache\nsis` 文件夹内。

5. 打包发现一直卡在 nsis-resource ？

    答：去 https://github.com/electron-userland/electron-builder-binaries/releases/download/nsis-resources-3.4.1/nsis-resources-3.4.1.7z 下载对应版本的 nsis (记得切换成你需要的版本)，然后下载 source code(zip) 文件，将文件解压在 `C:\Users\你的用户名\AppData\Local\electron-builder\Cache\nsis` 文件夹内。