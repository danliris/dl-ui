import { inject, useView, bindable, computedFrom } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { Service } from '../service';

var ProductLoader = require('../../../../../loader/product-null-tags-loader');

@inject(DialogController, Service)
@useView("modules/production/finishing-printing/cost-calculation/dialogs/chemical-add-form.html")
export class ChemicalAddForm {
    constructor(dialogController, service) {
        this.dialogController = dialogController;
        this.service = service;
    }

    @bindable data;
    @bindable error;
    async activate(data) {
        this.data = data.machine;
        this.data.Quantity = 0;
        this.chemicals = data.chemicals;
        this.error = {};
    }

    get productLoader() {
        return ProductLoader;
    }

    @bindable selectedChemical;
    selectedChemicalChanged(newValue, oldValue) {

    }

    validate() {
        var isNotValid = false;
        this.error = {};
        if (!this.selectedChemical || !this.selectedChemical.Id) {
            this.error.Chemical = "Chemical harus diisi";
            isNotValid = true;
        }

        if (this.data.Quantity <= 0) {
            this.error.Quantity = "Kuantiti harus lebih besar dari 0";
            isNotValid = true;
        }

        return isNotValid;

    }

    isDuplicate() {
        let chemical = this.chemicals.find((chemical) => chemical.Chemical.Id == this.selectedChemical.Id);

        this.error = {};
        if (chemical) {
            this.error.Chemical = `Data dengan kode ${this.selectedChemical.Code} sudah ada`;
            return true;
        }
        else
            return false
    }

    get totalPrice() {
        if (this.selectedChemical && this.selectedChemical.Id)
            return this.selectedChemical.Price * this.data.Quantity;
        else {
            return 0;
        }
    }

    saveAndClose(event) {
        if (!this.validate() && !this.isDuplicate()) {
            this.error = {};
            let chemical = {
                "Chemical": this.selectedChemical,
                "Quantity": this.data.Quantity
            };
            this.chemicals.push(chemical);
            this.dialogController.ok(this.chemicals);
        }
    }

    saveAndAddOthers(event) {
        // this.dialogController.ok(this.data);
        if (!this.validate() && !this.isDuplicate()) {
            this.error = {};
            let chemical = Object.assign({}, {
                "Chemical": Object.assign({}, this.selectedChemical),
                "Quantity": this.data.Quantity
            })
            this.chemicals.push(chemical);
            this.selectedChemical = null;
            this.data.Quantity = 0;
        }
    }

    close(event) {
        this.dialogController.ok(this.chemicals);
    }
}