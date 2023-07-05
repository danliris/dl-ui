export class Index {
    configureRouter(config, router) {
      config.map([{
          route: ["", "list"],
          moduleId: "./list",
          name: "list",
          nav: false,
          title: "List Pengeluaran Gudang Jadi  - Dyeing & Printing"
        },
        {
          route: "create",
          moduleId: "./create",
          name: "create",
          nav: false,
          title: "Create: Pengeluaran Gudang Jadi  - Dyeing & Printing"
        },
        {
          route: 'view/:id',
          moduleId: './view',
          name: 'view',
          nav: false,
          title: 'View: Pengeluaran Gudang Jadi  - Dyeing & Printing'
        },
        {
          route: 'edit/:id',
          moduleId: './edit',
          name: 'edit',
          nav: false,
          title: 'Edit: Pengeluaran Gudang Jadi  - Dyeing & Printing'
        },
        { route: 'excel', 
        moduleId: './excel', 
        name: 'excel', 
        nav: false, 
        title: 'Monitoring : Pengeluaran Gudang Jadi ' }
        
      ]);
  
      this.router = router;
    }
  }
  