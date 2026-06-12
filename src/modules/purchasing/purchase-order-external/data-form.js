import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
var SupplierLoader = require('../../../loader/supplier-loader');
var CurrencyLoader = require('../../../loader/currency-loader');
var UnitLoader = require('../../../loader/unit-loader');
var IncomeTaxLoader = require('../../../loader/income-tax-loader');
var VatTaxLoader = require('../../../loader/vat-tax-loader');

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
  @bindable readOnly = false;
  @bindable data = {};
  @bindable error = {};
  @bindable title;
  @bindable selectedSupplier;
  @bindable selectedCurrency;
  @bindable selectedIncomeTax;
  @bindable selectedVatTax;
  @bindable selectedUnit;
  @bindable options = { useVat: false };
  @bindable supplierType;

  IncomeTaxByOptions = ["Supplier", "Dan Liris"];
  poCashTypeOption = ["", "Disposisi", "VB"]

  termPaymentOptions = ['CASH', 'KREDIT', 'DP (DOWN PAYMENT) + BP (BALANCE PAYMENT)', 'DP (DOWN PAYMENT) + TERMIN 1 + BP (BALANCE PAYMENT)', 'RETENSI'];
  freightCostByOptions = ['Penjual', 'Pembeli'];
  controlOptions = {
    label: {
      length: 4
    },
    control: {
      length: 5
    }
  }
  itemsColumns = [{ header: "Nomor PR", value: "purchaseRequest.no" }]

  constructor(service, bindingEngine) {
    this.service = service;
    this.bindingEngine = bindingEngine;
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    // ensure items array exists so observers can be attached immediately
    if (!this.data.items) this.data.items = [];

    if (this.data.supplier) {
      this.selectedSupplier = this.data.supplier;
      this.supplierType = this.data.supplier.import ? "Import" : "Lokal";
      console.log(this.data.supplier.import);
    }
    if (this.data.unit) {
      this.selectedUnit = this.data.unit;
      this.options.unitCode = this.selectedUnit.name;
    }
    if (this.data.currency) {
      this.selectedCurrency = this.data.currency;
      this.data.currencyRate = this.data.currency.rate;
    }
    if (this.data.incomeTax) {
      this.selectedIncomeTax = this.data.incomeTax;
      this.data.incomeTaxRate = this.data.incomeTax.rate;
    }
    if (this.data.vatTax) {
      this.selectedVatTax = this.data.vatTax;
      this.options.useVat = true;
    }
    if (this.data.useVat) {
      this.options.useVat = true;
    }

    
    this.setupObservers();
    this.evaluateShowPriceReductionReason();

    this._onPriceCheck = () => this.evaluateShowPriceReductionReason();
    try { document.addEventListener('price-check', this._onPriceCheck); } catch (e) { }
  }

  @computedFrom("data._id")
  get isEdit() {
    return (this.data._id || '').toString() != '';
  }

  showPriceReductionReason = false;

  setupObservers() {
    if (!this.bindingEngine) return;

    if (!this._subscriptions) this._subscriptions = [];
    for (let s of this._subscriptions) {
      try {
        if (s && typeof s.dispose === 'function') s.dispose();
        else if (typeof s === 'function') s();
      } catch (e) { }
    }
    this._subscriptions = [];

    if (!this.data || !this.data.items) return;

    try {
      let itemsObs = this.bindingEngine.collectionObserver(this.data.items).subscribe(() => {
        this.setupObservers();
        this.evaluateShowPriceReductionReason();
      });
      this._subscriptions.push(itemsObs);

      for (let po of this.data.items) {
        let details = po.details || po.items;
        if (Array.isArray(details)) {
            
          let detailsObs = this.bindingEngine.collectionObserver(details).subscribe(() => {
            this.evaluateShowPriceReductionReason();
            this.setupObservers();
          });
          this._subscriptions.push(detailsObs);

          for (let detail of details) {
            if (!detail) continue;
            try {
              let sub1 = this.bindingEngine.propertyObserver(detail, 'priceBeforeTax').subscribe(() => this.evaluateShowPriceReductionReason());
              let sub2 = this.bindingEngine.propertyObserver(detail, 'priceMaster').subscribe(() => this.evaluateShowPriceReductionReason());
              this._subscriptions.push(sub1);
              this._subscriptions.push(sub2);
            } catch (e) { }
          }
        }
      }
    } catch (e) { }
  }

  _toNumber(v) {
    if (v === null || v === undefined || v === '') return NaN;
    if (typeof v === 'string') v = v.replace(/,/g, '').trim();
    return parseFloat(v);
  }

  
  evaluateShowPriceReductionReason() {
    let show = false;

    if (this.data && this.data.items) {
      for (let po of this.data.items) {
        let details = po.details || po.items;
        if (details && details.length) {
          for (let detail of details) {
            const pb = this._toNumber(detail.priceBeforeTax);
            const pm = this._toNumber(detail.priceMaster);
            if (!isNaN(pb) && !isNaN(pm)) {
              //if (pb < pm && (pm - pb) / pm * 100 > 20) {
              if (pm > 0 && pb < pm * 0.8) {
                show = true;
              } else {
                try { detail.priceReductionReason = null; } catch (e) { }
              }
            }
          }
        }
        if (show) break;
      }
    }

    this.showPriceReductionReason = show;
    if (!show) {
      try { this.data.priceReductionReason = null; } catch (e) { }
    }
  }

  unbind() {
    if (this._subscriptions && this._subscriptions.length) {
      for (let s of this._subscriptions) {
        try {
          if (s && typeof s.dispose === 'function') s.dispose();
          else if (typeof s === 'function') s();
        } catch (e) { }
      }
      this._subscriptions = [];
    }

    try { document.removeEventListener('price-check', this._onPriceCheck); } catch (e) { }
  }

  selectedSupplierChanged(newValue) {
    var _selectedSupplier = newValue;
    if (_selectedSupplier._id) {
      this.data.supplier = _selectedSupplier;
      this.data.supplierId = _selectedSupplier._id ? _selectedSupplier._id : "";
      this.supplierType = _selectedSupplier.impor ? "Import" : "Lokal";
    }
  }

  selectedUnitChanged(newValue) {
    var _selectedUnit = newValue;
    if (this.data.unit && this.data.unit != newValue) {
      if (this.data && this.data.items && this.data.items.length > 0) {
        var count = this.data.items.length;
        for (var a = count; a >= 0; a--) {
          this.data.items.splice((a - 1), 1);
        }
      }
    }
    if (_selectedUnit.Id) {
      this.data.unit = _selectedUnit;
      this.data.unit._id = _selectedUnit.Id;
      this.data.unit.name = _selectedUnit.Name;
      this.data.unit.code = _selectedUnit.Code;
      this.data.unitId = _selectedUnit.Id ? _selectedUnit.Id : "";
      this.data.division = _selectedUnit.Division;
      this.options.unitCode = _selectedUnit.Name;
      this.data.unit.division = _selectedUnit.Division;
      this.data.unit.division._id = _selectedUnit.Division.Id;
      this.data.unit.division.name = _selectedUnit.Division.Name;
      this.data.unit.division.code = _selectedUnit.Division.Code;
    }
  }

  selectedCurrencyChanged(newValue) {
    var _selectedCurrency = newValue;
    if (_selectedCurrency.Id) {
      var currencyRate = parseInt(_selectedCurrency.Rate ? _selectedCurrency.Rate : _selectedCurrency.rate ? _selectedCurrency.rate : 1, 10);
      this.data.currency = _selectedCurrency;
      this.data.currencyRate = currencyRate;
      this.data.currency._id = _selectedCurrency.Id;
      this.data.currency.code = _selectedCurrency.Code;
      this.data.currency.rate = this.data.currencyRate;

    }
    else {
      this.data.currencyRate = 0;
      if (_selectedCurrency.rate) {
        this.data.currencyRate = _selectedCurrency.rate;
      }
    }
  }

  paymentMethodChanged(e) {
    var selectedPayment = e.srcElement.value;
    if (selectedPayment) {
      this.data.paymentMethod = selectedPayment;
      if (this.data.paymentMethod == "CASH") {
        this.data.paymentDueDays = 0;
      }
      else {
        this.data.paymentDueDays = 30;
      }
    }
  }

  selectedIncomeTaxChanged(newValue) {
    var _selectedIncomeTax = newValue;

    if (!_selectedIncomeTax) {
      this.data.incomeTaxRate = 0;
      this.data.useIncomeTax = false;
      this.data.incomeTax = {};
      this.data.incomeTaxBy = "";
    } else if (_selectedIncomeTax._id || _selectedIncomeTax.Id) {
      this.data.incomeTaxRate = _selectedIncomeTax.rate ? _selectedIncomeTax.rate : 0;
      this.data.useIncomeTax = true;
      this.data.incomeTax = _selectedIncomeTax;
      this.data.incomeTax._id = _selectedIncomeTax.Id || _selectedIncomeTax._id;
    }
  }

  async useVatChanged(e) {
    var selectedUseVat = e.srcElement.checked || false;
    if (!selectedUseVat) {
      this.data.useVat = selectedUseVat;
      this.data.vatTax = {};
      this.options.useVat = false;
      for (var po of this.data.items) {
        for (var poItem of po.items) {
          poItem.useVat = false;
          poItem.pricePerDealUnit = poItem.priceBeforeTax;
        }
      }
      if (this.data.items) {
        for (var item of this.data.items) {
          if (item.details)
            for (var detail of item.details) {
              detail.includePpn = false;
            }
        }
      }

    } else {
     
      this.options.useVat = true;
      this.data.useVat = selectedUseVat;

        if(this.data.useVat){

          let info = {
              keyword:'',
              order: '{ "Rate" : "desc" }',
              size: 1,
          };

          var defaultVat = await this.service.getDefaultVat(info);
          console.log(defaultVat);

          if(defaultVat.length > 0){
              if(defaultVat[0]){
                  if(defaultVat[0].Id){
                     // this.data.vatTax = defaultVat[0];
                      
                      
                      this.selectedVatTax = defaultVat[0];
                      console.log(this.selectedVatTax);
                      //this.data.vatTax = this.selectedVatTax;
                      this.data.vatTax= {
                        _id : this.selectedVatTax.Id || this.selectedVatTax._id,
                        rate : this.selectedVatTax.Rate || this.selectedVatTax.rate
                      } 

                      console.log(this.data.vatTax);
                      //this.data.vatTax.rate = this.selectedVatTax.Rate || this.selectedVatTax.rate;
                  }
              }
          }
     }

    }
  }

  selectedVatTaxChanged(newValue) {
    console.log(newValue);
    
    var _selectedVatTax = newValue;
    if (_selectedVatTax) {
      this.data.vatTax= {
        _id : _selectedVatTax.Id || _selectedVatTax._id,
        rate : _selectedVatTax.Rate || _selectedVatTax.rate
      } 
    } else {
        this.data.vatTax = {};
    }
}

  // selectedVatTaxChanged(newValue) {
  //   var _selectedVatTax = newValue;
  //   console.log(_selectedVatTax);
  //   if (!_selectedVatTax) {
  //     this.data.useVat = false;
  //     this.options.useVat = false;
  //     this.data.vatTaxRate = 0;
  //     this.data.vatTaxId = 0;
  //     this.data.vatTax = {};
  //     for (var po of this.data.items) {
  //       for (var poItem of po.items) {
  //         poItem.useVat = false;
  //         poItem.pricePerDealUnit = poItem.priceBeforeTax;
  //       }
  //     }
  //     if (this.data.items) {
  //       for (var item of this.data.items) {
  //         if (item.details)
  //           for (var detail of item.details) {
  //             detail.includePpn = false;
  //           }
  //       }
  //     }
  //   } else if (_selectedVatTax._id || _selectedVatTax.Id) {
  //     this.data.vatTaxRate = _selectedVatTax.rate ? _selectedVatTax.rate : 0;
  //     this.data.useVatTax = true;
  //     this.options.useVat = true;
  //     this.data.useVat = true;
  //     this.data.vatTax = _selectedVatTax;
  //     this.data.vatTax._id = _selectedVatTax.Id || _selectedVatTax._id;
  //   }
  // }

  get supplierLoader() {
    return SupplierLoader;
  }

  get supplierQuery(){
    var result = { "Active" : true }
    return result;   
  }

  get unitLoader() {
    return UnitLoader;
  }


  get currencyLoader() {
    return CurrencyLoader;
  }

  get incomeTaxLoader() {
    return IncomeTaxLoader;
  }

  get vatTaxLoader() {
    return VatTaxLoader;
  }

  get unitQuery(){
    var result = { "Active" : true }
    return result;   
  }
  get addItems() {
    return (event) => {
      this.data.items.push({ purchaseRequest: { no: "" } })
    };
  }

  supplierView = (supplier) => {
    return `${supplier.code} - ${supplier.name}`
  }

  unitView = (unit) => {
    return unit.division ? `${unit.division.name} - ${unit.name}` : `${unit.Division.Name} - ${unit.Name}`;
  }

  currencyView = (currency) => {
    return currency.Code ? currency.Code : currency.code;
  }

  incomeTaxView = (incomeTax) => {
    return incomeTax.name ? `${incomeTax.name} - ${incomeTax.rate}` : "";
  }

  vatTaxView = (vatTax) => {
    console.log(vatTax);
    return vatTax.rate ? `${vatTax.rate}` : `${vatTax.Rate}`;
  }

} 
