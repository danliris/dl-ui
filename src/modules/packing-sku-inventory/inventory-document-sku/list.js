import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
  dataToBePosted = [];

  context = ["detail"]

  columns = [
    { field: "DocumentNo", title: "No. Dokumen" },
    {
      field: "Date", title: "Tanggal", formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY");
      }
    },
    { field: "ReferenceNo", title: "No. Referensi" },
    { field: "ReferenceType", title: "Jenis Referensi" },
    { field: "StorageName", title: "Gudang" },
    { field: "Type", title: "Status" }
  ];

  loader = (info) => {
    var order = {};
    if (info.sort)
      order[info.sort] = info.order;
    // console.log(info)
    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order
    }

    return this.service.search(arg)
      .then(result => {
        return {
          total: result.total,
          data: result.data
        }
      });
  }

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  contextClickCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "detail":
        this.router.navigateToRoute('view', { id: data.Id });
        break;
    }
  }

  contextShowCallback(index, name, data) {
    switch (name) {
      case "view":
        return true;
      default:
        return true;
    }
  }

  create() {
    this.router.navigateToRoute('create');
  }
}
