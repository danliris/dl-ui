import {
    inject,
    bindable,
    computedFrom
  } from 'aurelia-framework';
  import {
    Service,
    CoreService
  } from "./service";
  import {
    Router
  } from 'aurelia-router';

let FilterRolesLoader = require("../../../loader/roles-loader");
//isStatus = false ;

@inject(Router, Service, CoreService)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    // @bindable permission = {};
    @bindable error = {};

    controlOptions = {
      label: {
        length: 4,
      },
      control: {
        length: 5,
      },
    };
    dataRoles = [];
    constructor(router, service, coreService) {
        this.service = service;
        this.coreService = coreService;
        this.router = router;
        this.IsStatus = false;
      }

    info = { page: 1,size:2000};

    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }

  @bindable selectedFilterRoles;
  async selectedFilterRolesChanged(n, o) {
    // if (this.selectedFilterSPP) {
    
    console.log(n);
    console.log(o);
      this.dataRoles = n;
      this.isStatus = true;
     this.loader()

    // } else {

    //   this.data.displayWarehousesProductionOrders = await this.service.getProductionOrderInputv2();

    // }
  }

    loader() {
        var order = {};
      
        console.log(this.dataRoles);
        var arg = {
          page: this.info.page,
          size: this.info.size,
          order: order,
        }
        console.log(this.dataRoles.Status);

        var selectedCode = [];
        if(this.isStatus === true){
          
          this.dataRoles.permissions.forEach(e => {
              selectedCode.push(e.Code);
          });
        }
          console.log(selectedCode);
        console.log(arg);
        this.coreService.searchMenu(arg)
          .then(result => {
            this.master = [];
            this.auth = [];
            this.prod = [];
            this.spin = [];
            this.purh = [];
            this.sale = [];
            this.invt = [];
            this.gpurh = [];
            this.gmast = [];
            this.gfin = [];
            this.fin = [];
            this.md = [];
            this.weav = [];
            this.acc = [];
            this.gprod = [];
            this.gshipp = [];
            this.gsubc = [];
            this.gsamp = [];
            this.psinv = [];
            this.cust = [];
            this.gdash = [];
            this.dashdp = [];
            this.itinv = [];
            
            
            this.data.permissions.menu = result.data;

            for(var data of this.data.permissions.menu)
            {
                if(data.Menu === 'MASTER')
                {
                    //this.master.push(data);
                    
                      if(selectedCode.includes(data.Code) === true )
                      {
                          data.isEdit = true;
                          this.master.push(data);
                      }else
                      {
                          this.master.push(data);
                      }
                    
                }
                else if(data.Menu === 'AUTH')
                {
                    //this.auth.push(data);
                    if(selectedCode.includes(data.Code) === true )
                    {
                        data.isEdit = true;
                        this.auth.push(data);
                    }else
                    {
                        this.auth.push(data);
                    }
                }
                else if(data.Menu === 'PRODUCTION')
                {
                    //this.prod.push(data);
                    if(selectedCode.includes(data.Code) === true )
                    {
                        data.isEdit = true;
                        this.prod.push(data);
                    }else
                    {
                        this.prod.push(data);
                    }
                }
                else if(data.Menu === 'SPINNING')
                {
                    //this.spin.push(data);
                    if(selectedCode.includes(data.Code) === true )
                    {
                        data.isEdit = true;
                        this.spin.push(data);
                    }else
                    {
                        this.spin.push(data);
                    }
                }
                else if(data.Menu === 'PURCHASING')
                {
                    //this.purh.push(data);
                    if(selectedCode.includes(data.Code) === true )
                    {
                        data.isEdit = true;
                        this.purh.push(data);
                    }else
                    {
                        this.purh.push(data);
                    }
                }
                else if(data.Menu === 'SALES')
                {
                    //this.sale.push(data);

                    if(selectedCode.includes(data.Code) === true )
                    {
                        data.isEdit = true;
                        this.sale.push(data);
                    }else
                    {
                        this.sale.push(data);
                    }
                }
                else if(data.Menu === 'INVENTORY')
                {
                    //this.invt.push(data);

                    if(selectedCode.includes(data.Code) === true )
                    {
                        data.isEdit = true;
                        this.invt.push(data);
                    }else
                    {
                        this.invt.push(data);
                    }
                }
                else if(data.Menu === 'G-PURCHASING')
                {
                    //this.gpurh.push(data);
                    if(selectedCode.includes(data.Code) === true )
                    {
                        data.isEdit = true;
                        this.gpurh.push(data);
                    }else
                    {
                        this.gpurh.push(data);
                    }
                }
                else if(data.Menu === 'G-MASTER-PLAN')
                {
                    //this.gmast.push(data);
                    if(selectedCode.includes(data.Code) === true )
                    {
                        data.isEdit = true;
                        this.gmast.push(data);
                    }else
                    {
                        this.gmast.push(data);
                    }
                }
                else if(data.Menu === 'G-FINANCE')
                {
                    //this.gfin.push(data);

                    if(selectedCode.includes(data.Code) === true )
                    {
                        data.isEdit = true;
                        this.gfin.push(data);
                    }else
                    {
                        this.gfin.push(data);
                    }
                }
                else if(data.Menu === 'FINANCE')
                {
                    //this.fin.push(data);
                    if(selectedCode.includes(data.Code) === true )
                    {
                        data.isEdit = true;
                        this.fin.push(data);
                    }else
                    {
                        this.fin.push(data);
                    }
                }
                else if(data.Menu === 'MERCHANDISER')
                {
                    //this.md.push(data);
                    if(selectedCode.includes(data.Code) === true )
                    {
                        data.isEdit = true;
                        this.md.push(data);
                    }else
                    {
                        this.md.push(data);
                    }
                }
                else if(data.Menu === 'WEAVING')
                {
                    //this.weav.push(data);
                    if(selectedCode.includes(data.Code) === true )
                    {
                        data.isEdit = true;
                        this.weav.push(data);
                    }else
                    {
                        this.weav.push(data);
                    }
                }
                else if(data.Menu === 'ACCOUNTING')
                {
                    //this.acc.push(data);
                    if(selectedCode.includes(data.Code) === true )
                    {
                        data.isEdit = true;
                        this.acc.push(data);
                    }else
                    {
                        this.acc.push(data);
                    }
                }
                else if(data.Menu === 'G-PRODUCTION')
                {
                    //this.gprod.push(data);
                    if(selectedCode.includes(data.Code) === true )
                    {
                        data.isEdit = true;
                        this.gprod.push(data);
                    }else
                    {
                        this.gprod.push(data);
                    }
                }
                else if(data.Menu === 'G-SHIPPING')
                {
                    //this.gshipp.push(data);
                    if(selectedCode.includes(data.Code) === true )
                    {
                        data.isEdit = true;
                        this.gshipp.push(data);
                    }else
                    {
                        this.gshipp.push(data);
                    }
                }
                else if(data.Menu === 'G-SUBCON')
                {
                    //this.gsubc.push(data);
                    if(selectedCode.includes(data.Code) === true )
                    {
                        data.isEdit = true;
                        this.gsubc.push(data);
                    }else
                    {
                        this.gsubc.push(data);
                    }
                }
                else if(data.Menu === 'G-SAMPLE')
                {
                    //this.gsamp.push(data);
                    if(selectedCode.includes(data.Code) === true )
                    {
                        data.isEdit = true;
                        this.gsamp.push(data);
                    }else
                    {
                        this.gsamp.push(data);
                    }
                }
                else if(data.Menu === 'PS-INVENTORY')
                {
                    //this.psinv.push(data);
                    if(selectedCode.includes(data.Code) === true )
                    {
                        data.isEdit = true;
                        this.psinv.push(data);
                    }else
                    {
                        this.psinv.push(data);
                    }
                }
                else if(data.Menu === 'CUSTOMS')
                {
                    //this.cust.push(data);
                    if(selectedCode.includes(data.Code) === true )
                    {
                        data.isEdit = true;
                        this.cust.push(data);
                    }else
                    {
                        this.cust.push(data);
                    }
                    
                }
                else if(data.Menu === 'G-DASHBOARD')
                {
                    //this.gdash.push(data);
                    if(selectedCode.includes(data.Code) === true )
                    {
                        data.isEdit = true;
                        this.gdash.push(data);
                    }else
                    {
                        this.gdash.push(data);
                    }
                }
                else if(data.Menu === 'DASHBOARD-DP')
                {
                    //this.dashdp.push(data);
                    if(selectedCode.includes(data.Code) === true )
                    {
                        data.isEdit = true;
                        this.dashdp.push(data);
                    }else
                    {
                        this.dashdp.push(data);
                    }
                }
                else if(data.Menu === 'IT-INVENTORY')
                {
                    //this.dashdp.push(data);
                    if(selectedCode.includes(data.Code) === true )
                    {
                        data.isEdit = true;
                        this.itinv.push(data);
                    }else
                    {
                        this.itinv.push(data);
                    }
                }
            }

            // this.auth = auth;
            // this.master = master;
            // this.prod = prod;
            // this.spin = spin;
            // this.purch = purh;
            // this.sale = sale;
            // this.invt = invt;
            // this.gpurh = gpurh;
            // this.gmast = gmast;
            // this.gfin = gfin;
            // this.fin = fin;
            // this.md = md;
            // this.weav = weav;
            // this.acc = acc;
            // this.gprod = gprod;
            // this.gshipp = gshipp;
            // this.gsubc = gsubc;

            this.fillTableAuth();
            this.fillTableMaster();
            this.fillTableProd();
            this.fillTableSpin();
            this.fillTablePurchasing();
            this.fillTableSales();
            this.fillTableInvt();
            this.fillTableGPurc();
            this.fillTableGMas();
            this.fillTableGFin();
            this.fillTableFin();
            this.fillTableMD();
            this.fillTableWeav();
            this.fillTableAcc();
            this.fillTableGPro();
            this.fillTableGShip();
            this.fillTableGSub();
            this.fillTableGSam();
            this.fillTablePSInv();
            this.fillTableCust();
            this.fillTableGDas();
            this.fillTableDash();
            this.fillTableItInve();
            
           

          });
    
      }

      fillTableItInve() {
        //PREPARING
        let columns = [];
        columns.push({ field: 'Menu', title: 'Menu' ,width:200});
        columns.push({ field: 'SubMenu', title: 'SubMenu' ,width:200});
        columns.push({ field: 'isEdit', title: '',checkbox: true, sortable: false,width:20 });
        columns.push({ field: 'MenuName', title: 'MenuName' });
        // columns.push({ field: 'permission', value:1 });
  
        var bootstrapTableOptions = {
          columns: columns,
          data: this.itinv,
          fixedColumns: false,
          fixedNumber: 1
        };
        //bootstrapTableOptions.height = 150;
  
        $(this.tableItInv).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);
  
        // console.log(bootstrapTableOptions);
    }

      fillTableAuth() {
        //PREPARING
        let columns = [];
        columns.push({ field: 'Menu', title: 'Menu' ,width:200});
        columns.push({ field: 'SubMenu', title: 'SubMenu' ,width:200});
        columns.push({ field: 'isEdit', title: '',checkbox: true, sortable: false,width:20 });
        columns.push({ field: 'MenuName', title: 'MenuName' });
        // columns.push({ field: 'permission', value:1 });
  
        var bootstrapTableOptions = {
          columns: columns,
          data: this.auth,
          fixedColumns: false,
          fixedNumber: 1
        };
        //bootstrapTableOptions.height = 150;
  
        $(this.tableAuth).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);
  
        console.log(bootstrapTableOptions);
    }

    fillTableMaster() {
      //PREPARING
      let columns = [];
      columns.push({ field: 'Menu', title: 'Menu' ,width:200});
      columns.push({ field: 'SubMenu', title: 'SubMenu' ,width:200});
      columns.push({ field: 'isEdit', title: '',checkbox: true, sortable: false,width:20 });
      columns.push({ field: 'MenuName', title: 'MenuName' });
      // columns.push({ field: 'permission', value:1 });

      var bootstrapTableOptions = {
        columns: columns,
        data: this.master,
        fixedColumns: false,
        fixedNumber: 1
      };
      //bootstrapTableOptions.height = 150;

      $(this.tableMaster).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);

      // console.log(bootstrapTableOptions);
  }

  fillTableProd() {
    //PREPARING
    let columns = [];
    columns.push({ field: 'Menu', title: 'Menu' ,width:200});
    columns.push({ field: 'SubMenu', title: 'SubMenu' ,width:200});
    columns.push({ field: 'isEdit', title: '',checkbox: true, sortable: false,width:20 });
    columns.push({ field: 'MenuName', title: 'MenuName' });
    // columns.push({ field: 'permission', value:1 });

    var bootstrapTableOptions = {
      columns: columns,
      data: this.prod,
      fixedColumns: false,
      fixedNumber: 1
    };
    //bootstrapTableOptions.height = 150;

    $(this.tableProduction).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);

    // console.log(bootstrapTableOptions);
}

