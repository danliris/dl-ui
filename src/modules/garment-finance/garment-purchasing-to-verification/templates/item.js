import { bindable, inject } from 'aurelia-framework';
import moment from 'moment';
import numeral from 'numeral';
import { Service } from '../service';
const InternalNoteLoader = require('../../shared/internal-note-loader');

@inject(Service)
export class Item {
    @bindable unitPaymentOrder;

    constructor(service) {
        this.service = service;
    }

    activate(context) {
        this.data = context.data;
        this.error = context.error;
    }

    toggle() {
        this.isShowing = !this.isShowing;
    }

    onRemove() {
        this.bind();
    }

    get internalNoteLoader() {
        return InternalNoteLoader;
    }
}