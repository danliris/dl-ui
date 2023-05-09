import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from "../service";

const InvoiceLoader = require('../../../../loader/garment-shipping-invoice-loader');
const BuyerLoader = require('../../../../loader/garment-buyers-loader');
@inject(Service)
export class invoiceEMKL {
    @bindable selectedInvoice;
    @bindable selectedBuyer;
    constructor(service) {
        this.service = service;
    }

    async activate(context) {
        this.context = context;
        this.data = context.data;
        this.dataItems = context.context.items;
        this.error = context.error;
        this.options = context.options;
        this.readOnly = this.options.readOnly;
        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        this.isFreightCharged = context.context.options.data.isFreightCharged;
        this.itemOptions = {
            error: this.error,
            isCreate: this.isCreate,
            readOnly: this.readOnly,
            isEdit: this.isEdit,
        };

        if (this.data.invoiceNo) {
            this.selectedInvoice = {
                invoiceNo: this.data.invoiceNo,
                id: this.data.invoiceId
            }
        }

        if (this.data.buyerAgent) {

            this.selectedBuyer = this.data.buyerAgent;

        }

        if (this.data.id) {
            var invoice = await this.service.getInvoiceById(this.data.invoiceId);
            this.data.items = invoice.items;
            var pl = await this.service.getPackingListByInvoice({ filter: JSON.stringify({ InvoiceNo: this.data.invoiceNo }) });
            if (pl.data.length > 0) {
                var packing = await this.service.getPLById(pl.data[0].id);
                this.data.cbm = 0;
                for (var m of packing.measurements) {
                    this.data.cbm += m.length * m.width * m.height * m.cartonsQuantity / 1000000;
                }
            }
        }
    }

    get buyerLoader() {
        return BuyerLoader;
    }

    buyerView = (data) => {
        var code = data.Code || data.code;
        var name = data.Name || data.name;
        return `${code} - ${name}`;
    }

    selectedBuyerChanged(newValue) {
        if (newValue != this.data.buyerAgent) {
            this.data.buyerAgent = newValue;
            // this.filter={
            //     BuyerAgentCode: this.data.buyerAgent.Code || this.data.buyerAgent.code
            // }
        }
    }

    // get invoiceLoader() {
    //     return InvoiceLoader;
    // }

    invoiceView = (invoiceView) => {
        return `${invoiceView.invoiceNo}`;
    }
    get invoiceLoader() {
        return (keyword) => {
            var info = {
                keyword: keyword,
                filter: JSON.stringify({ BuyerAgentCode: this.data.buyerAgent.Code || this.data.buyerAgent.code })
            };
            return this.service.getInvoice(info)
                .then((result) => {
                    var invoiceList = [];
                    for (var a of result.data) {
                        var dup = this.dataItems.find(d => d.data.invoiceNo == a.invoiceNo);
                        if (!dup) {
                            invoiceList.push(a);
                        }
                    }
                    return invoiceList;
                });
        }
    }

    async selectedInvoiceChanged(newValue) {
        if (newValue) {
            this.data.invoiceNo = newValue.invoiceNo;
            this.data.invoiceId = newValue.id;
            this.data.amount = newValue.totalAmount;
            this.data.quantity = 0;
            var invoice = await this.service.getInvoiceById(this.data.invoiceId);
            for (var item of invoice.items) {
                this.data.quantity += item.quantity;
            }
            this.data.items = invoice.items;
            this.data.totalCarton = 0;
            var coverLetter = await this.service.getCoverLetterByInvoice({ filter: JSON.stringify({ InvoiceNo: this.data.invoiceNo }) });
            if (coverLetter.data.length > 0) {
                for (var cv of coverLetter.data) {
                    this.data.totalCarton += cv.cartoonQuantity;
                }
            }
            var pl = await this.service.getPackingListByInvoice({ filter: JSON.stringify({ InvoiceNo: this.data.invoiceNo }) });
            if (pl.data.length > 0) {
                var packing = await this.service.getPLById(pl.data[0].id);
                this.data.cbm = 0;
                for (var m of packing.measurements) {
                    this.data.cbm += m.length * m.width * m.height * m.cartonsQuantity / 1000000;
                }
            }
        }
    }
}