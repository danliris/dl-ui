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

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  listDataFlag = false;

  months = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  columns = [
    [{
        field: "ProductionDate",
        title: "Tanggal Produksi",
        rowspan: "2",
        valign: "top",
        sortable: true,
        formatter: function (value, data, index) {
          return moment(value).format("DD MMMM YYYY");
        }
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
      field: "A",
      valign: "middle"
    }, {
      field: "B",
      valign: "middle"
    }, {
      field: "C",
      valign: "middle"
    }, {
      field: "D",
      valign: "middle"
    }, {
      field: "E",
      valign: "middle"
    }, {
      field: "F",
      valign: "middle"
    }, {
      field: "G",
      valign: "middle"
    }, {
      field: "Total",
      valign: "middle"
    }]
  ];

  controlOptions = {
    label: {
      length: 3
    },
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

  loader = (info) => {
    let order = {};
    if (info.sort) order[info.sort] = info.order;
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

  searchWarpingProductions() {
    this.listDataFlag = true;

    this.warpingProductionsTable.refresh();
  }

  reset() {
    this.listDataFlag = false;

    this.MonthContainer = null;

    this.warpingProductionsTable.refresh();
  }

  exportToExcel() {
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

    //Get All
    return this.listDataFlag ? this.service.getReportXls(MonthInNumber).then(result => {
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
