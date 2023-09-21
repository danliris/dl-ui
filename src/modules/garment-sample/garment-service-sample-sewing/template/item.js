import { inject, bindable, computedFrom } from "aurelia-framework";
import { Service, PurchasingService } from "../service";

// var UnitLoader = require('../../../../loader/garment-units-loader');

@inject(Service, PurchasingService)
export class Item {
  @bindable selectedRO;

  constructor(service, purchasingService) {
    this.service = service;
    this.purchasingService = purchasingService;
  }

  detailColumns = [
    "Warna",
    "Design Warna",
    "Unit",
    "Jumlah",
    "Satuan",
    "Keterangan",
  ];

  async activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.context.options;
    this.data.IsDifferentSize = false;
    this.readOnly = context.options.readOnly;
    this.isCreate = context.context.options.isCreate;
    this.isEdit = context.context.options.isEdit;

    this.itemOptions = {
      error: this.error,
      isCreate: this.isCreate,
      isEdit: this.isEdit,
      readOnly: this.readOnly,
    };
    this.isShowing = true;
    if (this.data.Details) {
      if (this.data.Details.length > 0) {
        this.isShowing = true;
      }
    }

    if (this.data.Id) {
      this.data.Unitview = this.data.Unit.Code + " - " + this.data.Unit.Name;
    }

