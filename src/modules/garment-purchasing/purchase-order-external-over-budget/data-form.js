import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
var SupplierLoader = require('../../../loader/garment-supplier-loader');
var CurrencyLoader = require('../../../loader/currency-loader');
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
    @bindable options = { isUseIncomeTax: false };
    keywords = ''
    // @bindable itemss=[];


    items = [];
    total=0
    termPaymentImportOptions = ['T/T PAYMENT', 'CMT', 'FREE FROM BUYER', 'SAMPLE'];
    termPaymentLocalOptions = ['DAN LIRIS', 'CMT', 'FREE FROM BUYER', 'SAMPLE'];
    typePaymentOptions = ['FREE', 'CASH', 'T/T AFTER', 'T/T BEFORE'];
    categoryOptions = ['FABRIC', 'ACCESSORIES']
    qualityStandardTypeOptions = ['JIS', 'AATCC', 'ISO']

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


    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        pagination: false
    }

    columns = [
        { title: "Nomor PR - No. Referensi PR - Article", field: "prNo" },
        { title: "Nomor RO", field: "roNo" },
        { title: "Barang", field: "product.name" },
        { title: "Jumlah Diminta", field: "defaultQuantity" },
        { title: "Satuan Diminta", field: "defaultUom.unit" },
        { title: "Jumlah Beli", field: "dealQuantity" },
        { title: "Jumlah Kecil", field: "quantityConversion" },
        { title: "Konversi", field: "quantityConversion" },
        { title: "Harga Satuan", field: "pricePerDealUnit" },
        // { title: "Include Ppn?", field: "roNo" },
        { title: "Keterangan", field: "remark" },
    ]

    columns2 = [
        { title: "Nomor PR - No. Referensi PR - Article", field: "prNo" },
    ]

    // items = {
    //     columns: [
    //         "Nomor PR - Nomor Referensi PR",
    //         "Nomor RO",
    //         "Barang",
    //         "Jumlah Diminta",
    //         "Satuan Diminta",
    //         "Jumlah Beli",
    //         "Satuan Beli",
    //         "Jumlah Kecil",
    //         "Satuan Kecil",
    //         "Konversi",
    //         "Harga Satuan",
    //         "Include Ppn?",
    //         "Keterangan"
    //     ],
    //     onRemove: function () {
    //         this.bind();
    //     }
    // };

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.isItem = false;
        // this.itemss=[{prNo:"test"}]

        if (this.data.category) {
            if (this.data.category === "FABRIC") {
                this.isFabric = true;
            }
            else {
                this.isFabric = false;
            }
        }
        else {
            this.isFabric = true;
        }

        if (this.data.items.length > 0) {
            this.isItem = true;
        }

        this.options.readOnly = this.readOnly;
        if (this.data.useIncomeTax) {
            this.options.isUseIncomeTax = true;
        }
        if (this.data.paymentMethod === "CMT") {
            this.options.checkOverBudget = false;
        }
        else if (this.data.paymentMethod === "FREE FROM BUYER") {
            this.options.checkOverBudget = false;
        }
        else {
            this.options.checkOverBudget = true;
        }
        this.options.resetOverBudget = false;

        var item = [];
        for (var data of this.data.items) {

            item.push({
                poNo: data.poNo,
                poId: data.poId,
                prNo: data.prNo,
                prId: data.prId,
                prRefNo: data.prRefNo,
                roNo: data.roNo,
                artikel: data.artikel,
                productId: data.productId,
                product: data.product,
                categoryId: data.categoryId,
                category: data.category,
                defaultQuantity: Number(data.defaultQuantity),
                defaultUom: data.defaultUom,
                dealQuantity: Number(data.defaultQuantity),
                dealUom: data.defaultUom,
                budgetPrice: Number(data.budgetPrice),
                priceBeforeTax: Number(data.budgetPrice),
                pricePerDealUnit: Number(data.budgetPrice),
                isOverBudget: data.isOverBudget,
                uomConversion: data.uomConversion.unit,
                quantityConversion: Number(data.defaultQuantity),
                conversion: data.conversion,
                useIncomeTax: data.useIncomeTax,
                remark: data.remark
            });
            this.total+=data.defaultQuantity;
        }

        this.items = item;
        // this.items.push({ prNo: "Jumlah barang yang dibeli : " + totalDelivered });


    }

    rowFormatter(data, index) {

        if (index === 1) {
            return { classes: "weight" }
        } else {
            return {};
        }
    }


    // @computedFrom("data._id")
    // get isEdit() {
    //     return (this.data._id || '').toString() != '';
    // }

    @computedFrom("data.supplierId")
    get supplierType() {
        if (this.data.supplier) {
            if (this.data.supplier.import)
                return "Import"
            else
                return "Lokal"
        }
        else
            return "Lokal"
    }

    // @computedFrom("data.supplierId")
    // get supplierIsImport() {
    //     if (this.data.supplier) {
    //         if (this.data.supplier.import)
    //             return true
    //         else
    //             return false
    //     }
    //     else
    //         return false
    // }

    // selectedSupplierChanged(newValue) {
    //     var _selectedSupplier = newValue;
    //     if (_selectedSupplier._id) {
    //         this.data.supplier = _selectedSupplier;
    //         this.data.supplierId = _selectedSupplier._id ? _selectedSupplier._id : "";
    //     }
    // }

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

    // categoryChanged(e) {
    //     var selectedCategory = e.srcElement.value;
    //     if (selectedCategory) {
    //         this.data.category = selectedCategory;

    //         this.data.qualityStandard.shrinkage = '';
    //         this.data.qualityStandard.wetRubbing = '';
    //         this.data.qualityStandard.dryRubbing = '';
    //         this.data.qualityStandard.washing = '';
    //         this.data.qualityStandard.darkPrespiration = '';
    //         this.data.qualityStandard.lightMedPrespiration = '';
    //         this.data.qualityStandard.pieceLength = '';
    //         this.data.qualityStandard.qualityStandardType = 'JIS';

    //         if (this.data.category === "FABRIC") {
    //             this.isFabric = true;
    //         }
    //         else {
    //             this.isFabric = false;
    //         }
    //         this.data.items = [];
    //     }
    // }

    // paymentMethodChanged(e) {
    //     var selectedPayment = e.srcElement.value;
    //     if (selectedPayment) {
    //         this.data.paymentMethod = selectedPayment;
    //     }
    //     if (this.data.paymentMethod === "CMT") {
    //         this.options.checkOverBudget = false;
    //         this.resetIsOverBudget();
    //     }
    //     else if (this.data.paymentMethod === "FREE FROM BUYER") {
    //         this.options.checkOverBudget = false;
    //         this.resetIsOverBudget();
    //     }
    //     else {
    //         this.options.resetOverBudget = false;
    //         this.options.checkOverBudget = true;
    //     }
    // }

    // resetIsOverBudget() {
    //     if (this.data.items) {
    //         this.data.items.map(items => {
    //             items.isOverBudget = false;
    //             items.overBudgetRemark = "";
    //         })
    //         this.options.resetOverBudget = true;
    //         this.context.DetailsCollection.bind();
    //     }
    // }
    // paymentTypeChanged(e) {
    //     var selectedPayment = e.srcElement.value;
    //     if (selectedPayment) {
    //         this.data.paymentType = selectedPayment;
    //         if (this.data.paymentType == "CASH" || this.data.paymentType == "T/T BEFORE") {
    //             this.data.paymentDueDays = 0;
    //         }
    //     }
    // }

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

    // useIncomeTaxChanged(e) {
    //     var selectedUseIncomeTax = e.srcElement.checked || false;
    //     if (!selectedUseIncomeTax) {
    //         this.options.isUseIncomeTax = false;
    //         for (var poItem of this.data.items) {
    //             poItem.useIncomeTax = false;
    //             poItem.pricePerDealUnit = poItem.priceBeforeTax;
    //         }
    //     } else {
    //         this.options.isUseIncomeTax = true;
    //     }
    // }

    get supplierLoader() {
        return SupplierLoader;
    }

    get currencyLoader() {
        return CurrencyLoader;
    }

    get vatLoader() {
        return VatLoader;
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

    // async search() {
    //     var result = await this.service.searchByTags(this.keywords, this.data.category, this.context.shipmentDateFrom, this.context.shipmentDateTo);

    //     var items = [];
    //     var getUsedBudget = [];
    //     var getPRById = [];

    //     for (var data of  this.result.items) {

    //                                     items.push({
    //                                         poNo: data.poNo,
    //                                         poId: data.poId,
    //                                         prNo: data.prNo,
    //                                         prId: data.prId,
    //                                         prRefNo: data.prRefNo,
    //                                         roNo: data.roNo,
    //                                         artikel: data.artikel,
    //                                         productId: data.productId,
    //                                         product: data.product,
    //                                         categoryId: data.categoryId,
    //                                         category: data.category,
    //                                         defaultQuantity: Number(data.defaultQuantity),
    //                                         defaultUom: data.defaultUom,
    //                                         dealQuantity: Number(data.defaultQuantity),
    //                                         dealUom: data.defaultUom,
    //                                         budgetPrice: Number(data.budgetPrice),
    //                                         priceBeforeTax: Number(data.budgetPrice),
    //                                         pricePerDealUnit: Number(data.budgetPrice),
    //                                         isOverBudget: data.isOverBudget,
    //                                         uomConversion: data.uomConversion.unit,
    //                                         quantityConversion: Number(data.defaultQuantity),
    //                                         conversion: data.conversion,
    //                                         useIncomeTax: data.useIncomeTax,
    //                                         remark: data.remark
    //                                     });
    //                                 }
    //                                 this.data.items=items;


    //     // this.data.items=result.items
    //     // var listPR = result.data.map((item) => {
    //     //     return item.purchaseRequest._id.toString()
    //     // });
    //     // var listPrIds = listPR.filter(function (elem, index, self) {
    //     //     return index == self.indexOf(elem);
    //     // })

    //     // listPrIds.map((id) => {
    //     //     getPRById.push(this.service.getPRById(id, ["no", "items.refNo", "items.quantity", "items.budgetPrice", "items.product.code"]))
    //     // });

    //     // result.data.map((data) => {
    //     //     getUsedBudget.push(this.service.getListUsedBudget(data.purchaseRequest.no, data.items.refNo, data.items.product.code))
    //     // })
    //     // Promise.all(getPRById)
    //     //     .then((listPR) => {
    //     //         Promise.all(getUsedBudget)
    //     //             .then((listUsedBudget) => {
    //     //                 listUsedBudget = [].concat.apply([], listUsedBudget);
    //     //                 result.data.map((data) => {
    //     //                     var pr = listPR.find((pr) => pr.no.toString() == data.purchaseRequest.no.toString());
    //     //                     var prItem = {};

    //     //                     if (pr) {
    //     //                         prItem = pr.items.find((item) => item.product.code.toString() === data.items.product.code.toString() && item.refNo === data.items.refNo)
    //     //                     }

    //     //                     var budgetUsed = 0;
    //     //                     if (listUsedBudget.length > 0) {
    //     //                         var prevAmount = listUsedBudget.find((budget) => budget.prNo == data.purchaseRequest.no && budget.prRefNo == data.items.refNo && budget.product == data.items.product.code);
    //     //                         if (prevAmount) {
    //     //                             budgetUsed = budgetUsed + prevAmount.totalAmount;
    //     //                         }
    //     //                     }

    //                         // items.push({
    //                         //     poNo: data.no,
    //                         //     poId: data._id,
    //                         //     prNo: data.purchaseRequest.no,
    //                         //     prId: data.purchaseRequest._id,
    //                         //     prRefNo: data.items.refNo,
    //                         //     roNo: data.roNo,
    //                         //     productId: data.items.productId,
    //                         //     product: data.items.product,
    //                         //     categoryId: data.items.category._id,
    //                         //     category: data.items.category,
    //                         //     defaultQuantity: Number(data.items.defaultQuantity),
    //                         //     defaultUom: data.items.defaultUom,
    //                         //     dealQuantity: Number(data.items.defaultQuantity),
    //                         //     dealUom: data.items.defaultUom,
    //                         //     budgetPrice: Number(data.items.budgetPrice),
    //                         //     priceBeforeTax: Number(data.items.budgetPrice),
    //                         //     pricePerDealUnit: Number(data.items.budgetPrice),
    //                         //     budgetUsed: budgetUsed,
    //                         //     isOverBudget: false,
    //                         //     totalBudget: prItem.quantity * prItem.budgetPrice,
    //                         //     uomConversion: data.items.category.uom || data.items.defaultUom,
    //                         //     quantityConversion: Number(data.items.defaultQuantity),
    //                         //     conversion: 1,
    //                         //     useIncomeTax: false,
    //                         //     remark: data.items.remark
    //                         // });
    //     //                 })
    //     //                 items = [].concat.apply([], items);
    //     //                 this.data.items = items;
    //     //                 this.isItem = true;
    //     //             })
    //     //     })

    //     if (this.error.items) {
    //         this.error.items = [];
    //     }
    // }

} 