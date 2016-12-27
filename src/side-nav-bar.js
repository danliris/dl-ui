import { inject, bindable, containerless, computedFrom } from 'aurelia-framework';
import { AuthService } from "aurelia-authentication";
import jwtDecode from 'jwt-decode';

@containerless()
@inject(AuthService)
export class SideNavBar {
    @bindable router = null;
    @bindable navigations = null;

    constructor(authService) {
        this.minimized = false;
        this.activeMenu = [];
        this.activeSubMenu = {};
        this.authService = authService;
    }

    @computedFrom('authService.authenticated')
    get isAuthenticated() {
        return this.authService.authenticated;
    }

    @computedFrom('activeMenu')
    get expand() {
        return (this.activeMenu || []).length > 0;
    }

    attached() {

        this.group = new Map();
        const config = this.authService.authentication.config;
        const storage = this.authService.authentication.storage;
        const token = JSON.parse(storage.get(config.storageKey));
        var me = jwtDecode(token.data);
        // var me = meResult.data;

        var routes = this.router.navigation.filter(route => {
            var routeRoles = route.settings.roles || [];
            var myRoles = me.roles;
            myRoles.push("*");
            return myRoles.some(role => {
                return routeRoles.indexOf(role) >= 0;
            })
        })

        for (var route of routes) {
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
