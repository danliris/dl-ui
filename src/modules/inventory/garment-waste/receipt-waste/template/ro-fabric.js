import { inject, bindable, computedFrom } from 'aurelia-framework'
import { GarmentProductionService } from '../service';

@inject(GarmentProductionService)
export class ro {
    @bindable selectedRO;

    get roLoader() {
        return (keyword) => {
            var filter = {}
            for (var item of this.context.context.items) {
                filter[`RONo == "${item.data.RONo}"`] = false;
            }
            var info = {
                keyword: keyword,
                filter: JSON.stringify(filter)
            };
            return this.garmentProductionService.getPreparings(info)
                .then((result) => {
                    var roList = [];
                    for (var a of result.data) {
                        if (roList.length == 0) {
                            roList.push(a);
                        }
                        else {
                            var dup = roList.find(d => d.RONo == a.RONo);
                            if (!dup) {
                                roList.push(a);
                            }
                        }
                    }
                    return roList;

                });
        }
    }

    constructor(garmentProductionService) {
        this.garmentProductionService = garmentProductionService;
    }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        if (this.data.RONo) {
            this.selectedRO = {
                RONo: this.data.RONo
            };
        }
        this.readOnly = this.options.readOnly;
        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        this.itemOptions = {
            error: this.error,
            isCreate: this.isCreate,
            readOnly: this.readOnly,
            isEdit: this.isEdit,
        };
    }

    async selectedROChanged(newValue) {
        this.data.FabricItems.splice(0);
        if (newValue) {
            this.data.RONo = newValue.RONo;
            Promise.resolve(this.garmentProductionService.getPreparingWithBC({ ro: newValue.RONo }))
                .then(result => {
                    var data = result.data.getForLoaderAval_BCDtos;

                    for (var items of data) {
                        {
                            if (this.data.FabricItems.length === 0) {
                                var item = {};
                                item.Product = items.Product;
                                item.ProductRemark = items.DesignColor;
                                item.Uom = "KG";
                                item.BCNo = items.bcno;
                                item.BCDate = items.bcdate;
                                item.BCType = items.bctype;
                                this.data.Article = items.article;

                                this.data.FabricItems.push(item);
                            } else {
                                var dup = this.data.FabricItems.find(d => d.BCNo == items.bcno && d.ProductRemark == items.DesignColor && d.Product.Code == items.Product.Code);
                                if (!dup) {
                                    var item = {};
                                    item.Product = items.Product;
                                    item.ProductRemark = items.DesignColor;
                                    item.Uom = "KG";
                                    item.BCNo = items.bcno;
                                    item.BCDate = items.bcdate;
                                    item.BCType = items.bctype;
                                    this.data.Article = items.article;

                                    this.data.FabricItems.push(item);
                                }
                            }
                        }
                    }

                });
        } else {
            this.data.FabricItems.splice(0);
        }
    }

    fabricColumns = [
        "Kode Barang",
        "Nomor BC",
        "Tanggal BC",
        "Tipe BC",
        "Jumlah Aval",
        "Satuan",
    ]
}