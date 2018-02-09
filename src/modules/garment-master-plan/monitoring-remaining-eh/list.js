import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var YearLoader = require('../../../loader/garment-master-plan-weekly-plan-year-loader');
var UnitLoader = require('../../../loader/unit-loader'); // buat coba saja, bukan pake ini

@inject(Router, Service)
export class List {
  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  controlOptions = {
    label: {
      length: 4
    },
    control: {
      length: 5
    }
  }

  get yearLoader() {
    return YearLoader;
  }
  get unitLoader() {
    return UnitLoader;
  }
  unitView = (unit) => {
    return `${unit.code} - ${unit.name}`
  }

  searching() {

    if (!this.year) {
      // alert("Tahun Harus Diisi");
      this.year = {year : 2025};
    }
    // else {
      var info = {
        year: this.year.year,
        unit: this.unit ? this.unit.code : "",
      }
      this.service.search(info)
          .then(result => {
              this.data = result;
              console.log(result);
          });
    // }

    // this.service.search(info)
    //   .then(result => {
    //     this.data = result;
    //     this.data = [];
    //     var counter = 1;
    //     var remain = 0;
    //     var temp = result;
    //     this.temp = [];
    //     var bookingNo = "";
    //     var temps = {};

    //     for (var prs of result) {
    //       temps.bookingCode = prs.bookingCode;
    //       temps.orderQty = prs.orderQty;
    //       this.temp.push(temps);

    //     }

    //     for (var pr of result) {

    //       var _data = {};

    //       _data.code = pr.bookingCode;
    //       _data.bookingDate = pr.bookingDate;

    //       if (pr.deliveryDateConfirm == "") {
    //         _data.confirmState = "Belum Dikonfirmasi";
    //       } else {
    //         _data.confirmState = "Sudah Dikonfirmasi";
    //       }
    //       if (pr.isCanceled == true) {
    //         _data.bookingOrderState = "Booking Dibatalkan";
    //       } else if (pr.isMasterPlan == true) {
    //         _data.bookingOrderState = "Sudah Dibuat Master Plan";
    //       } else if (pr.isMasterPlan == false && pr.isCanceled == false) {
    //         _data.bookingOrderState = "Booking";
    //       }
    //       for (var item of temp) {
    //         if (pr.bookingCode == item.bookingCode) {
    //           remain = remain + item.orderQty;
    //           _data.remaining = remain ? pr.totalOrderQty - remain : pr.totalOrderQty;
    //         }

    //       }
    //       remain = 0;
    //       this.data.push(_data);

    //       counter++;
    //     }

    //   });
  }

  ExportToExcel() {
    var info = {
      year: this.year ? this.year : "",
      unit: this.unit ? this.unit.name : "",
    }
    this.service.generateExcel(info);
  }

  reset() {
    this.year = "";
    this.unit = "";
  }
}
