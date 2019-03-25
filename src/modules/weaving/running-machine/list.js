import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";

@inject(Router, Service)
export class List {
  context = ["detail"];

  columns = [
    { field: "DateOrdered", title: "Tanggal/ Jam" },
    { field: "Shift", title: "Shift" },
    { field: "WeavingUnit", title: "Unit Weaving" },
    { field: "MachineNumber", title: "No. Mesin" },
    { field: "BeamNumber", title: "No. Beam" },
    { field: "ConstructionNumber", title: "No. Konstruksi" },
    { field: "OrderProductionNumber", title: "No. Surat Perintah Produksi" },
    { field: "LoomGroup", title: "Grup Loom" },
    { field: "SizingGroup", title: "Grup Sizing" },
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
          DateOrdered:"02/02/2019",
          Shift:"Shift 1",
          WeavingUnit:"Weaving 1",
          MachineNumber:"2/1",
          BeamNumber:"TS 108",
          ConstructionNumber:"PC AB 120 44 55 Tencelaa Puyoaa",
          OrderProductionNumber:"0002/02-2019",
          LoomGroup:"D",
          SizingGroup:"B"
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
