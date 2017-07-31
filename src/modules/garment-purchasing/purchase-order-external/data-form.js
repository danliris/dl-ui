import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
var SupplierLoader = require('../../../loader/supplier-loader');
var CurrencyLoader = require('../../../loader/currency-loader');
var VatLoader = require('../../../loader/vat-loader');
var CategoryLoader = require('../../../loader/category-loader');

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
    @bindable selectedCategory;
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

    items = {
        columns: [
            "Nomor PR - Nomor Referensi PR",
            "Nomor RO",
            "Barang",
            "Jumlah Diminta",
            "Satuan Diminta",
            "Jumlah Beli",
            "Satuan Beli",
            "Konversi",
            "Harga Satuan",
            "Include Ppn?",
            "Keterangan"],
        onRemove: function () {
            this.bind();
        }
    };

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.options.readOnly = this.readOnly;
        if (this.data.useIncomeTax) {
            this.options.isUseIncomeTax = true;
        }
    }

    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }

    @computedFrom("data.supplierId")
    get supplierType() {
        return (this.data.supplier.import || false) ? "Import" : "Lokal";
    }

    selectedSupplierChanged(newValue) {
        var _selectedSupplier = newValue;
        if (_selectedSupplier._id) {
            this.data.supplier = _selectedSupplier;
            this.data.supplierId = _selectedSupplier._id ? _selectedSupplier._id : "";
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

    selectedCategoryChanged(newValue) {
        var _selectedCategory = newValue;
        if (_selectedCategory._id) {
            this.data.category = _selectedCategory;
            this.data.categoryId = this.data.category._id ? this.data.category._id : {};
            this.data.items = [];
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
        if (_selectedVat._id) {
            this.data.vatRate = _selectedVat.rate ? _selectedVat.rate : 0;
            this.data.useVat = true;
            this.data.vat = _selectedVat;
        }
        else {
            this.data.vatRate = 0;
            this.data.useVat = false;
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

    get currencyLoader() {
        return CurrencyLoader;
    }

    get vatLoader() {
        return VatLoader;
    }

    get categoryLoader() {
        return CategoryLoader;
    }

    supplierView = (supplier) => {
        return `${supplier.code} - ${supplier.name}`
    }

    currencyView = (currency) => {
        return currency.code
    }

    vatView = (vat) => {
        return `${vat.name} - ${vat.rate}`
    }

    categoryView = (category) => {
        return `${category.code} - ${category.name}`
    }

    async search() {
        var result = await this.service.searchByTags(this.data.categoryId, this.keywords, this.shipmentDate);

        var items = result.data.map((data) => {
            if (data.items.categoryId.toString() === this.data.categoryId.toString()) {
                return {
                    poNo: data.no,
                    poId: data._id,
                    prNo: data.purchaseRequest.no,
                    prId: data.purchaseRequest._id,
                    prRefNo: data.items.refNo,
                    roNo: data.roNo,
                    productId: data.items.productId,
                    product: data.items.product,
                    defaultQuantity: Number(data.items.defaultQuantity),
                    defaultUom: data.items.defaultUom,
                    dealQuantity: Number(data.items.defaultQuantity),
                    dealUom: data.items.defaultUom,
                    budgetPrice: Number(data.items.budgetPrice),
                    priceBeforeTax: Number(data.items.budgetPrice),
                    pricePerDealUnit: Number(data.items.budgetPrice),
                    conversion: 1,
                    useIncomeTax: false
                }
            }
        })
        items = [].concat.apply([], items);
        if (this.data.items.length < 0) {
            this.data.items = [];
        }
        this.data.items = this.data.items.concat(items);
    }

} 