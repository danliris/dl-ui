import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service, CoreService } from "./service";

import numeral from 'numeral';
numeral.defaultFormat("0,0.00");
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
            // this.data.amountToBePaid = newValue.amountToBePaid - newValue.amountCA;
            // this.data.amountPaid = newValue.amountToBePaid - newValue.amountCA;

            // this.data.amountToBePaid = newValue.amountToBePaid;
            // this.data.amountPaid = newValue.amountToBePaid;
            // this.data.balancaAmount =  this.data.amountToBePaid - this.data.amountPaid;
            this.data.lessFabricCost = 0;
            this.data.dhlCharges = 0;

            var lessFabCost = 0;
        
            if (newValue.items) {
                console.log(newValue);
                for (var item of newValue.items) {
                   
                    // if (item.amount > 0) {
                    //     totalAmount = totalAmount + (item.price * item.quantity);
                    // } else {
                    //    totalAmount = 0;
                    // }

                     if (item.cmtPrice > 0) {
                        lessFabCost += ((item.cmtPrice-item.price) * item.quantity);
                    }
                }
            }

            this.data.lessFabricCost = lessFabCost;
            //console.log(this.data.lessFabricCost);
            this.data.amountToBePaid = newValue.totalAmount + this.data.lessFabricCost + newValue.dhlCharges - newValue.amountCA ;
            this.data.amountPaid =  this.data.amountToBePaid ;
            //this.data.balancaAmount =  newValue.totalAmount + newValue.dhlCharges + this.data.lessFabricCost - newValue.amountCA - this.data.amountPaid;
            this.data.balancaAmount =  this.data.amountToBePaid + this.data.dhlCharges - this.data.amountPaid;
           
            //
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
                        this.data.buyer.code = buyerResult.Code;
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
                        this.data.bank.AccountNumber = bankResult.AccountNumber;
                        this.data.bank.bankAddress = bankResult.BankAddress;                        
                    });
                    console.log(this.data.bank);
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

    //  @computedFrom('data.amount', 'data.lessFabricCost')
    //  get amountToBePaid() {
    //         // console.log(this.data.amount);
    //         // console.log(this.data.lessFabricCost);
    //         // console.log(this.data.dhlCharges);
        
    //         let AmtToBePaid = this.data.amount + this.data.lessFabricCost;
    //         console.log(AmtToBePaid);
    //         AmtToBePaid = numeral(AmtToBePaid).format();
    //         this.data.amountToBePaid = numeral(AmtToBePaid).value();           
    //         return AmtToBePaid;                    
    //  }

    //

    @computedFrom('data.amountToBePaid', 'data.dhlCharges', 'data.amountPaid')
        get BalanceAmount() {
            // console.log(this.data.amountToBePaid);
            // console.log(this.data.amountPaid);
            let BalanceAmount = this.data.amountToBePaid + this.data.dhlCharges - this.data.amountPaid;
            console.log(BalanceAmount);
            BalanceAmount = numeral(BalanceAmount).format();
            this.data.balanceAmount = numeral(BalanceAmount).value();           
            return BalanceAmount;                    
      }

    @computedFrom('data.paymentTerm', 'data.amountToBePaid', 'data.dhlCharges', 'data.bankCharges', 'data.otherCharge', 'data.bankComission', 'data.discrepancyFee', 'data.creditInterest')
    get NETTNEGO() {
        // console.log(this.data.paymentTerm)
        if (this.data.paymentTerm === "TT/OA") {
            // console.log(this.data.amountToBePaid);
            // console.log(this.data.bankCharges);
            // console.log(this.data.otherCharge);
            let NETTNEGO = (this.data.amountToBePaid + this.data.dhlCharges) - (this.data.bankComission + this.data.creditInterest + this.data.bankCharges + this.data.otherCharge );
            // console.log(NETTNEGO);
            NETTNEGO = numeral(NETTNEGO).format();
            this.data.nettNego = numeral(NETTNEGO).value();           
            return NETTNEGO;
        }
        else {
            // console.log(this.data.amountToBePaid);
            // console.log(this.data.bankComission);
            // console.log(this.data.discrepancyFee);
            // console.log(this.data.creditInterest);
            // console.log(this.data.bankCharges);

            let NETTNEGO =  (this.data.amountToBePaid + this.data.dhlCharges) - (this.data.bankComission + this.data.discrepancyFee + this.data.creditInterest + this.data.bankCharges);
            NETTNEGO = numeral(NETTNEGO).format();
            this.data.NETTNEGO = numeral(NETTNEGO).value();
            return NETTNEGO;
        }    
      }
}