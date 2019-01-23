import { inject, bindable, computedFrom } from "aurelia-framework";
import { callbackify } from "util";
var UnitLoader = require("../../../loader/unit-loader");
var moment = require('moment');

export class DataForm {
  @bindable title;
  @bindable readOnly;

  yearFormat = "YYYY";
  years =[];

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah"
  };

  customOptions = {
    label: {
      align: "left"
    },
    control: {
      align: "left",
      length: 6
    }
  };

  customShortOptions = {
    label: {
      align: "left"
    },
    control: {
      align: "left",
      length: 2
    }
  };

  customCenterOptions = {
    value: {
      align: "center"
    }
  };

  customLeftOptions = {
    label: {
      align: "left"
    }
  };

  months = ["",
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

  // @computedFrom("data._id")
  // get isEdit() {
  //     return (this.data._id || '').toString() != '';
  // }

  get constructionsNumber() {
    return UnitLoader;
  }

  getYears(){
    var year = moment(new Date());
    this.years.push(year.year());
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
}
