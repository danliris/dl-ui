import {
  inject
} from "aurelia-framework";
import {
  Service
} from "./service";
import {
  Router
} from "aurelia-router";
import moment from "moment";

@inject(Router, Service)
export class List {
  context = ["detail"];

  columns = [{
      field: "ProductionDate",
      title: "Tanggal",
      formatter: function (value, data, index) {
        return moment(value).format("DD MMMM YYYY");
      }
    },
    {
      field: "WeavingUnitDocumentId",
      title: "Unit Weaving"
    },
    {
      field: "MachineNumber",
      title: "No. Mesin"
    },
    {
      field: "Shift",
      title: "Shift"
    },
    {
      field: "BeamNumber",
      title: "No. Beam"
    },
    {
      field: "ConstructionNumber",
      title: "No. Konstruksi"
    },
    {
      field: "PIS",
      title: "PIS"
    }
  ];

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  loader = info => {
    var order = {};
    if (info.sort) order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10),
      size: info.limit,
      keyword: info.search,
      order: order
    };

    // return this.service.search(arg).then(result => {
    //   return {
    //     total: result.info.total,
    //     data: result.data
    //   };
    // });

    return this.service.search(arg).then(result => {
      if (result.data && result.data.length > 0) {
        let getUnitPromises = result.data.map(operation =>
          this.service.getUnitById(operation.WeavingUnitDocumentId)
        );

        return Promise.all(getUnitPromises).then(units => {
          for (var datum of result.data) {
            if (units && units.length > 0) {
              let unit = units.find(
                unitResult => datum.WeavingUnitDocumentId == unitResult.Id
              );
              datum.WeavingUnitDocumentId = unit.Name;
            }
          }

          return {
            total: result.info.total,
            data: result.data
          };
        });
      } else {
        return {
          total: result.info.total,
          data: result.data
        };
      }
    });

    // return {
    //   total: 1,
    //   data: [{
    //     Id: 1,
    //     ProductionDate: "02/02/2019",
    //     WeavingUnit: "Weaving 1",
    //     MachineNumber: "2/1",
    //     Shift: "Shift 1",
    //     BeamNumber: "TS 108",
    //     ConstructionNumber: "PC AB 120 44 55 Tencelaa Puyoaa",
    //     PIS: "16"
    //   }]
    // };
  };

  contextCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "detail":
        this.router.navigateToRoute("view", {
          Id: data.Id
        });
        break;
    }
  }

  create() {
    this.router.navigateToRoute("create");
  }
}
