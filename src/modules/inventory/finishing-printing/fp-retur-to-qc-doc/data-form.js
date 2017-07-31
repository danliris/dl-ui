import {inject, bindable, containerless, computedFrom, BindingEngine} from 'aurelia-framework'
import { Service } from "./service";
var ProductLoader = require('../../../../loader/product-loader');
var ConstructionLoader = require('../../../../loader/material-loader');
var PackingLoader = require('../../../../loader/packing-loader');

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable selectedMaterial;
    @bindable selectedConstruction;

    destinationOptions = ['Pack I', 'Pack II'];
    
    itemsColumns = [{ header: "Kode Packing - Nomor Surat Perintah Produksi", value: "productionOrderNo"}];
    materialFields=["name","code"];
    packingFields=["code", "motif", "materialWidthFinish"];


    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        if (this.data.materialId) {
            this.selectedMaterial = await this.service.getProductById(this.data.materialId, this.materialFields);
           // this.selectedMaterial = this.data.material;
        }
        if (this.data.materialConstructionId) {
            this.selectedConstruction = await this.service.getConstructionById(this.data.materialConstructionId, this.materialFields);
        }
    }

    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }
    
    @computedFrom("data.material" && "data.construction" && "data.materialWidthFinish")
    get filter(){
        var filter={
            material:this.data.materialName,
            materialConstructionFinishName: this.data.materialConstructionName,
            materialWidthFinish: {$regex: this.data.materialWidthFinish, "$options": "i" }
        };
        return filter;
    }

    tagsFilter = { tags: { "$regex": "material", "$options": "i" } };

    selectedMaterialChanged(newValue) {
        var _selectedMaterial = newValue;
        if(_selectedMaterial){
            if (_selectedMaterial._id) {
                this.data.material = _selectedMaterial;
                this.data.materialName=_selectedMaterial.name;
                this.data.materialId = _selectedMaterial._id ? _selectedMaterial._id : "";
            }
        }
    }


    selectedConstructionChanged(newValue) {
        var _selectedConstruction = newValue;
        if(_selectedConstruction){
            if (_selectedConstruction._id) {
                this.data.construction = _selectedConstruction;
                this.data.materialConstructionName=_selectedConstruction.name;
                this.data.materialConstructionId = _selectedConstruction._id ? _selectedConstruction._id : "";
            }
        }
    }


    get materialLoader() {
        return ProductLoader;
    }

    get constructionLoader() {
        return ConstructionLoader;
    }


    get addItems() {
        return (event) => {
             this.data.items.push({productionOrderNo: "", code: ""})
        };
    }

    materialView = (product) => {
        return `${product.name}`;
    }

    constructionView = (construction) => {
        return `${construction.name}`;
    }

    

} 