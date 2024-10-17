import {
  inject,bindable
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

  @bindable TipeItem;
  @bindable TransactionType;

  search() {
    this.searching();
  }
  controlOptions = {
    label: {
      length: 4
    },
    control: {
      length: 4
    }
  };

  

  TipeItems = ['Aval TC Kecil', 'Sampah Sapuan']
  TransactionTipeItems = ['PEMASUKAN', 'PENGELUARAN']

  TipeItemChanged(newvalue) {
    if (newvalue) {
      if (newvalue === "Aval TC Kecil") {
        this.tipe = "AVAL TC KECIL";
      } else if (newvalue === "Sampah Sapuan") {
        this.tipe = "SAMPAH SAPUAN";
      }
    }
  }

  TransactionTypeChanged(newvalue) { 
    if (newvalue) {
      this.transactionType = newvalue;
      this.data = [];

}
  }

  searching() {

    this.error = {};

    if (!this.dateTo || this.dateTo == "Invalid Date")
      this.error.dateTo = "Tanggal Akhir harus diisi";

    if (!this.dateFrom || this.dateFrom == "Invalid Date")
      this.error.dateFrom = "Tanggal Awal harus diisi";


    if (Object.getOwnPropertyNames(this.error).length === 0) {
      var args = {
        dateFrom: this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
        dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
        type: this.tipe ? this.tipe : "",
        transactionType: this.transactionType ? this.transactionType : "",

      }

      this.service.search(args)

        .then(result => {
          var index = 1;
          var rowDoc = []
          if (this.transactionType == "PEMASUKAN") {
            for (var _data of result.data) {
              var scsource = _data.ReceiptSource.toString();
              var uom = _data.Uom.toString();

              if (!rowDoc[scsource]) {
                rowDoc[scsource] = 1
              } else {
                rowDoc[scsource]++
              }
              if (!rowDoc[uom]) {
                rowDoc[uom] = 1
              } else {
                rowDoc[uom]++
              }
            }
            for (var b of result.data) {
              let scrapSourceName = result.data.find(o => o.ReceiptSource == b.ReceiptSource);
              if (scrapSourceName) {
                scrapSourceName.scspan = rowDoc[b.ReceiptSource.toString()]
              }
              let uomm = result.data.find(o => o.Uom == b.Uom);
              if (uomm) {
                uomm.uomspan = rowDoc[b.Uom.toString()]
              }
            }
          } else {
            for (var _data of result.data) {
              var uom = _data.Uom.toString();

              // if(!rowDoc[scsource]){
              //     rowDoc[scsource] = 1
              // }else{
              //     rowDoc[scsource]++
              // }
              if (!rowDoc[uom]) {
                rowDoc[uom] = 1
              } else {
                rowDoc[uom]++
              }
            }
            for (var b of result.data) {
               
              let uomm = result.data.find(o => o.Uom == b.Uom);
              if (uomm) {
                uomm.uomspan = rowDoc[b.Uom.toString()]
              }
            }

          }

          this.data = result.data;

        });
    }

  }
  changePage(e) {
    var page = e.detail;
    this.info.page = page;
    this.searching();
  }
  reset() {

    this.dateFrom = "";
    this.dateTo = "";
  }

  get sumQty()
  {
      var sum=0;
      if(this.data)
      {
          for(var item of this.data)
          {
              sum += item.Quantity;
          }
      }
     
      return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
  }

  ExportToExcel() {
    this.error = {};

    if (!this.dateTo || this.dateTo == "Invalid Date")
      this.error.dateTo = "Tanggal Akhir harus diisi";

    if (!this.dateFrom || this.dateFrom == "Invalid Date")
      this.error.dateFrom = "Tanggal Awal harus diisi";


    if (Object.getOwnPropertyNames(this.error).length === 0) {
      var info = {
        dateFrom: this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
        dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
        type: this.tipe ? this.tipe : "",
        transactionType: this.transactionType ? this.transactionType : "",
      }
      this.service.generateExcel(info);
    }
  }
}
