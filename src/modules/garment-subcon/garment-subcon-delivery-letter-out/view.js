import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class View {
  isView = true;
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
    let id = params.id;
    this.data = await this.service.read(id);
    if (this.data) {
      this.selectedDLType = this.data.DLType;
      if (this.data.IsUsed) {
        this.deleteCallback = null;
        this.editCallback = null;
      }
      this.selectedContract = {
        ContractNo: this.data.ContractNo,
        Id: this.data.SubconContractId,
      };
      this.selectedContractType = this.data.ContractType;
      this.selectedSubconCategory = this.data.SubconCategory;
      this.selectedOrderType = this.data.OrderType;

      if (this.data.SubconCategory == "SUBCON CUTTING SEWING" || this.data.SubconCategory == "SUBCON CUTTING SEWING FINISHING") {
        //Mapping data Item Acc
        // this.data.ItemsAcc = this.data.Items.filter(
        //   (x) => x.Product.Name != "FABRIC"
        // );
        // if (this.data.ItemsAcc.length > 0) {
        //   this.selectedUENAcc = {
        //     UENNo: this.data.ItemsAcc[0].UENNo,
        //   };
        // } else {
        //   this.selectedUENAcc = {
        //     UENNo: "",
        //   };
        // }

        let newItemFab = [];
        let newItemAcc = [];
        for (var item of this.data.Items) {
          for (var detail of item.Details) {
            detail.ContractQuantity = detail.Quantity;
            if (detail.Product.Name == "FABRIC") {
              var existFab = newItemFab.find((x) => x.UENNo == item.UENNo);
              if (!existFab) {
                newItemFab.push(item);
              }
            } else {
              var existAcc = newItemAcc.find((x) => x.UENNo == item.UENNo);
              if (!existAcc) {
                newItemAcc.push(item);
              }
            }
          }
        }

        this.data.Items = newItemFab;
        this.data.ItemsAcc = newItemAcc;
        // //Mapping data Item Fabric
        // this.data.Items = this.data.Items.filter(
        //   (x) => x.Product.Name == "FABRIC"
        // );
        // this.selectedUEN = {
        //   UENNo: this.data.Items[0].UENNo,
        // };
      }
    }
  }

  cancelCallback(event) {
    this.router.navigateToRoute("list");
  }

  deleteCallback(event) {
    if (confirm(`Hapus ${this.data.DLNo}?`))
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

  editCallback(event) {
    this.router.navigateToRoute("edit", { id: this.data.Id });
  }
}
