import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service, SalesService, CoreService } from "../service";

const CuttingInLoader = require('../../../../loader/garment-cutting-in-by-ro-loader');

@inject(Service, SalesService, CoreService)
export class Item {
    @bindable selectedCuttingIn;

    constructor(service, salesService, coreService) {
        this.service = service;
        this.salesService = salesService;
        this.coreService = coreService;
    }

    get cuttingInFilter() {
        //this.selectedCuttingIn = null;
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

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
console.log(this.context)
        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        
console.log(this.isCreate)
        if(this.data){
            this.selectedCuttingIn={
                RONo:this.data.RONo,
                Article: this.data.Article
            }
        }
        this.isShowing = false;
        if (this.data.details) {
            if (this.data.details.length > 0) {
                this.isShowing = true;
            }
        }
    }
    itemsColumns= [
            "Kode Barang",
            "Keterangan",
            "Jumlah",
        ];
    

    comodityView = (comodity) => {
        return `${comodity.Code} - ${comodity.Name}`
    }

    get cuttingInLoader() {
        return CuttingInLoader;
    }

    async selectedCuttingInChanged(newValue, oldValue){
        if(this.isCreate){
            if(newValue) {
                console.log(newValue)
                if(this.data.Details.length>0){
                    this.data.Details.splice(0);
                }
                //this.context.error.Items = [];
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
                // let ssCuttingItems=[];
                // let ssCutting = await this.service.searchComplete({ size: 100, filter: JSON.stringify({ RONo: this.data.RONo }) });
                
                // if(ssCutting.data.length>0){
                //     for(var ssC of ssCutting.data){
                //         for(var ssCItem of ssC.Items){
                //             var item={};
                //             item.cuttingInDetailId=ssCItem.CuttingInDetailId;
                //             item.qty=ssCItem.Quantity;
                //             if(ssCuttingItems[ssCItem.CuttingInDetailId]){
                //                 ssCuttingItems[ssCItem.CuttingInDetailId].qty+=ssCItem.Quantity;
                //             }
                //             else{
                //                 ssCuttingItems[ssCItem.CuttingInDetailId]=item;
                //             }
                //         }
                //     }
                // }
                
                Promise.resolve(this.service.getCuttingIn({ filter: JSON.stringify({ RONo: this.data.RONo, UnitId: this.data.Unit.Id, CuttingType:"MAIN FABRIC" }) }))
                    .then(result => {
                        for(var cuttingInHeader of result.data){
                            for(var cuttingInItem of cuttingInHeader.Items){
                                for(var cuttingInDetail of cuttingInItem.Details){
                                    var qtyOut=0;
                                    // if(ssCuttingItems[cuttingInDetail.Id]){
                                    //     qtyOut+=ssCuttingItems[cuttingInDetail.Id].qty;
                                    // }
                                   // if(cuttingInDetail.CuttingInQuantity-qtyOut>0){
                                        cuttingInDetail.CuttingInId = cuttingInHeader.Id;
                                        cuttingInDetail.CuttingInDetailId = cuttingInDetail.Id;
                                        cuttingInDetail.Product=cuttingInDetail.Product;
                                        cuttingInDetail.CuttingInDate=cuttingInHeader.CuttingInDate;
                                        cuttingInDetail.Quantity=cuttingInDetail.CuttingInQuantity-qtyOut;
                                        cuttingInDetail.CuttingInQuantity=cuttingInDetail.CuttingInQuantity-qtyOut;
                                        this.data.Details.push(cuttingInDetail);
                                   // }
                                    
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

}