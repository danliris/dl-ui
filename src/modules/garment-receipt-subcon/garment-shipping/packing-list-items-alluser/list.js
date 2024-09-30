import { inject, bindable } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";
import { AuthService } from "aurelia-authentication";

@inject(Router, Service, AuthService)
export class List {
  @bindable isKasie = null;
  context = ["Detail", "Cetak"];

  options = {};
  dataToBePosted = [];

  columns = [
    // {
    //   field: "isApproved",
    //   title: "Approve",
    //   checkbox: true,
    //   sortable: false,
    //   formatter: function (value, data, index) {
    //     this.checkboxEnabled = !data.isApproved;
    //     return "";
    //   },
    // },
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
    // {
    //     field: "status", title: "Status", formatter: value => {
    //         if (value == "CREATED") {
    //             return "ON PROCESS";
    //         } if (value == "REJECTED_SHIPPING_MD") {
    //             return "APPROVED MD";
    //         } if (value == "REJECTED_SHIPPING_UNIT") {
    //             return "REJECTED SHIPPING";
    //         } else {
    //             return value.replaceAll("_", " ");
    //         }
    //     }
    // },
  ];

  rowFormatter(data, index) {
    if (data.isApproved) return { classes: "success" };
    else return {};
  }

  attached() {
    this.options.height =
      $(window).height() -
      $("nav.navbar").height() -
      $("h1.page-header").height();
  }

  loader = (info) => {
    var order = {};
    if (info.sort) order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order,
    };

    return this.service.search(arg).then((result) => {
      for (let data of result.data) {
        data.buyerAgentName = (data.buyerAgent || {}).name;
        data.shippingStaffName = (data.shippingStaff || {}).name;

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

  activate(params) {
    let username = null;
    let permission = null;
    if (this.authService.authenticated) {
      const me = this.authService.getTokenPayload();

      username = me.username;
      permission = JSON.parse(me.permission);
    }

    let arrayPermission = Object.entries(permission);
    this.isKasie = arrayPermission.find(([key, value]) => key == "X34");
  }

  contextClickCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "Detail":
        this.router.navigateToRoute("view", {
          id: data.id,
          isKasie: this.isKasie,
        });
        break;
      case "Cetak":
        this.service.getPdfByFilterCarton(data.id);
        break;
    }
  }

  create() {
    this.router.navigateToRoute("create");
  }

  posting() {
    if (this.dataToBePosted.length > 0) {
      var dataIds = [];
      this.dataToBePosted.map((d) => dataIds.push(d.id));

      var dataUpdate = {};
      dataUpdate.ids = dataIds;
      this.service
        .post(dataUpdate)
        .then((result) => {
          alert("Data berhasil diApprove");
          this.table.refresh();
        })
        .catch((e) => {
          alert(e.message);
          this.error = e;
        });
    }
  }
}
