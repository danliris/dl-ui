import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
var moment = require('moment');
import { Service } from './service';
import { PackingItem } from '../../inventory/packing-receipt/template/packing-item';

var BuyersLoader = require("../../../loader/buyers-loader");
var ComodityLoader = require("../../../loader/comodity-loader");
var OrderTypeLoader = require("../../../loader/order-type-loader");
var MaterialConstructionLoader = require("../../../loader/material-loader");
var MaterialLoader = require("../../../loader/product-loader");
var YarnMaterialLoader = require("../../../loader/yarn-material-loader");
var DesignMotiveLoader = require("../../../loader/design-motive-loader");
var UomLoader = require("../../../loader/uom-loader");
var QualityLoader = require("../../../loader/quality-loader");
var TermOfPaymentLoader = require("../../../loader/term-of-payment-loader");
var AccountBankLoader = require("../../../loader/account-banks-loader");

@inject(BindingEngine, Service, Element)
export class DataForm {
  @bindable isCreate = false;

  @bindable readOnly = false;
  @bindable data = {};
  @bindable error = {};

  lampHeader = [{ header: "Standar Lampu" }];

  pointSystemOptions = [10, 4];

  filterMaterial = {
    "tags": { "$in": ["MATERIAL", "material", "Material"] }
  };

  filterpayment = {
    "isExport": false
  };

  constructor(bindingEngine, service, element) {
    this.bindingEngine = bindingEngine;
    this.element = element;
    this.service = service;
  }

  bind(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;

    this.selectedBuyer = this.data.buyer || null;
    this.selectedComodity = this.data.comodity || null;
    this.selectedOrderType = this.data.orderType || null;
    this.selectedMaterial = this.data.material || null;
    this.selectedMaterialConstruction = this.data.materialConstruction || null;
    this.selectedYarnMaterial = this.data.yarnMaterial || null;
    this.selectedDesignMotive = this.data.designMotive || null;
    this.selectedUom = this.data.uom || null;
    this.selectedQuality = this.data.quality || null;
    this.selectedTermOfPayment = this.data.termOfPayment || null;
    this.selectedAccountBank = this.data.accountBank || null;
    this.selectedAgent = this.data.agent || null;

  }

  isExport = false;
  @bindable selectedBuyer;
  selectedBuyerChanged(newValue, oldValue) {
    if (this.selectedBuyer && this.selectedBuyer._id) {
      this.data.buyerId = this.selectedBuyer._id
      this.data.buyer = this.selectedBuyer;
      if (this.selectedBuyer.type.toLowerCase() == "ekspor" || this.selectedBuyer.type.toLowerCase() == "export") {
        this.filterpayment = {
          "isExport": true
        };
        this.isExport = true;
      }
      else {
        this.filterpayment = {
          "isExport": false
        };
        this.isExport = false;
      }

    } else {
      this.isExport = false;
      this.data.fromStock = false;
      this.data.dispositionNumber = "";
      this.data.buyerId = "";
      this.data.buyer = {};
      this.data.comodityDescription = "";
      this.isPrinting = false;
      this.data.materialWidth = "";
      this.data.orderQuantity = 0;
      this.data.shippingQuantityTolerance = 0;
      this.data.amount = 0;
      this.data.pieceLength = "";
      this.data.packing = "";
      this.data.useIncomeTax = false;
      this.data.termOfShipment = "";
      this.data.transportFee = "";
      this.data.deliveredTo = "";
      this.data.deliverySchedule = "";
      this.data.shipmentDescription = "";
      this.data.condition = "";
      this.data.comission = "";
      this.data.pointSystem = 10;
      this.data.details = [];

      this.selectedBuyer = null;
      this.selectedComodity = null;
      this.selectedOrderType = null;
      this.selectedMaterial = null;
      this.selectedMaterialConstruction = null;
      this.selectedYarnMaterial = null;
      this.selectedDesignMotive = null;
      this.selectedUom = null;
      this.selectedQuality = null;
      this.selectedTermOfPayment = null;
      this.selectedAccountBank = null;
      this.selectedAgent = null;
    }
  }

