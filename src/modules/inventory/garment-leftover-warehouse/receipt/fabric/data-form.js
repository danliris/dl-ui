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
        { header: "No PO", value: "POSerialNumber" },
        { header: "Komposisi", value: "Composition" },
        { header: "Keterangan Fabric", value: "FabricRemark" },
        { header: "Jumlah", value: "Quantity" },
        { header: "Satuan", value: "UomUnit" },
    ]
    //UnitFrom = ["GARMENT", "SAMPLE", "TERIMA SUBCON"];
    unitFrom = [
      { Id: 123, Code: "GMT", Name: "GARMENT" },
      { Id: 107, Code: "SMP1", Name: "SAMPLE" },
      { Id: 0, Code: "SBC", Name: "TERIMA SUBCON" }
    ];
    // UnitFrom = {
    //     GARMENT: { id: 128, Code: "GMT", name: "GARMENT" },
    //     SAMPLE: { id: 107, Code: "SMP1", name: "SAMPLE" },
    //     "TERIMA SUBCON": { id: 10, code: "SBC", name: "TERIMA SUBCON" }
    // };

    // get unitLoader() {
    //   return UnitLoader;
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
    // get selectedUnitFromLabel(){
    //   return this.unitView(this.selectedUnitFrom);
    // } 

    @computedFrom("data.UnitFrom")
    get unitExpenditureNoteFilter() {
      
      const code = this.unitCode;

        if (code === "SBC") {
            return {
                IsReceived: false,
                ExpenditureType: "SISA PRODUKSI",
                StorageName: "GUDANG BAHAN BAKU"
            };
        } else if (code) {
            return {
                IsReceived: false,
                ExpenditureType: "SISA",
                StorageName: "GUDANG BAHAN BAKU",
                UnitSenderCode: code
            };
        } else {
            return {}; // fallback jika belum dipilih
        }
    }

    // get selectedUnitExpenditureNoteLoader() {
    //   // return this.data.UnitFrom.Code !== 'SBC'
    //   //     ? this.unitExpenditureNoteLoader
    //   //     : this.subconUnitExpenditureNoteLoader;
    // }
    
    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        if (this.data && this.data.Id) {
            this.selectedUnitFrom = {
                Id : this.data.UnitFrom.Id,
                Code: this.data.UnitFrom.Code,
                Name: this.data.UnitFrom.Name
            };
            
            
            this.selectedUnitExpenditureNote = {
                UENNo: this.data.UENNo
            };
            this.data.StorageFromName = this.data.StorageFrom.name;
            for (const item of this.data.Items) {
                item.ProductCode = item.Product.Code;
                item.ProductName = item.Product.Name;
                item.UomUnit = item.Uom.Unit;
            }

            this.garmentPurchasingService.getUnitExpenditureNoteById(this.data.UENId)
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
        this.data.UnitFrom = newValue;
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
                            this.data.UENNo = dataUnitExpenditureNote.UENNo;
                            this.data.StorageFrom = dataUnitExpenditureNote.Storage;
                            this.data.StorageFromName = dataUnitExpenditureNote.Storage.name;
                            this.data.ExpenditureDate = dataUnitExpenditureNote.ExpenditureDate;
                              for (const item of dataUnitExpenditureNote.Items) {
                                this.garmentCoreService.getProductById(item.ProductId)
                                    .then(product => {
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
                                            FabricRemark: product.Const + "; " + product.Yarn + "; " + product.Width,
                                            Composition: product.Composition,
                                            ProductRemark: item.ProductRemark,
                                            BasicPrice: item.BasicPrice,
                                            Quantity: item.Quantity,
                                            Uom: {
                                              Id: item.UomId,
                                              Unit: item.UomUnit
                                            },
                                            UomUnit: item.UomUnit,
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
                            this.data.UENNo = dataSubconUnitExpenditureNote.UENNo;
                            this.data.StorageFrom = dataSubconUnitExpenditureNote.Storage;
                            this.data.StorageFromName = dataSubconUnitExpenditureNote.Storage.name;
                            this.data.ExpenditureDate = dataSubconUnitExpenditureNote.ExpenditureDate;
                              for (const item of dataSubconUnitExpenditureNote.Items) {
                                this.garmentCoreService.getProductById(item.ProductId)
                                    .then(product => {
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
                                            FabricRemark: product.Const + "; " + product.Yarn + "; " + product.Width,
                                            Composition: product.Composition,
                                            ProductRemark: item.ProductRemark,
                                            BasicPrice: item.BasicPrice,
                                            Quantity: item.Quantity,
                                            Uom: {
                                              Id: item.UomId,
                                              Unit: item.UomUnit
                                            },
                                            UomUnit: item.UomUnit,
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
            this.data.UENId = 0;
            this.data.UENNo = null;
            this.data.StorageFrom = null;
            this.data.StorageFromName = null;
            delete this.data.ExpenditureDate;
            this.data.ROJob = null;
            this.context.UnitExpenditureNoteViewModel.editorValue = "";
        }
    }
}
