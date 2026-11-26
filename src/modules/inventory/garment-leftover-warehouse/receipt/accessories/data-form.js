import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { GarmentCoreService, GarmentPurchasingService } from "./service";

const UnitLoader = require('../../../../../loader/garment-unitsAndsample-loader');
const UnitExpenditureNoteLoader = require('../../../../../loader/garment-unit-expenditure-note-loader');
const SubconUnitExpenditureNoteLoader = require('../../../../../loader/garment-subcon-unit-expenditure-note-loader');

@inject(GarmentPurchasingService, GarmentCoreService)
export class DataForm {

    constructor(garmentPurchasingService, garmentCoreService) {
        this.garmentPurchasingService = garmentPurchasingService;
        this.garmentCoreService = garmentCoreService;
    }

    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable title;
    @bindable selectedUnitFrom;
    @bindable selectedUnitExpenditureNote;
    @bindable unitCode;
    @bindable unitFrom;

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

    unitFrom = [
      { Id: 123, Code: "GMT", Name: "GARMENT" },
      { Id: 107, Code: "SMP1", Name: "SAMPLE" },
      { Id: 0, Code: "SBC", Name: "TERIMA SUBCON" }
    ];
    // get unitLoader() {
    //     return UnitLoader;
    // }

      get unitExpenditureNoteLoader() {
          return UnitExpenditureNoteLoader;
      }
    get subconUnitExpenditureNoteLoader(){
          return SubconUnitExpenditureNoteLoader;
        }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }


    @computedFrom("data.RequestUnit")
    get unitExpenditureNoteFilter() {
      const code = this.unitCode;
        if (code === "SBC") {
            return {
                IsReceived: false,
                ExpenditureType: "SISA PRODUKSI",
                StorageName: "GUDANG ACCESSORIES"
            };
        } else if (code) {
            return {
                IsReceived: false,
                ExpenditureType: "SISA",
                 'StorageName == "GUDANG ACCESSORIES" || StorageName == "GUDANG INTERLINING" || StorageName == "GUDANG EMBALASE"':"true",
                //StorageName: "GUDANG ACCESSORIES",
                UnitSenderCode: code
            };
        } else {
            return {}; // fallback jika belum dipilih
        }
    }
    // @computedFrom("data.RequestUnit")
    // get unitExpenditureNoteFilter() {
        // return  [
        //     {
        //         Key: "IsReceived",
        //         Condition: 2,
        //         Value:false

        //     },
        //     {
        //         Key: "ExpenditureType",
        //         Condition: 2,
        //         Value:"SISA"

        //     },
        //     {
        //         Key: "StorageName",
        //         Condition: 3,
        //         Value:"GUDANG BAHAN BAKU"

        //     },
        //     {
        //         Key: "UnitSenderId",
        //         Condition: 2,
        //         Value:(this.data.RequestUnit || {}).Id || 0

        //     },
        // ]
        // };

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;

        if (this.data && this.data.Id) {
            this.selectedUnitFrom = {
                Id : this.data.RequestUnit.Id,
                Code: this.data.RequestUnit.Code,
                Name: this.data.RequestUnit.Name
            };
            this.selectedUnitExpenditureNote = {
                UENNo: this.data.UENNo
            };
            this.data.StorageFromName = this.data.Storage.name;
            for (const item of this.data.Items) {
                item.ProductCode = item.Product.Code;
                item.ProductName = item.Product.Name;
                item.UomUnit = item.Uom.Unit;
            }

            this.garmentPurchasingService.getUnitExpenditureNoteById(this.data.UENid)
                .then(dataUnitExpenditureNote => {
                    this.garmentPurchasingService.getUnitDeliveryOrderById(dataUnitExpenditureNote.UnitDOId)
                        .then(dataUnitDeliveryOrder => {
                            this.data.ROJob = dataUnitDeliveryOrder.RONo;
                        });
                });
        }
    }

    selectedUnitFromChanged(newValue) {
        if (this.data.Id) return;

        if(newValue.Code === "GMT"){
          this.unitCode = "GMT";
        }else if(newValue.Code === "SMP1"){
          this.unitCode = "SMP1";
        }else if(newValue.Code === "SBC"){
          this.unitCode = "SBC";
        }
        this.data.RequestUnit = newValue;
        this.context.UnitExpenditureNoteViewModel.editorValue = "";
        this.selectedUnitExpenditureNote = null;
    }

    selectedUnitExpenditureNoteChanged(newValue) {
        if (this.data.Id) return;

        this.data.Items.splice(0);

        if (newValue) {
          if(this.unitCode !== "SBC"){
            this.garmentPurchasingService.getUnitExpenditureNoteById(newValue.Id)
                .then(dataUnitExpenditureNote => {
                    this.data.IsSubcon = false;
                    this.garmentPurchasingService.getUnitDeliveryOrderById(dataUnitExpenditureNote.UnitDOId)
                        .then(dataUnitDeliveryOrder => {
                            this.data.UENId = dataUnitExpenditureNote.Id;
                            this.data.UENid = dataUnitExpenditureNote.Id;
                            this.data.UENNo = dataUnitExpenditureNote.UENNo;
                            this.data.Storage = dataUnitExpenditureNote.Storage;
                            this.data.StorageFromName = dataUnitExpenditureNote.Storage.name;
                            this.data.ExpenditureDate = dataUnitExpenditureNote.ExpenditureDate;

                            for (const item of dataUnitExpenditureNote.Items) {
                                var fabricRemark;

                                this.garmentCoreService.getProductById(item.ProductId)
                                    .then(product => {
                                        fabricRemark = product.Remark;
                                        this.data.Items.push({
                                            UENItemId: item.Id,
                                            POSerialNumber: item.POSerialNumber,
                                            Product: {
                                                Id: item.ProductId,
                                                Code: item.ProductCode,
                                                Name: item.ProductName
                                            },
                                            ProductCode: item.ProductCode,
                                            ProductName: item.ProductName,
                                            ProductRemark: item.ProductRemark,
                                            FabricRemark: fabricRemark,
                                            Quantity: item.Quantity,
                                            Uom: {
                                                Id: item.UomId,
                                                Unit: item.UomUnit
                                            },
                                            UomUnit: item.UomUnit,
                                            BasicPrice : item.BasicPrice,
                                            URNItemId: item.URNItemId,
                                            NoPackage: item.NoPackage
                                        });

                                    });
                            }

                            this.data.ROJob = dataUnitDeliveryOrder.RONo;
                        })
                });
          }else if(this.unitCode === "SBC"){
            this.garmentPurchasingService.getSubconExpenditureNoteById(newValue.Id)
                .then(dataSubconUnitExpenditureNote => {
                    this.data.IsSubcon = true;
                    this.garmentPurchasingService.getUnitDeliveryOrderById(dataSubconUnitExpenditureNote.UnitDOId)
                        .then(dataUnitDeliveryOrder => {
                            this.data.UENId = dataSubconUnitExpenditureNote.Id;
                            this.data.UENid = dataSubconUnitExpenditureNote.Id;
                            this.data.UENNo = dataSubconUnitExpenditureNote.UENNo;
                            this.data.Storage = dataSubconUnitExpenditureNote.Storage;
                            this.data.StorageFromName = dataSubconUnitExpenditureNote.Storage.name;
                            this.data.ExpenditureDate = dataSubconUnitExpenditureNote.ExpenditureDate;

                            for (const item of dataSubconUnitExpenditureNote.Items) {
                                var fabricRemark;

                                this.garmentCoreService.getProductById(item.ProductId)
                                    .then(product => {
                                        fabricRemark = product.Remark;
                                        this.data.Items.push({
                                            UENItemId: item.Id,
                                            POSerialNumber: item.POSerialNumber,
                                            Product: {
                                                Id: item.ProductId,
                                                Code: item.ProductCode,
                                                Name: item.ProductName
                                            },
                                            ProductCode: item.ProductCode,
                                            ProductName: item.ProductName,
                                            ProductRemark: item.ProductRemark,
                                            FabricRemark: fabricRemark,
                                            Quantity: item.Quantity,
                                            Uom: {
                                                Id: item.UomId,
                                                Unit: item.UomUnit
                                            },
                                            UomUnit: item.UomUnit,
                                            BasicPrice : item.BasicPrice,
                                            URNItemId: item.URNItemId,
                                            NoPackage: item.NoPackage
                                        });

                                    });
                            }

                            this.data.ROJob = dataUnitDeliveryOrder.RONo;
                        })
                });
          }
        } else {
            this.data.UENid = 0;
            this.data.UENNo = null;
            this.data.Storage = null;
            this.data.StorageFromName = null;
            delete this.data.ExpenditureDate;
            this.data.ROJob = null;
            this.context.UnitExpenditureNoteViewModel.editorValue = "";
        }
    }
}
