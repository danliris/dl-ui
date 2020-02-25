export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Validasi Surat Perintah Produksi - Kabag MD' },

            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Validasi Surat Perintah Produksi - Kabag MD' }

        ]);

        this.router = router;
    }
}