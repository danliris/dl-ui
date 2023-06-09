import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service, CoreService } from "../service";

const SubconCuttingLoader = require('../../../../loader/garment-service-subcon-cutting-loader');
const SubconSewingLoader = require('../../../../loader/garment-service-subcon-sewing-loader');
const SubconFabricLoader = require('../../../../loader/garment-service-subcon-fabric-loader');
const SubconShrinkageLoader = require('../../../../loader/garment-service-subcon-shrinkage-loader');
const SubconExpenditureGoodLoader = require('../../../../loader/garment-service-subcon-expenditure-good-loader');

@inject(Service, CoreService)
export class Item {
    @bindable selectedSubconSewing;
    @bindable selectedSubconCutting;
    @bindable selectedSubconShrinkage;
    @bindable selectedSubconFabric;
    @bindable selectedSubconExpenditure;
    @bindable selectedRO;

    constructor(service, coreService) {
        this.service = service;
        this.coreService = coreService;
    }

    detailColumns = [
        "Warna",
        "Design Warna",
        "Unit",
        "Jumlah",
        "Satuan",
        "Keterangan",
    ];

    async activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;

        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        this.itemOptions = context.context.options;
        this.isSubconCutting = this.itemOptions.isSubconCutting;
        this.isSubconSewing = this.itemOptions.isSubconSewing;
        this.isSubconExpenditure = this.itemOptions.isSubconExpenditure;
        this.subconCategory = this.itemOptions.subconCategory;
        if (this.data.Details) {
            if (this.data.Details.length > 0) {
                this.isShowing = true;
            }
        }
        if (this.data) {
            if (this.isSubconCutting) {
                this.selectedSubconCutting = {
                    SubconNo: this.data.SubconNo,
                    Id: this.data.SubconId
                };
                if (this.data.Id) {
                    var subcon = await this.service.readServiceSubconCuttingById(this.data.SubconId);
                    this.data.date = subcon.SubconDate;
                    this.data.unit = subcon.Unit.Code;
                    this.data.subconType = subcon.SubconType;
                }
            }
            // else if(this.subconCategory=="SUBCON JASA GARMENT WASH"){
            //     this.selectedSubconSewing={
            //         ServiceSubconSewingNo: this.data.SubconNo,
            //         Id:this.data.SubconId
            //     };
            //     if(this.data.Id){
            //         var subcon = await this.service.readServiceSubconSewingById(this.data.SubconId);
            //         this.data.date=subcon.ServiceSubconSewingDate;
            //     }
            // }
            else if (this.isSubconSewing) {
                this.selectedSubconSewing = {
                    ServiceSubconSewingNo: this.data.SubconNo,
                    Id: this.data.SubconId
                };
                if (this.data.Id) {
                    var subcon = await this.service.readServiceSubconSewingById(this.data.SubconId);
                    this.data.date = subcon.ServiceSubconSewingDate;
                    this.data.Details = subcon.Items;
                    for (var item of subcon.Items) {
                        this.data.RONo = item.RONo;
                        this.data.Article = item.Article;
                        this.data.Comodity = item.Comodity.Code + " - " + item.Comodity.Name;
                        this.data.Buyer = item.Buyer.Code + " - " + item.Buyer.Name;
                        this.data.Details = item.Details;
                    }
                }
            }
            else if (this.subconCategory == "SUBCON BB SHRINKAGE/PANEL") {
                this.selectedSubconShrinkage = {
                    ServiceSubconShrinkagePanelNo: this.data.SubconNo,
                    Id: this.data.SubconId
                };
                if (this.data.Id) {
                    var subcon = await this.service.readServiceSubconShrinkageById(this.data.SubconId);
                    this.data.date = subcon.ServiceSubconShrinkagePanelDate;
                }
            }
            else if (this.subconCategory == "SUBCON BB FABRIC WASH/PRINT") {
                this.selectedSubconFabric = {
                    ServiceSubconFabricWashNo: this.data.SubconNo,
                    Id: this.data.SubconId
                };
                if (this.data.Id) {
                    var subcon = await this.service.readServiceSubconFabricById(this.data.SubconId);
                    this.data.date = subcon.ServiceSubconFabricWashDate;
                }
            } else if (this.isSubconExpenditure) {
                this.selectedSubconExpenditure = {
                    ServiceSubconExpenditureGoodNo: this.data.SubconNo,
                    Id: this.data.SubconId
                };
                if (this.data.Id) {
                    var subcon = await this.service.readServiceSubconExpenditureGoodById(this.data.SubconId);
                    this.data.date = subcon.ServiceSubconExpenditureGoodDate;

                }
            }


        }
        this.isShowing = false;
        console.log(context);
    }

    comodityView = (comodity) => {
        return `${comodity.Code} - ${comodity.Name}`
    }

    get filter() {
        var filter = {
            IsUsed: false
        };
        for (var item of this.context.context.items) {
            if (this.isSubconCutting) {
                filter[`SubconNo == "${item.data.SubconNo}"`] = false;
            }
            else if (this.isSubconSewing) {
                filter[`ServiceSubconSewingNo == "${item.data.SubconNo}"`] = false;
                // filter[`ServiceSubconSewingNo == "${item.data.SubconNo}"`]=false;
            }
            else if (this.subconCategory == "SUBCON BB SHRINKAGE/PANEL") {
                filter[`ServiceSubconShrinkagePanelNo == "${item.data.SubconNo}"`] = false;
            }
            else if (this.subconCategory == "SUBCON BB FABRIC WASH/PRINT") {
                filter[`ServiceSubconFabricWashNo == "${item.data.SubconNo}"`] = false;
            } else if (this.isSubconExpenditure) {
                filter[`ServiceSubconExpenditureGoodNo == "${item.data.SubconNo}"`] = false;
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

    get subconExpenditureGoodLoader() {
        return SubconExpenditureGoodLoader;
    }

    get subconFabricLoader() {
        return SubconFabricLoader;
    }

    get subconShrinkageLoader() {
        return SubconShrinkageLoader;
    }

    toggle() {
        if (!this.isShowing)
            this.isShowing = true;
        else
            this.isShowing = !this.isShowing;
    }

    selectedROChanged(newValue) {
        if (newValue) {
            this.data.RONo = newValue.RONo;
        }
        else {
            this.data.RONo = "";
            this.data.SubconId = null;
            this.data.SubconNo = "";
            this.selectedSubconSewing = null;
            this.data.Details.splice(0);
        }
    }

    async selectedSubconExpenditureChanged(newValue) {
        this.data.date = null;
        this.data.SubconId = null;
        this.data.SubconNo = "";
        this.data.QtyPacking = 0;
        this.data.UomSatuanUnit = "";
        this.data.NettWeight = 0;
        this.data.GrossWeight = 0;
        this.data.Quantity = 0;
        if (newValue) {
            this.data.SubconId = newValue.Id;
            this.data.SubconNo = newValue.ServiceSubconExpenditureGoodNo;
            this.data.date = newValue.ServiceSubconExpenditureGoodDate;
            this.data.NettWeight = newValue.NettWeight;
            this.data.GrossWeight = newValue.GrossWeight;
            this.data.QtyPacking = newValue.QtyPacking;
            this.data.Quantity = newValue.TotalQuantity;
            this.data.UomSatuanUnit = newValue.UomUnit;
        }
    }

    async selectedSubconSewingChanged(newValue) {
        this.data.date = null;
        this.data.unit = "";
        this.data.SubconId = null;
        this.data.SubconNo = "";
        this.data.Quantity = 0;
        this.data.Article = "";
        this.data.RONo = "";
        this.data.Buyer = "";
        this.data.Comodity = "";
        this.data.QtyPacking = 0;
        this.data.UomSatuanUnit = "";

        if (this.data.Details.length > 0) {
            this.data.Details.splice(0);
        }
        if (newValue) {
            this.data.SubconId = newValue.Id;
            this.data.SubconNo = newValue.ServiceSubconSewingNo;
            var subcon = await this.service.readServiceSubconSewingById(this.data.SubconId);
            this.data.date = subcon.ServiceSubconSewingDate;
            //this.data.unit=subcon.Unit.Code;
            this.data.Details = subcon.Items;
            for (var item of subcon.Items) {
                this.data.Article = item.Article;
                this.data.RONo = item.RONo;
                this.data.Buyer = item.Buyer.Name;
                this.data.Comodity = item.Comodity.Code + " - " + item.Comodity.Name;
                this.data.Details = item.Details;
                for (var detail of item.Details) {
                    this.data.Quantity += detail.Quantity;
                }
            }
            this.data.QtyPacking = subcon.QtyPacking;
            this.data.UomSatuanUnit = subcon.UomUnit;
        }
    }
    async selectedSubconCuttingChanged(newValue) {
        this.data.date = null;
        this.data.unit = "";
        this.data.SubconId = null;
        this.data.SubconNo = "";
        this.data.Quantity = 0;
        this.data.QtyPacking = 0;
        this.data.UomSatuanUnit = "";
        if (newValue) {
            this.data.SubconId = newValue.Id;
            this.data.SubconNo = newValue.SubconNo;

            var subcon = await this.service.readServiceSubconCuttingById(this.data.SubconId);
            this.data.date = subcon.SubconDate;
            this.data.unit = subcon.Unit.Code;
            this.data.subconType = subcon.SubconType;
            this.data.QtyPacking = subcon.QtyPacking;
            this.data.UomSatuanUnit = subcon.Uom.Unit;
            for (var item of subcon.Items) {
                for (var detail of item.Details) {
                    this.data.Quantity += detail.Quantity;

                }
            }
        }
    }

    async selectedSubconShrinkageChanged(newValue) {
        this.data.date = null;
        this.data.unit = "";
        this.data.SubconId = null;
        this.data.SubconNo = "";
        this.data.Quantity = 0;
        this.data.QtyPacking = 0;
        this.data.UomSatuanUnit = "";
        if (newValue) {
            this.data.SubconId = newValue.Id;
            this.data.SubconNo = newValue.ServiceSubconShrinkagePanelNo;
            var subcon = await this.service.readServiceSubconShrinkageById(this.data.SubconId);
            this.data.date = subcon.ServiceSubconShrinkagePanelDate;
            this.data.QtyPacking = subcon.QtyPacking;
            this.data.UomSatuanUnit = subcon.UomUnit;
            //this.data.unit=subcon.Unit.Code;
            for (var item of subcon.Items) {
                for (var detail of item.Details) {
                    this.data.Quantity += detail.Quantity;
                }
            }
        }
    }
    async selectedSubconFabricChanged(newValue) {
        this.data.date = null;
        this.data.unit = "";
        this.data.SubconId = null;
        this.data.SubconNo = "";
        this.data.Quantity = 0;
        this.data.QtyPacking = 0;
        this.data.UomSatuanUnit = "";
        if (newValue) {
            this.data.SubconId = newValue.Id;
            this.data.SubconNo = newValue.ServiceSubconFabricWashNo;
            var subcon = await this.service.readServiceSubconFabricById(this.data.SubconId);
            this.data.date = subcon.ServiceSubconFabricWashDate;
            this.data.QtyPacking = subcon.QtyPacking;
            this.data.UomSatuanUnit = subcon.UomUnit;
            //this.data.unit=subcon.Unit.Code;
            for (var item of subcon.Items) {
                for (var detail of item.Details) {
                    this.data.Quantity += detail.Quantity;
                }
            }
        }
    }

}
