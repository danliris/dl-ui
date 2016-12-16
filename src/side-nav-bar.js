import { inject, bindable, containerless, computedFrom } from 'aurelia-framework';
import { AuthService } from "aurelia-authentication";

@containerless()
@inject(AuthService)
export class SideNavBar {
    @bindable router = null;
    @bindable navigations = null;

    constructor(authService) {
        this.minimized = false;
        this.activeMenu = [];
        this.activeSubMenu = {};
        this.group = new Map();
        this.authService = authService;
    }
    
    @computedFrom('authService.authenticated')
    get isAuthenticated()
    {
        return this.authService.authenticated;
    }
    
    @computedFrom('activeMenu')
    get expand() {
        return (this.activeMenu || []).length > 0;
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
        this.minimized = !this.minimized;
    }

    selectMenu(menu, title) {
        this.activeMenu = menu;
        this.activeTitle = title;
        this.activeSubMenu = [];
    }

    selectSubMenu(subMenu) {
        this.minimized = false;
        this.activeMenu = [];
        this.activeSubMenu = {};

        return true;
    }
}