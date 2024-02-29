import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import { activationStrategy } from "aurelia-router";
import { AuthService } from "aurelia-authentication";
import moment from "moment";

@inject(Router, Service, AuthService)
export class List {
  context = ["Detail"];
  columns = [
    { field: "invoiceNo", title: "No Invoice" },
    {
      field: "createdUtc",
      title: "Tgl Packing List",
      formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY");
      },
    },
    { field: "buyer.name", title: "Buyer Agent" },
    { field: "status", title: "Status" },
    // { field: "transactionType.name", title: "Tipe Transaksi" },
    // { field: "localSalesContractNo", title: "No Local Sales Contrak" },
  ];
  filter = {};
  loader = (info) => {
    var order = {};

    if (info.sort) order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order,
      filter: JSON.stringify(this.filter),
    };

    return this.service.search(arg).then((result) => {
      for (let data of result.data) {
        if (data.isValidatedMD && !data.rejectReason) {
          data.status = "APPROVED_MD";
        }
        if (data.isValidatedShipping && !data.rejectReason) {
          data.status = "APPROVED_SHIPPING";
        }
        if (data.rejectReason) {
          data.status = "REJECT_BY_SHIPPING";
        }
      }

      return {
        total: result.info.total,
        data: result.data,
      };
    });
  };

  constructor(router, service, authService) {
    this.service = service;
    this.router = router;
    this.authService = authService;
  }

  determineActivationStrategy() {
    return activationStrategy.replace; //replace the viewmodel with a new instance
    // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
    // or activationStrategy.noChange to explicitly use the default behavior
  }

  activate(params, routeConfig, navigationInstruction) {
    const instruction = navigationInstruction.getAllInstructions()[0];
    const parentInstruction = instruction.parentInstruction;
    this.title = parentInstruction.config.title;
    this.type = parentInstruction.config.settings.type;

    let username = null;
    if (this.authService.authenticated) {
      const me = this.authService.getTokenPayload();
      username = me.username;
    }

    switch (this.type) {
      case "MD":
        this.filter = {
          IsValidatedMD: false,
          IsApproved: true,
          //   ResponsibleName: username,
        };
        break;
      case "SHIPPING":
        this.filter = {
          IsApproved: true,
          IsValidatedMD: true,
          IsValidatedShipping: false,
        };
        break;

      default:
        break;
    }
  }

  contextCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "Detail":
        this.router.navigateToRoute("view", { id: data.id, type: this.type });
        break;
    }
  }
}
