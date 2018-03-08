import { inject, bindable } from 'aurelia-framework';
import { Service } from '../service';

const MaterialRequestNoteLoader = require('../../../../../loader/material-request-note-loader');

@inject(Service)
export class MaterialRequestNoteItem {
    @bindable materialRequestNote;

    columns = ["No SPP", "Nama Barang", "Grade", "Jumlah (Piece)", "Panjang SPB (Meter)", "Panjang Barang Datang", "Disposisi", "Asal"];

    constructor(service) {
        this.service = service;
    }

    activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;
        this.readOnly = context.options.readOnly;
        this.isShowing = false;

        if (this.error && this.error.MaterialDistributionNoteDetails) {
            this.isShowing = true;
        }

        if (this.data.MaterialRequestNoteId)
            this.materialRequestNote = { Code: this.data.MaterialRequestNoteCode };

        if (!this.readOnly)
            this.columns.push("");
    }

    toggle() {
        this.isShowing = !this.isShowing;
    }

    materialRequestNoteChanged(newValue, oldValue) {
        if (newValue) {
            this.service.getMaterialRequestNoteById(newValue.Id)
                .then(result => {
                    let processedData = {
                        MaterialRequestNoteId: result.Id,
                        MaterialRequestNoteCode: result.Code,
                        MaterialDistributionNoteDetails: []
                    };

                    for (let item of result.MaterialsRequestNote_Items) {
                        let grades = item.Grade.split("");

                        for (let grade of grades) {
                            let detail = {
                                MaterialsRequestNoteItemId: item.Id,
                                ProductionOrder: item.ProductionOrder,
                                Product: item.Product,
                                MaterialRequestNoteItemLength: item.Length,
                                Grade: grade
                            };

                            processedData.MaterialDistributionNoteDetails.push(detail);
                        }
                    }

                    Object.assign(this.data, processedData);
                    this.isShowing = true;
                });
        }
        else {
            this.data = {};
        }
    }

    onRemove() {
        this.bind();
    }

    get materialRequestNoteLoader() {
        return MaterialRequestNoteLoader
    }
}