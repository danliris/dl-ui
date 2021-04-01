export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'Memorial Pembelian Job Garment' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Tambah Memorial Pembelian Job Garment' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Bukti Pengeluaran Bank' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'Detail Memorial Pembelian Job Garment' }
        ]);

        this.router = router;
    }
}
