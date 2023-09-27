import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service } from "./service";

const UnitLoader = require("../../../../loader/garment-units-loader");
const CuttingOutLoader = require("../../../../loader/garment-subcon-receipt-cutting-out-loader");

@inject(Service)
export class DataForm {
  @bindable readOnly = false;
  @bindable isEdit = false;
  @bindable title;
  @bindable data = {};
  // @bindable error = {};
  @bindable selectedCuttingOut;
  @bindable itemOptions = {};
  @bindable selectedUnit;

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

    this.itemOptions = {
      isEdit: this.isEdit,
      checkedAll: true,
    };
    // if(this.data.CuttingOutId){
    //     this.selectedCuttingOut= await this.service.getSewingDObyId(this.data.CuttingOutId);
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

  ROView = (DO) => {
    var colorList = [];
    var sizeList = [];
    for (var a of DO.Items) {
      for (var detail of a.Details)
        if (colorList.length == 0) {
          colorList.push(detail.Color);
        } else {
          var dup = colorList.find((d) => d == detail.Color);
          if (!dup) {
            colorList.push(detail.Color);
          }
        }
      if (sizeList.length == 0) {
        sizeList.push(detail.Size.Size);
      } else {
        var duplicate = sizeList.find((d) => d == detail.Size.Size);
        if (!duplicate) {
          sizeList.push(detail.Size.Size);
        }
      }
    }
    return `${DO.RONo} - ${DO.CutOutNo} - ${colorList.join(
      ", "
    )} - ${sizeList.join(", ")}`;
  };

  get unitLoader() {
    return UnitLoader;
  }

  get cuttingOutLoader() {
    return CuttingOutLoader;
  }

  @computedFrom("data.Unit")
  get filter() {
    if (this.data.Unit) {
      return {
        UnitId: this.data.Unit.Id,
        "GarmentSubconCuttingOutItem.Any(a=>a.GarmentSubconCuttingOutDetail.Any(x => x.RealQtyOut == 0))": true,
        CuttingOutType: "SEWING",
      };
    } else {
      return {
        UnitId: 0,
      };
    }
  }

  selectedUnitChanged(newValue) {
    this.selectedCuttingOut = null;
    this.data.RONo = null;
    this.data.Article = null;
    this.data.Comodity = null;
    this.data.UnitFrom = null;
    this.data.CuttingOutId = null;
    this.data.CuttingOutNo = null;
    this.data.Price = 0;
    this.data.Items = [];
    if (newValue) {
      this.data.Unit = newValue;
    } else {
      this.data.Unit = null;
      this.selectedCuttingOut = null;
      this.selectedCuttingOut = null;
      this.data.RONo = null;
      this.data.Article = null;
      this.data.Comodity = null;
      this.data.UnitFrom = null;
      this.data.CuttingOutId = null;
      this.data.CuttingOutNo = null;
      this.data.Price = 0;
      this.data.Items = [];
    }
  }

  async selectedCuttingOutChanged(newValue, oldValue) {
    this.data.RONo = null;
    this.data.Article = null;
    this.data.Comodity = null;
    this.data.UnitFrom = null;
    this.data.CuttingOutId = null;
    this.data.CuttingOutNo = null;
    this.data.Items.splice(0);
    this.data.Price = 0;
    if (newValue) {
      this.context.error.Items = [];
      this.data.RONo = newValue.RONo;
      this.data.Article = newValue.Article;
      this.data.Comodity = newValue.Comodity;
      this.data.UnitFrom = newValue.Unit;
      this.data.CuttingOutId = newValue.Id;
      this.data.CuttingOutNo = newValue.CutOutNo;
      // this.data.SewingDODate = newValue.CuttingOutDate;

      let priceResult = await this.service.getComodityPrice({
        filter: JSON.stringify({
          ComodityId: this.data.Comodity.Id,
          UnitId: this.data.Unit.Id,
          IsValid: true,
        }),
      });
      if (priceResult.data.length > 0) {
        this.data.Price = priceResult.data[0].Price;
        //console.log(this.data.Price)
      } else {
        this.data.Price = 0;
      }

      var items = [];
      for (var item of newValue.Items) {
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
            a.SewingDORemainingQuantity = detail.CuttingOutQuantity;
            a.IsSave = true;
            a.CuttingOutDetailId = detail.Id;
            a.RemainingQuantity = detail.CuttingOutQuantity;
            a.BasicPrice = detail.BasicPrice;
            a.ComodityPrice = this.data.Price;
            this.data.Items.push(a);
          }
        }
      }
      this.data.Items.sort(
        (a, b) =>
          a.Color.localeCompare(b.Color) || a.SizeName.localeCompare(b.SizeName)
      );
    } else {
      this.context.selectedCuttingOutViewModel.editorValue = "";
      this.data.RONo = null;
      this.data.Article = null;
      this.data.Comodity = null;
      this.data.UnitFrom = null;
      this.data.CuttingOutId = null;
      this.data.CuttingOutNo = null;
      this.data.Price = 0;
      this.data.Items = [];
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

  get totalQuantity() {
    var qty = 0;
    if (this.data.Items) {
      for (var item of this.data.Items) {
        if (item.IsSave) qty += item.Quantity;
      }
    }
    return qty;
  }
}
