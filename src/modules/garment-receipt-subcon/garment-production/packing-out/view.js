import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class View {
  editCallback = null;
  isView = true;
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
    this.selectedUnit = this.data.Unit;
    this.data.ProductOwnerView =
      this.data.ProductOwner.Code + " - " + this.data.ProductOwner.Name;

    // var items = [];
    // for (var item of this.data.Items) {
    //   if (items.length == 0) {
    //     items.push(item);
    //   } else {
    //     let duplicate = items.find(
    //       (a) =>
    //         a.Size.Id == item.Size.Id &&
    //         a.Uom.Id == item.Uom.Id &&
    //         a.Description == item.Description
    //     );

    //     if (duplicate) {
    //       var idx = items.indexOf(duplicate);
    //       duplicate.Quantity += item.Quantity;
    //       duplicate.StockQuantity += item.Quantity;
    //       items[idx] = duplicate;
    //     } else {
    //       items.push(item);
    //     }
    //   }
    //   if (item.ReturQuantity > 0) {
    //     this.deleteCallback = null;
    //   }
    // }
    // this.data.Items = items;
    this.data.Items.sort(
      (a, b) =>
        a.Description.localeCompare(b.Description) ||
        a.Size.Size.localeCompare(b.Size.Size)
    );

    if (this.data.IsReceived) {
      this.deleteCallback = null;
      this.editCallback = null;
    }
    if (this.data.PackingListId) {
      this.manual = false;
      this.selectedInvoice = {
        invoiceNo: this.data.Invoice,
        id: this.data.PackingListId,
      };
    } else {
      this.manual = true;
    }
  }

  cancelCallback(event) {
    this.router.navigateToRoute("list");
  }

  deleteCallback(event) {
    if (confirm(`Hapus ${this.data.ExpenditureGoodNo}?`))
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
