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
    this.ShowHideByDatePeriod = false;
    this.ShowHideByDateRangePeriod = false;
    this.ShowHideMonthlyPeriod = false;
  }

  listDataFlag = false;

  periods = ["", "Harian", "Rekap", "Bulanan"];

  months = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  pickups = ["", "Diatas Standar", "Dibawah Standar", "Sesuai Standar"]

  columns = [{
      field: "DateTimeMachineHistory",
      title: "Tanggal Selesai",
      formatter: function (value, data, index) {
        return moment(value).format("DD MMMM YYYY");
      }
    },
    {
      field: "OperatorGroup",
      title: "Grup Sizing"
    },
    {
      field: "OperatorName",
      title: "Operator"
    },
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
      field: "PISMeter",
      title: "PIS(m)"
    },
    {
      field: "StartCounter",
      title: "Counter Awal"
    },
    {
      field: "FinishCounter",
      title: "Counter Akhir"
    },
    {
      field: "NettoWeight",
      title: "Netto"
    },
    {
      field: "BrutoWeight",
      title: "Bruto"
    },
    {
      field: "SPU",
      title: "SPU"
    }, {
      field: "DateTimeMachineHistory",
      title: "Waktu Doff",
      formatter: function (value, data, index) {
        return moment(value).format("HH:mm:ss");
      }
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
    pagination: true,
    sortable: true,
  }

  PeriodChanged(newValue) {
    switch (newValue) {
      case "":
        this.ShowHideByDatePeriod = false;
        this.DatePeriod = "";
        this.ShowHideByDateRangePeriod = false;
        this.StartDatePeriod = "";
        this.EndDatePeriod = "";
        this.ShowHideMonthlyPeriod = false;
        this.MonthlyPeriod = "";
        break;
      case "Harian":
        this.ShowHideByDatePeriod = true;
        this.ShowHideByDateRangePeriod = false;
        this.StartDatePeriod = "";
        this.EndDatePeriod = "";
        this.ShowHideMonthlyPeriod = false;
        this.MonthlyPeriod = "";
        break;
      case "Rekap":
        this.ShowHideByDatePeriod = false;
        this.DatePeriod = "";
        this.ShowHideByDateRangePeriod = true;
        this.ShowHideMonthlyPeriod = false;
        this.MonthlyPeriod = "";
        break;
      case "Bulanan":
        this.ShowHideByDatePeriod = false;
        this.DatePeriod = "";
        this.ShowHideByDateRangePeriod = false;
        this.StartDatePeriod = "";
        this.EndDatePeriod = "";
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
    let order = {};
    if (info.sort) order[info.sort] = info.order;

    if (this.DatePeriod) {
      var DatePeriodContainer = this.DatePeriod ? moment(this.DatePeriod).format("MM DD YYYY") : null;
    }

    if (this.StartDatePeriod) {
      var StartDatePeriodContainer = this.StartDatePeriod ? moment(this.StartDatePeriod).format("MM DD YYYY") : null;
    }

    if (this.EndDatePeriod) {
      var EndDatePeriodContainer = this.EndDatePeriod ? moment(this.EndDatePeriod).format("MM DD YYYY") : null;
    }

    if (this.MonthlyPeriod) {
      var MonthlyPeriodContainer = this.MonthlyPeriod;
    }

    switch (MonthlyPeriodContainer) {
      case "Januari":
        MonthlyPeriodContainer = 1;
        break;
      case "Februari":
        MonthlyPeriodContainer = 2;
        break;
      case "Maret":
        MonthlyPeriodContainer = 3;
        break;
      case "April":
        MonthlyPeriodContainer = 4;
        break;
      case "Mei":
        MonthlyPeriodContainer = 5;
        break;
      case "Juni":
        MonthlyPeriodContainer = 6;
        break;
      case "Juli":
        MonthlyPeriodContainer = 7;
        break;
      case "Agustus":
        MonthlyPeriodContainer = 8;
        break;
      case "September":
        MonthlyPeriodContainer = 9;
        break;
      case "Oktober":
        MonthlyPeriodContainer = 10;
        break;
      case "November":
        MonthlyPeriodContainer = 11;
        break;
      case "Desember":
        MonthlyPeriodContainer = 12;
        break;
      default:
        MonthlyPeriodContainer = 0;
        break;
    }

    if (this.Shift) {
      var ShiftContainer = this.Shift.Id;
    }

    if (this.WeavingUnit) {
      var WeavingUnitIdContainer = this.WeavingUnit.Id;
    }
    var SPUContainer;
    if (this.SPU) {
      switch (this.SPU) {
        case "Diatas Standar":
          SPUContainer = "Upper Limit";
          break;
        case "Dibawah Standar":
          SPUContainer = "Lower Limit";
          break;
        case "Sesuai Standar":
          SPUContainer = "Standard";
          break;
      }
    } else {
      SPUContainer = "All"
    }

    var arg = {
      shiftId: ShiftContainer,
      spuStatus: SPUContainer,
      unitId: WeavingUnitIdContainer,
      date: DatePeriodContainer,
      dateFrom: StartDatePeriodContainer,
      dateTo: EndDatePeriodContainer,
      month: MonthlyPeriodContainer,

      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order
    };

    return this.listDataFlag ? this.service.getReportData(arg).then(result => {
      return {
        data: result.data,
        total: result.info.count
      };
    }) : {
      data: {},
      total: 0
    };
  }

  searchDailyOperations() {
    this.listDataFlag = true;

    this.sizePickupsTable.refresh();
  }

  reset() {
    this.listDataFlag = false;

    this.StartDatePeriodContainer = null;
    this.EndDatePeriodContainer = null;
    this.MonthContainer = null;
    this.ShiftIdContainer = null;
    this.WeavingUnitIdContainer = null;

    this.sizePickupsTable.refresh();
  }

  exportToExcel() {
    if (this.DatePeriod) {
      var DatePeriodContainer = this.DatePeriod ? moment(this.DatePeriod).format("MM DD YYYY") : null;
    }

    if (this.StartDatePeriod) {
      var StartDatePeriodContainer = this.StartDatePeriod ? moment(this.StartDatePeriod).format("MM DD YYYY") : null;
    }

    if (this.EndDatePeriod) {
      var EndDatePeriodContainer = this.EndDatePeriod ? moment(this.EndDatePeriod).format("MM DD YYYY") : null;
    }

    if (this.MonthlyPeriod) {
      var MonthlyPeriodContainer = this.MonthlyPeriod;
    }

    switch (MonthlyPeriodContainer) {
      case "Januari":
        MonthlyPeriodContainer = 1;
        break;
      case "Februari":
        MonthlyPeriodContainer = 2;
        break;
      case "Maret":
        MonthlyPeriodContainer = 3;
        break;
      case "April":
        MonthlyPeriodContainer = 4;
        break;
      case "Mei":
        MonthlyPeriodContainer = 5;
        break;
      case "Juni":
        MonthlyPeriodContainer = 6;
        break;
      case "Juli":
        MonthlyPeriodContainer = 7;
        break;
      case "Agustus":
        MonthlyPeriodContainer = 8;
        break;
      case "September":
        MonthlyPeriodContainer = 9;
        break;
      case "Oktober":
        MonthlyPeriodContainer = 10;
        break;
      case "November":
        MonthlyPeriodContainer = 11;
        break;
      case "Desember":
        MonthlyPeriodContainer = 12;
        break;
      default:
        MonthlyPeriodContainer = 0;
        break;
    }

    if (this.Shift) {
      var ShiftContainer = this.Shift;
    }

    if (this.WeavingUnit) {
      var WeavingUnitContainer = this.WeavingUnit;
    }
    var SPUContainer;
    if (this.SPU) {
      switch (this.SPU) {
        case "Diatas Standar":
          SPUContainer = "Upper Limit";
          break;
        case "Dibawah Standar":
          SPUContainer = "Lower Limit";
          break;
        case "Sesuai Standar":
          SPUContainer = "Standard";
          break;
      }
    } else {
      SPUContainer = "All"
    }

    //Get All
    return this.listDataFlag ? this.service.getReportXls(ShiftContainer, SPUContainer, WeavingUnitContainer, DatePeriodContainer, StartDatePeriodContainer, EndDatePeriodContainer, MonthlyPeriodContainer).then(result => {
      // for (var datum of result) {
      //   if (datum.PreparationDate) {
      //     var InstallationDate = moment(datum.PreparationDate).format('DD/MM/YYYY');

      //     datum.PreparationDate = InstallationDate;
      //   }
      // }
      return {
        data: result,
        total: length
      };
    }) : {
      data: {},
      total: 0
    };
  }

  // exportToExcel() {
  //   if (this.MonthlyPeriod) {
  //     var MonthContainer = this.MonthlyPeriod;
  //     var ShiftIdContainer;
  //     if (this.Shift) {
  //       ShiftIdContainer = this.Shift.Id;
  //     } else {
  //       ShiftIdContainer = "All";
  //     }
  //     if (this.WeavingUnit.Id) {
  //       var WeavingUnitIdContainer = this.WeavingUnit.Id;
  //     }
  //     var SPUContainer;
  //     if (this.SPU) {
  //       switch (this.SPU) {
  //         case "Diatas Standar":
  //           SPUContainer = "Upper Limit";
  //           break;
  //         case "Dibawah Standar":
  //           SPUContainer = "Lower Limit";
  //           break;
  //         case "Sesuai Standar":
  //           SPUContainer = "Standard";
  //           break;
  //       }
  //     } else {
  //       SPUContainer = "All"
  //     }

  //     switch (MonthContainer) {
  //       case "Januari":
  //         MonthContainer = 1;
  //         break;
  //       case "Februari":
  //         MonthContainer = 2;
  //         break;
  //       case "Maret":
  //         MonthContainer = 3;
  //         break;
  //       case "April":
  //         MonthContainer = 4;
  //         break;
  //       case "Mei":
  //         MonthContainer = 5;
  //         break;
  //       case "Juni":
  //         MonthContainer = 6;
  //         break;
  //       case "Juli":
  //         MonthContainer = 7;
  //         break;
  //       case "Agustus":
  //         MonthContainer = 8;
  //         break;
  //       case "September":
  //         MonthContainer = 9;
  //         break;
  //       case "Oktober":
  //         MonthContainer = 10;
  //         break;
  //       case "November":
  //         MonthContainer = 11;
  //         break;
  //       case "Desember":
  //         MonthContainer = 12;
  //         break;
  //       default:
  //         MonthContainer = 0;
  //         break;
  //     }

  //     return this.listDataFlag ? this.service.getXlsByMonth(MonthContainer, WeavingUnitIdContainer, ShiftIdContainer, SPUContainer).then(result => {
  //       return {
  //         data: result,
  //         total: result.length
  //       };
  //     }) : {
  //       total: 0,
  //       data: {}
  //     };
  //   } else if (this.StartDatePeriod && this.EndDatePeriod) {
  //     var ShiftIdContainer;
  //     if (this.Shift) {
  //       ShiftIdContainer = this.Shift.Id;
  //     } else {
  //       ShiftIdContainer = "All";
  //     }
  //     if (this.WeavingUnit.Id) {
  //       var WeavingUnitIdContainer = this.WeavingUnit.Id;
  //     }
  //     var SPUContainer;
  //     if (this.SPU) {
  //       switch (this.SPU) {
  //         case "Diatas Standar":
  //           SPUContainer = "Upper Limit";
  //           break;
  //         case "Dibawah Standar":
  //           SPUContainer = "Lower Limit";
  //           break;
  //         case "Sesuai Standar":
  //           SPUContainer = "Standard";
  //           break;
  //       }
  //     } else {
  //       SPUContainer = "All"
  //     }

  //     var StartDatePeriodContainer = this.StartDatePeriod ? moment(this.StartDatePeriod).format("DD MM YYYY") : null;
  //     var EndDatePeriodContainer = this.EndDatePeriod ? moment(this.EndDatePeriod).format("DD MM YYYY") : null;


  //     return this.listDataFlag ? this.service.getXlsByDateRange(StartDatePeriodContainer, EndDatePeriodContainer, WeavingUnitIdContainer, ShiftIdContainer, SPUContainer).then(result => {
  //       return {
  //         data: result,
  //         total: result.length
  //       };
  //     }) : {
  //       total: 0,
  //       data: {}
  //     };
  //   } else if (this.DatePeriod) {
  //     var ShiftIdContainer;
  //     if (this.Shift) {
  //       ShiftIdContainer = this.Shift.Id;
  //     } else {
  //       ShiftIdContainer = "All";
  //     }
  //     if (this.WeavingUnit.Id) {
  //       var WeavingUnitIdContainer = this.WeavingUnit.Id;
  //     }
  //     var SPUContainer;
  //     if (this.SPU) {
  //       switch (this.SPU) {
  //         case "Diatas Standar":
  //           SPUContainer = "Upper Limit";
  //           break;
  //         case "Dibawah Standar":
  //           SPUContainer = "Lower Limit";
  //           break;
  //         case "Sesuai Standar":
  //           SPUContainer = "Standard";
  //           break;
  //       }
  //     } else {
  //       SPUContainer = "All"
  //     }

  //     var DatePeriodContainer = this.DatePeriod ? moment(this.DatePeriod).format("DD MM YYYY") : null;

  //     return this.listDataFlag ? this.service.getXlsByDate(DatePeriodContainer, WeavingUnitIdContainer, ShiftIdContainer, SPUContainer).then(result => {
  //       return {
  //         data: result,
  //         total: length
  //       };
  //     }) : {
  //       data: {},
  //       total: 0
  //     };
  //   }
  // }
}
