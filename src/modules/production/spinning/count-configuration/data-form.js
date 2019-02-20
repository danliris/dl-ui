import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service, CoreService } from './service';
import { debug } from 'util';

//var lotConfigurationLoader = require('../../../../loader/lot-configuration-loader');

var moment = require('moment');
var MaterialTypeLoader = require('../../../../loader/material-types-loader');

var ProductLoader = require('../../../../loader/product-azure-loader');

@inject(Service, CoreService)
export class DataForm {
    @bindable isCreate = false;
    @bindable isEdit = false;
    @bindable isView = false;
    @bindable readOnly;
    @bindable data = {};
    @bindable error;
    @bindable title;
    @bindable lotConfiguration;
    @bindable processType;
    @bindable yarnType;
    @bindable count;
    @bindable showItemRegular;
    @bindable regularItems;
    @bindable lot;
    @bindable mixDrawingLot;
    @bindable detailOptions;

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
    controlOptions3 = {
        label: {
            length: 1
        },
        control: {
            length: 5
        }
    }
    controlOptions2 = {
        label: {
            length: 4
        },
        control: {
            length: 7
        }
    }
    mixDrawing = false;
    processTypeList = [
    ];
    
    detailOptions = {};
    constructor(service, coreService) {
        this.service = service;
        this.coreService = coreService;
        this.detailOptions.service = service;
        this.detailOptions.coreService = coreService;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.processType = false;
        if (!this.readOnly)
            this.coreService.getMachineTypes()
                .then(result => {
                    if (this.data.ProcessType) {
                        this.processTypeList = result;
                    } else {
                        this.processTypeList.push("");
                        for (var list of result) {
                            this.processTypeList.push(list);
                        }
                    }
                });
        if (this.data.ProcessType) {
            this.processType = this.data.ProcessType;
        }

        if (this.data.ProcessType == "Mix Drawing") {
            this.showItemRegular = false;
            this.mixDrawing = true;
            if (this.data.MixDrawingLotNo) {
                this.mixDrawingLot = this.data.MixDrawingLotNo;
            }
            
        } else {
            this.showItemRegular = true;
            this.mixDrawing = false;
            this.yarnType = {};
            if (this.data.MaterialComposition) {
                this.yarnType.id = this.data.MaterialComposition[0].YarnId;
                this.yarnType.code = this.data.MaterialComposition[0].YarnCode;
                this.data.YarnMaterialTypeId = this.yarnType.id;
                this.data.YarnMaterialTypeCode = this.yarnType.code;
                if (this.yarnType.id) {
                    this.yarnTypeId = this.yarnType.id;
                    this.lot = this.data.LotNo;
                    this.regularItems = this.data.regularItems;
                    
                }
            }

        }
    }

    inputInfo = {
        columns: [
            { header: "Nama Kapas", value: "product" },
            { header: "Komposisi(%)", value: "composition" },
        ],
    };

    mixDrawingColumns = {
        columns: [
            "Jenis Material",
            "Nomor Lot",
            "Komposisi(%)"
        ],
        onAdd: function () {
            this.context.ItemsCollection.bind();
            this.data.MaterialComposition.push({});
        }.bind(this)
    };

    processTypeChanged(n, o) {
        var selectedProcess = this.processType;
        this.data.ProcessType = selectedProcess;
        if (selectedProcess) {
            if (this.data.ProcessType == "Mix Drawing") {
                this.showItemRegular = false;
                this.mixDrawing = true;
                this.lot = undefined;
                this.regularItems = [];


            } else {
                if (this.data.ProcessType == 'Winder')
                    this.data.ConeWeight = 1.89;

                this.data.MaterialComposition = [];
                this.showItemRegular = true;
                this.mixDrawing = false;

            }

        }
    }

    mixDrawingLotChanged(n, o) {
        if (this.mixDrawingLot) {
            this.data.mixDrawingLot = this.mixDrawingLot;
            this.data.MixDrawingLotNo = this.mixDrawingLot;
        }
    }

    yarnTypeChanged(n, o) {
        var selectedProcess = this.yarnType;

        if (selectedProcess) {
            
            this.data.YarnMaterialTypeId = selectedProcess.id;
            this.data.YarnMaterialTypeCode = selectedProcess.code;
            var yarn = selectedProcess.id;
            if (yarn) {
                this.service.getLotByYarnType(yarn, this.mixDrawing).then(result => {
                    if (result) {
                        this.lot = result.LotNo;
                        this.data.LotId = result.Id;
                        this.data.LotNo = result.LotNo;
                        if (this.error) {
                            this.error.YarnId = null;
                        }
                        if (this.data.ProcessType != "Mix Drawing") {
                            
                            this.regularItems = result.CottonCompositions;
                        }
                    } else {
                        this.error.YarnId = "Lot tidak ditemukan";
                        this.data.MaterialComposition = null;
                        this.data.LotId = null;
                        this.data.LotNo = null;
                        this.cottonLot = null;
                        this.regularItems = null;
                        this.data.YarnMaterialTypeId = null;
                        this.data.YarnMaterialTypeCode = null;
                    }
                });
            }

        }
    }


    get yarnLoader() {
        return ProductLoader;
    }

    get materialTypeLoader() {
        return MaterialTypeLoader;
    }
} 