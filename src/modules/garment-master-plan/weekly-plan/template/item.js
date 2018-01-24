import {bindable} from 'aurelia-framework'

export class Item {
  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options; 
    this.context = context;
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
 
  get dataAhTotal() {
    this.data.ahTotal = this.data.operator * this.data.AH;
    return this.data.ahTotal;
  }

  set dataAhTotal(value) {
    this.data.ahTotal = value;
  }

  get dataRemainingAH() {
    this.data.remainingAH = this.data.ahTotal - this.data.usedAH;
    return this.data.remainingAH;
  }

  set dataRemainingAH(value) {
    this.data.remainingAH = value;
  }
}