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
var MachineLoader = require("../../../loader/weaving-machine-loader");

@inject(Router, Service)
export class List {
  //   @bindable Period;

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  listDataFlag = false;

  operationStatusItems = ["", "ON-PROCESS", "FINISH"];

  columns = [{
    field: "MachineNumber",
    title: "No. Mesin"
  }, {
    field: "OrderProductionNumber",
    title: "No. Order Produksi"
  }, {
    field: "ConstructionNumber",
    title: "No. Konstruksi"
  }, {
    field: "WeavingUnit",
    title: "Unit Weaving"
  }, {
    field: "RecipeCode",
    title: "Kode Resep"
  }, {
    field: "NeReal",
    title: "Ne Real"
  }, {
    field: "OperatorName",
    title: "Operator"
  }, {
    field: "SizingOperatorGroup",
    title: "Grup Sizing"
  }, {
    field: "PreparationDate",
    title: "Tanggal Pasang"
  }, {
    field: "Shift",
    title: "Shift"
  }, {
    field: "YarnStrands",
    title: "Total Helai Beam"
  }, {
    field: "EmptyWeight",
    title: "Total Berat Kosong"
  }];

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

  loader = (info) => {
    this.info = {};

    var OrderProductionContainer = this.OrderProduction;
    var MachineContainer = this.Machine;
    var OperationStatusContainer = this.OperationStatus;
    var WeavingUnitContainer = this.WeavingUnit;
    var StartDatePeriodContainer = this.StartDatePeriod ? moment(this.StartDatePeriod).format("DD MMM YYYY HH:mm") : null;
    var EndDatePeriodContainer = this.EndDatePeriod ? moment(this.EndDatePeriod).format("DD MMM YYYY HH:mm") : null;

    //Get All
    return this.listDataFlag ? this.service.getReportData(OrderProductionContainer, MachineContainer, OperationStatusContainer, WeavingUnitContainer, StartDatePeriodContainer, EndDatePeriodContainer).then(result => {
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

  get orders() {
    return OrderLoader;
  }

  get units() {
    return UnitLoader;
  }

  searchDailyOperationSizings() {
    this.listDataFlag = true;

    this.dailyOperationSizingsTable.refresh();
  }

  reset() {
    this.listDataFlag = false;

    this.StartDatePeriod = undefined;
    this.EndDatePeriod = undefined;
    this.OrderProduction = undefined;
    this.WeavingUnit = undefined;
    this.Machine = undefined;
    this.OperationStatus = null;

    this.StartDatePeriodContainer = undefined;
    this.EndDatePeriodContainer = undefined;
    this.OrderProductionIdContainer = undefined;
    this.WeavingUnitIdContainer = undefined;
    this.MachineIdContainer = undefined;
    this.OperationStatusContainer = null;

    this.dailyOperationWarpingsTable.refresh();
  }

  exportToExcel() {
    var OrderProductionContainer = this.OrderProduction;
    var MachineContainer = this.Machine;
    var OperationStatusContainer = this.OperationStatus;
    var WeavingUnitContainer = this.WeavingUnit;
    var StartDatePeriodContainer = this.StartDatePeriod ? moment(this.StartDatePeriod).format("DD MMM YYYY HH:mm") : null;
    var EndDatePeriodContainer = this.EndDatePeriod ? moment(this.EndDatePeriod).format("DD MMM YYYY HH:mm") : null;

    //Get All
    return this.listDataFlag ? this.service.getReportXls(OrderProductionContainer, MachineContainer, OperationStatusContainer, WeavingUnitContainer, StartDatePeriodContainer, EndDatePeriodContainer).then(result => {
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
