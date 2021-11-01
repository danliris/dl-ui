// export class Index {
//     configureRouter(config, router) {
//         config.map([
//             { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'Fitur Pencarian No BC' },
//             { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:Monitoring Garment Purchase' },
//         ]);

//         this.router = router;
//     }
// }

export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:Detail' }

        ]);

        this.router = router;
    }
}