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
import moment from "moment";

@inject(Service, BindingEngine, AuthService, TaskQueue)
export class DataForm {
  @bindable readOnly = false;
  @bindable data = {};
  @bindable error = {};
  @bindable title;
  @bindable options = {};
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

    this.formatOptions = ['Manual Entry', 'Master Supplier'];
    
    if (!this.data.SupplierType) {
      this.data.SupplierType = 'Master Supplier';
    }

    if (!this.data.Items) {
      this.data.Items = [];
    }
    
    this.options.readOnly = this.readOnly;
    this.options.isEdit = this.isEdit;
    this.options.add = () => {
      this.addItems();
    };

    this.options.updateTotalAmount = () => {
      this.data.TotalAmount = this.itemSum;
    };

    if (this.data.Currency) {
            this.currency = this.data.Currency;
        }

    if (this.data.SupplierType === 'Master Supplier' && this.data.Supplier) {
    this.selectedSupplier = this.data.Supplier;
    }

    if (!this.data.Supplier) {
      this.data.Supplier = {};
    }

    this.readOnlySender = true;

    if (!this.isEdit) {
      this.addItems();
    }

    this.isItem = this.data.Items && this.data.Items.length > 0;

    this.itemSumSubscription = this.bindingEngine.propertyObserver(this, 'itemSum').subscribe(() => {
      this.data.TotalAmount = this.itemSum;
    });
    this.data.TotalAmount = this.itemSum;

    this.supplierTypeSubscription = this.bindingEngine.propertyObserver(this.data, 'SupplierType').subscribe((newValue, oldValue) => {
      if (oldValue && newValue !== oldValue) {
        this.resetSupplierData();
      }
    });
  
  }

  addItems() {
    if (!this.data.Items) {
      this.data.Items = [];
    }
    var item = { 
      AmountFinal: 0,
      Amount: 0,
      IsNew: true
    };
    this.data.Items.push(item);
  }



  get items() {
    let cols = ["Rincian", "Jumlah", "Kena PPN", "PPh", "Total"];
    if (this.isEdit) {
      cols.unshift("Tanggal");
    }
    return { 
      columns: cols
    };
  }

  @computedFrom('data.Items')
  get itemSum() {
    if (this.data.Items && this.data.Items.length > 0) {
      return this.data.Items.reduce((sum, item) => sum + (item.AmountFinal || 0), 0);
    }
    return 0;
  }

  @bindable currency;
    currencyChanged(n, o) {
        if (this.currency) {
            this.data.Currency = this.currency;
            this.options.CurrencyCode = this.data.Currency.Code;

        } else {
            this.data.Currency = null;
        }
    }


  async selectedSupplierChanged(newValue) {
          if (this.data.SupplierType !== "Master Supplier") {
              return;
          }
        var _selectedSupplier = newValue;
        if (_selectedSupplier && (_selectedSupplier.Id || _selectedSupplier.id)) {
            if (!this.data.Supplier) {
                this.data.Supplier = {};
            }
            this.data.Supplier.Code = _selectedSupplier.code || _selectedSupplier.Code;
            this.data.Supplier.Name = _selectedSupplier.name || _selectedSupplier.Name;
            this.data.Supplier.Id = _selectedSupplier.Id || _selectedSupplier.id;
            this.data.Supplier.Address = _selectedSupplier.address || _selectedSupplier.Address;
            this.data.Supplier.CodeD365 = _selectedSupplier.codeD365 || _selectedSupplier.CodeD365;
        } else {
            this.data.Supplier = null;
        }
    }

  get supplierLoader() {
        return SupplierLoader;
    }

   supplierView = (supplier) => {
        var code = supplier.code ? supplier.code : supplier.Code;
        var name = supplier.name ? supplier.name : supplier.Name;
        return `${code} - ${name}`
    }

   get currencyLoader() {
          return CurrencyLoader;
      }

  resetSupplierData() {
    this.data.Supplier = {
      Name: null,
      Address: null,
      Code: null,
      Id: null
    };
    this.selectedSupplier = null;
  }

  unbind() {
    if (this.itemSumSubscription) {
      this.itemSumSubscription.dispose();
    }
    if (this.supplierTypeSubscription) {
      this.supplierTypeSubscription.dispose();
    }
  }

}