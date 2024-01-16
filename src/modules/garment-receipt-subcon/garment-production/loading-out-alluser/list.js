import { inject, bindable } from "aurelia-framework";
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
    // this.purchasingService = purchasingService;
  }

  filter = {};

  activate(params) {
    let username = null;
    let permission = null;
    if (this.authService.authenticated) {
      const me = this.authService.getTokenPayload();

      username = me.username;
    }
    this.filter = {
      // CreatedBy: username,
    };
  }

  dataToBePosted = [];
  options = {};
  context = ["Rincian", "Cetak PDF"];

  columns = [
    { field: "LoadingOutNo", title: "No Loading" },
    { field: "Article", title: "No Artikel" },
    { field: "TotalLoadingQuantity", title: "Jumlah", sortable: false },
    { field: "TotalRealQtyOut", title: "Jumlah Sewing In", sortable: false },
    { field: "RONo", title: "RO" },
    { field: "ColorList", title: "Warna", sortable: false },
    { field: "UnitName", title: "Unit Loading" },
    { field: "UnitFromName", title: "Unit Asal" },
    { field: "LoadingInNo", title: "No Loading In" },
    {
      field: "LoadingOutDate",
      title: "Tanggal Loading",
      formatter: (value) => moment(value).format("DD MMM YYYY"),
    },
    { field: "ProductList", title: "Kode Barang", sortable: false },
  ];

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
        d.UnitName = d.Unit.Name;
        d.UnitFromName = d.UnitFrom.Name;
        d.ColorList = `${d.Colors.map((p) => `- ${p}`).join("<br/>")}`;
        d.ProductList = `${d.Products.map((p) => `- ${p}`).join("<br/>")}`;
      });
      return {
        total: result.info.total,
        data: result.data,
      };
    });
  };

  async contextClickCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    // let pr = await this.purchasingService.getGarmentPR({
    //   size: 1,
    //   filter: JSON.stringify({ RONo: data.RONo }),
    // });
    var buyer = "";
    // if (pr.data.length > 0) {
    //   buyer = pr.data[0].Buyer.Code;
    // }
    switch (arg.name) {
      case "Rincian":
        this.router.navigateToRoute("view", {
          id: data.Id,
          isKasie: this.isKasie,
        });
        break;
      case "Cetak PDF":
        this.service.getPdfById(data.Id, buyer);
        break;
    }
  }

  create() {
    this.router.navigateToRoute("create");
  }
}
