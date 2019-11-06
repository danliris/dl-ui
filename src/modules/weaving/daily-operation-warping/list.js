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
  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  context = ["detail"];
  columns = [{
      field: "MachineDate",
      title: "Tanggal"
    }, {
      field: "MachineTime",
      title: "Jam"
    },
    {
      field: "OrderProductionNumber",
      title: "No. SOP"
    },
    {
      field: "ConstructionNumber",
      title: "No. Konstruksi"
    },
    {
      field: "WeavingUnitId",
      title: "Unit Weaving"
    },
    {
      field: "OperationStatus",
      title: "Status"
    }
  ];

  loader = (info) => {
    var order = {};
    if (info.sort)
      order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order
    }

    return this.service.search(arg).then(result => {
      if (result.data && result.data.length > 0) {
        let getUnitPromises = result.data.map(operation =>
          this.service.getUnitById(operation.WeavingUnitId)
        );

        return Promise.all(getUnitPromises).then(units => {
          for (var datum of result.data) {
            if (units && units.length > 0) {
              let unit = units.find(
                unitResult => datum.WeavingUnitId == unitResult.Id
              );
              datum.WeavingUnitId = unit.Name;
            }
            if (datum.DateTimeMachine) {
              var DateMachine = moment(datum.DateTimeMachine).format('DD/MM/YYYY');
              var TimeMachine = moment(datum.DateTimeMachine).format('LT');

              datum.MachineDate = DateMachine;
              datum.MachineTime = TimeMachine;
            }
          }
          return {
            total: result.info.total,
            data: result.data
          };
        });
      }
      return {
        total: result.info.total,
        data: result.data
      };
    });
  }

  contextCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "detail":
        this.router.navigateToRoute("update", {
          Id: data.Id
        });
        break;
    }
  }

  create() {
    this.router.navigateToRoute("create");
  }
}
