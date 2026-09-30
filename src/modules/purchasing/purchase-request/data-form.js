import {inject, bindable, computedFrom} from 'aurelia-framework'
var UnitLoader = require('../../../loader/unit-loader');
var BudgetLoader = require('../../../loader/budget-loader');
var CategoryLoader = require('../../../loader/category-loader');
var accountSignatureLoader = require('../../../loader/garment-account-signature-loader');

export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable IsApprovedUnit1;
    @bindable IsApprovedUnit2;
    // @bindable prInternal;

    @bindable title;

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.IsApprovedUnit1 ={
            UserName: this.data.approvedUnit1By || ""
        };
        this.IsApprovedUnit2 = {
            UserName: this.data.approvedUnit2By || ""
        };
        // if(this.data.internal){
        //     this.prInternal = this.data.internal;
        // }

    }

    itemsColumns = {
        columns: [
            { header: "Barang", value: "product" },
            { header: "Jumlah", value: "quantity" },
            { header: "Satuan", value: "product.uom" },
            { header: "Keterangan", value: "remark" }
        ],
        options:{}
    }

    unitChanged(e) {
        if (this.data.unit)
        {
            this.data.unitId = this.data.unit.Id || this.data.unit._id || {};
            this.data.unit._id = this.data.unitId;

            if(this.data.unit.Division)
                this.data.unit.Division._id = this.data.unit.Division.Id || "";
        }
    }

    budgetChanged(e) {
        if (this.data.budget)
            this.data.budgetId = this.data.budget._id ? this.data.budget._id : {};
    }

    categoryChanged(e) {
        if (this.data.category) {
            this.data.categoryId = this.data.category._id ? this.data.category._id : {};
            this.itemsColumns.options.categoryCode = this.data.category ? this.data.category.code : "";
            this.data.items.splice(0, this.data.items.length);
        } else {
            this.data.categoryId = {};
            this.itemsColumns.options.categoryCode = "";

            this.data.items.splice(0, this.data.items.length);
        }
    }

    // prInternalChanged(e){
    //         if(e==true){
    //             this.data.internal = true;
    //         }else{
    //             this.data.internal = false;
    //         }
    // }

    get unitLoader() {
        return UnitLoader;
    }

    get unitQuery(){
        var result = { "Active" : true }
        return result;   
    }

    get budgetLoader() {
        return BudgetLoader;
    }

    get categoryLoader() {
        return CategoryLoader;
    }

    get addItems() {
        return (event) => {
            this.data.items.push({})
        };
    }

    get accountSignatureLoader1() {
          return (keyword) => accountSignatureLoader(keyword); //Username ganti dengan jabatan atau posisi dari Account Signature yang diinginkan
        }
    
        get accountSignatureLoader2() {
          return (keyword) => accountSignatureLoader(keyword); //Username ganti dengan jabatan atau posisi dari Account Signature yang diinginkan
        }
        ApprovedUnit1View = (unit) => {
            return `${unit.UserName}`;
        }
        ApprovedUnit2View = (unit) => {
            return `${unit.UserName}`;
        }
    
        IsApprovedUnit1Changed(newValue) {
          this.IsApprovedUnit1 = newValue;
          if (this.IsApprovedUnit1){
            this.data.ApprovedUnit1By = this.IsApprovedUnit1.UserName;
          }else{
            this.data.ApprovedUnit1By = "";
            this.IsApprovedUnit1 = null;
          }
        }
    
        IsApprovedUnit2Changed(newValue) {
          this.IsApprovedUnit2 = newValue;
          if (this.IsApprovedUnit2) {
            this.data.ApprovedUnit2By = this.IsApprovedUnit2.UserName;
          }else{
            this.data.ApprovedUnit2By = "";
            this.IsApprovedUnit2 = null;
          }
        }
}