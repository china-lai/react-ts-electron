import {
    BrowserWindow,
    app,
    Menu
} from 'electron'

import isDev from 'electron-is-dev'
import {resolve} from 'path'

function createWindow() {
    const window = new BrowserWindow({
        width: 1600,
        height: 900,
        webPreferences: {
            webSecurity: false,
            contextIsolation: false,
            nodeIntegration: true,
        }
    })

    /*隐藏electron创听的菜单栏*/
    Menu.setApplicationMenu(null)

    if (isDev) {
        try {
            require('electron-reloader')(module, {});
        } catch (_) {
        }
        // window.webContents.openDevTools()
        // window.loadURL("http://localhost:8080")
        window.loadURL("http://www.baidu.com")
    } else {
        window.loadFile(
            resolve(__dirname, '../render/dist-render/index.html')
        )
    }

    return window
}

app.on('ready', () => {
    console.log('ready')
    process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'//关闭web安全警告
    createWindow()
})