import {
  inject,
  bindable,
  containerless,
  computedFrom,
  BindingEngine,
} from "aurelia-framework";
import { Service } from "./service";

@inject(Service)
export class DataForm {
  constructor(service) {
    this.service = service;
  }

  @bindable readOnly = false;
  @bindable title;

  controlOptions = {
    label: {
      length: 3,
    },
    control: {
      length: 5,
    },
  };

  footerOptions = {
    label: {
      length: 3,
    },
    control: {
      length: 2,
    },
  };

  itemsColumns = [
    { header: "Bon Masuk", value: "AvalReceiptNo" },
    { header: "Jumlah Awal", value: "Quantity" },
    { header: "Satuan", value: "UomUnit" },
  ];
  expenditureOptions = ["PEMILIK BARANG", "LAINNYA"];
  wasteOptions = ["AVAL"];
  sourceName = "GUDANG AVAL";
  bcTypeOptions = ["BC 41", "BC 27"];

  bind(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;

    this.Options = {
      isCreate: this.context.isCreate,
      isView: this.context.isView,
      isEdit: this.context.isEdit,
    };
    // for (var item of this.data.Items) {
    //     item.type = this.data.AvalType;
    // }
    // this.selectedType = this.data.AvalType;
    // if (this.data.Id) {
    //     this.existingItems = this.data.Items.map(i => {
    //         return {
    //             StockId: i.StockId,
    //             Quantity: i.Quantity
    //         };
    //     });
    //     this.Options.existingItems = this.existingItems;
    //     if (this.data.LocalSalesNoteId) {
    //         this.selectedSalesNote = {
    //             noteNo: this.data.LocalSalesNoteNo,
    //             id: this.data.LocalSalesNoteId
    //         };
    //         // this.selectedUnit = {
    //         //     Code: this.data.UnitExpenditure.Code,
    //         //     Name: this.data.UnitExpenditure.Name
    //         // };
    //         this.manual = false;
    //     }
    //     else {
    //         this.manual = true;
    //     }

    // }
  }

  get addItems() {
    return (event) => {
      this.data.Items.push({
        type: this.data.WasteType,
      });
    };
  }

  get removeItems() {
    return (event) => {
      this.error = null;
      //this.Options.error = null;
    };
  }

  get totalQuantity() {
    if (this.data.Items) {
      var qty = 0;
      for (var item of this.data.Items) {
        qty += item.Quantity;
      }
      return qty;
    }
  }
}
