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
     
    Types = ["","BC 262","BC 23","BC 40","BC 27"];

    search(){
        this.info.page = 1;
        this.searching();
    }

    searching() {
     
    var args = {
            page: this.info.page,
            size: this.info.size,
            type : this.type ? this.type : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.search(args)
     
            .then(result => {
               this.data=result.data;
                console.log(this.info)   
               this.info.total=result.info.total;              
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
        this.type = "";
        this.dateFrom = "";
        this.dateTo = "";
        
        this.info.page = 1;
    }

    
}