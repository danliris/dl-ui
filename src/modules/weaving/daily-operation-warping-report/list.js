import {
  inject,
  bindable
} from 'aurelia-framework';
import {
  Service
} from "./service";
import {
  Router
} from 'aurelia-router';
import moment from 'moment';

let OrderLoader = require("../../../loader/weaving-order-loader");
let UnitLoader = require('../../../loader/unit-loader');
var MaterialTypeLoader = require("../../../loader/weaving-material-type-loader");

@inject(Router, Service)
export class List {
  @bindable StartDatePeriod;
  @bindable EndDatePeriod;

  constructor(router, service) {
    this.service = service;
    this.router = router;
    this.error = {};
    // this.ShowHideByDatePeriod = false;
    // this.ShowHideByDateRangePeriod = false;
    // this.ShowHideMonthlyPeriod = false;
  }

  listDataFlag = false;

  //   periods = ["", "Harian", "Rekap", "Bulanan"];

  //   months = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  operationStatusItems = ["", "ON-PROCESS", "FINISH"];

  columns = [{
    field: "OrderProductionNumber",
    title: "No. Order Produksi"
  }, {
    field: "ConstructionNumber",
    title: "No. Konstruksi"
  }, {
    field: "WeavingUnit",
    title: "Unit Weaving"
  }, {
    field: "MaterialType",
    title: "Jenis Material"
  }, {
    field: "AmountOfCones",
    title: "Jumlah Cone"
  }, {
    field: "ColourOfCones",
    title: "Warna Cone"
  }, {
    field: "OperatorName",
    title: "Operator"
  }, {
    field: "WarpingOperatorGroup",
    title: "Grup Warping"
  }, {
    field: "PreparationDate",
    title: "Tanggal Pasang"
  }, {
    field: "LastModifiedTime",
    title: "Waktu Terakhir Diubah"
  }, {
    field: "Shift",
    title: "Shift"
  }, ];

  controlOptions = {
    label: {
      length: 4
    },
    control: {
      length: 6
    }
  }

  startPeriodOptions = {
    label: {
      length: 4
    },
    control: {
      length: 6
    }
  }

  endPeriodOptions = {
    control: {
      length: 6
    }
  }

  tableOptions = {
    search: false,
    showToggle: false,
    showColumns: false,
    pagination: false,
    sortable: false,
  }

  //   PeriodChanged(newValue) {
  //     switch (newValue) {
  //       case "":
  //         this.ShowHideByDatePeriod = false;
  //         this.DatePeriod = "";
  //         this.ShowHideByDateRangePeriod = false;
  //         this.StartDatePeriod = "";
  //         this.EndDatePeriod = "";
  //         this.ShowHideMonthlyPeriod = false;
  //         this.MonthlyPeriod = "";
  //         break;
  //       case "Harian":
  //         this.ShowHideByDatePeriod = true;
  //         this.ShowHideByDateRangePeriod = false;
  //         this.StartDatePeriod = "";
  //         this.EndDatePeriod = "";
  //         this.ShowHideMonthlyPeriod = false;
  //         this.MonthlyPeriod = "";
  //         break;
  //       case "Rekap":
  //         this.ShowHideByDatePeriod = false;
  //         this.DatePeriod = "";
  //         this.ShowHideByDateRangePeriod = true;
  //         this.ShowHideMonthlyPeriod = false;
  //         this.MonthlyPeriod = "";
  //         break;
  //       case "Bulanan":
  //         this.ShowHideByDatePeriod = false;
  //         this.DatePeriod = "";
  //         this.ShowHideByDateRangePeriod = false;
  //         this.StartDatePeriod = "";
  //         this.EndDatePeriod = "";
  //         this.ShowHideMonthlyPeriod = true;
  //     }
  //   }

