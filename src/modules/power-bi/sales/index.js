export class Index {
  configureRouter(config, router) {
    config.map([
        {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'Sales Reports'},
        {route:'view/:id',          moduleId:'./view',          name:'view',        nav:false,      title:'View:Sales Reports'},
        {route:'edit/:id',          moduleId:'./edit',          name:'edit',        nav:false,      title:'Edit:Sales Reports'},
        {route:'create',            moduleId:'./create',        name:'create',      nav:false,      title:'Create:Sales Reports'}
    ]);

    this.router = router;
  }
}