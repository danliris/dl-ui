import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service, SalesService, CoreService } from "./service";

const UnitLoader = require('../../../loader/garment-units-loader');
const CuttingInLoader = require('../../../loader/garment-cutting-in-by-ro-loader');

@inject(Service, SalesService, CoreService)
export class DataForm {
    @bindable readOnly = false;
    @bindable isCreate = false;
    @bindable isView = false;
    @bindable isEdit = false;
    @bindable title;
    @bindable data = {};
    // @bindable error = {};
    @bindable selectedCuttingIn;
    @bindable itemOptions = {};
    @bindable selectedCuttingIn;
    @bindable selectedUnit;

    constructor(service, salesService, coreService) {
        this.service = service;
        this.salesService = salesService;
        this.coreService = coreService;
    }

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah"
    };
    subconTypes=["BORDIR","PRINT","PLISKET"];
    controlOptions = {
        label: {
            length: 2
        },
        control: {
            length: 5
        }
    };

    itemsInfo = {
        columns: [
            "Kode Barang",
            "Keterangan",
            "Jumlah",
        ]
    }

    @computedFrom("data.Unit")
    get cuttingInFilter() {
        this.selectedCuttingIn = null;
        if (this.data.Unit) {
            return {
                UnitId: this.data.Unit.Id,
                CuttingFrom:"PREPARING",
                CuttingType:"MAIN FABRIC"
            };
        } else {
            return {
                UnitId: 0,
                CuttingFrom:"PREPARING",
                CuttingType:"MAIN FABRIC"
            };
        }
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.itemOptions = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            checkedAll: this.context.isCreate == true ? false : true 
        }

        if (this.data && this.data.Items) {
            this.data.Items.forEach(
                item => {
                    item.IsSave = true;
                }
            );
        }
    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }

    comodityView = (comodity) => {
        return `${comodity.Code} - ${comodity.Name}`
    }

    get unitLoader() {
        return UnitLoader;
    }

    get cuttingInLoader() {
        return CuttingInLoader;
    }

    async selectedCuttingInChanged(newValue, oldValue){
        if(this.context.isCreate){
            if(newValue) {
                if(this.data.Items.length>0){
                    this.data.Items.splice(0);
                }
                this.context.error.Items = [];
                this.data.RONo = newValue.RONo;
                this.data.Article = newValue.Article;
                let noResult = await this.salesService.getCostCalculationByRONo({ size: 1, filter: JSON.stringify({ RO_Number: this.data.RONo }) });
                if(noResult.data.length>0){
                    this.data.Comodity = noResult.data[0].Comodity;
                } else {
                    const comodityCodeResult = await this.salesService.getHOrderKodeByNo({ no: this.data.RONo });
                    const comodityCode = comodityCodeResult.data[0];
                    if (comodityCode) {
                        const comodityResult = await this.coreService.getGComodity({ size: 1, filter: JSON.stringify({ Code: comodityCode }) });
                        this.data.Comodity = comodityResult.data[0];
                    }
                }
                let ssCuttingItems=[];
                let ssCutting = await this.service.searchComplete({ size: 100, filter: JSON.stringify({ RONo: this.data.RONo }) });
                
                if(ssCutting.data.length>0){
                    for(var ssC of ssCutting.data){
                        for(var ssCItem of ssC.Items){
                            var item={};
                            item.cuttingInDetailId=ssCItem.CuttingInDetailId;
                            item.qty=ssCItem.Quantity;
                            if(ssCuttingItems[ssCItem.CuttingInDetailId]){
                                ssCuttingItems[ssCItem.CuttingInDetailId].qty+=ssCItem.Quantity;
                            }
                            else{
                                ssCuttingItems[ssCItem.CuttingInDetailId]=item;
                            }
                        }
                    }
                }
                
                Promise.resolve(this.service.getCuttingIn({ filter: JSON.stringify({ RONo: this.data.RONo, UnitId: this.data.Unit.Id, CuttingType:"MAIN FABRIC" }) }))
                    .then(result => {
                        for(var cuttingInHeader of result.data){
                            for(var cuttingInItem of cuttingInHeader.Items){
                                for(var cuttingInDetail of cuttingInItem.Details){
                                    var qtyOut=0;
                                    if(ssCuttingItems[cuttingInDetail.Id]){
                                        qtyOut+=ssCuttingItems[cuttingInDetail.Id].qty;
                                    }
                                    cuttingInDetail.CuttingInId = cuttingInHeader.Id;
                                    cuttingInDetail.CuttingInDetailId = cuttingInDetail.Id;
                                    cuttingInDetail.Product=cuttingInDetail.Product;
                                    cuttingInDetail.CuttingInDate=cuttingInHeader.CuttingInDate;
                                    cuttingInDetail.Quantity=cuttingInDetail.CuttingInQuantity-qtyOut;
                                    cuttingInDetail.CuttingInQuantity=cuttingInDetail.CuttingInQuantity-qtyOut;
                                    this.data.Items.push(cuttingInDetail);
                                    
                                }
                            }
                        }
                    });
            }
            else {
                this.context.selectedCuttingInViewModel.editorValue = "";
                this.data.RONo = null;
                this.data.Article = null;
                this.data.Comodity = null;
                this.data.Items.splice(0);
            }
        }
    }

    selectedUnitChanged(newValue){
        if(newValue){
            this.data.Unit=newValue;
        }
        else{
            this.data.Unit=null;
            this.data.RONo = null;
            this.data.Article = null;
            this.data.Comodity = null;
            this.data.Items.splice(0);
        }
        this.data.RONo = null;
        this.data.Article = null;
        this.data.Comodity = null;
        this.data.Items.splice(0);
    }

    get totalQuantity(){
        var qty=0;
        if(this.data.Items){
            for(var item of this.data.Items){
                if(item.IsSave){
                    qty += item.Quantity;
                }
            }
        }
        return qty;
    }
}