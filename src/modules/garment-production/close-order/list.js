import { inject } from 'aurelia-framework';
import { Service, GarmentService } from "./service";
import { Router } from 'aurelia-router';
import { Base64Helper } from '../../../utils/base-64-coded-helper';

@inject(Router, Service, GarmentService)
export class List {
  // data = [];
  // info = { page: 1, keyword: '' };
  context = ["detail"];
  columns = [
    { field: "RoNo", title: "No. RO" },
    { field: "Article", title: "Artikel" },
    { field: "Comodity", title: "Komoditi" },
    { field: "Buyer", title: "Buyer" },
    { field: "BuyerBrand", title: "Buyer Brand" },
    { field: "Quantity", title: "Jumlah" },
    { field: "DeliveryDate", title: "Tanggal Kirim", formatter: function (value, data, index) {
      return value ? (new Date(value)).toLocaleDateString() : "-";
    }
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
      select: ['Unit'],
      order: order
    }

    return this.garmentService.search(arg)
      .then(result => {
        return {
          total: result.info.total,
          data: result.data
        }
      });
  }

  constructor(router, service, garmentService) {
    this.service = service;
    this.garmentService = garmentService;
    this.router = router;
    // this.uomId = "";
    // this.uoms = [];
  }

  contextCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "detail":
        const encoded = Base64Helper.encode(data.Id);
        this.router.navigateToRoute('view', { id: encoded });
        break;
    }
  }

  create() {
    this.router.navigateToRoute('create');
  }

}
