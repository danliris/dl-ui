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
  
  const OrderLoader = require("../../../loader/weaving-order-loader");
  const UnitLoader = require('../../../loader/unit-loader');
  const MachineLoader = require("../../../loader/weaving-machine-loader");
  const ConstructionLoader = require("../../../loader/weaving-constructions-loader");
  const SizingBeamLoader = require("../../../loader/weaving-sizing-beam-by-order-loader");
  
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
      field: "SizingBeamNumber",
      title: "No. Beam Sizing"
    }, {
      field: "OperatorName",
      title: "Operator"
    }, {
      field: "ReachingOperatorGroup",
      title: "Grup Reaching"
    }, {
      field: "PreparationDate",
      title: "Tanggal Pasang"
    },{
      field: "LastModifiedTime",
      title: "Waktu Terakhir Diubah"
    }, {
      field: "Shift",
      title: "Shift"
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
  
      var MachineContainer = this.Machine;
      var OrderProductionContainer = this.OrderProduction;
      var FabricConstructionContainer = this.FabricConstruction;
      var SizingBeamContainer = this.SizingBeam;
      var OperationStatusContainer = this.OperationStatus;
      var WeavingUnitContainer = this.WeavingUnit;
      var StartDatePeriodContainer = this.StartDatePeriod ? moment(this.StartDatePeriod).format("DD MMM YYYY HH:mm") : null;
      var EndDatePeriodContainer = this.EndDatePeriod ? moment(this.EndDatePeriod).format("DD MMM YYYY HH:mm") : null;
  
      //Get All
      return this.listDataFlag ? this.service.getReportData(MachineContainer, OrderProductionContainer, FabricConstructionContainer, SizingBeamContainer, OperationStatusContainer, WeavingUnitContainer, StartDatePeriodContainer, EndDatePeriodContainer).then(result => {
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
  
    get machines() {
      return MachineLoader;
    }
  
    get constructions() {
      return ConstructionLoader;
    }
  
    get sizingBeams() {
      return SizingBeamLoader;
    }
  
    searchDailyOperationReachings() {
      this.listDataFlag = true;
  
      this.dailyOperationReachingsTable.refresh();
    }
  
    reset() {
      this.listDataFlag = false;
  
      this.Machine = undefined;
      this.OrderProduction = undefined;
      this.OperationStatus = null;
      this.WeavingUnit = undefined;
      this.FabricConstruction = undefined;
      this.SizingBeam = undefined;
      this.StartDatePeriod = undefined;
      this.EndDatePeriod = undefined;
  
      this.MachineContainer = undefined;
      this.OrderProductionContainer = undefined;
      this.FabricConstructionContainer = undefined;
      this.SizingBeamContainer = undefined;
      this.OperationStatusContainer = null;
      this.WeavingUnitContainer = undefined;
      this.StartDatePeriodContainer = undefined;
      this.EndDatePeriodContainer = undefined;
  
      this.dailyOperationReachingsTable.refresh();
    }
  
    exportToExcel() {
        var MachineContainer = this.Machine;
        var OrderProductionContainer = this.OrderProduction;
        var FabricConstructionContainer = this.FabricConstruction;
        var SizingBeamContainer = this.SizingBeam;
        var OperationStatusContainer = this.OperationStatus;
        var WeavingUnitContainer = this.WeavingUnit;
        var StartDatePeriodContainer = this.StartDatePeriod ? moment(this.StartDatePeriod).format("DD MMM YYYY HH:mm") : null;
        var EndDatePeriodContainer = this.EndDatePeriod ? moment(this.EndDatePeriod).format("DD MMM YYYY HH:mm") : null;
    
        //Get All
        return this.listDataFlag ? this.service.getReportXls(MachineContainer, OrderProductionContainer, FabricConstructionContainer, SizingBeamContainer, OperationStatusContainer, WeavingUnitContainer, StartDatePeriodContainer, EndDatePeriodContainer).then(result => {
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
  