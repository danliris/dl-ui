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

      //let dataToEdit = this.context.data;

      //this.data.efficiency=this.data.efficiency.
//console.log(this.data);

      //for (var res of dataToEdit) {
//console.log("masuk for");
//dataToEdit[0].date = 11 * 100;
   //   }

    //  this.data = dataToEdit;

      // console.log("ee");
      // //console.log(this.data.date);
      //  for (var res of data.date) {
      //    var kali = 99;
      //    kali = kali * res.date;
      //    this.data.date = kali;
      //  }
    //   for(var efficiencyfinal of this.data.efficiency){
    //     var scefficiencyfinal= sc.efficiency.find(a=>a.id==item.localSalesContractItemId);
    //     if(scefficiencyfinal){
    //         item.remQty=scItem.remainingQuantity+item.quantity;
    //     }
    // }

   // for (var item of this.data.efficiency) {
     // item.efficiency = this.data.efficiency * 100;
   // }

//    if (this.data.[].items && this.data.id) {
//     for (var item of this.data.items) {
//         item.BuyerCodeFilter = this.data.buyerAgent.code;
//         item.SectionFilter = this.data.section.code;
//     }
// }

      this.error = this.context.error;
      
  
      
  
     
    }
  
  }
  