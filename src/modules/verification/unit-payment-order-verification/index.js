export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'Verifikasi Surat Perintah Bayar' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create:Verifikasi Surat Perintah Bayar' },
        ]);

        this.router = router;
    }
}
