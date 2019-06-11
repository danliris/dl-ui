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
      field: "OperationDateHistory",
      title: "Tanggal"
    }, {
      field: "OperationTimeHistory",
      title: "Jam"
    },
    {
      field: "MachineNumber",
      title: "No. Mesin"
    },
    {
      field: "WeavingUnitDocumentId",
      title: "Unit Weaving"
    },
    {
      field: "ConstructionNumber",
      title: "No. Konstruksi"
    },
    {
      field: "ShiftName",
      title: "Shift"
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
            if (datum.DateTimeOperationHistory) {
              var DateOperation = moment(datum.DateTimeOperationHistory).format('DD/MM/YYYY');
              var TimeOperation = moment(datum.DateTimeOperationHistory).format('LT');

              datum.OperationDateHistory = DateOperation;
              datum.OperationTimeHistory = TimeOperation;
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
