import {inject, bindable} from 'aurelia-framework';
import {Session} from './utils/session';
import {App} from './app';

@inject(Session, App)
export class SideNavBar {
    @bindable router = null;
    constructor(session, app) {
        // this.router = router;
        this.session = session;
        this.group = new Map();

        this.app = app;
    }
    attached() {
        for (var route of this.router.navigation) {
            if (route.settings && ((route.settings.group || "").trim().length > 0)) {
                var key = (route.settings.group || "").trim();
                if (!this.group.has(key))
                    this.group.set(key, []);

                var groupedRoutes = this.group.get(key);
                groupedRoutes.push(route);
                this.group.set(key, groupedRoutes);
            }
        }; 
    }

    toggleSideMenu() {
        this.app.toggleMinimizeSideMenu = !this.app.toggleMinimizeSideMenu;
    }
    
    selectMenu(menu, title) {
        this.app.activeMenu = menu;
        this.activeTitle = title;

        this.app.activeSubMenu = '';
    }

    selectSubMenu(subMenu) {
        // this.app.activeSubMenu = subMenu;

        // this.app.toggleMinimizeSideMenu = true;

        this.app.toggleMinimizeSideMenu = false;
        this.app.activeMenu = [];
        this.app.activeSubMenu = {};
        
        return true; 
    }
}