fillTableSpin() {
  //PREPARING
  let columns = [];
  columns.push({ field: 'Menu', title: 'Menu' ,width:200});
  columns.push({ field: 'SubMenu', title: 'SubMenu' ,width:200});
  columns.push({ field: 'isEdit', title: '',checkbox: true, sortable: false,width:20 });
  columns.push({ field: 'MenuName', title: 'MenuName' });
  // columns.push({ field: 'permission', value:1 });

  var bootstrapTableOptions = {
    columns: columns,
    data: this.spin,
    fixedColumns: false,
    fixedNumber: 1
  };
  //bootstrapTableOptions.height = 150;

  $(this.tableSpinning).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);

  // console.log(bootstrapTableOptions);
}

fillTablePurchasing() {
  //PREPARING
  let columns = [];
  columns.push({ field: 'Menu', title: 'Menu' ,width:200});
  columns.push({ field: 'SubMenu', title: 'SubMenu',width:200 });
  columns.push({ field: 'isEdit', title: '',checkbox: true, sortable: false,width:20  });
  columns.push({ field: 'MenuName', title: 'MenuName' });

  var bootstrapTableOptions = {
    columns: columns,
    data: this.purh,
    fixedColumns: false,
    fixedNumber: 1
  };
  //bootstrapTableOptions.height = 150;

  $(this.tablePurchasing).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);
}

