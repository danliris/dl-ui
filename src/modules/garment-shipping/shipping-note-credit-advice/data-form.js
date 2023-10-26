import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service, CoreService } from "./service";

import numeral from 'numeral';
numeral.defaultFormat("0,0.00");

var ShippingDebitNoteLoader = require('../../../loader/garment-shipping-debit-note-loader');
var ShippingCrediyNoteLoader = require('../../../loader/garment-shipping-credit-note-loader');

@inject(Service, CoreService)
export class DataForm {

    constructor(service, CoreService) {
        this.service = service;
        this.coreService = CoreService;
    }

    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable title;

    @bindable selectedShippingDebitNote;
    @bindable selectedShippingCreditNote;
    

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 6
        }
    };

    paymentTypeOptions = [
        "TT PAYMENT",
        "LC PAYMENT"
    ];

    noteTypeOptions = [
        "NOTA DEBIT",
        "NOTA KREDIT"
    ];

    get shippingDebitNoteLoader() {
        return ShippingDebitNoteLoader;
    }

    get shippingCreditNoteLoader() {
        return ShippingCrediyNoteLoader;
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
    }

    selectedShippingDebitNoteChanged(newValue, oldValue) {
        if (newValue) {
            this.data.shippingNoteId = newValue.id;
            this.data.noteNo = newValue.noteNo;
            this.data.date = newValue.date;
            this.data.amount = newValue.totalAmount - newValue.amountCA;

            console.log('this.data', this.data);
          
            // this.data.amountToBePaid = newValue.amountToBePaid;
            // this.data.amountPaid = newValue.amountToBePaid;
            // this.data.balancaAmount =  this.data.amountToBePaid - this.data.amountPaid;
      
            this.data.paidAmount =  newValue.totalAmount - newValue.amountCA;
            this.data.balancaAmount =  this.data.amount - this.data.paidAmount;        
            //
            this.data.buyer = newValue.buyer || {};
            if (this.data.buyer.id) {
                this.coreService.getBuyerById(this.data.buyer.id)
                    .then(buyerResult => {
                        this.data.buyer.code = buyerResult.Code;
                        this.data.buyer.address = buyerResult.Address;
                    });
            }

            // this.data.bank = {
            //     id: newValue.bankAccountId,
            //     accountName: newValue.bankAccount          
            // };

           this.data.bank = newValue.bank || {};
            if (this.data.bank.id) {
                this.coreService.getBankById(this.data.bank.id)
                    .then(bankResult => {
                        this.data.bank.AccountNumber = bankResult.AccountNumber;
                        this.data.bank.accountName = bankResult.AccountName;
                        this.data.bank.bankAddress = bankResult.BankAddress;  

                    });
                    console.log(this.data.bank);
            }
        } else {
            this.data.shippingNoteId = 0;
            this.data.noteeNo = null;
            this.data.date = null;
            this.data.amount = 0;
            this.data.paidAmount = 0;
            this.data.balanceAmount = 0;
            this.data.buyer = null;
            this.data.bank = null;
        }
    }

    selectedShippingCreditNoteChanged(newValue, oldValue) {
        if (newValue) {
            this.data.shippingNoteId = newValue.id;
            this.data.noteNo = newValue.noteNo;
            this.data.date = newValue.date;
            this.data.amount = newValue.totalAmount - newValue.amountCA;
          
            // this.data.amountToBePaid = newValue.amountToBePaid;
            // this.data.amountPaid = newValue.amountToBePaid;
            // this.data.balancaAmount =  this.data.amountToBePaid - this.data.amountPaid;
      
            this.data.paidAmount =  newValue.totalAmount - newValue.amountCA;
            this.data.balancaAmount =  this.data.amount - this.data.paidAmount;        
            //
            this.data.buyer = newValue.buyer || {};
            if (this.data.buyer.id) {
                this.coreService.getBuyerById(this.data.buyer.id)
                    .then(buyerResult => {
                        this.data.buyer.code = buyerResult.Code;
                        this.data.buyer.name = buyerResult.Name;
                        this.data.buyer.address = buyerResult.Address;
                    });
            }

           this.data.bank = newValue.bank || {};
            if (this.data.bank.id) {
                this.coreService.getBankById(this.data.bank.id)
                    .then(bankResult => {
                        this.data.bank.AccountNumber = bankResult.AccountNumber;
                        this.data.bank.accountName = bankResult.AccountName;
                        this.data.bank.bankAddress = bankResult.BankAddress;  

                    });
                    console.log(this.data.bank);
            }
        } else {
            this.data.shippingNoteId = 0;
            this.data.noteeNo = null;
            this.data.date = null;
            this.data.amount = 0;
            this.data.paidAmount = 0;
            this.data.balanceAmount = 0;
            this.data.buyer = null;
            this.data.bank = null;
        }
    }


    @computedFrom('data.amount', 'data.paidAmount')
        get BalanceAmount() {
            // console.log(this.data.amountToBePaid);
            // console.log(this.data.amountPaid);
            let BalanceAmount = this.data.amount - this.data.paidAmount;
            console.log(BalanceAmount);
            BalanceAmount = numeral(BalanceAmount).format();
            this.data.balanceAmount = numeral(BalanceAmount).value();           
            return BalanceAmount;                    
      }

    @computedFrom('data.paidAmount', 'data.bankComission', 'data.bankCharges', 'data.creditInterest', 'data.insuranceCharge')
    get NETTNEGO() {
    
        let NETTNEGO = this.data.paidAmount  - (this.data.bankComission + this.data.creditInterest + this.data.bankCharges + this.data.insuranceCharge);
        // console.log(NETTNEGO);
        NETTNEGO = numeral(NETTNEGO).format();
        this.data.nettNego = numeral(NETTNEGO).value();           
        return NETTNEGO;
 
      }
}