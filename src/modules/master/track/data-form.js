import { inject, bindable, computedFrom } from 'aurelia-framework';
import { PermissionHelper } from '../../../utils/permission-helper';

var CurrencyLoader = require('../../../loader/currency-loader');
var UomLoader = require('../../../loader/uom-loader');

@inject(PermissionHelper)
export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable Currency;
    @bindable UOM;

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    }
    types = ["", "Jalur", "Rak"];

    // constructor(permissionHelper) {
    //     this.permissions = permissionHelper.getUserPermissions();
    //     console.log(this.permissions);
    //     this.isPermitted = this.isPermittedRole();
    // }

    
    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
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
 
}
