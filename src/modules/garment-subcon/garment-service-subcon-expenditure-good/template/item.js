import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service, PurchasingService } from "../service";

var UnitLoader = require('../../../../loader/garment-units-loader');

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

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.context.options;
    this.data.IsDifferentSize = false;
    this.readOnly = context.options.readOnly;
    this.isCreate = context.context.options.isCreate;
    this.isEdit = context.context.options.isEdit;
    this.isView = context.context.options.isView;
    this.items = this.context.context.items;

    this.itemOptions = {
      error: this.error,
      isCreate: this.isCreate,
      isEdit: this.isEdit,
      readOnly: this.readOnly,
      isView: this.isView
    };


    if (this.data.RONo) {
      this.selectedRO = {
        RONo: this.data.RONo
      }
    }
  }



  comodityView = (comodity) => {
    return `${comodity.Code} - ${comodity.Name}`
  }

  comodityView = (comodity) => {
    return `${comodity.Code} - ${comodity.Name}`
  }

  ROView = (ro) => {
    return `${ro.RONo}`;
  }

  async selectedROChanged(newValue, oldValue) {
    if (this.isCreate) {
      if (newValue) {

        this.data.FinishingGoodStockId = newValue.Id;
        this.data.RONo = newValue.RONo;
        this.data.Article = newValue.Article;
        this.data.Comodity = newValue.Comodity;
        this.data.Unit = newValue.Unit;
        this.data.UomUnit = newValue.Uom.Unit;
        this.data.StockQuantity = newValue.Quantity;
        this.data.BasicPrice = newValue.BasicPrice;

      }
      else {
        this.context.selectedROViewModel.editorValue = "";
        this.data.RONo = null;
        this.data.Article = null;
        this.data.Comodity = null;
        this.data.Unit = null;
      }

    }
  }

  get unitLoader() {
    return UnitLoader;
  }
  unitView = (unit) => {

    return `${unit.Code} - ${unit.Name}`
  }

  get roLoader() {
    return (keyword) => {
      var info = {
        keyword: keyword,
        filter: JSON.stringify({})
      };
      return this.service.searchFinishedGoodStockByRo(info)
        .then((result) => {
          var roList = [];
          for (var a of result.data) {
            if (roList.length == 0) {
              var dupROs = this.items.find(s => s.data.RONo == a.RONo);
              if (!dupROs) {
                roList.push(a);
              }
            }
            else {
              var dup = roList.find(d => d.RONo == a.RONo);
              if (!dup) {
                var dupROs = this.items.find(s => s.data.RONo == a.RONo);
                if (!dupROs) {
                  roList.push(a);
                }

              }
            }
          }
          return roList;
        });
    }
  }

}
