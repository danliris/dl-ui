import {
  inject
} from 'aurelia-framework';
import {
  Service
} from "./service";
import {
  Router
} from 'aurelia-router';

var moment = require('moment');
// var MachineLoader = require("../../../loader/machines-loader");
// var KanbanLoader = require("../../../loader/kanban-loader");

@inject(Router, Service)
export class List {

  constructor(router, service) {

    this.service = service;
    this.router = router;

  }

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };

  tableOptions = {
    search: false,
    showToggle: false,
    showColumns: false,
    pagination: false
  }

  listDataFlag = false;
  zone = null;
  date = null;
  mutation = null;

  mutations = ["", "AWAL", "MASUK", "KELUAR", "ADJ MASUK", "ADJ KELUAR"];
  zones = ["", "IM", "PROD", "TRANSIT", "PACK", "GUDANG JADI", "SHIP", "AWAL", "LAB"]

  columns = [{
      field: "date",
      title: "Tanggal",
      formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY");
      }
    },
    {
      field: "deliveryOrderSalesNo ",
      title: "No. DO"
    },
    {
      field: "bonNo",
      title: "No. Bon"
    },
    {
      field: "productionOrderNo",
      title: "No. SPP"
    },
    {
      field: "construction",
      title: "Konstruksi"
    },
    {
      field: "motif",
      title: "Motif"
    },
    {
      field: "color",
      title: "Warna"
    },
    {
      field: "grade",
      title: "Grade"
    },
    {
      field: "packagingQty",
      title: "Qty Packing"
    },
    {
      field: "packagingUnit",
      title: "Packing"
    },
    {
      field: "mtrLength",
      title: "MTR"
    },
    {
      field: "ydsLength",
      title: "YDS"
    }
  ];

  // activate() {
  // }

  bind(context) {
    this.context = context;
    this.data = context.data;
  }

  // searching() {
  //     this.service.getReport(this.dateFrom, this.dateTo, this.machine, this.kanban)
  //         .then(result => {
  //             this.data = result;
  //             for (var daily of this.data) {
  //                 daily.timeInput = daily.dateInput ? moment(daily.timeInput).format('HH:mm') : '-';
  //                 daily.timeOutput = daily.timeOutput ? moment(daily.timeOutput).format('HH:mm') : '-';
  //             }
  //         })
  // }

  rowFormatter(data, index) {
    // if (index === 12) {
    //     return { classes: "weight" }
    // } else {
    //     return {};
    // }
    return {};
  }

  loader = (info) => {

    this.info = {};
    var searchDate = this.date ? moment(this.date).format("DD MMM YYYY HH:mm") : null;
    return this.listDataFlag ?
      // this.service.getReport(this.dateFrom, this.dateTo, this.Machine, this.Kanban)
      this.service.getReport(searchDate, this.mutation, this.zone)
      .then((result) => {
        return {
          data: result
        };
      }) : {
        data: {},
        total: 0
      };
  }

  searching() {
    this.listDataFlag = true;

    this.table.refresh();
  }


  reset() {
    this.listDataFlag = false;
    this.date = null;
    this.mutation = null;
    this.zone = null;
    this.error = '';
    
    this.table.refresh();
  }

  ExportToExcel() {
    //    var htmltable= document.getElementById('myTable');
    //    var html = htmltable.outerHTML;
    //    window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));
    // var searchDate = this.searchDate ? moment(this.searchDate).format("DD MMM YYYY HH:mm") : null;
    var searchDate = this.date ? moment(this.date).format("DD MMM YYYY HH:mm") : null;
    this.service.generateExcel(searchDate, this.group, this.mutation, this.zone);
  }

  // get machineLoader() {
  //     return MachineLoader;
  // }

  // get kanbanLoader() {
  //     return KanbanLoader;
  // }
}
