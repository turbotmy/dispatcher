const { Menu, MenuItem} = require('electron')

class MenuManager{
    constructor(){
        this.onAbout = () => { console.log('About clicked.')}
        this.onPrefs = () => { console.log('Prefs clicked.')}
        this.onLearnMore = () => { console.log('Learn More Clicked')}
        this.onMap = () => { 
            console.log('Map clicked.')
        }
        this.onLocations = () => { console.log('Locations clicked')}

        this.locationMenuItems = [{
            label: 'None - Create some Locations',
            enabled: false
        }]

        this.locationMenu = new MenuItem({
            label:'Locations',
            submenu: this.locationMenuItems
        })
    }

    buildTrayMenu(){
        const menu = new Menu()
        menu.append(new MenuItem({label: 'Map', click:this.onMap}))
        menu.append(new MenuItem({label:'View Locations', click:this.onLocations}))
        menu.append(new MenuItem({type:'separator'}))
        menu.append(new MenuItem(this.locationMenu))
        menu.append(new MenuItem({type:'separator'}))
        menu.append(new MenuItem({role:'quite'}))   

        return menu;
    }

    build(){
        const menu = new Menu()

        if (this.isMac()){
            menu.append(new MenuItem(this.getMacAppMenuTemplate()))
        }else{
            menu.append(new MenuItem(this.getFileMenuTemplate()))
        }

        menu.append(new MenuItem(this.getEditMenuTemplate()))
        menu.append(new MenuItem(this.getViewMenuTemplate()))
        menu.append(new MenuItem(this.locationMenu))
        menu.append(new MenuItem(this.getWindowMenuTemplate()))
        menu.append(new MenuItem(this.getHelpMenuTemplate()))

        return menu;
    }

    isMac(){
        return (process.platform === 'darwin')
    }

    getFileMenuTemplate(){
        return{
            label:'File',
            submenu: [{
                label: 'Options...',
                click: this.onPrefs
            },{
                type:'separator'
            },{
                role:'quit'
            }]
        }
    }

    getEditMenuTemplate(){
        return {
            label:'Edit',
            submenu:[{
                role:'undo'
            },{
                role:'redo'
            },{
                type:'separator'
            },{
                role:'cut'
            },{
                role:'copy'
            },{
                role:'paste'
            },{
                role:'pasteandmatchsytle'
            },{
                role:'delete'
            },{
                role:'selectall'
            }]
        }
    }

    getViewMenuTemplate(){
        return {
            label:'View',
            submenu: [{
                label:'Map',
                click:this.onMap,
                accelerator:'CommandOrControl+M'
            },{
                label:'Select Location',
                click:this.onLocations,
                accelerator:'CommandOrControl+L'
            },{
                type:'separator'
            },{
                role:'reload'
            },{
                role:'forcereload'
            },{
                role:'toggledevtools'
            },{
                role:'separator'
            },{
                role:'resetzoom'
            },{
                role:'zoomin'
            },{
                role:'zoomout'
            },{
                role:'separator'
            },{
                role:'togglefullscreen'
            }]
        }
    }

    getWindowMenuTemplate(){
        const windowsSubMenu = [{
            role:'minimize'
        },{
            role:'close'
        }]

        const macSubMenu = [{
            label:'Close',
            role:'close'
        },{
            label:'Minimize',
            role:'minimize'
        },{
            label:'Zoom',
            role:'zoom'
        },{
            role:'separator'
        },{
            label:'Bring All to Front',
            role:'front'
        }]

        return {
            role:'window',
            submenu: this.isMac() ? macSubMenu: windowsSubMenu
        }
    }

    getHelpMenuTemplate(){
        let menu = {
            role:'help',
            submenu:[{
                label:'Learn More',
                click: this.onLearnMore
            }]
        }

        if (!this.isMac()){
            menu.submenu.unshift({type:'separator'})
            menu.submenu.unshift({
                label: 'About Dispatcher...',
                click:this.onAbout
            })
        }

        return menu
    }

    getMacAppMenuTemplate(){
        return {
            label:'',
            submenu: [{
              label:'About Dispatcher',
              click:this.onAbout
            },{
                type:'separator'
            },{
                label:'Preferences...',
                click:this.onPrefs
            },{
                type:'separator'
            },{
                role:'services',
                submenu:[]
            },{
                type:'separator'
            },{
                role:'hide'
            },{
                role:'hideothers'
            },{
                role:'unhide'
            },{
                type:'separator'
            },{
                role:'quit'
            }]
        }
    }
}

module.exports = new MenuManager();