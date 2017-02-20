export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'upload'], moduleId: './upload', name: 'upload', nav: false, title: 'Upload: Product' }
        ]);
    }
}