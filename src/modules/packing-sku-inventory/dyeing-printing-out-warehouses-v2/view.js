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

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);
    if (this.data.bon && this.data.type == "OUT") {
      this.data.warehousesProductionOrders = await this.service.getProductionOrderOutput(this.data.bon.id);
    }
    // if (this.data.type == "OUT") {
    //   this.data.warehousesProductionOrders = this.data.warehousesProductionOrders.filter(s => s.hasNextAreaDocument === false);
    // }

    // var groupObj = _.groupBy(this.data.warehousesProductionOrders, 'productionOrderNo');
    // // console.log(groupObj);
    // var mappedGroup = _.map(groupObj);
    // // console.log(mappedGroup);

    // var warehouseProductionOrdersGroup = [];
    // mappedGroup.forEach((element, index) => {
    //   var headData = {};
    //   element.forEach((x, i) => {
    //     // console.log(x);
    //     x.productionOrderId = x.productionOrder.id;
    //     x.productionOrderNo = x.productionOrder.no;
    //     x.productionOrderOrderQuantity = x.productionOrder.orderQuantity;
    //     x.productionOrderType = x.productionOrder.type;
    //     if (i == 0) {
    //       // console.log(x);
    //       headData = x;
    //       headData.productionOrderItems = [];
    //       // console.log(headData);
    //     }
    //     // console.log(x.PackagingList);
    //     if (headData.productionOrderItems != undefined) {
    //       headData.productionOrderItems.push(x);
    //     }
    //   });
    //   // var headData = element[0]
    //   // console.log(headData);
    //   // console.log(element);
    //   // console.log(headData);
    //   //     headData.PackagingList = element;
    //   warehouseProductionOrdersGroup.push(headData);
    // });
    // // console.log(packagingProductionOrdersGroup);
    // this.data.warehousesProductionOrders = warehouseProductionOrdersGroup;

    //this.spp = await this.service.getSPPbySC(this.data.salesContractNo);
    this.canEdit = true;
    // console.log(this.data);
  }

  list() {
    this.router.navigateToRoute("list");
  }

  edit(data) {
    this.router.navigateToRoute('edit', { id: this.data.id });
  }

  delete() {
    this.service.delete(this.data)
      .then(result => {
        this.list();
      });
  }
}