  useIncomeTaxChanged(e) {
    if (this.isCreate) {
      this.data.details = [];
    }
  }

  @bindable selectedComodity
  selectedComodityChanged(newValue, oldValue) {
    if (this.selectedComodity && this.selectedComodity._id) {
      this.data.comodityId = this.selectedComodity._id;
      this.data.comodity = this.selectedComodity;
    } else {
      this.data.comodityId = "";
      this.data.comodity = {};
    }
  }

  isPrinting = false;
  @bindable selectedOrderType;
  selectedOrderTypeChanged(newValue, oldValue) {
    if (this.selectedOrderType && this.selectedOrderType._id) {
      this.data.orderTypeId = this.selectedOrderType._id;
      this.data.orderType = this.selectedOrderType;

      if (this.data.orderType.name.toLowerCase() === "printing") {
        this.isPrinting = true;
      }

    } else {
      this.data.orderType = {};
      this.data.orderTypeId = "";
      this.isPrinting = false;
    }
  }

  @bindable selectedMaterial;
  selectedMaterialChanged(newValue, oldValue) {
    if (this.selectedMaterial && this.selectedMaterial._id) {
      this.data.materialId = this.selectedMaterial._id;
      this.data.material = this.selectedMaterial;
    } else {
      this.data.materialId = "";
      this.data.material = {};
    }
  }

  @bindable selectedMaterialConstruction
  selectedMaterialConstructionChanged(newValue, oldValue) {
    if (this.selectedMaterialConstruction && this.selectedMaterialConstruction._id) {
      this.data.materialConstructionId = this.selectedMaterialConstruction._id;
      this.data.materialConstruction = this.selectedMaterialConstruction;
    } else {
      this.data.materialConstructionId = "";
      this.data.materialConstruction = {};
    }
  }

  @bindable selectedYarnMaterial;
  selectedYarnMaterialChanged(newValue, oldValue) {
    if (this.selectedYarnMaterial && this.selectedYarnMaterial._id) {
      this.data.yarnMaterialId = this.selectedYarnMaterial._id;
      this.data.yarnMtarial = this.selectedYarnMaterial;
    } else {
      this.data.yarnMaterialId = "";
      this.data.yarnMaterial = {};
    }
  }

  @bindable selectedDesignMotive;
  selectedDesignMotiveChanged(newValue, oldValue) {
    if (this.selectedDesignMotive && this.selectedDesignMotive._id) {
      this.data.designMotiveId = this.selectedDesignMotive._id;
      this.data.designMotive = this.selectedDesignMotive;
    } else {
      this.data.designMotiveId = "";
      this.data.designMotive = {};
    }
  }

  @bindable selectedUom;
  selectedUomChanged(newValue, oldValue) {
    if (this.selectedUom && this.selectedUom._id) {
      this.data.uomId = this.selectedUom._id;
      this.data.uom = this.selectedUom;
    } else {
      this.data.uomId = "";
      this.data.uom = {};
    }
  }

  @bindable selectedQuality
  selectedQualityChanged(newValue, oldValue) {
    if (this.selectedQuality && this.selectedQuality._id) {
      this.data.qualityId = this.selectedQuality._id;
      this.data.quality = this.selectedQuality;
    } else {
      this.data.qualityId = "";
      this.data.quality = {};
    }
  }

  @bindable selectedTermOfPayment;
  selectedTermOfPaymentChanged(newValue, oldValue) {
    if (this.selectedTermOfPayment && this.selectedTermOfPayment._id) {
      this.data.termOfPaymentId = this.selectedTermOfPayment._id;
      this.data.termOfPayment = this.selectedTermOfPayment;
    } else {
      this.data.termOfPaymentId = "";
      this.data.termOfPayment = {};
    }
  }

