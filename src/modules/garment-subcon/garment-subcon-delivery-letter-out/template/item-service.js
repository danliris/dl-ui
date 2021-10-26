import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service, CoreService } from "../service";

const SubconCuttingLoader = require('../../../../loader/garment-service-subcon-cutting-loader');
const SubconSewingLoader = require('../../../../loader/garment-service-subcon-sewing-loader');

@inject(Service, CoreService)
export class Item {
    @bindable selectedSubconSewing;
    @bindable selectedSubconCutting;

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
        if(this.data){
            if(this.isSubconCutting){
                this.selectedSubconCutting={
                    SubconNo: this.data.SubconNo,
                    Id:this.data.SubconId
                };
                var subcon = await this.service.readServiceSubconCuttingById(this.data.SubconId);
                this.data.date=subcon.SubconDate;
                this.data.unit=subcon.Unit.Code;
                this.data.subconType=subcon.SubconType;
            }
            else{
                this.selectedSubconSewing={
                    ServiceSubconSewingNo: this.data.SubconNo,
                    Id:this.data.SubconId
                };
                var subcon = await this.service.readServiceSubconSewingById(this.data.SubconId);
                this.data.date=subcon.ServiceSubconSewingDate;
            }
            
        }
        
    }
    
    comodityView = (comodity) => {
        return `${comodity.Code} - ${comodity.Name}`
    }

    get filter(){
        var filter={
            IsUsed:false
        };
        return filter;
    }

    get subconCuttingLoader() {
        return SubconCuttingLoader;
    }

    get subconSewingLoader() {
        return SubconSewingLoader;
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

}