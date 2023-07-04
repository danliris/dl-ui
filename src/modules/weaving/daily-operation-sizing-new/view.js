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

  async activate(params) {
    var arg = {
       month: params.month,
       yearPeriode: params.yearPeriode
    };
    this.Month = params.month;
    this.Year = params.yearPeriode;
    console.log(params)
    var result= await  this.service.getFilter(arg);
    this.data = result.data;
    //console.log(this.data);
    
  }

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
