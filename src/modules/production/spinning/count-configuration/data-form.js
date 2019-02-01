import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service, CoreService } from './service';
import { debug } from 'util';

//var lotConfigurationLoader = require('../../../../loader/lot-configuration-loader');

// var moment = require('moment');
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
    @bindable isMixDrawing;
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
            length: 3
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

    typeOptions = []
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
                this.processTypeList = result;
            });
        if (this.data.ProcessType) {
            this.processType = this.data.ProcessType;
        }
        if (this.data.ProcessType == "Blowing" ||
            this.data.ProcessType == "Carding" ||
            this.data.ProcessType == "Pre-Drawing" ||
            this.data.ProcessType == "Finishing-Drawing") {
            this.finishingDrawing = false;
        } else {
            this.finishingDrawing = true;
        }

        if (!this.yarnType) {
            if (this.data.CottonYarn) {
                this.yarnType = this.data.CottonYarn;
            } else {
                this.yarnType = this.data.PolyesterYarn
            }

        }

        if (this.data.PolyesterYarn) {
            this.service.getLotByYarnType(this.data.PolyesterYarn, this.finishingDrawing).then(result => {
                if (result) {
                    if (this.error) {
                        this.error.YarnType = undefined;
                    }
                    this.isItemPolyster = true;
                    this.data.itemsPolyster = result.CottonCompositions;
                    this.data.LotId = result.Id;
                    this.data.LotNo = result.LotNo;
                    this.polyesterLot = result.LotNo;
                } else {
                    if (this.error) {
                        this.error.YarnType = "Lot tidak ditemukan";
                    }
                    this.isItemPolyster = false;
                    this.data.itemsPolyster = null;
                    this.data.LotId = null;
                    this.data.LotNo = null;
                    this.polyesterLot = null;
                }
            });
        }
        if (this.data.CottonYarn) {
            this.service.getLotByYarnType(this.data.CottonYarn, this.finishingDrawing).then(result => {
                if (result) {
                    this.error.YarnType = undefined;
                    this.data.items = result.CottonCompositions;
                    this.data.LotId = result.Id;
                    this.data.LotNo = result.LotNo;
                    this.cottonLot = result.LotNo;
                } else {
                    this.error.YarnType = "Lot tidak ditemukan";
                    this.data.items = null;
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

    mixDrawingColumns = [
        { header: "Jenis Material", value: "yarn" },
        { header: "Nomor Lot", value: "lotNo" },
        { header: "Komposisi(%)", value: "composition" },
    ];


    processTypeChanged(n, o) {
        var selectedProcess = this.processType;
        // this.error=this.context.error;
        if (selectedProcess) {
            this.data.ProcessType = selectedProcess;
            if (this.data.ProcessType == "Finish Drawing") {
                this.ProcessType = true;
            }
            if (this.data.ProcessType == "Blowing" ||
                this.data.ProcessType == "Carding" ||
                this.data.ProcessType == "Pre-Drawing" ||
                this.data.ProcessType == "Finishing Drawing") {
                this.finishingDrawing = false;
            } else {
                this.finishingDrawing = true;
            }
        }
    }

    isMixDrawingChanged(n, o) {
        if (this.isMixDrawing == true) {
            this.data.IsMixDrawing = true;
            this.showItemRegular = false;
            this.regularItems = [];
            this.lot = undefined;
        } else {
            this.data.IsMixDrawing = false;
            this.showItemRegular = true;
        }
    }
    yarnTypeChanged(n, o) {
        var selectedProcess = this.yarnType;
        // if(!this.error.YarnType){
        //     this.error=this.context.error;
        // }
        if (selectedProcess) {
            if (selectedProcess != "") {
                this.showItemRegular = true;
            } else {
                this.showItemRegular = false;
                this.regularItems = [];
                this.data.Items = [];
            }
            var yarn = selectedProcess;
            var isMixDrawing = this.isMixDrawing;
            this.service.getLotByYarnType(yarn, this.finishingDrawing).then(result => {
                if (result) {

                    if (!isMixDrawing || isMixDrawing == false) {
                        this.regularItems = result.CottonCompositions;
                        this.lot = result.LotNo;
                        this.data.LotId = result.Id;
                        this.data.LotNo = result.LotNo;
                    } else {
                        this.data.Items = result.CottonCompositions;
                        this.lot = result.LotNo;
                        this.data.LotId = result.Id;
                        this.data.LotNo = result.LotNo;
                    }
                } else {
                    this.error.YarnType = "Lot tidak ditemukan";
                    this.data.items = null;
                    this.data.CottonYarn = null;
                    this.data.PolyesterYarn = null;
                    this.data.LotId = null;
                    this.data.LotNo = null;
                    this.cottonLot = null;
                    this.isItem = false;
                    this.isItemPolyster = false;
                }
            });
        }
    }


    get yarnLoader() {
        return ProductLoader;
    }
} 