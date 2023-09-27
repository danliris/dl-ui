import { inject, bindable } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class View {
  
  searchButton = false;
  dataExist = true;
  editable = true;
  @bindable Month;
  @bindable Year;

  constructor(router, service) {
    console.log("masuk view.js");
    this.router = router;
    this.service = service;
    this.data = {};
  }

  //tmbh ini utk paging
  info={size:100, page:1}
  //---------
  async activate(params) {
    console.log(params);
    var info = {
       month: params.month,
       yearPeriode: params.yearPeriode,
       //tmbh ini utk paging
       page : this.info.page,
       size : this.info.size
       //-------------
    };
    this.Month = params.month;
    this.Year = params.yearPeriode;
    //tmbh ini utk paging
    //this.page = params.page;
    //this.size = params.size;
    //-------
    //console.log(params)
    var result= await  this.service.getFilter(info);
    this.data = result.data;

    //tmbh ini utk paging
    this.info.total=result.info.total;
//------------
    //console.log(this.data);
    
  }


//tmbh ini utk paging
changePage(e) {
  var page = e.detail;
  //console.log(e);
  this.info.page = page;
  this.info.month= this.Month;
  //console.log(e);
  //console.log(this.Month);
  this.info.yearPeriode= this.Year;
  this.activate(this.info);
  
}
//------------

  //Dipanggil ketika tombol "Kembali" ditekan
  list() {
    this.router.navigateToRoute("list");
  }

  //Tombol "Kembali", panggil list()
  cancelCallback(event) {
    this.list();
  }

  
  
  exportToExcel() {
    
    return this.service.getReportXls(this.Month, this.Year).then(result => {
    
      return {
        data: result,
        total: length
      };
    })  
  }
}
