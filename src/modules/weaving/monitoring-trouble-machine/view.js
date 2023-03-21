import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class View {
  showViewEdit = true;
  readOnlyViewEdit = true;
  createOnly = false;
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
   // var Id = params.Id;
   var arg = {
    month: params.month,
    yearPeriode: params.yearPeriode
 };
    var result= await  this.service.getFilter(arg);
    this.data = result.data;
    // this.data = await this.service.getById(Id);
    // const unit = await this.service.getUnitById(this.data.Unit);
    // this.data.Unit = unit.Name;

    // if(this.data.MachineNumber){
    //   this.selectedMachineDocument=this.data.MachineNumber;
    // }
    
    // if(this.data.OrderNumber){
    //   this.selectedOrderNumber=this.data.OrderNumber;
    // }

  }

  list() {
    this.router.navigateToRoute("list");
  }

  cancelCallback(event) {
    this.list();
  }

  // editCallback(event) {
  //   this.router.navigateToRoute("edit", { Id: this.data.Id });
  // }

  // deleteCallback(event) {
  //   this.service.delete(this.data).then(result => {
  //     this.cancelCallback(event);
  //   });
  // }
}
