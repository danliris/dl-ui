import { inject, bindable } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import { activationStrategy } from 'aurelia-router';
import * as _ from 'underscore';
import moment from 'moment';

@inject(Router, Service)
export class Create {

  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
    this.error = {};

    this.isShowed = true;
  }

  BonNoChanged(newValue) {
    if (newValue.id) {
      this.data.BonNo = newValue.bonNo;
      this.data.OutputInspectionMaterialId = newValue.id;
    }
  }

  determineActivationStrategy() {
      return activationStrategy.replace; //replace the viewmodel with a new instance
      // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
      // or activationStrategy.noChange to explicitly use the default behavior
  }

  back() {
    this.router.navigateToRoute("list");
  }

  save() {
    let CreateData = {};
    CreateData.Area = "GUDANG AVAL";
    CreateData.Shift = this.data.shift;
    CreateData.Group = this.data.group;
    // CreateData.Date = moment(this.data.date,"YYYY-MM-DD",true);
    // CreateData.Date = this.data.date;

    if (this.data.date === undefined || this.data.date === null || this.data.date === "") {
      CreateData.Date = "";
    } else {
      CreateData.Date = moment(this.data.date).format("YYYY-MM-DD");      
    }
    CreateData.DyeingPrintingMovementIds = [];
    CreateData.AvalItems =[];

    var listBonId = _.groupBy(this.data.avalProductionOrders.filter(element => element.IsSave),'bonId');
    var mappedListBonId = _.map(listBonId);
    
    mappedListBonId.forEach(element => {
      var firstId = element[0];
      var listspp = [];
      var movement ={};
      movement.DyeingPrintingAreaMovementId = firstId.bonId;
      element.forEach((item)=>{
        listspp.push(item.id);
          item.AvalType = item.grade;
          item.AvalCartNo = item.cartNo;
          item.AvalUomUnit = item.uomUnit;

          item.AvalQuantity = 0;
          item.AvalQuantityKg = 0;
          item.productionOrderId= item.productionOrder.id;
          item.productionOrderNo = item.productionOrder.no;
          item.dyeingPrintingAreaOutputProductionOrderId = item.id;
          item.productionOrderOrderQuantity = item.qtyOrder;
          CreateData.AvalItems.push(item);
      });
      movement.ProductionOrderIds=listspp;
      CreateData.DyeingPrintingMovementIds.push(movement);
    });

    // this.data.DyeingPrintingItems.forEach(element => {
    //   var DyeingPrintingMovementId = {};
    // });
    
    // if(this.data.DyeingPrintingMovementIds.length > 0){
    //   CreateData.DyeingPrintingMovementIds = this.data.DyeingPrintingMovementIds;
    // }else{
    //   CreateData.DyeingPrintingMovementIds = [{}];
    // }
    
    // if (this.data.DyeingPrintingItems.length > 0) {
    //   CreateData.AvalItems = this.data.DyeingPrintingItems.map(
    //     (item) => {
    //       var remappedItems = {};
    //       remappedItems.AvalType = item.AvalType;
    //       remappedItems.AvalCartNo = item.AvalCartNo;
    //       remappedItems.AvalUomUnit = item.AvalUomUnit.Unit;
    //       remappedItems.AvalQuantity = item.AvalQuantity;
    //       remappedItems.AvalQuantityKg = item.AvalQuantityKg;

    //       return remappedItems;
    //     }
    //   );
    // } else {
    //   CreateData.AvalItems = [{}];
    // }
    // console.log(CreateData);
    // console.log(this.data);
    this.service
      .create(CreateData)
      .then((result) => {
        alert("Data berhasil dibuat");
        this.router.navigateToRoute(
          "create",
          {},
          {
            replace: true,
            trigger: true,
          }
        );
      })
      .catch((e) => {
        if (e.statusCode == 500) {
          alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
        } else {
          this.error = e;
        }
      });
  }

  reject() {
    let CreateData = {};
    CreateData.Area = "GUDANG AVAL";
    CreateData.Shift = this.data.shift;
    CreateData.Group = this.data.group;
    // CreateData.Date = moment(this.data.date,"YYYY-MM-DD",true);
    // CreateData.Date = this.data.date;

    if (this.data.date === undefined || this.data.date === null || this.data.date === "") {
      CreateData.Date = "";
    } else {
      CreateData.Date = moment(this.data.date).format("YYYY-MM-DD");      
    }
    CreateData.DyeingPrintingMovementIds = [];
    CreateData.AvalItems =[];

    var listBonId = _.groupBy(this.data.avalProductionOrders.filter(element => element.IsSave),'bonId');
    var mappedListBonId = _.map(listBonId);
    
    mappedListBonId.forEach(element => {
      var firstId = element[0];
      var listspp = [];
      var movement ={};
      movement.DyeingPrintingAreaMovementId = firstId.bonId;
      element.forEach((item)=>{
        listspp.push(item.id);
          item.AvalType = item.grade;
          item.AvalCartNo = item.cartNo;
          item.AvalUomUnit = item.uomUnit;

          item.AvalQuantity = 0;
          item.AvalQuantityKg = 0;
          item.productionOrderId= item.productionOrder.id;
          item.productionOrderNo = item.productionOrder.no;
          item.dyeingPrintingAreaOutputProductionOrderId = item.id;
          item.productionOrderOrderQuantity = item.qtyOrder;
          CreateData.AvalItems.push(item);
      });
      movement.ProductionOrderIds=listspp;
      CreateData.DyeingPrintingMovementIds.push(movement);
    });
    console.log(CreateData);
    this.service
      .reject(CreateData)
      .then((result) => {
        alert("Data berhasil dibuat");
        this.router.navigateToRoute(
          "create",
          {},
          {
            replace: true,
            trigger: true,
          }
        );
      })
      .catch((e) => {
        if (e.statusCode == 500) {
          alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
        } else {
          this.error = e;
        }
      });
  }
}
