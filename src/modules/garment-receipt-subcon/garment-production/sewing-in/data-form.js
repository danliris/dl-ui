import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service } from "./service";

const UnitLoader = require("../../../../loader/garment-units-loader");
const LoadingOutLoader = require("../../../../loader/garment-subcon-receipt-loading-out-loader");

@inject(Service)
export class DataForm {
  @bindable readOnly = false;
  @bindable isEdit = false;
  @bindable title;
  @bindable data = {};
  // @bindable error = {};
  @bindable selectedLoadingOut;
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
  SewingTypeOptions = ["CUTTING", "SEWING", "FINISHING"];

  async bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

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

  ROView = (DO) => {
    var colorList = [];
    var sizeList = [];
    for (var item of DO.Items) {
      if (colorList.length == 0) {
        colorList.push(item.Color);
      } else {
        var dup = colorList.find((d) => d == item.Color);
        if (!dup) {
          colorList.push(item.Color);
        }
      }
      if (sizeList.length == 0) {
        sizeList.push(item.Size.Size);
      } else {
        var duplicate = sizeList.find((d) => d == item.Size.Size);
        if (!duplicate) {
          sizeList.push(item.Size.Size);
        }
      }
    }
    return `${DO.RONo} - ${DO.LoadingOutNo} - ${colorList.join(
      ", "
    )} - ${sizeList.join(", ")}`;
  };

  get unitLoader() {
    return UnitLoader;
  }

  get loadingOutLoader() {
    return LoadingOutLoader;
  }

  @computedFrom("data.Unit && data.SewingFrom")
  get filter() {
    var filter = {};
    if (this.data.Unit) {
      if (this.data.SewingFrom == "CUTTING") {
        filter = {
          UnitId: this.data.Unit.Id,
          "Items.Any(x => x.RealQtyOut == 0)": true,
        };
      }
    }
    return filter;
  }

  selectedUnitChanged(newValue) {
    this.selectedLoadingOut = null;
    this.data.RONo = null;
    this.data.Article = null;
    this.data.Comodity = null;
    this.data.UnitFrom = null;
    this.data.LoadingOutId = null;
    this.data.LoadingOutNo = null;
    this.data.Price = 0;
    this.data.Items = [];
    if (newValue) {
      this.data.Unit = newValue;
      this.data.UnitFrom = newValue;
    } else {
      this.data.Unit = null;
      this.selectedLoadingOut = null;
      this.selectedLoadingOut = null;
      this.data.RONo = null;
      this.data.Article = null;
      this.data.Comodity = null;
      this.data.UnitFrom = null;
      this.data.LoadingOutId = null;
      this.data.LoadingOutNo = null;
      this.data.Price = 0;
      this.data.Items = [];
    }
  }

  async selectedLoadingOutChanged(newValue, oldValue) {
    this.data.RONo = null;
    this.data.Article = null;
    this.data.Comodity = null;
    this.data.UnitFrom = null;
    this.data.LoadingOutId = null;
    this.data.LoadingOutNo = null;
    this.data.Items.splice(0);
    this.data.Price = 0;
    if (newValue) {
      this.context.error.Items = [];
      this.data.RONo = newValue.RONo;
      this.data.Article = newValue.Article;
      this.data.Comodity = newValue.Comodity;
      this.data.UnitFrom = newValue.Unit;
      this.data.LoadingOutId = newValue.Id;
      this.data.LoadingOutNo = newValue.LoadingOutNo;

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

      var items = [];
      for (var item of newValue.Items) {
        var a = {};
        if (item.RealQtyOut ==  0) {
          a.Product = item.Product;
          a.Uom = item.Uom;
          a.DesignColor = item.DesignColor;
          a.Color = item.Color;
          a.Size = item.Size;
          a.SizeName = item.Size.Size;
          a.Quantity = item.Quantity;
          a.LoadingOutRemainingQuantity = item.Quantity;
          a.IsSave = true;
          a.LoadingOutItemId = item.Id;
          a.RemainingQuantity = item.Quantity;
          a.BasicPrice = item.BasicPrice;
          a.ComodityPrice = this.data.Price;
          this.data.Items.push(a);
        }
      }
      this.data.Items.sort(
        (a, b) =>
          a.Color.localeCompare(b.Color) || a.SizeName.localeCompare(b.SizeName)
      );
    } else {
      this.context.selectedLoadingOutViewModel.editorValue = "";
      this.data.RONo = null;
      this.data.Article = null;
      this.data.Comodity = null;
      this.data.UnitFrom = null;
      this.data.LoadingOutId = null;
      this.data.LoadingOutNo = null;
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
