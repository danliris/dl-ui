import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class View {
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
    var arg = {
      unitId: params.id,
      periode: params.date,
  };
  var MR=await this.service.searchDetail(arg);
    this.data = MR.data;
    this.unit=MR.data[0].unit;
    this.total=this.data.reduce((sum,obj)=>{return sum + obj.spbLength},0 );
  }

  
  list() {
    this.router.navigateToRoute("list");
  }

  cancelCallback(event) {
    this.list();
  }
}
