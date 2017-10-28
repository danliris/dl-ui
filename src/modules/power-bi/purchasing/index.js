export class Index {
  configureRouter(config, router) {
    config.map([
        {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'Production Reports'},
        {route:'view/:id',          moduleId:'./view',          name:'view',        nav:false,      title:'View:Production Reports'},
        {route:'edit/:id',          moduleId:'./edit',          name:'edit',        nav:false,      title:'Edit:Production Reports'},
        {route:'create',            moduleId:'./create',        name:'create',      nav:false,      title:'Create:Production Reports'}
    ]);

    this.router = router;
  }
}
