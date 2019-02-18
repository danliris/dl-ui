import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
var BuyerLoader = require('../../../loader/garment-buyers-loader');

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable selectedBuyer;
    @bindable selectedSection;

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }
    detailColumns = [{ header: "Komoditi" }, {header: "Jumlah"}, {header: "Tanggal Pengiriman"}, {header: "Tanggal Confirm"}, {header: "Keterangan"}];
    // detailColumnsNew = [{ header: "Komoditi" }, {header: "Jumlah"}, {header: "Keterangan"}];

    buyerFields=["name", "code"];
    sectionFields=["name", "code"];

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        if (this.data.garmentBuyerId) {
            this.selectedBuyer = await this.service.getBuyerById(this.data.garmentBuyerId, this.buyerFields);
            this.data.garmentBuyerId =this.selectedBuyer.Id;
            this.selectedSection = await this.service.getSectionById(this.data.garmentSectionId, this.sectionFields);
            this.data.garmentSectionId =this.selectedSection.Id;
        }

        if(this.data.Id) {
          if (this.data.canceledBookingOrder){
            this.data.beginingOrderQuantity=this.data.orderQuantity+this.data.canceledBookingOrder;
          }
        }

    }

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    selectedBuyerChanged(newValue) {
        var _selectedBuyer = newValue;
        if (_selectedBuyer) {
            this.data.buyer = _selectedBuyer;
            this.data.garmentBuyerId = _selectedBuyer.Id ? _selectedBuyer.Id : "";
            
        }
    }


    get buyerLoader() {
        return BuyerLoader;
    }

    get addItems() {
        return (event) => {
            var newDetail=   {
                code:this.data.code,
                masterPlanComodity: this.data.masterPlanComodity,
                quantity: 0,
                isCanceled: false,
                remark: ''
            };
            this.data.items.push(newDetail);
        };
    }

    buyerView = (buyer) => {
        return `${buyer.code} - ${buyer.name}`
    }

    sectionView = (section) => {
      return `${section.code} - ${section.name}`
  }

} 
