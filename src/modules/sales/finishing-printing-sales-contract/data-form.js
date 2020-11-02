import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
import { Service } from './service';

import BuyersLoader from "../../../loader/buyers-loader";
import ComodityLoader from "../../../loader/comodity-loader";
import OrderTypeLoader from "../../../loader/order-type-loader";
import MaterialConstructionLoader from "../../../loader/material-loader";
import MaterialLoader from "../../../loader/product-loader";
import YarnMaterialLoader from "../../../loader/yarn-material-loader";
import DesignMotiveLoader from "../../../loader/design-motive-loader";
import UomLoader from "../../../loader/uom-loader";
import QualityLoader from "../../../loader/quality-loader";
import TermOfPaymentLoader from "../../../loader/term-of-payment-loader";
import AccountBankLoader from "../../../loader/account-banks-loader";

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

  materialQuery = {
    "Tags" : "MATERIAL"
  }

  constructor(bindingEngine, service, element) {
    this.bindingEngine = bindingEngine;
    this.element = element;
    this.service = service;
  }

  bind(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.itemsOptions = {
      useIncomeTax: this.data.UseIncomeTax || false
    };

    this.selectedBuyer = this.data.Buyer || null;
    this.selectedOrderType = this.data.OrderType || null;
    this.selectedAccountBank = this.data.AccountBank || null;
    this.selectedUseIncomeTax = this.data.UseIncomeTax || false;
    this.selectedPointSystem = this.data.PointSystem || 10;
    console.log(context);
  }

  isExport = false;
  @bindable selectedBuyer;
  selectedBuyerChanged(newValue, oldValue) {
    this.data.Buyer = newValue;
    if (newValue) {
      if (newValue.Type.toLowerCase() == "ekspor" || newValue.Type.toLowerCase() == "export") {
        this.filterpayment = {
          "isExport": true
        };
        this.isExport = true;
      } else {
        this.filterpayment = {
          "isExport": false
        };
        this.isExport = false;
      }

    } else {
      this.isExport = false;
      this.data.FromStock = false;
      this.data.DispositionNumber = "";
      this.data.Commodity = null;
      this.data.CommodityDescription = "";
      this.selectedOrderType = null;
      this.data.Material = null;
      this.data.MaterialConstruction = null;
      this.data.YarnMaterial = null;
      this.data.MaterialWidth = 0;
      this.data.DesignMotive = null;
      this.data.OrderQuantity = 0;
      this.data.UOM = null;
      this.data.ShippingQuantityTolerance = 0;
      this.data.Amount = 0;
      this.data.Quality = null;
      this.data.PieceLength = "";
      this.data.Packing = "";
      this.selectedUseIncomeTax = false;
      this.data.TermOfPayment = null;
      this.selectedAccountBank = null;
      this.data.Agent = null;
      this.data.TransportFee = "";
      this.data.DeliveredTo = "";
      this.data.DeliverySchedule = null;
      this.data.ShipmentDescription = "";
      this.data.Condition = "";
      this.data.Commision = "";
      this.data.PointSystem = 10;
      this.data.PointLimit = 0;
      this.data.Details = [];
    }
  }

  @bindable selectedUseIncomeTax = false;
  selectedUseIncomeTaxChanged(newValue, oldValue) {
    this.data.UseIncomeTax = newValue
    this.data.Details.map((detail) => {
      detail.isUseIncomeTax = newValue
    })
    this.context.FPCollection.bind();
  }

  isPrinting = false;
  @bindable selectedOrderType;
  selectedOrderTypeChanged(newValue, oldValue) {
    this.data.OrderType = newValue;
    if (newValue) {
      if (newValue.Unit && newValue.Unit.toLowerCase() === "printing") {
        this.isPrinting = true;
      }
    } else {
      this.isPrinting = false;
    }
  }

  @bindable isExistAccountBank = false;
  @bindable selectedAccountBank;
  selectedAccountBankChanged(newValue, oldValue) {
    if (newValue) {
      this.data.AccountBank = this.selectedAccountBank;
      this.isExistAccountBank = true;
    } else {
      this.data.AccountBank = null;
      this.isExistAccountBank = false;
    }
  }

  @bindable selectedPointSystem;
  isFourPointSystem = false;
  selectedPointSystemChanged(newValue, oldValue) {
    this.data.PointSystem = newValue;
    if (newValue) {
      if (newValue == 4) {
        this.isFourPointSystem = true;
      } else {
        this.isFourPointSystem = false;
      }
    } else {
      this.isFourPointSystem = false
    }
  }

  get detailHeader() {
    if (!this.data.UseIncomeTax) {
      return [{ header: "Warna" }, { header: "Harga" }, { header: "Mata Uang" }];
    }
    else {
      return [{ header: "Warna" }, { header: "Harga" }, { header: "Mata Uang" }, { header: "Include PPn?" }];
    }
  }

  itemsInfo = {
    onAdd: function () {
      this.data.Details.push({
        Currency: this.data.AccountBank.Currency,
        Color: '',
        Price: 0,
        UseIncomeTax: false,
        isUseIncomeTax: this.data.UseIncomeTax || false
      });
    }.bind(this)
  }

  get buyerLoader() {
    return BuyersLoader;
  }

  buyerView(buyer) {
    return buyer.Name ? `${buyer.Code} - ${buyer.Name}` : '';
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
    return bank.AccountName ? `${bank.AccountName} - ${bank.BankName} - ${bank.AccountNumber} - ${bank.Currency.Code}` : '';
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

}
