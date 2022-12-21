import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from './service';
import { debug } from 'util';

var moment = require('moment');
var ROLoader = require('../../../loader/preparing-distinct-loader');
const UnitLoader = require('../../../loader/garment-units-loader');

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable isCreate = false;
    @bindable isEdit = false;
    @bindable isView = false;
    @bindable readOnly;
    @bindable data = {};
    @bindable options = {};
    @bindable error;
    @bindable title;
    @bindable roNo;
    @bindable selectedUnit;

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        editText: "Ubah",
        deleteText: "Hapus",
    };

    controlOptions = {
        label: {
            length: 2
        },
        control: {
            length: 5
        }
    }

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;

    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }

    get unitLoader() {
        return UnitLoader;
    }

    @computedFrom("data.Unit")
    get filter() {
        var filter = {};
        if (this.data.Unit) {
            filter = {
                UnitId: this.data.Unit.Id,
                "GarmentPreparingItem.Any(RemainingQuantity>0)": true
            }
        }
        return filter;
    }

    bind(context) {
        this.context = context;
        this.dataView = this.context.data;
        this.data = this.context.data;
        this.error = this.context.error;
        this.options.isCreate = this.context.isCreate;
        this.options.isView = this.context.isView;
        if (this.options.isView) {
            this.roNo = this.data.RONo;
        }
    }

    selectedUnitChanged(newValue) {
        this.data.RONo = null;
        this.data.Article = null;
        this.data.Unit = null;
        if (newValue) {
            this.data.Unit = newValue;
        }
        else {
            this.data.RONo = null;
            this.data.Article = null;
            this.data.Unit = null;
        }
    }

    async roNoChanged(newValue) {
        var selectedPreparing = newValue;
        if (selectedPreparing && this.options.isCreate) {
            this.data.Items.splice(0);
            this.data.RONo = selectedPreparing.RONo;
            this.data.Article = selectedPreparing.Article;
            // var filterPreparing = {"RONo": selectedPreparing.RONo, "UnitId": this.data.Unit.Id,"GarmentPreparingItem.Any(RemainingQuantity>0)":true}
            // var info = {filter : JSON.stringify(filterPreparing), size: 2147483647}
            var info = { unit: this.data.Unit.Id, ro: selectedPreparing.RONo }
            // var dataForItem = await this.service.getPreparing(info);
            var dataForItem = await this.service.getPreparingWithBC(info);
            // for (var dataHeader of dataForItem.data) {
            //     for (var item of dataHeader.Items) {
            //         if (item.RemainingQuantity > 0) {
            //             var items = {
            //                 PreparingDate: dataHeader.ProcessDate,
            //                 PreparingId: dataHeader.Id,
            //                 PreparingItemId: item.Id,
            //                 Product: item.Product,
            //                 DesignColor: item.DesignColor,
            //                 Quantity: item.RemainingQuantity,
            //                 Uom: item.Uom,
            //                 IsSave: false,
            //                 BasicPrice: item.BasicPrice,
            //                 PreparingQuantity: item.RemainingQuantity,
            //             };
            //             this.data.Items.push(items);
            //         }
            //     }
            // }

            for (var datas of dataForItem.data.getForLoaderAval_BCDtos) {
                var items = {
                    PreparingDate: datas.ProcessDate,
                    PreparingId: datas.preparingId,
                    PreparingItemId: datas.preparingItemId,
                    Product: datas.Product,
                    DesignColor: datas.DesignColor,
                    Quantity: datas.RemainingQuantity,
                    Uom: datas.Uom,
                    IsSave: false,
                    BasicPrice: datas.BasicPrice,
                    PreparingQuantity: datas.RemainingQuantity,
                    BCNo: datas.bcno,
                    BCDate: datas.bcdate,
                    POSerialNumber: datas.poSerialNumber,
                    BCType: datas.bctype

                };
                this.data.Items.push(items);
            }
        } else if (!selectedPreparing && this.options.isCreate) {
            this.data.RONo = null;
            this.data.Article = null;
            this.data.AvalDate = null;
            this.data.Items.splice(0);
        }
    }

    itemsInfo = {
        columns: [
            "Kode Barang",
            "Keterangan",
            "Nomor PO",
            "Nomor BC",
            "Tanggal BC",
            "Tipe BC",
            "Jumlah",
            "Satuan",
        ]
    }

    roView = (ro) => {
        return `${ro.RONo}`
    }

    get roLoader() {
        return ROLoader;
    }

    get totalQuantity() {
        var qty = 0;
        if (this.data.Items) {
            for (var item of this.data.Items) {
                if (item.IsSave)
                    qty += item.Quantity;
            }
        }
        return qty;
    }
}