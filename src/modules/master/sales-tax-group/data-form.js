import { bindable } from 'aurelia-framework';
var IncomeTaxLoader = require('../../../loader/income-tax-loader');
var VatTaxLoader = require('../../../loader/vat-tax-loader');


export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable show;
  @bindable incomeTax;
  @bindable vatTax;
  @bindable error;
  @bindable errorMessage;

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    //editText: "Ubah",
  };

  categoryOptions = [
    "",
    "PPN ONLY",
    "PPH ONLY",
    "PPN & PPH",
    "OTHER"
  ];

  transactionTypeOptions = [
    "",
    "PURCHASE",
    "SALES"
  ];

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    //this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;

    if (this.data.IncomeTaxName) {
            this.incomeTax = {
                name: this.data.IncomeTaxName,
                rate: this.data.IncomeTaxRate
            };
        }
    if (this.data.VatRate) {
            this.vatTax = {
                Rate: this.data.VatRate
            };
        }

  }


    categoryChanged() {

      this.data.VatId = null;
      this.data.VatRate = null;

      this.data.IncomeTaxId = null;
      this.data.IncomeTaxName = null;
      this.data.IncomeTaxRate = null;

      this.vatTax = null;
      this.incomeTax = null;


      if (this.error) {
          this.error.VatId = null;
          this.error.VatRate = null;

          this.error.IncomeTaxId = null;
          this.error.IncomeTaxName = null;
          this.error.IncomeTaxRate = null;
      }
  }


    get incomeTaxLoader() {
            return IncomeTaxLoader;
      }

    incomeTaxLoaderView = (item) => {
        return [item.name, item.rate]
            .filter(value => value !== undefined && value !== null && value.toString().trim().length > 0)
            .join(" - ");
    }
  
    incomeTaxChanged(newValue, oldValue) {
        var selectedIncomeTax = newValue;
        if (selectedIncomeTax) {
            this.data.IncomeTaxId = selectedIncomeTax.Id;
            this.data.IncomeTaxName = selectedIncomeTax.name;
            this.data.IncomeTaxRate = selectedIncomeTax.rate;
        } else {
            this.data.IncomeTaxId = null;
            this.data.IncomeTaxName = null;
            this.data.IncomeTaxRate = null;
        }
    }

    get vatTaxLoader() {
        return VatTaxLoader;
    }

    vatTaxLoaderView = (item) => {
        return [item.Rate]
            .filter(value => value !== undefined && value !== null && value.toString().trim().length > 0)
            .join(" - ");
    }
    vatTaxChanged(newValue, oldValue) {
        var selectedVatTax = newValue;
        if (selectedVatTax) {
            this.data.VatId = selectedVatTax.Id;
            this.data.VatRate = selectedVatTax.Rate;
        } else {
            this.data.VatId = null;
            this.data.VatRate = null;
        }
    }
}