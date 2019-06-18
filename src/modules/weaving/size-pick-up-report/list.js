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

  periods = ["", "Harian/ Rekap", "Bulanan"];

  months = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  columns = [{
      field: "OperatedDate",
      title: "Tanggal",
      formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY");
      }
    },
    {
      field: "Operator",
      title: "Grup Sizing",
      formatter: function (value, data, index) {
        return value.SizingGroup;
      }
    },
    {
      field: "Operator",
      title: "Operator",
      formatter: function (value, data, index) {
        return value.Name;
      }
    },
    {
      field: "Recipe Code",
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
      field: "Counter",
      title: "Counter Akhir",
      formatter: function (value, data, index) {
        return value.Finish;
      }
    },
    {
      field: "Weight",
      title: "Netto",
      formatter: function (value, data, index) {
        return value.Netto;
      }
    },
    {
      field: "Weight",
      title: "Bruto",
      formatter: function (value, data, index) {
        return value.Bruto;
      }
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

  StartPeriodOptions = {
    label: {
      length: 4
    },
    control: {
      length: 7
    }
  }

  EndPeriodOptions = {
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

  //   shiftAll(){
  //     var isAllShift = document.getElementById("ShiftAll");

  //     if (isAllShift.checked === true){
  //         this.ShowHideShift = false;
  //       } else {
  //         this.ShowHideShift = true;
  //       }
  //   }

  //   listDataFlag = false;
  //   spinningFilter = {
  //     "division.name": {
  //       "$regex": "SPINNING",
  //       "$options": "i"
  //     }
  //   };

  //   filter() {
  //     this.arg = {};
  //     this.arg.Filter = {
  //       "UnitName": this.unit != null || this.unit != undefined ? this.unit.name : "all",
  //       "YarnName": this.yarn != null || this.yarn != undefined ? this.yarn.Name : "all",
  //       "DateFrom": moment(this.dateFrom ? this.dateFrom : new Date("12-25-1900")).format("DD MMM YYYY HH:mm"),
  //       "DateTo": moment(this.dateTo ? this.dateTo : new Date()).format("DD MMM YYYY HH:mm")
  //     };
  //   }

  ExportToExcel() {
    this.filter()
    this.service.generateExcel(this.arg)
  }

  //   loader = (info) => {
  //     var order = {};
  //     if (info.sort)
  //       order[info.sort] = info.order;

  //     this.arg = {
  //       page: parseInt(info.offset / info.limit, 10) + 1,
  //       size: info.limit,
  //       keyword: info.search,
  //       order: order,
  //     }

  // return this.listDataFlag ? (
  //   this.filter(),
  //   this.service.search(this.arg).then((result) => {

  //     for (var i of result) {
  //       i.FirstShift = parseFloat(i.FirstShift.toFixed(2));
  //       i.SecondShift = parseFloat(i.FirstShift.toFixed(2));
  //       i.ThirdShift = parseFloat(i.FirstShift.toFixed(2));
  //       i.Total = parseFloat(i.Total.toFixed(2));
  //     }

  //     return {
  //       data: result
  //     }
  //   })
  // ) : {
  //   total: 0,
  //   data: {}
  // };
  //   }

  search() {
    // this.listDataFlag = true;
    // this.table.refresh();
  }

  reset() {
    // this.unit = null;
    // this.yarn = null;
    // this.dateFrom = undefined;
    // this.dateTo = undefined;
    // this.error = "";
  }

  searchDailyOperations() {
    console.log(this.data);
    var MonthContainer = this.data.MonthlyPeriod;
    var ShiftIdContainer = this.data.Shift.Id;
    var WeavingUnitIdContainer = this.data.WeavingUnit.Id;
    this.data = {};
    this.data.Month = " ";
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
    this.data.Month = MonthContainer;
    this.data.ShiftId = " ";
    this.data.ShiftId = ShiftIdContainer;
    this.data.WeavingUnitId = 0;
    this.data.WeavingUnitId = WeavingUnitIdContainer;
    console.log(this.data);
    this.service.getDataByMonth(MonthContainer, WeavingUnitIdContainer, ShiftIdContainer).then(result => {
      return {
        data: result.data,
        total: result.data.length
      };
    })
  }

  get shifts() {
    return ShiftLoader;
  }

  get units() {
    return UnitLoader;
  }
}
