import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Dialog } from '../../../../../../components/dialog/dialog';
import numeral from 'numeral';
numeral.defaultFormat("0,0.00");
const ProductLoader = require('../../../../../../loader/product-loader');
const CategoryLoader = require('../../../../../../loader/category-loader');
const MachineLoader = require('../../../../../../loader/machines-loader');
import { Service } from '../../service';
import { ServiceCore } from '../../service-core';
import { UtilityForm } from '../../dialogs/utility-form';

const rateNumberFormat = "0,0.000";

// const materialLoader = require('../../../../../loader/material-md-loader');
const UomLoader = require('../../../../../../loader/uom-loader');

@inject(Dialog, Service, ServiceCore)
export class CostCalculationMaterial {
    @bindable selectedMachine;

    controlOptions = {
        control: {
            length: 12
        }
    };

    constructor(dialog, service, serviceCore) {
        this.dialog = dialog;
        this.service = service;
        this.serviceCore = serviceCore
    }

    @bindable isProcess = false;
    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.readOnly = this.options.readOnly || false;
        this.disabled = true;

        if (this.data.Id) {

            this.isReadOnly = true;
        }
        console.log(this.data);
    }

    bind() {

    }

    // @bindable productCode = "Test";


    get machineLoader() {
        return MachineLoader;
    }

    selectedMachineChanged(n, o) {
        if (this.selectedMachine) {
            this.data.Machine = this.selectedMachine;
            this.data.Utility = this.selectedMachine.Electric + this.selectedMachine.Steam + this.selectedMachine.Water + this.selectedMachine.Solar + this.selectedMachine.LPG;
        }
    }

    chemicalAdd(){
        
    }

    utilityToggle() {
        this.dialog.show(UtilityForm, this.selectedMachine)
            .then(response => {
                return response;
            });
    }

    @computedFrom('data.Quantity', 'data.Price', 'data.Conversion', 'data.isFabricCM')
    get total() {
        let total = this.data.Quantity && this.data.Conversion && parseFloat(this.data.Price) ? (parseFloat(this.data.Price) / this.data.Conversion * this.data.Quantity) : 0;
        //total = numeral(total).format();
        if (this.data.isFabricCM) {
            this.data.Total = 0;
            this.data.TotalTemp = numeral(total).value();
            this.data.CM_Price = numeral(total).value();
        }
        else {
            this.data.Total = numeral(total).value();
            this.data.TotalTemp = numeral(total).value();;
            this.data.CM_Price = null;
        }
        total = parseFloat(total).toFixed(2);

        return total;
    }

}