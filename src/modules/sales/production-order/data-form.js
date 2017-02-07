import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
var moment = require('moment');
import { Service } from './service';

@inject(BindingEngine, Element, Service)
export class DataForm {
  @bindable readOnly = false;
  @bindable data = {};
  @bindable error = {};

  lampHeader = [{ header: "Lamp Standard" }]
  detailHeader = [{ header: "Acuan Warna/Desain" }, { header: "Warna Yang Diminta" }, { header: "Jenis Warna" }, { header: "Jumlah" }, { header: "Satuan" }]

  RUNOptions = ['Tanpa RUN', '1 RUN', '2 RUN', '3 RUN', '4 RUN'];

  constructor(bindingEngine, element, service) {
    this.bindingEngine = bindingEngine;
    this.element = element;
    this.service = service;

  }

  @computedFrom("data.dataId")
  get isEdit() {
    return (this.data.dataId || '').toString() != '';
  }

  get isPrinting() {
    this.printing = false;
    if (this.data.orderType) {
      if (this.data.orderType.name.trim().toLowerCase() == "printing" || this.data.orderType.name.trim().toLowerCase() == "yarndyed") {
        this.printing = true;
      }
    }
    return this.printing;
  }

  orderChanged(e) {
    var selectedOrder = e.detail || {};
    if (selectedOrder) {
      this.data.orderTypeId = selectedOrder._id ? selectedOrder._id : "";
      var code = selectedOrder.code;
      if (!this.readOnly) {
        this.data.processType = {};
        this.processChanged({});
        this.data.details = [];
      }
      if (this.data.orderType && code) {
        this.filterOrder = {
          "orderType.code": code
        };
      }
      if (this.data.orderType) {
        if (this.data.orderType.name.trim().toLowerCase() == "printing" || this.data.orderType.name.trim().toLowerCase() == "yarndyed") {
          this.printing = true;
        }
        else {
          this.printing = false;
        }
        if (this.data.orderType.name.trim().toLowerCase() == "printing") {
          this.printingOnly = true;
        }
        else {
          this.printingOnly = false;
        }
      }
    }
    else {
      if (!this.readOnly) {
        this.data.processType = {};
        this.processChanged({});
        this.data.details = [];
      }
      var code = this.data.orderType.code;
      if (this.data.orderType && code) {
        this.filterOrder = {
          "orderType.code": code
        };
      }
      if (this.data.orderType) {
        if (this.data.orderType.name.trim().toLowerCase() == "printing" || this.data.orderType.name.trim().toLowerCase() == "yarndyed") {
          this.printing = true;
        }
        else {
          this.printing = false;
        }
        if (this.data.orderType.name.trim().toLowerCase() == "printing") {
          this.printingOnly = true;
        }
        else {
          this.printingOnly = false;
        }
      }

    }
  }

  processChanged(e) {
    var selectedProcess = e.detail || {};
    if (selectedProcess) {
      this.data.processTypeId = selectedProcess._id ? selectedProcess._id : "";
    }

  }

  materialChanged(e) {
    var selectedMaterial = e.detail || {};
    if (selectedMaterial) {
      this.data.materialId = selectedMaterial._id ? selectedMaterial._id : "";
    }
  }

  constructionChanged(e) {
    var selectedConstruction = e.detail || {};
    if (selectedConstruction) {
      this.data.materialConstructionId = selectedConstruction._id ? selectedConstruction._id : "";
    }
  }

  uomChanged(e) {
    var selectedUom = e.detail;
    if (selectedUom) {
      this.data.uomId = selectedUom._id;
      if (this.data.details) {
        for (var i of this.data.details) {
          i.uom = selectedUom;
          i.uomId = selectedUom._id;
        }
      }
    }
  }

  buyerChanged(e) {
    var selectedBuyer = e.detail;
    if (selectedBuyer) {
      this.data.buyerId = selectedBuyer._id ? selectedBuyer._id : "";
    }
  }

  yarnChanged(e) {
    var selectedYarn = e.detail || {};
    if (selectedYarn) {
      this.data.yarnMaterialId = selectedYarn._id ? selectedYarn._id : "";
    }
  }

  finishTypeChanged(e) {
    var selectedFinish = e.detail || {};
    if (selectedFinish) {
      this.data.finishTypeId = selectedFinish._id ? selectedFinish._id : "";
    }
  }

  RUNChanged(e) {
    var selectedRUN = e.srcElement.value;
    if (selectedRUN) {
      this.data.runWidth = this.data.runWidth ? this.data.runWidth : [];
      if (selectedRUN == "Tanpa RUN") {
        this.run = false;
      }
      if (selectedRUN == "1 RUN") {
        this.run = true;
        this.run0 = true;
        this.run1 = false;
        this.run2 = false;
        this.run3 = false;
      }
      if (selectedRUN == "2 RUN") {
        this.run = true;
        this.run0 = true;
        this.run1 = true;
        this.run2 = false;
        this.run3 = false;
      }
      if (selectedRUN == "3 RUN") {
        this.run = true;
        this.run0 = true;
        this.run1 = true;
        this.run2 = true;
        this.run3 = false;
      }
      if (selectedRUN == "4 RUN") {
        this.run = true;
        this.run0 = true;
        this.run1 = true;
        this.run2 = true;
        this.run3 = true;
      }
    }
  }

  standardTestChanged(e) {
    var selectedTest = e.detail || {};
    if (selectedTest) {
      this.data.standardTestId = selectedTest._id ? selectedTest._id : "";
    }
  }

  accountChanged(e) {
    var selectedAccount = e.detail || {};
    if (selectedAccount) {
      this.data.accountId = selectedAccount._id ? selectedAccount._id : "";
    }
  }
  // NEW CODE
  bind() {
    this.data = this.data || {};
    this.data.lampStandards = this.data.lampStandards || [];
    this.data.details = this.data.details || [];
  }

  get addLamp() {
    return (event) => {
      this.data.lampStandards.push({ lampStandard: {}, lampStandardId: {} });
    };
  }

  get removeLamp() {
    return (event) => console.log(event);
  }

  get addDetail() {
    return (event) => {
      var newDetail = {
        uom: this.data.uom,
        uomId: this.data.uom._id,
        colorRequest: '',
        colorTemplate: '',
        colorType: { toString: function () { return '' } },
        colorTypeId: { toString: function () { return '' } },
        quantity: 0
      };

      this.data.details.push(newDetail);
    };
  }
}
