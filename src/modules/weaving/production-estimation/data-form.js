import { inject, bindable, computedFrom } from "aurelia-framework";
import moment from "moment";

export class DataForm {
  @bindable title;
  @bindable readOnly;

  yearFormat = "YYYY";
  years = [];

  formOptions = {
    cancelText: "Kembali",
    deleteText: "Hapus"
  };

  customOptions = {
    label: {
      align: "left"
    }
  };

  constructor(service) {
    this.service = service;
  }

  months = [
    "",
    "January",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
  ];

  getYears() {
    var year = moment(new Date());
    this.years.push(year.year());
    // var lastYear = year.add(-1, 'years');
    // this.years.push(lastYear.year());
    var nextYear = year.add(1, "years");
    this.years.push(nextYear.year());
    var nextYear = year.add(1, "years");
    this.years.push(nextYear.year());
    var nextYear = year.add(1, "years");
    this.years.push(nextYear.year());
  }

  bind(context) {
    this.context = context;
    this.data = {
      monthPeriod: "November",
      yearPeriod: 2019,
      unit: "Weaving 1"
    };
    this.error = this.context.error;
    this.getYears();

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  columns = [
    { header: "Tanggal", value: "dateOrdered" },
    { header: "No. SOP", value: "orderNumber" },
    { header: "No. Konstruksi", value: "constructionNumber" },
    { header: "Total Gram", value: "amountTotal" },
    { header: "Jumlah Order(Gr)", value: "orderTotal" },
    { header: "Grade A(%)", value: "gradeA" },
    { header: "Grade B(%)", value: "gradeB" },
    { header: "Grade C(%)", value: "gradeC" },
    { header: "Grade D(%)", value: "gradeC" }
  ];

  // @computedFrom("data._id")
  // get isEdit() {
  //     return (this.data._id || '').toString() != '';
  // }
}
