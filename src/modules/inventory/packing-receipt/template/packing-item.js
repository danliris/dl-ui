import { bindable } from 'aurelia-framework';

export class PackingItem {

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
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

}