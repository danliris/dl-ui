import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import * as _ from 'underscore';

@inject(Router, Service)
export class View {
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  canEdit = true;
 
  async activate(params) {
    
    var id = params.id;

    this.datas=[];

    this.data = await this.service.getById(id);
    console.log(this.data);
   
   this.canEdit = true
  
    this.warehouse = this.data.destinationArea != 'SHIPPING' ? false : true;
    for(var _data of this.data.dyeingPrintingWarehouseOutputItems){
        _data.packagingQty = _data.packagingQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        _data.packagingLength = _data.packagingLength.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        _data.balance = _data.balance.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.datas.push(_data);
    }
   
    
  }

  list() {
    this.router.navigateToRoute("list");
  }

  // edit(data) {
  //   this.router.navigateToRoute('edit', { id: this.data.id });
  // }

  // delete() {
  //   this.service.delete(this.data)
  //     .then(result => {
  //       this.list();
  //     });
  // }
}
