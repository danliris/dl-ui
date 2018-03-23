import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";
import { Dialog } from '../../../../components/dialog/dialog';
import moment from 'moment';
var comodityLoader = require('../../../../loader/garment-master-plan-comodity-loader');

@inject(Dialog)
export class DetailItem {
  constructor(dialog) {
    this.dialog = dialog;
  }

  activate(item) {
    this.data = item.data;
    this.error = item.error;
    this.options = item.options;
    if (this.data) {
      this.data.confirmDate = this.data._createdDate ? this.data._createdDate : new Date();
    }
  }

  controlOption = {
    control: {
      length: 12
    }
  }

  get loader() {
    return comodityLoader;
  }

  comoView = (comodity) => {
    return `${comodity.code} - ${comodity.name}`
  }

  oncancel(data) {
    this.dialog.prompt("Cancel Confirm Comodity " + this.data.masterPlanComodity.name + " (Jumlah : " + this.data.quantity + "). Lanjutkan?", "Cancel Confirm")
      .then(response => {
        if (response == "ok") {
          this.data.isCanceled = true;
        }
      });
  }
}
