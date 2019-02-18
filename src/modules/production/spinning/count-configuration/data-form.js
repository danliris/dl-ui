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
    @bindable Input = [];
    @bindable processType;
    @bindable yarnType;
    @bindable count;
    @bindable showItemRegular;
    @bindable regularItems;
    @bindable lot;

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
    yarnTypeList = [
        "",
        "PCP",
        "CMP",
        "CD",
        "CVC",
        "PE",
        "TENCEL",
        "CUPRO",
        "PC-P 45"
    ];


    constructor(service, coreService) {
        this.service = service;
        this.coreService = coreService;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.isItemPolyster = false;
        this.processType = false;
        this.cottonLot = "";
        this.polyesterLot = "";
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
                    this.service.getLotByYarnType(this.yarnTypeId, this.mixDrawing).then(result => {
                        if (result) {
                            this.lot = result.LotNo;
                            this.data.LotId = result.Id;
                            this.data.LotNo = result.LotNo;

                            if (this.data.ProcessType != "Mix Drawing") {

                                this.regularItems = result.CottonCompositions;
                            }
                        }
                    });
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
            { header: "Jenis Material", value: "yarnItem" },
            { header: "Nomor Lot", value: "lotNoItem" },
            { header: "Komposisi(%)", value: "Composition" },
        ],
        onAdd: function () {
            this.context.ItemsCollection.bind();
            this.data.MaterialComposition.push({});
        }.bind(this)
    };

    addItemCallback = (e) => {
        this.data.MaterialComposition = this.data.MaterialComposition || [];
        this.data.MaterialComposition.push({})
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
                this.data.MaterialComposition = [];

            } else {
                if (this.data.ProcessType == 'Winder')
                    this.data.ConeWeight = 1.89;

                this.data.MaterialComposition = [];
                this.showItemRegular = true;
                this.mixDrawing = false;

            }

        }
    }

    yarnTypeChanged(n, o) {
        var selectedProcess = this.yarnType;
        this.data.YarnMaterialTypeId = selectedProcess.id;
        this.data.YarnMaterialTypeCode = selectedProcess.code;
        if (selectedProcess) {
            // if (selectedProcess != "") {
            //     this.showItemRegular = true;
            // } else {
            //     this.showItemRegular = false;
            // }
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
                            //     this.data.Items = result.CottonCompositions;
                            // } else {
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