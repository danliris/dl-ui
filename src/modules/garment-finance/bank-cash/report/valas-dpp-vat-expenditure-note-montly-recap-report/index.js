export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Jurnal Pengeluaran Kas Bank Valas' }
        ]);
        this.router = router;
    }
}
