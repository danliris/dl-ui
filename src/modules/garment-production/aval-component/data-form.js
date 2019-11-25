import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service, CoreService } from "./service";

const UnitLoader = require('../../../loader/garment-units-loader');
const CuttingInLoader = require('../../../loader/garment-cutting-in-by-ro-loader');
const SewingOutLoader = require('../../../loader/garment-sewing-out-by-ro-loader');

@inject(Service, CoreService)
export class DataForm {
    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable title;
    @bindable data = {};
    @bindable selectedCuttingIn;
    @bindable selectedSewingOut;

    constructor(service, coreService) {
        this.service = service;
        this.coreService = coreService;
    }

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
    };

    controlOptions = {
        label: {
            length: 2
        },
        control: {
            length: 5
        }
    };

    avalComponentTypes = [
        "CUTTING",
        "SEWING"
    ];

    @computedFrom("data.AvalComponentType")
    get itemsColumns() {
        return  [
            "Kode Barang",
            "Keterangan",
            "Jumlah Aval",
            "Satuan",
        ].concat(this.data.AvalComponentType == "SEWING" ? ["Size"] : []);
    }

    @computedFrom("data.Unit")
    get cuttingInFilter() {
        this.selectedCuttingIn = null;

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

    @computedFrom("data.Unit")
    get sewingOutFilter() {
        this.selectedSewingOut = null;

        if (this.data.Unit) {
            return {
                UnitToId: this.data.Unit.Id,
                SewingTo: "CUTTING"
            };
        } else {
            return {
                UnitToId: 0
            };
        }
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }

    get unitLoader() {
        return UnitLoader;
    }

    get cuttingInLoader() {
        return CuttingInLoader;
    }

    get sewingOutLoader() {
        return SewingOutLoader;
    }

    get itemsOptions() {
        return {
            type: this.data.AvalComponentType
        };
    }

    async selectedSewingOutChanged(newValue, oldValue) {
        if (newValue) {
            this.context.error.Items = [];
            this.data.RONo = newValue.RONo;
            this.data.Article = newValue.Article;
            this.data.Comodity = newValue.Comodity;

            Promise.resolve(this.service.getSewingOut({
                filter: JSON.stringify({ RONo: this.data.RONo, UnitToId: this.data.Unit.Id }),
                select: "new (UnitToCode, IsDifferentSize, GarmentSewingOutItem.Select(new (Identity as SewingOutItemId, new (ProductId as Id, ProductCode as Code, ProductName as Name) as Product, DesignColor, RemainingQuantity, new (SizeId as Id, SizeName as Size) as Size, GarmentSewingOutDetail.Select(new (Identity as SewingOutDetailId, Quantity, new (SizeId as Id, SizeName as Size) as Size)) as Details)) as Items)",
            }))
                .then(result => {
                    this.data.Items = [];

                    result.data.forEach(data => {
                        (data.Items || []).forEach(item => {
                            
                            if (data.IsDifferentSize) {
                                (item.Details || []).forEach(detail => {
                                    if (detail.Quantity > 0) {
                                        // this.data.Items.push(Object.assign(item, detail, {
                                        //     SourceQuantity: detail.Quantity
                                        // }));
                                        this.data.Items.push({
                                            IsSave: true,
                                            IsDifferentSize: data.IsDifferentSize,
                                            SewingOutItemId: item.SewingOutItemId,
                                            Product: item.Product,
                                            DesignColor: item.DesignColor,
                                            RemainingQuantity : item.RemainingQuantity,
                                            SewingOutDetailId: detail.SewingOutDetailId,
                                            Quantity: detail.Quantity,
                                            SourceQuantity: detail.Quantity,
                                            Size: detail.Size
                                        });
                                    }
                                });
                            } else {
                                if (item.RemainingQuantity > 0) {
                                    this.data.Items.push(Object.assign(item, {
                                        IsSave: true,
                                        Quantity: item.RemainingQuantity,
                                        SourceQuantity: item.RemainingQuantity
                                    }));
                                }
                            }
                        });
                    });
                    this.context.checkedAll = true;
                });
        }
        else {
            (this.context.selectedSewingOutViewModel || {}).editorValue = "";
            this.data.RONo = null;
            this.data.Article = null;
            this.data.Comodity = null;
            this.data.Items = [];
        }
    }

    async selectedCuttingInChanged(newValue, oldValue) {
        if (newValue) {
            this.context.error.Items = [];
            this.data.RONo = newValue.RONo;
            this.data.Article = newValue.Article;

            Promise.resolve(this.service.getCuttingIn({ filter: JSON.stringify({ RONo: this.data.RONo, UnitId: this.data.Unit.Id }) }))
                .then(result => {
                    // (this.data.Items || []).splice(0);
                    this.data.Items = [];
                    result.data.forEach(data => {
                        (data.Items || []).forEach(item => {
                            (item.Details || []).forEach(detail => {
                                if (detail.RemainingQuantity > 0) {
                                    this.data.Items.push(Object.assign(detail, {
                                        IsSave: true,
                                        Quantity: detail.RemainingQuantity,
                                        CuttingInDetailId: detail.Id,
                                        SourceQuantity: detail.RemainingQuantity
                                    }));
                                }
                            });
                        });
                    });
                    // this.data.Items = result.data
                    //     .reduce((items, data) => items.concat(data.Items.map(item => {
                    //         return Object.assign(item, {

                    //         })
                    //     })), []);
                    this.context.checkedAll = true;
                });
            return;
        }
        else {
            (this.context.selectedCuttingInViewModel || {}).editorValue = "";
            this.data.RONo = null;
            this.data.Article = null;
            this.data.Items = [];
        }
    }

    changeCheckedAll() {
        (this.data.Items || []).forEach(i => i.IsSave = this.context.checkedAll);
    }
}