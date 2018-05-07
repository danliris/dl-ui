import {bindable} from 'aurelia-framework'

export class Item {
  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options; 
    this.context = context;

    // week yang sudah dipakai (dibooking, usedEH > 0) tidak boleh diubah
    //this.options.readOnly = this.options.readOnly || this.data.usedEH > 0;
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
 
  get dataAhTotal() {
    this.data.ahTotal = this.data.operator * this.data.workingHours;
    return this.data.ahTotal;
  }

  set dataAhTotal(value) {
    this.data.ahTotal = value;
  }

  get dataEhTotal() {
    this.data.ehTotal = Math.round(this.data.ahTotal * this.data.efficiency / 100);
    return this.data.ehTotal;
  }

  set dataEhTotal(value) {
    this.data.ehTotal = value;
  }

  get dataRemainingEH() {
    this.data.remainingEH = this.data.ehTotal - this.data.usedEH;
    return this.data.remainingEH;
  }

  set dataRemainingEH(value) {
    this.data.remainingEH = value;
  }
}
