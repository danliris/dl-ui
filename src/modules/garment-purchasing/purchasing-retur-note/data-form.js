import {
  inject,
  bindable,
  containerless,
  computedFrom,
  BindingEngine,
  TaskQueue,
} from "aurelia-framework";
import { Service } from "./service";
import { AuthService } from "aurelia-authentication";
var SupplierLoader = require('../../../loader/garment-supplier-loader');
var CurrencyLoader = require('../../../loader/currency-loader');
var InvoiceNoteLoader = require('../../../loader/garment-invoice-note-loader')
import moment from "moment";

@inject(Service, BindingEngine, AuthService, TaskQueue)
export class DataForm {
  @bindable readOnly = false;
  @bindable data = {};
  @bindable error = {};
  @bindable title;
  @bindable options = {};
  @bindable invoice;
  @bindable selectedSupplier;


  controlOptions = {
    label: {
      align: "right",
      length: 5,
    },
    control: {
      length: 5,
      align: "right",
    },
  };

  constructor(service, bindingEngine, authService, taskQueue) {
    this.service = service;
    this.bindingEngine = bindingEngine;
    this.authService = authService;
    this.taskQueue = taskQueue;
    this._itemSubscriptions = new Map();
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    this.isItem = false;
    this.isEdit = this.data.Id ? true : false;

    if (!this.data.Items) {
      this.data.Items = [];
    }
    
    this.options.readOnly = this.readOnly;
    this.options.isEdit = this.isEdit;
    this.options.add = () => {
      this.addItems();
    };

    if (this.data.Currency) {
      this.currency = this.data.Currency;
    }

    if (this.data.Supplier) {
      this.selectedSupplier = this.data.Supplier;
    }

    //this.updateInvoiceFilter();
    
    this.options.Rate = (this.data.Currency && this.data.Currency.Rate) || 1;
    this.options.CurrencyCode = this.currency ? this.currency.Code : null;

    if (!this.isEdit) {
      this.addItems();
    }

    this.isItem = this.data.Items && this.data.Items.length > 0;

    // Single subscription for items changes
    this.itemsSubscription = this.bindingEngine.collectionObserver(this.data.Items).subscribe(() => {
      this.updateDataFromItems();
    });
    
    this.subscribeToItems();
    
    // Initial calculation
    this.updateDataFromItems();
  
  }

  updateDataFromItems() {
    this.data.BKPReturnPrice = this.itemSum;
    this.updateTaxCalculations();
  }

  subscribeToItems() {
    if (this._itemSubscriptions) {
      this._itemSubscriptions.forEach(sub => sub.dispose());
      this._itemSubscriptions.clear();
    }
    
    if (this.data.Items) {
      this.data.Items.forEach((item, index) => {
        const subscription = this.bindingEngine.propertyObserver(item, 'TotalPrice').subscribe(() => {
          this.updateDataFromItems();
        });
        this._itemSubscriptions.set(index, subscription);
      });
    }
  }

  addItems() {
    if (!this.data.Items) {
      this.data.Items = [];
    }
    var item = { 
      Quantity: 0,
      TotalPrice: 0,
      PricePerUnit: 0,
      IsNew: true
    };
    this.data.Items.push(item);
    this.subscribeToItems();
  }



  get items() {
    return { 
      columns: ["Rincian", "Kuantum", "Satuan","Harga Satuan", "Harga Jual"] 
    };
  }

  @computedFrom('data.Items')
  get itemSum() {
    if (this.data.Items && this.data.Items.length > 0) {
      return this.data.Items.reduce((sum, item) => sum + (item.TotalPrice || 0), 0);
    }
    return 0;
  }


  updateTaxCalculations() {
    const rate = (this.data.Currency && this.data.Currency.Rate) || 1;
    const currencyCode = this.options.CurrencyCode || (this.currency ? this.currency.Code : null);
    let taxBase = 0;
    
    if (currencyCode === 'IDR') {
      taxBase = (11/12) * this.itemSum;
    } else {
      taxBase = (11/12) * (rate * this.itemSum);
    }
    
    const vatReturn = taxBase * 0.12;
    
    this.data.OtherTaxBaseAmount = taxBase;
    this.data.VatToBeRefunded = vatReturn;
    this.options.OtherTaxBaseAmount = taxBase;
    this.options.VatToBeRefunded = vatReturn;
  }

