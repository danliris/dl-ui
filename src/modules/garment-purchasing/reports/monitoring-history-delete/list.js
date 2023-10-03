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
  tanggalAwalBUM = null;
  tanggalAkhirBUM = null;

  tanggalAwalBUK = null;
  tanggalAkhirBUK = null;


  SearchItems = ['Bon Penerimaan Unit', 'Bon Pengeluaran Unit'];

  search() {
    this.info.page = 1;
    this.info.total = 0;
    this.searching();
  }

  activate() { }

  tableData = [];

  searching() {
    var args = {
      filter: this.filter,
      dateFrom: moment(this.tanggalAwalBUM).format('YYYY-MM-DD'),
      dateTo: moment(this.tanggalAkhirBUM).format('YYYY-MM-DD'),
    };

    if (this.SearchItem === 'Bon Penerimaan Unit') {
      // Logika pencarian untuk Bon Penerimaan Unit
      args.bonType = 'Penerimaan';
      args.dateFrom= moment(this.tanggalAwalBUM).format('YYYY-MM-DD');
      args.dateTo= moment(this.tanggalAkhirBUM).format('YYYY-MM-DD');
      this.service.search(args)
        .then(result => {
          this.data = result;
        });
    } else if (this.SearchItem === 'Bon Pengeluaran Unit') {
      // Logika pencarian untuk Bon Pengeluaran Unit
      args.bonType = 'Pengeluaran';
      args.dateFrom= moment(this.tanggalAwalBUK).format('YYYY-MM-DD');
      args.dateTo= moment(this.tanggalAkhirBUK).format('YYYY-MM-DD');
      this.service.search2(args) // Ganti dengan metode yang sesuai untuk Bon Pengeluaran Unit
        .then(result => {
          this.data = result;
        });
    }
  }

  reset() {
    this.tanggalAwalBUM = null;
    this.tanggalAkhirBUM = null;
    this.tanggalAwalBUK = null;
    this.tanggalAkhirBUK = null;
    this.filter = '';
    this.data = [];
  }

  ExportToExcel() {
    let args = {
      filter: this.filter,
      dateFrom: moment(this.tanggalAwalBUM).format('YYYY-MM-DD'),
      dateTo: moment(this.tanggalAkhirBUM).format('YYYY-MM-DD'),
    };

    if (this.SearchItem === 'Bon Penerimaan Unit') {
      // Logika ekspor Excel untuk Bon Penerimaan Unit
      args.bonType = 'Penerimaan';
      this.service.generateExcel(args);
    } else if (this.SearchItem === 'Bon Pengeluaran Unit') {
      // Logika ekspor Excel untuk Bon Pengeluaran Unit
      args.bonType = 'Pengeluaran';
      this.service.generateExcel2(args); // Ganti dengan metode yang sesuai untuk Bon Pengeluaran Unit
    }
  }

  changePage(e) {
    var page = e.detail;
    this.info.page = page;
    this.searching();
  }

  // Implementasi untuk "Bon Pengeluaran Unit" dengan tambahan 2
  searching2() {
    var args = {
      filter: this.filter,
      dateFrom: moment(this.tanggalAwalBUK).format('YYYY-MM-DD'),
      dateTo: moment(this.tanggalAkhirBUK).format('YYYY-MM-DD'),
    };

    if (this.SearchItem === 'Bon Pengeluaran Unit') {
      // Logika pencarian untuk Bon Pengeluaran Unit
      args.bonType = 'Pengeluaran';
      this.service.search2(args)
        .then(result => {
          this.data = result;
        });
    }
  }

  reset2() {
    this.tanggalAwalBUK = null;
    this.tanggalAkhirBUK = null;
    this.filter = '';
    this.data = [];
  }

  ExportToExcel2() {
    let args = {
      filter: this.filter,
      dateFrom: moment(this.tanggalAwalBUK).format('YYYY-MM-DD'),
      dateTo: moment(this.tanggalAkhirBUK).format('YYYY-MM-DD'),
    };

    if (this.SearchItem === 'Bon Pengeluaran Unit') {
      // Logika ekspor Excel untuk Bon Pengeluaran Unit
      args.bonType = 'Pengeluaran';
      this.service.generateExcel2(args);
    }
  }

  changePage2(e) {
    var page = e.detail;
    this.info.page = page;
    this.searching2();
  }
}
