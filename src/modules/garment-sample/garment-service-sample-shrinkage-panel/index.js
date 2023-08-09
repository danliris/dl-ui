export class Index {
	configureRouter(config, router) {
		config.map([
			{ route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Sample Jasa - Sewing' },
			{ route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Sample Jasa - Sewing' },
			{ route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Sample Jasa - Sewing' },
			{ route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Sample Jasa - Sewing' },
			{ route: 'excel', moduleId: './excel', name: 'excel', nav: false, title: 'Excel: Sample Jasa - Sewing' }
		]);
		this.router = router;
	}
}
