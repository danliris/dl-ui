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

var ShiftLoader = require('../../../loader/weaving-shift-loader');
var UnitLoader = require('../../../loader/unit-loader');

@inject(Router, Service)
export class List {
  @bindable Period;

  constructor(router, service) {
    this.service = service;
    this.router = router;
    this.ShowHideDailyPeriod = false;
    this.ShowHideMonthlyPeriod = false;
  }

  listDataFlag = false;

  periods = ["", "Harian/ Rekap", "Bulanan"];

  months = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  columns = [{
      field: "DateTimeMachineHistory",
      title: "Tanggal",
      formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY");
      }
    },
    {
      field: "OperatorGroup",
      title: "Grup Sizing"
    },
    // {
    //   field: "OperatorName",
    //   title: "Operator"
    // },
    {
      field: "RecipeCode",
      title: "Kode Resep"
    },
    {
      field: "MachineSpeed",
      title: "Kecepatan Mesin"
    },
    {
      field: "TexSQ",
      title: "TexSQ"
    },
    {
      field: "Visco",
      title: "Visco"
    },
    {
      field: "BeamNumber",
      title: "No. Beam"
    },
    {
      field: "PIS",
      title: "PIS"
    },
    {
      field: "Finish",
      title: "Counter Akhir"
    },
    {
      field: "Netto",
      title: "Netto"
    },
    {
      field: "Bruto",
      title: "Bruto"
    },
    {
      field: "SPU",
      title: "SPU"
    },
  ];

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
      length: 7
    }
  }

  endPeriodOptions = {
    control: {
      length: 7
    }
  }

  tableOptions = {
    search: false,
    showToggle: false,
    showColumns: false,
    pagination: false,
    sortable: false,
  }

  PeriodChanged(newValue) {
    switch (newValue) {
      case "":
        this.ShowHideDailyPeriod = false;
        this.ShowHideMonthlyPeriod = false;
        break;
      case "Harian/ Rekap":
        this.ShowHideDailyPeriod = true;
        this.ShowHideMonthlyPeriod = false;
        break;
      case "Bulanan":
        this.ShowHideDailyPeriod = false;
        this.ShowHideMonthlyPeriod = true;
    }
  }

  get shifts() {
    return ShiftLoader;
  }

  get units() {
    return UnitLoader;
  }

  loader = (info) => {
    // debugger;
    this.info = {};
    var MonthContainer;
    var ShiftIdContainer;
    var WeavingUnitIdContainer;

    // if (this.data) {
      MonthContainer = this.MonthlyPeriod;
      if(this.Shift){
        ShiftIdContainer = this.Shift.Id;
      }
      if(this.WeavingUnit){
        WeavingUnitIdContainer = this.WeavingUnit.Id;
      }
    // }

    // this.data = {};
    // this.data.Month = " ";
    switch (MonthContainer) {
      case "Januari":
        MonthContainer = 1;
        break;
      case "Februari":
        MonthContainer = 2;
        break;
      case "Maret":
        MonthContainer = 3;
        break;
      case "April":
        MonthContainer = 4;
        break;
      case "Mei":
        MonthContainer = 5;
        break;
      case "Juni":
        MonthContainer = 6;
        break;
      case "Juli":
        MonthContainer = 7;
        break;
      case "Agustus":
        MonthContainer = 8;
        break;
      case "September":
        MonthContainer = 9;
        break;
      case "Oktober":
        MonthContainer = 10;
        break;
      case "November":
        MonthContainer = 11;
        break;
      case "Desember":
        MonthContainer = 12;
        break;
      default:
        MonthContainer = 0;
        break;
    }
    // this.data.Month = MonthContainer;
    // this.data.ShiftId = " ";
    // this.data.ShiftId = ShiftIdContainer;
    // this.data.WeavingUnitId = 0;
    // this.data.WeavingUnitId = WeavingUnitIdContainer;

    return this.listDataFlag ? this.service.getDataByMonth(MonthContainer, WeavingUnitIdContainer, ShiftIdContainer).then(result => {
      console.log(result);
      // debugger;
      return {
        data: result,
        total: result.length
      };
    }) : {
      total: 0,
      data: {}
    };
  }

  searchDailyOperations() {
    this.listDataFlag = true;

    this.sizePickupsTable.refresh();
  }

  reset() {
    this.listDataFlag = false;
    this.MonthContainer = null;
    this.ShiftIdContainer = null;
    this.WeavingUnitIdContainer = null;
    this.sizePickupsTable.refresh();
  }

  // ExportToExcel() {
  //   this.filter()
  //   this.service.generateExcel(this.arg)
  // }
}
