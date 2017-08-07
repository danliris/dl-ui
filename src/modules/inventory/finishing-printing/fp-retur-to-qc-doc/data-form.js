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
    
    itemsInfo = {
        columns: [{ header: "Kode Packing - Nomor Surat Perintah Produksi", value: "productionOrderNo"}],
        onAdd: function () {
            this.context.ItemsCollection.bind();
            this.data.items.push({productionOrderNo: "", code: ""});
        }.bind(this)
    };
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
            this.data.material =this.selectedMaterial;
           // this.selectedMaterial = this.data.material;
        }
        if (this.data.materialConstructionId) {
            this.selectedConstruction = await this.service.getConstructionById(this.data.materialConstructionId, this.materialFields);
            this.data.construction=this.selectedConstruction;
        }
    }

    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }

    filter={};
    
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
        console.log(this.readOnly)
        if(!this.readOnly){
        this.data.items = [];
        console.log(this.error);
        if (this.error) {
            if (this.error.items) {
                this.error.items = [];
            }
        }
        }
        var _selectedMaterial = newValue;
        if (_selectedMaterial && _selectedMaterial._id) {
            this.data.material = _selectedMaterial;
            this.data.materialName=_selectedMaterial.name;
            this.data.materialId = _selectedMaterial._id ? _selectedMaterial._id : "";
        }
        if(!this.readOnly){
            if(this.data.material && this.data.construction){
                this.filter={
                    material:this.data.materialName,
                    materialConstructionFinishName: this.data.materialConstructionName,
                    materialWidthFinish: this.data.materialWidthFinish
                };
            }
        }
    }


    selectedConstructionChanged(newValue) {
        var _selectedConstruction = newValue;
        if (_selectedConstruction._id) {
            this.data.construction = _selectedConstruction;
            this.data.materialConstructionName=_selectedConstruction.name;
            this.data.materialConstructionId = _selectedConstruction._id ? _selectedConstruction._id : "";
        }
        if(!this.readOnly){
            if(this.data.material && this.data.construction ){
                this.filter={
                    material:this.data.materialName,
                    materialConstructionFinishName: this.data.materialConstructionName,
                    materialWidthFinish: this.data.materialWidthFinish
                };
            }
        }
    }

    materialWidthFinishChanged(e){
        this.data.items = [];
        if (this.error) {
            if (this.error.items) {
                this.error.items = [];
            }
        }
        if(!this.readOnly){
            if(this.data.material && this.data.construction){
                this.filter={
                    material:this.data.materialName,
                    materialConstructionFinishName: this.data.materialConstructionName,
                    materialWidthFinish: this.data.materialWidthFinish
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
             this.data.items.push({productionOrderNo: "", code: ""});
        };
    }

    materialView = (product) => {
        return `${product.name}`;
    }

    constructionView = (construction) => {
        return `${construction.name}`;
    }

    

} 