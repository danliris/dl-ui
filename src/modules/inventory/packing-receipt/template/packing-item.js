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

  quantityControlOptions = {
    control: {
      length: 1
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
    return this.data.weightTotalAmount ? this.data.weightTotalAmount.toFixed(2) : (this.data.weight * this.data.quantity).toFixed(2);
  }

  get lengthTotal() {
    return this.data.lengthTotalAmount ? this.data.lengthTotalAmount.toFixed(2) : (this.data.length * this.data.quantity).toFixed(2);
  }

}