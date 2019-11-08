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
  //   @bindable Period;

  constructor(router, service) {
    this.service = service;
    this.router = router;
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

    //Get All
    if (!this.StartDatePeriod && !this.EndDatePeriod && !this.OrderProduction && !this.WeavingUnit && !this.MaterialType && !this.OperationStatus) {
      return this.listDataFlag ? this.service.getAll().then(result => {
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

    //Get Data by Order
    if (!this.StartDatePeriod && !this.EndDatePeriod && this.OrderProduction && !this.WeavingUnit && !this.MaterialType && !this.OperationStatus) {
      let OrderProductionIdContainer = this.OrderProduction.Id;
      
      return this.listDataFlag ? this.service.getByOrder(OrderProductionIdContainer).then(result => {
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

    //Get Data by Weaving Unit
    if (!this.StartDatePeriod && !this.EndDatePeriod && !this.OrderProduction && this.WeavingUnit && !this.MaterialType && !this.OperationStatus) {
      let WeavingUnitIdContainer = this.WeavingUnit.Id;
      
      return this.listDataFlag ? this.service.getByWeavingUnit(WeavingUnitIdContainer).then(result => {
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
    //Get All
    if (!this.WeavingUnit && !this.MachineDocument && !this.Block) {
      return this.listDataFlag ? this.service.getXlsAll().then(result => {
        return {
          data: result,
          total: length
        };
      }) : {
        data: {},
        total: 0
      };
    }

    //Get By Fill Weaving Unit Only
    if (this.WeavingUnit && !this.MachineDocument && !this.Block) {
      let WeavingUnitIdContainer = this.WeavingUnit.Id;

      return this.listDataFlag ? this.service.getXlsByWeavingUnit(WeavingUnitIdContainer).then(result => {
        return {
          data: result,
          total: length
        };
      }) : {
        data: {},
        total: 0
      };
    }

    //Get By Fill Machine Document Only
    if (!this.WeavingUnit && this.MachineDocument && !this.Block) {
      let MachineDocumentIdContainer = this.MachineDocument.Id;

      return this.listDataFlag ? this.service.getXlsByMachine(MachineDocumentIdContainer).then(result => {
        return {
          data: result,
          total: length
        };
      }) : {
        data: {},
        total: 0
      };
    }

    //Get By Fill Block Only
    if (!this.WeavingUnit && !this.MachineDocument && this.Block) {
      let BlockContainer = this.Block;

      return this.listDataFlag ? this.service.getXlsByBlock(BlockContainer).then(result => {
        return {
          data: result,
          total: length
        };
      }) : {
        data: {},
        total: 0
      };
    }

    //Get By Fill Weaving Unit and Machine Document
    if (this.WeavingUnit && this.MachineDocument && !this.Block) {
      let WeavingUnitIdContainer = this.WeavingUnit.Id;
      let MachineDocumentIdContainer = this.MachineDocument.Id;

      return this.listDataFlag ? this.service.getXlsByWeavingUnitMachine(WeavingUnitIdContainer, MachineDocumentIdContainer).then(result => {
        return {
          data: result,
          total: length
        };
      }) : {
        data: {},
        total: 0
      };
    }

    //Get By Fill Weaving Unit and Block
    if (this.WeavingUnit && !this.MachineDocument && this.Block) {
      let WeavingUnitIdContainer = this.WeavingUnit.Id;
      let BlockContainer = this.Block;

      return this.listDataFlag ? this.service.getXlsByWeavingUnitBlock(WeavingUnitIdContainer, BlockContainer).then(result => {
        return {
          data: result,
          total: length
        };
      }) : {
        data: {},
        total: 0
      };
    }

    //Get By Fill Machine and Block
    if (!this.WeavingUnit && this.MachineDocument && this.Block) {
      let MachineDocumentIdContainer = this.MachineDocument.Id;
      let BlockContainer = this.Block;

      return this.listDataFlag ? this.service.getXlsByMachineBlock(MachineDocumentIdContainer, BlockContainer).then(result => {
        return {
          data: result,
          total: length
        };
      }) : {
        data: {},
        total: 0
      };
    }

    //Get By Fill Weaving Unit, Machine and Block
    if (this.WeavingUnit && this.MachineDocument && this.Block) {
      let WeavingUnitIdContainer = this.WeavingUnit.Id;
      let MachineDocumentIdContainer = this.MachineDocument.Id;
      let BlockContainer = this.Block;

      return this.listDataFlag ? this.service.getXlsAllSpecified(WeavingUnitIdContainer, MachineDocumentIdContainer, BlockContainer).then(result => {
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
}
