import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";
import { Dialog } from '../../../../components/dialog/dialog';
import moment from 'moment';
var ComodityLoader = require('../../../../loader/garment-comodities-loader');

@inject(Dialog, BindingEngine)
export class DetailItem {
  @bindable selectedComodity;

  constructor(dialog, bindingengine) {
    this.dialog = dialog;
    this.bindingengine = bindingengine;
  }

  activate(item) {
    this.data = item.data;
    this.error = item.error;
    this.options = item.options;
    if (this.data) {
      this.data.ConfirmDate = this.data._createdDate ? this.data._createdDate : new Date();
    }
  }

  controlOption = {
    control: {
      length: 12
    }
  }

  selectedComodityChanged(newValue) {
      var _selectedComodity = newValue;
      console.log(_selectedComodity);
      if (_selectedComodity) {
          this.data.Comodity = _selectedComodity;
          this.data.ComodityId = _selectedComodity.Id ? _selectedComodity.Id : "";
          this.data.ComodityCode = _selectedComodity.Code;
          this.data.ComodityName = _selectedComodity.Name;            
      }
  }

  get comodityLoader() {
      return ComodityLoader;
  }

  comoView = (comodity) => {
    return `${comodity.Code} - ${comodity.Name}`
  }

  oncancel(data) {
    this.dialog.prompt("Cancel Confirm Comodity " + this.data.ComodityName + " (Jumlah : " + this.data.ConfirmQuantity + "). Lanjutkan?", "Cancel Confirm")
      .then(response => {
        if (response == "ok") {
          this.data.IsCanceled = true;
        }
      });
  }
}
