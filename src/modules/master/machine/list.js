import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
console.log("masuk ke list.js");
@inject(Router, Service)
export class List {
  
    context = ["detail"];
    columns = [
    { field: "Name", title: "Nama" },
    { field: "Unit.Name", title: "Unit" },
    { field: "Process", title: "Proses" },
    { field: "Condition", title: "Kondisi" },
    { field: "MonthlyCapacity", title: "Kapasitas Bulanan" },
  ];

  loader = (info) => {
    console.log("masuk ke loader");
    var order = {};
    if (info.sort)
      order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order,
      // select: ["name", "unit.name", "process", "condition", "monthlyCapacity"]
    }

    return this.service.search(arg)
    
      .then(result => {
        console.log("masuk ke search");
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
      case "detail":
        this.router.navigateToRoute('view', { id: data.Id });
        break;
    }
  }


    create() {
        this.router.navigateToRoute('create');
        console.log("masuk ke create");
    }
}
