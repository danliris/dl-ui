import { inject, bindable, computedFrom } from 'aurelia-framework';
import { PermissionHelper } from '../../../utils/permission-helper';

var CurrencyLoader = require('../../../loader/currency-loader');
var UomLoader = require('../../../loader/uom-loader');
var CategoryLoader = require('../../../loader/category-loader');

@inject(PermissionHelper)
export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable Currency;
    @bindable UOM;
    @bindable Price;
    @bindable ManufactureType;
    
    @bindable Code;
    @bindable Name;
    @bindable OriginType;
    @bindable OriginTypeLists = ['IMPORT', 'LOKAL'];
    @bindable ManufactureTypeLists = ['FOB', 'CMT'];
    @bindable itemTypes = ['Item', 'Service'];
    
    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    }

    constructor(permissionHelper) {
        this.permissions = permissionHelper.getUserPermissions();
        console.log(this.permissions);
        this.isPermitted = this.isPermittedRole();
    }

    isPermittedRole() {
        // this.roles = [VERIFICATION, CASHIER, ACCOUNTING];
        let roleRules = ["C9", "B1"];

        for (var key in this.permissions) {
            let hasPermittedRole = roleRules.find((roleRule) => roleRule == key)
            if (hasPermittedRole)
                return true;
        }

        return false;
    }

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    get isActive(){
        return this.data.IsPosted == true;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        if (this.data.Category) {
            this.data.Category._id =this.data.Category.Id || this.data.Category._id;
            this.data.Category.code =this.data.Category.Code || this.data.Category.code || "";
            this.data.Category.name =this.data.Category.Name || this.data.Category.name || "";
        }
        if (this.data.Id) {
            this.Currency = this.data.Currency;
            this.UOM = this.data.UOM;
            this.Price = this.data.Price;
            this.originPrice = this.data.Price;
            this.Code = this.data.Code;
            this.Name = this.data.Name;
            this.ManufactureType = this.data.ManufactureType;
            this.OriginType = this.data.OriginType;
            //this.isActive = this.data.IsPosted;
            // this.itemTypes = this.data.ItemType;
        }

       

        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;
    }

    ManufactureTypeChanged(newValue) {
        if (this.readOnly || this.isEdit) {
            return;
        }

        if (newValue) {
            this.data.ManufactureType = newValue;
            this.generateCode();
        }
    }

    NameChanged(newValue) {
        if (this.readOnly || this.isEdit) {
            return;
        }

        const formattedName = newValue
            ? newValue.toUpperCase()
            : null;

        if (formattedName && formattedName !== newValue) {
            this.Name = formattedName;
        }

        this.data.Name = formattedName;
        this.generateCode();
    }

    generateNameCode() {
        return this.data.Name
            ? this.data.Name
                .trim()
                .split(/\s+/)
                .filter(word => /^[A-Za-z0-9]/.test(word))
                .map(word => word.charAt(0).toUpperCase())
                .join("")
                .substring(0, 4)
            : "";
    }

    
    generateCode() {
        const categoryCode =this.data.Category && this.data.Category.Code? this.data.Category.Code.trim(): "";
        const manufactureType =this.ManufactureType || this.data.ManufactureType;
        const originType =this.OriginType || this.data.OriginType;

        this.Code = "";
        this.data.Code = "";

        if (!categoryCode || !manufactureType || !originType) {
            return;
        }

        if (manufactureType === "FOB") {
            if (originType === "IMPORT") {
                this.Code = `FUI-${categoryCode}`;
            } else if (originType === "LOKAL") {
                this.Code = `FUL-${categoryCode}`;
            }
        } else if (manufactureType === "CMT") {
            if (originType === "IMPORT") {
                this.Code = `CUI-${categoryCode}`;
            } else if (originType === "LOKAL") {
                this.Code = `CUL-${categoryCode}`;
            }
        }

        this.data.Code = this.Code;
    }

    UOMChanged() {
        if (this.UOM) {
            this.data.UOM = this.UOM
        } else {
            this.UOM = {};
        }
    }

    CurrencyChanged() {
        if (this.Currency) {
            this.data.Currency = this.Currency;
        } else {
            this.Currency = {};
        }
    }

    PriceChanged() {
        console.log(this.originPrice);
        if (this.Price) {
            this.data.Price = this.Price;
            this.data.originPrice = this.originPrice;
        } else {
            this.Currency = {};
        }
    }

    OriginTypeChanged(newValue) {
        if (this.readOnly || this.isEdit) {
            return;
        }
        if (newValue) {
            this.data.OriginType = newValue;
        }
        this.generateCode();
    }

    categoryChanged(e) {
        if (this.readOnly || this.isEdit) {
            return;
        }

        if (e && e.target && !e.target.value) {
            this.data.Category = null;

            this.Code = "";
            this.data.Code = "";
            return;
        }

        if (this.data.Category && this.data.Category._id) {

            this.data.Category.Id = this.data.Category._id;
            this.data.Category.Code = (this.data.Category.code || "").trim();
            this.data.Category.Name = this.data.Category.name || "";
            this.data.ItemGroupD365 = this.data.Category.CodeD365;

            this.generateCode();
        }
    }

    get currencyLoader() {
        return CurrencyLoader;
    }

    get uomLoader() {
        return UomLoader;
    }

    columns = [
        { header: "Kategori - Divisi", value: "CategoryDivision" }
    ];

    get addItems() {
        return (event) => {
            this.data.MappingCategories.push({})
        };
    }

    get categoryLoader() {
            return CategoryLoader;
        }
}
