import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
import moment from 'moment';

var DispositionLoader = require('../../../loader/purchase-dispositions-all-loader');
//var IncomeTaxLoader = require('../../../loader/income-tax-loader');

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable DispositionNo;
    @bindable supplierName;

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }
    itemsColumns = [{ header: "Nomor External PO" },
    { header: "Kena PPN" },
    { header: "Kena PPH" },
    { header: "PPH" },
    { header: "" }];

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
        this.dispositionNoQuery = { "position": 3 };
        this.selectDispositionNo = [
            'DispositionNo',
            'Supplier.name', 'Supplier.code',
            'Currency.code',
            'Bank',
            'ConfirmationOrderNo',
            'InvoiceNo',
            'PaymentMethod',
            'PaymentDueDate',
            'Calculation',
            'Remark',
            'ProformaNo',
            'Investation',
            'Amount',
            'Items.EPONo',
            'Items.UseVat',
            'Items.UseIncomeTax',
            'Items.IncomeTax.name',
            'Items.IncomeTax.rate',
            'Items.Details.PRNo',
            'Items.Details.Category.name',
            'Items.Details.Product.name', 'Items.Details.Product.code',
            'Items.Details.DealQuantity',
            'Items.Details.DealUom.unit',
            'Items.Details.PaidQuantity',
            'Items.Details.PricePerDealUnit',
            'Items.Details.PriceTotal',
            'Items.Details.PaidPrice',
            'Items.Details.Unit.name',
        ];
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        if (!this.data || !this.data.Id) {
            this.data.VerifyDate = moment(new Date()).format("DD-MMM-YYYY");
        } else {
            this.supplierName = this.data.Supplier.code + " - " + this.data.Supplier.name;
        }
        if (this.readOnly) {
            this.data.Amount = this.data.Amount.toLocaleString('en-EN', { minimumFractionDigits: 4 });
        }
    }
    context = ["Rincian Purchase Request"];


    supplierView = (supplier) => {
        var code = supplier.code || supplier.Code;
        var name = supplier.name || supplier.Name;
        return `${code} - ${name}`
    }

    currencyView = (currency) => {
        return `${currency.code}`
    }

    DispositionNoChanged(newVal, oldVal) {
        if (this.DispositionNo) {

            this.data = Object.assign(this.data, this.DispositionNo)
            debugger
            this.supplierName = this.data.Supplier.code + " - " + this.data.Supplier.name;

        } else {
            this.data = Object.assign(this.data, {})
        }
    }

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        editText: "Ubah",
        deleteText: "Hapus",
    };

    get dispositionLoader() {
        return DispositionLoader;
    }
} 