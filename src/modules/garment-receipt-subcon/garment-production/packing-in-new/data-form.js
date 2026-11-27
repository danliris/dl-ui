import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service } from "./service";

const UnitLoader = require("../../../../loader/garment-units-loader");

@inject(Service)
export class DataForm {
  @bindable readOnly = false;
  @bindable isEdit = false;
  @bindable title;
  @bindable data = {};
  // @bindable error = {};
  @bindable selectedRO;
  @bindable itemOptions = {};
  @bindable selectedUnit;
  @bindable selectedUnitFrom;
  @bindable selectedPackingFrom;

  packingFromOptions = ["FINISHING", "SEWING", "CUTTING"];
  constructor(service) {
    this.service = service;
  }

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
    this.data.FinishingInType = "SEWING";
    this.itemOptions = {
      isEdit: this.isEdit,
      checkedAll: true,
    };

    if (this.data && this.data.Items) {
      this.data.Items.forEach((item) => {
        item.IsSave = true;
      });
    }
  }

  unitView = (unit) => {
    return `${unit.Code} - ${unit.Name}`;
  };

  get roLoaderSewing() {
    return (keyword) => {
      var info = {
        keyword: keyword,
        filter: JSON.stringify({
          UnitToId: this.data.Unit.Id,
          UnitId: this.data.UnitFrom.Id,
          SewingTo: "PACKING",
          "GarmentSewingOutItem.Any(RealQtyOut == 0)": true,
        }),
      };
      return this.service.searchRoSewingOut(info).then((result) => {
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

  get roLoaderCutting() {
    return (keyword) => {
      var info = {
        keyword: keyword,
        filter: JSON.stringify({
          UnitId: this.data.UnitFrom.Id,
          CuttingOutType: "PACKING",
          "GarmentSubconCuttingOutItem.Any(a=>a.GarmentSubconCuttingOutDetail.Any(x => x.RealQtyOut == 0))": true,
        }),
      };
      return this.service.searchRoCuttingOut(info).then((result) => {
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

  get roLoaderFinishing() {
    return (keyword) => {
      var info = {
        keyword: keyword,
        filter: JSON.stringify({
          UnitId: this.data.UnitFrom.Id,
          FinishingTo: "PACKING",
          "GarmentFinishingOutItem.Any(RealQtyOut == 0)": true,
        }),
      };
      return this.service.searchRoFinishingOut(info).then((result) => {
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

  selectedUnitChanged(newValue) {
    if (!this.data.Id) {
      this.selectedRO = null;
      this.data.RONo = null;
      this.data.Article = null;
      this.data.Comodity = null;
      this.data.UnitFrom = null;
      this.data.Items.splice(0);
      this.data.Price = 0;
      this.context.selectedROViewModel.editorValue = "";
      if (newValue) {
        this.data.Unit = newValue;
        this.selectedUnitFrom = this.data.Unit;
      } else {
        this.context.selectedROViewModel.editorValue = "";
        this.data.Unit = null;
        this.selectedRO = null;
        this.data.RONo = null;
        this.data.Article = null;
        this.data.Comodity = null;
        this.data.UnitFrom = null;
        this.data.Items.splice(0);
        this.data.Price = 0;
      }
    }
  }

  selectedUnitFromChanged(newValue) {
    if (!this.data.Id) {
      this.selectedRO = null;
      this.data.RONo = null;
      this.data.Article = null;
      this.data.Comodity = null;
      this.data.Items.splice(0);
      this.data.Price = 0;
      this.context.selectedROViewModel.editorValue = "";
      if (newValue) {
        this.data.UnitFrom = newValue;
      } else {
        this.context.selectedROViewModel.editorValue = "";
        this.data.UnitFrom = null;
        this.selectedRO = null;
        this.data.RONo = null;
        this.data.Article = null;
        this.data.Comodity = null;
        this.data.Items.splice(0);
        this.data.Price = 0;
      }
    }
  }

  selectedPackingFromChanged(newValue) {
    if (!this.data.Id) {
      this.selectedRO = null;
      this.data.RONo = null;
      this.data.Article = null;
      this.data.Comodity = null;
      this.data.Items.splice(0);
      this.data.Price = 0;
      this.context.selectedROViewModel.editorValue = "";
      if (newValue) {
        this.data.PackingFrom = newValue;
      } else {
        this.data.PackingFrom = null;
        this.selectedRO = null;
        this.data.RONo = null;
        this.data.Article = null;
        this.data.Comodity = null;
        this.data.Items.splice(0);
        this.data.Price = 0;
        this.context.selectedROViewModel.editorValue = "";
      }
    }
  }

  async selectedROChanged(newValue, oldValue) {
    this.data.RONo = null;
    this.data.Article = null;
    this.data.Comodity = null;
    this.data.Items.splice(0);
    this.data.Price = 0;
    if (newValue) {
      this.context.error.Items = [];
      this.data.RONo = newValue.RONo;
      this.data.Article = newValue.Article;
      this.data.Comodity = newValue.Comodity;
      this.data.UnitFrom = newValue.Unit;

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

      switch (this.data.PackingFrom) {
        case "CUTTING":
          Promise.resolve(
            this.service.searchCuttingOut({
              filter: JSON.stringify({
                UnitId: this.data.UnitFrom.Id,
                CuttingOutType: "PACKING",
                "GarmentSubconCuttingOutItem.Any(a=>a.GarmentSubconCuttingOutDetail.Any(x => x.RealQtyOut == 0))": true,
              }),
            })
          ).then((result) => {
            var date = result.data[0].CuttingOutDate;
            for (var cuttingOut of result.data) {
              this.data.DataFromDate =
                cuttingOut.CuttingOutDate > date
                  ? cuttingOut.CuttingOutDate
                  : date;
              date = this.data.DataFromDate;
              this.data.DataFromDate = date;
              for (var item of cuttingOut.Items) {
                for (var detail of item.Details) {
                  var a = {};
                  if (detail.RealQtyOut == 0) {
                    a.Product = item.Product;
                    a.Uom = detail.CuttingOutUom;
                    a.DesignColor = item.DesignColor;
                    a.Color = detail.Color;
                    a.Size = detail.Size;
                    a.SizeName = detail.Size.Size;
                    a.Quantity = detail.CuttingOutQuantity;
                    a.DataFromRemainingQuantity = detail.CuttingOutQuantity;
                    a.CuttingOutDetailId = detail.Id;
                    a.CuttingOutItemId = item.Id;
                    a.RemainingQuantity = detail.CuttingOutQuantity;
                    a.BasicPrice = detail.BasicPrice;
                    a.ComodityPrice = this.data.Price;
                    a.Price =
                      (detail.BasicPrice + (this.data.Price * 75) / 100) *
                      detail.CuttingOutQuantity;
                    this.data.Items.push(a);
                  }
                }
              }
            }
            this.data.Items.sort(
              (a, b) =>
                a.Color.localeCompare(b.Color) ||
                a.SizeName.localeCompare(b.SizeName)
            );
          });
          break;
        case "SEWING":
          Promise.resolve(
            this.service.searchSewingOut({
              filter: JSON.stringify({
                RONo: this.data.RONo,
                UnitToId: this.data.Unit.Id,
                UnitId: this.data.UnitFrom.Id,
                SewingTo: "PACKING",
                "GarmentSewingOutItem.Any(RealQtyOut == 0)": true,
              }),
            })
          ).then((result) => {
            var date = result.data[0].SewingOutDate;
            for (var sewingOut of result.data) {
              this.data.DataFromDate =
                sewingOut.SewingOutDate > date ? sewingOut.SewingOutDate : date;
              date = this.data.DataFromDate;
              this.data.DataFromDate = date;
              for (var sewingOutItem of sewingOut.Items) {
                var item = {};
                if (sewingOutItem.RealQtyOut == 0) {
                  if (sewingOut.IsDifferentSize) {
                    for (var sewingOutDetail of sewingOutItem.Details) {
                      item = {};
                      item.SewingOutItemId = sewingOutItem.Id;
                      item.SewingOutDetailId = sewingOutDetail.Id;
                      item.Quantity = sewingOutDetail.Quantity;
                      item.Product = sewingOutItem.Product;
                      item.Uom = sewingOutItem.Uom;
                      item.Size = sewingOutDetail.Size;
                      item.SizeName = sewingOutDetail.Size.Size;
                      item.Color = sewingOutItem.Color;
                      item.DesignColor = sewingOutItem.DesignColor;
                      item.DataFromRemainingQuantity = sewingOutDetail.Quantity;
                      item.RemainingQuantity = sewingOutDetail.Quantity;
                      item.BasicPrice = sewingOutItem.BasicPrice;
                      item.ComodityPrice = this.data.Price;
                      item.Price =
                        (sewingOutItem.BasicPrice +
                          (this.data.Price * 75) / 100) *
                        sewingOutDetail.Quantity;
                      this.data.Items.push(item);
                    }
                  } else {
                    item.SewingOutItemId = sewingOutItem.Id;
                    item.Quantity = sewingOutItem.Quantity;
                    item.Product = sewingOutItem.Product;
                    item.Uom = sewingOutItem.Uom;
                    item.Size = sewingOutItem.Size;
                    item.SizeName = sewingOutItem.Size.Size;
                    item.Color = sewingOutItem.Color;
                    item.DesignColor = sewingOutItem.DesignColor;
                    item.DataFromRemainingQuantity = sewingOutItem.Quantity;
                    item.RemainingQuantity = sewingOutItem.Quantity;
                    item.BasicPrice = sewingOutItem.BasicPrice;
                    item.ComodityPrice = this.data.Price;
                    item.Price =
                      (sewingOutItem.BasicPrice +
                        (this.data.Price * 75) / 100) *
                      sewingOutItem.Quantity;
                    this.data.Items.push(item);
                  }
                }
              }
            }
            this.data.Items.sort(
              (a, b) =>
                a.Color.localeCompare(b.Color) ||
                a.SizeName.localeCompare(b.SizeName)
            );
          });
          break;
        case "FINISHING":
          Promise.resolve(
            this.service.searchFinishingOut({
              filter: JSON.stringify({
                RONo: this.data.RONo,
                UnitToId: this.data.Unit.Id,
                UnitId: this.data.UnitFrom.Id,
                FinishingTo: "PACKING",
                "GarmentFinishingOutItem.Any(RealQtyOut == 0)": true,
              }),
            })
          ).then((result) => {
            var date = result.data[0].FinishingOutDate;
            for (var finishingOut of result.data) {
              this.data.DataFromDate =
                finishingOut.FinishingOutDate > date
                  ? finishingOut.FinishingOutDate
                  : date;
              date = this.data.DataFromDate;
              this.data.DataFromDate = date;
              for (var finishingOutItem of finishingOut.Items) {
                var item = {};
                if (finishingOutItem.RealQtyOut == 0) {
                  if (finishingOut.IsDifferentSize) {
                    for (var finishingOutDetail of finishingOutItem.Details) {
                      item = {};
                      item.FinishingOutItemId = finishingOutItem.Id;
                      item.FinishingOutDetailId = finishingOutDetail.Id;
                      item.Quantity = finishingOutDetail.Quantity;
                      item.Product = finishingOutItem.Product;
                      item.Uom = finishingOutItem.Uom;
                      item.Size = finishingOutDetail.Size;
                      item.SizeName = finishingOutDetail.Size.Size;
                      item.Color = finishingOutItem.Color;
                      item.DesignColor = finishingOutItem.DesignColor;
                      item.DataFromRemainingQuantity =
                        finishingOutDetail.Quantity;
                      item.RemainingQuantity = finishingOutDetail.Quantity;
                      item.BasicPrice = finishingOutItem.BasicPrice;
                      item.ComodityPrice = this.data.Price;
                      item.Price =
                        (finishingOutItem.BasicPrice +
                          (this.data.Price * 75) / 100) *
                        finishingOutDetail.Quantity;
                      this.data.Items.push(item);
                    }
                  } else {
                    item.FinishingOutItemId = finishingOutItem.Id;
                    item.Quantity = finishingOutItem.Quantity;
                    item.Product = finishingOutItem.Product;
                    item.Uom = finishingOutItem.Uom;
                    item.Size = finishingOutItem.Size;
                    item.SizeName = finishingOutItem.Size.Size;
                    item.Color = finishingOutItem.Color;
                    item.DesignColor = finishingOutItem.DesignColor;
                    item.DataFromRemainingQuantity = finishingOutItem.Quantity;
                    item.RemainingQuantity = finishingOutItem.Quantity;
                    item.BasicPrice = finishingOutItem.BasicPrice;
                    item.ComodityPrice = this.data.Price;
                    item.Price =
                      (finishingOutItem.BasicPrice +
                        (this.data.Price * 75) / 100) *
                      finishingOutItem.Quantity;
                    this.data.Items.push(item);
                  }
                }
              }
            }
            this.data.Items.sort(
              (a, b) =>
                a.Color.localeCompare(b.Color) ||
                a.SizeName.localeCompare(b.SizeName)
            );
          });
          break;
      }
    } else {
      this.context.selectedROViewModel.editorValue = "";
      this.data.RONo = null;
      this.data.Article = null;
      this.data.Comodity = null;
      this.data.Items.splice(0);
      this.data.Price = 0;
    }
  }
  itemsInfo = {
    columns: ["Kode Barang", "Keterangan", "Size", "Jumlah", "Satuan", "Warna"],
  };

  itemsInfoView = {
    columns: [
      "Kode Barang",
      "Keterangan",
      "Size",
      "Jumlah",
      "Sisa",
      "Satuan",
      "Warna",
    ],
  };

  ROView = (ro) => {
    return `${ro.RONo}`;
  };

  get totalQuantity() {
    var qty = 0;
    if (this.data.Items) {
      for (var item of this.data.Items) {
        qty += item.Quantity;
      }
    }
    return qty;
  }
}
