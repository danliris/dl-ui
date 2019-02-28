import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";

@inject(Router, Service)
export class List {
  context = ["detail"];
  columns = [
    { field: "weavingUnit", title: "Unit Weaving" },
    { field: "machineNumber", title: "No. Mesin" },
    { field: "machineType", title: "Jenis Mesin" },
    { field: "rpm", title: "RPM" },
    { field: "unit", title: "Satuan" },
    { field: "location", title: "Lokasi" }
  ];

  loader = info => {
    var order = {};
    if (info.sort) order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order
    };

    // return this.service.search(arg).then(result => {
    //   return {
    //     total: result.info.total,
    //     data: result.data
    //     // data: [
    //     //   {
    //     //     unit: "Weaving1",
    //     //     machineNumber: 000001,
    //     //     machineType: "Type C",
    //     //     rpm: 50000,
    //     //     location: "Place A",
    //     //     block: "a",
    //     //     maintenance: "maintenance",
    //     //     operator: "operator"
    //     //   }
    //     // ]
    //   };
    // });

    return {
      total: 1,
      // data: result.data
      data: [
        {
          Id: 1,
          weavingUnit: "Weaving1",
          machineNumber: "000001",
          machineType: "Tsudakoma",
          rpm: 50000,
          unit: "cmpx",
          location: "Place A"
        }
      ]
    };
  };

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  contextCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "detail":
        this.router.navigateToRoute("view", { Id: data.Id });
        break;
    }
  }

  // upload() {
  //     this.router.navigateToRoute('upload');
  // }

  create() {
    this.router.navigateToRoute("create");
  }
}
