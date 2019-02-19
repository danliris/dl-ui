import { inject, bindable, computedFrom } from "aurelia-framework";
import moment from "moment";
import { Dialog } from "../../../au-components/dialog/dialog";
var UnitLoader = require("../../../loader/unit-loader");
import { Service } from "./service";

@inject(Dialog, Service)
export class DataForm {
  @bindable title;
  @bindable readOnly;

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

  orderProductionsItems;
  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    // context.options.readOnly = this.readOnly;

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
    { header: "Jumlah Order (Gr)", value: "wholeGrade" },
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
          result.data.forEach(datum => {
            console.log(datum);
            // debugger;
            this.data.estimationProducts = [];
            if (
              datum.orderStatus == "OPEN-ORDER" &&
              this.data.estimatedNumber === ""
            ) {
              this.data.estimationProducts.push(datum);
            } else {
              if (this.data.estimationProducts) {
                this.data.estimationProducts.push(datum);
              } else {
                this.data.estimationProducts.push([]);
              }
            }
          });
          //Bind "Items" reference
          this.context.orderProductionsItems.bind(this);
        });
    }
  }
}