  @bindable isExistAccountBank = false;
  @bindable selectedAccountBank;
  selectedAccountBankChanged(newValue, oldValue) {
    if (this.selectedAccountBank && this.selectedAccountBank._id) {
      this.data.accountBankId = this.selectedAccountBank._id;
      this.data.accountBank = this.selectedAccountBank;
      this.isExistAccountBank = true;
    } else {
      this.data.accountBankId = "";
      this.data.accountBank = {};
      this.isExistAccountBank = false;
    }
  }

  @bindable selectedAgent;
  selectedAgentChanged(newValue, oldValue) {
    if (this.selectedAgent && this.selectedAgent._id) {
      this.data.agentId = this.selectedAgent._id;
      this.data.agent = this.selectedAgent;
    } else {
      this.data.agentId = "";
      this.data.agent = {};
    }
  }

  @computedFrom("data.pointSystem")
  get isFourPointSystem() {
    if (this.data.pointSystem === 4) {
      return true;
    } else {
      return false;
    }
  }

  get detailHeader() {
    if (!this.data.useIncomeTax) {
      return [{ header: "Warna" }, { header: "Harga" }, { header: "Mata Uang" }];
    }
    else {
      return [{ header: "Warna" }, { header: "Harga" }, { header: "Mata Uang" }, { header: "Include PPn?" }];
    }
  }

  get addDetail() {
    return (event) => {
      var newDetail = {
        currency: this.data.accountBank.currency,
        color: '',
        price: 0,
        UseIncomeTax: false
      };
      this.context.FPCollection.bind();
      this.data.details.push(newDetail);
    };
  }

  get addDetailTax() {
    return (event) => {
      var newDetail = {
        currency: this.data.accountBank.currency,
        color: '',
        price: 0,
        UseIncomeTax: false
      };
      this.context.FPCollectionTax.bind();
      this.data.details.push(newDetail);
    };
  }

  get buyerLoader() {
    return BuyersLoader;
  }

  buyerView(buyer) {
    return buyer.name ? `${buyer.code} - ${buyer.name}` : '';
  }

  get comodityLoader() {
    return ComodityLoader;
  }

  get orderTypeLoader() {
    return OrderTypeLoader;
  }

  get materialLoader() {
    return MaterialLoader;
  }

  get materialConstructionLoader() {
    return MaterialConstructionLoader;
  }

  get yarnMaterialLoader() {
    return YarnMaterialLoader;
  }

  get designMotiveLoader() {
    return DesignMotiveLoader;
  }

  get uomLoader() {
    return UomLoader;
  }

  get qualityLoader() {
    return QualityLoader;
  }

  get termOfPaymentLoader() {
    return TermOfPaymentLoader;
  }

  get accountBankLoader() {
    return AccountBankLoader;
  }

  bankView(bank) {
    return bank.accountName ? `${bank.accountName} - ${bank.bankName} - ${bank.accountNumber} - ${bank.currency.code}` : '';
  }

  controlOptions = {
    label: {
      length: 4
    },
    control: {
      length: 7,
      align: "right"
    }
  }

  //#region old

  // @computedFrom("data.accountBank")
  // get isExistAccountBank() {
  //   if (this.data.accountBank && this.data.accountBank.bankName) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // @computedFrom("data.dataId")
  // get isEdit() {
  //   return (this.data.dataId || '').toString() != '';
  // }

  // @computedFrom("data.orderType")
  // get isPrinting() {
  //   this.printing = false;
  //   if (this.data.orderType) {
  //     if (this.data.orderType.name.toLowerCase() == "printing") {
  //       this.printing = true;
  //     }
  //   }

  //   return this.printing;
  // }

  // @computedFrom("data.pointSystem")
  // get point() {
  //   this.pointSyst = false;
  //   if (this.data.pointSystem === 4) {
  //     this.pointSyst = true;
  //   }
  //   return this.pointSyst;
  // }



