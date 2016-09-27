import {inject, bindable} from 'aurelia-framework';
import {Session} from './utils/session';

@inject(Session)
export class SideNavBar {
    @bindable router = null;
    constructor(session) {
        // this.router = router;
        this.session = session;
        this.group = new Map();
        // var a = new Array(this.router.navigation);
        // this.router.navigation.forEach(route => {
        //     console.log(1);
        // });
        // console.log(this.router.navigation instanceof Array);

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
}