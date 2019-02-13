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
        this.data.Input = this.data.Input || [];
        this.isItemPolyster = false;
        this.processType = false;
        this.cottonLot = "";
        this.polyesterLot = "";
        this.coreService.getMachineTypes()
            .then(result => {
                if(this.data.ProcessType){
                    this.processTypeList=result;
                } else {
                    this.processTypeList.push("");
                    for(var list of result){    
                        this.processTypeList.push(list);
                }}
            });
        if (this.data.ProcessType) {
            this.processType = this.data.ProcessType;
        } 
        
        if (this.data.ProcessType == "Finish Drawing") {
            this.showItemRegular = true;
            this.finishingDrawing = true;
            this.regularItems = [];
            this.data.Items=[];

        } else if(this.data.ProcessType == "Mix Drawing"){
            this.showItemRegular = false;
            this.finishingDrawing = true;
            this.lot = undefined;
            this.regularItems = [];
            this.data.Items=[];

        } else {
            if(this.data.ProcessType == 'Winder')
                this.data.Cone = 1.89;

            this.showItemRegular = true;
            this.finishingDrawing = false;
        }

        if (this.data.YarnType){
            this.yarnType=this.data.YarnType;
            this.service.getLotByYarnType(this.yarnType, this.finishingDrawing).then(result => {
                if (result) {
                    this.lot = result.LotNo;
                    this.data.LotId = result.Id;
                    this.data.LotNo = result.LotNo;

                    if (this.data.ProcessType=="Mix Drawing") {
                        this.data.Items = result.CottonCompositions;
                    } else {
                        this.regularItems = result.CottonCompositions;
                    }
                } else {
                    this.error.YarnType = "Lot tidak ditemukan";
                    this.data.Items = null;
                    this.data.LotId = null;
                    this.data.LotNo = null;
                    this.cottonLot = null;
                }
            });
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
            { header: "Komposisi(%)", value: "composition" },
        ],
        onAdd: function () {
            this.context.ItemsCollection.bind();
            this.data.Items.push({ yarnName: "", lotNo:"", composition: 0});
        }.bind(this)
    };


    processTypeChanged(n, o) {
        var selectedProcess = this.processType;
        this.data.ProcessType = selectedProcess;
        if (selectedProcess) {
            if (this.data.ProcessType == "Finish Drawing") {
                this.showItemRegular = true;
                this.finishingDrawing = true;
                this.regularItems = [];
                this.data.Items=[];

            } else if(this.data.ProcessType == "Mix Drawing"){
                this.showItemRegular = false;
                this.finishingDrawing = true;
                this.lot = undefined;
                this.regularItems = [];
                this.data.Items=[];

            } else {
                if(this.data.ProcessType == 'Winder')
                    this.data.Cone = 1.89;

                this.showItemRegular = true;
                this.finishingDrawing = false;
            }

        }
    }

    yarnTypeChanged(n, o) {
        
        var selectedProcess = this.yarnType;
        this.data.YarnMaterialTypeId=selectedProcess.id;
        if (selectedProcess) {
            if (selectedProcess != "") {
                this.showItemRegular = true;
            } else {
                this.showItemRegular = false;
            }
            var yarn = selectedProcess.id;
            this.service.getLotByYarnType(yarn, this.finishingDrawing).then(result => {
                if (result) {
                    this.lot = result.LotNo;
                    this.data.LotId = result.Id;
                    this.data.LotNo = result.LotNo;

                    if (this.data.ProcessType!="Mix Drawing") {
                    //     this.data.Items = result.CottonCompositions;
                    // } else {
                        this.regularItems = result.CottonCompositions;
                    }
                } else {
                    this.error.YarnType = "Lot tidak ditemukan";
                    this.data.Items = null;
                    this.data.LotId = null;
                    this.data.LotNo = null;
                    this.cottonLot = null;
                }
            });
        }
    }

    // countChanged(n, o) {
    //     var selectedCount = this.count;
    //     this.data.Count = selectedCount;
        // if(selectedCount){
        //     this.service.getLotByYarnType(selectedCount, this.finishingDrawing).then(result => {
        //         if(result){
        //             this.data.items=result;
        //         } else {
        //             this.error.count = "Lot tidak ditemukan";
        //         }
        //     });
        // }
    // }


    get yarnLoader() {
        return ProductLoader;
    }

    get materialTypeLoader() {
        return MaterialTypeLoader;
    }
} 