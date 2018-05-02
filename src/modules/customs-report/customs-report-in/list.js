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
               this.rowCount=[];
               var rowDoc=[];
               this.info.total=result.info.total;    
               var index=0;    
               for(var a of result.data){
                   var bc=a.BCType.toString();
                   var doc=a.BCNo;
                   if(!this.rowCount[bc]){
                       this.rowCount[bc]=1;
                       
                   }
                   else{
                       a.BCType="";
                       this.rowCount[bc]++;
                   }

                   if(!rowDoc[doc]){
                       index++;
                       a.count=index;
                       rowDoc[doc]=1;
                   }
                   else{
                       a.BCNo="";
                       rowDoc[doc]++;
                   }
               }
               for(var b of result.data){
                   if(b.BCType!=""){
                       b.rowspan=this.rowCount[b.BCType];
                   }
                   if(b.BCNo!=""){
                       b.docSpan=rowDoc[b.BCNo];
                   }
               }
               this.data=result.data;    
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