import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import { activationStrategy } from "aurelia-router";
import { Dialog } from "../../../components/dialog/dialog";
import { AlertView } from "./custom-dialog-view/alert-view";

@inject(Router, Service, Dialog)
export class View {
  hasCancel = true;
  hasEdit = false;
  hasDelete = true;
  constructor(router, service, dialog) {
    this.router = router;
    this.service = service;
    this.dialog = dialog;
  }

  async activate(params) {
    var id = params.id;
    var orderQty = 0;
    this.data = await this.service.getById(id);
    if (this.data.Items) {
      // this.data.Items.forEach(item => {
      //     item.showDetails = false;
      //     orderQty += item.OrderQuantity;
      // });
      // if (orderQty==0 && !this.data.IsInvoice){
      //     this.hasDelete=true;
      // }
      if (
        this.data.URNType == "PROSES" ||
        this.data.URNType == "TERIMA SUBCON"
      ) {
        for (var i of this.data.Items) {
          // var doItem= await this.service.getDOItemsById(i.Id);
          if (i.RemainingQuantity != i.SmallQuantity) {
            this.hasEdit = false;
            this.hasDelete = false;
            break;
          }
        }
      }
    }

    this.unit = this.data.Unit;
    this.supplier = {
      Id: this.data.Supplier.Id,
      code: this.data.Supplier.Code,
      name: this.data.Supplier.Name,
    };
    this.deliveryOrder = { Id: this.data.DOId, doNo: this.data.DONo };

    this.URNType = this.data.URNType;

    // let totalOrderQuantity = this.data.Items.reduce((acc, cur) => acc + cur.OrderQuantity, 0);
    // if (!this.data.IsCorrection || totalOrderQuantity === 0) {
    //     this.hasEdit = true;
    // }

    if (this.data.URNType == "PROSES") {
      if (this.data.DRId) {
        this.deliveryReturn = await this.service.getDRById(this.data.DRId);
        this.data.DRItems = this.data.Items;
        this.data.ReturnType = this.deliveryReturn.ReturnType;
        this.data.UnitDONo = this.deliveryReturn.UnitDONo;
        var UnitDO = await this.service.getUnitDOById(
          this.deliveryReturn.UnitDOId
        );
        var OldUnitDO = {};
        if (UnitDO.UnitDOFromId) {
          OldUnitDO = await this.service.getUnitDOById(UnitDO.UnitDOFromId);
          this.data.UnitFrom = OldUnitDO.UnitSender;
          this.data.StorageFrom = OldUnitDO.Storage;
        }
      }
      this.hasEdit = false;
    }

    // if(this.data.DONo){
    //     let CorrectionResult = await this.service.getCorrection({filter: JSON.stringify({ DONo: this.data.DONo,  CorrectionType:"Jumlah"}) });

    //     //let correction = CorrectionResult.data[0];
    //     if(CorrectionResult.data.length>0){
    //         for(let corrData of CorrectionResult.data){
    //             for(let corrItem of corrData.Items){
    //                 let dup= this.data.Items.find(a=>a.DODetailId==corrItem.DODetailId);
    //                 if(dup){
    //                     this.hasDelete = false;
    //                     break;
    //                 }
    //             }
    //         }
    //     }
    // }
  }

  cancel(event) {
    var r = confirm("Apakah anda yakin akan keluar?");
    if (r == true) {
      this.router.navigateToRoute("list");
    }
  }

  edit(event) {
    var r = confirm("Apakah anda yakin akan mengubah data ini?");
    if (r == true) {
      this.router.navigateToRoute("edit", { id: this.data._id });
    }
  }

  delete() {
    this.dialog.show(AlertView, this.data).then((response) => {
      this.data.DeletedReason = response.output.DeletedRemark;

      this.service.delete(this.data).then((result) => {
        this.cancel();
      });
    });
  }

  showDetail(item) {
    if (item.showDetails) item.showDetails = false;
    else item.showDetails = true;
  }
}
