import { bindable, inject, containerless, computedFrom, BindingEngine } from "aurelia-framework";
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from "./service";

@containerless()
@inject(Service, BindingSignaler, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable title;
    @bindable error = {};
    @bindable selectedTarif;

    constructor(service, bindingSignaler, bindingEngine) {
        this.service = service;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;
    }
    tarifOptions = [
            { text: "-- Pilih Tarif --", value: "" },
            { text: "OL", value: {Name : "OL", Code : "OL" } },
            { text: "THR", value: {Name : "THR", Code : "THR" } },
            { text: "USD", value: {Name : "USD", Code : "USD" } },
            { text: "Beban Penjualan", value: {Name : "Beban Penjualan", Code : "BP" } },
            { text: "Beban Umum dan Administrasi", value: {Name : "Beban Umum dan Administrasi", Code : "BUA" } },
            { text: "Beban (Pendapatan) Diluar Usaha", value: {Name : "Beban (Pendapatan) Diluar Usaha", Code : "BDU" } },
            { text: "OTL", value: {Name : "OTL", Code : "OTL" } },
        ];
    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: '5 text-right',
        },
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        if (this.data && this.tarifOptions && this.tarifOptions.length) {
            var name = this.data.Name || "";

            var match = this.tarifOptions.find(function (option) {
                return option.value.Name === name;
            });

            this.selectedTarif = match ? match.value.Name : null;

            console.log(this.selectedTarif);
        } else {
            this.selectedTarif = null;
        }
    }

    selectedTarifChanged(newValue, oldValue) {
        if (newValue) {
            this.data.Name = newValue.value.Name;
            this.data.Code = newValue.value.Code;
        } else {
            this.data.Name = "";
            this.data.Code = "";
        }
    }
}