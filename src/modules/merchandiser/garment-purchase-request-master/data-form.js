import {inject, bindable, computedFrom} from 'aurelia-framework'
var UnitLoader = require('../../../loader/garment-units-loader');
var PreSalesContractLoader = require('../../../loader/garment-pre-sales-contracts-loader');
var BudgetLoader = require('../../../loader/budget-loader');
var CategoryLoader = require('../../../loader/garment-category-loader');

export class DataForm {
    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable data = {};
    @bindable title;
    @bindable selectedPreSalesContract;

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    prTypes = [
        "MASTER",
        "SAMPLE"
    ];

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah"
    };

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.itemOptions = {
            isEdit : this.isEdit
        };
    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }

    get unitLoader() {
        return UnitLoader;
    }

    get preSalesContractLoader() {
        return PreSalesContractLoader;
    }

    itemsColumns = [
        { header: "Kategori" },
        { header: "Kode Barang" },
        { header: "Komposisi" },
        { header: "Konstruksi" },
        { header: "Yarn" },
        { header: "Width" },
        { header: "Keterangan" },
        { header: "Jumlah" },
        { header: "Satuan" },
        { header: "Price" },
        { header: "Satuan Harga" },
        { header: "Konversi" },
        { header: "Total" },
    ]

    get buyer() {
        if (this.data.Buyer) {
            return `${this.data.Buyer.Code} - ${this.data.Buyer.Name}`;
        } else {
            return "-";
        }
	}
    
    changePRType(e) {
        if (e.target.value === "MASTER") {
            this.context.unitViewModel.editorValue = "";
            this.data.Unit = null;
        }
    }

    selectedPreSalesContractChanged(newValue) {
        if (newValue) {
            this.data.SCId = newValue.Id;
            this.data.SCNo = newValue.SCNo;
            this.data.Buyer = {
                Id: newValue.BuyerBrandId,
                Code: newValue.BuyerBrandCode,
                Name: newValue.BuyerBrandName
            };
        } else {
            this.data.SCId = 0;
            this.data.SCNo = null;
            this.data.Buyer = null;
        }
    }

    get addItems() {
        return (event) => {
            this.data.Items.push({})
        };
    }

    get removeItems() {
        return (event) => {
            // console.log(event);
        };
    }
}