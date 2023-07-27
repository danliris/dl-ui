export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List' },
            { route: 'view/:monthId', moduleId: './view', name: 'view', nav: false, title: 'View:Monitoring Kanban' }, 
            { route: 'upload', moduleId: './upload', name: 'upload', nav: false, title: 'Upload:Monitoring Kanban' }
        ]);

        this.router = router;
    }
}
