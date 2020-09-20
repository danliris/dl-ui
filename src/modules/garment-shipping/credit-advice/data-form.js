import { inject, bindable } from 'aurelia-framework'
import { Service, CoreService } from "./service";

var ShippingInvoiceLoader = require('../../../loader/garment-shipping-invoice-loader');
var ForwarderLoader = require('../../../loader/garment-forwarders-loader');

@inject(Service, CoreService)
export class DataForm {

    constructor(service, CoreService) {
        this.service = service;
        this.coreService = CoreService;
    }

    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable title;

    @bindable selectedShippingInvoice;

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 6
        }
    };

    lcTypeOptions = [
        "AT SIGHT",
        "USANCE",
        "COLLECTION"
    ];

    conditionOptions = [
        "CLEAN",
        "LG",
        "USANCE"
    ];

    get shippingInvoiceLoader() {
        return ShippingInvoiceLoader;
    }

    get forwarderLoader() {
        return ForwarderLoader;
    }

    orderView = (data) => {
        return `${data.Code || data.code} - ${data.Name || data.name}`
    }

    forwarderView = (data) => {
        return `${data.Code || data.code} - ${data.Name || data.name}`
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
    }

    lcTypeChanged() {
        this.data.inkaso = 0;
        this.data.disconto = 0;
    }

    selectedShippingInvoiceChanged(newValue, oldValue) {
        if (newValue) {
            this.data.packingListId = newValue.packingListId;
            this.data.invoiceId = newValue.id;
            this.data.invoiceNo = newValue.invoiceNo;
            this.data.date = newValue.invoiceDate;
            this.data.amount = newValue.totalAmount;
            this.data.amountToBePaid = newValue.amountToBePaid;

            if (this.data.packingListId) {
                this.service.getPackingListById(this.data.packingListId)
                    .then(packingListData => {
                        this.data.paymentTerm = packingListData.paymentTerm;
                        if (this.data.paymentTerm == "LC") {
                            this.data.lcNo = packingListData.lcNo;
                        }
                    });
            }

            this.data.buyer = newValue.buyerAgent || {};
            if (this.data.buyer.id) {
                this.coreService.getBuyerById(this.data.buyer.id)
                    .then(buyerResult => {
                        this.data.buyer.address = buyerResult.Address;
                    });
            }

            this.data.bank = {
                id: newValue.bankAccountId,
                accountName: newValue.bankAccount
            };
            if (this.data.bank.id) {
                this.coreService.getBankById(this.data.bank.id)
                    .then(bankResult => {
                        this.data.bank.bankAddress = bankResult.BankAddress;
                    });
            }
        } else {
            this.data.packingListId = 0;
            this.data.invoiceId = 0;
            this.data.invoiceNo = null;
            this.data.date = null;
            this.data.amount = 0;
            this.data.amountToBePaid = 0;
            this.data.buyer = null;
            this.data.bank = null;
        }
    }

}
