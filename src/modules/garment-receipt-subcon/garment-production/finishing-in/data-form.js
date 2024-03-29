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
  @bindable selectedSewingOut;
  @bindable itemOptions = {};
  @bindable selectedUnit;
  @bindable selectedUnitFrom;

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
    // if(this.data.SewingOutId){
    //     this.selectedSewingOut= await this.service.getSewingOutbyId(this.data.SewingOutId);
    // }

    if (this.data && this.data.Items) {
      this.data.Items.forEach((item) => {
        item.IsSave = true;
      });
    }
  }

  unitView = (unit) => {
    return `${unit.Code} - ${unit.Name}`;
  };

  get roLoader() {
    return (keyword) => {
      var info = {
        keyword: keyword,
        filter: JSON.stringify({
          UnitToId: this.data.Unit.Id,
          UnitId: this.data.UnitFrom.Id,
          SewingTo: "FINISHING",
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

  get unitLoader() {
    return UnitLoader;
  }

  get sewingOutLoader() {
    return SewingOutLoader;
  }

  @computedFrom("data.Unit", "data.UnitFrom")
  get filter() {
    if (this.data.Unit && this.data.UnitFrom) {
      return {
        UnitToId: this.data.Unit.Id,
        SewingTo: "FINISHING",
        UnitId: this.data.UnitFrom.Id,
      };
    } else {
      return {
        UnitToId: 0,
      };
    }
  }

  selectedUnitChanged(newValue) {
    if (!this.data.Id) {
      this.selectedSewingOut = null;
      this.data.RONo = null;
      this.data.Article = null;
      this.data.Comodity = null;
      this.data.UnitFrom = null;
      this.data.SewingOutId = null;
      this.data.SewingOutNo = null;
      this.data.Items.splice(0);
      this.data.Price = 0;
      this.context.selectedSewingOutViewModel.editorValue = "";
      if (newValue) {
        this.data.Unit = newValue;
        this.selectedUnitFrom = this.data.Unit;
      } else {
        this.context.selectedSewingOutViewModel.editorValue = "";
        this.data.Unit = null;
        this.selectedSewingOut = null;
        this.selectedSewingOut = null;
        this.data.RONo = null;
        this.data.Article = null;
        this.data.Comodity = null;
        this.data.UnitFrom = null;
        this.data.SewingOutId = null;
        this.data.SewingOutNo = null;
        this.data.Items.splice(0);
        this.data.Price = 0;
      }
    }
  }

  selectedUnitFromChanged(newValue) {
    if (!this.data.Id) {
      this.selectedSewingOut = null;
      this.data.RONo = null;
      this.data.Article = null;
      this.data.Comodity = null;
      this.data.SewingOutId = null;
      this.data.SewingOutNo = null;
      this.data.Items.splice(0);
      this.data.Price = 0;
      this.context.selectedSewingOutViewModel.editorValue = "";
      if (newValue) {
        this.data.UnitFrom = newValue;
      } else {
        this.context.selectedSewingOutViewModel.editorValue = "";
        this.data.UnitFrom = null;
        this.selectedSewingOut = null;
        this.selectedSewingOut = null;
        this.data.RONo = null;
        this.data.Article = null;
        this.data.Comodity = null;
        this.data.SewingOutId = null;
        this.data.SewingOutNo = null;
        this.data.Items.splice(0);
        this.data.Price = 0;
      }
    }
  }

  async selectedSewingOutChanged(newValue, oldValue) {
    this.data.RONo = null;
    this.data.Article = null;
    this.data.Comodity = null;
    this.data.UnitFrom = null;
    this.data.SewingOutId = null;
    this.data.SewingOutNo = null;
    this.data.Items.splice(0);
    this.data.Price = 0;
    if (newValue) {
      this.context.error.Items = [];
      this.data.RONo = newValue.RONo;
      this.data.Article = newValue.Article;
      this.data.Comodity = newValue.Comodity;
      this.data.UnitFrom = newValue.Unit;
      this.data.SewingOutId = newValue.Id;
      this.data.SewingOutNo = newValue.SewingOutNo;
      var items = [];

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
      Promise.resolve(
        this.service.searchSewingOut({
          filter: JSON.stringify({
            RONo: this.data.RONo,
            UnitToId: this.data.Unit.Id,
            UnitId: this.data.UnitFrom.Id,
            SewingTo: "FINISHING",
            "GarmentSewingOutItem.Any(RealQtyOut == 0)": true,
          }),
        })
      ).then((result) => {
        var date = result.data[0].SewingOutDate;
        for (var sewingOut of result.data) {
          this.data.FinishingInDate =
            sewingOut.SewingOutDate > date ? sewingOut.SewingOutDate : date;
          date = this.data.FinishingInDate;
          this.data.SewingOutDate = date;
          for (var sewingOutItem of sewingOut.Items) {
            var item = {};
            if (sewingOutItem.RealQtyOut ==  0) {
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
                  item.SewingOutRemainingQuantity =
                    sewingOutDetail.Quantity;
                  item.RemainingQuantity = sewingOutDetail.Quantity;
                  item.BasicPrice = sewingOutItem.BasicPrice;
                  item.ComodityPrice = this.data.Price;
                  item.Price =
                    (sewingOutItem.BasicPrice + (this.data.Price * 75) / 100) *
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
                item.SewingOutRemainingQuantity =
                  sewingOutItem.Quantity;
                item.RemainingQuantity = sewingOutItem.Quantity;
                item.BasicPrice = sewingOutItem.BasicPrice;
                item.ComodityPrice = this.data.Price;
                item.Price =
                  (sewingOutItem.BasicPrice + (this.data.Price * 75) / 100) *
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
    } else {
      this.context.selectedSewingOutViewModel.editorValue = "";
      this.data.RONo = null;
      this.data.Article = null;
      this.data.Comodity = null;
      this.data.UnitFrom = null;
      this.data.SewingOutId = null;
      this.data.SewingOutNo = null;
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
