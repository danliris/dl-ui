export class Index {
    configureRouter(config, router) {
      config.map([{
          route: ["", "list"],
          moduleId: "./list",
          name: "list",
          nav: false,
          title: "List Gudang Barang Jadi - Dyeing & Printing"
        },
        {
          route: "create",
          moduleId: "./create",
          name: "create",
          nav: false,
          title: "Create: Gudang Barang Jadi - Dyeing & Printing"
        },
        {
          route: 'view/:id',
          moduleId: './view',
          name: 'view',
          nav: false,
          title: 'View: Gudang Barang Jadi - Dyeing & Printing'
        },
        {
          route: 'edit/:id',
          moduleId: './edit',
          name: 'edit',
          nav: false,
          title: 'Edit: Gudang Barang Jadi - Dyeing & Printing'
        },
        { route: 'excel', 
        moduleId: './excel', 
        name: 'excel', 
        nav: false, 
        title: 'Monitoring : Penerimaan Gudang Barang Jadi - Dyeing & Printing' },
        { route: 'pending', 
        moduleId: './pending', 
        name: 'pending', 
        nav: false, 
        title: 'Pending : List Belum Diterima' }
        
      ]);
  
      this.router = router;
    }
  }
  