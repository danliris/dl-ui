import {
  inject,
  bindable,
  computedFrom
} from "aurelia-framework";
import moment from "moment";
import {
  Service
} from "./service";
var UnitLoader = require("../../../loader/unit-loader");
import {
  Router
} from "aurelia-router";

@inject(Service, Router)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable error;
  @bindable Month;
  @bindable Year;

  yearFormat = "YYYY";
  years = [];

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan"
  };

  //Options untuk No. Estimasi Produksi
  controlOptions = {
    label: {
      length: 3
    },
    control: {
      length: 6
    }
  };

  months = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  constructor(service, router) {
    this.service = service;
    this.router = router;

    this.currentYearItem = parseInt(moment().format('YYYY'));
    this.minYearItem = this.currentYearItem - 10;
    this.maxYearItem = this.currentYearItem + 10;

    for (var i = parseInt(this.minYearItem); i <= parseInt(this.maxYearItem); i++) {
      this.years.push(i.toString());
    }
  }

  orderProductionsItems;

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    this.Month = this.months[this.getMonth()];

    if (this.data.EstimatedNumber) {
      this.orderProductionsTableOptions = {};
    }
    this.orderProductionsItems;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  orderProductionsColumns = [{
      header: "Tanggal",
      value: "DateOrdered"
    },
    {
      header: "No. SOP",
      value: "OrderNumber"
    },
    {
      header: "No. Konstruksi",
      value: "ConstructionNumber"
    },
    {
      header: "Total Gram",
      value: "TotalGramEstimation"
    },
    {
      header: "Jumlah Order(Meter)",
      value: "WholeGrade"
    },
    {
      header: "Grade A(%)",
      value: "GradeA"
    },
    {
      header: "Grade B(%)",
      value: "GradeB"
    },
    {
      header: "Grade C(%)",
      value: "GradeC"
    },
    {
      header: "Grade D(%)",
      value: "GradeD"
    }
  ];

  get units() {
    return UnitLoader;
  }

  MonthChanged(newValue) {
    this.data.Month = newValue;
  }

  YearChanged(newValue) {
    this.data.Year = newValue;
  }

  async searchOrderProductions() {
    this.error = {};
    // var errorIndex = 0;
    // var emptyFieldName =
    //   "Isi Semua Field Untuk Mencari Surat Perintah Produksi";

    if (!this.Month) {
      this.error.Month = "Bulan Harus Diisi";
    }

    if (!this.Year) {
      this.error.Year = "Tahun Harus Diisi";
    }

    if (!this.data.Unit) {
      this.error.UnitId = "Unit Harus Diisi";
    }

    // if (!this.data.Period) {
    //   errorIndex++;
    // } else {
    //   if (!this.data.Period.Year) {
    //     this.error.Year = "Periode Tahun Tidak Boleh Kosong";
    //   }

    //   if (!this.data.Period.Month) {
    //     this.error.Month = "Periode Bulan Tidak Boleh Kosong";
    //   }
    // }

    // if (!this.data.Unit) {
    //   if (errorIndex == 0) {
    //     emptyFieldName = "Unit Tidak Boleh Kosong";
    //   }
    //   errorIndex++;
    // }

    // if (errorIndex > 0) {
    //   window.alert(emptyFieldName);
    // } else {
    //   await this.service
    //     .searchSOP(
    //       this.data.Period.Month,
    //       this.data.Period.Year,
    //       this.data.Unit
    //     )
    //     .then(result => {
    //       //Print each datum on orderProductions Data and push to Items Collections
    //       result.forEach((datum, i, data) => {

    //         if (
    //           this.data.EstimationProducts.find(esp => esp.Id == datum.Id)
    //         ) {} else {
    //           this.data.EstimationProducts.push(datum);
    //         }
    //       });

    //       //Bind "Items" reference
    //       this.context.orderProductionsItems.bind(this);
    //     }).catch(e => {

    //       window.alert('Data not found')
    //       location.reload();
    //     });
    // }
  }

  getMonth() {
    return new Date().getMonth() + 1;
  }
}
