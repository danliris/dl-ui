import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service, SalesService } from "./service";

const UnitLoader = require("../../../../loader/garment-units-loader");
const PlLoader = require("../../../../loader/garment-shipping-invoice-loader");

@inject(Service, SalesService)
export class DataForm {
  @bindable readOnly = false;
  @bindable isEdit = false;
  @bindable isCreate = false;
  @bindable title;
  @bindable data = {};
  // @bindable error = {};
  @bindable selectedRO;
  @bindable itemOptions = {};
  @bindable selectedUnit;
  @bindable selectedSize;
  @bindable sizes = [];
  @bindable selectedColor;
  @bindable selectedInvoice;
  @bindable manual;

  constructor(service, salesService) {
    this.service = service;
    this.salesService = salesService;
  }

  expenditureTypes = ["LOKAL"];

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah",
  };

  controlOptions = {
    label: {
      length: 2,
    },
    control: {
      length: 7,
    },
  };

  itemsColumns = [""];

  async bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    this.isCreate = this.context.isCreate;

    this.itemOptions = {
      isEdit: this.context.isEdit,
      checkedAll: true,
      isCreate: this.context.isCreate,
    };

    if (this.data && this.data.Items) {
      this.data.Items.forEach((item) => {
        item.IsSave = true;
      });
    }

    if (this.data.PackingListId) {
      this.selectedInvoice = {
        invoiceNo: this.data.Invoice,
        id: this.data.PackingListId,
      };
      // this.manual=false;
    }

    // else{
    //     this.manual=true;
    // }
  }

  unitView = (unit) => {
    return `${unit.Code} - ${unit.Name}`;
  };

  get roLoader() {
    return (keyword) => {
      var info = {
        keyword: keyword,
        filter: JSON.stringify({
          UnitId: this.data.Unit.Id,
          "Quantity>0": true,
        }),
      };

      return this.service.getFinishedGoodByRo(info).then((result) => {
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

  get unitLoader() {
    return UnitLoader;
  }

  get plLoader() {
    return PlLoader;
  }

  get sewingOutLoader() {
    return SewingOutLoader;
  }

  // plFilter={
  //     status:"DELIVERED"
  // }

  selectedUnitChanged(newValue) {
    this.selectedRO = null;
    this.data.RONo = null;
    this.data.Article = null;
    this.data.Comodity = null;
    this.data.Items = [];
    this.data.Price = 0;
    this.data.Buyer = null;
    this.data.ContractNo = null;
    this.data.Description = "";

    if (newValue) {
      this.data.Unit = newValue;
    } else {
      this.data.Unit = null;
      this.data.RONo = null;
      this.data.Article = null;
      this.data.Comodity = null;
      this.data.Items.splice(0);
      this.data.Price = 0;
      this.data.Buyer = null;
      this.data.ContractNo = null;
      this.data.Description = "";
    }
  }

  async selectedROChanged(newValue, oldValue) {
    this.data.RONo = null;
    this.data.Article = null;
    this.data.Comodity = null;
    this.data.Buyer = null;
    this.data.ContractNo = null;
    this.data.Items.splice(0);
    this.sizes.splice(0);
    this.data.Price = 0;
    this.data.Description = "";

    if (newValue) {
      this.context.error.Items = [];
      this.data.RONo = newValue.RONo;
      this.data.Article = newValue.Article;
      this.data.Comodity = newValue.Comodity;

      var items = [];

      let pr = await this.service.getPreparingByRONo({
        size: 1,
        filter: JSON.stringify({
          RONo: this.data.RONo,
        }),
      });

      if (pr.data.length > 0) {
        this.data.ProductOwner = pr.data[0].ProductOwner;
        this.data.ProductOwnerView =
          this.data.ProductOwner.Code + " - " + this.data.ProductOwner.Name;
      }

      let noResult = await this.salesService.getCostCalculationByRONo({
        size: 1,
        filter: JSON.stringify({
          RO_Number: this.data.RONo,
        }),
      });

      if (noResult.data.length > 0) {
        this.data.Description = noResult.data[0].CommodityDescription;
      }

      let salesContractResult =
        await this.salesService.getSalesContractByRONo({
          size: 1,
          filter: JSON.stringify({
            RONumber: this.data.RONo,
          }),
        });

      if (salesContractResult.data.length > 0) {
        this.data.ContractNo =
          salesContractResult.data[0].SalesContractNo;
      }

      let priceResult = await this.service.getComodityPrice({
        filter: JSON.stringify({
          ComodityId: this.data.Comodity.Id,
          UnitId: this.data.Unit.Id,
          IsValid: true,
        }),
      });

      if (priceResult.data.length > 0) {
        this.data.Price = priceResult.data[0].Price;
      } else {
        this.data.Price = 0;
      }

      // this.data.colors = [];
      // let finOutData = await this.service.searchFinishingOut({
      //   size: 1000,
      //   filter: JSON.stringify({ RONo: this.data.RONo }),
      // });

      // for (var data of finOutData.data) {
      //   if (data.Colors.length > 0) {
      //     for (var color of data.Colors) {
      //       if (this.data.colors.length == 0) {
      //         this.data.colors.push(color);
      //       } else {
      //         var dup = this.data.colors.find((a) => a == color);
      //         if (!dup) {
      //           this.data.colors.push(color);
      //         }
      //       }
      //     }
      //   }
      // }

      this.data.colors = [];

      Promise.resolve(
        this.service.getPackingIn({
          filter: JSON.stringify({
            RONo: this.data.RONo,
            UnitId: this.data.Unit.Id,
            // "GarmentSubconPackingInItem.Any(RemainingQuantity > 0)": true,
            IsApproved: true,
          }),
        })
      ).then((result) => {
        for (var packIn of result.data) {
          for (var packInItem of packIn.Items) {
            // var item = {};

            if (this.data.colors.length == 0) {
              this.data.colors.push(packInItem.Color);
            } else {
              var dup = this.data.colors.find(
                (a) => a == packInItem.Color
              );

              if (!dup) {
                this.data.colors.push(packInItem.Color);
              }
            }

            // if (this.sizes.length > 0) {
            //   var duplicate = this.sizes.find(
            //     (a) =>
            //       a.Size.Id == packInItem.Size.Id && a.Uom.Id == packInItem.Uom.Id
            //   );

            //   if (duplicate) {
            //     var idx = this.data.Items.indexOf(duplicate);
            //     //duplicate.Quantity+=packInItem.Quantity;
            //     duplicate.StockQuantity += packInItem.Quantity;
            //     duplicate.RemainingQuantity = duplicate.StockQuantity;
            //     this.sizes[idx] = duplicate;
            //   } else {
            //     item.IsSave = true;
            //     item.Size = packInItem.Size;
            //     item.SizeName = packInItem.Size.Size;
            //     item.StockQuantity = packInItem.Quantity;
            //     item.RemainingQuantity = item.StockQuantity;
            //     //item.Quantity=packInItem.Quantity;
            //     item.Uom = packInItem.Uom;
            //     item.colors = this.data.colors;
            //     //this.data.Items.push(item);
            //     this.sizes.push(item);
            //   }
            // } else

            // {
            // item.IsSave = true;
            // item.Size = packInItem.Size;
            // item.SizeName = packInItem.Size.Size + " - " + packInItem.Color;
            // item.StockQuantity = packInItem.RemainingQuantity;
            // item.RemainingQuantity = packInItem.RemainingQuantity;
            // item.Quantity = packInItem.Quantity;
            // item.Uom = packInItem.Uom;
            // item.Color = packInItem.Color;
            // item.PackingInItemId = packInItem.Id;
            // this.sizes.push(item);

            // }
          }
        }

        // this.sizes.sort((a, b) => a.SizeName.localeCompare(b.SizeName));
      });

      Promise.resolve(
        this.service.getFinishedGood({
          filter: JSON.stringify({
            RONo: this.data.RONo,
            UnitId: this.data.Unit.Id,
          }),
          size: 1000,
        })
      ).then((result) => {
        for (var finGood of result.data) {
          if (finGood.Quantity > 0) {
            var item = {};

            item.IsSave = true;
            item.FinishedGoodStockId = finGood.Id;
            item.FinishedGoodStockNo = finGood.FinishedGoodStockNo;
            item.Size = finGood.Size;
            item.SizeName =finGood.Size.Size +" - " +finGood.Colour +" - " +(finGood.LocationCode || "BELUM RACKING");
            item.StockQuantity = finGood.Quantity;
            item.RemainingQuantity = finGood.Quantity;
            item.Quantity = 0;
            item.Uom = finGood.Uom;
            item.Color = finGood.Colour;
            item.BasicPrice = finGood.BasicPrice;
            item.WarehouseCode = finGood.WarehouseCode;
            item.Area = finGood.Area;
            item.LineCode = finGood.LineCode;
            item.PalletCode = finGood.PalletCode;
            item.LocationCode = finGood.LocationCode;
            item.ReferenceFinishedGoodStockNo =finGood.ReferenceFinishedGoodStockNo;
            item.colors = this.data.colors;
            item.PackingInItemId = finGood.PackingInItemId;

            this.sizes.push(item);
          }
        }

        this.sizes.sort((a, b) => {
          var sizeCompare = a.Size.Size.localeCompare(b.Size.Size);

          if (sizeCompare !== 0) {
            return sizeCompare;
          }

          var colorCompare = (a.Color || "").localeCompare(
            b.Color || ""
          );

          if (colorCompare !== 0) {
            return colorCompare;
          }

          var warehouseCompare = (a.WarehouseCode || "").localeCompare(
            b.WarehouseCode || ""
          );

          if (warehouseCompare !== 0) {
            return warehouseCompare;
          }

          var areaCompare = (a.Area || "").localeCompare(
            b.Area || ""
          );

          if (areaCompare !== 0) {
            return areaCompare;
          }

          var lineCompare = (a.LineCode || "").localeCompare(
            b.LineCode || ""
          );

          if (lineCompare !== 0) {
            return lineCompare;
          }

          return (a.PalletCode || "").localeCompare(
            b.PalletCode || ""
          );
        });
      });
    } else {
      this.context.selectedROViewModel.editorValue = "";
      this.data.RONo = null;
      this.data.Article = null;
      this.data.Comodity = null;
      this.data.Items.splice(0);
      this.data.Price = 0;
      this.data.Buyer = null;
      this.data.ContractNo = null;
      this.data.Description = "";
    }
  }

  selectedSizeChanged(newValue) {
    if (newValue) {
      this.selectedColor = newValue.Color;
      newValue.Quantity = 0;
    }
  }

  itemsInfo = {
    columns: [
      "Size",
      "Warehouse",
      "Area",
      "Line",
      "Pallet",
      "Jumlah Keluar",
      "Satuan",
      "Keterangan",
    ],
  };

  ROView = (ro) => {
    return `${ro.RONo}`;
  };

  get totalQuantity() {
    var qty = 0;

    if (this.data.Items) {
      for (var item of this.data.Items) {
        if (item.IsSave) {
          qty += item.Quantity;
        }
      }
    }

    return qty;
  }

  addProduct() {
    if (this.selectedSize.Quantity > this.selectedSize.RemainingQuantity) {
      alert(
        "Jumlah Keluar tidak boleh lebih dari " +
          this.selectedSize.RemainingQuantity
      );
    } else {
      let objData = {};
      var item = Object.assign(objData, this.selectedSize);

      item.Description = this.selectedSize.Color;
      item.Quantity = this.selectedSize.Quantity;
      item.RemainingQuantity -= this.selectedSize.Quantity;
      item.PackingInItemId = this.selectedSize.PackingInItemId;

      this.data.Items.push(item);

      this.selectedSize.RemainingQuantity -=
        this.selectedSize.Quantity;

      this.selectedSize.Quantity = 0;
    }
  }

  get removeItems() {
    return (event) => {
      var item = this.sizes.find(
        (a) =>
          a.FinishedGoodStockId ==
          event.detail.FinishedGoodStockId
      );

      if (item) {
        var idx = this.sizes.indexOf(item);

        item.RemainingQuantity += event.detail.Quantity;

        if (item.RemainingQuantity > item.StockQuantity) {
          item.RemainingQuantity = item.StockQuantity;
        }

        this.sizes[idx] = item;
      }

      this.error = null;
    };
  }

  // async selectedInvoiceChanged(newValue) {
  //   if (newValue) {
  //     this.data.Invoice = newValue.invoiceNo;
  //     this.data.PackingListId = newValue.id;
  //     this.data.PackingListId = newValue.packingListId;
  //     this.data.InvoiceId = newValue.id;
  //   } else {
  //     this.data.Invoice = "";
  //     this.data.PackingListId = 0;
  //   }
  // }

  manualChanged(newValue) {
    if (!this.readOnly) {
      if (this.context.selectedInvoiceViewModel) {
        this.context.selectedInvoiceViewModel.editorValue = "";
      }

      this.selectedInvoice = null;
      this.data.Invoice = "";
      this.data.PackingListId = 0;
    }
  }
}