import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from './service';
import moment from 'moment';

var LotLoader = require('../../../../loader/lot-configuration-for-machine-output-loader');
var MaterialTypeLoader = require('../../../../loader/material-types-loader');

@inject(Service)
export class DataForm {
    @bindable title;
    @bindable readOnly;

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    };

    processTypeList = [
        "",
        "Blowing",
        "Carding",
        "Pre-Drawing",
        "Finish Drawing",
        "Flyer",
        "Ring Spinning",
        "Winding"
    ];

    shiftList = [
        "",
        "Shift 1 06:00 - 14:00",
        "Shift 2 14:00 - 22:00",
        "Shift 3 22:00 - 06:00"
    ];

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    constructor(service) {
        this.service = service;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.isItem = false;
        if(this.data.ProcessType!=""){
            this.isItem = true;
        }
        // this.cancelCallback = this.context.cancelCallback;
        // this.deleteCallback = this.context.deleteCallback;
        // this.editCallback = this.context.editCallback;
        // this.saveCallback = this.context.saveCallback;
    }

    columns = [
        { header: "Nomor Mesin", value: "MachineNo" },
        { header: "Nama Mesin", value: "MachineName" },
        { header: "Output (Counter)", value: "Output" },
        { header: "UOM", value: "Uom.Unit" },
        { header: "Bale", value: "Bale" },
        // { header: "Spindle Kosong (Flyer)", value: "Spindle" },
        // { header: "Bad Cone (Winder)", value: "BadCone" },
        { header: "Eff%", value: "Eff" }
    ]

    // get addItems() {
    //     return (event) => {
    //         this.data.Items.push({})
    //     };
    // }

    processTypeChanged(e) {
        var selectedProcess = e.srcElement.value;
        this.error=this.context.error;
        // if (selectedProcess) {
        //     this.data.ProcessType = selectedProcess;
        //     if (this.data.ProcessType == "Finish-Drawing") {
        //         this.ProcessType = true;
        //     }
        //     if (this.data.ProcessType == "Blowing" || 
        //         this.data.ProcessType == "Carding" || 
        //         this.data.ProcessType == "Pre-Drawing" || 
        //         this.data.ProcessType == "Finishing-Drawing")  {
        //             this.finishingDrawing = false;
        //     } else {
        //         this.finishingDrawing = true;
        //     }
        // }
    }

    mockLotLoader = (keyword, filter) => {

        return Promise.resolve([{ Name: "Lot 1" }, { Name: "Lot 2" }]);
    }

    get lotLoader() {
        //return LotLoader;
        return LotLoader;
    }

    get materialTypeLoader() {
        return MaterialTypeLoader;
    }

    mockProcessLoader = (keyword, filter) => {

        return Promise.resolve([{ Name: "Process Type 1" }, { Name: "Process Type 2" }]);
    }

    get processLoader() {
        //return ProcessLoader;
        return this.mockProcessLoader;
    }

    get grandTotal() {
        let result = 0;
        if (this.data.Items && this.data.Items.length > 0) {
            for (let item of this.data.Items) {
                if (item.Ball)
                    result += item.Ball;
            }
        }
        return result;
    }    
}
