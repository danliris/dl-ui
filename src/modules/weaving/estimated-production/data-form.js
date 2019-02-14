import { inject, bindable, computedFrom } from "aurelia-framework";
import moment from "moment";
import { Dialog } from "../../../au-components/dialog/dialog";
var UnitLoader = require("../../../loader/unit-loader");
import { Service } from "./service";

@inject(Dialog, Service)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  // isModalShown = false;
  // modalLabel = true;

  yearFormat = "YYYY";
  years = [];

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan"
  };

  customOptions = {
    label: {
      align: "left"
    }
  };

  customPUControlOptions = {
    control: {
      length: 12
    }
  };

  customEstimatedControlOptions = {
    control: {
      length: 9
    }
  };

  orderProductionsTableOptions = {
    pagination: false,
    search: false,
    showColumns: false,
    showToggle: false
  };

  months = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  constructor(dialog, service) {
    this.service = service;
    this.dialog = dialog;
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    this.getYears();

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  orderProductionsColumns = [
    { title: "Tanggal", field: "dateOrdered" },
    { title: "No. SOP", field: "orderNumber" },
    { title: "No. Konstruksi", field: "constructionNumber" },
    { title: "Total Gram", field: "amountTotal" },
    { title: "Jumlah Order (Gr)", field: "orderTotal" },
    { title: "Grade A (%)", field: "gradeA" },
    { title: "Grade B (%)", field: "gradeB" },
    { title: "Grade C (%)", field: "gradeC" },
    { title: "Grade D (%)", field: "gradeD" }
  ];

  get units() {
    return UnitLoader;
  }

  getYears() {
    var year = moment(new Date());
    this.years.push(year.year());
    var nextYear = year.add(1, "years");
    this.years.push(nextYear.year());
    var nextYear = year.add(1, "years");
    this.years.push(nextYear.year());
    var nextYear = year.add(1, "years");
    this.years.push(nextYear.year());
  }

  Values() {}

  searchOrderProductions() {
    console.log(this.data);
    // console.log(this.data.period.month);
    // console.log(this.data.period.year);
    // console.log(this.data.unit.code);
    debugger;
    this.error = {};
    var monthParam;
    var yearParam;
    var unitCodeParam;
    var index = 0;
    var emptyFieldName =
      "Isi Semua Field Untuk Mencari Surat Perintah Produksi";

    console.log(this.data.period.month);
    if (this.data.period) {
      if (
        this.data.period.month == null ||
        this.data.period.month == undefined ||
        this.data.period.month == ""
      ) {
        this.error.periodMonth = "Periode Bulan Tidak Boleh Kosong";
        index++;
      } else {
        this.monthParam = this.data.period.month;
      }

      console.log(this.data.period.year);
      if (
        this.data.period.year == null ||
        this.data.period.year == undefined ||
        this.data.period.year == ""
      ) {
        this.error.periodYear = "Periode Tahun Tidak Boleh Kosong";
        index++;
      } else {
        this.yearParam = this.data.period.year;
      }
    }

    console.log(this.data.unit.code);
    if (this.data.unit) {
      if (
        this.data.unit == null ||
        this.data.unit == undefined ||
        this.data.unit == ""
      ) {
        this.error.unit = "Unit Tidak Boleh Kosong";
        index++;
      } else {
        this.unitCodeParam = this.data.unit.code;
      }
    }

    if (index > 0) {
      window.alert(emptyFieldName);
    } else {
      this.service
        .search(this.monthParam, this.yearParam, this.unitCodeParam)
        .then(result => {
          return {
            data: result.data
          };
        });
    }
    console.log(this.data);
    debugger;
  }
}
