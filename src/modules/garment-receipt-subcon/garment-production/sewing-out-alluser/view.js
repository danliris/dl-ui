import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class View {
  isView = true;
  editCallback = null;
  deleteCallback = null;
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
    let id = params.id;
    this.data = await this.service.read(id);
    this.selectedRO = {
      RONo: this.data.RONo,
    };
    this.selectedUnitTo = this.data.UnitTo;
    this.selectedUnit = this.data.Unit;
    this.data.ProductOwnerView =
      this.data.ProductOwner.Code + " - " + this.data.ProductOwner.Name;
    for (var a of this.data.Items) {
      if (a.RemainingQuantity != a.Quantity) {
        // this.deleteCallback = null;
        // this.editCallback = null;
        break;
      }
    }
    // if(this.data.SewingTo=="SEWING"){
    //     this.editCallback=null;
    //     var filter = {};
    //     filter[`GarmentSewingInItem.Any(SewingOutItemId.ToString()=="${this.data.Items[0].Id.toString()}")`] = true;
    //     var sewIn= await this.service.searchSewingIn({ filter: JSON.stringify(filter),size:1});

    //     if(sewIn.data.length>0){
    //         if(sewIn.data[0].TotalRemainingQuantity!=sewIn.data[0].TotalQuantity){
    //             this.deleteCallback = null;
    //         }
    //     }
    // }
    // if(this.data.SewingTo=="FINISHING"){
    //     this.editCallback=null;
    //     var filter = {};
    //     filter[`Items.Any(SewingOutItemId.ToString()=="${this.data.Items[0].Id.toString()}")`] = true;
    //     var finIn= await this.service.searchFinishingIn({ filter: JSON.stringify(filter),size:1});

    //     if(finIn.data.length>0){
    //         if(finIn.data[0].TotalFinishingInQuantity!=finIn.data[0].TotalRemainingQuantity){
    //             this.deleteCallback = null;
    //         }
    //     }
    // }
  }

  cancelCallback(event) {
    this.router.navigateToRoute("list");
  }

  editCallback(event) {
    this.router.navigateToRoute("edit", { id: this.data.Id });
  }

  deleteCallback(event) {
    if (confirm(`Hapus ${this.data.SewingOutNo}?`))
      this.service
        .delete(this.data)
        .then((result) => {
          this.cancelCallback();
        })
        .catch((e) => {
          this.error = e;
          if (typeof this.error == "string") {
            alert(this.error);
          } else {
            alert("Missing Some Data");
          }
        });
  }
}
