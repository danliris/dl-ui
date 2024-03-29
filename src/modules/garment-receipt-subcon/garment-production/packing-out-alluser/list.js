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
    if (this.authService.authenticated) {
      const me = this.authService.getTokenPayload();
      username = me.username;
    }
    this.filter = {
      // CreatedBy: username,
    };
  }

  context = ["Rincian", "Cetak PDF"];

  columns = [
    { field: "PackingOutNo", title: "No Bon" },
    { field: "UnitCode", title: "Unit" },
    { field: "PackingOutType", title: "Tipe" },
    { field: "Description", title: "Keterangan" },
    { field: "RONo", title: "RO" },
    { field: "Article", title: "Artikel" },
    { field: "TotalQuantity", title: "Jumlah", sortable: false },
    { field: "Carton", title: "Karton", sortable: false },
    { field: "ProductOwnerName", title: "Pemilik Barang" },
    { field: "ContractNo", title: "Contract No" },
    { field: "Invoice", title: "Invoice", sortable: false },
    {
      field: "PackingOutDate",
      title: "Tgl Pengeluaran",
      formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY");
      },
    },
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
      result.data.forEach((s) => {
        s.UnitCode = s.Unit.Code;
        s.ProductOwnerName = s.ProductOwner.Name;
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
    // let pr = await this.purchasingService.getGarmentPR({ size: 1, filter: JSON.stringify({ RONo: data.RONo }) });
    var buyer = "";
    // if(pr.data.length>0){
    //     buyer = pr.data[0].Buyer.Code;
    // }
    switch (arg.name) {
      case "Rincian":
        this.router.navigateToRoute("view", { id: data.Id });
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
