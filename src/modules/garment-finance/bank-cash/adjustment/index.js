export class Index {
	configureRouter(config, router) {
		config.map([
			{ route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Jurnal Penyesuaian' },
			{ route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Jurnal Penyesuaian' },
			{ route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Jurnal Penyesuaian' },
			{ route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Jurnal Penyesuaian' },
		]);
		this.router = router;		
	}
}
