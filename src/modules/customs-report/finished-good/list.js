import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
  constructor(router, service) {
        this.service = service;
        this.router = router;
    }
    
    info = { page: 1,size:50};

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 4
        }
    };
  
    search(){
        this.error = {};

        if (!this.dateTo || this.dateTo == "Invalid Date")
            this.error.dateTo = "Tanggal Akhir harus diisi";

        if (!this.dateFrom || this.dateFrom == "Invalid Date")
            this.error.dateFrom = "Tanggal Awal harus diisi";
            
        if (Object.getOwnPropertyNames(this.error).length === 0) {
            this.flag = true;
            this.info.page = 1;
            this.info.total=0;
            this.searching();
        }
    }

    
    searching() {
        var args = {
                page: this.info.page,
                size: this.info.size,
                dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
                dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
            }
            this.service.search(args)
                .then(result => {
                   this.data=result.data;      
                   for(var item of this.data){
                       item.SaldoAwal=item.SaldoAwal.toFixed(2);
                       item.Pemasukan=item.Pemasukan.toFixed(2);
                       item.Pengeluaran=item.Pengeluaran.toFixed(2);
                       item.Penyesuaian=item.Penyesuaian.toFixed(2);
                       item.SaldoBuku=item.SaldoBuku.toFixed(2);
                       item.StockOpname=item.StockOpname.toFixed(2);
                       item.Selisih=item.Selisih.toFixed(2);
                   }
                });
                
        }
    // ExportToExcel() {
    //     var info = {
    //         section : this.section ? this.section.code.code : "",
    //         code : this.code ? this.code.code : "",
    //         buyer : this.buyer ? this.buyer.name : "",
    //         comodity : this.comodity ? this.comodity.name : "",
    //         confirmState : this.confirmState ? this.confirmState : "",
    //         bookingOrderState : this.bookingOrderState ? this.bookingOrderState : "",
    //         dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
    //         dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
    //     }
    //     this.service.generateExcel(info);
    // }

    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }
      reset() {
        this.dateFrom = "";
        this.dateTo = "";
        this.info.page = 1;
    }

    
}