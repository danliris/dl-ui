export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Kanban' },
            { route: 'board/:id', moduleId: './board', name: 'board', nav: false, title: 'Board: Kanban' },
        ]);

        this.router = router;
    }
}
