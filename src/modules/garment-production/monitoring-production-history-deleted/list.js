import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
const UnitLoader = require('../../../loader/garment-units-loader');

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
  tglAwalPreparing =null;
  tglAkhirPreparing =null;
  tglAwalLoading =null;
  tglAkhirLoading = null;

  // ini untuk melihat awal pertama search
  SearchItems = [ 'Monitoring Preparing','Monitoring Loading'];

  search() {
    this.info.page = 1;
    this.info.total = 0;
    this.searching();
  }

  activate() { }

  tableData = [];

  searching() {
    let dateNow = moment();
    var args = {
      filter: this.filter,
      dateFrom: this.tglAwalPreparing ? moment(this.tglAwalPreparing).format("YYYY-MM-DD") : null,
      dateTo: this.tglAkhirPreparing ? moment(this.tglAkhirPreparing).format('YYYY-MM-DD') : null,
    };
    console.log("tanggal 1", this.tglAwalPreparing);
    if (this.SearchItem === 'Monitoring Preparing') {
      // Logika pencarian untuk Monitoring Preparing
      args.monType = 'Preparing';
      
      args.dateFrom = this.tglAwalPreparing ? moment(this.tglAwalPreparing).format("YYYY-MM-DD") : '1970-01-01',
      args.dateTo = this.tglAkhirPreparing ? moment(this.tglAkhirPreparing).format('YYYY-MM-DD') : dateNow.format('YYYY-MM-DD'), // Anda mungkin ingin mengganti ini sesuai kebutuhan
      console.log("arg", args);
      this.service.search(args) // Ganti dengan metode yang sesuai untuk Monitoring Preparing
        .then(result => {
          this.data = result;
        });
    } else if (this.SearchItem === 'Monitoring Loading') {
      // Logika pencarian untuk Monitoring Loading
      args.monType = 'Loading';
      args.dateFrom= moment(this.tglAwalLoading).format('YYYY-MM-DD');
      args.dateTo= moment(this.tglAkhirLoading).format('YYYY-MM-DD');
      this.service.search2(args) // Ganti dengan metode yang sesuai untuk Monitoring Loading
        .then(result => {
          this.data = result;
        });
    }
  }

  reset() {
    this.tglAwalPreparing = null;
    this.tglAkhirPreparing = null;
    this.tglAwalLoading = null;
    this.tglAkhirLoading = null;
    this.filter = '';
    this.data = [];
  }

  ExportToExcel() {
    let args = {
      filter: this.filter,
      dateFrom: this.tglAwalPreparing ? moment(this.tglAwalPreparing).format("YYYY-MM-DD") : "",
      dateTo:  this.tglAkhirPreparing ? moment(this.tglAkhirPreparing).format("YYYY-MM-DD") : ""
      // dateFrom: moment(this.tglAwalPreparing).format('YYYY-MM-DD'),
      // dateTo: moment(this.tglAkhirPreparing).format('YYYY-MM-DD'),
      // dateFrom: this.tglAwalPreparing ? moment(this.tglAwalPreparing).format("YYYY-MM-DD") : '1970-01-01' ,
      // dateTo:  this.tglAkhirPreparing ? moment(this.tglAkhirPreparing): moment(new Date()).format("YYYY-MM-DD") ,
      // this.date ? moment(this.date).format("YYYY-MM-DD") :  moment(new Date()).format("YYYY-MM-DD") ,
    };

    if (this.SearchItem === 'Monitoring Preparing') {
      // Logika ekspor Excel untuk Monitoring Preparing
      args.monType = 'Preparing';
      this.service.generateExcel(args);
    } else if (this.SearchItem === 'Monitoring Loading') {
      // Logika ekspor Excel untuk Monitoring Loading
      args.monType = 'Loading';
      this.service.generateExcel2(args); // Ganti dengan metode yang sesuai untuk Monitoring Loading
    }
  }

  changePage(e) {
    var page = e.detail;
    this.info.page = page;
    this.searching();
  }

  // Implementasi untuk "Monitoring Loading" dengan tambahan 2
  searching2() {
    var args = {
      filter: this.filter,
      dateFrom: moment(this.tglAwalLoading).format('YYYY-MM-DD'),
      dateTo: moment(this.tglAkhirLoading).format('YYYY-MM-DD'),
    };

    if (this.SearchItem === 'Monitoring Loading') {
      // Logika pencarian untuk Bon Pengeluaran Unit
      args.monType = 'Loading';
      this.service.search2(args)
        .then(result => {
          this.data = result;
        });
    }
  }

  reset2() {
    this.tglAwalPreparing = null;
    this.tglAkhirPreparing = null;
    this.tglAwalLoading = null;
    this.tglAkhirLoading = null;
    this.filter = '';
    this.data = [];
  }

  ExportToExcel2() {
    let args = {
      filter: this.filter,
      dateFrom: moment(this.tglAwalLoading).format('YYYY-MM-DD'),
      dateTo: moment(this.tglAkhirLoading).format('YYYY-MM-DD'),
    };

    if (this.SearchItem === 'Monitoring Loading') {
      // Logika ekspor Excel untuk Monitoring Loading
      args.monType = 'Loading';
      this.service.generateExcel2(args);
    }
  }

  changePage2(e) {
    var page = e.detail;
    this.info.page = page;
    this.searching2();
  }
}
