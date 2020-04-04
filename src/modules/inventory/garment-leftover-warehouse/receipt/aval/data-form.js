import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";

const UnitLoader = require('../../../../../loader/garment-units-loader');
const UnitExpenditureNoteLoader = require('../../../../../loader/garment-unit-expenditure-note-loader');

@inject(Service)
export class DataForm {

    constructor(service) {
        this.service = service;
    }

    @bindable readOnly = false;
    @bindable title;
    @bindable selectedUnitExpenditureNote;

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };

    itemsColumns = [
        { header: "Kode Barang", value: "ProductCode" },
        { header: "Nama Barang", value: "ProductName" },
        { header: "Keterangan Barang", value: "ProductRemark" },
        { header: "Jumlah", value: "Quantity" },
        { header: "Satuan", value: "UomUnit" },
    ]

    get unitLoader() {
        return UnitLoader;
    }

    get unitExpenditureNoteLoader() {
        return UnitExpenditureNoteLoader;
    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }

    unitExpenditureNoteFilter = {
        ExpenditureType: "SISA"
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;

        if (this.data && this.data.Id) {
            this.selectedUnitExpenditureNote = {
                UENNo: this.data.UENNo
            };
            this.data.StorageFromName = this.data.StorageFrom.name;
            for (const item of this.data.Items) {
                item.ProductCode = item.Product.Code;
                item.ProductName = item.Product.Name;
                item.UomUnit = item.Uom.Unit;
            }
        }
    }

    selectedUnitExpenditureNoteChanged(newValue) {
        if (this.data.Id) return;

        this.data.Items.splice(0);

        if (newValue) {
            this.garmentPurchasingService.getUnitExpenditureNoteById(newValue.Id)
                .then(dataUnitExpenditureNote => {
                    this.data.UENId = dataUnitExpenditureNote.Id;
                    this.data.UENNo = dataUnitExpenditureNote.UENNo;
                    this.data.StorageFrom = dataUnitExpenditureNote.Storage;
                    this.data.StorageFromName = dataUnitExpenditureNote.Storage.name;
                    this.data.ExpenditureDate = dataUnitExpenditureNote.ExpenditureDate;

                    for (const item of dataUnitExpenditureNote.Items) {
                        this.data.Items.push({
                            UENItemId: item.Id,
                            Product: {
                                Id: item.ProductId,
                                Code: item.ProductCode,
                                Name: item.ProductName
                            },
                            ProductCode: item.ProductCode,
                            ProductName: item.ProductName,
                            ProductRemark: item.ProductRemark,
                            Quantity: item.Quantity,
                            Uom: {
                                Id: item.UomId,
                                Unit: item.UomUnit
                            },
                            UomUnit: item.UomUnit
                        });
                    }
                });
        }
    }
}
