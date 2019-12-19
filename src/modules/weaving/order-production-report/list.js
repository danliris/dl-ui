import {
  inject
} from "aurelia-framework";
import {
  Service
} from "./service";
import {
  Router
} from "aurelia-router";
var moment = require("moment");
var UnitLoader = require("../../../loader/unit-loader");

@inject(Router, Service)
export class List {

  tableOptions = {
    search: false,
    showToggle: false,
    showColumns: false,
    pagination: true,
    sortable: true,
  };

  columns = [
    [{
        field: "OrderNumber",
        title: "No. SPP",
        rowspan: "2",
        valign: "top"
      },
      {
        field: "DateOrdered",
        title: "Tanggal SP",
        rowspan: "2",
        valign: "top",
        formatter: function (value, data, index) {
          return moment(value).format("DD-MM-YYYY");
        }
      },
      {
        field: "FabricConstructionDocument.ConstructionNumber",
        title: "Konstruksi",
        rowspan: "2",
        valign: "top"
      },
      {
        field: "YarnNumber",
        title: "No. Benang",
        rowspan: "2",
        valign: "top"
      },
      {
        title: "Komposisi Lusi (%)",
        colspan: "3",
        valign: "middle"
      },
      {
        title: "Komposisi Pakan (%)",
        colspan: "3",
        valign: "middle"
      },
      {
        title: "Estimasi Produksi",
        colspan: "4",
        valign: "middle"
      },
      {
        field: "EstimatedProductionDocument.WholeGrade",
        title: "Total Estimasi Produksi",
        rowspan: "2",
        valign: "top"
      },
      {
        title: "Kebutuhan Benang",
        colspan: "3",
        valign: "middle"
      }
    ],
    [{
        field: "WarpComposition.CompositionOfPoly",
        title: "Poly",
        valign: "middle"
      },
      {
        field: "WarpComposition.CompositionOfCotton",
        title: "Cotton",
        valign: "middle"
      },
      {
        field: "WarpComposition.OtherComposition",
        title: "Lainnya",
        valign: "middle"
      },
      {
        field: "WeftComposition.CompositionOfPoly",
        title: "Poly",
        valign: "middle"
      },
      {
        field: "WeftComposition.CompositionOfCotton",
        title: "Cotton",
        valign: "middle"
      },
      {
        field: "WeftComposition.OtherComposition",
        title: "Lainnya",
        valign: "middle"
      },
      {
        field: "EstimatedProductionDocument.GradeA",
        title: "Grade A",
        valign: "middle"
      },
      {
        field: "EstimatedProductionDocument.GradeB",
        title: "Grade B",
        valign: "middle"
      },
      {
        field: "EstimatedProductionDocument.GradeC",
        title: "Grade C",
        valign: "middle"
      },
      {
        field: "EstimatedProductionDocument.GradeD",
        title: "Grade D",
        valign: "middle"
      },
      {
        field: "FabricConstructionDocument.AmountOfWarp",
        title: "Lusi",
        valign: "middle"
      },
      {
        field: "FabricConstructionDocument.AmountOfWeft",
        title: "Pakan",
        valign: "middle"
      },
      {
        field: "FabricConstructionDocument.TotalYarn",
        title: "Total",
        valign: "middle"
      }
    ]
  ];

  constructor(router, service) {
    this.service = service;
    this.router = router;
    this.error = {};
  }

  listDataFlag = false;
  hasDataFlag = false;

  get units() {
    return UnitLoader;
  }

  loader = info => {
    let order = {};
    if (info.sort) order[info.sort] = info.order;

    if (this.StartDatePeriod) {
      var StartDatePeriodContainer = this.StartDatePeriod ? moment(this.StartDatePeriod).format("DD MMM YYYY HH:mm") : null;
    }
    if (this.EndDatePeriod) {
      var EndDatePeriodContainer = this.EndDatePeriod ? moment(this.EndDatePeriod).format("DD MMM YYYY HH:mm") : null;
    }

    if (this.WeavingUnit) {
      var WeavingUnitIdContainer = this.WeavingUnit.Id;
    }

    var arg = {
      weavingUnitId: WeavingUnitIdContainer,
      dateFrom: StartDatePeriodContainer,
      dateTo: EndDatePeriodContainer,

      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order
    }

    return this.listDataFlag ? this.service.getReportData(arg).then(result => {
      this.hasDataFlag = result.data.length > 0;
      return {
        data: result.data,
        total: result.data.length
      };
    }) : {
      data: {},
      total: 0
    };
  };

  exportToExcel() {
    if (this.hasDataFlag) {
      if (this.StartDatePeriod) {
        var StartDatePeriodContainer = this.StartDatePeriod ? moment(this.StartDatePeriod).format("DD MMM YYYY HH:mm") : null;
      }
      if (this.EndDatePeriod) {
        var EndDatePeriodContainer = this.EndDatePeriod ? moment(this.EndDatePeriod).format("DD MMM YYYY HH:mm") : null;
      }

      if (this.WeavingUnit) {
        var WeavingUnitContainer = this.WeavingUnit;
      }

      return this.listDataFlag ? this.service.getReportPdf(WeavingUnitContainer, StartDatePeriodContainer, EndDatePeriodContainer).then(result => {
        return {
          data: result,
          total: length
        };
      }) : {
        data: {},
        total: 0
      };
    } else {
      alert("Belum Ada Data Dari Hasil Pencarian");
    }
  }

  searchOrders() {
    if (this.WeavingUnit) {
      this.error = {};
      this.listDataFlag = true;

      this.orderProductionsTable.refresh();
    } else {
      this.error.WeavingUnit = "Unit Weaving Harus Diisi";
    }
  }

  reset() {
    this.listDataFlag = false;
    this.StartDatePeriod = undefined;
    this.EndDatePeriod = undefined;
    this.WeavingUnit = undefined;

    this.StartDatePeriod = undefined;
    this.EndDatePeriod = undefined;
    this.WeavingUnit = undefined;

    this.orderProductionsTable.refresh();
  }
}
