import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";

@inject(Router, Service)
export class List {
  context = ["detail"];
  columns = [
    { field: "unit", title: "Unit Weaving" },
    { field: "machineNumber", title: "No. Mesin" },
    { field: "machineType", title: "Tipe Mesin" },
    { field: "rpm", title: "RPM" },
    { field: "location", title: "Lokasi" },
    { field: "block", title: "Blok" },
    { field: "blockKaizen", title: "Blok Kaizen" },
    { field: "maintenance", title: "Maintenance" },
    { field: "operator", title: "Operator" }
  ];

  loader = info => {
    var order = {};
    if (info.sort) order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      // select: ["code", "name", "description"],
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
          id: 1,
          unit: "Weaving1",
          machineNumber: "000001",
          machineType: "Type C",
          rpm: 50000,
          location: "Place A",
          block: "a",
          blockKaizen: "K1",
          maintenance: "maintenance",
          operator: "operator"
        }
      ]
    };
  };

  constructor(router, service) {
    this.service = service;
    this.router = router;
    // this.accessoriesId = "";
    // this.accessories = [];
  }

  contextCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "detail":
        this.router.navigateToRoute("view", { id: data.id });
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
