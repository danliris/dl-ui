import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

@inject(Router, Service)
export class List {
  context = ["detail", "nonaktif", "detail "];
  columns = [
    {
      field: "isPosting", title: "Post", checkbox: true, sortable: false,
      formatter: function (value, data, index) {
        this.checkboxEnabled = !data.IsPosted;
        return ""
      }
    },
    { field: "code", title: "Kode" },
    { field: "name", title: "Nama" },
    { field: "address", title: "Alamat" },
    { field: "NPWP", title: "NPWP" },
    {
      field: "import", title: "Import",
      formatter: function (value, row, index) {
        return value ? "YA" : "TIDAK";
      }
    },
    {
      field: "usevat", title: "Kena PPN",
      formatter: function (value, row, index) {
        return value ? "YA" : "TIDAK";
      }
    },
    {
      field: "usetax", title: "Kena PPH",
      formatter: function (value, row, index) {
        return value ? "YA" : "TIDAK";
      }
    },
    {
      field: "IsPosted", title: "Active",
      formatter: function (value, row, index) {
        return value ? "SUDAH" : "BELUM";
      }
    },
    // { field: "IncomeTaxes", title: "PPH", formatter: function (value, data, index) {
    //   if(data.IncomeTaxes.name == "" || data.IncomeTaxes.name == null && data.IncomeTaxes.rate == 0){
    //     return "-"
    //   }else{
    //     return data.IncomeTaxes.name + " - " + data.IncomeTaxes.rate;
    //   }
    // } },
  ];

  dataToBePosted = [];
  rowFormatter(data, index) {
    if (data.IsPosted)
      return { classes: "success" }
    else
      return {}
  }

  loader = (info) => {
    var order = {};
    if (info.sort)
      order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      select:["code","name","address","import","NPWP","usevat","usetax","IncomeTaxes", "IsPosted"],
      order: order
    }

    return this.service.search(arg)
      .then(result => {
        return {
          total: result.info.total,
          data: result.data
        }
        data.IncomeTaxesName=result.data.IncomeTaxes.name;
      });
  }

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  contextCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    console.log(data);
    console.log(event);
    switch (arg.name) {
      case "detail":
        this.router.navigateToRoute('view', { id: data.Id });
        break;
      case "detail ":
        this.router.navigateToRoute('view', { id: data.Id });
        break;
      case "nonaktif":
        this.service.nonActived(data.Id).then(result => {
          this.table.refresh();
        }).catch(e => {
          this.error = e;
        });
        break;
    }
  }

  contextShowCallback(index, name, data) {
    console.log(data);
    
    switch (name) {
        case "detail ":
        case "nonaktif":
            return data.IsPosted;
        case "detail":
            return !data.IsPosted;
        default:
            return true;
    }
}
  
  posting() {
    if (this.dataToBePosted.length > 0) {
      this.service.post(this.dataToBePosted).then(result => {
        this.table.refresh();
      }).catch(e => {
        this.error = e;
      })
    }
  }

  create() {
    this.router.navigateToRoute('create');
  }

  upload() {
    this.router.navigateToRoute('upload');
  } 
} 
