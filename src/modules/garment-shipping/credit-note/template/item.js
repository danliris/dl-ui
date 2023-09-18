import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
const CurrencyLoader = require('../../../../loader/garment-currencies-by-date-loader');
const DebitCreditNote = require('../../../../loader/debit-credit-note-loader');
import { Service } from '../service';

@inject(Service)
export class Item {
    constructor(service) {
        this.service = service;
    }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
    }

    get currencyLoader() {
        return CurrencyLoader;
    }
    get debitCreditNoteLoader(){
        return DebitCreditNote;
    }

    creditNoteView = (data) => {
        return `${data.ItemTypeDCN || data.itemTypeDCN}`;
    }
    cnQuery = {
        "TypeDCN": "CREDIT NOTE"
      }
}