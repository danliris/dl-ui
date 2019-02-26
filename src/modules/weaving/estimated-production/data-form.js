import { inject, bindable, computedFrom } from "aurelia-framework";
import moment from "moment";
var UnitLoader = require("../../../loader/unit-loader");
import { Service } from "./service";

@inject(Service)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable error;

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

  // customPUControlOptions = {
  //   control: {
  //     length: 12
  //   }
  // };

  //Options untuk No. Estimasi Produksi
  customEstimatedControlOptions = {
    control: {
      length: 9
    }
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

  constructor(service) {
    this.service = service;
  }

  orderProductionsItems;

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    console.log(this.error);

    if (this.data.estimatedNumber) {
      this.orderProductionsTableOptions = {};
    }

    this.getYears();
    this.orderProductionsItems;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  orderProductionsColumns = [
    { header: "Tanggal", value: "dateOrdered" },
    { header: "No. SOP", value: "orderNumber" },
    {
      header: "No. Konstruksi",
      value: "fabricConstructionDocument.constructionNumber"
    },
    { header: "Total Gram", value: "amountTotal" },
    { header: "Jumlah Order(Meter)", value: "wholeGrade" },
    { header: "Grade A(%)", value: "gradeA" },
    { header: "Grade B(%)", value: "gradeB" },
    { header: "Grade C(%)", value: "gradeC" },
    { header: "Grade D(%)", value: "gradeD" }
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

  async searchOrderProductions() {
    this.error = {};
    var index = 0;
    var emptyFieldName =
      "Isi Semua Field Untuk Mencari Surat Perintah Produksi";

    if (this.data.period) {
      if (
        this.data.period.month == null ||
        this.data.period.month == undefined ||
        this.data.period.month == ""
      ) {
        this.error.periodMonth = "Periode Bulan Tidak Boleh Kosong";
        index++;
      }

      if (
        this.data.period.year == null ||
        this.data.period.year == undefined ||
        this.data.period.year == ""
      ) {
        this.error.periodYear = "Periode Tahun Tidak Boleh Kosong";
        index++;
      }
    }

    if (this.data.unit) {
      if (
        this.data.unit == null ||
        this.data.unit == undefined ||
        this.data.unit == ""
      ) {
        this.error.unit = "Unit Tidak Boleh Kosong";
        index++;
      }
    }

    console.log(this.data);

    if (index > 0) {
      window.alert(emptyFieldName);
    } else {
      await this.service
        .searchSOP(
          this.data.period.month,
          this.data.period.year,
          this.data.unit.code
        )
        .then(result => {
          //Print each datum on orderProductions Data and push to Items Collections
          result.data.forEach((datum, i, data) => {
            // this.data.estimationProducts;
            if (this.data.estimationProducts.find(esp => esp.id == datum.id)) {
              // continue;
            } else {
              this.data.estimationProducts.push(datum);
            }
          });

          //Bind "Items" reference
          this.context.orderProductionsItems.bind(this);
        });
    }
  }
}
