import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";

@inject(Router, Service)
export class List {
  context = ["detail"];

  columns = [
    { field: "runningMachineOrderDate", title: "Tanggal/ Jam" },
    { field: "weavingUnit", title: "Unit Weaving" },
    { field: "runningMachineNumber", title: "No. Mesin" },
    { field: "orderProductionNumber", title: "No. Surat Perintah Produksi" },
    { field: "constructionNumber", title: "No. Konstruksi" },
    { field: "warpOrigin", title: "Asal Lusi" },
    { field: "weftorigin", title: "Asal Pakan" }
  ];

  loader = info => {
      var order = {};
      if (info.sort) order[info.sort] = info.order;

      var arg = {
        page: parseInt(info.offset / info.limit, 10),
        size: info.limit,
        keyword: info.search,
        order: order
      };

    //   return this.service.search(arg).then(result => {
    //     return {
    //       total: result.info.total,
    //       data: result.data
    //     };
    //     // .catch(error=>{
    //     //     console.log(error);
    //     // })
    //   });
    // };

    return {
      total: 1,
      data: [
        {
          Id: 1,
          runningMachineOrderDate: "02/02/2019",
          weavingUnit: "Weaving1",
          runningMachineNumber: "000001",
          orderProductionNumber: "002/02-2019",
          constructionNumber: "PC KIW 99 44 55 Tencelc Hd",
          warpOrigin: "A",
          weftorigin: "C"
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

  create() {
    this.router.navigateToRoute("create");
  }
}