  loader = (info) => {
    this.info = {};

    var OrderProductionContainer = this.OrderProduction;
    var MaterialTypeContainer = this.MaterialType;
    var OperationStatusContainer = this.OperationStatus;
    var WeavingUnitContainer = this.WeavingUnit;
    var StartDatePeriodContainer = this.StartDatePeriod ? moment(this.StartDatePeriod).format("DD MMM YYYY HH:mm") : null;
    var EndDatePeriodContainer = this.EndDatePeriod ? moment(this.EndDatePeriod).format("DD MMM YYYY HH:mm") : null;

    //Get All
    return this.listDataFlag ? this.service.getReportData(OrderProductionContainer, MaterialTypeContainer, OperationStatusContainer, WeavingUnitContainer, StartDatePeriodContainer, EndDatePeriodContainer).then(result => {
      for (var datum of result) {
        if (datum.PreparationDate) {
          var InstallationDate = moment(datum.PreparationDate).format('DD/MM/YYYY');

          datum.PreparationDate = InstallationDate;
        }
      }
      return {
        data: result,
        total: length
      };
    }) : {
      data: {},
      total: 0
    };
  }

  // EndDatePeriodChanged(newValue) {
  //   this.error.EndDatePeriod = "";
  //   var parsedStartDate = Date.parse(this.StartDatePeriod);
  //   var parsedEndDate = Date.parse(newValue);
  //   if (this.StartDatePeriod) {
  //     if (parsedStartDate > parsedEndDate) {
  //       this.error.EndDatePeriod = "Tanggal Akhir Tidak Boleh Lebih Dahulu dari Tanggal Mulai";
  //     } else {
  //       this.error.EndDatePeriod = "";
  //     }
  //   }
  // }

  // StartDatePeriodChanged(newValue) {
  //   this.error.StartDatePeriod = "";
  //   var parsedStartDate = Date.parse(newValue);
  //   var parsedEndDate = Date.parse(this.EndDatePeriod);
  //   if (this.EndDatePeriod) {
  //     if (parsedStartDate > parsedEndDate) {
  //       this.error.StartDatePeriod = "Tanggal Mulai Tidak Boleh Lebih Lambat dari Tanggal Akhir";
  //     } else {
  //       this.error.StartDatePeriod = "";
  //     }
  //   }
  // }

  get orders() {
    return OrderLoader;
  }

  get units() {
    return UnitLoader;
  }

  get materialTypes() {
    return MaterialTypeLoader;
  }

  searchDailyOperationWarpings() {
    this.listDataFlag = true;

    this.dailyOperationWarpingsTable.refresh();
  }

  reset() {
    this.listDataFlag = false;

    this.StartDatePeriod = undefined;
    this.EndDatePeriod = undefined;
    this.OrderProduction = undefined;
    this.WeavingUnit = undefined;
    this.MaterialType = undefined;
    this.OperationStatus = null;

    this.StartDatePeriodContainer = undefined;
    this.EndDatePeriodContainer = undefined;
    this.OrderProductionIdContainer = undefined;
    this.WeavingUnitIdContainer = undefined;
    this.MaterialTypeIdContainer = undefined;
    this.OperationStatusContainer = null;

    this.dailyOperationWarpingsTable.refresh();
  }

  exportToExcel() {
    var OrderProductionContainer = this.OrderProduction;
    var MaterialTypeContainer = this.MaterialType;
    var OperationStatusContainer = this.OperationStatus;
    var WeavingUnitContainer = this.WeavingUnit;
    var StartDatePeriodContainer = this.StartDatePeriod ? moment(this.StartDatePeriod).format("DD MMM YYYY HH:mm") : null;
    var EndDatePeriodContainer = this.EndDatePeriod ? moment(this.EndDatePeriod).format("DD MMM YYYY HH:mm") : null;

    //Get All
    return this.listDataFlag ? this.service.getReportXls(OrderProductionContainer, MaterialTypeContainer, OperationStatusContainer, WeavingUnitContainer, StartDatePeriodContainer, EndDatePeriodContainer).then(result => {
      for (var datum of result) {
        if (datum.PreparationDate) {
          var InstallationDate = moment(datum.PreparationDate).format('DD/MM/YYYY');

          datum.PreparationDate = InstallationDate;
        }
      }
      return {
        data: result,
        total: length
      };
    }) : {
      data: {},
      total: 0
    };
  }
}
