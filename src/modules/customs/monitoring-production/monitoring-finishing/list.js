import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";
const UnitLoader = require("../../../../loader/garment-units-loader");

@inject(Router, Service)
export class List {
  constructor(router, service) {
    this.service = service;
    this.router = router;
  }
  bind(context) {
    this.context = context;
  }

  searching() {
    this.error = {};

    if (!this.dateFrom || this.dateFrom == "Invalid Date")
      this.error.dateFrom = "Tanggal harus diisi";

    if (!this.dateTo || this.dateTo == "Invalid Date")
      this.error.dateTo = "Tanggal harus diisi";

    if (Object.getOwnPropertyNames(this.error).length === 0) {
      var info = {
        unit: this.unit ? this.unit.Id : 0,
        dateFrom: this.dateFrom
          ? moment(this.dateFrom).format("YYYY-MM-DD")
          : "",
        dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
      };

      this.service.search(info).then((result) => {
        this.data = [];
        for (var _data of result.data) {
          _data.TotalsQuantity = _data.TotalQuantity.toLocaleString("en-EN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
          _data.TotalRemainingsQuantity =
            _data.TotalRemainingQuantity.toLocaleString("en-EN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
          _data.FinishingOutDate = moment(_data.FinishingOutDate).format(
            "DD-MMM-YYYY"
          );
          _data.CreatedDate = moment(_data.CreatedDate).format("DD-MMM-YYYY");
          this.data.push(_data);
        }
      });
    }
  }

  ExportToExcel() {
    var info = {
      unit: this.unit ? this.unit.Id : 0,
      dateFrom: this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
      dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
    };
    this.service.generateExcel(info);
  }

  get unitLoader() {
    return UnitLoader;
  }
  unitView = (unit) => {
    return `${unit.Code} - ${unit.Name}`;
  };

  reset() {
    this.dateFrom = null;
    this.dateTo = null;
    this.unit = null;
  }

  get sumTotalQuantity() {
    var sum = 0;
    if (this.data) {
      for (var item of this.data) {
        sum += item.TotalQuantity;
      }
    }

    return sum.toLocaleString("en-EN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  get sumTotalRemainingQuantity() {
    var sum = 0;
    if (this.data) {
      for (var item of this.data) {
        sum += item.TotalRemainingQuantity;
      }
    }

    return sum.toLocaleString("en-EN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
