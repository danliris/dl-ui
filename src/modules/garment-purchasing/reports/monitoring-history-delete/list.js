import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require('moment');

@inject(Router, Service)
export class List {

  constructor(router, service) {
    this.service = service;
    this.router = router;
    this.today = new Date();
  }

  info = { page: 1, size: 50 };
  controlOptions = {
    label: {
      length: 4
    },
    control: {
      length: 4
    }
  };

  @bindable SearchItem;
  tanggalAwalBUM = null; // Tanggal Awal Delet BUM
  tanggalAwalBUK = null; // Tanggal Awal Delet BUK
  tanggalAkhirBUM = null;
  tanggalAkhirBUK = null;

  SearchItems = ['No RO', 'No BC'];
  UnitItems = ['', 'KONFEKSI 2A', 'KONFEKSI 2B', 'KONFEKSI 2C', 'KONFEKSI 1A', 'KONFEKSI 1B'];

  search() {
    this.info.page = 1;
    this.info.total = 0;
    this.searching();
  }

  activate() {}

  tableData = [];

  searching() {
    var args = {
      // ...
      dateFrom: this.SearchItem === 'Bon Penerimaan Unit BUM' ? moment(this.tanggalAwalBUM).format('YYYY-MM-DD') :
        this.SearchItem === 'Bon Penerimaan Unit BUK' ? moment(this.tanggalAwalBUK).format('YYYY-MM-DD') :
        null,
        dateFrom: this.SearchItem === 'Bon Penerimaan Unit BUM' ? moment(this.tanggalAkhirBUM).format('YYYY-MM-DD') :
        this.SearchItem === 'Bon Penerimaan Unit BUK' ? moment(this.tanggalAkhirBUK).format('YYYY-MM-DD') :
        null,
      // ...
      filter : this.filter ? this.filter : "",
            keyword : this.BCNo ? this.BCNo : this.pono ? this.pono : this.rono ? this.rono : "",
            
    };

    this.service.search(args)
      .then(result => {
        this.data = [];
        for (var _data of result) {
          this.data.push(_data);
        }
      });
  }

  reset() {
    this.tanggalAwalBUM = null;
    this.tanggalAwalBUK = null;
    this.tanggalAkhirlBUM = null;
    this.tanggalAkhirBUK = null;
    this.SearchItem = null;
    this.dateFrom = '';
    this.dateTo = '';
    this.KtgrItem = '';
    this.UnitItem = '';
  }

  SearchItemChanged(newvalue) {
    if (newvalue) {
      if (newvalue === 'No BC') {
        this.filter = 'BCNo';
        this.pono = '';
        this.rono = '';
        this.data = [];
      } else if (newvalue === 'No RO') {
        this.filter = 'RONo';
        this.BCNo = '';
        this.pono = '';
        this.data = [];
      } else {
        this.unit = '';
        this.unitname = '';
      }
    }
  }

  changePage(e) {
    var page = e.detail;
    this.info.page = page;
    this.searching();
  }
}