fillTableSales() {
  //PREPARING
  let columns = [];
  columns.push({ field: 'Menu', title: 'Menu' ,width:200});
  columns.push({ field: 'SubMenu', title: 'SubMenu' ,width:200});
  columns.push({ field: 'isEdit', title: '',checkbox: true, sortable: false,width:20 });
  columns.push({ field: 'MenuName', title: 'MenuName' });
  // columns.push({ field: 'permission', value:1 });

  var bootstrapTableOptions = {
    columns: columns,
    data: this.sale,
    fixedColumns: false,
    fixedNumber: 1
  };
  //bootstrapTableOptions.height = 150;

  $(this.tableSales).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);

  // console.log(bootstrapTableOptions);
}

fillTableInvt() {
  //PREPARING
  let columns = [];
  columns.push({ field: 'Menu', title: 'Menu' ,width:200});
  columns.push({ field: 'SubMenu', title: 'SubMenu' ,width:200});
  columns.push({ field: 'isEdit', title: '',checkbox: true, sortable: false,width:20 });
  columns.push({ field: 'MenuName', title: 'MenuName' });
  // columns.push({ field: 'permission', value:1 });

  var bootstrapTableOptions = {
    columns: columns,
    data: this.invt,
    fixedColumns: false,
    fixedNumber: 1
  };
  //bootstrapTableOptions.height = 150;

  $(this.tableInventory).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);

  // console.log(bootstrapTableOptions);
}

