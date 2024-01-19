import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import { AuthService } from "aurelia-authentication";
var moment = require("moment");

@inject(Router, Service, AuthService)
export class List {
  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  context = ["Rincian"];

  columns = [
    { field: "BCType", title: "Jenis BC" },
    { field: "BCNo", title: "Nomor BC" },
    {
      field: "BCDate",
      title: "Tanggal BC",
      formatter: (value) => moment(value).format("DD MMM YYYY"),
    },
    { field: "Category", title: "Kategori" },
    { field: "ListNote", title: "List Nota Jual Lokal", sortable: false },
    { field: "ListBUK", title: "List Bon Unit Keluar", sortable: false },
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
      var data = {};
      data.total = result.info.total;
      data.data = result.data;
      result.data.forEach((s) => {
        s.ListNote = `${s.items
          .map(
            (p) => `- ${p.LocalSalesNoteNo == null ? "" : p.LocalSalesNoteNo}`
          )
          .join("<br/>")}`;
        s.ListBUK = `${s.items
          .map((p) => `- ${p.UENNo == null ? "" : p.UENNo}`)
          .join("<br/>")}`;
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
