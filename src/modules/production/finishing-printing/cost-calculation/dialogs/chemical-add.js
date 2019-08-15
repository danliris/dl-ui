import { inject, useView, bindable, computedFrom } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { Service } from '../service';
var ProductLoader = require('../../../../../loader/product-null-tags-loader');
@inject(DialogController, Service)
@useView("modules/production/finishing-printing/cost-calculation/dialogs/utility-form.html")
export class UtilityForm {
    constructor(dialogController, service) {
        this.dialogController = dialogController;
        this.service = service;
    }
    @bindable data;
    @bindable selectedProduct;

    yearOptions = [];
    async activate(data) {
        console.log(data);
        this.data = data;
    }
    get productLoader() {
        return ProductLoader;
    }

    selectedProductChanged(n, o) {

    }

    saveCallback() {


        let query = {
            month: this.month.MonthNumber,
            year: this.year,
        }

        this.service.getXlsAll(query);

    }
}