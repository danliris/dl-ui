import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service, CoreService } from '../service';

const UnitLoader = require('../../../../../loader/garment-units-loader');
const ROLoader = require('../../../../../loader/garment-external-purchase-orders-item-by-ro-loader');
const LeftoverComodityLoader = require('../../../../../loader/garment-leftover-comodity-loader');


@inject(Service, CoreService)
export class ItemFinishedGood {

    @bindable selectedUnit;
    @bindable selectedLeftoverComodity;
    @bindable selectedRo;

    constructor(service, coreService) {
        this.service = service;
        this.coreService = coreService;
    }

    async activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        if(this.data.Uom == null) {
            let uomResult = await this.coreService.getUom({ size: 1, filter: JSON.stringify({ Unit: 'PCS' }) });
            this.data.Uom = {
                Id: uomResult.data[0].Id,
                Unit: uomResult.data[0].Unit
            }
        }

        if (this.data) {
            this.selectedUnit = this.data.Unit;
            this.selectedLeftoverComodity = this.data.LeftoverComodity;
            this.selectedRo = this.data.RONo;
        }
    }
    filter={
        'RONo.Contains("M")': "false", 
        'RONo.Contains("S")': "false"
    };
        
    get unitLoader() {
        return UnitLoader;
    }

    get roLoader() {
        return ROLoader;
    }

    get leftoverComodityLoader() {
        return LeftoverComodityLoader;
    }

    selectedUnitChanged(newValue) {
        this.data.Unit = null;
        if(newValue) {
            this.data.Unit = {
                Id: newValue.Id,
                Code: newValue.Code,
            }
        }
    }

    async selectedPONoChanged(newValue, oldValue) {
        this.data.PONo = null;
        this.data.Product = null;
        this.data.Construction = null;
        this.data.Composition = null;

        if (newValue) {
            this.data.PONo = newValue.PO_SerialNumber;
            this.data.Product = {
                Id: newValue.Product.Id,
                Code: newValue.Product.Code,
                Name: newValue.Product.Name
            }
            let garmentProductsResult = await this.coreService.getGarmentProducts({ size: 1, filter: JSON.stringify({ Id: this.data.Product.Id }) });
            this.data.Construction = garmentProductsResult.data[0].Const;
            this.data.Composition= garmentProductsResult.data[0].Composition;
        }
    }

    selectedLeftoverComodityChanged(newValue, oldValue) {
        this.data.LeftoverComodity = null;

        if (newValue) {
            this.data.LeftoverComodity = {
                Id: newValue.Id,
                Code: newValue.Code,
                Name: newValue.Name
            }
        }
    }

    selectedRoChanged(newValue) {
        this.data.RONo = null;
        if (newValue) {
            this.data.RONo = newValue.RONo;
        }
    }
}