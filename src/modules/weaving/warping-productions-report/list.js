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

@inject(Router, Service)
export class List {
  listDataFlag = false;

  months = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  years = [];

  columns = [
    [{
        field: "ProductionDate",
        title: "Tanggal Produksi",
        rowspan: "2",
        valign: "top"
      },
      {
        title: "A",
        valign: "top"
      },
      {
        title: "B",
        valign: "top"
      },
      {
        title: "C",
        valign: "top"
      },
      {
        title: "D",
        valign: "top"
      },
      {
        title: "E",
        valign: "top"
      },
      {
        title: "F",
        valign: "top"
      },
      {
        title: "G",
        valign: "top"
      },
      {
        title: "Total"
      }
    ],
    [{
      field: "AGroupTotal",
      valign: "middle"
    }, {
      field: "BGroupTotal",
      valign: "middle"
    }, {
      field: "CGroupTotal",
      valign: "middle"
    }, {
      field: "DGroupTotal",
      valign: "middle"
    }, {
      field: "EGroupTotal",
      valign: "middle"
    }, {
      field: "FGroupTotal",
      valign: "middle"
    }, {
      field: "GGroupTotal",
      valign: "middle"
    }, {
      field: "TotalAll",
      valign: "middle"
    }]
  ];

  constructor(router, service) {
    this.service = service;
    this.router = router;

    this.currentYearItem = parseInt(moment().format('YYYY'));
    this.minYearItem = this.currentYearItem - 5;
    this.maxYearItem = this.currentYearItem + 5;

    for (var i = parseInt(this.minYearItem); i <= parseInt(this.maxYearItem); i++) {
      this.years.push(i.toString());
    }
  }

  bind() {
    this.reset();
  }

  controlOptions = {
    label: {
      length: 3
    },
    control: {
      length: 6
    }
  }

  searchWarpingProductions() {
    if (false) {
      alert("");
    } else {
      if (this.Year) {
        var YearContainer = this.Year;
      }
      if (this.Month) {
        var MonthContainer = this.Month;
      }

      var MonthInNumber = 0;

      switch (MonthContainer) {
        case "Januari":
          MonthInNumber = 1;
          break;
        case "Februari":
          MonthInNumber = 2;
          break;
        case "Maret":
          MonthInNumber = 3;
          break;
        case "April":
          MonthInNumber = 4;
          break;
        case "Mei":
          MonthInNumber = 5;
          break;
        case "Juni":
          MonthInNumber = 6;
          break;
        case "Juli":
          MonthInNumber = 7;
          break;
        case "Agustus":
          MonthInNumber = 8;
          break;
        case "September":
          MonthInNumber = 9;
          break;
        case "Oktober":
          MonthInNumber = 10;
          break;
        case "November":
          MonthInNumber = 11;
          break;
        case "Desember":
          MonthInNumber = 12;
          break;
        default:
          MonthInNumber = 0;
          break;
      }

      var arg = {
        month: MonthInNumber,
        year: YearContainer
      };
      this.service.getReportData(arg).then(result => {
        this.data = result.data;
      });
    }
  }

  reset() {
    this.listDataFlag = false;

    this.MonthContainer = null;

    // this.warpingProductionsTable.refresh();
  }

  exportToExcel() {
    if (this.Year) {
      var YearContainer = this.Year;
    }
    if (this.Month) {
      var MonthContainer = this.Month;
    }

    var MonthInNumber = 0;

    switch (MonthContainer) {
      case "Januari":
        MonthInNumber = 1;
        break;
      case "Februari":
        MonthInNumber = 2;
        break;
      case "Maret":
        MonthInNumber = 3;
        break;
      case "April":
        MonthInNumber = 4;
        break;
      case "Mei":
        MonthInNumber = 5;
        break;
      case "Juni":
        MonthInNumber = 6;
        break;
      case "Juli":
        MonthInNumber = 7;
        break;
      case "Agustus":
        MonthInNumber = 8;
        break;
      case "September":
        MonthInNumber = 9;
        break;
      case "Oktober":
        MonthInNumber = 10;
        break;
      case "November":
        MonthInNumber = 11;
        break;
      case "Desember":
        MonthInNumber = 12;
        break;
      default:
        MonthInNumber = 0;
        break;
    }
    
    this.service.getReportPdf(MonthInNumber, YearContainer);
  }
}
