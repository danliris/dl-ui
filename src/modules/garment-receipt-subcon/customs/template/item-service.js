import { inject, bindable, computedFrom } from "aurelia-framework";
import { PackingInventoryService } from "../service";

@inject(PackingInventoryService)
export class Item {
  @bindable noteNo;

  constructor(packingInventoryService) {
    this.packingInventoryService = packingInventoryService;
  }

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
    this.isCreate = context.context.options.isCreate;
    this.isEdit = context.context.options.isEdit;

    if (this.data.LocalSalesNoteNo || this.data.localSalesNoteNo) {
      this.noteNo = {
        noteNo: this.data.LocalSalesNoteNo || this.data.localSalesNoteNo,
      };
    }
  }

  removeItems = function () {
    this.bind();
  };

  get noteNoLoader() {
    return (keyword) => {
      var info = {
        keyword: keyword,
        filter: JSON.stringify({
          // BuyerId: this.data.productOwnerId,
          IsUsed: false,
        }),
      };
      return this.packingInventoryService
        .getLocalSalesNote(info)
        .then((result) => {
          var noList = [];
          for (var a of result.data) {
            if (noList.length == 0) {
              var same = this.context.context.items.find(
                (x) => x.data.LocalSalesNoteNo == a.noteNo
              );
              if (!same) {
                noList.push(a);
              }
            } else {
              var same = this.context.context.items.find(
                (x) => x.data.LocalSalesNoteNo == a.noteNo
              );
              var dup = noList.find((d) => d.noteNo == a.noteNo);
              if (!dup && !same) {
                noList.push(a);
              }
            }
          }
          return noList;
        });
    };
  }

  uomView = (data) => {
    return `${data.Unit || data.unit || ""}`;
  };

  noteNoChanged(newValue) {
    if (newValue) {
      this.data.LocalSalesNoteNo = newValue.noteNo;
      this.data.LocalSalesNoteId = newValue.id;

      let quantity = 0;
      let packageQuantity = 0;
      let packageUom = {};
      let Uom = {};
      newValue.items.forEach((element) => {
        if (element.uom.unit == "PCS") {
          quantity += element.quantity;
        }

        packageQuantity += element.packageQuantity;
        packageUom = element.packageUom;
        Uom = element.uom;
      });

      this.data.quantity = quantity;
      this.data.uom = Uom;
      this.data.packageQuantity = packageQuantity;
      this.data.packageUom = packageUom;
    }
  }
}