fillTableGPurc() {
  //PREPARING
  let columns = [];
  columns.push({ field: 'Menu', title: 'Menu' ,width:200});
  columns.push({ field: 'SubMenu', title: 'SubMenu' ,width:200});
  columns.push({ field: 'isEdit', title: '',checkbox: true, sortable: false,width:20 });
  columns.push({ field: 'MenuName', title: 'MenuName' });
  // columns.push({ field: 'permission', value:1 });

  var bootstrapTableOptions = {
    columns: columns,
    data: this.gpurh,
    fixedColumns: false,
    fixedNumber: 1
  };
  //bootstrapTableOptions.height = 150;

  $(this.tableGPurhcasing).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);

  // console.log(bootstrapTableOptions);
}

fillTableGMas() {
  //PREPARING
  let columns = [];
  columns.push({ field: 'Menu', title: 'Menu' ,width:200});
  columns.push({ field: 'SubMenu', title: 'SubMenu' ,width:200});
  columns.push({ field: 'isEdit', title: '',checkbox: true, sortable: false,width:20 });
  columns.push({ field: 'MenuName', title: 'MenuName' });
  // columns.push({ field: 'permission', value:1 });

  var bootstrapTableOptions = {
    columns: columns,
    data: this.gmast,
    fixedColumns: false,
    fixedNumber: 1
  };
  //bootstrapTableOptions.height = 150;

  $(this.tableGMasterPlan).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);

  // console.log(bootstrapTableOptions);
}

