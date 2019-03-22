export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List Laporan Purchase Order Internal' }, 
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:Laporan Purchase Order Internal' }, 
        ]);

        this.router = router;
    }
}
