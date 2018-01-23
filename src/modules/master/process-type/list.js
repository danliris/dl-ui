import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
  context = ["Rincian"];
  columns = [
    // { field: "code", title: "Kode" },
    { field: "name", title: "Jenis Proses" },    
    { field: "orderType.name", title: "Jenis Order" },
];

  loader = (info) => {
    var order = {};
    if (info.sort)
      order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      select: ["name","orderType"],
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
  }

  contextCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "Rincian":
        this.router.navigateToRoute('view', { id: data._id });
        break;
    }
  }

  create() {
    this.router.navigateToRoute('create');
  }

  upload() {
    this.router.navigateToRoute('upload');
  }

}
