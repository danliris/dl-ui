import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service, CoreService } from "../service";

const SubconCuttingLoader = require('../../../../loader/garment-service-subcon-cutting-loader');
const SubconSewingLoader = require('../../../../loader/garment-service-subcon-sewing-loader');
const SubconFabricLoader = require('../../../../loader/garment-service-subcon-fabric-loader');
const SubconShrinkageLoader = require('../../../../loader/garment-service-subcon-shrinkage-loader');

@inject(Service, CoreService)
export class Item {
    @bindable selectedSubconSewing;
    @bindable selectedSubconCutting;
    @bindable selectedSubconShrinkage;
    @bindable selectedSubconFabric;
    constructor(service, coreService) {
        this.service = service;
        this.coreService = coreService;
    }

    async activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        
        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        this.itemOptions=context.context.options;
        this.isSubconCutting=this.itemOptions.isSubconCutting;
        this.subconCategory=this.itemOptions.subconCategory;
        if(this.data){
            if(this.isSubconCutting){
                this.selectedSubconCutting={
                    SubconNo: this.data.SubconNo,
                    Id:this.data.SubconId
                };
                if(this.data.Id){
                    var subcon = await this.service.readServiceSubconCuttingById(this.data.SubconId);
                    this.data.date=subcon.SubconDate;
                    this.data.unit=subcon.Unit.Code;
                    this.data.subconType=subcon.SubconType;
                }
            }
            else if(this.subconCategory=="SUBCON JASA GARMENT WASH"){
                this.selectedSubconSewing={
                    ServiceSubconSewingNo: this.data.SubconNo,
                    Id:this.data.SubconId
                };
                if(this.data.Id){
                    var subcon = await this.service.readServiceSubconSewingById(this.data.SubconId);
                    this.data.date=subcon.ServiceSubconSewingDate;
                }
            }
            else if(this.subconCategory=="SUBCON BB SHRINKAGE/PANEL"){
                this.selectedSubconShrinkage={
                    ServiceSubconShrinkagePanelNo: this.data.SubconNo,
                    Id:this.data.SubconId
                };
                if(this.data.Id){
                    var subcon = await this.service.readServiceSubconShrinkageById(this.data.SubconId);
                    this.data.date=subcon.ServiceSubconShrinkagePanelDate;
                }
            }
            else if(this.subconCategory=="SUBCON BB FABRIC WASH/PRINT"){
                this.selectedSubconFabric={
                    ServiceSubconFabricWashNo: this.data.SubconNo,
                    Id:this.data.SubconId
                };
                if(this.data.Id){
                    var subcon = await this.service.readServiceSubconFabricById(this.data.SubconId);
                    this.data.date=subcon.ServiceSubconFabricWashDate;
                }
            }
            
        }
        console.log(context);
    }
    
    comodityView = (comodity) => {
        return `${comodity.Code} - ${comodity.Name}`
    }

    get filter(){
        var filter={
            IsUsed:false
        };
        for(var item of this.context.context.items){
            if(this.isSubconCutting){
                filter[`SubconNo == "${item.data.SubconNo}"`]=false;
            }
            else if(this.subconCategory=="SUBCON JASA GARMENT WASH"){
                filter[`ServiceSubconSewingNo == "${item.data.SubconNo}"`]=false;
            }
            else if(this.subconCategory=="SUBCON BB SHRINKAGE/PANEL"){
                filter[`ServiceSubconShrinkagePanelNo == "${item.data.SubconNo}"`]=false;
            }
            else if(this.subconCategory=="SUBCON BB FABRIC WASH/PRINT"){
                filter[`ServiceSubconFabricWashNo == "${item.data.SubconNo}"`]=false;
            }
            
        }
        return filter;
    }

    get subconCuttingLoader() {
        return SubconCuttingLoader;
    }

    get subconSewingLoader() {
        return SubconSewingLoader;
    }

    get subconFabricLoader() {
        return SubconFabricLoader;
    }
    
    get subconShrinkageLoader() {
        return SubconShrinkageLoader;
    }

    async selectedSubconSewingChanged(newValue){
        this.data.date=null;
        this.data.unit="";
        this.data.SubconId=null;
        this.data.SubconNo="";
        this.data.Quantity=0;
        if(newValue){
            this.data.SubconId=newValue.Id;
            this.data.SubconNo=newValue.ServiceSubconSewingNo;
            var subcon = await this.service.readServiceSubconSewingById(this.data.SubconId);
            this.data.date=subcon.ServiceSubconSewingDate;
            //this.data.unit=subcon.Unit.Code;
            for(var item of subcon.Items){
                for(var detail of item.Details){
                    this.data.Quantity+=detail.Quantity;

                }
            }
        }
    }
    async selectedSubconCuttingChanged(newValue){
        this.data.date=null;
        this.data.unit="";
        this.data.SubconId=null;
        this.data.SubconNo="";
        this.data.Quantity=0;
        if(newValue){
            this.data.SubconId=newValue.Id;
            this.data.SubconNo=newValue.SubconNo;

            var subcon = await this.service.readServiceSubconCuttingById(this.data.SubconId);
            this.data.date=subcon.SubconDate;
            this.data.unit=subcon.Unit.Code;
            this.data.subconType=subcon.SubconType;
            for(var item of subcon.Items){
                for(var detail of item.Details){
                    this.data.Quantity+=detail.Quantity;

                }
            }
        }
    }

    async selectedSubconShrinkageChanged(newValue){
        this.data.date=null;
        this.data.unit="";
        this.data.SubconId=null;
        this.data.SubconNo="";
        this.data.Quantity=0;
        if(newValue){
            this.data.SubconId=newValue.Id;
            this.data.SubconNo=newValue.ServiceSubconShrinkagePanelNo;
            var subcon = await this.service.readServiceSubconShrinkageById(this.data.SubconId);
            this.data.date=subcon.ServiceSubconShrinkagePanelDate;
            //this.data.unit=subcon.Unit.Code;
            for(var item of subcon.Items){
                for(var detail of item.Details){
                    this.data.Quantity+=detail.Quantity;

                }
            }
        }
    }
    async selectedSubconFabricChanged(newValue){
        this.data.date=null;
        this.data.unit="";
        this.data.SubconId=null;
        this.data.SubconNo="";
        this.data.Quantity=0;
        if(newValue){
            this.data.SubconId=newValue.Id;
            this.data.SubconNo=newValue.ServiceSubconFabricWashNo;
            var subcon = await this.service.readServiceSubconFabricById(this.data.SubconId);
            this.data.date=subcon.ServiceSubconFabricWashDate;
            //this.data.unit=subcon.Unit.Code;
            for(var item of subcon.Items){
                for(var detail of item.Details){
                    this.data.Quantity+=detail.Quantity;

                }
            }
        }
    }

}
