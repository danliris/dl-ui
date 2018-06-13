import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
var SupplierLoader = require('../../../loader/supplier-loader');
var CurrencyLoader = require('../../../loader/currency-loader');
var UnitLoader = require('../../../loader/unit-loader');
var VatLoader = require('../../../loader/vat-loader');

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable selectedSupplier;
    @bindable selectedCurrency;
    @bindable selectedVat;
    @bindable selectedUnit;
    @bindable options = { isUseIncomeTax: false };

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

        if (this.data.supplier) {
            this.selectedSupplier = this.data.supplier;
        }
        if (this.data.unit) {
            this.selectedUnit = this.data.unit;
            this.options.unitCode=this.selectedUnit.name;
        }
        if (this.data.currency) {
            this.selectedCurrency = this.data.currency;
            this.data.currencyRate=this.data.currency.rate;
        }
        if (this.data.vat) {
            this.selectedVat = this.data.vat;
            this.data.vatRate=this.data.vat.rate;
        }
        if (this.data.useIncomeTax) {
            this.options.isUseIncomeTax = true;
        }
    }

    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }

    selectedSupplierChanged(newValue) {
        var _selectedSupplier = newValue;
        if (_selectedSupplier._id) {
            this.data.supplier = _selectedSupplier;
            this.data.supplierId = _selectedSupplier._id ? _selectedSupplier._id : "";
        }
    }

    selectedUnitChanged(newValue) {
        var _selectedUnit = newValue;
        if(this.data.unit && this.data.unit!=newValue){
            if(this.data && this.data.items && this.data.items.length > 0){
                var count = this.data.items.length;
                for(var a = count; a >= 0; a--){
                    this.data.items.splice((a-1), 1);
                }
            }
        }
        if (_selectedUnit._id) {
            this.data.unit = _selectedUnit;
            this.data.unitId = _selectedUnit._id ? _selectedUnit._id : "";
            this.data.division=_selectedUnit.division;
            this.options.unitCode=_selectedUnit.name;
        }
    }

    selectedCurrencyChanged(newValue) {
        var _selectedCurrency = newValue;
        if (_selectedCurrency._id) {
            var currencyRate = parseInt(_selectedCurrency.rate ? _selectedCurrency.rate : 1, 10);
            this.data.currency = _selectedCurrency;
            this.data.currencyRate = currencyRate;
            
        }
        else {
            this.data.currencyRate = 0;
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

    selectedVatChanged(newValue) {
        var _selectedVat = newValue;
        if (!_selectedVat) {
            this.data.vatRate = 0;
            this.data.useVat = false;
            this.data.vat = {};
        } else if (_selectedVat._id) {
            this.data.vatRate = _selectedVat.rate ? _selectedVat.rate : 0;
            this.data.useVat = true;
            this.data.vat = _selectedVat;
        }
    }

    useIncomeTaxChanged(e) {
        var selectedUseIncomeTax = e.srcElement.checked || false;
        if (!selectedUseIncomeTax) {
            this.options.isUseIncomeTax = false;
            for (var po of this.data.items) {
                for (var poItem of po.items) {
                    poItem.useIncomeTax = false;
                    poItem.pricePerDealUnit = poItem.priceBeforeTax;
                }
            }
        } else {
            this.options.isUseIncomeTax = true;
        }
    }

    get supplierLoader() {
        return SupplierLoader;
    }
    
    get unitLoader() {
        return UnitLoader;
    }


    get currencyLoader() {
        return CurrencyLoader;
    }

    get vatLoader() {
        return VatLoader;
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
        return `${unit.division.name} - ${unit.name}`
    }

    currencyView = (currency) => {
        return currency.code
    }

    vatView = (vat) => {
        console.log(vat)
        return `${vat.name} - ${vat.rate}`
    }

} 