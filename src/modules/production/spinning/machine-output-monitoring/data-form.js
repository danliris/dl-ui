import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from './service';
import moment from 'moment';

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

    machineTypeList = [
        "",
        "Blowing",
        "Carding",
        "Pre Drawing",
        "Finish Drawing",
        "Flyer",
        "Ring Spinning",
        "Winding"
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

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;
    }

    columns = [
        { header: "Nama Mesin", value: "Machine" },
        { header: "Counter", value: "Counter" },
        { header: "Satuan", value: "Uom" },
        { header: "Ball", value: "Ball" },
        { header: "Eff%", value: "EffPrecentage" }
    ]

    get addItems() {
        return (event) => {
            this.data.Items.push({})
        };
    }

    mockLotLoader = (keyword, filter) => {

        return Promise.resolve([{ Name: "Lot 1" }, { Name: "Lot 2" }]);
    }

    get lotLoader() {
        //return LotLoader;
        return this.mockLotLoader;
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
