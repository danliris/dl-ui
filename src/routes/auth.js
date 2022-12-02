module.exports = [
    {
        route: 'auth/accounts',
        name: 'accounts',
        moduleId: './modules/auth/account/index',
        nav: true,
        title: 'Account',
        auth: true,
        settings: {
            group: "Auth",
            permission : {"A1":1},
            //permission : {"*":1},
            iconClass: 'fa fa-dashboard'
        }
    },
    // {
    //     route: 'auth/roles',
    //     name: 'roles',
    //     moduleId: './modules/auth/role/index',
    //     nav: true,
    //     title: 'Role',
    //     auth: true,
    //     settings: {
    //         group: "Auth",
    //         permission : {"A2":1},
    //         //permission : {"*":1},
    //         iconClass: 'fa fa-dashboard'
    //     }
    // },

    {
        route: 'auth/roles2',
        name: 'roles2',
        moduleId: './modules/auth/role2/index',
        nav: true,
        title: 'Role',
        auth: true,
        settings: {
            group: "Auth",
            permission : {"A2":1},
            //permission : {"*":1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'auth/menu',
        name: 'menu',
        moduleId: './modules/auth/menu/index',
        nav: true,
        title: 'Menu',
        auth: true,
        settings: {
            group: "Auth",
            permission : {"A3":1},
            //permission : {"*":1},
            iconClass: 'fa fa-dashboard'
        }
    }
]
