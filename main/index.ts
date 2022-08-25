import {
    BrowserWindow,
    app
} from 'electron'

function createWindow() {
    const window = new BrowserWindow({
        width: 1000,
        height: 1000,
        webPreferences: {
            webSecurity: false,
            contextIsolation: false,
            nodeIntegration: false,
        }
    })
    // window.loadURL("https://www.baidu.com")
    window.loadFile("../main/index.html")
    return window
}

app.on('ready', () => {
    console.log('ready')

    createWindow()
})