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
    @bindable dataFC;

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
        this.selectedPreparing = null;
        if (this.data.Unit) {
            return {
                UnitId: this.data.Unit.Id
            };
        } else {
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
            this.context.error.Items = [];
            this.data.RONo = newValue.RONo;
            this.data.Article = newValue.Article;

            let uomResult = await this.coreService.getUom({ size: 1, filter: JSON.stringify({ Unit: "PCS" }) });
            let uom = uomResult.data[0];
            
            Promise.resolve(this.service.getPreparing({ filter: JSON.stringify({ RONo: this.data.RONo, UnitId: this.data.Unit.Id }) }))
                .then(result => {
                    this.data.Items = result.data
                        .map(data => {
                            return Object.assign(data, {
                                PreparingId: data.Id,
                                Details: data.Items
                                    .filter(item => {
                                        if (this.data.CuttingType.toUpperCase() == "MAIN FABRIC") {
                                            return (item.FabricType.toUpperCase() == "MAIN FABRIC");
                                        } else {
                                            return (item.FabricType.toUpperCase() != "MAIN FABRIC");
                                        }
                                    })
                                    .map(item => {
                                        return Object.assign(item, {
                                            PreparingItemId: item.Id,
                                            IsSave: true,
                                            PreparingUom: item.Uom,
                                            CuttingInUom: uom,
                                            PreparingRemainingQuantity: item.RemainingQuantity,
                                            PreparingBasicPrice: item.BasicPrice
                                        });
                                    })
                            });
                        })
                        .filter(data => data.Details.length > 0);
                });
        }
        else {
            this.context.selectedPreparingViewModel.editorValue = "";
            this.data.RONo = null;
            this.data.Article = null;
            this.data.Items = [];
        }
    }

    dataFCChanged(newValue) {
        this.data.FC = newValue;
        this.itemOptions.FC = newValue;
    }
}