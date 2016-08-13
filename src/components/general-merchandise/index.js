export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'],      moduleId: './list',         name: 'list',       nav: true,      title: 'List' },
            {route:'view/:id',          moduleId:'./view',          name:'view',        nav:false,      title:'View:General Merchandise'},
            {route:'edit/:id',          moduleId:'./edit',          name:'edit',        nav:false,      title:'Edit:General Merchandise'},
            {route:'create',            moduleId:'./create',        name:'create',      nav:false,      title:'Create:General Merchandise'}
        ]);

        this.router = router;
    }
}
