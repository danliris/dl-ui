import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service, PurchasingService } from "./service";

const UnitLoader = require('../../../loader/garment-units-loader');

@inject(Service, PurchasingService)
export class DataForm {
  @bindable readOnly = false;
  @bindable isCreate = false;
  @bindable isEdit = false;
  @bindable isView = false;
  @bindable title;
  @bindable data = {};
  // @bindable error = {};
  @bindable selectedRO;
  @bindable selectedUnit;
  @bindable itemOptions = {};

  constructor(service, purchasingService) {
    this.service = service;
    this.purchasingService = purchasingService;
  }

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah"
  };

  controlOptions = {
    label: {
      length: 2
    },
    control: {
      length: 5
    }
  };

  itemsInfo = {
    columns: [
      "Kode Barang",
      "Keterangan",
      "Size",
      "Jumlah",
      "Satuan",
      "Warna"
    ]
  }

  itemsInfoView = {
    columns: [
      "Kode Barang",
      "Keterangan",
      "Size",
      "Jumlah",
      "Satuan",
      "Warna"
    ]
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    this.itemOptions = {
      isCreate: this.context.isCreate,
      isEdit: this.context.isEdit,
      isView: this.context.isView,
      checkedAll: this.context.isCreate == true ? false : true
    }

    if (this.data && this.data.Items) {
      this.data.Items.forEach(
        item => {
          item.IsSave = true;
        }
      );
    }
  }

  unitView = (unit) => {
    return `${unit.Code} - ${unit.Name}`;
  }

  comodityView = (comodity) => {
    return `${comodity.Code} - ${comodity.Name}`
  }

  ROView = (ro) => {
    return `${ro.RONo}`;
  }

  get unitLoader() {
    return UnitLoader;
  }

  selectedUnitChanged(newValue) {
    if (newValue) {
      this.data.Unit = newValue;
      this.selectedUnitTo = newValue;
      this.data.UnitTo = newValue;
    }
    else {
      this.context.selectedROViewModel.editorValue = "";
      this.data.RONo = null;
      this.data.Article = null;
      this.data.Comodity = null;
      this.data.Buyer = null;
      this.data.Items.splice(0);
    }
    this.context.selectedROViewModel.editorValue = "";
    this.data.RONo = null;
    this.data.Article = null;
    this.data.Comodity = null;
    this.data.Buyer = null;
    this.data.Items.splice(0);
  }

  async selectedROChanged(newValue, oldValue) {
    if (this.context.isCreate) {
      if (newValue) {
        if (this.data.Items.length > 0) {
          this.data.Items.splice(0);
        }
        this.context.error.Items = [];
        this.data.RONo = newValue.RONo;
        this.data.Article = newValue.Article;
        this.data.Comodity = newValue.Comodity;

        let pr = await this.purchasingService.getGarmentPR({ size: 1, filter: JSON.stringify({ RONo: this.data.RONo }) });

        if (pr.data.length > 0) {
          this.data.Buyer = pr.data[0].Buyer;
          this.data.BuyerView = this.data.Buyer.Code + ' - ' + this.data.Buyer.Name;
        }

        let ssSewingItems = [];
        let ssSewing = await this.service.searchComplete({ size: 100, filter: JSON.stringify({ RONo: this.data.RONo }) });
        console.log(ssSewing)
        if (ssSewing.data.length > 0) {
          for (var ssS of ssSewing.data) {
            for (var ssSItem of ssS.Items) {
              var item = {};
              item.sewingInItemId = ssSItem.SewingInItemId;
              item.qty = ssSItem.Quantity;
              if (ssSewingItems[ssSItem.SewingInItemId]) {
                ssSewingItems[ssSItem.SewingInItemId].qty += ssSItem.Quantity;
              }
              else {
                ssSewingItems[ssSItem.SewingInItemId] = item;
              }
            }
          }
        }

        Promise.resolve(this.service.searchSewingIn({ filter: JSON.stringify({ RONo: this.data.RONo, UnitId: this.data.Unit.Id, "GarmentSewingInItem.Any(RemainingQuantity>0)": true }) }))
          .then(result => {
            for (var sewingIn of result.data) {
              for (var sewingInItem of sewingIn.Items) {
                var item = {};
                if (sewingInItem.RemainingQuantity > 0) {
                  var qtyOut = 0;
                  if (ssSewingItems[sewingInItem.Id]) {
                    qtyOut += ssSewingItems[sewingInItem.Id].qty;
                  }
                  var qty = sewingInItem.RemainingQuantity - qtyOut;
                  if (qty > 0) {
                    item.SewingInItemId = sewingInItem.Id;
                    item.SewingInId = sewingIn.Id;
                    item.Quantity = qty;
                    item.Product = sewingInItem.Product;
                    item.Uom = sewingInItem.Uom;
                    item.Size = sewingInItem.Size;
                    item.SizeName = sewingInItem.Size.Size;
                    item.SewingInQuantity = qty;
                    item.Color = sewingInItem.Color;
                    item.DesignColor = sewingInItem.DesignColor;
                    item.BasicPrice = sewingInItem.BasicPrice;
                    item.ComodityPrice = this.data.Price;
                    item.SewingInDate = sewingIn.SewingInDate;
                    this.data.Items.push(item);
                  }
                }
              }
            }
            this.data.Items.sort((a, b) => a.Color.localeCompare(b.Color) || a.SizeName.localeCompare(b.SizeName));
          });
      }
      else {
        this.context.selectedROViewModel.editorValue = "";
        this.data.RONo = null;
        this.data.Article = null;
        this.data.Comodity = null;
        this.data.Buyer = null;
        this.data.Items.splice(0);
      }
      this.data.Items.splice(0);
    }
  }

  get roLoader() {
    return (keyword) => {
      var info = {
        keyword: keyword,
        filter: JSON.stringify({ UnitId: this.data.Unit.Id, "GarmentSewingInItem.Any(RemainingQuantity>0)": true })
      };
      return this.service.searchSewingIn(info)
        .then((result) => {
          var roList = [];
          for (var a of result.data) {
            if (roList.length == 0) {
              roList.push(a);
            }
            else {
              var dup = roList.find(d => d.RONo == a.RONo);
              if (!dup) {
                roList.push(a);
              }
            }
          }
          return roList;
        });
    }
  }

  changeChecked() {
    if (this.data.Items) {
      for (var a of this.data.Items) {
        a.Quantity = 0;
        a.IsSave = false;
      }
    }
  }

  get totalQuantity() {
    var qty = 0;
    if (this.data.Items) {
      for (var item of this.data.Items) {
        if (!this.data.IsDifferentSize) {
          qty += item.Quantity;
        }
      }
    }
    return qty;
  }
}
