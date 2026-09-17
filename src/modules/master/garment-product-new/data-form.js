import { bindable, computedFrom } from 'aurelia-framework';
var UomLoader = require('../../../loader/uom-loader');
var ProductGarmentLoader = require('../../../loader/garment-product-loader');

export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable UOM;
    @bindable const;
    @bindable yarn;
    @bindable width;
    @bindable nameCheck;
    @bindable ManufactureType;
    @bindable ProductType;
    @bindable ProductGarment;
    @bindable CategoryType;
    @bindable OriginType;
    @bindable ProductGarmentCheck;
    @bindable Name;
    @bindable Composition;
    @bindable compositions = [
        {
            Composition: "",
            Percentage: null
        }
    ];


    OriginTypeLists = ['IMPORT', 'LOKAL'];
    ManufactureTypeLists = ['','FOB', 'CMT', 'AVAL'];
    ProductTypeLists = [];
    CategoryTypeLists = [];

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah"
    };

    constructor() { }

    @computedFrom('data.Id')
    get isEdit() {
        return (this.data.Id || '').toString() !== '';
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data || {};

        this.ManufactureType = this.data.ManufactureType || '';
        this.ProductType = this.data.ProductType || '';
        this.OriginType = this.data.OriginType || '';
        this.Name = this.data.Name || '';
        this.Composition = this.data.Composition || '';

        if (this.data.ManufactureType) {
            this.setProductTypes(this.data.ManufactureType);
        }

        if (this.data.ProductType) {
            this.setCategoryTypes(this.data.ProductType);
        }
        this.CategoryType = this.data.CategoryType || '';
        if (this.data.Id) {
            this.Currency = this.data.Currency;
            this.UOM = this.data.UOM;

            if (this.data.ProductType === 'FABRIC') {
                this.nameCheck = true;
            } else {
                this.nameCheck = false;
            }
        } else {
            this.nameCheck = (this.data.ProductType === 'FABRIC');

            if (this.nameCheck) {
                this.data.Name = 'FABRIC';
            }
        }
        this.error = this.context.error;
        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;
    }

    UOMChanged(value) {
        if (value) {
            this.data.UOM = value;
        }
        else {
            (this.context.UOMViewModel || {}).editorValue = "";
            this.data.UOM = null;
        }
    }

    get uomLoader() {
        return UomLoader;
    }

    get productGarmentLoader() {
        return (keyword) => {
            const filter = {
                [`ManufactureType == "FOB" || ManufactureType == "CMT"`]: true,
                [`OriginType == "LOKAL" || OriginType == "IMPORT"`]: true,
                [`ProductType == "${this.data.ProductType}"`]: true,
                [`CategoryType == "${this.data.CategoryType}"`]: true
            };
            return ProductGarmentLoader(keyword, filter);
        }
    }

    productView = (product) => {
        if (product) {
            if(this.data.CategoryType != 'BB') {
                return `${product.Code} - ${product.Name}`;
            }else{
                return `${product.Code} - ${product.Name} - ${product.Composition} - ${product.Const} - ${product.Yarn} - ${product.Width}`;
            }
        }
        return '';
    }

    ProductGarmentCheckChanged(value) {
        this.data.Name = null;
        this.data.Code = null;
        this.data.Composition = null;
        this.data.Const = null;
        this.data.Yarn = null;
        this.data.Width = null;
        this.Composition = null;
        this.compositions = [
            {
                Composition: "",
                Percentage: null
            }
        ];
        if(this.data.ProductType === 'FABRIC' || this.ProductType === 'FABRIC'){
            this.Name = 'FABRIC';
            this.data.Name = 'FABRIC';
            this.nameCheck = true;
        }

        if(this.data.ManufactureType != 'AVAL' || this.ManufactureType != 'AVAL'){
            this.data.UOM = null;
            if(this.context.UOMViewModel){
                (this.context.UOMViewModel || {}).editorValue = "";
                this.UOM = null;
            }
        }
        if(this.context.ProductGarmentViewModel){
            (this.context.ProductGarmentViewModel || {}).editorValue = "";
            this.ProductGarment = null;
        }
    }


    ManufactureTypeChanged(value) {
        if (this.readOnly || this.isEdit) {
            return;
        }
        this.data.Name = '';
        this.nameCheck = false;
        this.ProductType = null;
        this.CategoryType = null;
        this.data.ProductType = null;
        this.data.CategoryType = null;
        this.CategoryTypeLists = [];
        this.UOM = null;
        this.data.UOM = null;
        this.ProductGarmentCheck = false;
        if(value){
            this.data.ManufactureType = value;
            this.setProductTypes(value);
            if(this.context.ProductGarmentViewModel){
                (this.context.ProductGarmentViewModel || {}).editorValue = "";
            }
            if (value === 'AVAL') {
                this.ProductGarmentCheck = true;
                this.data.ProductType = 'NON FABRIC';
                this.ProductType = 'NON FABRIC';
                this.setCategoryTypes('NON FABRIC');

                this.data.Name = '';
                this.nameCheck = false;
                this.data.OriginType = 'LOKAL';
                this.OriginType = 'LOKAL';
                UomLoader("KG", {})
                .then(results => {
                    const kg = results.filter(x => x.Unit === "KG")[0];

                    if (kg) {
                        this.UOM = kg;
                        this.data.UOM = kg;
                    }
                });
            }
        }
    }
    capitalizeWords(text) {
        return text
            ? text.toUpperCase()
            : "";
    }

    updateComposition() {
        this.Composition = this.compositions
            .map(x => [
                x.Percentage ? `${x.Percentage}%` : null,
                x.Composition
                    ? this.capitalizeWords(
                        x.Composition.trim().replace(/\s+/g, " ")
                    )
                    : null
            ]
            .filter(v => v !== null && v !== undefined && v !== "")
            .join(" "))
            .filter(x => x)
            .join(" ")
            .trim();

        this.data.Composition = this.Composition;
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

    generateCodeCMT(product) {
        if (!product || !product.Code) {
            return;
        }

        const code = product.Code;

        if (code.startsWith("FI-")) {
            if(this.OriginType == "IMPORT" || this.data.OriginType == "IMPORT"){
                this.data.Code = code.replace(/^FI-/, "CI-");
            }else{
                this.data.Code = code.replace(/^FI-/, "CL-");
            }
        } else if (code.startsWith("FL-")) {
            if(this.OriginType == "IMPORT" || this.data.OriginType == "IMPORT"){
                this.data.Code = code.replace(/^FL-/, "CI-");
            }else{
                this.data.Code = code.replace(/^FL-/, "CL-");
            }
        } else {
            const prefix = this.data.OriginType === "IMPORT"
                ? "CI-"
                : "CL-";

            this.data.Code = `${prefix}${code}`;
        }
    }
    generateCodeAval(product) {
        if (!product || !product.Code) {
            return;
        }
        const code = product.Code;

        if (code.startsWith("FI-")) {
            if(this.OriginType == "IMPORT" || this.data.OriginType == "IMPORT") {
                this.data.Code = code.replace(/^FI-/, "GAI-");
            }else{
                this.data.Code = code.replace(/^FI-/, "GAL-");
            }
        }
        else if (code.startsWith("FL-")) {
            if(this.OriginType == "IMPORT" || this.data.OriginType == "IMPORT") {
                this.data.Code = code.replace(/^FL-/, "GAI-");
            }else{
                this.data.Code = code.replace(/^FL-/, "GAL-");
            }    
        }
        else {
            const prefix = this.data.OriginType === "IMPORT"
                ? "GAI-"
                : "GAL-";
            this.data.Code = `${prefix}${code}`;
        }
    }


    NameChanged(value) {
        if (this.readOnly || this.isEdit) {
            return;
        }
        if (value) {
            this.Name = this.capitalizeWords(value);
            this.data.Name = this.Name;
            this.generateCode();
        }
    }

    generateCode(product = null) {

        if (this.data.ManufactureType === "CMT" && this.ProductGarmentCheck == true) {
            this.generateCodeCMT(product || this.ProductGarment);
            return;
        }
        if (this.data.ManufactureType === "AVAL" && this.ProductGarmentCheck == true) {
            this.generateCodeAval(product || this.ProductGarment);
            return;
        }

        const compositionCode = this.compositions
            .filter(x => x.Composition)
            .map(x => x.Composition.trim().charAt(0).toUpperCase())
            .join("");

        const nameCode = this.generateNameCode();

        if (this.data.ManufactureType === "FOB" || this.ManufactureType === "FOB") {
            if (this.data.ProductType === "FABRIC" || this.ProductType === "FABRIC") {
                this.data.Code =
                    this.data.OriginType === "IMPORT"
                        ? `FI-${compositionCode}`
                        : `FL-${compositionCode}`;
            } else {
                if(this.data.CategoryType === 'PRC' || this.CategoryType === 'PRC'){
                    this.data.Code = `PR-${nameCode}`;
                }else{
                this.data.Code =
                    this.data.OriginType === "IMPORT"
                        ? `FI-${nameCode}`
                        : `FL-${nameCode}`;
                }
            }
        } else if (this.data.ManufactureType === "CMT") {
            if (this.data.ProductType === "FABRIC" || this.ProductType === "FABRIC") {
                this.data.Code =
                    this.data.OriginType === "IMPORT"
                        ? `CI-${compositionCode}`
                        : `CL-${compositionCode}`;
            } else {
                this.data.Code =
                    this.data.OriginType === "IMPORT"
                        ? `CI-${nameCode}`
                        : `CL-${nameCode}`;
            }
        }
    }

    addComposition() {
        if (this.compositions.length < 4) {
            this.compositions.push({
                Composition: "",
                Percentage: null
            });

            this.updateComposition();
        }
    }

    removeComposition(index) {
        if(this.compositions.length == 1){
            this.Composition = null;
            this.data.Composition = null;
            this.compositions = [
                {
                    Composition: "",
                    Percentage: null
                }
            ];
        }
        if (this.compositions.length > 1) {
            this.compositions.splice(index, 1);
        }
        this.updateComposition();
    }

    OriginTypeChanged(value) {
        if (this.readOnly || this.isEdit) {
            return;
        }

        if((this.data.ManufactureType != 'FOB' || this.ManufactureType != 'FOB') && this.ProductGarmentCheck == true)
        {
            this.data.Code = null;
            this.data.Name = null;
            this.Name = null;
            this.Composition = null;
            this.compositions = [
                {
                    Composition: "",
                    Percentage: null
                }
            ];
            this.data.Composition = null;
            this.data.Const = null;
            this.data.Yarn = null;
            this.data.Width = null;
            if(this.context.ProductGarmentViewModel){
                (this.context.ProductGarmentViewModel || {}).editorValue = "";
                this.ProductGarment = null;
            }
            if(this.data.ManufactureType != 'AVAL' || this.ManufactureType != 'AVAL'){
                this.data.UOM = null;
                if(this.context.UOMViewModel){
                    (this.context.UOMViewModel || {}).editorValue = "";
                    this.UOM = null;
                }
            }
        }
        if(value){
            this.data.OriginType = value;
            this.generateCode();
            this.setCategoryTypes(this.data.ProductType || this.ProductType);
        }
    }

    ProductTypeChanged(value) {
        if (this.readOnly || this.isEdit) {
            return;
        }
        this.CategoryType = null;
        this.data.CategoryType = null;
        if(value){
            this.data.ProductType = value;
            this.setCategoryTypes(value);
            if (value === 'FABRIC') {
                this.CategoryType = 'BB';
                this.data.CategoryType = 'BB';
                this.Name = 'FABRIC'
                this.data.Name = 'FABRIC';
                this.nameCheck = true;
            } else {
                this.Name = '';
                this.data.Name = '';
                this.nameCheck = false;
            }
        }
    }

    setProductTypes(manufactureType) {
        switch (manufactureType) {
            case 'FOB':
            case 'CMT':
                this.ProductTypeLists = ['','FABRIC', 'NON FABRIC'];
                break;

            case 'AVAL':
                this.ProductTypeLists = ['NON FABRIC'];
                break;

            default:
                this.ProductTypeLists = [];
                break;
        }
    }


    CategoryTypeChanged(newValue) {
        if (this.readOnly || this.isEdit) {
            return;
        }
        this.data.Code = null;
        this.data.Name = null;
        this.Name = null;
        this.Composition = null;
        this.compositions = [
            {
                Composition: "",
                Percentage: null
            }
        ];
        this.data.Composition = null;
        this.data.Const = null;
        this.data.Yarn = null;
        this.data.Width = null;
        if(this.data.ManufactureType != 'AVAL' || this.ManufactureType != 'AVAL'){
            this.data.UOM = null;
            if(this.context.UOMViewModel){
                (this.context.UOMViewModel || {}).editorValue = "";
                this.UOM = null;
            }
        }
        if (newValue) {
            this.data.CategoryType = newValue;
            this.generateCode();
            if(this.context.ProductGarmentViewModel){
                (this.context.ProductGarmentViewModel || {}).editorValue = "";
            }
        }
    }

    setCategoryTypes(productType) {
        if(this.context.ProductGarmentViewModel){
            (this.context.ProductGarmentViewModel || {}).editorValue = "";
        }
        if (productType === 'FABRIC') {
            this.CategoryTypeLists = ['BB'];
        }
        else if (productType === 'NON FABRIC') {
            if (this.data.ManufactureType === 'AVAL' || this.ManufactureType === 'AVAL' || this.data.ManufactureType === 'CMT' || this.ManufactureType === 'CMT' || this.data.OriginType === 'IMPORT' || this.OriginType === 'IMPORT') {
                this.CategoryTypeLists = ['', 'BP', 'BE'];
            } else {
                this.CategoryTypeLists = ['', 'BP', 'BE', 'PRC'];
            }
        }
        else {
            this.CategoryTypeLists = [];
        }
    }

    ProductGarmentChanged(newValue) {
        if (this.readOnly || this.isEdit) {
            return;
        }
        if (newValue) {
            if (newValue) {
                this.generateCode(newValue);
                this.Name = newValue.Name;
                this.data.Name = newValue.Name;
                if(this.data.ManufactureType != 'AVAL'){
                    this.data.UOM = newValue.UOM;
                    this.UOM = newValue.UOM;
                }
                this.Composition = newValue.Composition;
                this.data.Composition = newValue.Composition;
                this.data.Const = newValue.Const;
                this.data.Yarn = newValue.Yarn;
                this.data.Width = newValue.Width;
            }
            else {
                (this.context.ProductGarmentViewModel || {}).editorValue = "";
                (this.context.UOMViewModel || {}).editorValue = "";
                this.data.Code = null;
                this.data.Name = null;
                this.data.Composition = null;
                this.Composition = null;
                this.compositions = [
                    {
                        Composition: "",
                        Percentage: null
                    }
                ];
                this.data.Composition = null;
                this.data.UOM = null;
                this.UOM = null;
                this.data.Const = null;
                this.data.Yarn = null;
                this.data.Width = null;
            }
        }
    }
}