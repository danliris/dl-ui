import { inject, bindable, containerless, BindingEngine } from 'aurelia-framework'
import { Service } from "../service";
var PurchaseOrderExternalLoader = require('../../../../loader/garment-purchase-order-external-by-supplier-loader');

@containerless()
@inject(Service, BindingEngine)
export class DeliveryOrderItem {
  @bindable selectedPurchaseOrderExternal;

  itemsColumns = [
    // {
    //   field: "isSaving", checkbox: true, sortable: false,
    //   formatter: function (value, data, index) {
    //       this.checkboxEnabled = !this.isSave;
    //       return ""
    //   }
    // },
    { header: " "},
    { header: "Nomor PR" },
    { header: "Nomor Referensi PR" },
    { header: "Barang" },
    { header: "Dipesan" },
    { header: "Diterima" },
    { header: "Satuan" },
    { header: "Konversi" },
    { header: "Jumlah Kecil" },
    { header: "Satuan Kecil" },
    { header: "Harga" },
    { header: "Harga Total" },
    { header: "Mata Uang" },
    { header: "Catatan" }
  ]

  constructor(service, bindingEngine) {
    this.service = service;
    this.bindingEngine = bindingEngine;
  }

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    if(this.data && this.context.context.options.hasCreate){
      if(this.context.context.items[0].data.purchaseOrderExternal.no!=""){
          this.filter = 
          {
            "SupplierId": this.context.context.options.supplierId,
            "CurrencyCode": this.context.context.items[0].data.currency.Code,
            "PaymentType": this.context.context.items[0].data.paymentType,
            "PaymentMethod": this.context.context.items[0].data.paymentMethod,
            "IsUseVat": this.context.context.items[0].data.useVat,
            "IsIncomeTax": this.context.context.items[0].data.useIncomeTax,
            "IncomeTaxName": this.context.context.items[0].data.incomeTax.Name,
            "IncomeTaxRate": this.context.context.items[0].data.incomeTax.Rate,
          } 
          for(var item of this.context.context.items){
            this.filter[`EPONo == "${item.data.purchaseOrderExternal.no}"`]=false;
          }
          
      }
      else {
        this.filter = this.context.context.options.supplierId ? 
        { 
          "SupplierId": this.context.context.options.supplierId
        } : {};
      }
    } else {
      if(this.context.context.items[0].data.purchaseOrderExternal.no!=""){
        this.filter = 
        {
          "SupplierId": this.context.context.options.supplierId,
          "CurrencyCode": this.context.context.items[0].data.currency.Code,
          "PaymentType": this.context.context.options.paymentType,
          "PaymentMethod": this.context.context.options.paymentMethod,
          "IsUseVat": this.context.context.options.isUseVat,
          "IsIncomeTax": this.context.context.options.isIncomeTax,
          "IncomeTaxName": this.context.context.options.incomeTaxName,
          "IncomeTaxRate": this.context.context.options.incomeTaxRate,
        } 
        for(var item of this.context.context.items){
          this.filter[`EPONo == "${item.data.purchaseOrderExternal.no}"`]=false;
        }
      }
      else {
        this.filter = this.context.context.options.supplierId ? 
        { 
          "SupplierId": this.context.context.options.supplierId
        } : {};
      }
    }
    
    this.isEdit = this.context.options.isEdit || false;
    this.isShowing = false;
    this.isSave = false;
    if (this.data) {
      this.selectedPurchaseOrderExternal = this.data.purchaseOrderExternal.no;
      if (this.data.fulfillments) {
        this.isShowing = true;
        for(var fulfillments of this.data.fulfillments){
          fulfillments.currency=this.data.currency;
        }
      }
    }
  }

  get purchaseOrderExternalLoader() {
    return PurchaseOrderExternalLoader;
  }

  async selectedPurchaseOrderExternalChanged(newValue) {
    if (newValue === null) {
      this.data.fulfillments = [];
      this.error = {};
      this.isShowing = false;
    } else if (newValue && this.context.context.options.hasCreate) {
      this.data.purchaseOrderExternal.no = newValue.EPONo;
      this.data.purchaseOrderExternal.Id = newValue.Id;
      this.data.paymentType = newValue.PaymentType;
      this.data.paymentMethod = newValue.PaymentMethod;
      this.data.paymentDueDays = newValue.PaymentDueDays;
      this.data.currency={};
      this.data.currency.Id = newValue.Currency.Id;
      this.data.currency.Code = newValue.Currency.Code;
      this.data.useVat = newValue.IsUseVat;
      this.data.useIncomeTax = newValue.IsIncomeTax;
      this.data.incomeTax={};
      if(this.data.useIncomeTax==true){
        this.data.incomeTax.Id = newValue.IncomeTax.Id;
        this.data.incomeTax.Name = newValue.IncomeTax.Name;
        this.data.incomeTax.Rate = newValue.IncomeTax.Rate;
      } else {
        this.data.incomeTax={};
      }
      
      for(var item of newValue.Items){
        var fulfillment = {
          ePOItemId : item.Id,
          pOId : item.POId,
          pONo : item.PONo,
          pRId : item.PRId,
          pRNo : item.PRNo,
          poSerialNumber : item.PO_SerialNumber,
          product : item.Product,
          doQuantity : item.DOQuantity,
          dealQuantity : item.DealQuantity,
          conversion : item.Conversion,
          smallQuantity : item.SmallQuantity,
          pricePerDealUnit : item.PricePerDealUnit,
          rONo : item.RONo,
          currency : newValue.Currency,
          product : item.Product,
          smallUom : item.SmallUom,
          purchaseOrderUom : item.DealUom,
          isSave : false,
        };
        this.data.fulfillments.push(fulfillment);
      }
        this.isShowing = true;
    } else if (newValue && (this.context.context.options.hasView || this.context.context.options.hasEdit)) {
      this.data.purchaseOrderExternal.no = newValue.EPONo;
      this.data.purchaseOrderExternal.Id = newValue.Id;
      
      for(var item of newValue.Items){
        var fulfillment = {
          ePOItemId : item.Id,
          pOId : item.POId,
          pONo : item.PONo,
          pRId : item.PRId,
          pRNo : item.PRNo,
          poSerialNumber : item.PO_SerialNumber,
          product : item.Product,
          doQuantity : item.DOQuantity,
          dealQuantity : item.DealQuantity,
          conversion : item.Conversion,
          smallQuantity : item.SmallQuantity,
          pricePerDealUnit : item.PricePerDealUnit,
          rONo : item.RONo,
          currency : newValue.currency,
          product : item.Product,
          smallUom : item.SmallUom,
          purchaseOrderUom : item.DealUom,
        };
        this.data.fulfillments.push(fulfillment);
      }
        this.isShowing = true;
    }
  }

  toggle() {
    if (!this.isShowing)
      this.isShowing = true;
    else
      this.isShowing = !this.isShowing;
  }

  purchaseOrderExternalView = (purchaseOrderExternal) => {
    return purchaseOrderExternal.EPONo
  }

  removeItems = function () {
    this.bind();
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}