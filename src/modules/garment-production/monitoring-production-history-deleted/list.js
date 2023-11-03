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
 
  // ini untuk melihat awal pertama search
  SearchItems = ['Monitoring Preparing', 'Monitoring Loading', 'Monitoring Cutting In','Monitoring Cutting Out'];

  search() {
    this.info.page = 1;
    this.info.total = 0;
    this.searching();
  }
  search2() {
    this.info.page = 1;
    this.info.total = 0;
    this.searching2();
  }

  activate() { }

  tableData = [];
 
  searching() {
    let dateNow = moment();
    var args = {
      filter: this.filter,
      dateFrom: this.tglAwal ? moment(this.tglAwal).format("YYYY-MM-DD") : "",
      dateTo: this.tglAkhir ? moment(this.tglAkhir).format('YYYY-MM-DD') : "",
    };
    
     
    // console.log("tanggal 1", this.tglAwalPreparing);
    if (this.SearchItem === 'Monitoring Preparing') {
      // Logika pencarian untuk Monitoring Preparing
       this.service.search(args) // Ganti dengan metode yang sesuai untuk Monitoring Preparing
        .then(result => {
          this.data = result;
        });
    } else if (this.SearchItem === 'Monitoring Loading') {
         this.service.search2(args) // Ganti dengan metode yang sesuai untuk Monitoring Loading
        .then(result => {
          this.data = result;
        });
    } else if (this.SearchItem === 'Monitoring Cutting In') {
      // Logika pencarian untuk Monitoring Loading
        this.service.searchCutting(args) // Ganti dengan metode yang sesuai untuk Monitoring Loading
        .then(result => {
          this.data = result;
        });
      }  else if (this.SearchItem === 'Monitoring Cutting Out') {
        // Logika pencarian untuk Monitoring Loading
          this.service.searchCuttingOut(args) // Ganti dengan metode yang sesuai untuk Monitoring Loading
          .then(result => {
            this.data = result;
          });
        }
      
  }


  reset() {
    this.tglAwal = "";
    this.tglAkhir= "";
    this.filter = '';
    this.data = [];
  }

  ExportToExcel() {
    let args = {
      filter: this.filter,
      dateFrom: this.tglAwal ? moment(this.tglAwal).format("YYYY-MM-DD") : "",
      dateTo: this.tglAkhir ? moment(this.tglAkhir).format("YYYY-MM-DD") : ""
      };

    if (this.SearchItem === 'Monitoring Preparing') {
      // Logika ekspor Excel untuk Monitoring Preparing
       
      this.service.generateExcel(args);
    } else if (this.SearchItem === 'Monitoring Loading') {
      // Logika ekspor Excel untuk Monitoring Loading
       
      this.service.generateExcel2(args); // Ganti dengan metode yang sesuai untuk Monitoring Loading
    } else if (this.SearchItem === 'Monitoring Cutting In') {
      // Logika ekspor Excel untuk Monitoring Loading
      
      this.service.generateExcelCutting(args); // Ganti dengan metode yang sesuai untuk Monitoring Loading
    } else if (this.SearchItem === 'Monitoring Cutting Out') {
    // Logika ekspor Excel untuk Monitoring Loading
    
    this.service.generateExcelCuttingOut(args); // Ganti dengan metode yang sesuai untuk Monitoring Loading
  }
}

  changePage(e) {
    var page = e.detail;
    this.info.page = page;
    this.searching();
  }
 
}
