import { inject, bindable, BindingEngine } from "aurelia-framework";
import { SalesInvoiceDetail } from "./sales-invoice-detail";
import { DataForm } from "./../data-form";

@inject(SalesInvoiceDetail, DataForm, BindingEngine)
export class SpinningWeavingItem {
  @bindable QuantityItem;
  @bindable Price;
  @bindable QuantityItem;
  @bindable ConvertValue;
  @bindable ConvertUnit;

  constructor(salesInvoiceDetail, dataForm, bindingEngine) {
    this.salesInvoiceDetail = salesInvoiceDetail;
    this.dataForm = dataForm;
    this.bindingEngine = bindingEngine;
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.readOnly = context.options.readOnly;
    this.PaymentType = context.context.options.PaymentType;
    this.QuantityItem = this.data.QuantityItem;
    this.ItemUom = this.data.ItemUom;
    this.ConvertValue = this.data.ConvertValue;
    this.ConvertUnit = this.data.ConvertUnit;
    this.Price = this.data.Price;
    this.getAmount = this.data.Amount;
  }

  packingUomOptions = [
    "",
    "PCS",
    "ROLL",
    "BALL",
    "PT",
  ];

  itemUomOptions = [
    "",
    "MTR",
    "YARD",
  ];

  PriceChanged(newValue, oldValue) {
    if (this.PaymentType == "MTR") {
      this.getAmount = this.QuantityItem * this.Price;
      this.data.Amount = this.getAmount;
      this.data.Price = this.Price;
    } else if (this.PaymentType == "YARD") {
      this.getAmount = this.ConvertValue * this.Price;
      this.data.Amount = this.getAmount;
      this.data.Price = this.Price;
    } else {
      this.getAmount = 0;
      this.data.Amount = this.getAmount;
      this.data.Price = this.Price;
    }
  }

  AmountChanged(newValue, oldValue) {
    this.data.Amount = this.getAmount;
  }

  QuantityItemChanged(newValue, oldValue) {
    this.data.QuantityItem = this.QuantityItem;
    if (this.QuantityItem) {
      if (this.data.ItemUom == "MTR") {
        this.ConvertValue = parseInt(this.QuantityItem * (10936 / 10000));
        this.ConvertUnit = "YARD";
      } else if (this.data.ItemUom == "YARD") {
        this.ConvertValue = parseInt(this.QuantityItem / (10936 / 10000));
        this.ConvertUnit = "MTR";
      } else {
        this.ConvertValue = 0;
        this.ConvertUnit = null;
      }
      this.data.ConvertValue = this.ConvertValue;
      this.data.ConvertUnit = this.ConvertUnit;
    }
  }
}
