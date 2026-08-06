import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from "./service";
var SupplierLoader = require('../../../loader/garment-supplier-loader');
var CurrencyLoader = require('../../../loader/garment-currencies-by-date-loader');
//var IncomeTaxLoader = require('../../../loader/income-tax-loader');
var SalesTaxLoader = require('../../../loader/sales-tax-group-loader');
var accountSignatureLoader = require('../../../loader/garment-account-signature-loader');
var TOPLoader = require('../../../loader/term-of-payments-new-loader');
import moment from 'moment';

@containerless()
@inject(Service, BindingSignaler, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable selectedSupplier;
    @bindable selectedCurrency;
    //@bindable selectedIncomeTax;
    //@bindable selectedVatTax;
    @bindable options = { isUseIncomeTax: false };
    keywords = ''
    filterKeywords = ''
    @bindable kurs = {};
    @bindable IsApprovedManager;
    @bindable IsApprovedOther;
    @bindable hasOverBudgetItems = false;
    @bindable selectedSalesTaxGroup;
    salesTaxCategory = '';
    salesTaxQuery = {};
    @bindable top;

    //termPaymentImportOptions = ['T/T PAYMENT', 'CMT', 'FREE FROM BUYER', 'SAMPLE'];
    termPaymentImportOptions = ['T/T PAYMENT', 'CMT', 'SAMPLE'];
    //termPaymentLocalOptions = ['DAN LIRIS', 'CMT', 'FREE FROM BUYER', 'SAMPLE'];
    termPaymentLocalOptions = ['DAN LIRIS', 'CMT', 'SAMPLE'];
    typePaymentOptions = ['T/T AFTER', 'FREE', 'CASH', 'T/T BEFORE'];
    typePaymentStorageOptions = ['EX MASTER FREE', 'EX MASTER BELI', 'EX MASTER GUDANG'];
    categoryOptions = ['FABRIC', 'ACCESSORIES']
    qualityStandardTypeOptions = ['JIS', 'AATCC', 'ISO', 'AS']

    label = "Periode Tgl. Shipment"
    freightCostByOptions = ['Penjual', 'Pembeli'];
    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    constructor(service, bindingSignaler, bindingEngine) {
        this.service = service;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.initializeSalesTaxGroup();
        this.isItem = false;
        this.ISEDIT = this.context.ISEDIT;
        if (!this.data.OrderDate) {
            this.data.OrderDate = new Date().toLocaleDateString();
        }

        if (this.data.Category) {
            if (this.data.Category === "FABRIC") {
                this.isFabric = true;
            }
            else {
                this.isFabric = false;
            }
        }

        else {
            this.isFabric = true;
        }

        if (this.data.Items)
            if (this.data.Items.length > 0) {
                this.isItem = true;

                this.options.checkedAll = this.data.Items.reduce((acc, curr) => acc && curr.IsArrived, true);
            }

        this.options.readOnly = this.readOnly;
        this.options.isEdit = this.ISEDIT;
        if (this.data.useVat) {
            this.options.isUseVat = true;
        }

        if (this.data.isIncomeTax) {
            this.options.isIncomeTax = true;
        }

        if (this.data.PaymentMethod === "CMT" && this.data.PaymentType === "FREE") {
            this.options.checkOverBudget = false;
        }

        else if (this.data.PaymentMethod === "FREE FROM BUYER" && this.data.PaymentType === "FREE") {
            this.options.checkOverBudget = false;
        }

        else if ((this.data.PaymentMethod === "FREE FROM BUYER" || this.data.PaymentMethod === "CMT") && this.data.PaymentType === "EX MASTER FREE") {
            this.options.checkOverBudget = false;
        }

        else {
            this.options.checkOverBudget = true;
        }

        this.options.resetOverBudget = false;

        if (this.data.Currency) {
            this.data.CurrencyRate = this.data.Currency.Rate;
        }
  
        if (Object.getOwnPropertyNames(this.kurs).length > 0) {
            this.options.kurs = this.kurs;
        } else {
            this.options.kurs = { Rate: 1 };
        }

        if (this.data.IsPosted) {
            this.readOnly = true;
        }

        this.IsApprovedManager ={
            UserName: this.data.ApprovedManagerBy || ""
        };

        this.IsApprovedOther ={
            UserName: this.data.ApprovedOtherBy || ""
        };

        if (this.data.Id || this.ISEDIT) {
            this.updateOverBudgetStatus();
        } else if (this.data.Items && this.data.Items.length > 0 && this.options.checkOverBudget) {
            
            this.checkOverBudgetAll();
        } else {
            this.updateOverBudgetStatus();
        }

        var originalOnRemove = this.items.onRemove;
        var self = this;
        this.items.onRemove = function () {
            originalOnRemove.call(this);
            self.updateOverBudgetStatus();
        };

        if (this.data.TermOfPaymentD365) {
        this.top = {
            Code: this.data.TermOfPaymentD365,
            Days: this.data.PaymentDueDays,
        };
    }
    }

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    @computedFrom("data.SupplierId")
    get supplierType() {
        if (this.data.Supplier) {
            if (this.data.Supplier.Import)
                return "Import"
            else
                return "Lokal"
        }
        else
            return "Lokal"
    }

    updateOverBudgetStatus() {
        const previousOverBudgetStatus = this.hasOverBudgetItems;
        if (this.data.Items && this.data.Items.length > 0) {
            this.hasOverBudgetItems = this.data.Items.some(item => item.IsOverBudget === true);
        } else {
            this.hasOverBudgetItems = false;
        }
        if (previousOverBudgetStatus === true && this.hasOverBudgetItems === false) {
        this.IsApprovedManager = null;
        this.data.ApprovedManagerBy = "";
        this.IsApprovedOther = null;
        this.data.ApprovedOtherBy = "";
        this.data.ApproveOther = false;
    }
    }

    @computedFrom("data.SupplierId")
    get supplierIsImport() {
        if (this.data.Supplier) {
            if (this.data.Supplier.Import)
                return true
            else
                return false
        }
        else
            return false
    }

    @computedFrom("data.SupplierId")
    get supplierIsStorage() {
        if (this.data.Supplier) {
            if (this.data.Supplier.Name.toLowerCase() === "gudang")
                return true
            else
                return false
        }
        else
            return false
    }

    // async selectedSupplierChanged(newValue) {
    //     var _selectedSupplier = newValue;
    //     if (_selectedSupplier.Id) {
    //         this.data.Supplier = _selectedSupplier;
    //         this.data.Supplier.Import = _selectedSupplier.import;
    //         this.data.Supplier.Code = _selectedSupplier.code;
    //         this.data.Supplier.Name = _selectedSupplier.name;
    //         this.data.Supplier.Id = _selectedSupplier.Id;
    //         this.data.SupplierId = _selectedSupplier.Id ? _selectedSupplier.Id : "";
    //         this.data.IsUseVat = _selectedSupplier.usevat;
    //         this.data.Vat = {};
    //         this.data.IsIncomeTax = _selectedSupplier.usetax;

    //         if (this.data.IsUseVat) {

    //             let info = {
    //                 keyword: '',
    //                 order: '{ "Rate" : "desc" }',
    //                 size: 1,
    //             };

    //             var defaultVat = await this.service.getDefaultVat(info);

    //             if (defaultVat.length > 0) {
    //                 if (defaultVat[0]) {
    //                     if (defaultVat[0].Id) {
    //                         this.data.Vat = defaultVat[0];
    //                         this.selectedVatTax = defaultVat[0];
    //                     }
    //                 }
    //             }
    //         } else {
    //             this.data.Vat = {};
    //             this.selectedVatTax = {};

    //         }
    //     }
    // }

    selectedSupplierChanged(newValue) {
        var supplier = newValue;

        if (supplier && supplier.Id) {
            this.data.Supplier = supplier;
            this.data.Supplier.Id = supplier.Id;
            this.data.Supplier.Import =
                supplier.import !== undefined
                    ? supplier.import
                    : supplier.Import;
            this.data.Supplier.Code =supplier.code || supplier.Code || '';
            this.data.Supplier.Name =supplier.name || supplier.Name || '';
            this.data.SupplierId = supplier.Id;

            var useVat =
                supplier.usevat === true ||
                supplier.UseVat === true;

            var useIncomeTax =
                supplier.usetax === true ||
                supplier.UseTax === true;

            this.data.Supplier.usevat = useVat;
            this.data.Supplier.usetax = useIncomeTax;
            this.data.IsUseVat = useVat;
            this.data.IsIncomeTax = useIncomeTax;
            this.options.isUseVat = useVat;
            this.options.isIncomeTax = useIncomeTax;
            this.setSalesTaxFilter(useVat, useIncomeTax);
            this.clearSalesTaxGroup();

            if (!useVat && Array.isArray(this.data.Items)) {
                for (var item of this.data.Items) {
                    item.UseVat = false;
                }
            }
        } else {
            this.data.Supplier = {};
            // this.data.SupplierId = '';

            this.data.IsUseVat = false;
            this.data.IsIncomeTax = false;

            this.options.isUseVat = false;
            this.options.isIncomeTax = false;

            this.setSalesTaxFilter(false, false);
            this.clearSalesTaxGroup();
        }
    }

    setSalesTaxFilter(useVat, useIncomeTax) {
        if (useVat && useIncomeTax) {
            this.salesTaxCategory = 'PPN & PPH';
        } else if (useVat) {
            this.salesTaxCategory = 'PPN ONLY';
        } else if (useIncomeTax) {
            this.salesTaxCategory = 'PPH ONLY';
        } else {
            this.salesTaxCategory = '';
        }

        if (this.salesTaxCategory) {
            this.salesTaxQuery = {
                Category: this.salesTaxCategory,
                TransactionType: 'PURCHASE'
            };
        } else {
            this.salesTaxQuery = {};
        }
    }

    initializeSalesTaxGroup() {
        var supplier = this.data.Supplier || {};

        var useVat =
            supplier.usevat === true ||
            supplier.UseVat === true ||
            this.data.IsUseVat === true;

        var useIncomeTax =
            supplier.usetax === true ||
            supplier.UseTax === true ||
            this.data.IsIncomeTax === true;

        this.setSalesTaxFilter(useVat, useIncomeTax);

        if (
            this.data.SalesTaxGroup &&
            this.data.SalesTaxGroup.Id
        ) {
            this.selectedSalesTaxGroup =
                this.data.SalesTaxGroup;
        } else {
            this.selectedSalesTaxGroup = null;
        }
    }

    clearSalesTaxGroup() {
        this.selectedSalesTaxGroup = null;
        this.data.SalesTaxGroup = {};
        this.data.SalesTaxGroupId = 0;
        this.data.SalesTaxGroupCode = '';
        this.data.VatRate = 0;
        this.data.IncomeTaxRate = 0;
        this.data.UseIncomeTax = false;
        this.data.Vat = {};
        this.data.IncomeTax = {};
        this.data.IncomeTaxId = 0;
    }

    selectedSalesTaxGroupChanged(newValue) {
        var salesTaxGroup = newValue;

        if (salesTaxGroup && salesTaxGroup.Id) {
            //this.data.SalesTaxGroup = salesTaxGroup;
        
            this.data.SalesTaxGroup = {
                Id: salesTaxGroup.Id || 0,
                Code: salesTaxGroup.Code || '',
                Description: salesTaxGroup.Description || '',
            }


            // Hanya update jika property tersedia
            if (salesTaxGroup.VatRate != null) {
                this.data.VatRate = Number(salesTaxGroup.VatRate);

                this.data.Vat = {
                    Id: salesTaxGroup.VatId || 0,
                    Rate: this.data.VatRate
                };
            }


            if (salesTaxGroup.IncomeTaxRate != null || salesTaxGroup.IncomeTaxName != null) {
            this.data.IncomeTaxRate = Number(salesTaxGroup.IncomeTaxRate);
            this.data.IncomeTaxName = salesTaxGroup.IncomeTaxName || '';

            this.data.IncomeTax = {
                Id: salesTaxGroup.IncomeTaxId || 0,
                Name: this.data.IncomeTaxName || '',
                Rate: this.data.IncomeTaxRate
            };
        }

            this.data.UseIncomeTax =
                this.data.IncomeTaxRate > 0;
        } else {
            (this.context.selectedSalesTaxGroupViewModel || {}).editorValue = "";
            this.data.SalesTaxGroup = {};
            this.data.VatRate = 0;
            this.data.IncomeTaxRate = 0;
            this.data.IncomeTaxName = '';
            this.data.UseIncomeTax = false;
            this.data.Vat = {};
            this.data.IncomeTax = {};
        }
    } 

    async selectedCurrencyChanged(newValue) {
        this.data.Items = [];
        var _selectedCurrency = newValue;
        if (_selectedCurrency) {
            if (_selectedCurrency.Id) {
                this.data.Currency = _selectedCurrency;
                this.data.Currency.Rate = _selectedCurrency.rate ? _selectedCurrency.rate : _selectedCurrency.Rate;
                var CurrencyRate = parseInt(this.data.Currency.Rate ? this.data.Currency.Rate : 1, 10);
                this.data.Currency.Code = _selectedCurrency.Code ? _selectedCurrency.Code : _selectedCurrency.code;
                this.data.CurrencyRate = CurrencyRate;
                //var today=new Date();
                var kurs = await this.service.getKurs(this.data.Currency.Code, this.data.OrderDate);
                this.kurs = kurs[0];
                if (Object.getOwnPropertyNames(this.kurs).length <= 0) {
                    alert(`Kurs untuk mata uang ${this.data.Currency.Code} belum ditambahkan.`);
                    this.selectedCurrency = null;
                }
                this.options.kurs = this.kurs;

                this.data.BudgetRate = this.kurs.Rate;
            }
            else {
                this.data.Currency = null;
                this.data.CurrencyRate = 0;
            }
        }
        else {
            this.data.Currency = null;
            this.data.CurrencyRate = 0;
        }
    }

    // selectedVatTaxChanged(newValue) {
    //     var _selectedVatTax = newValue;
    //     if (_selectedVatTax) {
    //         this.data.Vat = _selectedVatTax;
    //     } else {
    //         this.data.Vat = {};
    //     }
    // }

    get salesTaxLoader() {
        return SalesTaxLoader;
    }

    categoryChanged(e) {
        var selectedCategory = e.srcElement.value;
        if (selectedCategory) {
            this.data.Category = selectedCategory;

            this.data.Shrinkage = '';
            this.data.WetRubbing = '';
            this.data.DryRubbing = '';
            this.data.Washing = '';
            this.data.DarkPrespiration = '';
            this.data.LightMedPrespiration = '';
            this.data.PieceLength = '';
            this.data.QualityStandardType = 'JIS';

            if (this.data.Category === "FABRIC") {
                this.isFabric = true;
            }
            else {
                this.isFabric = false;
            }
            this.data.Items = [];
        }
    }

    paymentMethodChanged(e) {
        var selectedPayment = e.srcElement.value;
        if (selectedPayment) {
            this.data.PaymentMethod = selectedPayment;
        }
        if (this.data.PaymentMethod === "CMT" && this.data.PaymentType === "FREE") {
            this.options.checkOverBudget = false;
            this.resetIsOverBudget();
        }
        else if (this.data.PaymentMethod === "FREE FROM BUYER" && this.data.PaymentType === "FREE") {
            this.options.checkOverBudget = false;
            this.resetIsOverBudget();
        }
        else if ((this.data.PaymentMethod === "FREE FROM BUYER" || this.data.PaymentMethod === "CMT") && this.data.PaymentType === "EX MASTER FREE") {
            this.options.checkOverBudget = false;
            this.resetIsOverBudget();
        }
        else {
            this.options.resetOverBudget = false;
            this.options.checkOverBudget = true;
            this.checkOverBudgetAll();
        }
    }

    resetTermOfPaymentD365() {
        this.top = null;
        this.data.TermOfPaymentD365 = "";
        this.data.PaymentDueDays = 0;

        if (this.topLoaderViewModel) {
            this.topLoaderViewModel.editorValue = "";
        }

        if (this.error) {
            this.error.TermOfPayment = "";
            this.error.PaymentDueDays = "";
        }
    }

    resetIsOverBudget() {
        if (this.data.Items) {
            this.data.Items.map(items => {
                items.IsOverBudget = false;
                items.OverBudgetRemark = "";
                items.OverBudgetType = "";
                items.OverBudgetAmountStr = "";
                items.OverBudgetAmount = 0;
            })
            this.options.resetOverBudget = true;
            // Update status over budget untuk menyembunyikan approval fields
            this.updateOverBudgetStatus();
            this.context.DetailsCollection.bind();
        }
    }

    paymentTypeChanged(e) {
        var selectedPayment = e.srcElement.value;
        if (selectedPayment) {
            this.data.PaymentType = selectedPayment;

            this.resetTermOfPaymentD365();

            if (this.data.PaymentType == "CASH" || this.data.PaymentType == "T/T BEFORE") {
                this.data.PaymentDueDays = 0;
            }

            if (this.data.PaymentMethod === "CMT" && this.data.PaymentType === "FREE") {
                this.options.checkOverBudget = false;
                this.resetIsOverBudget();
            }
            else if (this.data.PaymentMethod === "FREE FROM BUYER" && this.data.PaymentType === "FREE") {
                this.options.checkOverBudget = false;
                this.resetIsOverBudget();
            }
            else if ((this.data.PaymentMethod === "FREE FROM BUYER" || this.data.PaymentMethod === "CMT") && this.data.PaymentType === "EX MASTER FREE") {
                this.options.checkOverBudget = false;
                this.resetIsOverBudget();
            }
            else {
                this.options.resetOverBudget = false;
                this.options.checkOverBudget = true;
                this.checkOverBudgetAll();
            }
        }
    }

    // selectedIncomeTaxChanged(newValue) {
    //     var _selectedIncomeTax = newValue;
    //     if (!_selectedIncomeTax) {
    //         this.data.IncomeTaxRate = 0;
    //         this.data.UseIncomeTax = false;
    //         this.data.IncomeTax = {};
    //     } else if (_selectedIncomeTax.Id) {
    //         this.data.IncomeTaxRate = _selectedIncomeTax.rate ? _selectedIncomeTax.rate : 0;
    //         this.data.UseIncomeTax = true;
    //         this.data.IncomeTax = _selectedIncomeTax;
    //         this.data.IncomeTaxId = _selectedIncomeTax.Id;
    //     }
    // }

    useVatChanged(e) {
        var selectedUseVat = e.srcElement.checked || false;
        if (!selectedUseVat) {
            this.options.isUseVat = false;
            for (var poItem of this.data.Items) {
                poItem.UseVat = false;
            }
        } else {
            this.options.isUseVat = true;
        }
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    get supplierQuery() {
        var result = { "Active": true }
        return result;
    }

    get currencyLoader() {
        return CurrencyLoader;
    }

    // get incomeTaxLoader() {
    //     return IncomeTaxLoader;
    // }

    // get vatTaxLoader() {
    //     return VatTaxLoader;
    // }

    supplierView = (supplier) => {
        var code = supplier.code ? supplier.code : supplier.Code;
        var name = supplier.name ? supplier.name : supplier.Name;
        return `${code} - ${name}`
    }

    currencyView = (currency) => {
        var code = currency.code ? currency.code : currency.Code;
        return code;
    }

    // incomeTaxView = (incomeTax) => {
    //     var rate = incomeTax.rate ? incomeTax.rate : incomeTax.Rate;
    //     var name = incomeTax.name ? incomeTax.name : incomeTax.Name;
    //     return `${name} - ${rate}`
    // }

    // vatTaxView = (vatTax) => {
    //     var rate = vatTax.rate ? vatTax.rate : vatTax.Rate;
    //     return `${rate}`
    // }

    salesTaxView = (salesTaxGroup) => {
        var code = salesTaxGroup.Code;
        var description = salesTaxGroup.Description;

        if (description) {
            return `${code} - ${description}`;
        }
        return code;
    }

    async search() {

        var result = await this.service.searchByTags(this.keywords, this.data.Category, this.filterKeywords, this.context.shipmentDateFrom, this.context.shipmentDateTo);
        var items = [];
        var pr = [];
        var index = 0;
        for (var data of result.data) {
            for (var item of data.Items) {
                if (pr.length == 0) {
                    // item.RemainingBudget=pr[item.PRNo];
                    items.push({
                        index: index++,
                        PONo: data.PONo,
                        POId: data.Id,
                        PRNo: data.PRNo,
                        PRId: data.PRId,
                        PO_SerialNumber: item.PO_SerialNumber,
                        RONo: data.RONo,
                        Article: data.Article,
                        Product: item.Product,
                        DefaultQuantity: parseFloat(item.Quantity).toFixed(2),
                        DefaultUom: item.Uom,
                        DealQuantity: Number(item.Quantity),
                        DealUom: item.Uom,
                        BudgetPrice: Number(item.BudgetPrice),
                        PriceBeforeTax: Number(item.BudgetPrice),
                        PricePerDealUnit: Number(item.BudgetPrice),
                        budgetUsed: item.BudgetPrice * item.Quantity,
                        remainingBudget: item.RemainingBudget,
                        IsOverBudget: false,
                        totalBudget: item.BudgetPrice * item.Quantity,
                        RemainingBudget: item.RemainingBudget,
                        Conversion: 1,
                        Remark: item.ProductRemark,
                        Initial: parseFloat(item.RemainingBudget.toFixed(4)),
                        DefaultPricePerDealUnit: Number(item.BudgetPrice),
                        IsCMT: item.IsCMT,
                    });

                    pr[item.PRNo + item.PO_SerialNumber + item.Product.Id] = item.RemainingBudget - item.budgetUsed;
                }
                else {
                    var dup = items.find(a => a.PRNo == item.PRNo && item.Product.Id == a.Product.Id && a.PO_SerialNumber == item.PO_SerialNumber);
                    if (dup) {
                        item.RemainingBudget = pr[item.PRNo + item.PO_SerialNumber + item.Product.Id];
                        pr[item.PRNo + item.PO_SerialNumber + item.Product.Id] = item.RemainingBudget - (item.BudgetPrice * item.Quantity);
                    }
                    else {
                        pr[item.PRNo + item.PO_SerialNumber + item.Product.Id] = item.RemainingBudget - (item.BudgetPrice * item.Quantity);
                        //item.RemainingBudget=pr[item.PRNo];
                    }

                    items.push({
                        PONo: data.PONo,
                        POId: data.Id,
                        PRNo: data.PRNo,
                        PRId: data.PRId,
                        PO_SerialNumber: item.PO_SerialNumber,
                        RONo: data.RONo,
                        Article: data.Article,
                        Product: item.Product,
                        DefaultQuantity: parseFloat(item.Quantity).toFixed(2),
                        DefaultUom: item.Uom,
                        DealQuantity: Number(item.Quantity),
                        DealUom: item.Uom,
                        BudgetPrice: Number(item.BudgetPrice),
                        PriceBeforeTax: Number(item.BudgetPrice),
                        PricePerDealUnit: Number(item.BudgetPrice),
                        budgetUsed: item.BudgetPrice * item.Quantity,
                        remainingBudget: item.RemainingBudget,
                        IsOverBudget: false,
                        totalBudget: item.BudgetPrice * item.Quantity,
                        Conversion: 1,
                        Remark: item.ProductRemark,
                        Initial: parseFloat(item.RemainingBudget.toFixed(4)),
                        DefaultPricePerDealUnit: Number(item.BudgetPrice),
                        IsCMT: item.IsCMT,
                    });
                }

            }

        }
        items = [].concat.apply([], items);
        this.data.Items = items;
        this.isItem = true;
        
        if (this.options.checkOverBudget) {
            this.checkOverBudgetAll();
        } else {
            this.updateOverBudgetStatus();
        }
    }

    items = {
        parent: this,
        columns: [
            "Nomor PR - No. Referensi PR - Article",
            "Nomor RO",
            "Barang",
            "Jumlah Diminta",
            "Satuan Diminta",
            "Jumlah Beli",
            "Satuan Beli",
            "Jumlah Kecil",
            "Satuan Kecil",
            "Konversi",
            "Harga Satuan",
            "Include Ppn?",
            "Keterangan",
            "PI",
            "ETD",
            "ETA",
            "Barang Datang",],
        onRemove: function () {
            this.bind();
            if (this.items) {

                var pr = [];
                var remaining = [];
                var items = [];
                for (var a of this.items) {
                    if (pr.length == 0) {
                        pr.push(a);
                        //a.budgetUsed=a.PricePerDealUnit*a.DealQuantity*this.kurs.Rate;
                        a.remainingBudget = a.Initial;
                        remaining[a.PRNo + a.Product.Id + a.PO_SerialNumber] = a.Initial - parseFloat(a.budgetUsed.toFixed(4));
                        a.RemainingBudget = parseFloat(remaining[a.PRNo + a.Product.Id + a.PO_SerialNumber].toFixed(4));
                        //a.remainingBudget=remaining[a.PRNo + a.Product.Id]-a.budgetUsed;
                        //remaining[a.PRNo + a.Product.Id]=a.remainingBudget;
                    }
                    else {
                        var dup = pr.find(b => b.PRNo == a.PRNo && b.Product.Id == a.Product.Id && a.PO_SerialNumber == b.PO_SerialNumber);
                        if (dup) {
                            //a.budgetUsed=a.PricePerDealUnit*a.DealQuantity*this.kurs.Rate;
                            a.remainingBudget = remaining[a.PRNo + a.Product.Id + a.PO_SerialNumber];
                            remaining[a.PRNo + a.Product.Id + a.PO_SerialNumber] = a.remainingBudget - parseFloat(a.budgetUsed.toFixed(4));
                            a.RemainingBudget = parseFloat(remaining[a.PRNo + a.Product.Id + a.PO_SerialNumber].toFixed(4));
                        }
                        else {
                            pr.push(a);
                            //a.budgetUsed=a.PricePerDealUnit*a.DealQuantity*this.kurs.Rate;
                            a.remainingBudget = a.Initial;
                            remaining[a.PRNo + a.Product.Id + a.PO_SerialNumber] = a.Initial - parseFloat(a.budgetUsed.toFixed(4));
                            a.RemainingBudget = parseFloat(remaining[a.PRNo + a.Product.Id + a.PO_SerialNumber].toFixed(4));
                        }
                    }
                    if (a.RemainingBudget < 0) {
                        a.IsOverBudget = true;
                    }
                    else {
                        a.IsOverBudget = false;
                    }
                }
            }
        }
    };

    checkOverBudgetAll() {
        if (this.data.Items) {
            var pr = [];
            var remaining = [];
            var items = [];
            for (var a of this.data.Items) {
                if (pr.length == 0) {
                    pr.push(a);
                    //a.budgetUsed=a.PricePerDealUnit*a.DealQuantity*this.kurs.Rate;
                    a.remainingBudget = a.Initial;
                    remaining[a.PRNo + a.Product.Id + a.PO_SerialNumber] = a.Initial - parseFloat(a.budgetUsed.toFixed(4));
                    a.RemainingBudget = parseFloat(remaining[a.PRNo + a.Product.Id + a.PO_SerialNumber].toFixed(4));
                    //a.remainingBudget=remaining[a.PRNo + a.Product.Id]-a.budgetUsed;
                    //remaining[a.PRNo + a.Product.Id]=a.remainingBudget;
                }
                else {
                    var dup = pr.find(b => b.PRNo == a.PRNo && b.Product.Id == a.Product.Id && a.PO_SerialNumber == b.PO_SerialNumber);
                    if (dup) {
                        //a.budgetUsed=a.PricePerDealUnit*a.DealQuantity*this.kurs.Rate;
                        a.remainingBudget = remaining[a.PRNo + a.Product.Id + a.PO_SerialNumber];
                        remaining[a.PRNo + a.Product.Id + a.PO_SerialNumber] = a.remainingBudget - parseFloat(a.budgetUsed.toFixed(4));
                        a.RemainingBudget = parseFloat(remaining[a.PRNo + a.Product.Id + a.PO_SerialNumber].toFixed(4));
                    }
                    else {
                        pr.push(a);
                        //a.budgetUsed=a.PricePerDealUnit*a.DealQuantity*this.kurs.Rate;
                        a.remainingBudget = a.Initial;
                        remaining[a.PRNo + a.Product.Id + a.PO_SerialNumber] = a.Initial - parseFloat(a.budgetUsed.toFixed(4));
                        a.RemainingBudget = parseFloat(remaining[a.PRNo + a.Product.Id + a.PO_SerialNumber].toFixed(4));
                    }
                }

                if (a.UENItemId) {
                    a.RemainingBudget = parseFloat((a.BudgetFromUEN - parseFloat(a.budgetUsed.toFixed(4))).toFixed(4));
                }

                if (a.RemainingBudget < 0) {
                    a.IsOverBudget = true;
                }
                else {
                    a.IsOverBudget = false;
                }
                a.UsedBudget = parseFloat(a.budgetUsed.toFixed(4));
            }
            // Update status over budget untuk menampilkan/menyembunyikan approval fields
            this.updateOverBudgetStatus();
        }
    }

    itemsChanged(e) {
        this.checkOverBudgetAll();
    }

    findParent(el, tagName) {
        while (el && el.tagName !== tagName.toUpperCase()) {
            el = el.parentElement;
        }
        return el;
        }

    onitemchange(event) {
        var td = this.findParent(event.target, "td");
        var tr = this.findParent(event.target, "tr");

        if (!td || !tr) return 

        var columnName = (td && td.dataset) ? td.dataset.column : undefined;
        if (!columnName) return

        var allowedColumns = ["PI", "ETD", "ETA", "IsArrived"];
        if (allowedColumns.indexOf(columnName) === -1) return;

        var row = tr.rowIndex;
        var newValue;
        if (columnName === "ETD" || columnName === "ETA") {
            newValue = new Date(event.target.value);
        } else if (columnName === "IsArrived") {
            newValue = event.target.checked;
        } else {
            newValue = event.target.value;
        }

        for (var i = row; i < this.data.Items.length; i++) {
            this.data.Items[i][columnName] = newValue;
        }
    }

    get accountSignatureLoader1() {
        return (keyword) => accountSignatureLoader(keyword, { Position: "Manager Purchasing" }); //Username ganti dengan jabatan atau posisi dari Account Signature yang diinginkan
    }

//   get accountSignatureLoader1() {
//     return async (keyword) => {
//         const res1 = await accountSignatureLoader(keyword, { Position: "Manager Purchasing" });
//         const res2 = await accountSignatureLoader(keyword, { Position: "Manager Merchandiser" });

//         return [...res1, ...res2];
//     };
// }

    ApprovedManagerView = (unit) => {
        return `${unit.UserName}`;
    }
    
    IsApprovedManagerChanged(newValue) {
        this.IsApprovedManager = newValue;
        if (this.IsApprovedManager){
        this.data.ApprovedManagerBy = this.IsApprovedManager.UserName;
        }else{
        this.data.ApprovedManagerBy = "";
        this.IsApprovedManager = null;
        }
    }
        

       get accountSignatureLoader2() {
    return async (keyword) => {
        const res1 = await accountSignatureLoader(keyword, { Position: "Manager Sourcing" });
        const res2 = await accountSignatureLoader(keyword, { Position: "Manager Merchandiser" });

        return [...res1, ...res2];
    };
}

    ApprovedOtherView = (unit) => {
        return `${unit.UserName}`;
    }
    
    IsApprovedOtherChanged(newValue) {
        this.IsApprovedOther = newValue;
        if (this.IsApprovedOther){
        this.data.ApprovedOtherBy = this.IsApprovedOther.UserName;
        this.data.ApprovedOtherPosition = this.IsApprovedOther.Position;
        }else{
        this.data.ApprovedOtherBy = "";
        this.data.ApprovedOtherPosition = "";
        this.IsApprovedOther = null;
        }
    }

    approveOtherChanged(e) {
        var isChecked = e.srcElement.checked || false;
        if (!isChecked) {
            this.IsApprovedOther = null;
            this.data.ApprovedOtherBy = "";
            this.data.ApprovedOtherPosition = "";
            if (this.error) this.error.ApprovedOtherBy = "";
        }
    }

    onItemChangeDelegate(event) {
        this.onitemchange(event); 
        this.itemsChanged(event);  
    }

    @computedFrom("hasOverBudgetItems", "options.checkOverBudget")
        get showManagerApproval() {
            return this.hasOverBudgetItems && this.options.checkOverBudget;
        }

    get topLoader() {
            return TOPLoader;
        }
    
    topLoaderView = (item) => {
        return [item.Code, item.Description]
            .filter(value => value !== undefined && value !== null && value.toString().trim().length > 0)
            .join(" - ");
    }

    // topChanged(newValue, oldValue) {
    //     var selectedTop = newValue;
    //     if (selectedTop) {
    //         this.data.TermOfPaymentD365 = selectedTop.Code;
    //         this.data.PaymentDueDays = selectedTop.Days;
    //     }
    // }

    topChanged(newValue, oldValue) {
    if (newValue && newValue.Code) {
        this.data.TermOfPaymentD365 = newValue.Code;
        this.data.PaymentDueDays = Number(newValue.Days || 0);
    } else {
            this.data.TermOfPaymentD365 = "";
            this.data.PaymentDueDays = 0;

            if (this.topLoaderViewModel) {
                this.topLoaderViewModel.editorValue = "";
            }
        }
    }

}
