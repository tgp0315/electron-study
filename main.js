const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  // 创建窗口
  const win = new BrowserWindow({
    width: 1000,
    height:800,
    webPreferences: {
      // nodeIntegration: true, // 渲染进程使用nodejs尽量不用这种方式
      // contextIsolation: false // 渲染进程使用nodejs尽量不用这种方式
    }
  })
  // win.loadURL('https://juejin.cn/post/7006261280663306247#heading-7')
  win.loadFile('./index.html')
  // 打开开发者工具
  win.webContents.openDevTools()

  // 暂时关闭安全警告 有安全隐患 可以使用csp
  // process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true
}

// 主进程生命周期
// 所有窗口关闭
app.on('window-all-closed', () => {
  // 对一mac系统，关闭窗口时不会直接退出应用
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('quit', () => {
  console.log('quit')
})

app.whenReady().then(() => {
  createWindow()
  // 在macos下，当全部窗口关闭是，点击dock图标窗口再次打开
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})