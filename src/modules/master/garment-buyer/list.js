import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {
    context = ["detail","nonaktif", "detail "];
    columns = [
    {
      field: "isPosting", title: "Post", checkbox: true, sortable: false,
      formatter: function (value, data, index) {
        this.checkboxEnabled = !data.IsPosted;
        return ""
    }
    },
    { field: "Code", title: "Kode" },
    { field: "Name", title: "Nama" },
    { field: "Address", title: "Alamat" },
    { field: "City", title: "Kota" },
    { field: "Country", title: "Negara" },
    { field: "Contact", title: "Kontak" },
    { field: "Tempo", title: "Tempo" },
    {
      field: "IsPosted", title: "Active",
      formatter: function (value, row, index) {
        return value ? "SUDAH" : "BELUM";
      }
    },
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
      select: ["Code", "Name", "Address", "City", "Country", "Contact", "Tempo", "IsPosted"],
      order: order
    }

    return this.service.search(arg)
      .then(result => {
        return {
          total: result.info.total,
          data: result.data
        }
      });
  }

    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.buyerId = "";
        this.buyers = [];
    }

   contextCallback(event) {
    var arg = event.detail;
    var data = arg.data;
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
          if(this.error && this.error.ErrorPost) {
              alert(this.error.ErrorPost);
          }
        });
        break;
    }
  }
  
  contextShowCallback(index, name, data) {
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

  // posting() {
  //   if (this.dataToBePosted.length > 0) {
  //     this.service.post(this.dataToBePosted).then(result => {
  //       this.table.refresh();
  //     }).catch(e => {
  //       this.error = e;
  //     })
  //   }
  // }

posting() {
  if (this.dataToBePosted.length > 0) {
    this.service.post(this.dataToBePosted)
      .then(result => {
        if (result && result.error) {
          alert(result.error);
          return;
        }
        this.table.refresh();
      })
      .catch(e => {
        var message = "Terjadi error";
        if (e) {
          if (e.error) {
            message = e.error;
          } else if (e.message) {
            message = e.message;
          }
        }
        alert(message);
      });
  } else {
    alert("Tidak ada data dipilih");
  }
}

  create() {
        this.router.navigateToRoute('create');
  }

  upload() {
    this.router.navigateToRoute('upload');
  }

  downloadTemplate() {
    this.service.downloadTemplate();
  } 
}
