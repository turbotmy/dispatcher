const { app, BrowserWindow, Menu, Tray } = require('electron')
const path = require('path')
const url = require('url')
const menuManager = require('./menu-manager')

let win
let tray
let splashScreen

const assetPath = path.join(__dirname,'../www/assets/icon')
const iconPath = path.join(__dirname, 'images')

app.on('ready', appReady)

function appReady(){
    menuManager.onAbout = () => {console.log('you REALLY clicked About...')}
    menuManager.onMap = () => {activateAndNav('map')}
    menuManager.onLocations = () => {activateAndNav('locations')}
    
    const menu = menuManager.build()
    Menu.setApplicationMenu(menu);

    if (app.dock) {
        app.dock.setIcon(path.join(iconPath,'icon.png'))
    }
    
    createSplashScreen()
    initTray()
    createWindow()
}

function createSplashScreen(){
    splashScreen = new BrowserWindow({
        width: 800,
        height: 600,
        titleBarStyle:'hidden',
        alwaysOnTop:true,
        closable:false,
        skipTaskbar:true,
        show:true,
        minimizable:false,
        maximizable:false,
        resizable:false,
        center:true,
        frame:false
    })
    splashScreen.loadURL(url.format({
                         pathname: path.join(assetPath,'splash.png'),
                         protocol: 'file',
                         slashes: true}))
}

function activateAndNav(page){
    if (!win){
        createWindow(page)
    }else{
        navigateTo(page)
    }
}

function navigateTo(page){
    app.focus()

    if (page === 'map'){
        win.webContents.send('onMap')
    }
    if (page === 'locations'){
        win.webContents.send('onLocations')
    }
}

function initTray(){
    tray = new Tray(path.join(iconPath, 'icon.ico'))
    tray.setToolTip(app.getName())
    tray.setContextMenu(menuManager.buildTrayMenu())
}

function createWindow(page) {
    const windowIcon = process.platform === 'darwin' ? 'icon.png' : 'icon.ico'
    win = new BrowserWindow({ 
        width: 1200, 
        height: 800, 
        title: 'Dispatcher',
        icon: path.join(iconPath, windowIcon),
        show: false
    })


    //win.loadURL('http://localhost:8100')
    win.loadURL(url.format({
        pathname: path.join(__dirname, '../www/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    win.once('ready-to-show', () => {
        if (splashScreen && splashScreen.isVisible()){
            splashScreen.destroy()
            splashScreen = null
        }

        if (!win.isVisible()){
            win.show()
        }

        if (page)
            navigateTo(page)
    })
    //win.webContents.openDevTools()

    win.on('closed', () => {
        win = null
    })
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win == null) {
        createWindow()
    }
})