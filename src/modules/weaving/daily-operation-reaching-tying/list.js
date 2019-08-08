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
    field: "MachineDateHistory",
    title: "Tanggal"
  }, {
    field: "MachineTimeHistory",
    title: "Jam"
  }, {
    field: "MachineNumber",
    title: "No. Mesin"
  }, {
    field: "WeavingUnitDocumentId",
    title: "Unit Weaving"
  }, {
    field: "ConstructionNumber",
    title: "No. Konstruksi"
  }, {
    field: "BeamNumber",
    title: "No. Beam"
  }];

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

    //   return this.service.search(arg).then(result => {
    //     if (result.data && result.data.length > 0) {
    //       let getUnitPromises = result.data.map(operation =>
    //         this.service.getUnitById(operation.WeavingUnitDocumentId)
    //       );

    //       return Promise.all(getUnitPromises).then(units => {
    //         for (var datum of result.data) {
    //           if (units && units.length > 0) {
    //             let unit = units.find(
    //               unitResult => datum.WeavingUnitDocumentId == unitResult.Id
    //             );
    //             datum.WeavingUnitDocumentId = unit.Name;
    //           }
    //           if (datum.DateTimeMachineHistory) {
    //             var DateMachine = moment(datum.DateTimeMachineHistory).format('DD/MM/YYYY');
    //             var TimeMachine = moment(datum.DateTimeMachineHistory).format('LT');

    //             datum.MachineDateHistory = DateMachine;
    //             datum.MachineTimeHistory = TimeMachine;
    //           }
    //         }
    //         return {
    //           total: result.info.total,
    //           data: result.data
    //         };
    //       });
    //     } else {
    //       return {
    //         total: result.info.total,
    //         data: result.data
    //       };
    //     }
    //   });

    return this.service.search(arg).then(result => {
      return {
        data: [{
          Id: 1,
          MachineDateHistory: "31/07/2019	",
          MachineTimeHistory: "7:00 AM",
          MachineNumber: "144",
          WeavingUnitDocumentId: "WEAVING 2",
          ConstructionNumber: "PC20  66 77 88 Da Da",
          BeamNumber: "S43"
        }]
      };
    });
  };

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
