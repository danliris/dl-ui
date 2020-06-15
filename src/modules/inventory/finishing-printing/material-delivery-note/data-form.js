import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from './service';
import moment from 'moment';

@inject(Service)
export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable data;
    @bindable error;

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    };

    BonCode = ["", "FSSA", "FSSB", "JESA","JESB","JLSA","JLSB","JLSC","WBSA","WBSB","WBSC","WCSA","WCSB","WCSC",];
    
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
        this.hasPosting = this.context.hasPosting;
    }

    columns = [
        { header: "No. SOP", value: "NoSPP" },
        { header: "Nama Barang", value: "MaterialName" },
        { header: "Lot", value: "InputLot" },
        { header: "Bruto", value: "WeightBruto" },
        { header: "DOS", value:"WeightDOS" },
        { header: "Cone", value:"WeightCone" },
        { header: "BALE", value:"WeightBale" },
        { header: "KG", value:"getTotal" }
    ];

    get addItems() {
        return (event) => {
            this.data.items.push({})
        };
    }

    enterDelegate(event) {
      if (event.charCode === 13) {
        event.preventDefault();
        return false;
      } else return true;
    }
}
