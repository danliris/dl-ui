import { inject, bindable } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
var moment = require("moment");

@inject(Router, Service)
export class List {
  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };

  search() {
    this.searching();
  }
  activate() {}

  searching() {
    this.error = {};

    if (!this.dateTo || this.dateTo == "Invalid Date") {
      this.error.dateTo = "Tanggal Akhir harus diisi";
    }

    if (!this.dateFrom || this.dateFrom == "Invalid Date") {
      this.error.dateFrom = "Tanggal Awal harus diisi";
    }

    if (Object.getOwnPropertyNames(this.error).length === 0) {
      var args = {
        dateFrom: this.dateFrom
          ? moment(this.dateFrom).format("YYYY-MM-DD")
          : "",
        dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
      };
      var index = 0;
      this.service.search(args).then((result) => {
        this.data = [];
        for (var _data of result.data) {
          _data.quantity = _data.quantity.toLocaleString("en-EN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
          _data.dpp = _data.dpp.toLocaleString("en-EN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
          _data.pPn = _data.pPn.toLocaleString("en-EN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
          _data.total = _data.total.toLocaleString("en-EN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
          _data.localCoverLetterDate =
            moment(_data.localCoverLetterDate).format("DD MMM YYYY") ==
            "01 Jan 0001"
              ? "-"
              : moment(_data.localCoverLetterDate).format("DD MMM YYYY");

          this.data.push(_data);
        }

        this.info.total = result.info.total;
      });
    }
  }

  reset() {
    this.dateFrom = "";
    this.dateTo = "";
  }

  ExportToExcel() {
    this.error = {};

    if (!this.dateTo || this.dateTo == "Invalid Date") {
      this.error.dateTo = "Tanggal Akhir harus diisi";
    }

    if (!this.dateFrom || this.dateFrom == "Invalid Date") {
      this.error.dateFrom = "Tanggal Awal harus diisi";
    }

    if (Object.getOwnPropertyNames(this.error).length === 0) {
      let args = {
        dateFrom: this.dateFrom
          ? moment(this.dateFrom).format("YYYY-MM-DD")
          : "",
        dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
      };

      this.service.generateExcel(args);
    }
  }
}
