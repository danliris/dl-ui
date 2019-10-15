import { inject, bindable, computedFrom } from "aurelia-framework";
import { callbackify } from "util";
var ConstructionLoader = require("../../../loader/weaving-constructions-loader");
var UnitLoader = require("../../../loader/unit-loader");
var YarnOriginLoader = require("../../../loader/weaving-yarn-origin-loader");
var moment = require("moment");

export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable FabricConstructionDocument;
  @bindable Month;
  @bindable Year;

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

    if (this.data.Id) {
      if (this.readOnly) {
        this.Month = this.data.Period.Month;
        this.Year = this.data.Period.Year;
        this.FabricConstructionDocument = this.data.FabricConstructionDocument;
      } else {
        this.Month = this.data.Period.Month;
        var yearData = this.data.Period.Year;
        this.Year = this.getYears(yearData);
        this.FabricConstructionDocument = this.data.FabricConstructionDocument;
      }
    } else {
      this.data.Period = {};
      this.data.Period.Month = this.Month;
      this.Year = this.getYears();
    }

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  get origins(){
    return YarnOriginLoader;
  }

  get constructions() {
    return ConstructionLoader;
  }

  get units() {
    return UnitLoader;
  }

  FabricConstructionDocumentChanged(newValue) {
    if (newValue) {
      if (newValue.Id) {
        //   this.data.yarnType = newValue.yarnType;
        // } else {
        this.data.FabricConstructionDocument = newValue;
      }

      this.ConstructionNumber = newValue;
      this.data.FabricConstructionDocument = {};

      if (newValue) {
        this.data.FabricConstructionDocument.Id = newValue.Id;
        this.data.FabricConstructionDocument.ConstructionNumber =
          newValue.ConstructionNumber;
      }
    }
  }

  MonthChanged(newValue) {
    this.data.Period.Month = newValue;
  }

  YearChanged(newValue) {
    this.data.Period.Year = newValue;
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
