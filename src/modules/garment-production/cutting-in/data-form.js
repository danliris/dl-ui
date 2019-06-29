import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service, CoreService } from "./service";

const UnitLoader = require('../../../loader/garment-units-loader');
const PreparingLoader = require('../../../loader/garment-preparing-ro-loader');

@inject(Service, CoreService)
export class DataForm {
    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable title;
    @bindable data = {};
    // @bindable error = {};
    @bindable selectedPreparing;
    @bindable itemOptions = {};

    constructor(service, coreService) {
        this.service = service;
        this.coreService = coreService;
    }

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah"
    };

    controlOptions = {
        label: {
            length: 2
        },
        control: {
            length: 5
        }
    };

    cuttingTypes = [
        "Main Fabric",
        "Non Main Fabric"
    ];

    itemsColumns = [""];

    @computedFrom("data.Unit")
    get preparingFilter() {
        if (this.data.Unit) {
            return {
                UnitId: this.data.Unit.Id
            };
        } else {
            this.selectedPreparing = null;
            return {
                UnitId: 0
            };
        }
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.itemOptions = {
            FC: this.data.FC || 0,
            isEdit: this.isEdit,
            checkedAll: true
        }

        if (this.data && this.data.Items) {
            this.data.Items.forEach(
                item => item.Details.forEach(
                    detail => {
                        detail.IsSave = true;
                    }
                )
            );
        }
    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }

    get unitLoader() {
        return UnitLoader;
    }

    get preparingLoader() {
        return PreparingLoader;
    }

    async selectedPreparingChanged(newValue, oldValue){
        if(newValue) {
            this.data.RONo = newValue.RONo;
            this.data.Article = newValue.Article;

            let uomResult = await this.coreService.getUom({ size: 1, filter: JSON.stringify({ Unit: "PCS" }) });
            let uom = uomResult.data[0];
            
            Promise.resolve(this.service.getPreparing({ filter: JSON.stringify({ RONo: this.data.RONo }) }))
                .then(result => {
                    this.data.Items = result.data
                        .filter(data => data.Items
                            .filter(item => {
                                if (this.data.CuttingType.toUpperCase() == "MAIN FABRIC") {
                                    return (item.FabricType.toUpperCase() == "MAIN FABRIC");
                                } else {
                                    return (item.FabricType.toUpperCase() != "MAIN FABRIC");
                                }
                            }).length > 0)
                        .map(data => {
                            data.PreparingId = data.Id;
                            data.Details = data.Items.map(item => {
                                item.PreparingItemId = item.Id;
                                item.IsSave = true;
                                item.PreparingUom = item.Uom;
                                item.CuttingInUom = uom;
                                item.PreparingRemainingQuantity = item.RemainingQuantity;
                                item.BasicPrice = item.BasicPrice * this.data.FC;
                                return item;
                            });
                        return data;
                    });
                });
        }
        else {
            this.context.selectedPreparingViewModel.editorValue = "";
            this.data.RONo = null;
            this.data.Article = null;
            this.data.Items = [];
        }
    }

    changeFC(e) {
        this.itemOptions.FC = e.target.value;
    }
}