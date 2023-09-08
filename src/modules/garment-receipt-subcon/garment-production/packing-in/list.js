import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import { AuthService } from "aurelia-authentication";
var moment = require("moment");

@inject(Router, Service, AuthService)
export class List {
  constructor(router, service, authService) {
    this.service = service;
    this.router = router;
    this.authService = authService;
  }

  filter = {};
  activate(params) {
    let username = null;
    let permission = null;
    if (this.authService.authenticated) {
      const me = this.authService.getTokenPayload();

      username = me.username;
      permission = me.permission;
    }

    let arrayPermission = Object.entries(permission);
    this.isKasie = arrayPermission.find(([key, value]) => key == "X29");

    if (!this.isKasie) {
      this.filter = {
        CreatedBy: username,
      };
    }
  }

  dataToBePosted = [];
  options = {};
  context = ["Rincian"];

  columns = [
    {
      field: "IsApproved",
      title: "Approve",
      checkbox: true,
      sortable: false,
      formatter: function (value, data, index) {
        this.checkboxEnabled = !data.IsApproved;
        return "";
      },
    },
    { field: "PackingInNo", title: "No Packing In" },
    { field: "RONo", title: "RO" },
    { field: "Article", title: "No Artikel" },
    { field: "TotalPackingInQuantity", title: "Jumlah", sortable: false },
    { field: "TotalRemainingQuantity", title: "Sisa", sortable: false },
    { field: "UnitCode", title: "Unit Packing In" },
    { field: "PackingFrom", title: "Asal Barang" },
    { field: "UnitFromCode", title: "Unit Asal" },
    {
      field: "PackingInDate",
      title: "Tanggal Packing In",
      formatter: (value) => moment(value).format("DD MMM YYYY"),
    },
    { field: "ProductList", title: "Kode Barang", sortable: false },
  ];

  rowFormatter(data, index) {
    if (data.IsApproved) return { classes: "success" };
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
      filter: JSON.stringify(this.filter),
    };

    return this.service.search(arg).then((result) => {
      this.totalQuantity = result.info.totalQty;
      result.data.forEach((d) => {
        d.UnitCode = d.Unit.Code;
        d.UnitFromCode = d.UnitFrom.Code;
        d.ProductList = `${d.Products.map((p) => `- ${p}`).join("<br/>")}`;
      });
      return {
        total: result.info.total,
        data: result.data,
      };
    });
  };

  contextClickCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "Rincian":
        this.router.navigateToRoute("view", {
          id: data.Id,
          isKasie: this.isKasie,
        });
        break;
    }
  }

  posting() {
    if (this.dataToBePosted.length > 0) {
      var dataIds = [];
      this.dataToBePosted.map((d) => dataIds.push(d.Id));

      var dataUpdate = {};
      dataUpdate.ids = dataIds;
      this.service
        .post(dataUpdate)
        .then((result) => {
          alert("Data berhasil diApprove");
          this.table.refresh();
        })
        .catch((e) => {
          this.error = e;
        });
    }
  }

  create() {
    this.router.navigateToRoute("create");
  }
}
