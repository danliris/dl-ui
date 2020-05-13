import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";

@inject(Router, Service)
export class List {
  // context = ["detail"]

  columns = [
    {
      field: "date",
      title: "Tanggal",
      formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY");
      },
    },
    { field: "bonNo", title: "No. Bon" },
    { field: "noSpp", title: "No. SPP" },
    { field: "qtyOrder", title: "QTY Order" },
    { field: "saldo", title: "Saldo" },
    { field: "buyer", title: "Buyer" },
    { field: "shift", title: "Shift" },
    { field: "group", title: "Group" },
    { field: "material", title: "Konstruksi" },
    { field: "packagingType", title: "Jenis" },
    { field: "warna", title: "Warna" },
    { field: "motif", title: "Motif" },
    { field: "grade", title: "Grade" },
    { field: "packagingUnit", title: "Packaging" },
    { field: "packagingQty", title: "Qty Packaging" },
    { field: "uomUnit", title: "satuan" },
  ];

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
      var data = {};
      data.total = result.total;
      data.data = [];
      result.data.forEach((item, index) => {
        item.warehousesProductionOrders.forEach((i, ind) => {
          var dataView = {};
          dataView.id = item.id;
          dataView.date = item.date;
          dataView.bonNo = item.bonNo;
          (dataView.noSpp = i.productionOrder.no),
            (dataView.buyer = i.buyer),
            (dataView.shift = item.shift),
            (dataView.group = item.group),
            (dataView.material = i.construction),
            (dataView.unit = i.unit),
            (dataView.warna = i.color),
            (dataView.motif = i.motif),
            (dataView.grade = i.grade),
            (dataView.quantity = i.quantity),
            (dataView.uomUnit = i.uomUnit),
            (dataView.saldo = i.balance),
            (dataView.packagingType = i.packagingType),
            (dataView.packagingQty = i.packagingQty),
            (dataView.packagingUnit = i.packagingUnit),
            (dataView.qtyOrder = i.qtyOrder),
            data.data.push(dataView);
        });
      });
      return data;
    });
  };

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  contextClickCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "detail":
        this.router.navigateToRoute("view", { id: data.id });
        break;
      case "print":
        this.service.getPdfById(data.id);
        break;
    }
  }

  contextShowCallback(index, name, data) {
    switch (name) {
      case "print":
        return data;
      default:
        return true;
    }
  }

  create() {
    this.router.navigateToRoute("create");
  }
}
