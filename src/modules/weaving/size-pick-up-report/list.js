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
    pagination: false,
    sortable: false,
  }

  PeriodChanged(newValue) {
    switch (newValue) {
      case "":
        this.ShowHideByDatePeriod = false;
        this.ShowHideByDateRangePeriod = false;
        this.ShowHideMonthlyPeriod = false;
        break;
      case "Harian":
        this.ShowHideByDatePeriod = true;
        this.ShowHideByDateRangePeriod = false;
        this.ShowHideMonthlyPeriod = false;
        break;
      case "Rekap":
        this.ShowHideByDatePeriod = false;
        this.ShowHideByDateRangePeriod = true;
        this.ShowHideMonthlyPeriod = false;
        break;
      case "Bulanan":
        this.ShowHideByDatePeriod = false;
        this.ShowHideByDateRangePeriod = false;
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
    this.info = {};

    if (this.MonthlyPeriod) {
      var MonthContainer = this.MonthlyPeriod;
      var ShiftIdContainer;
      if (this.Shift) {
        ShiftIdContainer = this.Shift.Id;
      } else {
        ShiftIdContainer = "All";
      }
      var WeavingUnitIdContainer = this.WeavingUnit.Id;
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

      return this.listDataFlag ? this.service.getDataByMonth(MonthContainer, WeavingUnitIdContainer, ShiftIdContainer, SPUContainer).then(result => {
        console.log(result);
        return {
          data: result,
          total: length
        };
      }) : {
        data: {},
        total: 0
      };
    } else if (this.StartDatePeriod && this.EndDatePeriod) {
      var ShiftIdContainer;
      if (this.Shift) {
        ShiftIdContainer = this.Shift.Id;
      } else {
        ShiftIdContainer = "All";
      }
      var WeavingUnitIdContainer = this.WeavingUnit.Id;
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

      var StartDatePeriodContainer = this.StartDatePeriod ? moment(this.StartDatePeriod).format("DD MM YYYY") : null;
      var EndDatePeriodContainer = this.EndDatePeriod ? moment(this.EndDatePeriod).format("DD MMM YYYY") : null;

      return this.listDataFlag ? this.service.getDataByDateRange(StartDatePeriodContainer, EndDatePeriodContainer, WeavingUnitIdContainer, ShiftIdContainer, SPUContainer).then(result => {
        console.log(result);
        return {
          data: result,
          total: length
        };
      }) : {
        data: {},
        total: 0
      };
    } else if (this.DatePeriod) {
      var ShiftIdContainer;
      if (this.Shift) {
        ShiftIdContainer = this.Shift.Id;
      } else {
        ShiftIdContainer = "All";
      }
      var WeavingUnitIdContainer = this.WeavingUnit.Id;
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

      var DatePeriodContainer = this.DatePeriod ? moment(this.DatePeriod).format("DD MM YYYY") : null;

      return this.listDataFlag ? this.service.getDataByDate(DatePeriodContainer, WeavingUnitIdContainer, ShiftIdContainer, SPUContainer).then(result => {
        console.log(result);
        return {
          data: result,
          total: length
        };
      }) : {
        data: {},
        total: 0
      };
    } else {
      return {
        data: {},
        total: 0
      };
    }
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
    if (this.MonthlyPeriod) {
      var MonthContainer = this.MonthlyPeriod;
      var ShiftIdContainer;
      if (this.Shift) {
        ShiftIdContainer = this.Shift.Id;
      } else {
        ShiftIdContainer = "All";
      }
      var WeavingUnitIdContainer = this.WeavingUnit.Id;
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

      return this.listDataFlag ? this.service.getXlsByMonth(MonthContainer, WeavingUnitIdContainer, ShiftIdContainer, SPUContainer).then(result => {
        return {
          data: result,
          total: result.length
        };
      }) : {
        total: 0,
        data: {}
      };
    } else if (this.StartDatePeriod && this.EndDatePeriod) {
      var ShiftIdContainer;
      if (this.Shift) {
        ShiftIdContainer = this.Shift.Id;
      } else {
        ShiftIdContainer = "All";
      }
      var WeavingUnitIdContainer = this.WeavingUnit.Id;
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

      var StartDatePeriodContainer = this.StartDatePeriod ? moment(this.StartDatePeriod).format("DD MM YYYY") : null;
      var EndDatePeriodContainer = this.EndDatePeriod ? moment(this.EndDatePeriod).format("DD MM YYYY") : null;


      return this.listDataFlag ? this.service.getXlsByDateRange(StartDatePeriodContainer, EndDatePeriodContainer, WeavingUnitIdContainer, ShiftIdContainer, SPUContainer).then(result => {
        return {
          data: result,
          total: result.length
        };
      }) : {
        total: 0,
        data: {}
      };
    } else if (this.DatePeriod) {
      var ShiftIdContainer;
      if (this.Shift) {
        ShiftIdContainer = this.Shift.Id;
      } else {
        ShiftIdContainer = "All";
      }
      var WeavingUnitIdContainer = this.WeavingUnit.Id;
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

      var DatePeriodContainer = this.DatePeriod ? moment(this.DatePeriod).format("DD MM YYYY") : null;

      return this.listDataFlag ? this.service.getXlsByDate(DatePeriodContainer, WeavingUnitIdContainer, ShiftIdContainer, SPUContainer).then(result => {
        console.log(result);
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