  // @computedFrom("data.buyer")
  // get buyerType() {
  //   this.ekspor = false;
  //   if (this.data.buyer) {
  //     if (this.data.buyer.type.toLowerCase() == "ekspor" || this.data.buyer.type.toLowerCase() == "export") {
  //       this.ekspor = true;
  //     }
  //   }
  //   return this.ekspor;
  // }

  // @computedFrom("data.buyer")
  // get isFilterPayment() {
  //   this.filterpayment = {
  //     "isExport": false
  //   };
  //   if (this.data.buyer) {
  //     if (this.data.buyer.type.toLowerCase() == "ekspor" || this.data.buyer.type.toLowerCase() == "export") {
  //       this.filterpayment = {
  //         "isExport": true
  //       };
  //     }
  //   }
  //   return this.filterpayment;
  // }

  // orderChanged(e) {
  //   var selectedOrder = e.detail || {};
  //   if (selectedOrder) {
  //     this.data.orderTypeId = selectedOrder._id ? selectedOrder._id : "";
  //     if (!this.readOnly) {
  //       this.data.designMotive = {};
  //       this.designMotiveChanged({});
  //     }
  //   }
  // }

  // materialChanged(e) {
  //   var selectedMaterial = e.detail || {};
  //   if (selectedMaterial) {
  //     this.data.materialId = selectedMaterial._id ? selectedMaterial._id : "";
  //   }
  // }

  // designMotiveChanged(e) {
  //   var selectedMotive = e.detail || {};
  //   if (selectedMotive) {
  //     this.data.designMotiveId = selectedMotive._id ? selectedMotive._id : "";
  //   }
  // }

  // constructionChanged(e) {
  //   var selectedConstruction = e.detail || {};
  //   if (selectedConstruction) {
  //     this.data.materialConstructionId = selectedConstruction._id ? selectedConstruction._id : "";
  //   }
  // }

  // termOfPaymentChanged(e) {
  //   var selectedPayment = e.detail || {};
  //   if (selectedPayment) {
  //     this.data.termOfPaymentId = selectedPayment._id ? selectedPayment._id : "";
  //   }

  // }

  // referenceNumberChanged(e) {
  //   var selectedReference = e.detail || {};
  //   if (selectedReference) {
  //     this.data.referenceNumber = selectedReference.orderNo ? selectedReference.orderNo : "";
  //   }
  // }

  // uomChanged(e) {
  //   var selectedUom = e.detail;
  //   if (selectedUom) {
  //     this.data.uomId = selectedUom._id;
  //     if (this.data.details) {
  //       for (var i of this.data.details) {
  //         i.uom = selectedUom;
  //         i.uomId = selectedUom._id;
  //       }
  //     }
  //   }
  // }

  // agentChanged(e) {
  //   var selectedAgent = e.detail || {};
  //   if (selectedAgent) {
  //     this.data.agentId = selectedAgent._id ? selectedAgent._id : "";
  //     if (!this.readOnly) {
  //       this.data.comission = "";
  //     }
  //   }
  //   else {
  //     this.data.comission = "";
  //   }
  // }

  // yarnChanged(e) {
  //   var selectedYarn = e.detail || {};
  //   if (selectedYarn) {
  //     this.data.yarnMaterialId = selectedYarn._id ? selectedYarn._id : "";
  //   }
  // }

  // bankChanged(e) {
  //   debugger
  //   var selectedAccount = e.detail || {};
  //   if (selectedAccount) {
  //     this.data.accountBankId = selectedAccount._id ? selectedAccount._id : "";
  //   }
  // }

  // useIncomeTaxChanged(e) {
  //   this.data.details.length = 0;
  // }

  // qualityChanged(e) {
  //   var selectedQuality = e.detail || {};
  //   if (selectedQuality) {
  //     this.data.qualityId = selectedQuality._id ? selectedQuality._id : "";
  //   }
  // }

  //#endregion old

}
