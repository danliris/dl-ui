export class Index {
    configureRouter(config, router) {
        console.log("masuk index.js");
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'LAPORAN OUTPUT MESIN PER HARI' },
        ]);

        this.router = router;
    }
}