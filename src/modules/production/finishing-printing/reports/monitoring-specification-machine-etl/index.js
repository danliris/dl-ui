export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'LAPORAN MONITORING SPESIFIKASI MESIN' },
        ]);

        this.router = router;
    }
}