    if (this.data.RONo) {
      this.selectedRO = {
        RONo: this.data.RONo,
      };
    }
  }

  toggle() {
    if (!this.isShowing) this.isShowing = true;
    else this.isShowing = !this.isShowing;
  }

  comodityView = (comodity) => {
    return `${comodity.Code} - ${comodity.Name}`;
  };

  ROView = (ro) => {
    return `${ro.RONo}`;
  };

  async selectedROChanged(newValue, oldValue) {
    if (newValue) {
      if (this.data.Details.length > 0) {
        this.data.Details.splice(0);
      }
      //this.context.error.Items = [];
      this.data.RONo = newValue.RONo;
      this.data.Article = newValue.Article;
      this.data.Comodity = newValue.Comodity;
      this.data.Unit = newValue.Unit;
      this.data.Unitview = this.data.Unit.Code + " - " + this.data.Unit.Name;
      let pr = await this.purchasingService.getGarmentPR({
        size: 1,
        filter: JSON.stringify({ RONo: this.data.RONo }),
      });

      if (pr.data.length > 0) {
        this.data.Buyer = pr.data[0].Buyer;
        this.data.BuyerView =
          this.data.Buyer.Code + " - " + this.data.Buyer.Name;
      }

      //Old Query Calculating Recent item that uses, from items to SewIn (13/09/2023)
      // //Get Valur From Sample Sewing In By RO
      // let ssSewingItems = [];
      // let ssSewing = await this.service.searchItem({
      //   size: 100,
      //   filter: JSON.stringify({ RONo: this.data.RONo }),
      // });

      // if (ssSewing.data.length > 0) {
      //   for (var ssS of ssSewing.data) {
      //     for (var ssSItem of ssS.Details) {
      //       var item = {};
      //       item.sewingInItemId = ssSItem.SewingInItemId;
      //       item.qty = ssSItem.Quantity;

      //       //Mapping Quantity By Sewing In ItemId
      //       if (ssSewingItems[ssSItem.SewingInItemId]) {
      //         ssSewingItems[ssSItem.SewingInItemId].qty += ssSItem.Quantity;
      //       } else {
      //         ssSewingItems[ssSItem.SewingInItemId] = item;
      //       }
      //     }
      //   }
      // }
      // //UnitId: this.data.Unit.Id,

      // //Get Valur From Sewing In By RO
      // Promise.resolve(
      //   this.service.searchSewingIn({
      //     filter: JSON.stringify({ RONo: this.data.RONo }),
      //   })
      // ).then((result) => {
      //   for (var sewingIn of result.data) {
      //     for (var sewingInItem of sewingIn.Items) {
      //       var detail = {};
      //       if (sewingInItem.Quantity > 0) {
      //         var qtyOut = 0;
      //         //Mapping Quantity Out Group By SewingInItem Id
      //         if (ssSewingItems[sewingInItem.Id]) {
      //           qtyOut += ssSewingItems[sewingInItem.Id].qty;
      //         }

      //         //Get Availabe Quantity from SewingInItem reduce QuantitySSampleSewing
      //         var qty = sewingInItem.Quantity - qtyOut;

      //         if (qty > 0) {
      //           if (this.data.Details.length == 0) {
      //             detail.Quantity = qty;
      //             detail.SewingInQuantity = qty;
      //             detail.Color = sewingInItem.Color;
      //             detail.DesignColor = sewingInItem.DesignColor;
      //             detail.Uom = sewingInItem.Uom;
      //             detail.Unit = sewingIn.Unit;
      //             this.data.Details.push(detail);
      //           } else {
      //             var exist = this.data.Details.find(
      //               (a) =>
      //                 a.DesignColor == sewingInItem.DesignColor &&
      //                 a.Unit.Id == sewingIn.Unit.Id &&
      //                 a.Color == sewingInItem.Color
      //             );
      //             if (!exist) {
      //               detail.Quantity = qty;
      //               detail.SewingInQuantity = qty;
      //               detail.Color = sewingInItem.Color;
      //               detail.DesignColor = sewingInItem.DesignColor;
      //               detail.Uom = sewingInItem.Uom;
      //               detail.Unit = sewingIn.Unit;
      //               this.data.Details.push(detail);
      //             } else {
      //               var idx = this.data.Details.indexOf(exist);
      //               exist.Quantity += qty;
      //               exist.SewingInQuantity += qty;
      //               this.data.Details[idx] = exist;
      //             }
      //           }
      //         }

      //         // }
      //       }
      //     }
      //   }
      //   //this.data.Items.sort((a, b) => a.Color.localeCompare(b.Color) || a.SizeName.localeCompare(b.SizeName));
      // });

      //New Query-Ignore Calculating (13/09/2023)
      Promise.resolve(
        this.service.searchSewingIn({
          filter: JSON.stringify({ RONo: this.data.RONo }),
        })
      ).then((result) => {
        for (var sewingIn of result.data) {
          for (var sewingInItem of sewingIn.Items) {
            var detail = {};
            if (sewingInItem.Quantity > 0) {
              if (this.data.Details.length == 0) {
                detail.Quantity = sewingInItem.Quantity;
                detail.SewingInQuantity = sewingInItem.Quantity;
                detail.Color = sewingInItem.Color;
                detail.DesignColor = sewingInItem.DesignColor;
                detail.Uom = sewingInItem.Uom;
                detail.Unit = sewingIn.Unit;
                this.data.Details.push(detail);
              } else {
                var exist = this.data.Details.find(
                  (a) =>
                    a.DesignColor == sewingInItem.DesignColor &&
                    a.Unit.Id == sewingIn.Unit.Id &&
                    a.Color == sewingInItem.Color
                );
                if (!exist) {
                  detail.Quantity = sewingInItem.Quantity;
                  detail.SewingInQuantity = sewingInItem.Quantity;
                  detail.Color = sewingInItem.Color;
                  detail.DesignColor = sewingInItem.DesignColor;
                  detail.Uom = sewingInItem.Uom;
                  detail.Unit = sewingIn.Unit;
                  this.data.Details.push(detail);
                } else {
                  var idx = this.data.Details.indexOf(exist);
                  exist.Quantity += sewingInItem.Quantity;
                  exist.SewingInQuantity += sewingInItem.Quantity;
                  this.data.Details[idx] = exist;
                }
              }

              // }
            }
          }
        }
        //this.data.Items.sort((a, b) => a.Color.localeCompare(b.Color) || a.SizeName.localeCompare(b.SizeName));
      });
    } else {
      this.context.selectedROViewModel.editorValue = "";
      this.data.RONo = null;
      this.data.Article = null;
      this.data.Comodity = null;
      this.data.Buyer = null;
      this.data.Details.splice(0);
    }
    this.data.Details.splice(0);
  }

  // get unitLoader(){
  //   return UnitLoader;
  //   }
  // unitView = (unit) => {
  //   return `${unit.Code} - ${unit.Name}`
  // }

  get roLoader() {
    return (keyword) => {
      var info = {
        keyword: keyword,
        filter: JSON.stringify({ BuyerCode: this.data.Buyer.Code }),
      };
      return this.service.searchSewingInByRo(info).then((result) => {
        var roList = [];
        for (var a of result.data) {
          if (roList.length == 0) {
            roList.push(a);
          } else {
            var dup = roList.find((d) => d.RONo == a.RONo);
            if (!dup) {
              roList.push(a);
            }
          }
        }
        return roList;
      });
    };
  }
}
