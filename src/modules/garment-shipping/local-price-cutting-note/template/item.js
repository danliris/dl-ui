import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from '../service';

const SalesNoteLoader = require('../../../../loader/garment-shipping-local-sales-note-loader');

@inject(Service)
export class Item {
    constructor(service) {
        this.service = service;
    }

    @bindable selectedSalesNote;

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;

        if (this.data.salesNoteId) {
            this.selectedSalesNote = {
                id: this.data.salesNoteId,
                noteNo: this.data.salesNoteNo
            };
        }
    }

    get salesNoteLoader() {
        return SalesNoteLoader;
    }

    get salesNoteFilter() {
        return {
            buyerId: this.context.context.options.buyerId
        };
    }

    selectedSalesNoteChanged(newValue) {
        if (newValue) {
            this.data.salesNoteId = newValue.id;
            this.data.salesNoteNo = newValue.noteNo;
            this.service.getSalesNoteById(newValue.id)
                .then(sn => {
                    this.data.salesAmount = sn.items.reduce((acc, cur) => acc += cur.price * cur.quantity, 0);
                });
        } else {

        }
    }
}