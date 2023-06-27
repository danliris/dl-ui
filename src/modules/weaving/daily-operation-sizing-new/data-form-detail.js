import {
    inject,
    bindable,
    computedFrom
  } from "aurelia-framework";
  import moment from "moment";
  import {
    Service
  } from "./service"; 
  import {
    Router
  } from "aurelia-router";
  
  @inject(Service, Router)
  export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable Month;
    @bindable Year;
    @bindable Unit;
  
    yearFormat = "YYYY";
    years = [];
  
    formOptions = {
      cancelText: "Kembali",
      saveText: "Simpan"
    };
  
    //Options untuk No. Estimasi Produksi
    controlOptions = {
      label: {
        length: 3
      },
      control: {
        length: 6
      }
    };
  
      constructor(service, router) {
      this.service = service;
      this.router = router;
  
      
    }
  
    orderProductionsItems;
  
    bind(context) {
      this.context = context;
      this.data = this.context.data;
      this.error = this.context.error;
  
      // if (this.data.EstimatedNumber) {
      //   this.orderProductionsTableOptions = {};
      // }
  
     
    }
  
  }
  