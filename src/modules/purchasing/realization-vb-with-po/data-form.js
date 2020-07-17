import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service, ServicePurchasing } from "./service";

const UnitLoader = require('../../../loader/unit-loader');
const VbLoader = require('../../../loader/vb-with-po-request-loader');

@containerless()
@inject(Service, ServicePurchasing, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable numberVB;

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    constructor(service, servicePurchasing, bindingEngine) {
        this.service = service;
        this.servicePurchasing = servicePurchasing;
        this.bindingEngine = bindingEngine;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        // console.log(this.data.numberVB);
        if (this.data.numberVB && this.data.numberVB.VBNo) {
            this.numberVB = this.data.numberVB;
        }
        // else{
        //     this.numberVB = {};
        // }
    }

    async numberVBChanged(newValue) {
        var temp_detailItem = [];
        this.data.numberVB = newValue;

        if (this.data.numberVB) {
            // console.log(this.data.numberVB);
            this.data.DateEstimate = this.data.numberVB.DateEstimate;
            this.data.CreateByVB = this.data.numberVB.CreateBy;
            this.data.VBNo = this.data.numberVB.VBNo;
            this.data.UnitId = this.data.numberVB.UnitId;
            this.data.UnitCode = this.data.numberVB.UnitCode;
            this.data.UnitName = this.data.numberVB.UnitName;
            this.data.Amount = this.data.numberVB.Amount;

            for (var dataspb of this.data.numberVB.PONo) {
                // var itemData = {
                //     PONO: dataspb.PONo
                // };
                // console.log(dataspb.PONo);
                var getSPB = await this.servicePurchasing.getPONo(dataspb.PONo);
                // console.log(getSPB);

                if (getSPB) {

                    for (var item of getSPB) {
                        var resso = {
                            no: item.no,
                            date: item.date,
                            division: item.division.name,
                            item: item.items,
                            supplier: item.supplier,
                            currency: item.currency
                        }

                        temp_detailItem.push(resso);
                        this.data.Items = temp_detailItem;
                    }
                }
            }

        }
        else {
            this.data.numberVB = {};
            this.data.DateEstimate = {};
            this.data.CreateBy = {};
            this.data.Items = [];
        }

    }

    columns = ["Daftar SPB"];

    get vbLoader() {
        return VbLoader;
    }

}
