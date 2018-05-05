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
    search(){
        this.info.page = 1;
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
    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }
      reset() {
      
        this.dateFrom = "";
        this.dateTo = "";
    }

}