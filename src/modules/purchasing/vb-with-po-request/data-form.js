import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";

var CurrencyLoader = require('../../../loader/currency-loader');
const UnitLoader = require('../../../loader/unit-loader');

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable options = {};
    @bindable title;
    // useVat: false 
    @bindable selectedCurrency;

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    itemsColumns = [{ header: "Nomor PO", value: "purchaseRequest.no" },
    { header: "Unit", value: "Unit" }]

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
    }

    bind(context) {

        this.context = context;
        this.data = this.context.data;
        console.log(this.data)
        this.error = this.context.error;
        this.data.TotalPaid = this.getTotalPaid;

        if (this.data.Unit && this.data.Unit.Id) {
            this.selectedUnit = this.data.Unit;
        }
        this.selectedCurrency = this.data.Currency;

        if (this.data.TotalPaid) {
            this.TotalPaid = this.data.TotalPaid;
            this.data.TotalPaid = this.getTotalPaid;
        }
    }

    get addItems() {
        return (event) => {
            this.data.Items.push({ purchaseRequest: { no: "" } })
        };
    }

    get currencyLoader() {
        return CurrencyLoader;
    }

    @bindable selectedCurrency;
    selectedCurrencyChanged(newValue, oldValue) {

        this.data.Currency = newValue;
        if (this.data.Currency) {
            this.options.CurrencyCode = this.data.Currency.Code;
        }
    }

    @bindable selectedUnit;
    selectedUnitChanged(newValue, oldValue) {
        if (this.selectedUnit && this.selectedUnit.Id) {
            this.data.unit = {};
            this.data.unit.id = this.selectedUnit.Id;
            this.data.unit.name = this.selectedUnit.Name;
            this.data.unit.code = this.selectedUnit.Code;

            if (this.selectedUnit.Division) {
                this.data.division = {};
                this.data.division.id = this.selectedUnit.Division.Id;
                this.data.division.name = this.selectedUnit.Division.Name;
            }
            else {
                this.data.division = {};
                this.data.division.id = this.data.Division.Id;
                this.data.division.name = this.data.Division.Name;
            }
        }
        else {
            this.data.unit.id = this.selectedUnit.id;
            this.data.unit.name = this.selectedUnit.name;
            this.data.unit.code = this.selectedUnit.code;
        }
    }

    // get getTotalPaid() {
    //     var result = 0;
    //     console.log(this.data.Items)
    //     if (this.data.Items) {
    //         console.log(this.data.Items)
    //         // if (this.data.Items.items) {
    //         if(this.data.Items.length > 1){

    //             for (var productList of this.data.items) {
    //                 console.log(productList)
    //                 for (var proddetail of productList.details) {
    //                     console.log(proddetail.priceBeforeTax)
    //                     result += proddetail.priceBeforeTax;
    //                 }
    //             }
    //         }

    //         // }

    //     }
    //     this.data.TotalPaid = result;
    //     return result;
    // }

    get getTotalPaid() {
        var result = 0;
        // console.log(this.data.Items)
        if (this.data.Items) {
            // console.log("masuk")
            // console.log(this.data.Items)
            for (var productList of this.data.Items) {
                // console.log(productList.details)
                if (productList.details) {

                    for (var proddetail of productList.details) {
                        // console.log(proddetail.priceBeforeTax)
                        result += parseFloat(proddetail.priceBeforeTax.toString().replace(/,/g,"")) * parseFloat(proddetail.dealQuantity.toString().replace(/,/g,""));
                    }
                }
                else if(productList.Details){
                    for (var proddetail of productList.Details) {
                        // console.log(proddetail.priceBeforeTax)
                        result += parseFloat(proddetail.priceBeforeTax.toString().replace(/,/g,"")) * parseFloat(proddetail.dealQuantity.toString().replace(/,/g,""));
                    }
                }
            }
        }

        // else {
        //     if (this.data.items) {
        //         for (var productList of this.data.items) {
        //             for (var proddetail of productList.details) {
        //                 result += proddetail.priceBeforeTax * proddetail.defaultQuantity;
        //             }
        //         }
        //     }

        // }
        this.data.TotalPaid = result;
        return result.toLocaleString('en-EN', { minimumFractionDigits: 2 });
    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`

    }

    get unitLoader() {
        return UnitLoader;
    }

}
