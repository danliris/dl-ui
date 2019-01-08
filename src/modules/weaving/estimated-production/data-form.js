import { inject, bindable, computedFrom } from "aurelia-framework";
import moment from "moment";

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
    control:{
      length: 12
    }
  }

  customEstimatedControlOptions = {
    control:{
      length: 9
    }
  }

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

  weaving = ["Weaving 1", "Weaving 2", "Weaving 3", ]

  getYears(){
    var year = moment(new Date());
    this.years.push(year.year());
    // var lastYear = year.add(-1, 'years');
    // this.years.push(lastYear.year());
    var nextYear = year.add(1,'years');
    this.years.push(nextYear.year());
    var nextYear = year.add(1,'years');
    this.years.push(nextYear.year());
    var nextYear = year.add(1,'years');
    this.years.push(nextYear.year());
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

  columns = [
    { header: "Tanggal", value: "dateOrdered" },
    { header: "No. SOP", value: "orderNumber" },
    { header: "No. Konstruksi", value: "constructionNumber" },
    { header: "Total Gram", value: "amountTotal" },
    { header: "Jumlah Order (Gr)", value: "orderTotal" },
    { header: "Grade A (%)", value: "gradeA" },
    { header: "Grade B (%)", value: "gradeB" },
    { header: "Grade C (%)", value: "gradeC" },
    { header: "Grade D (%)", value: "gradeC" }
  ];

  // @computedFrom("data._id")
  // get isEdit() {
  //     return (this.data._id || '').toString() != '';
  // }

  get addItems() {
    document.getElementById('button').addEventListener("click", function() {
      document.querySelector('.bg-modal').style.display = "flex";
    });
    
    document.querySelector('.close').addEventListener("click", function() {
      document.querySelector('.bg-modal').style.display = "none";
    });
  }
}
