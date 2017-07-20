import { bindable } from 'aurelia-framework';

export class PackingItem {

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    if (!this.data.weight) {
      this.data.weight = 0;
    }
    if (!this.data.quantity) {
      this.data.quantity = 0;
    }
    if (!this.data.length) {
      this.data.length = 0;
    }
  }

  controlOptions = {
    control: {
      length: 12
    }
  }

  quantityChanged(e) {
    console.log(this.data);
    // this.data.quantity = this.data.quantity ? this.data.quantity : 0;
  }

  notesChanged(e) {
    console.log(this.data);
  }

  get weightTotal() {
    return this.data.weight * this.data.quantity;
  }

  get lengthTotal() {
    return this.data.length * this.data.quantity;
  }

}