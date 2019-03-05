import { inject, bindable, computedFrom } from "aurelia-framework";
import { callbackify } from "util";
var ConstructionLoader = require("../../../loader/weaving-constructions-loader");
var UnitLoader = require("../../../loader/unit-loader");
var moment = require("moment");

export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable constructionNumber;
  @bindable Month;

  yearFormat = "YYYY";
  years = [];

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

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    this.Month = this.months[this.getMonth()];
    this.getYears();

    if (this.data.Id) {
      this.Month = this.data.Period.Month;
    } else {
      this.data.Period = {};
      this.data.Period.Month = this.Month;
    }
    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  get constructions() {
    this.constructionNumber = {};
    return ConstructionLoader;
  }

  get units() {
    return UnitLoader;
  }

  constructionNumberChanged(newValue) {
    if (newValue) {
      if (newValue.yarnType) {
        this.data.yarnType = newValue.yarnType;
      } else {
        newValue = this.data.fabricConstructionDocument;
      }

      this.constructionNumber = newValue;
      this.data.fabricConstructionDocument = {};

      if (newValue) {
        this.data.fabricConstructionDocument.Id = newValue.Id;
        this.data.fabricConstructionDocument.constructionNumber =
          newValue.constructionNumber;
      }
    }
  }

  monthChanged(newValue) {
    this.data.Period.Month = newValue;
    this.getYears();
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

  getMonth() {
    return new Date().getMonth() + 1;
  }
}
