export class Index {
  configureRouter(config, router) {
    config.map([
        {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'Storages'},
        {route:'view/:id',          moduleId:'./view',          name:'view',        nav:false,      title:'View:Storage'},
        {route:'edit/:id',          moduleId:'./edit',          name:'edit',        nav:false,      title:'Edit:Storage'},
        {route:'create',            moduleId:'./create',        name:'create',      nav:false,      title:'Create:Storage'}
    ]);

    this.router = router;
  }
}