  @bindable currency;
  currencyChanged(n, o) {
    const isEdit = !!this.data.Id;
    if (this.currency) {
      this.data.Currency = {
        Id: this.currency.Id,
        Code: this.currency.Code,
        Description: this.currency.Description,
        Symbol: this.currency.Symbol,
        Rate: isEdit && this.data.Currency
              ? this.data.Currency.Rate
              : null
      };

      this.options.CurrencyCode = this.currency.Code;
      
      this.subscribeToRate();
      this.taskQueue.queueMicroTask(() => {
        this.updateTaxCalculations();
      });
    } else {
      this.data.Currency = null;
    }
  }

  subscribeToRate() {
    if (this.rateSubscription) {
      this.rateSubscription.dispose();
    }
    
    if (this.data.Currency) {
      this.rateSubscription = this.bindingEngine.propertyObserver(this.data.Currency, 'Rate').subscribe(() => {
        this.options.Rate = (this.data.Currency && this.data.Currency.Rate) || 1;
        this.taskQueue.queueMicroTask(() => {
          this.updateTaxCalculations();
        });
      });
    } else {
      this.rateSubscription = null;
    }
  }

  attached() {
    this.subscribeToRate();
    
    if (this.data.VatNo && this.data.Supplier) {
      this.taskQueue.queueMicroTask(() => {
        this.invoice = {
          vatNo: this.data.VatNo,
          supplier: {
            Name: this.data.Supplier.Name
          }
        };
      });
    }
  }


  async selectedSupplierChanged(newValue, oldValue) {
    if (newValue && (newValue.Id || newValue.id)) {
      if (!this.data.Supplier) {
        this.data.Supplier = {};
      }
      this.data.Supplier.Code = newValue.code || newValue.Code;
      this.data.Supplier.Name = newValue.name || newValue.Name;
      this.data.Supplier.Id = newValue.Id || newValue.id;
      this.data.Supplier.Address = newValue.address || newValue.Address;
      this.data.Supplier.NPWP = newValue.NPWP;
      this.data.Supplier.CodeD365 = newValue.codeD365 || newValue.CodeD365;
      if (oldValue) {
        this.data.VatNo = null;
        this.invoice = null;
      }
      //this.updateInvoiceFilter();
    } else {
      this.data.Supplier = null;
      this.data.VatNo = null;
      this.invoice = null;
      this.filter = {};
    }
  }

  
  // invoiceChanged(newValue) {
  //   if (newValue && newValue.vatNo) {
  //     this.data.VatNo = newValue.vatNo || this.data.VatNo;
  //   }
  // }

  // updateInvoiceFilter() {
  //   const supplierId = (this.data.Supplier && (this.data.Supplier.Id || this.data.Supplier.id)) || this.options.supplierId;
    
  //   this.filter = supplierId ? {
  //     "supplierId": supplierId,
  //     "IsDeleted": false
  //   } : {};
  // }

  get supplierLoader() {
    return SupplierLoader;
  }

  // get invoiceNoteLoader() {
  //   return InvoiceNoteLoader;
  // }

  // garmentInvoiceView = (gInvoices) => {
  //   return `${gInvoices.vatNo} - ${gInvoices.supplier.Name}`;
  // }

  supplierView = (supplier) => {
    const code = supplier.code || supplier.Code;
    const name = supplier.name || supplier.Name;
    return `${code} - ${name}`
  }

  get currencyLoader() {
    return CurrencyLoader;
  }

  unbind() {
    if (this.itemsSubscription) {
      this.itemsSubscription.dispose();
    }
    if (this.rateSubscription) {
      this.rateSubscription.dispose();
    }
    if (this._itemSubscriptions) {
      this._itemSubscriptions.forEach(sub => sub.dispose());
      this._itemSubscriptions.clear();
    }
  }

}