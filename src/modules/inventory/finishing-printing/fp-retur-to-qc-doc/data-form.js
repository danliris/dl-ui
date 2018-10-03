import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
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

    itemsInfo = {
        columns: [{ header: "Nomor Surat Perintah Produksi", value: "productionOrderNo" }],
        onAdd: function () {
            this.context.ItemsCollection.bind();
            this.data.Items.push({ productionOrderNo: "", code: "" });
        }.bind(this)
    };
    itemsColumns = [{ header: "Nomor Surat Perintah Produksi", value: "productionOrderNo" }];
    materialFields = ["name", "code"];
    packingFields = ["code", "motif", "materialWidthFinish"];


    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
    }

    async bind(context) {
        
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        if (this.data.Material) {
            this.selectedMaterial = this.data.Material;
            // this.data.material = this.selectedMaterial;
            // this.selectedMaterial = this.data.material;
        }
        if (this.data.MaterialConstruction) {
            this.selectedConstruction = this.data.MaterialConstruction;
            // this.data.materialConstruction = this.selectedConstruction;
        }
    }

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    filter = {};

    // @computedFrom("data.material" && "data.construction" && "data.materialWidthFinish")
    // get getFilter(){
    //     filter={
    //             material:this.data.materialName,
    //             materialConstructionFinishName: this.data.materialConstructionName,
    //             materialWidthFinish: this.data.materialWidthFinish
    //         };
    //     //console.log(filter);
    //     return filter;
    // }

    tagsFilter = { tags: { "$regex": "material", "$options": "i" } };

    selectedMaterialChanged(newValue) {
        
        if (!this.readOnly) {
            this.data.Items = [];
            if (this.error) {
                if (this.error.items) {
                    this.error.items = [];
                }
            }
        }
        var _selectedMaterial = newValue;
        if (_selectedMaterial && _selectedMaterial.Id) {
            this.data.material = _selectedMaterial;
            this.data.materialName = _selectedMaterial.Name;
            this.data.materialId = _selectedMaterial.Id ? _selectedMaterial.Id : "";
        }
        if (!this.readOnly) {
            if (this.data.material && this.data.materialConstruction) {
                this.filter = {
                    materialName: this.data.materialName,
                    materialConstructionName: this.data.materialConstructionName,
                    finishWidth: this.data.MaterialWidthFinish
                };
            }
        }
    }


    selectedConstructionChanged(newValue) {
        
        var _selectedConstruction = newValue;
        if (_selectedConstruction.Id) {
            this.data.materialConstruction = _selectedConstruction;
            this.data.materialConstructionName = _selectedConstruction.Name;
            this.data.materialConstructionId = _selectedConstruction.Id ? _selectedConstruction.Id : "";
        }
        if (!this.readOnly) {
            if (this.data.material && this.data.materialConstruction) {
                this.filter = {
                    materialName: this.data.materialName,
                    materialConstructionName: this.data.materialConstructionName,
                    finishWidth: this.data.MaterialWidthFinish
                };
            }
        }
    }

    materialWidthFinishChanged(e) {
        this.data.Items = [];
        
        if (this.error) {
            if (this.error.items) {
                this.error.items = [];
            }
        }
        if (!this.readOnly) {
            if (this.data.material && this.data.materialConstruction) {
                this.filter = {
                    materialName: this.data.materialName,
                    materialConstructionName: this.data.materialConstructionName,
                    finishWidth: this.data.MaterialWidthFinish
                };
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
            this.data.Items.push({ productionOrderNo: "", code: "" });
        };
    }

    materialView = (product) => {
      
        return `${product.Name}`;
    }

    constructionView = (construction) => {
    
        return `${construction.Name}`;
    }



} 