fillTableGFin() {
  //PREPARING
  let columns = [];
  columns.push({ field: 'Menu', title: 'Menu' ,width:200});
  columns.push({ field: 'SubMenu', title: 'SubMenu' ,width:200});
  columns.push({ field: 'isEdit', title: '',checkbox: true, sortable: false,width:20 });
  columns.push({ field: 'MenuName', title: 'MenuName' });
  // columns.push({ field: 'permission', value:1 });

  var bootstrapTableOptions = {
    columns: columns,
    data: this.gfin,
    fixedColumns: false,
    fixedNumber: 1
  };
  //bootstrapTableOptions.height = 150;

  $(this.tableGFinance).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);

  // console.log(bootstrapTableOptions);
}

fillTableFin() {
  //PREPARING
  let columns = [];
  columns.push({ field: 'Menu', title: 'Menu' ,width:200});
  columns.push({ field: 'SubMenu', title: 'SubMenu' ,width:200});
  columns.push({ field: 'isEdit', title: '',checkbox: true, sortable: false,width:20 });
  columns.push({ field: 'MenuName', title: 'MenuName' });
  // columns.push({ field: 'permission', value:1 });

  var bootstrapTableOptions = {
    columns: columns,
    data: this.fin,
    fixedColumns: false,
    fixedNumber: 1
  };
  //bootstrapTableOptions.height = 150;

  $(this.tableFinance).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);

  // console.log(bootstrapTableOptions);
}

      fillTableMD() {
        //PREPARING
        let columns = [];
        columns.push({ field: 'Menu', title: 'Menu' ,width:200});
        columns.push({ field: 'SubMenu', title: 'SubMenu' ,width:200});
        columns.push({ field: 'isEdit', title: '',checkbox: true, sortable: false,width:20 });
        columns.push({ field: 'MenuName', title: 'MenuName' });
        // columns.push({ field: 'permission', value:1 });
  
        var bootstrapTableOptions = {
          columns: columns,
          data: this.md,
          fixedColumns: false,
          fixedNumber: 1
        };
        //bootstrapTableOptions.height = 150;
  
        $(this.tableMD).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);
  
        // console.log(bootstrapTableOptions);
    }

    fillTableWeav() {
      //PREPARING
      let columns = [];
      columns.push({ field: 'Menu', title: 'Menu' ,width:200});
      columns.push({ field: 'SubMenu', title: 'SubMenu' ,width:200});
      columns.push({ field: 'isEdit', title: '',checkbox: true, sortable: false,width:20 });
      columns.push({ field: 'MenuName', title: 'MenuName' });
      // columns.push({ field: 'permission', value:1 });
    
      var bootstrapTableOptions = {
        columns: columns,
        data: this.weav,
        fixedColumns: false,
        fixedNumber: 1
      };
      //bootstrapTableOptions.height = 150;
    
      $(this.tableWeaving).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);
    
      // console.log(bootstrapTableOptions);
    }

    fillTableAcc() {
      //PREPARING
      let columns = [];
      columns.push({ field: 'Menu', title: 'Menu' ,width:200});
      columns.push({ field: 'SubMenu', title: 'SubMenu' ,width:200});
      columns.push({ field: 'isEdit', title: '',checkbox: true, sortable: false,width:20 });
      columns.push({ field: 'MenuName', title: 'MenuName' });
      // columns.push({ field: 'permission', value:1 });
    
      var bootstrapTableOptions = {
        columns: columns,
        data: this.acc,
        fixedColumns: false,
        fixedNumber: 1
      };
      //bootstrapTableOptions.height = 150;
    
      $(this.tableAccounting).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);
    
      // console.log(bootstrapTableOptions);
    }

    fillTableGPro() {
      //PREPARING
      let columns = [];
      columns.push({ field: 'Menu', title: 'Menu' ,width:200});
      columns.push({ field: 'SubMenu', title: 'SubMenu' ,width:200});
      columns.push({ field: 'isEdit', title: '',checkbox: true, sortable: false,width:20 });
      columns.push({ field: 'MenuName', title: 'MenuName' });
      // columns.push({ field: 'permission', value:1 });
    
      var bootstrapTableOptions = {
        columns: columns,
        data: this.gprod,
        fixedColumns: false,
        fixedNumber: 1
      };
      //bootstrapTableOptions.height = 150;
    
      $(this.tableGProduction).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);
    
      // console.log(bootstrapTableOptions);
    }

    fillTableGShip() {
      //PREPARING
      let columns = [];
      columns.push({ field: 'Menu', title: 'Menu' ,width:200});
      columns.push({ field: 'SubMenu', title: 'SubMenu' ,width:200});
      columns.push({ field: 'isEdit', title: '',checkbox: true, sortable: false,width:20 });
      columns.push({ field: 'MenuName', title: 'MenuName' });
      // columns.push({ field: 'permission', value:1 });
    
      var bootstrapTableOptions = {
        columns: columns,
        data: this.gshipp,
        fixedColumns: false,
        fixedNumber: 1
      };
      //bootstrapTableOptions.height = 150;
    
      $(this.tableGShipping).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);
    
      // console.log(bootstrapTableOptions);
    }

    fillTableGSub() {
      //PREPARING
      let columns = [];
      columns.push({ field: 'Menu', title: 'Menu' ,width:200});
      columns.push({ field: 'SubMenu', title: 'SubMenu' ,width:200});
      columns.push({ field: 'isEdit', title: '',checkbox: true, sortable: false,width:20 });
      columns.push({ field: 'MenuName', title: 'MenuName' });
      // columns.push({ field: 'permission', value:1 });
    
      var bootstrapTableOptions = {
        columns: columns,
        data: this.gsubc,
        fixedColumns: false,
        fixedNumber: 1
      };
      //bootstrapTableOptions.height = 150;
    
      $(this.tableGSubcon).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);
    
      // console.log(bootstrapTableOptions);
    }

    fillTableGSam() {
      //PREPARING
      let columns = [];
      columns.push({ field: 'Menu', title: 'Menu' ,width:200});
      columns.push({ field: 'SubMenu', title: 'SubMenu' ,width:200});
      columns.push({ field: 'isEdit', title: '',checkbox: true, sortable: false,width:20 });
      columns.push({ field: 'MenuName', title: 'MenuName' });
      // columns.push({ field: 'permission', value:1 });
    
      var bootstrapTableOptions = {
        columns: columns,
        data: this.gsamp,
        fixedColumns: false,
        fixedNumber: 1
      };
      //bootstrapTableOptions.height = 150;
    
      $(this.tableGSample).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);
    
      // console.log(bootstrapTableOptions);
    }

    fillTablePSInv() {
      //PREPARING
      let columns = [];
      columns.push({ field: 'Menu', title: 'Menu' ,width:200});
      columns.push({ field: 'SubMenu', title: 'SubMenu' ,width:200});
      columns.push({ field: 'isEdit', title: '',checkbox: true, sortable: false,width:20 });
      columns.push({ field: 'MenuName', title: 'MenuName' });
      // columns.push({ field: 'permission', value:1 });
    
      var bootstrapTableOptions = {
        columns: columns,
        data: this.psinv,
        fixedColumns: false,
        fixedNumber: 1
      };
      //bootstrapTableOptions.height = 150;
    
      $(this.tablePSInvt).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);
    
      // console.log(bootstrapTableOptions);
    }

    fillTableCust() {
      //PREPARING
      let columns = [];
      columns.push({ field: 'Menu', title: 'Menu' ,width:200});
      columns.push({ field: 'SubMenu', title: 'SubMenu' ,width:200});
      columns.push({ field: 'isEdit', title: '',checkbox: true, sortable: false,width:20 });
      columns.push({ field: 'MenuName', title: 'MenuName' });
      // columns.push({ field: 'permission', value:1 });
    
      var bootstrapTableOptions = {
        columns: columns,
        data: this.cust,
        fixedColumns: false,
        fixedNumber: 1
      };
      //bootstrapTableOptions.height = 150;
    
      $(this.tableCustoms).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);
    
      // console.log(bootstrapTableOptions);
    }

    fillTableGDas() {
      //PREPARING
      let columns = [];
      columns.push({ field: 'Menu', title: 'Menu' ,width:200});
      columns.push({ field: 'SubMenu', title: 'SubMenu' ,width:200});
      columns.push({ field: 'isEdit', title: '',checkbox: true, sortable: false,width:20 });
      columns.push({ field: 'MenuName', title: 'MenuName' });
      // columns.push({ field: 'permission', value:1 });
    
      var bootstrapTableOptions = {
        columns: columns,
        data: this.gdash,
        fixedColumns: false,
        fixedNumber: 1
      };
      //bootstrapTableOptions.height = 150;
    
      $(this.tableGDas).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);
    
      // console.log(bootstrapTableOptions);
    }

    fillTableDash() {
      //PREPARING
      let columns = [];
      columns.push({ field: 'Menu', title: 'Menu' ,width:200});
      columns.push({ field: 'SubMenu', title: 'SubMenu' ,width:200});
      columns.push({ field: 'isEdit', title: '',checkbox: true, sortable: false,width:20 });
      columns.push({ field: 'MenuName', title: 'MenuName' });
      // columns.push({ field: 'permission', value:1 });
    
      var bootstrapTableOptions = {
        columns: columns,
        data: this.dashdp,
        fixedColumns: false,
        fixedNumber: 1
      };
      //bootstrapTableOptions.height = 150;
    
      $(this.tableDash).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);
    
      // console.log(bootstrapTableOptions);
    }

    activate() {
    }

    attached() {
    }

    get filterRolesLoader() {
      return FilterRolesLoader;
    }
    rolesTextFormatter = (role) => {
      return `${role.name}`
    }

} 
